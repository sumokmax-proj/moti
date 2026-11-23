/* 새 탭 — 새 탭을 열 때마다 명언 한 줄 (LAUNCH_CHECKLIST C2).
 *
 * 앱(app.js)의 데이터를 그대로 쓴다: QUOTES · QUOTES_VI(베타) · QUOTES_CONTEXT.
 * 고르는 법: 그 언어로 된 명언 중, 최근에 보인 것(RECENT_SIZE 개)은 빼고 무작위로.
 * 언어: 직접 고른 것 → 없으면 브라우저 언어(ko·vi), 그 밖에는 영어.
 * 저장은 이 익스텐션의 localStorage 뿐이다(언어·최근 목록). 밖으로 보내는 것은 없다. */

const SITE = "https://motimoti.page/";
const LANGS = ["en", "ko", "vi"];
const LANG_KEY = "motimoti-lang";
const RECENT_KEY = "motimoti-recent";
const RECENT_SIZE = 40;
const LONG_QUOTE = { en: 150, ko: 90, vi: 160 };

const UI = {
  en: {
    title: "New Tab",
    home: "Open this line on motimoti.page",
    kinds: { speech: "Speech", letter: "Letter", diary: "Diary", interview: "Interview", calligraphy: "Calligraphy", inscription: "Inscription", testimony: "Account" },
    links: { work: "Read the original", speech: "Read the speech", letter: "Read the letter", diary: "Read the diary", interview: "Read the interview", calligraphy: "See the calligraphy", inscription: "Read the text", testimony: "Read the account", cited: "Source evidence" },
    year: (y, circa) => (y < 0 ? `${circa ? "c. " : ""}${-y} BC` : `${circa ? "c. " : ""}${y}`),
    original: "Original",
    context: "Where this comes from",
    translator: (name) => `English translation by ${name}`,
    cited: "Checked against a source that cites the original and where it appears.",
  },
  ko: {
    title: "새 탭",
    home: "이 명언을 motimoti.page 에서 열기",
    kinds: { speech: "연설", letter: "편지", diary: "일기", interview: "인터뷰", calligraphy: "유묵", inscription: "새긴 글", testimony: "증언" },
    links: { work: "원전 읽기", speech: "연설문 읽기", letter: "편지 읽기", diary: "일기 읽기", interview: "인터뷰 읽기", calligraphy: "유묵 보기", inscription: "원문 읽기", testimony: "증언 읽기", cited: "출처 확인 자료" },
    year: (y, circa) => `${y < 0 ? `기원전 ${-y}` : y}년${circa ? "경" : ""}`,
    original: "원문",
    context: "이 문장이 나온 자리",
    translator: (name) => `영역 ${name}`,
    cited: "원문 대신, 원문과 그 위치를 밝혀 인용한 자료로 확인한 문장입니다.",
  },
  vi: {
    title: "Thẻ mới",
    home: "Mở câu này trên motimoti.page",
    kinds: { speech: "Diễn văn", letter: "Thư", diary: "Nhật ký", interview: "Phỏng vấn", calligraphy: "Thư pháp", inscription: "Văn khắc", testimony: "Lời kể" },
    links: { work: "Đọc nguyên tác", speech: "Đọc diễn văn", letter: "Đọc bức thư", diary: "Đọc nhật ký", interview: "Đọc bài phỏng vấn", calligraphy: "Xem thư pháp", inscription: "Đọc văn bản", testimony: "Đọc lời kể", cited: "Tài liệu đối chiếu" },
    year: (y, circa) => `${circa ? "khoảng " : ""}${y < 0 ? `${-y} TCN` : y}`,
    original: "Nguyên văn",
    context: "Câu nói này đến từ đâu",
    translator: (name) => `Bản dịch tiếng Anh: ${name}`,
    cited: "Đã đối chiếu qua tài liệu có trích dẫn nguyên văn và vị trí của nó.",
  },
};

// 베트남어(베타)는 따로 있는 파일에서 id 로 붙인다 — 앱과 같다.
if (typeof QUOTES_VI !== "undefined") {
  for (const q of QUOTES) {
    const vi = QUOTES_VI[q.id];
    if (vi) {
      q.text.vi = vi.text;
      q.author.vi = vi.author;
    }
  }
}

const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* 저장을 못 해도 새 탭은 그대로 */ }
  },
};

const hasLang = (q, code) => Boolean(q.text && q.text[code]);
const langAvailable = (code) => QUOTES.some((q) => hasLang(q, code));

function startLang() {
  const saved = store.get(LANG_KEY);
  if (LANGS.includes(saved) && langAvailable(saved)) return saved;
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("vi") && langAvailable("vi")) return "vi";
  return "en";
}

function readRecent() {
  try {
    const list = JSON.parse(store.get(RECENT_KEY) || "[]");
    return Array.isArray(list) ? list.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

// 최근에 보인 명언은 빼고 고른다. 다 빠지면(그 언어의 명언이 적을 때) 바로 앞의 것만 뺀다.
function pickQuote(code, random = Math.random) {
  const pool = QUOTES.filter((q) => hasLang(q, code));
  const recent = readRecent();
  let fresh = pool.filter((q) => !recent.includes(q.id));
  if (!fresh.length) fresh = pool.filter((q) => q.id !== recent[0]);
  if (!fresh.length) fresh = pool;
  const quote = fresh[Math.floor(random() * fresh.length)];
  store.set(RECENT_KEY, JSON.stringify([quote.id, ...recent.filter((id) => id !== quote.id)].slice(0, RECENT_SIZE)));
  return quote;
}

const field = (f, code) => (f ? f[code] || f.en || f.ko || "" : "");

// *제목* 을 기울임으로. innerHTML 을 쓰지 않는다.
function setItalicText(el, text) {
  el.textContent = "";
  String(text).split(/(\*[^*]+\*)/).forEach((part) => {
    if (!part) return;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      const i = document.createElement("i");
      i.textContent = part.slice(1, -1);
      el.append(i);
    } else {
      el.append(document.createTextNode(part));
    }
  });
}

function readableUrl(url) {
  const g = String(url).match(/^https?:\/\/(?:www\.)?gutenberg\.org\/(?:cache\/epub|files)\/(\d+)\//);
  return g ? `https://www.gutenberg.org/ebooks/${g[1]}` : url;
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

const sameWords = (a, b) => {
  const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return norm(a) === norm(b);
};

const $ = (id) => document.getElementById(id);
let lang = startLang();
let quote = pickQuote(lang);

function render() {
  const ui = UI[lang];
  document.documentElement.lang = lang;
  document.title = ui.title;

  const text = field(quote.text, lang);
  $("quote").textContent = text;
  $("quote").classList.toggle("long", text.length > LONG_QUOTE[lang]);
  $("author").textContent = field(quote.author, lang);

  const kind = quote.kind && ui.kinds[quote.kind];
  const year = ui.year(quote.year, quote.circa === true);
  $("note-kind").textContent = kind ? `${kind} · ${year}` : year;
  setItalicText($("note-title"), field(quote.source, lang));

  const ctx = typeof QUOTES_CONTEXT !== "undefined" && QUOTES_CONTEXT[quote.id];
  $("note-context").hidden = !ctx;
  if (ctx) {
    $("note-context-label").textContent = ui.context;
    setItalicText($("note-context-text"), ctx[lang] || ctx.en);
  }

  const showOrig = quote.original && !sameWords(quote.original, text);
  $("note-orig").hidden = !showOrig;
  if (showOrig) {
    $("note-orig-label").textContent = ui.original;
    $("note-orig-text").textContent = quote.original;
    $("note-orig-text").lang = quote.lang === "lzh" ? "zh-Hant" : quote.lang || "";
  }

  const translator = lang === "en" && quote.translator && quote.translator.en;
  $("note-tr").hidden = !translator;
  if (translator) $("note-tr").textContent = ui.translator(translator);
  $("note-cited").hidden = quote.cited !== true;
  $("note-cited").textContent = ui.cited;

  const url = readableUrl(quote.sourceUrl);
  $("note-link").href = url;
  $("note-link-label").textContent = `${quote.cited ? ui.links.cited : ui.links[quote.kind] || ui.links.work} →`;
  $("note-host").textContent = hostOf(url);

  // 같은 명언을 motimoti.page 에서 — 휴대폰으로 건네거나 이어 읽게(펼쳐서 건네기).
  $("home").href = `${SITE}${lang}/${quote.id}/`;
  $("home").title = ui.home;
  $("home").setAttribute("aria-label", ui.home);

  for (const b of document.querySelectorAll(".lang button")) {
    b.hidden = !langAvailable(b.dataset.lang);
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  }
}

function toggleNote(open = $("note").hidden) {
  $("note").hidden = !open;
  $("author").setAttribute("aria-expanded", String(open));
}

$("author").addEventListener("click", () => toggleNote());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("note").hidden) toggleNote(false);
});

// 언어를 바꾸면 같은 명언을 그 언어로. 그 언어에 없는 명언이면(베트남어 베타) 새로 고른다.
for (const b of document.querySelectorAll(".lang button")) {
  b.addEventListener("click", () => {
    const code = b.dataset.lang;
    if (code === lang || !langAvailable(code)) return;
    lang = code;
    store.set(LANG_KEY, code);
    if (!hasLang(quote, code)) quote = pickQuote(code);
    render();
  });
}

render();
