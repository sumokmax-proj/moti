#!/usr/bin/env node
/* 명언 카드 그리기 — 명언마다, 언어마다 한 장 (LAUNCH_CHECKLIST.md B8 2단계)
 *
 *   node tools/render-cards.js --cache <폴더>                  링크 미리보기(1200×630) — 배포 때
 *   node tools/render-cards.js --cache <폴더> --format instagram  인스타그램 카드(1080×1350) — 필요할 때 손으로
 *   node tools/render-cards.js --cache <폴더> --only ko/3        한 장만
 *
 * 카드의 모양과 파일 이름은 tools/cards.js 가 정한다. 이름에 내용의 지문이 들어 있어서
 * 캐시 폴더에 이미 있는 카드는 건너뛴다 — 배포 때마다 바뀐 명언만 다시 그린다.
 * 명언은 들어갈 때까지 글자를 줄이고, 바닥 크기에서도 넘치면 알린다(종료 코드 1).
 * Playwright 가 필요하다(배포에서는 .github/workflows/pages.yml 이 설치한다). */

const fs = require("fs");
const path = require("path");
const { cardSpec, cardBody, pageShell, SIZES, FORMATS } = require("./cards");
const { loadData, LANGS } = require("./build-pages");

function allSpecs(format = "og") {
  const { quotes } = loadData();
  const specs = [];
  for (const q of quotes) for (const L of LANGS) {
    const s = cardSpec(q, L, format);
    if (s) specs.push(s);
  }
  return specs;
}

/* 한 페이지를 열어 두고 카드를 갈아 끼우며 찍는다. measureOnly 면 찍지 않고 들어가는지만 잰다. */
async function renderCards({ cache, format = "og", specs = allSpecs(format), browser, measureOnly = false }) {
  const f = FORMATS[format];
  const todo = measureOnly ? specs : specs.filter((s) => !fs.existsSync(path.join(cache, s.file)));
  const result = { total: specs.length, rendered: 0, skipped: specs.length - todo.length, overflow: [], smallest: Infinity };
  if (!todo.length) return result;

  const page = await browser.newPage({ viewport: { width: f.width, height: f.height }, deviceScaleFactor: 1 });
  await page.setContent(pageShell(), { waitUntil: "networkidle" });
  for (const spec of todo) {
    const fit = await page.evaluate(async ({ body, size }) => {
      const slot = document.getElementById("slot");
      slot.innerHTML = body;
      const card = slot.firstElementChild;
      const text = card.querySelector(".text");
      const box = card.querySelector(".quote");
      const inner = card.querySelector(".inner");
      const room = () => box.clientHeight - parseFloat(getComputedStyle(box).paddingTop);
      const over = () => inner.offsetHeight > room() + 1;
      // 이 카드의 글자에 필요한 글꼴 조각(유니코드 범위별)을 먼저 받는다 — 재기 전에.
      await document.fonts.load(`400 40px "Hahmlet"`, text.textContent);
      await document.fonts.load(`600 26px "Hahmlet"`, card.textContent);
      await document.fonts.ready;
      let px = size.start;
      text.style.fontSize = `${px}px`;
      while (over() && px > size.min) {
        px -= 2;
        text.style.fontSize = `${px}px`;
      }
      return { px, overflow: over() };
    }, { body: cardBody(spec), size: SIZES[format] });
    result.smallest = Math.min(result.smallest, fit.px);
    if (fit.overflow) result.overflow.push(`${spec.lang}/${spec.id}`);
    if (!measureOnly) {
      const out = path.join(cache, spec.file);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      await page.locator(".card").screenshot({ path: out });
      result.rendered += 1;
    }
  }
  await page.close();
  return result;
}

module.exports = { renderCards, allSpecs };

if (require.main === module) {
  const args = process.argv.slice(2);
  const arg = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
  const cache = arg("--cache");
  const format = arg("--format") || "og";
  const only = arg("--only");
  if (!cache || !FORMATS[format]) {
    console.error("\n사용법: node tools/render-cards.js --cache <폴더> [--format og|instagram] [--only ko/3]\n");
    process.exit(1);
  }
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch {
    console.error("\nplaywright 가 없습니다. 처음 한 번:\n  npm install && npx playwright install chromium\n");
    process.exit(1);
  }
  (async () => {
    const launchOpts = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
    const browser = await chromium.launch(launchOpts);
    try {
      let specs = allSpecs(format);
      if (only) specs = specs.filter((s) => `${s.lang}/${s.id}` === only);
      const r = await renderCards({ cache, format, specs, browser });
      console.log(`명언 카드(${format}) ${r.total}장 — 새로 그림 ${r.rendered} · 캐시 ${r.skipped}${r.rendered ? ` · 가장 작은 글자 ${r.smallest}px` : ""} → ${cache}`);
      if (r.overflow.length) {
        console.error(`✗ 바닥 크기에서도 넘침: ${r.overflow.join(", ")}`);
        process.exitCode = 1;
      }
    } finally {
      await browser.close();
    }
  })();
}
