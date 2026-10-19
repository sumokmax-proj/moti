#!/usr/bin/env node
/* 앱 동작 시험 — 실제 브라우저(Chromium)로 앱을 열어 눌러 본다.
 *
 *   npm run test:app
 *
 * 처음 한 번: npm install && npx playwright install chromium
 * (Chromium 이 이미 있으면 PLAYWRIGHT_CHROMIUM_PATH 로 그 경로를 알려 줘도 된다.)
 *
 * 저장소 폴더를 내주는 작은 정적 서버를 빈 포트에 띄워 앱을 열고, 끝나면 내린다.
 * 읽기만 한다 — 이 시험은 명언 데이터를 바꾸지 않는다.
 *
 * 시험하는 것
 *   화면      전체 명언 x 한/영 x 390x844 · 320x568 — 넘침 없음, 「다음」 버튼이 화면 안
 *   최근 20%  3,000번 넘김에 재등장 0 · 새로고침 뒤 첫 명언 · 저장소 쓰기 차단
 *   주르륵    짧은 탭은 페이드 · 길게 누르기 · 밀기 · Shift · 도중 멈춤(즐겨찾기 오작동 없음)
 *             · 휴대폰 메뉴 막기 · 넘김 중 언어 전환 · 동작 줄이기
 *   되돌아가기 한 장 · 반동(정점 22px) · 다시 나아갔다 돌아오기 · 새로고침 뒤 · 가장자리
 *             · 키보드 · 동작 줄이기
 *   판권면    즐겨찾기 화면에서 열기 · 데이터에서 센 숫자·엮은이·펴낸 날 · 언어 전환 · 닫기 · 320x568
 *   즐겨찾기  고친 명언은 지금 문장으로, 삭제된 명언은 저장해 둔 문장으로
 *   출처 쪽지 작가 이름으로 열기 · Esc·바깥으로 닫기 · 화살표 막기 · 넘기면 닫힘 · 모든 명언 × 세 언어의
 *             내용·링크·인용 확인 · 연도 「~년경」 · 원문 · 기울임 · 320x568 에서 화면 안
 *   공통      페이지 에러 없음, 가로 스크롤 없음 */

const fs = require("fs");
const http = require("http");
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

/* ── 서버 ─────────────────────────────────────────
   앱은 정적 파일뿐이다(GitHub Pages 와 같다). 저장소 폴더를 그대로 내준다. */
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };

function startServer() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = path.join(ROOT, pathname.endsWith("/") ? `${pathname}index.html` : pathname);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, url: `http://127.0.0.1:${server.address().port}/` }));
  });
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
// 클릭이 끝났다고 페이드가 이미 시작됐다는 보장은 없다. 그 사이에 idle 을 보면
// 곧바로 통과해 버려, 다음 손짓이 페이드 한가운데 떨어진다(그러면 앱이 옳게
// 무시한다). 그래서 명언이 실제로 바뀔 때까지 기다린다.
async function tapNext(p) {
  await idle(p);
  const before = await qid(p);
  await p.click("#next-btn");
  await p.waitForFunction((b) => !turning && !isRiffling() && currentQuote.id !== b, before, { timeout: 5000 });
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
    for (const lang of ["ko", "en", "vi"]) {
      const p = await freshPage(browser, { viewport: { width: w, height: h } });
      const r = await p.evaluate((L) => {
        setLang(L);
        const out = [];
        for (const q of QUOTES.filter((x) => x.text[L])) {
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
    // 3,000번 — 1,000번이면 141편 중 한 편이 우연히 한 번도 안 나올 확률이 2% 남짓이라
    // 시험이 가끔 저절로 실패했다(2026-10-19). 3,000번이면 그 확률이 사실상 0 이다.
    for (let i = 0; i < 3000; i++) {
      cur = turnPage(cur.id);
      if (seen.slice(-W).includes(cur.id)) violations++;
      seen.push(cur.id);
    }
    let minGap = Infinity;
    const last = {};
    seen.forEach((id, i) => { if (id in last) minGap = Math.min(minGap, i - last[id]); last[id] = i; });
    return { W, violations, distinct: new Set(seen).size, minGap };
  });
  report.check("최근 20% — 3,000번 넘김에 재등장 0", r.violations === 0, `피하는 폭 ${r.W}편, 최소 간격 ${r.minGap}`);
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
  let D = await qid(p);
  await swipe(p, 10, 250);
  await p.waitForTimeout(60);
  report.check("가장자리 24px 에서 시작한 밀기는 무시", (await sheetCount(p)) === 0 && (await qid(p)) === D);

  // 글자를 선택해 둔 채 그 위를 마우스로 밀어도 밀기로 본다(선택한 글자 끌기가 아니라).
  await idle(p);
  await tapNext(p);
  await p.evaluate(() => {
    const r = document.createRange();
    r.selectNodeContents(document.getElementById("quote-text"));
    getSelection().removeAllRanges();
    getSelection().addRange(r);
  });
  const ty = (await p.locator("#quote-text").boundingBox()).y + 10;
  await swipe(p, 120, 320, ty);
  await idle(p);
  report.check("글자를 선택한 채 밀어도 되돌아감", (await qid(p)) === D);
  await tapNext(p);
  D = await qid(p);

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
  const backSheets = await sheetCount(p), backId = await qid(p);
  await swipe(p, 120, 320);
  await p.waitForTimeout(30);
  const bounceSheets = await sheetCount(p);
  report.check("동작 줄이기: 되돌아가기 즉시, 반동 생략", backSheets === 0 && backId === F && bounceSheets === 0,
    `낱장 ${backSheets}/${bounceSheets}, 명언 ${backId} (기대 ${F})`);
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

/* ── 화면 안정 (iPhone 에서 실제로 겪은 두 가지) ───── */
async function suiteStable(browser) {
  const p = await freshPage(browser, { viewport: { width: 393, height: 700 }, hasTouch: true, isMobile: true });
  await p.evaluate(() => {
    localStorage.setItem("motimoti-lang", "en");
    localStorage.setItem("motimoti-favorites", JSON.stringify(QUOTES.slice(0, 12).map((q) => ({ id: q.id }))));
  });
  await p.reload({ waitUntil: "networkidle" });
  const size = () => p.evaluate(() => getComputedStyle(document.getElementById("quote-text")).fontSize);
  const base = await size();

  // 1) 즐겨찾기 화면에서 창 크기가 바뀌어도(주소창 접힘) 돌아오면 원래 크기
  await p.tap("#favorites-nav-btn");
  await p.setViewportSize({ width: 393, height: 760 });
  await p.waitForTimeout(300);
  await p.tap("#back-btn");
  const afterResize = await size();
  report.check("즐겨찾기 화면에서 창 크기 변화 → 돌아와도 글자 크기 그대로", afterResize === base, `${base} → ${afterResize}`);

  // 2) 즐겨찾기 화면에서 언어를 바꿔도 돌아오면 그 언어의 기본 크기
  await p.tap("#favorites-nav-btn");
  await p.locator("#favorites-view .lang-btn[data-lang=ko]").tap();
  await p.tap("#back-btn");
  const koExpected = await p.evaluate(() => {
    const t = document.getElementById("quote-text");
    const fit = t.style.getPropertyValue("--quote-fit");
    t.style.removeProperty("--quote-fit");
    const v = getComputedStyle(t).fontSize;
    if (fit) t.style.setProperty("--quote-fit", fit);
    return v;
  });
  const afterLang = await size();
  report.check("즐겨찾기 화면에서 언어 전환 → 돌아와도 기본 크기", afterLang === koExpected, `${afterLang} (기본 ${koExpected})`);

  // 3) 글자와 상관없는 넘침(주소창이 움직이는 도중 등)에는 줄이지 않는다
  const spurious = await p.evaluate(() => {
    const pad = document.createElement("div");
    pad.style.height = "3000px";
    document.body.appendChild(pad);
    fitQuoteText();
    const v = getComputedStyle(document.getElementById("quote-text")).fontSize;
    pad.remove();
    fitQuoteText();
    return v;
  });
  report.check("글자 탓이 아닌 넘침에는 글자를 줄이지 않음", spurious === koExpected, `${spurious}`);

  // 4) 가로로 밀린 화면이 남지 않는다. iPhone 에서 .app 의 clip 이 새는 상황을
  //    clip 을 꺼서 흉내 내고, 반동·되돌아가기 낱장이 화면 밖으로 나가게 한다.
  const sideways = await p.evaluate(async () => {
    document.querySelector(".app").style.overflowX = "visible";
    const out = [];
    let widened = 0;
    const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    // 손가락이 옆으로 끌었다고 치고 한 프레임 뒤에 본다(scroll 이벤트는 프레임마다 온다).
    const tryScroll = async () => { window.scrollTo(30, window.scrollY); await frame(); out.push(window.scrollX); };
    goBack(); // 직전이 없으면 반동, 있으면 되돌아가기
    for (let i = 0; i < 12; i++) { await new Promise((r) => setTimeout(r, 25)); await tryScroll(); widened = Math.max(widened, document.documentElement.scrollWidth - innerWidth); }
    await new Promise((r) => setTimeout(r, 600));
    goBack();
    for (let i = 0; i < 12; i++) { await new Promise((r) => setTimeout(r, 25)); await tryScroll(); widened = Math.max(widened, document.documentElement.scrollWidth - innerWidth); }
    await new Promise((r) => setTimeout(r, 600));
    document.querySelector(".app").style.overflowX = "";
    return { max: Math.max(...out), widened };
  });
  report.check("낱장이 화면 밖으로 새도 가로로 밀린 채 남지 않음", sideways.widened > 0 && sideways.max === 0,
    `새어 나간 폭 ${sideways.widened}px, 남은 scrollX ${sideways.max}`);
  await p.context().close();
}

/* ── 베트남어 (베타) ──────────────────────────────── */
async function suiteVietnamese(browser) {
  // 베트남어 기기라도 기본은 영어다(베타라서).
  const p = await freshPage(browser, { locale: "vi-VN" });
  report.check("베트남어 기기 — 기본은 영어", (await p.evaluate(() => lang)) === "en");
  const vi = p.locator(".app-header .lang-btn[data-lang=vi]");
  const label = await vi.getAttribute("aria-label");
  report.check("VN 버튼 — β 표시", (await vi.isVisible()) && (await vi.textContent()).replace("β", "") === "VN" && /beta/i.test(label), label);

  await vi.click();
  await idle(p);
  const r = await p.evaluate(() => ({
    html: document.documentElement.lang,
    text: document.getElementById("quote-text").textContent,
    vi: currentQuote.text.vi,
    toast: !document.getElementById("toast").classList.contains("hidden"),
  }));
  report.check("VN 으로 바꾸면 베트남어 명언, 안내문·알림 없음", r.html === "vi" && r.text === r.vi && !r.toast);

  const pool = await p.evaluate(() => {
    let cur = currentQuote, bad = 0;
    for (let i = 0; i < 200; i++) { cur = turnPage(cur.id); if (!cur.text.vi) bad++; }
    return { bad, size: QUOTES.filter((q) => q.text.vi).length };
  });
  report.check("VI 에서는 베트남어가 있는 명언만 나옴", pool.bad === 0, `베트남어 ${pool.size}편, 200번 중 없는 것 ${pool.bad}`);

  // 저장된 선택이 vi 인데 베트남어 데이터가 없으면 영어로 시작하고 버튼을 숨긴다.
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route("**/quotes-vi.js*", (route) => route.fulfill({ contentType: "text/javascript", body: "const QUOTES_VI = {};" }));
  const q = await ctx.newPage();
  q.on("pageerror", (e) => pageErrors.push(e.message));
  await q.goto(appUrl, { waitUntil: "networkidle" });
  await q.evaluate(() => localStorage.setItem("motimoti-lang", "vi"));
  await q.reload({ waitUntil: "networkidle" });
  const fallback = await q.evaluate(() => ({ lang, hidden: document.querySelector(".app-header .lang-btn[data-lang=vi]").hidden }));
  report.check("베트남어 데이터가 없으면 VI 숨김, 영어로 시작", fallback.lang === "en" && fallback.hidden);
  await ctx.close();
  await p.context().close();
}

/* ── 출처 쪽지 ─────────────────────────────────────── */
async function suiteNote(browser) {
  const p = await freshPage(browser);
  await idle(p);
  const shown = () => p.evaluate(() => ({
    open: noteOpen,
    on: document.getElementById("source-note").classList.contains("on"),
    hidden: document.getElementById("source-note").hidden,
    expanded: document.getElementById("quote-author").getAttribute("aria-expanded"),
  }));

  await p.click("#quote-author");
  await p.waitForTimeout(400);
  let s = await shown();
  const focused = await p.evaluate(() => document.activeElement.id);
  report.check("작가 이름을 누르면 쪽지가 올라옴", s.open && s.on && !s.hidden && s.expanded === "true" && focused === "source-note");

  // 쪽지가 떠 있는 동안 화살표는 넘기지 않는다.
  const before = await qid(p);
  await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(300);
  report.check("쪽지가 떠 있으면 화살표로 넘어가지 않음", (await qid(p)) === before);

  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  s = await shown();
  const back = await p.evaluate(() => document.activeElement.id);
  report.check("Esc 로 닫히고 초점이 작가 이름으로", !s.open && s.hidden && s.expanded === "false" && back === "quote-author");

  await p.click("#quote-author");
  await p.waitForTimeout(400);
  await p.mouse.click(195, 120); // 쪽지 위쪽 — 가라앉은 바탕
  await p.waitForTimeout(400);
  s = await shown();
  report.check("바깥을 누르면 닫힘", !s.open && s.hidden);

  // 작가 이름은 겉으로 글자다 — 그 위에서 밀어도 넘어가고, 쪽지는 열리지 않는다.
  await tapNext(p);
  const ab = await p.locator("#quote-author").boundingBox();
  const id0 = await qid(p);
  // 이름이 짧아(「공자」) 왼쪽으로는 밀 거리가 없다. 오른쪽(되돌아가기)으로 민다.
  await swipe(p, ab.x + Math.min(ab.width / 2, 20), ab.x + 220, ab.y + ab.height / 2);
  await p.waitForTimeout(200);
  await idle(p);
  report.check("작가 이름 위에서 밀어도 넘어가고 쪽지는 안 열림", (await qid(p)) !== id0 && !(await p.evaluate(() => noteOpen)));

  // 「다음」·되돌아가기·즐겨찾기 화면으로 가면 닫힌다.
  const closes = await p.evaluate(async () => {
    const out = {};
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    openNote(); showNextQuote(); out.next = !noteOpen && document.getElementById("source-note").hidden;
    await wait(400);
    openNote(); openFavoritesView(); out.fav = !noteOpen && document.getElementById("source-note").hidden;
    closeFavoritesView();
    return out;
  });
  report.check("「다음」·즐겨찾기 화면으로 가면 쪽지가 닫힘", closes.next && closes.fav);

  // 모든 명언 × 세 언어: 내용이 비지 않고, 별표가 남지 않고, 링크가 맞다.
  const all = await p.evaluate(() => {
    const bad = [];
    const counts = { orig: 0, cited: 0, circa: 0 };
    for (const L of ["ko", "en", "vi"]) {
      setLang(L);
      for (const q of QUOTES.filter((x) => x.text[L])) {
        currentQuote = q;
        fillNote(q);
        const g = (id) => document.getElementById(id);
        const title = g("note-title");
        const label = g("note-link-label").textContent;
        const href = g("note-link").getAttribute("href");
        const problems = [];
        if (!title.textContent.trim() || title.textContent.includes("*")) problems.push("출처");
        if (!g("note-kind").textContent.trim()) problems.push("연도");
        if (!/^https?:\/\//.test(href) || /gutenberg\.org\/(cache|files)\//.test(href)) problems.push("링크");
        if (q.cited ? label !== `${UI[L].note.links.cited} →` : label === `${UI[L].note.links.cited} →`) problems.push("인용 확인");
        if (q.kind && !g("note-kind").textContent.startsWith(UI[L].note.kinds[q.kind])) problems.push("종류");
        if (!g("note-host").textContent) problems.push("주소");
        if (problems.length) bad.push(`${L}:${q.id}(${problems.join("·")})`);
        if (L === "ko") {
          if (!g("note-orig").hidden) counts.orig++;
          if (q.cited) counts.cited++;
          if (g("note-kind").textContent.includes("경")) counts.circa++;
        }
      }
    }
    setLang("ko");
    return { bad, counts };
  });
  report.check("모든 명언 · 세 언어 — 쪽지 내용과 링크", all.bad.length === 0,
    all.bad.length ? all.bad.slice(0, 6).join(", ") : `원문 표시 ${all.counts.orig}편 · 인용 확인 ${all.counts.cited}편 · 「~년경」 ${all.counts.circa}편`);

  // 견본: 연도·원문·기울임.
  const sample = await p.evaluate(() => {
    const pick = (id, L) => {
      setLang(L);
      const q = QUOTES.find((x) => x.id === id);
      fillNote(q);
      const g = (x) => document.getElementById(x);
      return { kind: g("note-kind").textContent, orig: !g("note-orig").hidden, italic: g("note-title").querySelectorAll("i").length };
    };
    return { a: pick(177, "ko"), b: pick(177, "en"), c: pick(54, "en"), d: pick(54, "ko"), e: pick(51, "ko") };
  });
  report.check("연도 「기원전 450년경」·「c. 450 BC」, 대략이 아니면 「~경」 없음",
    sample.a.kind === "기원전 450년경" && sample.b.kind === "c. 450 BC" && sample.e.kind === "편지 · 1883년", `${sample.a.kind} / ${sample.b.kind} / ${sample.e.kind}`);
  report.check("원문은 화면 문장과 다를 때만 (처칠 영어 X, 한국어 O)", !sample.c.orig && sample.d.orig && sample.a.orig);
  report.check("영어 출처의 책 제목은 기울임", sample.b.italic === 2);

  // 문맥 해설 — 있는 명언에만, 세 언어(베트남어는 영어).
  const ctx = await p.evaluate(() => {
    if (typeof QUOTES_CONTEXT === "undefined") return null;
    const id = Number(Object.keys(QUOTES_CONTEXT)[0]);
    const without = QUOTES.find((q) => !QUOTES_CONTEXT[q.id]);
    const out = {};
    for (const L of ["ko", "en", "vi"]) {
      setLang(L);
      fillNote(QUOTES.find((q) => q.id === id));
      out[L] = { shown: !document.getElementById("note-context").hidden, text: document.getElementById("note-context-text").textContent };
    }
    // 모든 명언에 해설이 있으면 「없는 명언에서는 숨김」을 볼 수 없다 — 그때는 전부 있는지 본다.
    if (without) {
      fillNote(without);
      out.without = document.getElementById("note-context").hidden;
    } else {
      out.without = QUOTES.every((q) => QUOTES_CONTEXT[q.id]);
    }
    setLang("ko");
    out.ko0 = QUOTES_CONTEXT[id].ko;
    out.en0 = QUOTES_CONTEXT[id].en.replace(/\*/g, "");
    return out;
  });
  if (ctx) report.check("문맥 해설 — 있는 명언에만(전부 있으면 전부), 한·영, 베트남어는 영어", ctx.ko.shown && ctx.ko.text === ctx.ko0 && ctx.en.text === ctx.en0 && ctx.vi.text === ctx.en0 && ctx.without);

  // 가장 작은 화면에서 쪽지가 화면 안에 있고 옆으로 넘치지 않는다.
  const q = await freshPage(browser, { viewport: { width: 320, height: 568 } });
  const fit = await q.evaluate(async () => {
    const bad = [];
    for (const L of ["ko", "en", "vi"]) {
      setLang(L);
      for (const x of QUOTES.filter((y) => y.text[L])) {
        currentQuote = x;
        openNote();
        const n = document.getElementById("source-note");
        n.style.transition = "none";
        const r = n.getBoundingClientRect();
        if (n.scrollWidth > n.clientWidth + 1 || r.top < 0 || r.bottom > innerHeight + 1) bad.push(`${L}:${x.id}`);
        closeNote(true);
      }
    }
    return { bad, wide: document.documentElement.scrollWidth - innerWidth };
  });
  report.check("320x568 — 쪽지가 화면 안, 옆 넘침 없음", fit.bad.length === 0 && fit.wide <= 0, fit.bad.slice(0, 6).join(", "));
  await q.context().close();
  await p.context().close();
}

/* ── 즐겨찾기에서 출처 쪽지 ─────────────────────────── */
async function suiteFavoriteNote(browser) {
  const p = await freshPage(browser);
  // 해설이 있는 명언 하나와, 데이터에서 지워진 명언(저장해 둔 문장만 남은 것) 하나를 저장해 둔다.
  const ids = await p.evaluate(() => {
    const withCtx = typeof QUOTES_CONTEXT !== "undefined" ? Number(Object.keys(QUOTES_CONTEXT)[0]) : QUOTES[0].id;
    const q = QUOTES.find((x) => x.id === withCtx);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([
      { id: q.id, text: q.text, author: q.author },
      { id: 999999, text: { ko: "지워진 명언", en: "A removed quote" }, author: { ko: "옛 저자", en: "Old author" } },
    ]));
    openFavoritesView();
    return { id: q.id, hasCtx: typeof QUOTES_CONTEXT !== "undefined" };
  });
  const authors = p.locator(".favorite-item-author");
  const tags = await authors.evaluateAll((els) => els.map((e) => e.tagName));
  report.check("즐겨찾기 — 실린 명언의 작가 이름만 누를 수 있음(지워진 명언은 글자)", tags[0] === "BUTTON" && tags[1] === "P", tags.join(", "));

  await authors.first().click();
  await p.waitForTimeout(400);
  const r = await p.evaluate((id) => ({
    open: noteOpen && !document.getElementById("source-note").hidden,
    same: noteQuote && noteQuote.id === id,
    title: document.getElementById("note-title").textContent,
    expected: localized(QUOTES.find((q) => q.id === id).source),
    ctx: !document.getElementById("note-context").hidden,
  }), ids.id);
  report.check("즐겨찾기에서 작가 이름을 누르면 그 명언의 쪽지(출처·해설)", r.open && r.same && r.title === r.expected.replace(/\*/g, "") && (!ids.hasCtx || r.ctx));

  const lang = await p.evaluate(() => { setLang("en"); return document.getElementById("note-title").textContent === localized(noteQuote.source).replace(/\*/g, ""); });
  report.check("쪽지가 열린 채 언어를 바꾸면 그 언어로", lang);

  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  const closed = await p.evaluate(() => ({ open: noteOpen, hidden: document.getElementById("source-note").hidden, fav: !document.getElementById("favorites-view").classList.contains("hidden") }));
  report.check("닫으면 즐겨찾기 목록 그대로", !closed.open && closed.hidden && closed.fav);
  await p.context().close();
}

/* ── 판권면 ───────────────────────────────────────── */
async function suiteColophon(browser) {
  const p = await freshPage(browser);
  await p.click("#favorites-nav-btn");
  const btn = p.locator("#about-btn");
  report.check("즐겨찾기 화면 맨 아래 「이 책에 대하여」", (await btn.isVisible()) && (await btn.textContent()) === "About this book");
  await btn.click();
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => ({
    open: paperEl === colophonEl && !colophonEl.hidden,
    focus: document.activeElement.id,
    table: document.getElementById("colophon-table").textContent,
    text: document.getElementById("colophon-text-1").textContent,
    motto: document.getElementById("colophon-motto-tr").textContent,
    total: QUOTES.length,
    authors: new Set(QUOTES.map((q) => q.author.ko)).size,
    edition: EDITION,
  }));
  report.check("판권면이 올라오고 초점이 종이로", r.open && r.focus === "colophon");
  report.check("판권면 숫자는 데이터에서 — 편수·저자·엮은이·펴낸 날",
    r.text.includes(String(r.total)) && r.table.includes(`${r.authors} authors`) && r.table.includes(r.edition.editor) && r.table.includes("2026") && r.motto.length > 0,
    `${r.total}편 · 저자 ${r.authors}명 · ${r.edition.editor} · ${r.edition.date}`);

  const ko = await p.evaluate(() => {
    setLang("ko");
    return { table: document.getElementById("colophon-table").textContent, about: document.getElementById("about-btn").textContent };
  });
  report.check("언어를 바꾸면 판권면도 바뀜", ko.table.includes("엮은이") && ko.table.includes("펴낸 날") && ko.about === "이 책에 대하여");

  await p.keyboard.press("Escape");
  await p.waitForTimeout(400);
  const closed = await p.evaluate(() => ({ paper: paperEl, hidden: colophonEl.hidden, veil: document.getElementById("note-veil").hidden, focus: document.activeElement.id }));
  report.check("Esc 로 닫히고 초점이 「이 책에 대하여」로", !closed.paper && closed.hidden && closed.veil && closed.focus === "about-btn");

  const back = await p.evaluate(() => {
    openColophon();
    closeFavoritesView();
    return !paperEl && colophonEl.hidden && document.getElementById("note-veil").hidden;
  });
  report.check("메인으로 돌아가면 판권면이 닫힘", back);

  // 끌어내리기 — 손가락을 따라오고, 조금 끌다 놓으면 제자리, 튕기면 닫힌다.
  const t = await freshPage(browser, { hasTouch: true, isMobile: true });
  await t.evaluate(() => { openFavoritesView(); openColophon(); });
  await t.waitForTimeout(400);
  const cdp = await t.context().newCDPSession(t);
  const touch = (type, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x: 200, y }] });
  const ty = () => t.evaluate(() => new DOMMatrix(getComputedStyle(colophonEl).transform).m42);
  await touch("touchStart", 200);
  for (let y = 205; y <= 260; y += 5) { await touch("touchMove", y); await t.waitForTimeout(30); }
  const follow = await ty();
  await touch("touchEnd");
  await t.waitForTimeout(400);
  const settled = await t.evaluate(() => ({ open: paperEl === colophonEl, y: new DOMMatrix(getComputedStyle(colophonEl).transform).m42 }));
  report.check("끌면 종이가 손가락을 따라오고, 조금 끌다 놓으면 제자리", follow > 30 && settled.open && settled.y === 0, `끈 거리 ${Math.round(follow)}px`);
  await touch("touchStart", 200);
  for (let y = 210; y <= 330; y += 30) { await touch("touchMove", y); await t.waitForTimeout(8); }
  await touch("touchEnd");
  await t.waitForTimeout(450);
  const flung = await t.evaluate(() => ({ paper: paperEl, hidden: colophonEl.hidden, veil: document.getElementById("note-veil").hidden, style: colophonEl.getAttribute("style") }));
  report.check("빠르게 튕기면 이어서 떨어져 닫힘", !flung.paper && flung.hidden && flung.veil && !flung.style);
  await t.context().close();

  const q = await freshPage(browser, { viewport: { width: 320, height: 568 } });
  const fit = await q.evaluate(() => {
    openFavoritesView();
    const out = [];
    for (const L of ["ko", "en", "vi"]) {
      setLang(L);
      openColophon();
      colophonEl.style.transition = "none";
      const rect = colophonEl.getBoundingClientRect();
      if (colophonEl.scrollWidth > colophonEl.clientWidth + 1 || rect.top < 0 || rect.bottom > innerHeight + 1) out.push(L);
      closePaper(true);
    }
    return { out, wide: document.documentElement.scrollWidth - innerWidth };
  });
  report.check("320x568 — 판권면이 화면 안, 옆 넘침 없음", fit.out.length === 0 && fit.wide <= 0, fit.out.join(", "));
  await q.context().close();
  await p.context().close();
}

/* ── 실행 ─────────────────────────────────────────── */
(async () => {
  const { server, url } = await startServer();
  appUrl = url;
  const launchOpts = process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {};
  let browser;
  try {
    browser = await chromium.launch(launchOpts);
    for (const [name, suite] of [["화면", suiteRender], ["최근 20%", suiteRecent], ["주르륵", suiteRiffle], ["되돌아가기", suiteBack], ["즐겨찾기", suiteFavorites], ["더 자주 펼치기", suiteWeight], ["화면 안정", suiteStable], ["베트남어", suiteVietnamese], ["출처 쪽지", suiteNote], ["즐겨찾기 쪽지", suiteFavoriteNote], ["판권면", suiteColophon]]) {
      try {
        await suite(browser);
      } catch (err) {
        report.fail(`${name} 시험 도중 멈춤`, err.message.split("\n")[0]);
      }
    }
    report.check("페이지 에러 없음", pageErrors.length === 0, pageErrors.slice(0, 3).join(" | "));
  } finally {
    if (browser) await browser.close();
    server.close();
  }
  process.exitCode = report.print() > 0 ? 1 : 0;
})();
