/* 스테이징(motimoti.page/staging/)은 실험 기능을 미리 써 보는 곳이다. 본 앱과 같은
   사이트라 기기 저장소를 함께 쓰므로, 저장 키 앞에 stg- 를 붙여 즐겨찾기·최근
   목록이 섞이지 않게 한다. 로고 옆에 작게 STG 를 띄워 어느 쪽인지 알게 한다. */
const IS_STAGING = /\/staging\//.test(location.pathname);
const KEY_PREFIX = IS_STAGING ? "stg-" : "";
const FAVORITES_KEY = `${KEY_PREFIX}motimoti-favorites`;
const LANG_KEY = `${KEY_PREFIX}motimoti-lang`;
const RECENT_KEY = `${KEY_PREFIX}motimoti-recent`;
const WEIGHT_KEY = `${KEY_PREFIX}motimoti-favorites-weight`;
if (IS_STAGING) document.documentElement.classList.add("staging");
const LANGS = ["en", "ko", "vi"];
// 베트남어는 베타다 — AI 번역, 원어민 검수 전. 화면에는 버튼의 β 하나만 둔다.
// 안내문은 붙이지 않는다(사용자 결정, 2026-10-13).
const BETA_LANGS = ["vi"];

// 베트남어(베타)는 quotes-vi.js 에 따로 있다. 시작할 때 id 로 명언에 붙여 두면
// 나머지 코드는 text[lang] 하나로 읽는다. 베트남어가 없는 명언은 베트남어
// 화면에서 저절로 빠진다(hasLang).
if (typeof QUOTES_VI !== "undefined") {
  for (const q of QUOTES) {
    const vi = QUOTES_VI[q.id];
    if (!vi) continue;
    q.text.vi = vi.text;
    q.author.vi = vi.author;
  }
}

const UI = {
  en: {
    next: "Next",
    favorites: "Favorites",
    remove: "Remove",
    count: (n) => `${n} ${n === 1 ? "quote" : "quotes"}`,
    empty: "Nothing saved yet.",
    weight: "Show more often",
    weightHint: "Saved quotes turn up twice as often",
    copied: "Copied to clipboard",
    shareUnsupported: "Sharing isn’t supported in this browser",
    about: "About this book",
    colophon: {
      mottoSource: "*Analects* 1.1, tr. James Legge",
      text1: (n) => `This book holds ${n} quotes. Every one was checked against the text it comes from; a line with no source we could point to was left out.`,
      text2: "Tap an author's name to open the page the line comes from.",
      person: (year, name) => `${name}, ${year}`,
      languageNames: { en: "English", lzh: "Classical Chinese", la: "Latin", de: "German", fr: "French", grc: "Ancient Greek", ko: "Korean", zh: "Chinese", nl: "Dutch", es: "Spanish", it: "Italian", da: "Danish" },
      rows: {
        quotes: "Quotes", quotesValue: (n, a) => `${n} · ${a} authors`,
        span: "Span", spanValue: (a, b) => `${a} to ${b}`,
        languages: "Originals", languagesValue: (n) => `${n} languages`,
        english: "English", englishValue: (o, p, s) => `${o} in the original · ${p} in published translations · ${s} translated for this book`,
        translators: "Translators",
        korean: "Korean", koreanValue: (o, s) => `${o} in the original · ${s} translated for this book`,
        editor: "Edited by",
        date: "Published", dateValue: (d) => { const [y, m, day] = d.split("-").map(Number); return `${day} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m - 1]} ${y}`; },
      },
    },
    note: {
      kinds: { speech: "Speech", letter: "Letter", diary: "Diary", interview: "Interview", calligraphy: "Calligraphy", inscription: "Inscription", testimony: "Account" },
      links: { work: "Read the original", speech: "Read the speech", letter: "Read the letter", diary: "Read the diary", interview: "Read the interview", calligraphy: "See the calligraphy", inscription: "Read the text", testimony: "Read the account", cited: "Source evidence" },
      year: (y, circa) => (y < 0 ? `${circa ? "c. " : ""}${-y} BC` : `${circa ? "c. " : ""}${y}`),
      original: "Original",
      context: "Where this comes from",
      translator: (name) => `English translation by ${name}`,
      cited: "Checked against a source that cites the original and where it appears.",
    },
    aria: {
      openFavorites: "Open favorites",
      favorite: "Add to favorites",
      share: "Share",
      back: "Back",
      language: "Language",
      vi: "Vietnamese (beta)",
      source: "source",
    },
  },
  ko: {
    next: "다음",
    favorites: "즐겨찾기",
    remove: "삭제",
    count: (n) => `${n}편`,
    empty: "아직 저장한 명언이 없어요.",
    weight: "더 자주 펼치기",
    weightHint: "저장한 명언이 두 배 자주 펼쳐집니다",
    copied: "클립보드에 복사되었습니다",
    shareUnsupported: "공유하기를 지원하지 않는 브라우저입니다",
    about: "이 책에 대하여",
    colophon: {
      mottoSource: "『논어』 학이편 1",
      text1: (n) => `이 책에는 명언 ${n}편이 실려 있습니다. 모든 명언은 그 문장이 나온 원문에서 확인했고, 출처를 댈 수 없는 문장은 싣지 않았습니다.`,
      text2: "작가 이름을 누르면 그 문장이 나온 곳이 펼쳐집니다.",
      person: (year, name) => `${year} ${name}`,
      languageNames: { en: "영어", lzh: "한문", la: "라틴어", de: "독일어", fr: "프랑스어", grc: "고대 그리스어", ko: "한국어", zh: "중국어", nl: "네덜란드어", es: "스페인어", it: "이탈리아어", da: "덴마크어" },
      rows: {
        quotes: "실린 명언", quotesValue: (n, a) => `${n}편 · 저자 ${a}명`,
        span: "시대", spanValue: (a, b) => `${a}부터 ${b}까지`,
        languages: "원문", languagesValue: (n) => `${n}개 언어`,
        english: "영어", englishValue: (o, p, s) => `원문 그대로 ${o}편 · 공개된 정본 영역 ${p}편 · 자체 번역 ${s}편`,
        translators: "영역",
        korean: "한국어", koreanValue: (o, s) => `원문 그대로 ${o}편 · 자체 번역 ${s}편`,
        editor: "엮은이",
        date: "펴낸 날", dateValue: (d) => { const [y, m, day] = d.split("-").map(Number); return `${y}년 ${m}월 ${day}일`; },
      },
    },
    note: {
      kinds: { speech: "연설", letter: "편지", diary: "일기", interview: "인터뷰", calligraphy: "유묵", inscription: "새긴 글", testimony: "증언" },
      links: { work: "원전 읽기", speech: "연설문 읽기", letter: "편지 읽기", diary: "일기 읽기", interview: "인터뷰 읽기", calligraphy: "유묵 보기", inscription: "원문 읽기", testimony: "증언 읽기", cited: "출처 확인 자료" },
      year: (y, circa) => `${y < 0 ? `기원전 ${-y}` : y}년${circa ? "경" : ""}`,
      original: "원문",
      context: "이 문장이 나온 자리",
      translator: (name) => `영역 ${name}`,
      cited: "원문 대신, 원문과 그 위치를 밝혀 인용한 자료로 확인한 문장입니다.",
    },
    aria: {
      openFavorites: "즐겨찾기 목록 열기",
      favorite: "즐겨찾기",
      share: "공유하기",
      back: "메인으로 돌아가기",
      language: "언어",
      vi: "베트남어 (베타)",
      source: "출처",
    },
  },
  vi: {
    next: "Tiếp",
    favorites: "Yêu thích",
    remove: "Xóa",
    count: (n) => `${n} câu`,
    empty: "Chưa lưu câu nào.",
    weight: "Hiện thường hơn",
    weightHint: "Câu đã lưu sẽ xuất hiện nhiều gấp đôi",
    copied: "Đã sao chép",
    shareUnsupported: "Trình duyệt này không hỗ trợ chia sẻ",
    about: "Về cuốn sách này",
    colophon: {
      mottoSource: "Luận Ngữ, Học Nhi 1",
      text1: (n) => `Cuốn sách này có ${n} câu. Mỗi câu đều đã được đối chiếu với văn bản gốc; câu nào không chỉ ra được nguồn thì không đưa vào.`,
      text2: "Chạm vào tên tác giả để mở nơi câu ấy xuất hiện.",
      person: (year, name) => `${name} (${year})`,
      languageNames: { en: "tiếng Anh", lzh: "Hán văn", la: "tiếng Latinh", de: "tiếng Đức", fr: "tiếng Pháp", grc: "tiếng Hy Lạp cổ", ko: "tiếng Hàn", zh: "tiếng Trung", nl: "tiếng Hà Lan", es: "tiếng Tây Ban Nha", it: "tiếng Ý", da: "tiếng Đan Mạch" },
      rows: {
        quotes: "Số câu", quotesValue: (n, a) => `${n} câu · ${a} tác giả`,
        span: "Thời đại", spanValue: (a, b) => `từ ${a} đến ${b}`,
        languages: "Nguyên văn", languagesValue: (n) => `${n} ngôn ngữ`,
        english: "Tiếng Anh", englishValue: (o, p, s) => `${o} câu nguyên văn · ${p} câu theo bản dịch đã xuất bản · ${s} câu tự dịch`,
        translators: "Người dịch",
        korean: "Tiếng Hàn", koreanValue: (o, s) => `${o} câu nguyên văn · ${s} câu tự dịch`,
        editor: "Biên soạn",
        date: "Ngày xuất bản", dateValue: (d) => { const [y, m, day] = d.split("-").map(Number); return `${day}/${m}/${y}`; },
      },
    },
    note: {
      kinds: { speech: "Diễn văn", letter: "Thư", diary: "Nhật ký", interview: "Phỏng vấn", calligraphy: "Thư pháp", inscription: "Văn khắc", testimony: "Lời kể" },
      links: { work: "Đọc nguyên tác", speech: "Đọc diễn văn", letter: "Đọc bức thư", diary: "Đọc nhật ký", interview: "Đọc bài phỏng vấn", calligraphy: "Xem thư pháp", inscription: "Đọc văn bản", testimony: "Đọc lời kể", cited: "Tài liệu đối chiếu" },
      year: (y, circa) => `${circa ? "khoảng " : ""}${y < 0 ? `${-y} TCN` : y}`,
      original: "Nguyên văn",
      context: "Câu nói này đến từ đâu",
      translator: (name) => `Bản dịch tiếng Anh: ${name}`,
      cited: "Đã đối chiếu qua tài liệu có trích dẫn nguyên văn và vị trí của nó.",
    },
    aria: {
      openFavorites: "Mở danh sách yêu thích",
      favorite: "Yêu thích",
      share: "Chia sẻ",
      back: "Quay lại",
      language: "Ngôn ngữ",
      vi: "Tiếng Việt (beta)",
      source: "nguồn",
    },
  },
};

const quoteBlockEl = document.getElementById("quote-block");
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const favoriteBtn = document.getElementById("favorite-btn");
const shareBtn = document.getElementById("share-btn");
const nextBtn = document.getElementById("next-btn");
const mainView = document.getElementById("main-view");
const favoritesView = document.getElementById("favorites-view");
const favoritesNavBtn = document.getElementById("favorites-nav-btn");
const backBtn = document.getElementById("back-btn");
const favoritesListEl = document.getElementById("favorites-list");
const favoritesEmptyEl = document.getElementById("favorites-empty");
const favoritesCountEl = document.getElementById("favorites-count");
const favoritesCountRowEl = document.getElementById("favorites-count-row");
const favoritesTitleEl = document.getElementById("favorites-title");
const weightBtn = document.getElementById("weight-btn");
const toastEl = document.getElementById("toast");
const appHeaderEl = document.querySelector(".app-header");
const noteEl = document.getElementById("source-note");
const noteVeilEl = document.getElementById("note-veil");
const colophonEl = document.getElementById("colophon");
const aboutBtn = document.getElementById("about-btn");
const langBtns = Array.from(document.querySelectorAll(".lang-btn"));

let currentQuote = null;
let toastTimer = null;
let lang = resolveInitialLang();

/* ── 언어 ─────────────────────────────────────────────── */

function resolveInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  if (LANGS.includes(stored) && langAvailable(stored)) return stored;
  // 저장된 선택이 없을 때만 브라우저 언어를 본다. 한 번이라도 고르면
  // 그 뒤로는 감지하지 않는다.
  const preferred = navigator.languages || [navigator.language || ""];
  return preferred.some((l) => String(l).toLowerCase().startsWith("ko")) ? "ko" : "en";
}

function t() {
  return UI[lang];
}

// text/author 는 { ko, en } 이다. 요청한 언어가 비어 있으면 다른 언어로
// 대체한다 — 즐겨찾기처럼 이미 사용자가 저장한 항목을 잃지 않기 위해서다.
// (명언 풀 자체는 pickRandomQuote 에서 미리 걸러 언어가 섞이지 않는다.)
function localized(field) {
  if (!field) return "";
  if (typeof field === "string") return field; // 옛 즐겨찾기 스냅샷
  return field[lang] || field.en || field.ko || "";
}

function hasLang(quote, code) {
  return Boolean(quote.text && quote.text[code]);
}

// 그 언어로 된 명언이 하나라도 있어야 고를 수 있다. 베타 데이터 파일이 빠졌거나
// 비어 있으면 버튼을 숨기고, 저장된 선택도 따르지 않는다.
function langAvailable(code) {
  return QUOTES.some((q) => hasLang(q, code));
}

function setLang(next) {
  if (!LANGS.includes(next) || next === lang || !langAvailable(next)) return;
  lang = next;
  localStorage.setItem(LANG_KEY, lang);
  stopRiffle(); // 넘어가던 낱장은 옛 언어로 그려져 있다
  applyLang();
  // 현재 명언이 새 언어로 준비돼 있지 않으면 다른 명언으로 바꾼다.
  if (currentQuote && !hasLang(currentQuote, lang)) {
    currentQuote = turnPage(currentQuote.id);
  }
  renderQuote(currentQuote);
  if (!favoritesView.classList.contains("hidden")) renderFavoritesList();
}

function applyLang() {
  const ui = t();
  document.documentElement.lang = lang;
  nextBtn.textContent = ui.next;
  favoritesTitleEl.textContent = ui.favorites;
  favoritesEmptyEl.textContent = ui.empty;
  weightBtn.textContent = ui.weight;
  weightBtn.title = ui.weightHint;
  favoritesNavBtn.setAttribute("aria-label", ui.aria.openFavorites);
  favoriteBtn.setAttribute("aria-label", ui.aria.favorite);
  shareBtn.setAttribute("aria-label", ui.aria.share);
  backBtn.setAttribute("aria-label", ui.aria.back);
  aboutBtn.textContent = ui.about;
  if (noteOpen) fillNote(noteQuote);
  if (paperEl === colophonEl) fillColophon();
  langBtns.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    btn.classList.toggle("active", btn.dataset.lang === lang);
    const available = langAvailable(btn.dataset.lang);
    btn.hidden = !available;
    // 앞의 「·」 도 함께 숨긴다.
    const sep = btn.previousElementSibling;
    if (sep && sep.classList.contains("lang-sep")) sep.hidden = !available;
    if (ui.aria[btn.dataset.lang]) {
      btn.setAttribute("aria-label", ui.aria[btn.dataset.lang]);
      btn.title = ui.aria[btn.dataset.lang];
    }
  });
}

/* ── 즐겨찾기 ─────────────────────────────────────────── */

function getFavorites() {
  try {
    const raw = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
  return getFavorites().some((q) => q.id === id);
}

// 저장은 id 와 최소 스냅샷만 한다. 화면은 항상 QUOTES 에서 id 로 다시 찾아
// 그리므로 언어를 바꾸면 즐겨찾기도 따라 바뀐다. 스냅샷은 데이터에서 사라진
// id(삭제된 명언)를 위한 폴백으로만 쓴다.
function toggleFavorite(quote) {
  const favorites = getFavorites();
  const index = favorites.findIndex((q) => q.id === quote.id);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push({ id: quote.id, text: quote.text, author: quote.author });
  }
  saveFavorites(favorites);
  updateFavoriteButton();
}

function removeFavorite(id) {
  saveFavorites(getFavorites().filter((q) => q.id !== id));
  renderFavoritesList();
}

/* 자주 펼친 쪽이 잘 펼쳐진다 — 실제 책은 자주 펼친 곳에 길이 든다.
 *
 * 켜 두면 즐겨찾기한 명언이 두 배 자주 나온다. 「아무 쪽이나」의 공평함과
 * 맞바꾸는 것이라 끌 수 있게 했고, 기본은 켬이다.
 *
 * 가중치는 최근 20% 피하기를 통과한 후보 안에서만 건다. 그래서 즐겨찾기라도
 * 방금 본 명언이 곧바로 다시 나오지는 않는다 — 돌아오는 간격이 짧아질 뿐이다.
 * 2배로 둔 것은, 이보다 크면 즐겨찾기가 많지 않을 때 같은 몇 편만 맴도는
 * 느낌이 나기 때문이다. */
const FAVORITE_WEIGHT = 2;

function loadWeightSetting() {
  try {
    return localStorage.getItem(WEIGHT_KEY) !== "off";
  } catch {
    return true;
  }
}

let weightFavorites = loadWeightSetting();

function setWeightFavorites(on) {
  weightFavorites = on;
  try {
    localStorage.setItem(WEIGHT_KEY, on ? "on" : "off");
  } catch {
    // 저장이 막혀도 이번 방문 동안은 따른다.
  }
  updateWeightButton();
}

function updateWeightButton() {
  weightBtn.setAttribute("aria-pressed", String(weightFavorites));
  weightBtn.classList.toggle("active", weightFavorites);
}

function updateFavoriteButton() {
  const active = !!(currentQuote && isFavorite(currentQuote.id));
  favoriteBtn.classList.toggle("active", active);
  favoriteBtn.setAttribute("aria-pressed", String(active));
}

/* ── 명언 ─────────────────────────────────────────────── */

/* 명언 책을 아무 데나 펼치는 느낌을 낸다.
 *
 * 순서도, 「다 봤는지」 기록도 없다. 매번 전부 같은 확률로 펼치되, 최근에
 * 펼친 몇 쪽만 잠시 피한다 — 방금 덮은 쪽이 바로 다시 펼쳐지면 넘긴 의미가
 * 없지만, 한참 뒤에 예전 쪽이 다시 펼쳐지는 것은 반가운 일이다.
 *
 * 피하는 폭은 전체의 20% 다. 고정 숫자로 두지 않은 것은 명언이 늘어도 같은
 * 느낌을 유지하기 위해서다(100편이면 20편, 200편이면 40편). 100편 기준으로
 * 한 명언은 최소 21번째 넘김 이후에야 다시 나오고, 평균 100번쯤에 돌아온다.
 *
 * 최근 목록은 기기에 저장해 앱을 닫았다 열어도 이어진다. 어제 마지막으로
 * 본 명언이 오늘 첫 화면에 다시 나오지 않게 하려는 것이다. 저장할 수 없는
 * 환경(사생활 보호 모드 등)에서는 메모리에만 둔다. */
const RECENT_RATIO = 0.2;

function recentWindow(poolSize) {
  return Math.floor(poolSize * RECENT_RATIO);
}

// 시작할 때 한 번만 저장소에서 읽고, 그 뒤로는 메모리가 기준이다. 매번
// 저장소를 다시 읽으면, 쓰기가 막힌 환경에서 옛 목록만 계속 돌려받는다.
function loadRecent() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY));
    if (Array.isArray(raw)) return raw.filter(Number.isInteger);
  } catch {
    // 못 읽으면 빈 목록에서 시작한다.
  }
  return [];
}

let recentMemory = loadRecent();

function getRecent() {
  return recentMemory;
}

function rememberShown(id) {
  const keep = Math.max(1, recentWindow(QUOTES.length));
  const recent = recentMemory.filter((x) => x !== id);
  recent.push(id);
  recentMemory = recent.slice(-keep);
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentMemory));
  } catch {
    // 저장이 막혀도 이번 방문 동안은 recentMemory 로 동작한다.
  }
}

function pickRandomQuote(excludeId) {
  const available = QUOTES.filter((q) => hasLang(q, lang));
  // 최근 목록은 언어를 가리지 않고 쌓이므로, 지금 언어의 풀 크기로 폭을 잰다.
  const avoid = new Set(getRecent().slice(-recentWindow(available.length)));
  avoid.add(excludeId);
  const fresh = available.filter((q) => !avoid.has(q.id));
  // 풀이 작아 전부 피해야 하는 경우에도 같은 명언이 연달아 나오지는 않게 한다.
  const notCurrent = available.filter((q) => q.id !== excludeId);
  const candidates = fresh.length > 0 ? fresh : notCurrent.length > 0 ? notCurrent : available;
  return weightedChoice(candidates);
}

function weightedChoice(candidates) {
  if (!weightFavorites) return candidates[Math.floor(Math.random() * candidates.length)];
  const favorites = new Set(getFavorites().map((f) => f.id));
  const weightOf = (q) => (favorites.has(q.id) ? FAVORITE_WEIGHT : 1);
  let r = Math.random() * candidates.reduce((sum, q) => sum + weightOf(q), 0);
  for (const q of candidates) {
    r -= weightOf(q);
    if (r < 0) return q;
  }
  return candidates[candidates.length - 1];
}

/* 한 쪽을 펼친다 — 고르는 순간 최근 목록에 넣는다. 화면에 그리는 시점(페이드
   뒤 200ms)에 넣으면, 빠르게 두 번 누를 때 둘 다 같은 목록을 보고 고르게 된다. */
function turnPage(excludeId) {
  const quote = pickRandomQuote(excludeId);
  if (quote) rememberShown(quote.id);
  wentBack = false; // 새 쪽으로 나아가면 다시 한 장 되돌아갈 수 있다
  return quote;
}

/* 긴 명언이 화면을 넘기지 않게 본문을 한 눈금씩 줄인다.
 *
 * 글자수로 판정하지 않고 실제로 넘치는지를 본다. 같은 글자수라도 언어·기기·
 * 글꼴에 따라 차지하는 높이가 다르다 — 한글은 네모틀을 꽉 채우고 라틴은
 * x-height 만 쓴다. 재보는 쪽이 정확하다.
 *
 * 길이 상한(수집기의 MAX_KO/MAX_EN)은 "이 정도면 큰 화면에 들어간다" 는
 * 선이고, 이 함수는 작은 화면에서 그 선을 지키는 장치다. 둘이 같은 일을
 * 나눠 맡는다.
 *
 * MIN_SIZE 까지 줄여도 넘치면 거기서 멈추고 스크롤을 허용한다. 글자를 읽지
 * 못할 만큼 줄이는 것보다는 스크롤이 낫다. */
const MIN_QUOTE_SIZE = 15;

/* 잴 수 없을 때는 재지 않는다 — 둘 다 실제로 겪은 일이다.
 *
 * 1) 즐겨찾기 화면이 떠 있으면 명언은 숨어 있고, 문서 높이는 즐겨찾기 목록이
 *    정한다. 이때 재면(주소창이 접히며 오는 resize, 즐겨찾기 화면에서 언어
 *    전환) 「넘친다」 가 계속 참이라 글자가 최소 15px 까지 내려간 채 남았다.
 *    그래서 숨어 있을 때는 미뤄 두고, 메인으로 돌아올 때 잰다.
 * 2) 넘침이 글자 때문이 아닐 수도 있다(iOS 주소창이 움직이는 도중 innerHeight
 *    와 100dvh 가 한 프레임 어긋나는 등). 한 눈금 줄였는데 넘침이 그대로면
 *    글자가 원인이 아니다 — 기본 크기로 두고 멈춘다. */
let fitDeferred = false;

function fitQuoteText() {
  if (mainView.classList.contains("hidden")) {
    fitDeferred = true;
    return;
  }
  fitDeferred = false;
  // 먼저 CSS 가 정한 기본 크기로 되돌린다. 안 그러면 앞 명언에서 줄인 값이 남는다.
  quoteTextEl.style.removeProperty("--quote-fit");

  const overflow = () => document.documentElement.scrollHeight - window.innerHeight;
  let before = overflow();
  if (before <= 1) return;

  const base = Math.round(parseFloat(getComputedStyle(quoteTextEl).fontSize));
  for (let size = base - 1; size >= MIN_QUOTE_SIZE; size -= 1) {
    quoteTextEl.style.setProperty("--quote-fit", size + "px");
    const now = overflow();
    if (now <= 1) return;
    if (now >= before) {
      quoteTextEl.style.removeProperty("--quote-fit");
      return;
    }
    before = now;
  }
}

function renderQuote(quote) {
  if (!quote) return;
  quoteTextEl.textContent = localized(quote.text);
  quoteAuthorEl.textContent = localized(quote.author);
  quoteAuthorEl.setAttribute("aria-label", `${localized(quote.author)} — ${t().aria.source}`);
  updateFavoriteButton();
  fitQuoteText();
}

// 한 번에 한 쪽만 넘긴다. 넘기는 중(페이드 200ms)에 또 누르면 무시한다 —
// 아니면 화면에 보이지도 않은 명언이 최근 목록 자리를 차지한다.
let turning = false;

function showNextQuote() {
  if (turning) return;
  closeNote(true);
  turning = true;
  const nextQuote = turnPage(currentQuote ? currentQuote.id : null);
  quoteBlockEl.classList.add("fade");
  setTimeout(() => {
    currentQuote = nextQuote;
    renderQuote(currentQuote);
    quoteBlockEl.classList.remove("fade");
    turning = false;
  }, 200);
}

/* ── 책장 넘김 (숨은 장치) ─────────────────────────────
   「다음」을 길게 누르거나 명언을 왼쪽으로 밀면, 짧은 탭의 페이드 대신 책을
   엄지로 주르륵 넘기듯 4~7장이 빠르게 넘어가다 점점 느려지며 멈춘다.
   가볍게 넘기면 한 장, 꾹 누르면 주르륵 — 실제 책과 같은 손짓이다.

   - 상태를 기억하지 않는다. 짧은 탭은 언제나 페이드다.
   - 고를 명언은 누르는 순간 정해진다(turnPage). 넘김은 보여주는 방식일 뿐이라
     최근 20% 피하기 규칙이 그대로 적용된다.
   - 넘기는 중에 화면이나 「다음」을 탭하면 그 자리에서 멈춘다 — 넘어가는
     책장을 손가락으로 짚는 것처럼.
   - 동작 줄이기 설정이면 넘기지 않고 페이드로 바꾼다.
   값(0.8초, 접힘 28%)은 시험판에서 직접 눌러 보고 고른 것이다. */
const RIFFLE_MS = 800;
const LONG_PRESS_MS = 400;
const SWIPE_MIN_PX = 48;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let riffleAnims = [];

function makeSheet(kind) {
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.setAttribute("aria-hidden", "true");
  if (kind === "current") {
    // 지금 보던 쪽 그대로 — 이 쪽부터 넘어간다. 복제본의 id 는 지워야
    // 진짜 요소와 겹치지 않는다. 글자 크기 맞춤(--quote-fit)은 그대로 따라온다.
    for (const child of quoteBlockEl.children) {
      if (child.classList.contains("sheet") || child.classList.contains("cast")) continue;
      sheet.appendChild(child.cloneNode(true));
    }
    sheet.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  } else {
    // 지나가는 쪽은 빈 종이에 룰 하나. 글자 자리 막대를 그리면 「로딩 중」으로 읽힌다.
    const body = document.createElement("div");
    body.className = "quote-body";
    const rule = document.createElement("div");
    rule.className = "rule";
    body.appendChild(rule);
    sheet.appendChild(body);
  }
  const crease = document.createElement("div");
  crease.className = "crease";
  const shade = document.createElement("div");
  shade.className = "shade";
  sheet.append(crease, shade);
  const cast = document.createElement("div");
  cast.className = "cast";
  cast.setAttribute("aria-hidden", "true");
  return { sheet, cast };
}

function turnSheet({ sheet, cast }, delay, duration, easing, width) {
  // fill: both — 차례를 기다리는 동안에도 시작 모습(펼친 종이, 그림자 없음)을 지킨다.
  const opts = { delay, duration, easing, fill: "both" };
  // 끝까지 얇아지며 사라진다. 마지막 4% 에서 투명해지게 해 둔다 — 아니면 먼저
  // 넘어간 낱장이 머리카락 같은 줄로 책등에 남아, 마지막 장이 끝날 때까지 보인다.
  const fold = sheet.animate(
    [
      { transform: "scaleX(1)", opacity: 1 },
      { transform: "scaleX(0.04)", opacity: 1, offset: 0.96 },
      { transform: "scaleX(0.002)", opacity: 0 },
    ],
    opts
  );
  const shade = sheet.querySelector(".shade").animate([{ opacity: 0 }, { opacity: 0.9 }], opts);
  // 그림자는 넘어가는 가장자리를 따라 오른쪽에서 책등으로 오고,
  // 종이가 가장 높이 들린 중간에 가장 짙다.
  const shadow = cast.animate(
    [
      { transform: `translateX(${width}px)`, opacity: 0 },
      { transform: `translateX(${width * 0.5}px)`, opacity: 1, offset: 0.5 },
      { transform: "translateX(0px)", opacity: 0 },
    ],
    opts
  );
  riffleAnims.push(fold, shade, shadow);
  return fold;
}

function isRiffling() {
  return riffleAnims.length > 0;
}

function stopRiffle() {
  // 넘김 중이 아니면 손대지 않는다. 특히 turning 은 페이드도 쓰는 잠금이라,
  // 여기서 함부로 풀면 진행 중인 페이드가 두 번 겹칠 수 있다.
  if (!isRiffling()) return;
  riffleAnims.forEach((a) => a.cancel());
  riffleAnims = [];
  quoteBlockEl.querySelectorAll(".sheet, .cast").forEach((el) => el.remove());
  turning = false;
}

function riffleToNextQuote() {
  if (turning) return;
  closeNote(true);
  if (reduceMotion.matches) {
    showNextQuote();
    return;
  }
  turning = true;
  const nextQuote = turnPage(currentQuote ? currentQuote.id : null);
  // 마우스로 밀면 명언 글자가 선택된 채 넘어간다. 넘기기 전에 풀어 둔다.
  window.getSelection()?.removeAllRanges();

  const count = 4 + Math.floor(Math.random() * 4); // 4~7장 — 매번 달라야 「어디서 멈출까」가 생긴다
  const pairs = [makeSheet("current")];
  for (let k = 1; k < count; k++) pairs.push(makeSheet("blank"));
  // 위에 있는 쪽이 먼저 넘어간다. 각 그림자는 자기 종이 바로 아래, 다음 종이 위.
  pairs.forEach((p, k) => {
    p.sheet.style.zIndex = String(10 + (count - k) * 2);
    p.cast.style.zIndex = String(9 + (count - k) * 2);
    quoteBlockEl.append(p.cast, p.sheet);
  });

  // 새 쪽은 낱장 아래에 미리 그려 둔다. 글자 크기 맞춤도 종이가 덮고 있는
  // 동안 끝나므로, 바뀌는 순간 글자가 출렁이지 않는다.
  currentQuote = nextQuote;
  renderQuote(currentQuote);

  // 넘김 간격이 뒤로 갈수록 길어진다: 빠름 → 느림 → 멈춤.
  const width = pairs[0].sheet.offsetWidth;
  const gaps = pairs.map((_, k) => Math.pow(k + 1, 1.5));
  const lens = gaps.map((g) => g * 1.7);
  const starts = gaps.map((_, k) => gaps.slice(0, k).reduce((a, b) => a + b, 0));
  const scale = RIFFLE_MS / (starts[count - 1] + lens[count - 1]);
  let last;
  pairs.forEach((p, k) => {
    const easing = k === count - 1 ? "cubic-bezier(.3,.1,.25,1)" : "cubic-bezier(.4,.2,.6,1)";
    last = turnSheet(p, starts[k] * scale, lens[k] * scale, easing, width);
  });
  last.finished.then(stopRiffle).catch(() => {}); // cancel 되면 reject — 이미 치웠다
}

/* 「다음」: 짧게 누르면 페이드, 0.4초 이상 누르면 손을 떼기 전에 주르륵.
   키보드로는 Shift 를 누른 채 「다음」. */
let pressTimer = null;
let longPressFired = false;

function clearPressTimer() {
  clearTimeout(pressTimer);
  pressTimer = null;
}

nextBtn.addEventListener("pointerdown", (e) => {
  if (e.button !== 0) return;
  longPressFired = false;
  clearPressTimer();
  if (turning) return;
  pressTimer = setTimeout(() => {
    pressTimer = null;
    longPressFired = true;
    riffleToNextQuote();
  }, LONG_PRESS_MS);
});
["pointerup", "pointercancel", "pointerleave"].forEach((type) =>
  nextBtn.addEventListener(type, clearPressTimer)
);
// 길게 누를 때 뜨는 휴대폰 메뉴를 막는다.
nextBtn.addEventListener("contextmenu", (e) => e.preventDefault());

nextBtn.addEventListener("click", (e) => {
  if (longPressFired) {
    // 길게 눌러 이미 넘기기 시작했다. 손을 뗄 때 오는 click 은 삼킨다 —
    // 안 그러면 방금 시작한 넘김을 바로 멈춰 버린다.
    longPressFired = false;
    return;
  }
  if (isRiffling()) {
    stopRiffle();
    return;
  }
  if (e.shiftKey) riffleToNextQuote();
  else showNextQuote();
});

/* ── 한 장 되돌아가기 (숨은 장치) ─────────────────────
   명언을 오른쪽으로 밀면 방금 넘긴 쪽으로 딱 한 장 되돌아간다. 「어, 방금
   그거 좋았는데」 — 즐겨찾기를 놓치는 가장 흔한 순간을 위한 것이다.

   한 장까지만이다. 여러 장을 허용하면 「아무 데나 펼치는 책」이 「본 명언
   목록」이 되고, 그 일은 즐겨찾기 화면이 이미 한다. 되돌아간 상태에서 다시
   오른쪽으로 밀면 쪽이 살짝 들렸다 제자리로 돌아온다(반동) — 반응이 없으면
   고장처럼 보이고, 반동이 있으면 「더 넘길 쪽이 없구나」가 손에 전해진다.

   직전 쪽은 이미 기기에 저장하는 최근 목록(motimoti-recent)에서 읽는다.
   그래서 앱을 닫았다 열어도 지난번 마지막 명언으로 한 장 되돌아갈 수 있다. */
const BACK_MS = 480;
const BOUNCE_MS = 460;
const BOUNCE_PX = 22; // 여백(--pad 28px)보다 작게 — 드러나는 틈엔 빈 종이만 보인다
const EDGE_GUARD_PX = 24;

let wentBack = false;

function previousQuote() {
  if (wentBack || !currentQuote) return null;
  const recent = getRecent();
  const at = recent.lastIndexOf(currentQuote.id);
  const prevId = at > 0 ? recent[at - 1] : null;
  if (prevId == null) return null;
  return QUOTES.find((q) => q.id === prevId && hasLang(q, lang)) || null;
}

// 지금 화면 그대로를 복제한 낱장 (id 는 지운다).
function snapshotSheet() {
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.setAttribute("aria-hidden", "true");
  for (const child of quoteBlockEl.children) {
    if (child.classList.contains("sheet") || child.classList.contains("cast")) continue;
    sheet.appendChild(child.cloneNode(true));
  }
  sheet.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  const crease = document.createElement("div");
  crease.className = "crease";
  const shade = document.createElement("div");
  shade.className = "shade";
  sheet.append(crease, shade);
  return sheet;
}

function goBack() {
  if (turning || isRiffling()) return;
  closeNote(true);
  const prev = previousQuote();
  if (!prev) {
    bounce();
    return;
  }
  wentBack = true;
  // 최근 목록에 새로 쌓지 않고 순서만 맨 뒤로 옮긴다. 그래야 여기서 다시
  // 나아갔을 때 「직전」이 지금 보고 있는 이 명언이 된다.
  rememberShown(prev.id);

  if (reduceMotion.matches) {
    currentQuote = prev;
    renderQuote(currentQuote);
    return;
  }

  turning = true;
  // 직전 쪽을 그려 낱장으로 떠 두고, 화면은 다시 지금 쪽으로 돌려 둔다.
  // 같은 프레임 안에서 일어나므로 깜박임은 없다.
  const here = currentQuote;
  renderQuote(prev);
  const sheet = snapshotSheet();
  renderQuote(here);
  const cast = document.createElement("div");
  cast.className = "cast";
  cast.setAttribute("aria-hidden", "true");
  sheet.style.zIndex = "20";
  cast.style.zIndex = "19";
  quoteBlockEl.append(cast, sheet);

  // 주르륵의 거울상: 책등에서 펼쳐지고, 그림자는 책등에서 바깥으로 간다.
  const width = sheet.offsetWidth;
  const opts = { duration: BACK_MS, easing: "cubic-bezier(.25,.1,.25,1)", fill: "both" };
  const unfold = sheet.animate(
    [
      { transform: "scaleX(0.002)", opacity: 0 },
      { transform: "scaleX(0.04)", opacity: 1, offset: 0.04 },
      { transform: "scaleX(1)", opacity: 1 },
    ],
    opts
  );
  const shade = sheet.querySelector(".shade").animate([{ opacity: 0.9 }, { opacity: 0 }], opts);
  const shadow = cast.animate(
    [
      { transform: "translateX(0px)", opacity: 0 },
      { transform: `translateX(${width * 0.5}px)`, opacity: 1, offset: 0.5 },
      { transform: `translateX(${width}px)`, opacity: 0 },
    ],
    opts
  );
  unfold.finished
    .then(() => {
      currentQuote = prev;
      renderQuote(currentQuote);
    })
    .catch(() => {})
    .finally(() => {
      [unfold, shade, shadow].forEach((a) => a.cancel());
      sheet.remove();
      cast.remove();
      turning = false;
    });
}

/* 반동 — 더 되돌아갈 쪽이 없을 때. 지금 쪽이 손가락을 따라 오른쪽으로 살짝
   끌려 들렸다가, 종이가 내려앉듯 아주 조금 지나쳤다 제자리에 멈춘다.
   들리는 동안 책등 쪽 틈에 얇은 그림자가 생기고 쪽 면이 조금 어두워진다. */
function bounce() {
  if (turning || isRiffling() || reduceMotion.matches) return;
  turning = true;
  const sheet = snapshotSheet();
  const cast = document.createElement("div");
  cast.className = "cast cast-lift";
  cast.setAttribute("aria-hidden", "true");
  sheet.style.zIndex = "20";
  cast.style.zIndex = "21";
  quoteBlockEl.append(sheet, cast);

  const lift = "cubic-bezier(.2,.7,.3,1)"; // 빠르게 들리고
  const drop = "cubic-bezier(.5,0,.6,1)"; // 무게로 내려앉고
  const settle = "cubic-bezier(.3,0,.3,1)"; // 살짝 지나쳤다 멈춘다
  const opts = { duration: BOUNCE_MS, fill: "both" };
  const move = (x) => `translateX(${x}px)`;
  const a = sheet.animate(
    [
      { transform: move(0), easing: lift },
      { transform: move(BOUNCE_PX), offset: 0.38, easing: drop },
      { transform: move(-3), offset: 0.74, easing: settle },
      { transform: move(0) },
    ],
    opts
  );
  const b = sheet.querySelector(".shade").animate(
    [
      { opacity: 0, easing: lift },
      { opacity: 0.35, offset: 0.38, easing: drop },
      { opacity: 0, offset: 0.74 },
      { opacity: 0 },
    ],
    opts
  );
  const c = cast.animate(
    [
      { transform: move(0), opacity: 0, easing: lift },
      { transform: move(BOUNCE_PX), opacity: 1, offset: 0.38, easing: drop },
      { transform: move(-3), opacity: 0, offset: 0.74, easing: settle },
      { transform: move(0), opacity: 0 },
    ],
    opts
  );
  a.finished
    .catch(() => {})
    .finally(() => {
      [a, b, c].forEach((x) => x.cancel());
      sheet.remove();
      cast.remove();
      turning = false;
    });
}

/* 명언 영역의 손짓.
   - 넘기는 중에는 어떤 손짓이든 「짚기」다 — 그 자리에서 멈춘다.
   - 왼쪽으로 밀면 주르륵, 오른쪽으로 밀면 한 장 되돌아가기(없으면 반동).
   - 화면 가장자리 24px 안에서 시작한 밀기는 받지 않는다. 휴대폰 브라우저는
     가장자리에서 오른쪽으로 쓸면 「뒤로 가기」로 앱을 떠나 버리는데, 그 손짓은
     앱이 막을 수 없다. 겹치지 않게 비켜 서는 것까지가 할 수 있는 일이다.
   - 즐겨찾기·공유 버튼에서 시작한 손짓은 넘김으로 보지 않는다 — 버튼 누르다
     손이 미끄러진 것을 넘김으로 착각하면 안 된다. 작가 이름은 예외다. 겉으로는
     글자라서(출처 쪽지는 숨은 장치) 그 위에서 밀어도 다른 글자처럼 넘어가야 한다. */
let swipeStart = null;
quoteBlockEl.addEventListener("pointerdown", (e) => {
  const fromButton = e.target.closest("button:not(.quote-author)") && !isRiffling();
  const fromEdge = e.clientX < EDGE_GUARD_PX || e.clientX > window.innerWidth - EDGE_GUARD_PX;
  swipeStart = fromButton || (fromEdge && !isRiffling()) ? null : { x: e.clientX, y: e.clientY };
});
quoteBlockEl.addEventListener("pointerup", (e) => {
  if (!swipeStart) return;
  const dx = e.clientX - swipeStart.x;
  const dy = e.clientY - swipeStart.y;
  swipeStart = null;
  if (isRiffling()) {
    stopRiffle();
    return;
  }
  const horizontal = Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.4;
  if (!horizontal) return;
  // 마우스로 밀면 지나간 자리의 글자가 선택된다(휴대폰 손가락은 그렇지 않다).
  // 넘김이든 되돌아가기든 반동이든, 밀기로 본 순간 풀어 둔다.
  window.getSelection()?.removeAllRanges();
  if (dx < 0) riffleToNextQuote();
  else goBack();
});
quoteBlockEl.addEventListener("pointercancel", () => {
  swipeStart = null;
});
// 글자가 선택된 채로 마우스로 밀면 브라우저가 선택한 글자를 끌어 옮기기
// 시작하고(pointercancel), 밀기가 사라진다. 명언을 끌어 옮길 일은 없으니 막는다.
quoteBlockEl.addEventListener("dragstart", (e) => e.preventDefault());

/* 키보드: ← 한 장 되돌아가기, → 다음(Shift+→ 주르륵). 즐겨찾기 화면에서는 끈다. */
document.addEventListener("keydown", (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (mainView.classList.contains("hidden") || noteOpen) return;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goBack();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    if (isRiffling()) stopRiffle();
    else if (e.shiftKey) riffleToNextQuote();
    else showNextQuote();
  }
});

/* ── 출처 쪽지 (숨은 장치) ─────────────────────────────
   작가 이름을 누르면 책 사이에 끼워 둔 쪽지처럼 아래에서 올라온다.
   명언 한 줄이 그 문장이 나온 책으로 이어지는 문이다(PLANNING.md 「모토와
   궁극적인 목표」). 명언을 보는 것이 주인공이라 화면에 표시하지 않는다.

   - 종류와 연도: 책·시는 종류를 적지 않는다. 연설·편지 같은 기록만 적는다.
     연도가 대략인 고대·중세 저작(circa)은 「~년경」.
   - 출처: 영어는 책 제목을 *별표* 로 적어 두었고 여기서 기울임으로 바꾼다.
     베트남어 화면은 영어 출처를 쓴다.
   - 원문: 화면의 문장과 다를 때만(영어 원문을 영어로 볼 때는 같은 문장이다).
   - 링크: 원전으로 간다. 원문 대신 인용한 자료로 확인한 명언(cited)은
     「출처 확인 자료」라고 밝힌다 — 원전처럼 보이게 하지 않는다.
   - 닫기: 바깥을 누르거나, 쪽지를 아래로 밀거나, Esc. 「다음」·밀기·즐겨찾기
     화면으로 가면 저절로 닫힌다. */
const NOTE_CLOSE_MS = 240; // 닫힘 — style.css 의 .source-note:not(.on) 과 같은 값
const NOTE_FLING_V = 0.5;  // px/ms — 이보다 빠르게 튕기면 짧게 끌어도 닫힌다
let noteOpen = false;

// 구텐베르크는 평문(.txt)을 열어 대조했다. 읽는 사람에게는 책 소개 쪽이 낫다.
function readableUrl(url) {
  const g = String(url).match(/^https?:\/\/(?:www\.)?gutenberg\.org\/(?:cache\/epub|files)\/(\d+)\//);
  return g ? `https://www.gutenberg.org/ebooks/${g[1]}` : url;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// *제목* 을 기울임으로. innerHTML 을 쓰지 않고 글자 노드로 짓는다.
function setItalicText(el, text) {
  el.textContent = "";
  String(text).split(/(\*[^*]+\*)/).forEach((part) => {
    if (!part) return;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      const i = document.createElement("i");
      i.textContent = part.slice(1, -1);
      el.appendChild(i);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

const sameWords = (a, b) => {
  const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return norm(a) === norm(b);
};

function fillNote(quote) {
  if (!quote) return;
  const ui = t().note;
  const kind = quote.kind && ui.kinds[quote.kind];
  const year = ui.year(quote.year, quote.circa === true);
  document.getElementById("note-kind").textContent = kind ? `${kind} · ${year}` : year;
  setItalicText(document.getElementById("note-title"), localized(quote.source));

  // 이 문장이 나온 자리(문맥 해설). 베트남어 화면은 영어를 보여 준다.
  const ctxBox = document.getElementById("note-context");
  const ctx = typeof QUOTES_CONTEXT !== "undefined" && QUOTES_CONTEXT[quote.id];
  ctxBox.hidden = !ctx;
  if (ctx) {
    document.getElementById("note-context-label").textContent = ui.context;
    setItalicText(document.getElementById("note-context-text"), ctx[lang] || ctx.en);
  }

  const orig = document.getElementById("note-orig");
  const showOrig = quote.original && !sameWords(quote.original, localized(quote.text));
  orig.hidden = !showOrig;
  if (showOrig) {
    document.getElementById("note-orig-label").textContent = ui.original;
    const text = document.getElementById("note-orig-text");
    text.textContent = quote.original;
    text.lang = quote.lang === "lzh" ? "zh-Hant" : quote.lang || "";
  }

  const tr = document.getElementById("note-tr");
  const translator = lang === "en" && quote.translator && quote.translator.en;
  tr.hidden = !translator;
  if (translator) tr.textContent = ui.translator(translator);

  const cited = document.getElementById("note-cited");
  cited.hidden = quote.cited !== true;
  cited.textContent = ui.cited;

  const url = readableUrl(quote.sourceUrl);
  const link = document.getElementById("note-link");
  link.href = url;
  document.getElementById("note-link-label").textContent =
    `${quote.cited ? ui.links.cited : ui.links[quote.kind] || ui.links.work} →`;
  document.getElementById("note-host").textContent = hostOf(url);
}

/* 쪽지와 판권면은 같은 종이다 — 아래에서 올라오고, 한 번에 하나만 뜬다.
   여는 함수는 내용을 채우고 openPaper 를 부른다. */
let paperEl = null;      // 지금 떠 있는 종이
let paperTrigger = null; // 그 종이를 연 버튼 — 닫으면 초점이 돌아간다
let paperHideTimer = null;

function clearPaperDrag(el) {
  el.style.transition = "";
  el.style.transform = "";
  noteVeilEl.style.transition = "";
  noteVeilEl.style.opacity = "";
}

function openPaper(el, trigger) {
  closePaper(true);
  clearTimeout(paperHideTimer);
  clearPaperDrag(el);
  el.scrollTop = 0;
  el.hidden = false;
  noteVeilEl.hidden = false;
  el.getBoundingClientRect(); // 숨김을 푼 자리에서 올라오게 한 번 그린다
  el.classList.add("on");
  noteVeilEl.classList.add("on");
  paperEl = el;
  paperTrigger = trigger;
  noteOpen = el === noteEl;
  trigger.setAttribute("aria-expanded", "true");
  el.focus({ preventScroll: true });
}

/* 닫힘은 열림의 거울상이 아니다. 열릴 때는 빠르게 나와 천천히 자리 잡고,
   닫힐 때는 무게를 받아 점점 빨라지며 떨어진다(시험판에서 아이폰으로 고름).
   fling: 손가락으로 끌어내리다 놓았을 때의 자리(y)와 속도(v, px/ms) —
   그 자리에서 그 속도로 이어서 떨어진다. */
function closePaper(instant = false, fling = null) {
  if (!paperEl) return;
  const el = paperEl;
  const trigger = paperTrigger;
  paperEl = null;
  paperTrigger = null;
  noteOpen = false;
  trigger.setAttribute("aria-expanded", "false");
  const hadFocus = el.contains(document.activeElement);
  let ms = NOTE_CLOSE_MS;
  if (fling && !instant) {
    const rest = Math.max(0, el.offsetHeight - fling.y);
    ms = Math.round(Math.min(260, Math.max(140, rest / Math.max(fling.v, 1.4))));
    el.style.transition = `transform ${ms}ms cubic-bezier(0.25, 0.6, 0.5, 1)`;
    noteVeilEl.style.transition = `opacity ${ms}ms linear`;
    el.style.transform = "translateY(105%)";
    noteVeilEl.style.opacity = "0";
  } else {
    clearPaperDrag(el);
  }
  el.classList.remove("on");
  noteVeilEl.classList.remove("on");
  const hide = () => {
    if (paperEl === el) return; // 그사이 다시 열렸다
    el.hidden = true;
    clearPaperDrag(el);
    if (!paperEl) noteVeilEl.hidden = true;
  };
  clearTimeout(paperHideTimer);
  if (instant || reduceMotion.matches) hide();
  else paperHideTimer = setTimeout(hide, ms + 20);
  if (hadFocus && !instant) trigger.focus({ preventScroll: true });
}

// 쪽지에 지금 적힌 명언. 메인에서는 지금 펼친 명언, 즐겨찾기에서는 누른 명언이다.
let noteQuote = null;

function openNote() {
  if (paperEl || !currentQuote || turning || isRiffling()) return;
  openNoteFor(currentQuote, quoteAuthorEl);
}

/* 즐겨찾기 목록에서도 작가 이름을 누르면 같은 쪽지가 열린다(스테이징, 2026-10-16).
   저장한 명언일수록 「이 말이 어디서 나왔을까」가 궁금해진다 — 익힘(習)의 자리다. */
function openNoteFor(quote, trigger) {
  if (paperEl || !quote) return;
  noteQuote = quote;
  fillNote(quote);
  openPaper(noteEl, trigger);
}

function closeNote(instant = false) {
  if (noteOpen) closePaper(instant);
}

quoteAuthorEl.addEventListener("click", () => (noteOpen ? closeNote() : openNote()));
noteVeilEl.addEventListener("click", () => closePaper());

[noteEl, colophonEl].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePaper();
    } else if (e.key === "Tab") {
      // 종이 안에서만 돈다: 종이 → 링크들 → 종이.
      e.preventDefault();
      const stops = [el, ...el.querySelectorAll("a[href]")];
      const at = stops.indexOf(document.activeElement);
      const step = e.shiftKey ? -1 : 1;
      stops[(at + step + stops.length) % stops.length].focus();
    }
  });
  /* 끌어내리기 — 종이가 손가락을 따라 내려오고, 뒤의 막도 그만큼 옅어진다.
     놓을 때 화면 높이의 1/4 넘게 끌었거나 빠르게 튕겼으면 그 속도로 이어서
     떨어지고, 아니면 제자리로 돌아간다. 종이가 길어 스크롤된 상태면 스크롤이
     먼저다 — 맨 위에서 아래로 끌 때만 종이가 움직인다. */
  let drag = null;
  el.addEventListener("touchstart", (e) => {
    if (paperEl !== el) return;
    const y = e.touches[0].clientY;
    drag = { y0: y, top: el.scrollTop <= 0, dy: 0, active: false, pts: [{ y, t: e.timeStamp }] };
  }, { passive: true });
  el.addEventListener("touchmove", (e) => {
    if (!drag) return;
    const y = e.touches[0].clientY;
    if (!drag.active) {
      if (!drag.top || el.scrollTop > 0 || y - drag.y0 <= 4) return; // 위로 밀기·스크롤은 브라우저에 맡긴다
      drag.active = true;
      drag.y0 = y; // 여기서부터 잰다 — 종이가 툭 튀지 않게
    }
    e.preventDefault();
    drag.dy = Math.max(0, y - drag.y0);
    drag.pts.push({ y, t: e.timeStamp });
    if (drag.pts.length > 6) drag.pts.shift();
    el.style.transition = "none";
    noteVeilEl.style.transition = "none";
    el.style.transform = `translateY(${drag.dy}px)`;
    noteVeilEl.style.opacity = String(Math.max(0, 1 - drag.dy / el.offsetHeight));
  }, { passive: false });
  el.addEventListener("touchend", () => {
    const d = drag;
    drag = null;
    if (!d || !d.active || paperEl !== el) return;
    const a = d.pts[0];
    const b = d.pts[d.pts.length - 1];
    const v = b.t > a.t ? (b.y - a.y) / (b.t - a.t) : 0; // 아래가 +
    if (d.dy > window.innerHeight / 4 || v > NOTE_FLING_V) {
      closePaper(false, { y: d.dy, v });
    } else {
      el.style.transition = "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
      noteVeilEl.style.transition = "opacity 0.3s ease";
      el.style.transform = "";
      noteVeilEl.style.opacity = "";
      setTimeout(() => { if (paperEl === el) clearPaperDrag(el); }, 320);
    }
  }, { passive: true });
  el.addEventListener("touchcancel", () => {
    if (drag && drag.active && paperEl === el) clearPaperDrag(el);
    drag = null;
  }, { passive: true });
});

/* ── 판권면 ────────────────────────────────────────────
   즐겨찾기 화면 맨 아래 「이 책에 대하여」. 책의 맨 뒤 한 쪽처럼 모토와 이 책에
   실린 것, 고른 기준, 번역, 엮은이, 펴낸 날을 적는다. 숫자는 모두 QUOTES 에서
   센다 — 명언을 더해도 고칠 것이 없다. 펴낸 날과 엮은이만 quotes.js 의 EDITION.
   「작가 이름을 누르면…」 한 줄이 숨은 출처 쪽지의 유일한 안내다. */
const MOTTO_ID = 177;

function editionStats() {
  const authors = new Set(QUOTES.map((q) => q.author.ko));
  const byYear = [...QUOTES].sort((a, b) => a.year - b.year);
  const langs = {};
  QUOTES.forEach((q) => (langs[q.lang] = (langs[q.lang] || 0) + 1));
  const translators = {};
  QUOTES.filter((q) => q.translator).forEach((q) => {
    translators[q.translator.en] = (translators[q.translator.en] || 0) + 1;
  });
  return {
    total: QUOTES.length,
    authors: authors.size,
    first: byYear[0],
    last: byYear[byYear.length - 1],
    langs: Object.entries(langs).sort((a, b) => b[1] - a[1]),
    enOriginal: QUOTES.filter((q) => q.lang === "en").length,
    enPublished: QUOTES.filter((q) => q.translator).length,
    enOwn: QUOTES.filter((q) => q.lang !== "en" && !q.translator).length,
    koOriginal: QUOTES.filter((q) => q.lang === "ko").length,
    translators: Object.entries(translators).sort((a, b) => b[1] - a[1]).map(([name]) => name),
  };
}

function fillColophon() {
  const ui = t().colophon;
  const s = editionStats();
  const motto = QUOTES.find((q) => q.id === MOTTO_ID);
  document.getElementById("colophon-motto-tr").textContent = motto ? localized(motto.text) : "";
  setItalicText(document.getElementById("colophon-motto-src"), ui.mottoSource);
  document.getElementById("colophon-text-1").textContent = ui.text1(s.total);
  document.getElementById("colophon-text-2").textContent = ui.text2;

  const year = (q) => t().note.year(q.year, q.circa === true);
  const rows = [
    [ui.rows.quotes, ui.rows.quotesValue(s.total, s.authors)],
    [ui.rows.span, ui.rows.spanValue(ui.person(year(s.first), localized(s.first.author)), ui.person(year(s.last), localized(s.last.author)))],
    [ui.rows.languages, ui.rows.languagesValue(s.langs.length), s.langs.map(([code, n]) => `${ui.languageNames[code] || code} ${n}`).join(" · ")],
    [ui.rows.english, ui.rows.englishValue(s.enOriginal, s.enPublished, s.enOwn)],
    [ui.rows.translators, s.translators.join(", ")],
    [ui.rows.korean, ui.rows.koreanValue(s.koOriginal, s.total - s.koOriginal)],
    [ui.rows.editor, typeof EDITION !== "undefined" ? EDITION.editor : ""],
    [ui.rows.date, typeof EDITION !== "undefined" ? ui.rows.dateValue(EDITION.date) : ""],
  ];
  const table = document.getElementById("colophon-table");
  table.textContent = "";
  rows.forEach(([label, value, sub]) => {
    if (!value) return;
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    if (sub) {
      const span = document.createElement("span");
      span.className = "colophon-sub";
      span.textContent = sub;
      dd.appendChild(span);
    }
    table.append(dt, dd);
  });
}

function openColophon() {
  if (paperEl) return;
  fillColophon();
  openPaper(colophonEl, aboutBtn);
}

aboutBtn.addEventListener("click", openColophon);

function showToast(message, ms = 2000) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.add("hidden");
  }, ms);
}

async function shareCurrentQuote() {
  const shareText = `"${localized(currentQuote.text)}" - ${localized(currentQuote.author)}`;
  if (navigator.share) {
    try {
      await navigator.share({ text: shareText });
    } catch {
      // user cancelled share sheet; no action needed
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(shareText);
    showToast(t().copied);
  } catch {
    showToast(t().shareUnsupported);
  }
}

function renderFavoritesList() {
  const favorites = getFavorites();
  const ui = t();
  favoritesListEl.innerHTML = "";
  favoritesEmptyEl.classList.toggle("hidden", favorites.length > 0);
  // 빈 목록이 남은 높이를 다 차지하면 「아직 저장한 명언이 없어요」가 화면 맨 아래로 밀린다.
  favoritesListEl.classList.toggle("hidden", favorites.length === 0);
  favoritesCountRowEl.classList.toggle("hidden", favorites.length === 0);
  favoritesCountEl.textContent = ui.count(favorites.length);

  favorites.forEach((saved) => {
    const live = QUOTES.find((q) => q.id === saved.id) || saved;

    const li = document.createElement("li");
    li.className = "favorite-item";

    const text = document.createElement("p");
    text.className = "favorite-item-text";
    text.textContent = localized(live.text);

    const footer = document.createElement("div");
    footer.className = "favorite-item-footer";

    // 데이터에 남아 있는 명언이면 작가 이름이 출처 쪽지를 연다(겉모습은 글자 그대로).
    // 데이터에서 지워진 명언은 저장해 둔 문장뿐이라 출처가 없다 — 그냥 글자로 둔다.
    const hasSource = live !== saved && live.source;
    const author = document.createElement(hasSource ? "button" : "p");
    author.className = "favorite-item-author";
    author.textContent = localized(live.author);
    if (hasSource) {
      author.type = "button";
      author.setAttribute("aria-haspopup", "dialog");
      author.setAttribute("aria-controls", "source-note");
      author.setAttribute("aria-expanded", "false");
      author.setAttribute("aria-label", `${localized(live.author)} — ${ui.aria.source}`);
      author.addEventListener("click", () => openNoteFor(live, author));
    }

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = ui.remove;
    removeBtn.addEventListener("click", () => removeFavorite(saved.id));

    footer.append(author, removeBtn);
    li.append(text, footer);
    favoritesListEl.appendChild(li);
  });
}

function openFavoritesView() {
  stopRiffle();
  closePaper(true);
  renderFavoritesList();
  appHeaderEl.classList.add("hidden");
  mainView.classList.add("hidden");
  favoritesView.classList.remove("hidden");
}

function closeFavoritesView() {
  closePaper(true);
  appHeaderEl.classList.remove("hidden");
  favoritesView.classList.add("hidden");
  mainView.classList.remove("hidden");
  if (fitDeferred) fitQuoteText();
}

favoriteBtn.addEventListener("click", () => toggleFavorite(currentQuote));
shareBtn.addEventListener("click", shareCurrentQuote);
favoritesNavBtn.addEventListener("click", openFavoritesView);
backBtn.addEventListener("click", closeFavoritesView);
weightBtn.addEventListener("click", () => setWeightFavorites(!weightFavorites));
langBtns.forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

/* 화면이 옆으로 밀려 있으면 되돌린다. 이 앱에는 가로로 스크롤할 것이 없다.
   책장 넘김·반동의 낱장은 잠깐 화면 밖으로 나가고, .app 의 overflow-x: clip
   과 html 의 overflow-x: hidden 이 그것을 가린다. 그래도 어떤 브라우저가
   그 순간 가로 스크롤을 허락하면(iPhone 에서 실제로 화면이 왼쪽으로 붙은 채
   남았다), 여기서 바로 0 으로 돌린다. 세로 위치는 건드리지 않는다. */
function resetHorizontalScroll() {
  if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
}
window.addEventListener("scroll", resetHorizontalScroll, { passive: true });
window.addEventListener("pageshow", resetHorizontalScroll);

// 회전하거나 창 크기가 바뀌면 들어가는 양이 달라진다. 다시 맞춘다.
let fitTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(fitTimer);
  fitTimer = setTimeout(fitQuoteText, 150);
});

applyLang();
updateWeightButton();
currentQuote = turnPage(null);
renderQuote(currentQuote);
