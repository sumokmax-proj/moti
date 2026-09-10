#!/usr/bin/env node

/* 수집기 백엔드.
 *
 * 정적 파일을 서빙하면서 수집기용 API 를 함께 연다. 별도 프런트 서버가
 * 필요 없도록 한 프로세스로 둔다 — 포트가 하나여야 fetch 가 같은 출처로
 * 나가고 CORS 를 다룰 일이 없다.
 *
 *   npm run collector   →  http://localhost:3001/collector/
 *
 * 하는 일
 *   GET  /api/health          수집기가 백엔드 모드인지 판별하는 데 쓴다
 *   GET  /api/quotes          pending / approved 목록
 *   POST /api/quotes/pending  검증 대기에 추가
 *   POST /api/quotes/approve  승인 → quotes.js 에 등재
 *   POST /api/quotes/reject   삭제
 *
 * 로컬 전용 도구다. 인증이 없으므로 루프백에만 바인딩한다.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(__dirname, "data", "pending-quotes.json");
const QUOTES_FILE = path.join(ROOT, "quotes.js");
const PORT = Number(process.env.PORT) || 3001;
const HOST = "127.0.0.1";

const MAX_BODY = 1024 * 1024; // 1MB. 명언 몇 편에 이보다 더 필요할 일이 없다.

/* QUOTE_STANDARDS.md 의 표 13개 + quotes.js 가 이미 쓰는 legacy 3개.
   legacy 를 빼면 기존 명언을 다시 넣을 때 "모르는 태그" 로 걸린다. */
const TAG_KEYS = new Set([
  "despair", "failure", "challenge", "fear", "energy", "hope", "meaning",
  "perseverance", "freedom", "passion", "success", "preparation", "oriental",
  "failure_acceptance", "dream", "warning",
]);

const MAX_KO = 60;
const MAX_EN = 170;

/* ── 데이터 파일 ───────────────────────────────────────*/

function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
      return { pending: parsed.pending || [], approved: parsed.approved || [] };
    }
  } catch (err) {
    // 손상된 파일을 조용히 빈 상태로 덮으면 그날 작업이 사라진다. 멈추는 게 낫다.
    throw new Error(`${DATA_FILE} 를 읽지 못했습니다: ${err.message}`);
  }
  return { pending: [], approved: [] };
}

function writeData(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const payload = {
    pending: data.pending,
    approved: data.approved,
    lastUpdated: new Date().toISOString().slice(0, 10),
  };
  writeFileAtomic(DATA_FILE, JSON.stringify(payload, null, 2) + "\n");
}

/* 임시 파일에 쓰고 rename 한다. 쓰는 도중에 죽어도 원본이 반쯤 잘리지 않는다. */
function writeFileAtomic(file, content) {
  const tmp = `${file}.tmp${process.pid}`;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}

/* ── quotes.js 등재 ────────────────────────────────────*/

function jsString(value) {
  return JSON.stringify(String(value));
}

function toEntry(quote, id) {
  const lines = [
    "  {",
    `    id: ${id},`,
    "    text: {",
    `      ko: ${jsString(quote.text.ko)},`,
    `      en: ${jsString(quote.text.en)},`,
    "    },",
    "    author: {",
    `      ko: ${jsString(quote.author.ko)},`,
    `      en: ${jsString(quote.author.en)},`,
    "    },",
    `    original: ${jsString(quote.original)},`,
    `    lang: ${jsString(quote.lang)},`,
  ];
  if (quote.translator) {
    // quotes.js 의 기존 8개 항목과 같은 모양: { en, enUrl }.
    lines.push("    translator: {");
    lines.push(`      en: ${jsString(quote.translator)},`);
    lines.push(`      enUrl: ${jsString(quote.translatorUrl)},`);
    lines.push("    },");
  }
  lines.push(`    source: ${jsString(quote.source)},`);
  lines.push(`    year: ${Number(quote.year)},`);
  lines.push(`    sourceUrl: ${jsString(quote.sourceUrl)},`);
  lines.push(`    tags: [${quote.tags.map(jsString).join(", ")}],`);
  lines.push("  },");
  return lines.join("\n");
}

/* quotes.js 상단의 "// 다음 id: N" 이 id 채번의 유일한 근거다.
 * 파일에 남은 최대 id 로 채번하지 않는 이유는 삭제된 id 가 있기 때문이다 —
 * 즐겨찾기가 id 로만 매칭하므로 재사용하면 남의 즐겨찾기가 다른 명언을 가리킨다. */
const NEXT_ID_RE = /^\/\/ 다음 id: (\d+)$/m;

function appendToQuotesFile(quote) {
  const source = fs.readFileSync(QUOTES_FILE, "utf8");

  const match = source.match(NEXT_ID_RE);
  if (!match) {
    throw new Error('quotes.js 에서 "// 다음 id: N" 주석을 찾지 못했습니다.');
  }
  const id = Number(match[1]);

  // 배열을 닫는 마지막 "];" 앞에 넣는다. 파일 끝에서 찾아야
  // 본문에 같은 문자열이 있어도 걸리지 않는다.
  const close = source.lastIndexOf("\n];");
  if (close === -1) {
    throw new Error("quotes.js 에서 배열의 끝을 찾지 못했습니다.");
  }

  const updated =
    source.slice(0, close + 1) +
    toEntry(quote, id) +
    "\n" +
    source.slice(close + 1);

  writeFileAtomic(QUOTES_FILE, updated.replace(NEXT_ID_RE, `// 다음 id: ${id + 1}`));
  return id;
}

/* ── 검증 ──────────────────────────────────────────────
   화면에서 이미 검사하지만 여기서 다시 한다. API 는 화면 없이도
   불릴 수 있고, quotes.js 에 쓰는 쪽이 마지막 방어선이다. */

/* 붙여넣는 JSON 은 translator 를 { en, enUrl } 로도, 평평하게도 보낼 수 있다.
   quotes.js 에서 복사해 온 것과 손으로 적은 것을 둘 다 받는다. */
function flatTranslator(quote) {
  const t = quote.translator;
  if (t && typeof t === "object") {
    return { translator: t.en, translatorUrl: t.enUrl };
  }
  return { translator: t, translatorUrl: quote.translatorUrl };
}

function validate(quote, existing) {
  const errors = [];
  const str = (v) => (typeof v === "string" ? v.trim() : "");

  const textKo = str(quote.text && quote.text.ko);
  const textEn = str(quote.text && quote.text.en);

  if (!textKo) errors.push("text.ko 누락");
  else if (textKo.length > MAX_KO) errors.push(`text.ko 가 ${MAX_KO}자를 넘습니다`);
  if (!textEn) errors.push("text.en 누락");
  else if (textEn.length > MAX_EN) errors.push(`text.en 이 ${MAX_EN}자를 넘습니다`);
  if (!str(quote.author && quote.author.ko)) errors.push("author.ko 누락");
  if (!str(quote.author && quote.author.en)) errors.push("author.en 누락");
  if (!str(quote.original)) errors.push("original 누락");
  if (!str(quote.lang)) errors.push("lang 누락");
  if (!str(quote.source)) errors.push("source 누락");
  if (!Number.isInteger(Number(quote.year))) errors.push("year 가 정수가 아닙니다");
  if (!isHttpUrl(str(quote.sourceUrl))) errors.push("sourceUrl 이 http(s) 주소가 아닙니다");

  const tr = flatTranslator(quote);
  if (str(tr.translator) && !isHttpUrl(str(tr.translatorUrl))) {
    errors.push("translator 가 있으면 translatorUrl 이 있어야 합니다");
  }

  const tags = Array.isArray(quote.tags) ? quote.tags : [];
  if (tags.length === 0) errors.push("tags 가 비어 있습니다");
  tags.forEach((tag) => {
    if (!TAG_KEYS.has(tag)) errors.push(`모르는 태그: ${tag}`);
  });

  if (textKo && existing.some((q) => str(q.text && q.text.ko) === textKo)) {
    errors.push("이미 같은 text.ko 가 있습니다");
  }

  return errors;
}

function isHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function normalize(quote) {
  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const out = {
    tempId: quote.tempId || `t${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    addedAt: quote.addedAt || new Date().toISOString(),
    text: { ko: str(quote.text.ko), en: str(quote.text.en) },
    author: { ko: str(quote.author.ko), en: str(quote.author.en) },
    original: str(quote.original),
    lang: str(quote.lang),
    source: str(quote.source),
    year: Number(quote.year),
    sourceUrl: str(quote.sourceUrl),
    tags: quote.tags.slice(),
  };
  const tr = flatTranslator(quote);
  if (str(tr.translator)) {
    out.translator = str(tr.translator);
    out.translatorUrl = str(tr.translatorUrl);
  }
  return out;
}

/* ── HTTP ──────────────────────────────────────────────*/

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("요청 본문이 너무 큽니다"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error(`JSON 을 읽지 못했습니다: ${err.message}`));
      }
    });
    req.on("error", reject);
  });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function serveStatic(req, res, pathname) {
  const rel = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const target = path.join(ROOT, rel);

  // 경로 탈출 방지. 로컬 도구라도 ../ 로 홈 디렉터리를 읽히면 안 된다.
  const resolved = path.resolve(target);
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  let file = resolved;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }
  if (!fs.existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }

  res.writeHead(200, {
    "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(file).pipe(res);
}

async function handleApi(req, res, pathname) {
  if (pathname === "/api/health" && req.method === "GET") {
    return sendJson(res, 200, { ok: true, quotesFile: path.relative(ROOT, QUOTES_FILE) });
  }

  if (pathname === "/api/quotes" && req.method === "GET") {
    const data = readData();
    return sendJson(res, 200, data);
  }

  if (pathname === "/api/quotes/pending" && req.method === "POST") {
    const body = await readBody(req);
    const incoming = Array.isArray(body.quotes) ? body.quotes : [body.quote].filter(Boolean);
    if (incoming.length === 0) {
      return sendJson(res, 400, { error: "quotes 가 비어 있습니다" });
    }

    const data = readData();
    const existing = data.pending.concat(data.approved);
    const accepted = [];
    const problems = [];

    incoming.forEach((quote, i) => {
      const errors = validate(quote, existing.concat(accepted));
      if (errors.length > 0) problems.push(`#${i + 1} — ${errors.join(" / ")}`);
      else accepted.push(normalize(quote));
    });

    if (accepted.length === 0) {
      return sendJson(res, 400, { error: problems.join("\n") });
    }

    data.pending = data.pending.concat(accepted);
    writeData(data);
    return sendJson(res, 200, { added: accepted.length, problems });
  }

  if (pathname === "/api/quotes/approve" && req.method === "POST") {
    const body = await readBody(req);
    const data = readData();
    const i = data.pending.findIndex((q) => q.tempId === body.tempId);
    if (i === -1) return sendJson(res, 404, { error: "해당 tempId 가 검증 대기에 없습니다" });

    const quote = data.pending[i];
    let id;
    try {
      id = appendToQuotesFile(quote);
    } catch (err) {
      // quotes.js 에 못 썼으면 pending 에서 빼지 않는다. 둘이 어긋나면
      // 승인은 됐는데 앱에는 없는 명언이 생긴다.
      return sendJson(res, 500, { error: err.message });
    }

    data.pending.splice(i, 1);
    data.approved.push({ ...quote, id, approvedAt: new Date().toISOString() });
    writeData(data);
    return sendJson(res, 200, { id });
  }

  if (pathname === "/api/quotes/reject" && req.method === "POST") {
    const body = await readBody(req);
    const from = body.from === "approved" ? "approved" : "pending";
    const data = readData();
    const before = data[from].length;
    data[from] = data[from].filter((q) => q.tempId !== body.tempId);
    if (data[from].length === before) {
      return sendJson(res, 404, { error: "해당 tempId 를 찾지 못했습니다" });
    }
    writeData(data);
    // approved 에서 지워도 quotes.js 는 건드리지 않는다. 이미 등재된 id 를
    // 되돌리는 일은 즐겨찾기까지 얽히므로 손으로 판단할 일이다.
    return sendJson(res, 200, { removed: 1 });
  }

  return sendJson(res, 404, { error: "그런 엔드포인트가 없습니다" });
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${HOST}:${PORT}`).pathname;

  if (pathname.startsWith("/api/")) {
    handleApi(req, res, pathname).catch((err) => {
      sendJson(res, 400, { error: err.message });
    });
    return;
  }

  if (req.method !== "GET") {
    res.writeHead(405).end("Method not allowed");
    return;
  }

  serveStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log(`수집기  http://${HOST}:${PORT}/collector/`);
  console.log(`앱      http://${HOST}:${PORT}/`);
  console.log(`등재 대상  ${path.relative(process.cwd(), QUOTES_FILE)}`);
});
