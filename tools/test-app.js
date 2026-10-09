#!/usr/bin/env node
/* 앱 동작 시험 — 실제 브라우저(Chromium)로 앱을 열어 눌러 본다.
 *
 *   npm run test:app
 *
 * 처음 한 번: npm install && npx playwright install chromium
 * (Chromium 이 이미 있으면 PLAYWRIGHT_CHROMIUM_PATH 로 그 경로를 알려 줘도 된다.)
 *
 * 수집기 서버(collector/server.js)를 빈 포트에 띄워 앱을 열고, 끝나면 내린다.
 * 서버는 읽기만 한다 — 이 시험은 명언 데이터를 바꾸지 않는다.
 *
 * 시험하는 것
 *   화면      전체 명언 x 한/영 x 390x844 · 320x568 — 넘침 없음, 「다음」 버튼이 화면 안
 *   최근 20%  1,000번 넘김에 재등장 0 · 새로고침 뒤 첫 명언 · 저장소 쓰기 차단
 *   주르륵    짧은 탭은 페이드 · 길게 누르기 · 밀기 · Shift · 도중 멈춤(즐겨찾기 오작동 없음)
 *             · 휴대폰 메뉴 막기 · 넘김 중 언어 전환 · 동작 줄이기
 *   되돌아가기 한 장 · 반동(정점 22px) · 다시 나아갔다 돌아오기 · 새로고침 뒤 · 가장자리
 *             · 키보드 · 동작 줄이기
 *   즐겨찾기  고친 명언은 지금 문장으로, 삭제된 명언은 저장해 둔 문장으로
 *   공통      페이지 에러 없음, 가로 스크롤 없음 */

const { spawn } = require("child_process");
const net = require("net");
const path = require("path");
const { ROOT, loadQuotes, createReport } = require("./lib");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("\nplaywright 가 없습니다. 처음 한 번:\n  npm install && npx playwright install chromium\n");
  process.exit(1);
}

const report = createReport("앱 동작 시험");
const QUOTE_COUNT = loadQuotes().quotes.length;

/* ── 서버 ─────────────────────────────────────────── */
function freePort() {
  return new Promise((resolve) => {
    const s = net.createServer().listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

async function startServer() {
  const port = await freePort();
  const proc = spawn(process.execPath, [path.join(ROOT, "collector", "server.js")], {
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore",
  });
  const url = `http://127.0.0.1:${port}/`;
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`${url}api/health`);
      if (res.ok) return { proc, url };
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  proc.kill();
  throw new Error("수집기 서버가 뜨지 않았습니다");
}

/* ── 도우미 ───────────────────────────────────────── */
const idle = (p) => p.waitForFunction(() => !turning && !isRiffling(), null, { timeout: 5000 });
const qid = (p) => p.evaluate(() => currentQuote.id);
const sheetCount = (p) => p.locator("#quote-block .sheet").count();
const hScroll = (p) => p.evaluate(() => document.documentElement.scrollWidth - innerWidth);

async function swipe(p, x0, x1, y = 400) {
  await idle(p);
  await p.mouse.move(x0, y);
  await p.mouse.down();
  await p.mouse.move(x1, y + 6, { steps: 6 });
  await p.mouse.up();
}
async function longPress(p, ms = 480) {
  await idle(p);
  const b = await p.locator("#next-btn").boundingBox();
  await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await p.mouse.down();
  await p.waitForTimeout(ms);
}
async function tapNext(p) {
  await idle(p);
  await p.click("#next-btn");
  await idle(p);
}
async function freshPage(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...opts });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => pageErrors.push(e.message));
  await page.goto(appUrl, { waitUntil: "networkidle" });
  return page;
}

let appUrl;
const pageErrors = [];

/* ── 화면 ─────────────────────────────────────────── */
async function suiteRender(browser) {
  for (const [w, h] of [[390, 844], [320, 568]]) {
    for (const lang of ["ko", "en"]) {
      const p = await freshPage(browser, { viewport: { width: w, height: h } });
      const r = await p.evaluate((L) => {
        setLang(L);
        const out = [];
        for (const q of QUOTES) {
          renderQuote(q);
          const nb = document.getElementById("next-btn").getBoundingClientRect();
          const te = document.getElementById("quote-text");
          out.push({ id: q.id, px: Math.round(parseFloat(getComputedStyle(te).fontSize)), ok: nb.bottom <= innerHeight && te.scrollWidth <= te.clientWidth + 1 });
        }
        return out;
      }, lang);
      const bad = r.filter((x) => !x.ok).map((x) => x.id);
      const sizes = r.map((x) => x.px);
      report.check(`화면 ${w}x${h} ${lang} — ${r.length}편`, bad.length === 0,
        bad.length ? `넘침: ${bad.join(", ")}` : `글자 ${Math.min(...sizes)}~${Math.max(...sizes)}px`);
      await p.context().close();
    }
  }
}

/* ── 최근 20% ─────────────────────────────────────── */
async function suiteRecent(browser) {
  const p = await freshPage(browser);
  const r = await p.evaluate(() => {
    const W = Math.floor(QUOTES.length * 0.2);
    const seen = [currentQuote.id];
    let cur = currentQuote, violations = 0;
    for (let i = 0; i < 1000; i++) {
      cur = turnPage(cur.id);
      if (seen.slice(-W).includes(cur.id)) violations++;
      seen.push(cur.id);
    }
    let minGap = Infinity;
    const last = {};
    seen.forEach((id, i) => { if (id in last) minGap = Math.min(minGap, i - last[id]); last[id] = i; });
    return { W, violations, distinct: new Set(seen).size, minGap };
  });
  report.check("최근 20% — 1,000번 넘김에 재등장 0", r.violations === 0, `피하는 폭 ${r.W}편, 최소 간격 ${r.minGap}`);
  report.check("최근 20% — 모든 명언이 언젠가 나옴", r.distinct === QUOTE_COUNT, `${r.distinct}/${QUOTE_COUNT}`);

  let reloadOk = true;
  for (let i = 0; i < 8; i++) {
    const before = await p.evaluate(() => getRecent().slice(-Math.floor(QUOTES.length * 0.2)));
    await p.reload({ waitUntil: "networkidle" });
    if (before.includes(await qid(p))) reloadOk = false;
  }
  report.check("최근 20% — 새로고침 뒤 첫 명언도 최근을 피함", reloadOk, "8회");

  const blocked = await p.evaluate(() => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error("blocked"); };
    let cur = currentQuote, v = 0;
    const seen = [cur.id];
    try {
      for (let i = 0; i < 300; i++) { cur = turnPage(cur.id); if (seen.slice(-20).includes(cur.id)) v++; seen.push(cur.id); }
    } finally { Storage.prototype.setItem = orig; }
    return v;
  });
  report.check("최근 20% — 저장소 쓰기가 막혀도 동작", blocked === 0, `300회 중 위반 ${blocked}`);
  await p.context().close();
}

/* ── 주르륵 ───────────────────────────────────────── */
async function suiteRiffle(browser) {
  const p = await freshPage(browser);
  const nb = await p.locator("#next-btn").boundingBox();
  const nx = nb.x + nb.width / 2, ny = nb.y + nb.height / 2;

  let id = await qid(p);
  await idle(p);
  await p.mouse.click(nx, ny);
  await p.waitForTimeout(60);
  const tapSheets = await sheetCount(p);
  await idle(p);
  report.check("짧은 탭은 페이드 (낱장 없음)", tapSheets === 0 && (await qid(p)) !== id);

  id = await qid(p);
  await longPress(p);
  const holding = await sheetCount(p);
  const width = await p.evaluate(() => document.querySelector("#quote-block .sheet")?.offsetWidth);
  await p.mouse.up();
  await p.waitForTimeout(80);
  const afterRelease = await sheetCount(p);
  const scroll = await hScroll(p);
  await idle(p);
  const leftover = (await sheetCount(p)) + (await p.locator("#quote-block .cast").count());
  report.check("길게 누르면 손을 떼기 전에 주르륵 시작", holding >= 4 && holding <= 7, `${holding}장`);
  report.check("손을 떼도 계속 넘어감", afterRelease > 0);
  report.check("낱장이 화면 폭 전체", width === 390, `${width}px`);
  report.check("주르륵이 끝나면 찌꺼기 없음", leftover === 0 && (await qid(p)) !== id);
  report.check("주르륵 중 가로 스크롤 없음", scroll === 0);

  await longPress(p, 450);
  await p.mouse.up();
  await p.waitForTimeout(100);
  await p.mouse.click(nx, ny);
  await p.waitForTimeout(30);
  report.check("넘김 중 「다음」 탭 → 그 자리에서 멈춤", (await sheetCount(p)) === 0);

  const hb = await p.locator("#favorite-btn").boundingBox();
  const favBefore = await p.evaluate(() => localStorage.getItem("motimoti-favorites"));
  await longPress(p, 450);
  await p.mouse.up();
  await p.waitForTimeout(100);
  await p.mouse.click(hb.x + hb.width / 2, hb.y + hb.height / 2);
  await p.waitForTimeout(30);
  const stopped = await sheetCount(p);
  const favAfter = await p.evaluate(() => localStorage.getItem("motimoti-favorites"));
  report.check("넘김 중 하트 자리 탭 → 멈추기만, 즐겨찾기 안 바뀜", stopped === 0 && favBefore === favAfter);

  id = await qid(p);
  await swipe(p, 330, 120);
  await p.waitForTimeout(60);
  const swipeSheets = await sheetCount(p);
  await idle(p);
  report.check("왼쪽으로 밀면 주르륵", swipeSheets > 1 && (await qid(p)) !== id);

  await swipe(p, hb.x + 20, hb.x - 200, hb.y + 20);
  await p.waitForTimeout(60);
  report.check("하트에서 시작한 밀기는 넘김이 아님", (await sheetCount(p)) === 0);

  await idle(p);
  await p.keyboard.down("Shift");
  await p.mouse.click(nx, ny);
  await p.keyboard.up("Shift");
  await p.waitForTimeout(60);
  report.check("Shift + 「다음」 → 주르륵", (await sheetCount(p)) > 1);
  await idle(p);

  const blockedMenu = await p.evaluate(() => !document.getElementById("next-btn").dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true })));
  report.check("「다음」 길게 누를 때 휴대폰 메뉴 막힘", blockedMenu);

  await longPress(p, 450);
  await p.mouse.up();
  await p.waitForTimeout(100);
  const target = (await p.evaluate(() => lang)) === "ko" ? "en" : "ko";
  await p.click(`.lang-btn[data-lang="${target}"]`);
  await p.waitForTimeout(30);
  const langOk = await p.evaluate(() => document.querySelectorAll("#quote-block .sheet").length === 0 && document.getElementById("quote-text").textContent === currentQuote.text[lang]);
  report.check("넘김 중 언어 전환 → 낱장 정리, 새 언어 문장", langOk);

  await p.emulateMedia({ reducedMotion: "reduce" });
  id = await qid(p);
  await longPress(p);
  const rm = await sheetCount(p);
  await p.mouse.up();
  await idle(p);
  report.check("동작 줄이기: 길게 눌러도 페이드", rm === 0 && (await qid(p)) !== id);
  await p.context().close();
}

/* ── 되돌아가기 · 반동 ───────────────────────────── */
async function suiteBack(browser) {
  const p = await freshPage(browser);
  await p.evaluate(() => localStorage.removeItem("motimoti-recent"));
  await p.reload({ waitUntil: "networkidle" });

  const A = await qid(p);
  await tapNext(p);
  await swipe(p, 120, 320);
  await p.waitForTimeout(120);
  const unfolding = await sheetCount(p);
  await idle(p);
  report.check("오른쪽으로 밀면 직전 명언으로 (펼쳐지며)", unfolding === 1 && (await qid(p)) === A && (await sheetCount(p)) === 0);

  // 반동: 정점(38%)에서 멈춰 세우고 잰다.
  await swipe(p, 120, 320);
  await p.waitForFunction(() => document.querySelector("#quote-block .sheet"));
  const peak = await p.evaluate(() => {
    const anims = [...document.querySelectorAll("#quote-block .sheet, #quote-block .cast")].flatMap((el) => el.getAnimations());
    anims.forEach((a) => { a.pause(); a.currentTime = 460 * 0.38; });
    const s = document.querySelector("#quote-block .sheet");
    return { x: Math.round(new DOMMatrix(getComputedStyle(s).transform).m41), scroll: document.documentElement.scrollWidth - innerWidth };
  });
  await p.evaluate(() => document.querySelectorAll("#quote-block .sheet, #quote-block .cast").forEach((el) => el.getAnimations().forEach((a) => a.play())));
  await idle(p);
  report.check("더 없으면 반동 — 정점 22px", peak.x === 22, `${peak.x}px`);
  report.check("반동 중 가로 스크롤 없음", peak.scroll === 0);
  report.check("반동 뒤 명언 그대로, 찌꺼기 없음", (await qid(p)) === A && (await sheetCount(p)) === 0);

  await tapNext(p);
  await swipe(p, 120, 320);
  await idle(p);
  report.check("다시 나아갔다 돌아오면 읽던 쪽으로", (await qid(p)) === A);

  const lastSeen = await qid(p);
  await p.reload({ waitUntil: "networkidle" });
  await swipe(p, 120, 320);
  await idle(p);
  report.check("새로고침 뒤에도 지난번 마지막 명언으로", (await qid(p)) === lastSeen);

  await tapNext(p);
  const D = await qid(p);
  await swipe(p, 10, 250);
  await p.waitForTimeout(60);
  report.check("가장자리 24px 에서 시작한 밀기는 무시", (await sheetCount(p)) === 0 && (await qid(p)) === D);

  await idle(p);
  await p.keyboard.press("ArrowRight");
  await idle(p);
  const E = await qid(p);
  await p.keyboard.press("ArrowLeft");
  await idle(p);
  report.check("키보드 → 다음, ← 되돌아가기", E !== D && (await qid(p)) === D);
  await p.keyboard.press("ArrowLeft");
  await p.waitForTimeout(60);
  report.check("키보드 ← 로도 반동", (await sheetCount(p)) === 1);
  await idle(p);

  await p.emulateMedia({ reducedMotion: "reduce" });
  await tapNext(p);
  const F = await qid(p);
  await tapNext(p);
  await swipe(p, 120, 320);
  await p.waitForTimeout(30);
  const rmBack = (await sheetCount(p)) === 0 && (await qid(p)) === F;
  await swipe(p, 120, 320);
  await p.waitForTimeout(30);
  report.check("동작 줄이기: 되돌아가기 즉시, 반동 생략", rmBack && (await sheetCount(p)) === 0);
  await p.context().close();
}

/* ── 즐겨찾기 ─────────────────────────────────────── */
async function suiteFavorites(browser) {
  const p = await freshPage(browser);
  // 고치기 전 문장으로 저장해 둔 즐겨찾기(59)와, 이제는 없는 명언(49)을 심는다.
  await p.evaluate(() => {
    localStorage.setItem("motimoti-lang", "ko");
    localStorage.setItem("motimoti-favorites", JSON.stringify([
      { id: 59, text: { ko: "고치기 전 문장", en: "old text" }, author: { ko: "김구", en: "Kim Ku" } },
      { id: 49, text: { ko: "삭제된 명언의 저장본", en: "deleted snapshot" }, author: { ko: "마리 퀴리", en: "Marie Curie" } },
    ]));
  });
  await p.reload({ waitUntil: "networkidle" });
  await p.click("#favorites-nav-btn");
  const items = await p.locator(".favorite-item-text").allTextContents();
  const live59 = await p.evaluate(() => QUOTES.find((q) => q.id === 59).text.ko);
  report.check("즐겨찾기: 고친 명언은 지금 문장으로 보임", items[0] === live59);
  report.check("즐겨찾기: 삭제된 명언은 저장해 둔 문장으로 보임", items[1] === "삭제된 명언의 저장본");
  await p.click("#back-btn");

  await idle(p);
  const id = await qid(p);
  await p.click("#favorite-btn");
  const saved = await p.evaluate((i) => JSON.parse(localStorage.getItem("motimoti-favorites")).some((q) => q.id === i), id);
  report.check("하트를 누르면 지금 명언이 저장됨", saved);
  await p.context().close();
}

/* ── 더 자주 펼치기 ───────────────────────────────── */
async function suiteWeight(browser) {
  const p = await freshPage(browser);
  // 즐겨찾기 10편을 심고 넘김 2만 번. 즐겨찾기 한 편과 나머지 한 편이 각각
  // 평균 몇 번 나왔는지 비교한다. 최근 20% 피하기가 자주 나온 쪽을 더 자주
  // 막으므로 실제 배율은 2보다 조금 낮다.
  const run = (on) => p.evaluate((on) => {
    const favIds = QUOTES.slice(0, 10).map((q) => q.id);
    localStorage.setItem("motimoti-favorites", JSON.stringify(favIds.map((id) => ({ id }))));
    setWeightFavorites(on);
    const W = Math.floor(QUOTES.length * 0.2);
    const fav = new Set(favIds);
    let cur = currentQuote, favHits = 0, otherHits = 0, violations = 0;
    const seen = [cur.id];
    for (let i = 0; i < 20000; i++) {
      cur = turnPage(cur.id);
      if (seen.slice(-W).includes(cur.id)) violations++;
      seen.push(cur.id);
      if (fav.has(cur.id)) favHits++; else otherHits++;
    }
    const ratio = (favHits / fav.size) / (otherHits / (QUOTES.length - fav.size));
    return { ratio: Math.round(ratio * 100) / 100, violations };
  }, on);
  const onR = await run(true);
  const offR = await run(false);
  report.check("더 자주 펼치기 켬 — 즐겨찾기가 더 자주 나옴", onR.ratio >= 1.5 && onR.ratio <= 2.05, `${onR.ratio}배`);
  report.check("더 자주 펼치기 켬 — 최근 20% 피하기는 그대로", onR.violations === 0, `2만 번 중 위반 ${onR.violations}`);
  report.check("더 자주 펼치기 끔 — 고르게 나옴", offR.ratio >= 0.85 && offR.ratio <= 1.15, `${offR.ratio}배`);

  // 기본은 켬, 누르면 꺼지고, 앱을 닫았다 열어도 기억한다.
  await p.evaluate(() => { localStorage.removeItem("motimoti-favorites-weight"); localStorage.setItem("motimoti-lang", "ko"); });
  await p.reload({ waitUntil: "networkidle" });
  await p.click("#favorites-nav-btn");
  const btn = p.locator("#weight-btn");
  const defaultOn = (await btn.getAttribute("aria-pressed")) === "true";
  const label = (await btn.textContent()).trim();
  await btn.click();
  const offNow = (await btn.getAttribute("aria-pressed")) === "false" && !(await p.evaluate(() => weightFavorites));
  await p.reload({ waitUntil: "networkidle" });
  const remembered = await p.evaluate(() => !weightFavorites && document.getElementById("weight-btn").getAttribute("aria-pressed") === "false");
  report.check("더 자주 펼치기 — 기본 켬, 누르면 끔, 다시 열어도 기억", defaultOn && offNow && remembered, `「${label}」`);
  await p.context().close();
}

/* ── 실행 ─────────────────────────────────────────── */
(async () => {
  const { proc, url } = await startServer();
  appUrl = url;
  const launchOpts = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
  let browser;
  try {
    browser = await chromium.launch(launchOpts);
    for (const [name, suite] of [["화면", suiteRender], ["최근 20%", suiteRecent], ["주르륵", suiteRiffle], ["되돌아가기", suiteBack], ["즐겨찾기", suiteFavorites], ["더 자주 펼치기", suiteWeight]]) {
      try {
        await suite(browser);
      } catch (err) {
        report.fail(`${name} 시험 도중 멈춤`, err.message.split("\n")[0]);
      }
    }
    report.check("페이지 에러 없음", pageErrors.length === 0, pageErrors.slice(0, 3).join(" | "));
  } finally {
    if (browser) await browser.close();
    proc.kill();
  }
  process.exitCode = report.print() > 0 ? 1 : 0;
})();
