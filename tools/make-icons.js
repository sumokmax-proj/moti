#!/usr/bin/env node
/* 홈 화면 아이콘 만들기 — favicon.svg 의 마크로 manifest.webmanifest 의 아이콘을 그린다.
 *
 *   node tools/make-icons.js
 *
 *   icon-192.png · icon-512.png   모서리가 둥근 그대로(favicon.svg 와 같은 모양)
 *   icon-maskable-512.png         모서리 없이 꽉 채운 것 — 안드로이드가 원·둥근 사각형 등
 *                                 자기 모양으로 오려 낸다. 마크는 가운데 지름 80% 의
 *                                 안전 구역 안에 있다(가장 먼 모서리가 중심에서 32%).
 *
 * 마크를 바꾸면 favicon.svg 를 고치고 이 도구를 다시 돌린다. apple-touch-icon.png(180)는
 * 처음 파비콘을 만들 때 따로 그렸다 — 같이 바꾸려면 아래 SIZES 에 더한다.
 * 크롬 익스텐션의 아이콘도 같은 그림으로 그린다(tools/build-extension.js 가 renderIcons 를 쓴다). */

const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib");

function loadChromium() {
  try {
    return require("playwright").chromium;
  } catch {
    console.error("\nplaywright 가 없습니다. 처음 한 번:\n  npm install && npx playwright install chromium\n");
    process.exit(1);
  }
}

function markSvg({ fullBleed = false } = {}) {
  const svg = fs.readFileSync(path.join(ROOT, "favicon.svg"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  if (!fullBleed) return svg;
  const out = svg.replace(/(<rect width="32" height="32") rx="8"/, "$1");
  if (out === svg) throw new Error("favicon.svg 의 바탕(rect width=32 height=32 rx=8)을 찾지 못했습니다");
  return out;
}

// [{ file(절대 경로), size, fullBleed }] 를 PNG 로 그린다.
async function renderIcons(list) {
  const browser = await loadChromium().launch();
  try {
    for (const { file, size, fullBleed } of list) {
      const page = await browser.newPage({ viewport: { width: size, height: size } });
      const sized = markSvg({ fullBleed }).replace("<svg ", `<svg width="${size}" height="${size}" `);
      await page.setContent(`<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block}</style>${sized}`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      await page.screenshot({ path: file, omitBackground: true });
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

module.exports = { renderIcons };

if (require.main === module) {
  const SIZES = [
    { file: "icon-192.png", size: 192 },
    { file: "icon-512.png", size: 512 },
    { file: "icon-maskable-512.png", size: 512, fullBleed: true },
  ];
  renderIcons(SIZES.map((s) => ({ ...s, file: path.join(ROOT, s.file) })))
    .then(() => SIZES.forEach((s) => console.log(`${s.file} (${s.size}×${s.size})`)))
    .catch((err) => {
      console.error(`\n✗ ${err.message}\n`);
      process.exit(1);
    });
}
