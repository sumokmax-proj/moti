#!/usr/bin/env node
/* 크롬 익스텐션 시험 — 실제 Chromium 에 익스텐션을 올려 새 탭 화면을 본다(LAUNCH_CHECKLIST C2).
 *
 *   npm run test:extension
 *
 * tools/build-extension.js 로 임시 폴더에 묶고, Chromium(새 헤드리스)에 --load-extension 으로 올린다. */

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { ROOT, createReport } = require("./lib");
const { buildExtension, FROM_APP } = require("./build-extension");

let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("\nplaywright 가 없습니다. 처음 한 번:\n  npm install && npx playwright install chromium\n");
  process.exit(1);
}

const report = createReport("크롬 익스텐션 시험");

// 압축을 풀어 올린 익스텐션의 id 는 폴더 경로의 sha256 앞 32자를 a~p 로 바꾼 것이다.
const unpackedId = (dir) =>
  [...crypto.createHash("sha256").update(dir).digest("hex").slice(0, 32)].map((c) => String.fromCharCode(97 + parseInt(c, 16))).join("");

(async () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "moti-ext-"));
  const dir = path.join(out, "extension");
  await buildExtension({ out: dir, zip: false });

  // ── 묶음 ──
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  report.check("manifest — MV3 · 새 탭 · 권한 없음 · 바깥 주소를 허락하지 않음",
    manifest.manifest_version === 3 && manifest.chrome_url_overrides.newtab === "newtab.html" &&
    (manifest.permissions || []).length === 0 && !manifest.host_permissions &&
    !/https?:/.test(manifest.content_security_policy.extension_pages));
  const sameData = FROM_APP.every((f) => fs.readFileSync(path.join(dir, f)).equals(fs.readFileSync(path.join(ROOT, f))));
  report.check("명언 데이터·tokens.css 가 앱의 것과 같음", sameData, FROM_APP.join(" · "));
  report.check("글꼴 Hahmlet 과 OFL 라이선스가 함께 들어 있음",
    fs.existsSync(path.join(dir, "fonts", "Hahmlet.ttf")) && fs.existsSync(path.join(dir, "fonts", "OFL.txt")));

  // ── 실제 Chromium 에서 ──
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "moti-ext-profile-"));
  const ctx = await chromium.launchPersistentContext(profile, {
    headless: true,
    channel: "chromium", // 새 헤드리스 — 익스텐션을 올릴 수 있다
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
    args: [`--disable-extensions-except=${dir}`, `--load-extension=${dir}`],
  });
  const outside = [];
  const errors = [];
  ctx.on("request", (r) => {
    if (!/^(chrome-extension|data|chrome):/.test(r.url())) outside.push(r.url());
  });
  const newtab = `chrome-extension://${unpackedId(dir)}/newtab.html`;
  const open = async () => {
    const p = await ctx.newPage();
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await p.goto(newtab);
    await p.waitForFunction(() => document.getElementById("quote").textContent.length > 0);
    return p;
  };

  try {
    const p = await open();
    const first = await p.evaluate(() => ({
      title: document.title,
      lang: document.documentElement.lang,
      quote: document.getElementById("quote").textContent,
      author: document.getElementById("author").textContent,
      noteHidden: document.getElementById("note").hidden,
      font: document.fonts.check("20px Hahmlet", "관"),
      home: document.getElementById("home").href,
      id: quote.id,
    }));
    report.check("새 탭 — 명언 한 줄과 작가 · 쪽지는 닫힌 채 · 탭 이름 「New Tab」",
      first.title === "New Tab" && first.lang === "en" && first.quote && first.author && first.noteHidden, `${first.id}`);
    await p.evaluate(() => document.fonts.ready);
    report.check("글꼴 — 익스텐션 안의 Hahmlet(한글까지)", await p.evaluate(() => document.fonts.check("20px Hahmlet", "관")));
    report.check("motimoti — 같은 명언을 motimoti.page 의 명언 주소로", first.home === `https://motimoti.page/en/${first.id}/`, first.home);

    await p.click("#author");
    const note = await p.evaluate(() => ({
      hidden: document.getElementById("note").hidden,
      expanded: document.getElementById("author").getAttribute("aria-expanded"),
      title: document.getElementById("note-title").textContent,
      link: document.getElementById("note-link").href,
      label: document.getElementById("note-link-label").textContent,
    }));
    report.check("작가 이름 → 출처 쪽지(출처 · 원전 링크)", !note.hidden && note.expanded === "true" && note.title && /^https:\/\//.test(note.link) && note.label.endsWith("→"), note.label);
    await p.keyboard.press("Escape");
    report.check("Esc 로 쪽지 닫기", await p.evaluate(() => document.getElementById("note").hidden));

    await p.click('button[data-lang="ko"]');
    const ko = await p.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, id: quote.id, text: document.getElementById("quote").textContent, home: document.getElementById("home").href }));
    report.check("KO — 같은 명언을 한국어로 · 탭 이름 「새 탭」", ko.lang === "ko" && ko.title === "새 탭" && ko.id === first.id && /[가-힣]/.test(ko.text) && ko.home.endsWith(`/ko/${first.id}/`));
    const p2 = await open();
    const again = await p2.evaluate(() => ({ lang: document.documentElement.lang, id: quote.id }));
    report.check("고른 언어는 다음 새 탭에도", again.lang === "ko");
    report.check("다음 새 탭은 다른 명언", again.id !== first.id);

    const picks = await p2.evaluate(() => {
      const ids = [];
      for (let i = 0; i < 40; i++) ids.push(pickQuote("ko").id);
      return ids;
    });
    report.check("최근 40개 안에서는 같은 명언이 다시 나오지 않음", new Set(picks).size === picks.length, `${new Set(picks).size}/${picks.length}`);

    await p2.click('button[data-lang="vi"]');
    const vi = await p2.evaluate(() => ({ lang: document.documentElement.lang, has: Boolean(quote.text.vi), text: document.getElementById("quote").textContent }));
    report.check("VN(베타) — 베트남어가 있는 명언만", vi.lang === "vi" && vi.has && vi.text.length > 0);

    await p2.emulateMedia({ colorScheme: "dark" });
    const dark = await p2.evaluate(() => getComputedStyle(document.body).backgroundColor);
    report.check("어두운 화면 — 앱의 먹색 바탕", dark === "rgb(28, 25, 23)", dark);

    report.check("밖으로 나간 요청 없음(글꼴·집계 포함)", outside.length === 0, outside.slice(0, 3).join(" | "));
    report.check("화면 오류 없음", errors.length === 0, errors.slice(0, 2).join(" | "));
  } finally {
    await ctx.close();
    fs.rmSync(out, { recursive: true, force: true });
    fs.rmSync(profile, { recursive: true, force: true });
  }
  process.exitCode = report.print() > 0 ? 1 : 0;
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
