#!/usr/bin/env node
/* 출처 원문 대조 — sourceUrl 을 실제로 받아 original 이 거기 있는지 본다.
 *
 *   npm run verify:sources              전체 (10초 남짓)
 *   npm run verify:sources -- --ids 59,63
 *   npm run verify:sources -- --from 124
 *
 * 등재 기준의 첫 줄 「1차 출처에서 원문을 대조한다」를 기계로 다시 하는 도구다.
 * 기억이나 인용 사이트가 아니라, 기록해 둔 바로 그 주소를 연다.
 *
 * 판정
 *   EXACT         공백만 정리하면 문자 그대로 있다
 *   LETTERS-ONLY  문장부호·숫자·위키문헌 이문 주석(「一作…」)을 빼면 있다.
 *                 예: Legge 평문의 "--", 행 번호가 끼어든 라틴 시, 「浪 一作波」
 *   CITED         머리 주석 [B] 「인용 확인」 항목(QUOTE_STANDARDS.md v1.6 ②).
 *                 원문 대신 그것을 인용한 2차 자료로 확인한 것이라 실패로 치지 않는다
 *   MISSING       없다 — 확인이 필요하다. 종료 코드 1
 *   FETCH-FAILED  주소를 받지 못했다(네트워크). 종료 코드 1
 *
 * translator 가 있으면 영역 주소에서 text.en 도 같은 방식으로 대조한다.
 *
 * 받기: Node 의 fetch 를 먼저 쓰고, 실패하면 curl 로 다시 받는다(프록시 뒤에서는
 * Node fetch 가 환경 변수의 프록시를 따르지 않는 경우가 있다). 빈 응답은 한 번
 * 더 받는다 — 구텐베르크가 가끔 빈 몸통을 돌려준다. */

const { execFileSync } = require("child_process");
const { loadQuotes, createReport } = require("./lib");

/* ── 인자 ─────────────────────────────────────────── */
const args = process.argv.slice(2);
const argValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const onlyIds = argValue("--ids") ? new Set(argValue("--ids").split(",").map(Number)) : null;
const fromId = argValue("--from") ? Number(argValue("--from")) : null;

const { quotes, source } = loadQuotes();
const targets = quotes.filter((q) => (!onlyIds || onlyIds.has(q.id)) && (fromId === null || q.id >= fromId));

/* 머리 주석의 [B] 에서 「인용 확인」 항목 id 를 읽는다. 여기 따로 적어 두면
   주석과 어긋나기 쉽다. 항목은 「id(출처 위치)」 모양이다. */
function citedIds() {
  const b = source.slice(source.indexOf("// [B]"), source.indexOf("// [C]"));
  return new Set([...b.matchAll(/(\d+)\(/g)].map((m) => Number(m[1])));
}
const CITED = citedIds();

/* ── 받기 ─────────────────────────────────────────── */
const cache = new Map();

async function fetchViaNode(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow", headers: { "user-agent": "motimoti-verify/1.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function fetchViaCurl(url) {
  return execFileSync("curl", ["-sSL", "--max-time", "90", "-A", "motimoti-verify/1.0", url], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

async function getPage(url) {
  if (cache.has(url)) return cache.get(url);
  const job = (async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      let body = "";
      try {
        body = await fetchViaNode(url);
      } catch {
        try { body = fetchViaCurl(url); } catch { body = ""; }
      }
      if (body && body.length > 200) return normalizePage(body);
    }
    return null;
  })();
  cache.set(url, job);
  return job;
}

/* ── 비교 ─────────────────────────────────────────── */
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
function collapse(s) {
  return s.replace(/\s+/g, " ").trim();
}
function normalizePage(html) {
  return collapse(decodeEntities(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")));
}
// 시의 줄바꿈은 데이터에 " / " 로 적어 두었다. 페이지에서는 공백이다.
function normalizeNeedle(s) {
  return collapse(s.replace(/\s\/\s/g, " "));
}
// 글자만: 문장부호·숫자·공백을 지우고, 위키문헌 이문 주석 「X 一作「Y」」의 주석 부분을 뺀다.
function lettersOnly(s) {
  return s.replace(/一作「[^」]*」/g, "").replace(/[^\p{L}]/gu, "").toLowerCase();
}
function judge(needle, page) {
  if (!page) return "FETCH-FAILED";
  if (page.includes(normalizeNeedle(needle))) return "EXACT";
  if (lettersOnly(page).includes(lettersOnly(needle))) return "LETTERS-ONLY";
  return "MISSING";
}

/* ── 실행 ─────────────────────────────────────────── */
async function pool(items, size, fn) {
  const out = [];
  let next = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  }));
  return out;
}

(async () => {
  const label = onlyIds ? `id ${[...onlyIds].join(", ")}` : fromId !== null ? `id ${fromId} 이후` : "전체";
  console.log(`출처 원문 대조 — ${label}, ${targets.length}편 (주소 ${new Set(targets.map((q) => q.sourceUrl)).size}곳)…`);

  const results = await pool(targets, 4, async (q) => {
    const original = judge(q.original, await getPage(q.sourceUrl));
    const translation = q.translator ? judge(q.text.en, await getPage(q.translator.enUrl)) : null;
    return { q, original, translation };
  });

  const report = createReport(`출처 원문 대조 — ${label}`);
  const tally = {};
  for (const { q, original, translation } of results) {
    const cited = CITED.has(q.id) && original !== "EXACT" && original !== "LETTERS-ONLY";
    const shownOriginal = cited ? "CITED" : original;
    tally[shownOriginal] = (tally[shownOriginal] || 0) + 1;
    const name = `${q.id} ${q.author.ko}`;
    // CITED 는 실제 판정(MISSING 인지 받지 못한 것인지)을 괄호로 함께 보여 준다.
    const originalLabel = cited ? `CITED (${original})` : original;
    const detail = `원문 ${originalLabel}${translation ? ` · 영역 ${translation}` : ""}`;
    const bad = (s) => s === "MISSING" || s === "FETCH-FAILED";
    if (bad(shownOriginal) || (translation && bad(translation))) report.fail(name, `${detail} — ${q.sourceUrl}`);
    else if (shownOriginal !== "EXACT" || (translation && translation !== "EXACT")) report.note(name, detail);
  }
  const okCount = (tally.EXACT || 0) + (tally["LETTERS-ONLY"] || 0) + (tally.CITED || 0);
  report.check(`원문 확인 ${okCount}/${targets.length}편`, okCount === targets.length,
    Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(" · "));
  process.exitCode = report.print() > 0 ? 1 : 0;
})();
