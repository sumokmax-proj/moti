const FAVORITES_KEY = "motimoti-favorites";

const quoteCardEl = document.getElementById("quote-card");
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
const toastEl = document.getElementById("toast");

let currentQuote = null;
let toastTimer = null;

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
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

function toggleFavorite(quote) {
  const favorites = getFavorites();
  const index = favorites.findIndex((q) => q.id === quote.id);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(quote);
  }
  saveFavorites(favorites);
  updateFavoriteButton();
}

function removeFavorite(id) {
  const favorites = getFavorites().filter((q) => q.id !== id);
  saveFavorites(favorites);
  renderFavoritesList();
}

function updateFavoriteButton() {
  const active = currentQuote && isFavorite(currentQuote.id);
  favoriteBtn.textContent = active ? "♥" : "♡";
  favoriteBtn.classList.toggle("active", !!active);
}

function pickRandomQuote(excludeId) {
  const candidates = excludeId
    ? QUOTES.filter((q) => q.id !== excludeId)
    : QUOTES;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function renderQuote(quote) {
  quoteTextEl.textContent = `"${quote.text}"`;
  quoteAuthorEl.textContent = `- ${quote.author} -`;
  updateFavoriteButton();
}

function showNextQuote() {
  const nextQuote = pickRandomQuote(currentQuote ? currentQuote.id : null);
  quoteCardEl.classList.add("fade");
  setTimeout(() => {
    currentQuote = nextQuote;
    renderQuote(currentQuote);
    quoteCardEl.classList.remove("fade");
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
  const shareText = `"${currentQuote.text}" - ${currentQuote.author}`;
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
    showToast("클립보드에 복사되었습니다");
  } catch {
    showToast("공유하기를 지원하지 않는 브라우저입니다");
  }
}

function renderFavoritesList() {
  const favorites = getFavorites();
  favoritesListEl.innerHTML = "";
  favoritesEmptyEl.classList.toggle("hidden", favorites.length > 0);

  favorites.forEach((quote) => {
    const li = document.createElement("li");
    li.className = "favorite-item";

    const text = document.createElement("p");
    text.className = "favorite-item-text";
    text.textContent = `"${quote.text}"`;

    const footer = document.createElement("div");
    footer.className = "favorite-item-footer";

    const author = document.createElement("p");
    author.className = "favorite-item-author";
    author.textContent = `- ${quote.author} -`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "삭제";
    removeBtn.addEventListener("click", () => removeFavorite(quote.id));

    footer.append(author, removeBtn);
    li.append(text, footer);
    favoritesListEl.appendChild(li);
  });
}

function openFavoritesView() {
  renderFavoritesList();
  mainView.classList.add("hidden");
  favoritesView.classList.remove("hidden");
}

function closeFavoritesView() {
  favoritesView.classList.add("hidden");
  mainView.classList.remove("hidden");
}

nextBtn.addEventListener("click", showNextQuote);
favoriteBtn.addEventListener("click", () => toggleFavorite(currentQuote));
shareBtn.addEventListener("click", shareCurrentQuote);
favoritesNavBtn.addEventListener("click", openFavoritesView);
backBtn.addEventListener("click", closeFavoritesView);

currentQuote = pickRandomQuote();
renderQuote(currentQuote);
