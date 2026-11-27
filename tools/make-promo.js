#!/usr/bin/env node
/* 인스타그램 캐러셀 만들기 — PROMOTION_PLAN.md 6장·13장
 *
 *   node tools/make-promo.js 2026-11          promo/2026-11/posts.js 의 게시물을 모두
 *   node tools/make-promo.js 2026-11 --only 1 그중 한 건
 *
 * 게시물마다 1080×1350 그림 4장과 캡션·대체 텍스트를 dist/promo/<달>/ 에 만들고 zip 으로 묶는다.
 *   1. 명언 카드      — 링크 미리보기와 같은 모양(tools/cards.js 의 instagram)
 *   2. 이 문장이 나온 자리 — 앱의 해설(quotes-context.js) 그대로
 *   3. 원문            — 원문이 화면의 문장과 다를 때만(한국어 원문이면 이 장이 빠진다)
 *   4. 그 책으로        — 출처, 연도, 원전이 있는 곳, motimoti.page 의 그 명언 주소
 *   5. 앱 화면          — 실제 앱 화면(그 명언의 주소를 휴대폰 크기로 연 것)과 「이어서 — 프로필 링크」 한 줄.
 *                        무엇을 알리는 계정인지 모든 게시물의 끝에서 같은 모양으로 보인다
 * 명언·해설·원문·출처는 앱의 데이터에서 가져온다 — 카드에 새로 쓰는 글은 없다. 캡션만 posts.js 에 쓴다.
 * 글꼴은 익스텐션에 담아 둔 Hahmlet(extension/fonts) — 그리는 데 인터넷이 필요 없다. */

const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { ROOT, loadQuotes, loadContext } = require("./lib");
const { STYLE, cardSpec, cardBody } = require("./cards");
const { build } = require("./build-pages");

const W = 1080;
const H = 1350;
const ALT_MAX = 100; // 인스타그램 대체 텍스트 칸에 들어가는 만큼

const UI = {
  context: "이 문장이 나온 자리",
  original: "원문",
  source: "그 책으로",
  kinds: { speech: "연설", letter: "편지", diary: "일기", interview: "인터뷰", calligraphy: "유묵", inscription: "새긴 글", testimony: "증언" },
  links: { work: "원전 읽기", speech: "연설문 읽기", letter: "편지 읽기", diary: "일기 읽기", interview: "인터뷰 읽기", calligraphy: "유묵 보기", inscription: "원문 읽기", testimony: "증언 읽기", cited: "출처 확인 자료" },
  year: (y, circa) => `${y < 0 ? `기원전 ${-y}` : y}년${circa ? "경" : ""}`,
  verified: (cited) => (cited ? "원문 대신, 원문과 그 위치를 밝혀 인용한 자료로 확인했다" : "원문과 한 글자씩 대조했다"),
  // 5장은 앱 화면과 한 줄뿐이다. 「무료」「가입 없이」 같은 파는 말은 쓰지 않는다(Max, 2026-11-27).
  appOpen: "이어서",
  appWhere: "프로필 링크",
  langs: { en: "영어", fr: "프랑스어", de: "독일어", la: "라틴어", it: "이탈리아어", es: "스페인어", nl: "네덜란드어", zh: "중국어", lzh: "한문", grc: "고대 그리스어", ru: "러시아어", ja: "일본어" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (s) => String(s || "").replace(/\*/g, "");
// *제목* 은 기울임으로(앱과 같다).
const italic = (s) => esc(s).replace(/\*([^*]+)\*/g, "<i>$1</i>");

function readableUrl(url) {
  const g = String(url).match(/^https?:\/\/(?:www\.)?gutenberg\.org\/(?:cache\/epub|files)\/(\d+)\//);
  return g ? `https://www.gutenberg.org/ebooks/${g[1]}` : url;
}
const hostOf = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
};
const sameWords = (a, b) => {
  const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  return norm(a) === norm(b);
};

const FONT = `@font-face { font-family: "Hahmlet"; src: url("file://${path.join(ROOT, "extension", "fonts", "Hahmlet.ttf")}") format("truetype"); font-weight: 100 900; }`;

// 명언 카드 밖의 장(해설·원문·출처). 명언 카드와 같은 틀 — 위의 룰, 아래의 MOTIMOTI.
const SLIDE_STYLE = `
.slide .label { margin: 0 0 36px; font-size: 26px; font-weight: 600; letter-spacing: 0.12em; color: #9c4529; }
.slide .body { margin: 0; font-weight: 400; line-height: 1.7; word-break: keep-all; text-wrap: pretty; }
.slide .note { margin: 32px 0 0; font-size: 26px; line-height: 1.6; color: #6f604f; word-break: keep-all; }
.slide .big { margin: 0; font-weight: 600; line-height: 1.45; word-break: keep-all; }
.slide .meta { margin: 20px 0 0; font-size: 28px; color: #6f604f; }
.slide .go { margin: 56px 0 0; font-size: 30px; font-weight: 600; color: #9c4529; }
.slide .go span { font-weight: 400; color: #6f604f; font-size: 26px; margin-left: 10px; }
.slide .addr { margin: 22px 0 0; font-size: 30px; color: #33302b; }
.slide .addr b { font-weight: 600; }
.page { font-size: 22px; letter-spacing: 0.06em; color: #6f604f; }
.slide .inner { width: 100%; }
.app { display: flex; flex-direction: column; align-items: center; }
.app img { width: 372px; border-radius: 42px; border: 10px solid #33302b; box-shadow: 0 18px 40px rgba(51, 48, 43, 0.18); }
.app .open { margin: 44px 0 0; font-size: 32px; letter-spacing: 0.04em; color: #6f604f; }
.app .open b { font-weight: 600; color: #9c4529; }
`;

function frame(inner, pageNo, total) {
  return `<div class="card instagram slide" lang="ko">
  <div class="rule"></div>
  <div class="quote"><div class="inner">${inner}</div></div>
  <div class="foot"><span class="name">MOTIMOTI</span><span class="page">${pageNo} / ${total}</span></div>
</div>`;
}

// 한 게시물의 장들. fit 은 줄여 가며 맞출 글(.text 또는 .body · .big)의 시작 크기와 바닥.
function slidesFor(q, ctx, appShot) {
  const slides = [];
  const spec = cardSpec(q, "ko", "instagram");
  slides.push({ kind: "quote", html: () => cardBody(spec), fit: { sel: ".text", start: 72, min: 34 }, alt: `명언 카드: ${q.text.ko} — ${q.author.ko}` });
  if (ctx && ctx.ko) {
    slides.push({
      kind: "context",
      html: (n, t) => frame(`<p class="label">${UI.context}</p><p class="body">${italic(ctx.ko)}</p>`, n, t),
      fit: { sel: ".body", start: 44, min: 28 },
      alt: `${UI.context}: ${plain(ctx.ko)}`,
    });
  }
  if (q.original && !sameWords(q.original, q.text.ko)) {
    const lang = UI.langs[q.lang] || "";
    const tr = q.translator && q.translator.en ? `영역(英譯) ${q.translator.en}: "${q.text.en}"` : "";
    slides.push({
      kind: "original",
      html: (n, t) => frame(`<p class="label">${UI.original}${lang ? ` · ${lang}` : ""}</p><p class="body" lang="${q.lang === "lzh" ? "zh-Hant" : q.lang}">${esc(q.original).split(" / ").join("<br />")}</p>${tr ? `<p class="note">${esc(tr)}</p>` : ""}`, n, t),
      fit: { sel: ".body", start: 48, min: 30 },
      alt: `${UI.original}: ${q.original}`,
    });
  }
  const url = readableUrl(q.sourceUrl);
  const kind = q.kind && UI.kinds[q.kind];
  const year = UI.year(q.year, q.circa === true);
  const link = q.cited ? UI.links.cited : UI.links[q.kind] || UI.links.work;
  slides.push({
    kind: "source",
    html: (n, t) => frame(
      `<p class="label">${UI.source}</p>
       <p class="big">${italic(q.source.ko)}</p>
       <p class="meta">${esc(q.author.ko)} · ${kind ? `${kind} · ` : ""}${year}</p>
       <p class="note">${UI.verified(q.cited === true)}</p>
       <p class="go">${link} → <span>${esc(hostOf(url))}</span></p>
       <p class="addr">쪽지 전체 <b>motimoti.page/ko/${q.id}</b></p>`, n, t),
    fit: { sel: ".big", start: 52, min: 34 },
    alt: `${UI.source}: ${plain(q.source.ko)}, ${year}. ${link}: ${hostOf(url)}`,
  });
  if (appShot) {
    slides.push({
      kind: "app",
      html: (n, t) => frame(
        `<div class="app">
           <img src="${appShot}" alt="" />
           <p class="open">${UI.appOpen} — <b>${UI.appWhere}</b></p>
         </div>`, n, t),
      fit: { sel: ".open", start: 32, min: 26 },
      alt: `motimoti 앱 화면에 같은 명언. ${UI.appOpen} — ${UI.appWhere}`,
    });
  }
  return slides;
}

const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/* 앱 화면 찍기 — 명언별 페이지를 임시 폴더에 만들고(tools/build-pages.js) 그 자리에서 내어 준다.
   글꼴은 구글 대신 익스텐션의 Hahmlet 으로 바꿔 준다(인터넷 없이, 앱과 같은 모양). 주소가
   127.0.0.1 이라 집계는 나가지 않는다. 휴대폰 크기(390×844)를 두 배로 찍는다. */
async function startApp() {
  const pages = fs.mkdtempSync(path.join(os.tmpdir(), "moti-promo-pages-"));
  build({ out: pages, site: "https://motimoti.page/" });
  const font = path.join(ROOT, "extension", "fonts", "Hahmlet.ttf");
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (pathname === "/__font/Hahmlet.ttf") {
      res.writeHead(200, { "content-type": "font/ttf" });
      fs.createReadStream(font).pipe(res);
      return;
    }
    const rel = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
    const built = path.join(pages, rel);
    const file = fs.existsSync(built) && fs.statSync(built).isFile() ? built : path.join(ROOT, rel);
    if (!(file.startsWith(ROOT) || file.startsWith(pages)) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  return { url, close: () => { server.close(); fs.rmSync(pages, { recursive: true, force: true }); } };
}

async function shootApp(browser, app, id, file) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: "light", locale: "ko-KR" });
  await ctx.route(/fonts\.googleapis\.com/, (route) => route.fulfill({
    contentType: "text/css",
    body: `@font-face { font-family: "Hahmlet"; src: url("${app.url}__font/Hahmlet.ttf") format("truetype"); font-weight: 100 900; }`,
  }));
  await ctx.route(/fonts\.gstatic\.com|cloud\.umami\.is/, (route) => route.abort());
  const page = await ctx.newPage();
  await page.goto(`${app.url}ko/${id}/`, { waitUntil: "networkidle" });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(600); // 첫 쪽이 펼쳐지는 움직임이 끝나게
  await page.screenshot({ path: file });
  await ctx.close();
}

async function makePromo(month, { only } = {}) {
  const file = path.join(ROOT, "promo", month, "posts.js");
  if (!fs.existsSync(file)) throw new Error(`${path.relative(ROOT, file)} 가 없다`);
  delete require.cache[require.resolve(file)];
  let posts = require(file);
  if (only) posts = posts.filter((p) => String(p.no) === String(only));
  const quotes = (() => { const q = loadQuotes(); return Array.isArray(q) ? q : q.quotes; })();
  const context = loadContext();

  const out = path.join(ROOT, "dist", "promo", month);
  fs.mkdirSync(out, { recursive: true });
  const shell = path.join(out, ".shell.html");
  fs.writeFileSync(shell, `<!doctype html><html><head><meta charset="UTF-8" /><style>${FONT}${STYLE}${SLIDE_STYLE}</style></head><body><div id="slot"></div></body></html>`);

  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const app = await startApp();
  const made = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await page.goto(`file://${shell}`);
    for (const post of posts) {
      const q = quotes.find((x) => x.id === post.id);
      if (!q) throw new Error(`명언 ${post.id} 가 quotes.js 에 없다`);
      const dir = path.join(out, `${String(post.no).padStart(2, "0")}-${post.id}`);
      fs.rmSync(dir, { recursive: true, force: true });
      fs.mkdirSync(dir, { recursive: true });
      const shot = path.join(out, `.app-${q.id}.png`);
      await shootApp(browser, app, q.id, shot);
      const slides = slidesFor(q, context[q.id], `file://${shot}`);
      const alts = [];
      for (const [i, s] of slides.entries()) {
        const fit = await page.evaluate(async ({ body, fit }) => {
          const slot = document.getElementById("slot");
          slot.innerHTML = body;
          const card = slot.firstElementChild;
          const el = card.querySelector(fit.sel);
          const box = card.querySelector(".quote");
          const inner = card.querySelector(".inner");
          await document.fonts.load(`400 40px "Hahmlet"`, card.textContent);
          await document.fonts.load(`600 40px "Hahmlet"`, card.textContent);
          await document.fonts.ready;
          await Promise.all([...card.querySelectorAll("img")].map((im) => (im.complete ? null : new Promise((r) => { im.onload = r; im.onerror = r; }))));
          const room = () => box.clientHeight - parseFloat(getComputedStyle(box).paddingTop);
          const over = () => inner.offsetHeight > room() + 1;
          let px = fit.start;
          el.style.fontSize = `${px}px`;
          while (over() && px > fit.min) { px -= 2; el.style.fontSize = `${px}px`; }
          return { px, overflow: over(), font: document.fonts.check(`400 40px "Hahmlet"`, "가") };
        }, { body: s.html(i + 1, slides.length), fit: s.fit });
        if (fit.overflow) throw new Error(`게시물 ${post.no}(명언 ${q.id}) ${i + 1}장이 넘친다`);
        if (!fit.font) throw new Error("Hahmlet 글꼴을 불러오지 못했다");
        await page.locator(".card").screenshot({ path: path.join(dir, `${i + 1}.png`) });
        alts.push(`${i + 1}. ${clip(s.alt, ALT_MAX)}`);
      }
      fs.rmSync(shot, { force: true });
      fs.writeFileSync(path.join(dir, "caption.txt"), `${post.caption.trim()}\n`);
      fs.writeFileSync(path.join(dir, "alt.txt"), `${alts.join("\n")}\n`);
      made.push({ post, dir, slides: slides.length });
    }
  } finally {
    await browser.close();
    app.close();
    fs.rmSync(shell, { force: true });
  }
  const zip = path.join(path.dirname(out), `motimoti-promo-${month}.zip`);
  fs.rmSync(zip, { force: true });
  execFileSync("zip", ["-qr", "-X", zip, "."], { cwd: out });
  return { out, zip, made };
}

module.exports = { makePromo, slidesFor };

if (require.main === module) {
  const args = process.argv.slice(2);
  const month = args[0];
  const i = args.indexOf("--only");
  if (!/^\d{4}-\d{2}$/.test(month || "")) {
    console.error("\n사용법: node tools/make-promo.js <연-월> [--only <번호>]\n");
    process.exit(1);
  }
  makePromo(month, { only: i >= 0 ? args[i + 1] : undefined })
    .then((r) => {
      for (const m of r.made) console.log(`${m.post.no}. 명언 ${m.post.id} · ${m.slides}장 → ${path.relative(ROOT, m.dir)}`);
      console.log(`묶음 → ${path.relative(ROOT, r.zip)}`);
    })
    .catch((err) => {
      console.error(`\n✗ ${err.message}\n`);
      process.exit(1);
    });
}
