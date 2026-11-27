#!/usr/bin/env node
/* 명언별 페이지 만들기 — 「펼쳐서 건네기」 (LAUNCH_CHECKLIST.md A6·B8)
 *
 *   node tools/build-pages.js --out <폴더> --site https://motimoti.page/ [--noindex] [--cards <카드 폴더>]
 *
 * 명언마다, 언어마다 /{언어}/{번호}/index.html 을 만든다(예: /ko/42/). 페이지는
 * 앱 그 자체다 — index.html 을 본으로 삼아
 *   - <base href="../../"> 로 앱의 css·js·데이터를 그대로 쓰고
 *   - 미리보기·검색용 글(page-meta 사이)을 그 명언의 것으로 바꾸고
 *   - 명언과 저자를 미리 적어 두며(자바스크립트를 돌리지 않는 미리보기·검색용)
 *   - <html> 에 data-start-quote · data-start-lang 을 단다 — 앱은 그 명언을 첫 쪽으로 편다
 * 저장소에는 두지 않고 배포할 때 만든다(.github/workflows/pages.yml). 명언을 더하거나
 * 고치면 페이지도 저절로 따라온다.
 *
 * 주소가 생긴 뒤 지운 명언(quotes-retired.js)은 「이 쪽은 책에서 뺐다」는 페이지를 남긴다.
 * --noindex(스테이징)가 아니면 sitemap.xml 도 만든다. 의존성 없이 node 만으로 돈다. */

const fs = require("fs");
const path = require("path");
const { ROOT, loadQuotes, loadVietnamese, loadContext, loadRetired } = require("./lib");
const { cardSpec } = require("./cards");

const LANGS = ["ko", "en", "vi"];
const LOCALE = { ko: "ko_KR", en: "en_US", vi: "vi_VN" };
const RETIRED_TEXT = {
  ko: { title: "이 쪽은 책에서 뺐습니다", open: "motimoti 펼치기 →" },
  en: { title: "This page was taken out of the book", open: "Open motimoti →" },
  vi: { title: "Trang này đã được bỏ ra khỏi sách", open: "Mở motimoti →" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (s) => String(s || "").replace(/\*/g, ""); // 출처의 *기울임* 표시를 뺀다
const pick = (field, L) => (field ? field[L] || field.en || field.ko || "" : "");

// 설명글은 잘라서 쓴다 — 단어 중간에서 끊지 않는다.
function clip(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,.;:—-]+$/, "")}…`;
}

/* 본(index.html)에서 바꿀 자리 — 하나라도 없거나 둘이면 멈춘다. npm run check 도 이것으로 본다. */
const MARKS = {
  html: /<html lang="[a-z]+">/,
  head: /<head>/,
  meta: /<!-- page-meta[\s\S]*?<!-- \/page-meta -->/,
  quote: /<p class="quote-text" id="quote-text"><\/p>/,
  author: /(<button type="button" class="quote-author" id="quote-author"[^>]*>)(<\/button>)/,
};

function checkTemplate(html) {
  const problems = [];
  for (const [name, re] of Object.entries(MARKS)) {
    const n = (html.match(new RegExp(re.source, "g")) || []).length;
    if (n !== 1) problems.push(`${name} 자리 ${n}개(1개여야 함)`);
  }
  return problems;
}

// value 는 함수로 넘긴다 — 명언에 「$&」 같은 글자가 있어도 치환 기호로 읽히지 않게.
function replaceOnce(html, re, value) {
  if (!re.test(html)) throw new Error(`index.html 에서 ${re} 를 찾지 못함`);
  return html.replace(re, typeof value === "function" ? value : () => value);
}

function loadData() {
  const { quotes } = loadQuotes();
  const { vi } = loadVietnamese();
  const context = loadContext() || {};
  for (const q of quotes) {
    const v = vi[q.id];
    if (v) {
      q.text.vi = v.text;
      q.author.vi = v.author;
    }
  }
  return { quotes, context, retired: loadRetired() };
}

function quotePage(template, q, L, ctx, site, noindex, image) {
  const text = q.text[L];
  const author = pick(q.author, L);
  const source = plain(pick(q.source, L));
  const story = pick(ctx, L);
  const url = `${site}${L}/${q.id}/`;
  const langs = LANGS.filter((x) => q.text[x]);

  const meta = [
    `<!-- page-meta — tools/build-pages.js 가 만든 「${L}/${q.id}」 -->`,
    `<title>${esc(clip(text, 70))} — ${esc(author)} · motimoti</title>`,
    `<meta name="description" content="${esc(clip(`${text} — ${author}. ${source}. ${story}`, 160))}" />`,
    noindex ? `<meta name="robots" content="noindex, nofollow" />` : "",
    `<link rel="canonical" href="${url}" />`,
    ...langs.map((x) => `<link rel="alternate" hreflang="${x}" href="${site}${x}/${q.id}/" />`),
    `<link rel="alternate" hreflang="x-default" href="${site}en/${q.id}/" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="motimoti" />`,
    `<meta property="og:locale" content="${LOCALE[L]}" />`,
    `<meta property="og:title" content="${esc(text)}" />`,
    `<meta property="og:description" content="${esc(clip(`— ${author}${source ? `, ${source}` : ""}. ${story}`, 160))}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site}${image || "og.png"}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<!-- /page-meta -->`,
  ].filter(Boolean).join("\n  ");

  let html = template;
  html = replaceOnce(html, MARKS.html, `<html lang="${L}" data-start-quote="${q.id}" data-start-lang="${L}">`);
  html = replaceOnce(html, MARKS.head, `<head>\n  <base href="../../" />`);
  html = replaceOnce(html, MARKS.meta, meta);
  html = replaceOnce(html, MARKS.quote, `<p class="quote-text" id="quote-text">${esc(text)}</p>`);
  html = replaceOnce(html, MARKS.author, (m, open, close) => `${open}${esc(author)}${close}`);
  return html;
}

function retiredPage(template, id, entry, L) {
  const t = RETIRED_TEXT[L];
  const reason = pick(entry.reason, L);
  const v = (template.match(/tokens\.css\?v=([\w-]+)/) || [])[1] || "";
  return `<!doctype html>
<html lang="${L}">
<head>
  <base href="../../" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${esc(t.title)} · motimoti</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="tokens.css?v=${v}" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: var(--bg); color: var(--ink); font-family: "Hahmlet", serif; }
    main { max-width: 420px; padding: 32px 24px; display: flex; flex-direction: column; gap: 16px; }
    .rule { width: 36px; height: 2px; background: var(--accent); }
    h1 { margin: 0; font-size: 19px; font-weight: 400; line-height: 1.6; word-break: keep-all; }
    p { margin: 0; font-size: 14px; line-height: 1.8; color: var(--ink-soft); word-break: keep-all; }
    a { color: var(--accent-text); font-weight: 600; text-decoration: none; }
  </style>
</head>
<body data-retired-quote="${id}">
  <main>
    <div class="rule" aria-hidden="true"></div>
    <h1>${esc(t.title)}</h1>
    <p>${esc(reason)}</p>
    <a href="./">${esc(t.open)}</a>
  </main>
</body>
</html>
`;
}

/* 인스타그램에 올린 명언들 — 프로필 링크가 가리키는 쪽(/ig/, PROMOTION_PLAN 9장).
   promo/<연-월>/posts.js 중 url 이 있는 것(실제로 올린 것)을 최근 것부터. 인스타그램의 캡션 링크는
   눌리지 않아서, 프로필 링크 하나로 「그 게시물의 명언」에 닿게 한다. 집계는 앱과 같은 조건으로. */
function loadPromo() {
  const dir = path.join(ROOT, "promo");
  if (!fs.existsSync(dir)) return [];
  const posts = [];
  for (const month of fs.readdirSync(dir).filter((m) => /^\d{4}-\d{2}$/.test(m)).sort()) {
    const file = path.join(dir, month, "posts.js");
    if (!fs.existsSync(file)) continue;
    delete require.cache[require.resolve(file)];
    for (const p of require(file)) if (p.url) posts.push({ ...p, month });
  }
  return posts.sort((a, b) => String(b.when).localeCompare(String(a.when)) || b.no - a.no);
}

const IG_ANALYTICS = `(function () {
    if (location.hostname !== "motimoti.page" || location.pathname.indexOf("/staging/") >= 0) return;
    try { if (localStorage.getItem("motimoti-me") === "1") return; } catch (e) {}
    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://cloud.umami.is/script.js";
    s.dataset.websiteId = "24dd5e2b-477b-4e99-97ee-21c85adf0867";
    s.dataset.domains = "motimoti.page";
    s.dataset.doNotTrack = "true";
    document.head.appendChild(s);
  })();`;

function igPage(template, posts, byId) {
  const v = (template.match(/tokens\.css\?v=([\w-]+)/) || [])[1] || "";
  const items = posts.map((p) => {
    const q = byId.get(p.id);
    const date = String(p.when).replace(/-/g, ".");
    return `    <li><a href="ko/${q.id}/"><span class="q">${esc(q.text.ko)}</span><span class="who">— ${esc(q.author.ko)}</span><span class="when">${esc(date)}</span></a></li>`;
  }).join("\n");
  return `<!doctype html>
<html lang="ko">
<head>
  <base href="../" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="noindex" />
  <title>인스타그램에 올린 문장 · motimoti</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@300;400;600&display=swap" />
  <link rel="stylesheet" href="tokens.css?v=${v}" />
  <style>
    body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font-kr); -webkit-font-smoothing: antialiased; }
    main { box-sizing: border-box; max-width: 560px; margin: 0 auto; padding: calc(56px + env(safe-area-inset-top)) var(--pad) calc(56px + env(safe-area-inset-bottom)); }
    .rule { width: 36px; height: 2px; background: var(--accent); }
    h1 { margin: 28px 0 8px; font-size: 19px; font-weight: 600; letter-spacing: 0.02em; }
    .lead { margin: 0 0 32px; font-size: 13px; line-height: 1.8; color: var(--ink-soft); word-break: keep-all; }
    ol { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--hairline); }
    li { border-bottom: 1px solid var(--hairline); }
    li a { display: flex; flex-direction: column; gap: 8px; padding: 22px 0; color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
    .q { font-size: 18px; line-height: 1.75; word-break: keep-all; }
    .who { font-size: 13px; font-weight: 600; letter-spacing: var(--tracking-meta); color: var(--ink-soft); }
    .when { font-size: 12px; color: var(--ink-soft); }
    li a:hover .q, li a:focus-visible .q { color: var(--accent-text); }
    .empty { margin: 24px 0; font-size: 14px; color: var(--ink-soft); }
    .open { display: inline-block; margin-top: 36px; font-size: 14px; font-weight: 600; color: var(--accent-text); text-decoration: none; }
  </style>
  <script>${IG_ANALYTICS}</script>
</head>
<body>
  <main>
    <div class="rule" aria-hidden="true"></div>
    <h1>인스타그램에 올린 문장</h1>
    <p class="lead">@motimoti_page 의 게시물을 최근 것부터. 누르면 그 명언이 motimoti 에서 열리고, 작가 이름을 누르면 그 문장이 나온 자리가 펼쳐진다.</p>
${posts.length ? `    <ol>\n${items}\n    </ol>` : `    <p class="empty">아직 올린 게시물이 없다.</p>`}
    <a class="open" href="./">motimoti 처음부터 펼치기 →</a>
  </main>
</body>
</html>
`;
}

/* cards: tools/render-cards.js 가 그린 카드가 있는 폴더(배포의 카드 캐시). 그 명언의 카드가
   있으면 out 으로 옮겨 미리보기 그림으로 쓰고, 없으면(그리기가 실패했거나 처음이면) 공용 og.png. */
function build({ out, site, noindex = false, retired: retiredOverride, promo: promoOverride, cards } = {}) {
  if (!out || !site || !/^https?:\/\/.+\/$/.test(site)) throw new Error("--out 과 / 로 끝나는 --site 가 필요하다");
  const template = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const problems = checkTemplate(template);
  if (problems.length) throw new Error(`index.html: ${problems.join(", ")}`);
  const { quotes, context, retired: retiredData } = loadData();
  const retired = retiredOverride || retiredData;

  const write = (rel, html) => {
    const file = path.join(out, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
  };

  const urls = [];
  let withCard = 0;
  for (const q of quotes) {
    for (const L of LANGS) {
      if (!q.text[L]) continue;
      const card = cardSpec(q, L, "og");
      let image = null;
      if (cards && fs.existsSync(path.join(cards, card.file))) {
        fs.mkdirSync(path.dirname(path.join(out, card.file)), { recursive: true });
        fs.copyFileSync(path.join(cards, card.file), path.join(out, card.file));
        image = card.file;
        withCard += 1;
      }
      write(`${L}/${q.id}/index.html`, quotePage(template, q, L, context[q.id], site, noindex, image));
      urls.push(`${site}${L}/${q.id}/`);
    }
  }
  const retiredIds = Object.keys(retired).map(Number);
  for (const id of retiredIds) {
    for (const L of LANGS) write(`${L}/${id}/index.html`, retiredPage(template, id, retired[id], L));
  }
  const promo = (promoOverride || loadPromo()).filter((p) => quotes.some((q) => q.id === p.id && q.text.ko));
  write("ig/index.html", igPage(template, promo, new Map(quotes.map((q) => [q.id, q]))));
  // 스테이징을 홈 화면에 함께 두면 본 앱과 헷갈리지 않게 이름을 바꾼다.
  const manifest = path.join(out, "manifest.webmanifest");
  if (noindex && fs.existsSync(manifest)) {
    const m = JSON.parse(fs.readFileSync(manifest, "utf8"));
    m.name = `${m.name} STG`;
    m.short_name = `${m.short_name} STG`;
    fs.writeFileSync(manifest, `${JSON.stringify(m, null, 2)}\n`);
  }
  if (!noindex) {
    const body = [site, ...urls].map((u) => `  <url><loc>${u}</loc></url>`).join("\n");
    write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  }
  return { pages: urls.length, cards: withCard, retired: retiredIds.length * LANGS.length, ig: promo.length };
}

module.exports = { build, checkTemplate, loadData, loadPromo, LANGS };

if (require.main === module) {
  const args = process.argv.slice(2);
  const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
  try {
    const r = build({ out: arg("--out"), site: arg("--site"), noindex: args.includes("--noindex"), cards: arg("--cards") });
    console.log(`명언별 페이지 ${r.pages}개(명언 카드 ${r.cards}장, 나머지는 공용 그림), 뺀 쪽 ${r.retired}개 → ${arg("--out")}`);
  } catch (err) {
    console.error(`\n✗ 명언별 페이지를 만들지 못했습니다 — ${err.message}\n`);
    process.exit(1);
  }
}
