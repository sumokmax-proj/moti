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
 * 처음 파비콘을 만들 때 따로 그렸다 — 같이 바꾸려면 아래 SIZES 에 더한다. */

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

const svg = fs.readFileSync(path.join(ROOT, "favicon.svg"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
const fullBleed = svg.replace(/(<rect width="32" height="32") rx="8"/, "$1");
if (fullBleed === svg) {
  console.error("\nfavicon.svg 의 바탕(rect width=32 height=32 rx=8)을 찾지 못했습니다.\n");
  process.exit(1);
}

const SIZES = [
  { file: "icon-192.png", size: 192, svg },
  { file: "icon-512.png", size: 512, svg },
  { file: "icon-maskable-512.png", size: 512, svg: fullBleed },
];

(async () => {
  const browser = await chromium.launch();
  try {
    for (const { file, size, svg: body } of SIZES) {
      const page = await browser.newPage({ viewport: { width: size, height: size } });
      const sized = body.replace("<svg ", `<svg width="${size}" height="${size}" `);
      await page.setContent(`<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block}</style>${sized}`);
      await page.screenshot({ path: path.join(ROOT, file), omitBackground: true });
      await page.close();
      console.log(`${file} (${size}×${size})`);
    }
  } finally {
    await browser.close();
  }
})();
