#!/usr/bin/env node
/* 링크 미리보기 그림 og.png (1200×630) 만들기 — 카카오톡·메신저에 링크를 붙이면 보이는 그림.
 *
 *   node tools/render-og.js
 *
 * 앱의 색(tokens.css)과 글꼴(Hahmlet)로 그린다. 문구를 바꾸면 다시 돌려 og.png 를
 * 커밋하고, index.html 의 ?v= 처럼 og.png 도 메신저가 오래 캐시한다는 점을 기억한다.
 * 명언마다 다른 그림은 다음 단계(LAUNCH_CHECKLIST.md B8)에서 같은 방식으로 만든다. */

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("\nplaywright 가 없습니다. 처음 한 번:\n  npm install && npx playwright install chromium\n");
  process.exit(1);
}

const tokens = fs.readFileSync(path.join(ROOT, "tokens.css"), "utf8");

const html = `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@300;400;600&display=swap" />
<style>
${tokens}
html, body { margin: 0; width: 1200px; height: 630px; }
body { background: #f1eae0; color: #33302b; font-family: "Hahmlet", serif; }
main { box-sizing: border-box; height: 100%; padding: 92px 104px 84px; display: flex; flex-direction: column; }
.rule { width: 72px; height: 4px; background: #b4593a; }
.name { margin-top: 40px; font-size: 26px; font-weight: 600; letter-spacing: 0.32em; }
.motto { margin-top: 44px; font-size: 76px; font-weight: 400; letter-spacing: 0.14em; }
.line { margin-top: auto; font-size: 30px; line-height: 1.5; color: #6f604f; }
.line span { display: block; font-size: 24px; letter-spacing: 0.02em; }
.domain { position: absolute; right: 104px; bottom: 84px; font-size: 24px; color: #9c4529; letter-spacing: 0.06em; }
</style></head>
<body><main>
  <div class="rule"></div>
  <div class="name">MOTIMOTI</div>
  <div class="motto" lang="zh-Hant">學而時習之 不亦說乎</div>
  <div class="line">명언 한 줄에서, 그 문장이 나온 책으로<span>One line, and the book it came from</span></div>
  <div class="domain">motimoti.page</div>
</main></body></html>`;

(async () => {
  const launchOpts = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
  const browser = await chromium.launch(launchOpts);
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(ROOT, "og.png");
  await page.screenshot({ path: out });
  await browser.close();
  console.log(`og.png 를 만들었습니다 → ${out}`);
})();
