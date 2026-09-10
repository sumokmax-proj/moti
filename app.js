const FAVORITES_KEY = "motimoti-favorites";
const LANG_KEY = "motimoti-lang";
const LANGS = ["en", "ko"];

const UI = {
  en: {
    next: "Next",
    favorites: "Favorites",
    remove: "Remove",
    count: (n) => `${n} ${n === 1 ? "quote" : "quotes"}`,
    empty: "Nothing saved yet.",
    copied: "Copied to clipboard",
    shareUnsupported: "Sharing isn’t supported in this browser",
    aria: {
      openFavorites: "Open favorites",
      favorite: "Add to favorites",
      share: "Share",
      back: "Back",
      language: "Language",
      collector: "Quote collector",
    },
  },
  ko: {
    next: "다음",
    favorites: "즐겨찾기",
    remove: "삭제",
    count: (n) => `${n}편`,
    empty: "아직 저장한 명언이 없어요.",
    copied: "클립보드에 복사되었습니다",
    shareUnsupported: "공유하기를 지원하지 않는 브라우저입니다",
    aria: {
      openFavorites: "즐겨찾기 목록 열기",
      favorite: "즐겨찾기",
      share: "공유하기",
      back: "메인으로 돌아가기",
      language: "언어",
      collector: "명언 수집기",
    },
  },
};

const quoteBlockEl = document.getElementById("quote-block");
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const favoriteBtn = document.getElementById("favorite-btn");
const shareBtn = document.getElementById("share-btn");
const collectorLink = document.getElementById("collector-link");
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
const toastEl = document.getElementById("toast");
const appHeaderEl = document.querySelector(".app-header");
const langBtns = Array.from(document.querySelectorAll(".lang-btn"));

let currentQuote = null;
let toastTimer = null;
let lang = resolveInitialLang();

/* ── 언어 ─────────────────────────────────────────────── */

function resolveInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);
  if (LANGS.includes(stored)) return stored;
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

function setLang(next) {
  if (!LANGS.includes(next) || next === lang) return;
  lang = next;
  localStorage.setItem(LANG_KEY, lang);
  applyLang();
  // 현재 명언이 새 언어로 준비돼 있지 않으면 다른 명언으로 바꾼다.
  if (currentQuote && !hasLang(currentQuote, lang)) {
    currentQuote = pickRandomQuote(currentQuote.id);
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
  favoritesNavBtn.setAttribute("aria-label", ui.aria.openFavorites);
  favoriteBtn.setAttribute("aria-label", ui.aria.favorite);
  shareBtn.setAttribute("aria-label", ui.aria.share);
  backBtn.setAttribute("aria-label", ui.aria.back);
  // 수집기는 제작 도구라 화면에 글자가 없다. 라벨과 툴팁만 언어를 따른다.
  collectorLink.setAttribute("aria-label", ui.aria.collector);
  collectorLink.setAttribute("title", ui.aria.collector);
  langBtns.forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    btn.classList.toggle("active", btn.dataset.lang === lang);
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

function updateFavoriteButton() {
  const active = !!(currentQuote && isFavorite(currentQuote.id));
  favoriteBtn.classList.toggle("active", active);
  favoriteBtn.setAttribute("aria-pressed", String(active));
}

/* ── 명언 ─────────────────────────────────────────────── */

function pickRandomQuote(excludeId) {
  const available = QUOTES.filter((q) => hasLang(q, lang));
  const pool = available.filter((q) => q.id !== excludeId);
  const candidates = pool.length > 0 ? pool : available;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function renderQuote(quote) {
  if (!quote) return;
  quoteTextEl.textContent = localized(quote.text);
  quoteAuthorEl.textContent = localized(quote.author);
  updateFavoriteButton();
}

function showNextQuote() {
  const nextQuote = pickRandomQuote(currentQuote ? currentQuote.id : null);
  quoteBlockEl.classList.add("fade");
  setTimeout(() => {
    currentQuote = nextQuote;
    renderQuote(currentQuote);
    quoteBlockEl.classList.remove("fade");
  }, 200);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.add("hidden");
  }, 2000);
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

    const author = document.createElement("p");
    author.className = "favorite-item-author";
    author.textContent = localized(live.author);

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
  renderFavoritesList();
  appHeaderEl.classList.add("hidden");
  mainView.classList.add("hidden");
  favoritesView.classList.remove("hidden");
}

function closeFavoritesView() {
  appHeaderEl.classList.remove("hidden");
  favoritesView.classList.add("hidden");
  mainView.classList.remove("hidden");
}

nextBtn.addEventListener("click", showNextQuote);
favoriteBtn.addEventListener("click", () => toggleFavorite(currentQuote));
shareBtn.addEventListener("click", shareCurrentQuote);
favoritesNavBtn.addEventListener("click", openFavoritesView);
backBtn.addEventListener("click", closeFavoritesView);
langBtns.forEach((btn) => btn.addEventListener("click", () => setLang(btn.dataset.lang)));

applyLang();
currentQuote = pickRandomQuote();
renderQuote(currentQuote);
