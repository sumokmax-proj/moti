/* 명언 수집기.
 *
 * 저장 위치는 두 가지고, 실행할 때 백엔드를 찾아보고 정한다.
 *   server — `npm run collector` 로 server.js 가 떠 있을 때. data/pending-quotes.json
 *            에 저장하고, 승인하면 서버가 quotes.js 에 직접 등재한다.
 *   local  — GitHub Pages 처럼 정적 호스팅일 때. localStorage 에만 남으므로
 *            승인해도 quotes.js 는 바뀌지 않는다. 대신 붙여넣을 코드를 복사해 준다.
 * 둘 중 어느 쪽인지 화면 위에 늘 표시한다. 숨기면 쓰는 사람이 작업을 잃는다.
 */

/* ── 상황 태그 ─────────────────────────────────────────
   quotes.js 의 tags 가 쓰는 값이다. 여기서 바꾸면 기존 데이터와 어긋나므로
   키는 고정하고 이름만 손본다. */
const SITUATION_TAGS = [
  { key: "despair", ko: "절망할 때", en: "In despair" },
  { key: "failure", ko: "실패했을 때", en: "After failure" },
  { key: "challenge", ko: "도전할 때", en: "Starting out" },
  { key: "fear", ko: "두려울 때", en: "When afraid" },
  { key: "perseverance", ko: "버텨야 할 때", en: "Holding on" },
  { key: "hope", ko: "희망이 필요할 때", en: "Needing hope" },
  { key: "meaning", ko: "의미를 물을 때", en: "Seeking meaning" },
  { key: "energy", ko: "활기가 필요할 때", en: "Needing energy" },
  { key: "success", ko: "성공했을 때", en: "After success" },
  { key: "freedom", ko: "자유·의지", en: "Freedom, will" },
  { key: "preparation", ko: "준비·노력", en: "Preparation" },
  { key: "oriental", ko: "동양 고전", en: "Eastern classics" },
];

const LANGS = [
  ["en", "English", "영어"],
  ["ko", "Korean", "한국어"],
  ["lzh", "Classical Chinese", "한문"],
  ["zh", "Chinese", "중국어"],
  ["de", "German", "독일어"],
  ["fr", "French", "프랑스어"],
  ["ja", "Japanese", "일본어"],
  ["es", "Spanish", "스페인어"],
  ["it", "Italian", "이탈리아어"],
  ["ru", "Russian", "러시아어"],
  ["la", "Latin", "라틴어"],
  ["nl", "Dutch", "네덜란드어"],
];

/* QUOTE_STANDARDS.md 의 수치를 그대로 옮긴 것이다. 문서가 바뀌면 여기도 바꾼다. */
const MAX_KO = 60;
const MAX_EN = 170;

/* ── 화면 문구 ─────────────────────────────────────────
   앱과 달리 수집기는 한국어가 기본이다. 쓰는 사람이 한국어 출처를 다루기 때문이다. */
const UI = {
  ko: {
    title: "수집기",
    tabs: { collect: "수집", review: "검증 대기", approved: "승인됨", guide: "가이드" },
    collectH: "새 명언",
    collectLede:
      "1차 출처를 확인한 명언만 등재합니다. 한국어와 영어를 모두 입력해야 앱의 두 언어에서 모두 나옵니다.",
    labels: {
      textKo: "한국어 명언",
      textEn: "영어 명언",
      authorKo: "저자 (한국어)",
      authorEn: "저자 (영어)",
      original: "원문",
      lang: "원문 언어",
      year: "연도",
      source: "출처",
      sourceUrl: "출처 URL",
      translator: "영역 번역자",
      translatorUrl: "번역 근거 URL",
      tags: "상황 태그",
      bulk: "JSON",
    },
    hints: {
      year: "음수는 기원전입니다.",
      sourceUrl: "위키문헌·구텐베르크 등 직접 열람할 수 있는 곳이어야 합니다.",
      translator: "공개된 정본 영역을 쓴 경우에만 적습니다. 비우면 자체 번역으로 기록됩니다.",
      translatorUrl: "번역자를 적었으면 그 번역문을 연 URL이 있어야 합니다.",
    },
    submit: "추가",
    bulkH: "JSON 일괄 등록",
    bulkLede:
      "Claude가 QUOTE_STANDARDS.md 기준으로 수집해 준 JSON을 그대로 붙여넣습니다. 배열 또는 단일 객체를 받습니다.",
    bulkBtn: "일괄 등록",
    reviewH: "검증 대기",
    reviewLede: "출처를 직접 열어 확인한 뒤 승인하세요. 승인하면 quotes.js에 등재됩니다.",
    reviewLedeLocal:
      "출처를 직접 열어 확인한 뒤 승인하세요. 지금은 브라우저에만 저장되므로 승인해도 quotes.js는 바뀌지 않습니다.",
    approvedH: "승인됨",
    approvedLede: "앱에 등재된 명언입니다.",
    copyAll: "전체를 quotes.js 코드로 복사",
    guideH: "기준",
    guideLede:
      "전문은 저장소의 QUOTE_STANDARDS.md에 있습니다. 아래는 입력할 때 걸리는 규칙만 추린 것입니다.",
    guideRulesH: "등재 조건",
    guideTagsH: "상황 태그",
    rules: [
      ["출처", "책·연설·편지·당대 기록 등 1차 출처만 인정합니다. 인용 사이트와 백과사전은 근거가 되지 못합니다."],
      ["길이", `한국어 ${MAX_KO}자, 영어 ${MAX_EN}자 이내. 모바일 한 화면에 들어가야 합니다.`],
      ["번역", "의역 금지. 원문의 주장을 그대로 옮깁니다."],
      ["영역", "공개된 정본 영역이 있으면 번역자와 근거 URL을 함께 적고, 없으면 자체 번역으로 둡니다."],
      ["애매하면", "탈락시킵니다. 오인용을 하나 들이는 비용이 명언 하나를 놓치는 비용보다 큽니다."],
    ],
    empty: { pending: "검증 대기 중인 명언이 없습니다.", approved: "승인된 명언이 없습니다." },
    actions: { approve: "승인", reject: "삭제", copy: "코드 복사", open: "출처 열기" },
    mode: {
      checking: "저장 위치 확인 중…",
      server: "백엔드 연결됨 — data/pending-quotes.json에 저장되고, 승인하면 quotes.js에 등재됩니다.",
      local: "백엔드 없음 — 이 브라우저에만 저장됩니다. quotes.js 반영은 코드 복사로 하세요.",
    },
    msg: {
      added: "검증 대기에 추가했습니다.",
      bulkAdded: (n) => `${n}편을 검증 대기에 추가했습니다.`,
      bulkPartial: (n, skipped) => `${n}편 추가. ${skipped}편은 아래 이유로 건너뛰었습니다.`,
      approved: "승인해 quotes.js에 등재했습니다.",
      approvedLocal: "승인했습니다. quotes.js 반영은 코드 복사로 하세요.",
      rejected: "삭제했습니다.",
      copied: "클립보드에 복사했습니다.",
      copyFailed: "복사에 실패했습니다. 직접 선택해 복사하세요.",
      badJson: "JSON을 읽지 못했습니다: ",
      emptyJson: "붙여넣은 JSON이 비어 있습니다.",
      saveFailed: "저장에 실패했습니다: ",
      nothingToCopy: "복사할 명언이 없습니다.",
    },
    errors: {
      required: (label) => `${label} — 필수 항목입니다.`,
      tooLongKo: `한국어 명언 — ${MAX_KO}자를 넘습니다.`,
      tooLongEn: `영어 명언 — ${MAX_EN}자를 넘습니다.`,
      year: "연도 — 숫자여야 합니다.",
      url: (label) => `${label} — http(s) 주소여야 합니다.`,
      tags: "상황 태그 — 최소 하나를 고르세요.",
      unknownTag: (t) => `상황 태그 — 모르는 값입니다: ${t}`,
      translatorUrl: "번역 근거 URL — 번역자를 적었으면 함께 적어야 합니다.",
      duplicate: "이미 같은 한국어 명언이 등록돼 있습니다.",
    },
    back: "앱으로 돌아가기",
    langGroup: "언어",
  },
  en: {
    title: "Collector",
    tabs: { collect: "Collect", review: "Pending", approved: "Approved", guide: "Standards" },
    collectH: "New quote",
    collectLede:
      "Only quotes verified against a primary source. Both Korean and English are required so the quote appears in both languages.",
    labels: {
      textKo: "Quote (Korean)",
      textEn: "Quote (English)",
      authorKo: "Author (Korean)",
      authorEn: "Author (English)",
      original: "Original text",
      lang: "Original language",
      year: "Year",
      source: "Source",
      sourceUrl: "Source URL",
      translator: "English translator",
      translatorUrl: "Translation URL",
      tags: "Situation tags",
      bulk: "JSON",
    },
    hints: {
      year: "Negative means BCE.",
      sourceUrl: "Somewhere you can open and read — Wikisource, Gutenberg, an official site.",
      translator: "Only for a published public-domain translation. Leave empty for our own translation.",
      translatorUrl: "If you name a translator, the translation you read must have a URL.",
    },
    submit: "Add",
    bulkH: "Bulk import JSON",
    bulkLede:
      "Paste the JSON Claude collected against QUOTE_STANDARDS.md. Accepts an array or a single object.",
    bulkBtn: "Import",
    reviewH: "Pending",
    reviewLede: "Open the source and check it before approving. Approving writes the quote into quotes.js.",
    reviewLedeLocal:
      "Open the source and check it before approving. Right now nothing is written to quotes.js — this browser only.",
    approvedH: "Approved",
    approvedLede: "Quotes now in the app.",
    copyAll: "Copy all as quotes.js code",
    guideH: "Standards",
    guideLede:
      "The full text lives in QUOTE_STANDARDS.md. Below are only the rules enforced on this form.",
    guideRulesH: "Requirements",
    guideTagsH: "Situation tags",
    rules: [
      ["Source", "Primary sources only — books, speeches, letters, contemporary records. Quote sites and encyclopedias are not evidence."],
      ["Length", `Korean within ${MAX_KO} characters, English within ${MAX_EN}. It has to fit one phone screen.`],
      ["Translation", "No paraphrase. Carry the claim of the original across."],
      ["English", "Name the translator and link the translation when a public-domain one exists; otherwise leave it as our own."],
      ["When unsure", "Drop it. One misattribution costs more than one missed quote."],
    ],
    empty: { pending: "Nothing pending.", approved: "Nothing approved yet." },
    actions: { approve: "Approve", reject: "Delete", copy: "Copy code", open: "Open source" },
    mode: {
      checking: "Checking where this saves…",
      server: "Backend connected — saves to data/pending-quotes.json, and approving writes quotes.js.",
      local: "No backend — this browser only. Use copy-as-code to get quotes into quotes.js.",
    },
    msg: {
      added: "Added to pending.",
      bulkAdded: (n) => `Added ${n} to pending.`,
      bulkPartial: (n, skipped) => `Added ${n}. Skipped ${skipped} for the reasons below.`,
      approved: "Approved and written into quotes.js.",
      approvedLocal: "Approved. Use copy-as-code to get it into quotes.js.",
      rejected: "Deleted.",
      copied: "Copied to clipboard.",
      copyFailed: "Copy failed. Select the text and copy it manually.",
      badJson: "Could not parse the JSON: ",
      emptyJson: "The JSON you pasted is empty.",
      saveFailed: "Saving failed: ",
      nothingToCopy: "Nothing to copy.",
    },
    errors: {
      required: (label) => `${label} — required.`,
      tooLongKo: `Quote (Korean) — over ${MAX_KO} characters.`,
      tooLongEn: `Quote (English) — over ${MAX_EN} characters.`,
      year: "Year — must be a number.",
      url: (label) => `${label} — must be an http(s) address.`,
      tags: "Situation tags — pick at least one.",
      unknownTag: (t) => `Situation tags — unknown value: ${t}`,
      translatorUrl: "Translation URL — required once you name a translator.",
      duplicate: "That Korean quote is already registered.",
    },
    back: "Back to the app",
    langGroup: "Language",
  },
};

/* 수집기는 /collector/ 아래에 있고 API 는 서버 루트에 있다.
   상대 경로 "api/..." 는 /collector/api/... 로 붙어 빗나간다. */
const API = "../api/";

const LANG_KEY = "motimoti-lang";
const STORE_KEY = "motimoti-collector";

let lang = "ko";
let mode = "local";
let store = { pending: [], approved: [] };
let selectedTags = new Set();

const t = () => UI[lang];
const $ = (id) => document.getElementById(id);

/* ── 저장소 ────────────────────────────────────────────
   두 모드가 같은 모양의 약속을 지키게 감싼다. 화면 코드는 어느 쪽인지 모른다. */

async function detectMode() {
  try {
    const res = await fetch(API + "health", { method: "GET" });
    if (res.ok) {
      const body = await res.json();
      if (body && body.ok) return "server";
    }
  } catch (_) {
    /* 정적 호스팅에서는 404 나 네트워크 오류가 정상이다. */
  }
  return "local";
}

function readLocal() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    /* 사생활 보호 모드 등에서 접근 자체가 던진다. 빈 상태로 시작한다. */
  }
  return { pending: [], approved: [] };
}

function writeLocal(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    return true;
  } catch (_) {
    return false;
  }
}

async function loadStore() {
  if (mode === "server") {
    const res = await fetch(API + "quotes");
    if (!res.ok) throw new Error(`GET api/quotes ${res.status}`);
    const data = await res.json();
    return { pending: data.pending || [], approved: data.approved || [] };
  }
  return readLocal();
}

async function addQuotes(quotes) {
  if (mode === "server") {
    const res = await fetch(API + "quotes/pending", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotes }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `POST api/quotes/pending ${res.status}`);
    return;
  }
  store.pending = store.pending.concat(quotes);
  if (!writeLocal(store)) throw new Error("localStorage");
}

async function approveQuote(tempId) {
  if (mode === "server") {
    const res = await fetch(API + "quotes/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tempId }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `POST api/quotes/approve ${res.status}`);
    return body;
  }
  const i = store.pending.findIndex((q) => q.tempId === tempId);
  if (i === -1) return {};
  const [quote] = store.pending.splice(i, 1);
  store.approved.push({ ...quote, approvedAt: new Date().toISOString() });
  if (!writeLocal(store)) throw new Error("localStorage");
  return {};
}

async function rejectQuote(tempId, from) {
  if (mode === "server") {
    const res = await fetch(API + "quotes/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tempId, from }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `POST api/quotes/reject ${res.status}`);
    return;
  }
  store[from] = store[from].filter((q) => q.tempId !== tempId);
  if (!writeLocal(store)) throw new Error("localStorage");
}

/* ── 검증 ──────────────────────────────────────────────
   폼과 JSON 일괄 등록이 같은 검사를 지나가야 한다. 한쪽만 느슨하면
   느슨한 쪽으로 잘못된 데이터가 들어온다. */

const TAG_KEYS = new Set(SITUATION_TAGS.map((x) => x.key));

function isHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function validate(quote, existing) {
  const e = t().errors;
  const L = t().labels;
  const errors = [];
  const str = (v) => (typeof v === "string" ? v.trim() : "");

  const textKo = str(quote.text && quote.text.ko);
  const textEn = str(quote.text && quote.text.en);
  const authorKo = str(quote.author && quote.author.ko);
  const authorEn = str(quote.author && quote.author.en);
  const original = str(quote.original);
  const source = str(quote.source);
  const sourceUrl = str(quote.sourceUrl);
  const translator = str(quote.translator);
  const translatorUrl = str(quote.translatorUrl);

  if (!textKo) errors.push(e.required(L.textKo));
  else if (textKo.length > MAX_KO) errors.push(e.tooLongKo);
  if (!textEn) errors.push(e.required(L.textEn));
  else if (textEn.length > MAX_EN) errors.push(e.tooLongEn);
  if (!authorKo) errors.push(e.required(L.authorKo));
  if (!authorEn) errors.push(e.required(L.authorEn));
  if (!original) errors.push(e.required(L.original));
  if (!str(quote.lang)) errors.push(e.required(L.lang));
  if (!source) errors.push(e.required(L.source));

  if (quote.year === "" || quote.year === null || quote.year === undefined) {
    errors.push(e.required(L.year));
  } else if (!Number.isInteger(Number(quote.year))) {
    errors.push(e.year);
  }

  if (!sourceUrl) errors.push(e.required(L.sourceUrl));
  else if (!isHttpUrl(sourceUrl)) errors.push(e.url(L.sourceUrl));

  // 번역자를 적었으면 근거 URL 도 있어야 한다. 정본 영역이라는 주장은
  // 확인할 수 있어야 주장이 된다.
  if (translator) {
    if (!translatorUrl) errors.push(e.translatorUrl);
    else if (!isHttpUrl(translatorUrl)) errors.push(e.url(L.translatorUrl));
  }

  const tags = Array.isArray(quote.tags) ? quote.tags : [];
  if (tags.length === 0) errors.push(e.tags);
  tags.forEach((tag) => {
    if (!TAG_KEYS.has(tag)) errors.push(e.unknownTag(tag));
  });

  if (textKo && existing.some((q) => str(q.text && q.text.ko) === textKo)) {
    errors.push(e.duplicate);
  }

  return errors;
}

function normalize(quote) {
  const str = (v) => (typeof v === "string" ? v.trim() : "");
  const out = {
    tempId: `t${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    addedAt: new Date().toISOString(),
    text: { ko: str(quote.text.ko), en: str(quote.text.en) },
    author: { ko: str(quote.author.ko), en: str(quote.author.en) },
    original: str(quote.original),
    lang: str(quote.lang),
    source: str(quote.source),
    year: Number(quote.year),
    sourceUrl: str(quote.sourceUrl),
    tags: quote.tags.slice(),
  };
  if (str(quote.translator)) {
    out.translator = str(quote.translator);
    out.translatorUrl = str(quote.translatorUrl);
  }
  return out;
}

/* ── quotes.js 코드 만들기 ─────────────────────────────
   백엔드가 없을 때 손으로 붙여넣을 수 있게 같은 모양의 문자열을 만든다.
   서버도 같은 규칙으로 쓰므로 두 경로의 결과가 같아야 한다. */

function jsString(value) {
  return JSON.stringify(String(value));
}

function toEntry(quote, id) {
  const lines = [];
  lines.push("  {");
  lines.push(`    id: ${id},`);
  lines.push("    text: {");
  lines.push(`      ko: ${jsString(quote.text.ko)},`);
  lines.push(`      en: ${jsString(quote.text.en)},`);
  lines.push("    },");
  lines.push("    author: {");
  lines.push(`      ko: ${jsString(quote.author.ko)},`);
  lines.push(`      en: ${jsString(quote.author.en)},`);
  lines.push("    },");
  lines.push(`    original: ${jsString(quote.original)},`);
  lines.push(`    lang: ${jsString(quote.lang)},`);
  if (quote.translator) {
    lines.push(`    translator: ${jsString(quote.translator)},`);
    lines.push(`    translatorUrl: ${jsString(quote.translatorUrl)},`);
  }
  lines.push(`    source: ${jsString(quote.source)},`);
  lines.push(`    year: ${Number(quote.year)},`);
  lines.push(`    sourceUrl: ${jsString(quote.sourceUrl)},`);
  lines.push(`    tags: [${quote.tags.map(jsString).join(", ")}],`);
  lines.push("  },");
  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(t().msg.copied);
  } catch (_) {
    toast(t().msg.copyFailed);
  }
}

/* ── 화면 ──────────────────────────────────────────────*/

let toastTimer = null;

function toast(text) {
  const el = $("toast");
  el.textContent = text;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 2600);
}

function message(el, kind, text) {
  el.dataset.kind = kind;
  el.textContent = text;
  el.hidden = !text;
}

function renderTagPicker() {
  const box = $("tag-list");
  box.innerHTML = "";
  SITUATION_TAGS.forEach((tag) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tag";
    btn.dataset.key = tag.key;
    btn.textContent = tag[lang];
    btn.setAttribute("aria-pressed", String(selectedTags.has(tag.key)));
    btn.addEventListener("click", () => {
      if (selectedTags.has(tag.key)) selectedTags.delete(tag.key);
      else selectedTags.add(tag.key);
      btn.setAttribute("aria-pressed", String(selectedTags.has(tag.key)));
    });
    box.appendChild(btn);
  });
}

function renderLangSelect() {
  const sel = $("f-lang");
  const keep = sel.value;
  sel.innerHTML = "";
  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = "—";
  sel.appendChild(blank);
  LANGS.forEach(([code, en, ko]) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = lang === "ko" ? `${ko} (${code})` : `${en} (${code})`;
    sel.appendChild(opt);
  });
  sel.value = keep;
}

function itemNode(quote, panel) {
  const li = document.createElement("li");
  li.className = "item";

  const text = document.createElement("p");
  text.className = "item-text";
  text.textContent = quote.text[lang] || quote.text.ko;
  li.appendChild(text);

  const meta = document.createElement("p");
  meta.className = "item-meta";
  const author = quote.author[lang] || quote.author.ko;
  meta.textContent = `${author} · ${quote.source} · ${quote.year}`;
  li.appendChild(meta);

  if (quote.translator) {
    const tr = document.createElement("p");
    tr.className = "item-meta";
    tr.textContent = `tr. ${quote.translator}`;
    li.appendChild(tr);
  }

  if (typeof quote.id === "number") {
    const idLine = document.createElement("p");
    idLine.className = "item-meta";
    idLine.textContent = `id ${quote.id}`;
    li.appendChild(idLine);
  }

  const tags = document.createElement("div");
  tags.className = "item-tags";
  quote.tags.forEach((key) => {
    const span = document.createElement("span");
    span.className = "item-tag";
    const found = SITUATION_TAGS.find((x) => x.key === key);
    span.textContent = found ? found[lang] : key;
    tags.appendChild(span);
  });
  li.appendChild(tags);

  const actions = document.createElement("div");
  actions.className = "item-actions";

  const open = document.createElement("a");
  open.className = "btn btn-quiet";
  open.href = quote.sourceUrl;
  open.target = "_blank";
  open.rel = "noopener noreferrer";
  open.textContent = t().actions.open;
  actions.appendChild(open);

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "btn btn-quiet";
  copy.textContent = t().actions.copy;
  copy.addEventListener("click", () => copyText(toEntry(quote, quote.id || "/* id */")));
  actions.appendChild(copy);

  if (panel === "pending") {
    const approve = document.createElement("button");
    approve.type = "button";
    approve.className = "btn btn-quiet";
    approve.textContent = t().actions.approve;
    approve.addEventListener("click", async () => {
      try {
        await approveQuote(quote.tempId);
        await refresh();
        toast(mode === "server" ? t().msg.approved : t().msg.approvedLocal);
      } catch (err) {
        toast(t().msg.saveFailed + err.message);
      }
    });
    actions.appendChild(approve);
  }

  const reject = document.createElement("button");
  reject.type = "button";
  reject.className = "btn btn-quiet";
  reject.textContent = t().actions.reject;
  reject.addEventListener("click", async () => {
    try {
      await rejectQuote(quote.tempId, panel);
      await refresh();
      toast(t().msg.rejected);
    } catch (err) {
      toast(t().msg.saveFailed + err.message);
    }
  });
  actions.appendChild(reject);

  li.appendChild(actions);
  return li;
}

function renderLists() {
  const pending = $("pending-list");
  const approved = $("approved-list");
  pending.innerHTML = "";
  approved.innerHTML = "";

  if (store.pending.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t().empty.pending;
    pending.appendChild(li);
  } else {
    store.pending.forEach((q) => pending.appendChild(itemNode(q, "pending")));
  }

  if (store.approved.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = t().empty.approved;
    approved.appendChild(li);
  } else {
    store.approved.forEach((q) => approved.appendChild(itemNode(q, "approved")));
  }

  $("count-pending").textContent = String(store.pending.length);
  $("count-approved").textContent = String(store.approved.length);
}

function renderGuide() {
  const rules = $("guide-rules");
  rules.innerHTML = "";
  t().rules.forEach(([key, body]) => {
    const li = document.createElement("li");
    const k = document.createElement("span");
    k.className = "guide-key";
    k.textContent = key;
    li.appendChild(k);
    li.appendChild(document.createTextNode(body));
    rules.appendChild(li);
  });

  const tags = $("guide-tags");
  tags.innerHTML = "";
  SITUATION_TAGS.forEach((tag) => {
    const li = document.createElement("li");
    const k = document.createElement("span");
    k.className = "guide-key";
    k.textContent = tag.key;
    li.appendChild(k);
    li.appendChild(document.createTextNode(tag[lang]));
    tags.appendChild(li);
  });
}

function applyLang() {
  const ui = t();
  document.documentElement.lang = lang;
  document.title = lang === "ko" ? "motimoti · 수집기" : "motimoti · Collector";

  $("page-title").textContent = ui.title;
  $("back-link").setAttribute("aria-label", ui.back);
  $("lang-group").setAttribute("aria-label", ui.langGroup);

  $("tab-collect").childNodes[0].nodeValue = ui.tabs.collect;
  $("tab-review").childNodes[0].nodeValue = ui.tabs.review;
  $("tab-approved").childNodes[0].nodeValue = ui.tabs.approved;
  $("tab-guide").childNodes[0].nodeValue = ui.tabs.guide;

  $("collect-h").textContent = ui.collectH;
  $("collect-lede").textContent = ui.collectLede;
  $("review-h").textContent = ui.reviewH;
  $("review-lede").textContent = mode === "server" ? ui.reviewLede : ui.reviewLedeLocal;
  $("approved-h").textContent = ui.approvedH;
  $("approved-lede").textContent = ui.approvedLede;
  $("copy-all-btn").textContent = ui.copyAll;
  $("guide-h").textContent = ui.guideH;
  $("guide-lede").textContent = ui.guideLede;
  $("guide-rules-h").textContent = ui.guideRulesH;
  $("guide-tags-h").textContent = ui.guideTagsH;
  $("bulk-h").textContent = ui.bulkH;
  $("bulk-lede").textContent = ui.bulkLede;
  $("bulk-btn").textContent = ui.bulkBtn;
  $("submit-btn").textContent = ui.submit;

  // 라벨은 별표(*)를 자식으로 갖고 있어서 첫 텍스트 노드만 바꾼다.
  const setLabel = (id, text) => {
    $(id).childNodes[0].nodeValue = text;
  };
  setLabel("l-text-ko", ui.labels.textKo);
  setLabel("l-text-en", ui.labels.textEn);
  setLabel("l-author-ko", ui.labels.authorKo);
  setLabel("l-author-en", ui.labels.authorEn);
  setLabel("l-original", ui.labels.original);
  setLabel("l-lang", ui.labels.lang);
  setLabel("l-year", ui.labels.year);
  setLabel("l-source", ui.labels.source);
  setLabel("l-source-url", ui.labels.sourceUrl);
  setLabel("l-translator-url", ui.labels.translatorUrl);
  $("l-translator").textContent = ui.labels.translator;
  setLabel("l-tags", ui.labels.tags);
  $("l-bulk").textContent = ui.labels.bulk;

  $("h-year").textContent = ui.hints.year;
  $("h-source-url").textContent = ui.hints.sourceUrl;
  $("h-translator").textContent = ui.hints.translator;
  $("h-translator-url").textContent = ui.hints.translatorUrl;

  $("mode-text").textContent = ui.mode[mode] || ui.mode.checking;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const on = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", String(on));
    btn.classList.toggle("active", on);
  });

  renderTagPicker();
  renderLangSelect();
  renderGuide();
  renderLists();
}

async function refresh() {
  store = await loadStore();
  renderLists();
}

/* ── 이벤트 ────────────────────────────────────────────*/

function readForm() {
  const val = (name) => {
    const el = document.querySelector(`[name="${name}"]`);
    return el ? el.value : "";
  };
  return {
    text: { ko: val("text_ko"), en: val("text_en") },
    author: { ko: val("author_ko"), en: val("author_en") },
    original: val("original"),
    lang: val("lang"),
    source: val("source"),
    year: val("year"),
    sourceUrl: val("sourceUrl"),
    translator: val("translator"),
    translatorUrl: val("translatorUrl"),
    tags: Array.from(selectedTags),
  };
}

async function onSubmit(event) {
  event.preventDefault();
  const msg = $("form-msg");
  const draft = readForm();
  const existing = store.pending.concat(store.approved);
  const errors = validate(draft, existing);

  if (errors.length > 0) {
    message(msg, "error", errors.join("\n"));
    msg.scrollIntoView({ block: "nearest" });
    return;
  }

  try {
    await addQuotes([normalize(draft)]);
    await refresh();
    $("quote-form").reset();
    selectedTags.clear();
    renderTagPicker();
    $("translator-url-field").hidden = true;
    message(msg, "ok", t().msg.added);
  } catch (err) {
    message(msg, "error", t().msg.saveFailed + err.message);
  }
}

async function onBulk() {
  const msg = $("bulk-msg");
  const raw = $("f-bulk").value.trim();

  if (!raw) {
    message(msg, "error", t().msg.emptyJson);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    message(msg, "error", t().msg.badJson + err.message);
    return;
  }

  const incoming = Array.isArray(parsed) ? parsed : [parsed];
  if (incoming.length === 0) {
    message(msg, "error", t().msg.emptyJson);
    return;
  }

  // 통과한 것만 넣고, 걸린 것은 몇 번째가 왜 걸렸는지 말한다.
  // 하나가 틀렸다고 전부 물리면 붙여넣은 쪽이 어디를 고쳐야 할지 모른다.
  const good = [];
  const problems = [];
  const existing = store.pending.concat(store.approved);

  incoming.forEach((item, i) => {
    const shaped = {
      text: item.text || {},
      author: item.author || {},
      original: item.original,
      lang: item.lang,
      source: item.source,
      year: item.year,
      sourceUrl: item.sourceUrl,
      translator: item.translator,
      translatorUrl: item.translatorUrl,
      tags: item.tags,
    };
    const errors = validate(shaped, existing.concat(good));
    if (errors.length > 0) {
      problems.push(`#${i + 1} — ${errors.join(" / ")}`);
    } else {
      good.push(normalize(shaped));
    }
  });

  if (good.length === 0) {
    message(msg, "error", problems.join("\n"));
    return;
  }

  try {
    await addQuotes(good);
    await refresh();
    if (problems.length === 0) {
      $("f-bulk").value = "";
      message(msg, "ok", t().msg.bulkAdded(good.length));
    } else {
      message(
        msg,
        "error",
        `${t().msg.bulkPartial(good.length, problems.length)}\n${problems.join("\n")}`
      );
    }
  } catch (err) {
    message(msg, "error", t().msg.saveFailed + err.message);
  }
}

function selectPanel(name) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.panel === name));
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.hidden = panel.id !== `panel-${name}`;
  });
}

function setLang(next) {
  if (!UI[next] || next === lang) return;
  lang = next;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (_) {
    /* 저장 못 해도 이번 세션은 동작해야 한다. */
  }
  applyLang();
}

function initialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && UI[saved]) return saved;
  } catch (_) {
    /* 무시 */
  }
  return "ko";
}

async function init() {
  lang = initialLang();

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => selectPanel(tab.dataset.panel));
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  $("quote-form").addEventListener("submit", onSubmit);
  $("bulk-btn").addEventListener("click", onBulk);

  // 번역자를 적기 시작하면 근거 URL 칸이 나타난다. 늘 띄워두면
  // 대부분의 경우에 빈 칸 하나가 이유 없이 서 있게 된다.
  $("f-translator").addEventListener("input", (e) => {
    $("translator-url-field").hidden = e.target.value.trim() === "";
  });

  $("copy-all-btn").addEventListener("click", () => {
    if (store.approved.length === 0) {
      toast(t().msg.nothingToCopy);
      return;
    }
    copyText(store.approved.map((q) => toEntry(q, q.id || "/* id */")).join("\n"));
  });

  applyLang();

  mode = await detectMode();
  $("mode").dataset.mode = mode;
  $("mode-text").textContent = t().mode[mode];
  $("review-lede").textContent = mode === "server" ? t().reviewLede : t().reviewLedeLocal;

  try {
    await refresh();
  } catch (err) {
    toast(t().msg.saveFailed + err.message);
  }
}

init();
