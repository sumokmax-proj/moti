/* 검증 도구들이 함께 쓰는 것. 기준값(길이 상한, 태그, 저자당 상한, 출처 종류)은
 * tools/rules.js 에 있다. */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
// MOTI_QUOTES_FILE 로 다른 파일을 가리킬 수 있다 — 도구 자체를 시험할 때 쓴다.
const QUOTES_FILE = process.env.MOTI_QUOTES_FILE || path.join(ROOT, "quotes.js");
const VI_FILE = process.env.MOTI_VI_FILE || path.join(ROOT, "quotes-vi.js");

/* quotes.js 는 브라우저용 `const QUOTES = [...]` 다. 모듈이 아니므로
   브라우저와 같은 방식으로 한 번 실행해서 배열을 꺼낸다. */
function loadQuotes(file = QUOTES_FILE) {
  const source = fs.readFileSync(file, "utf8");
  const mod = { exports: null };
  try {
    new Function("module", `${source}\n;module.exports = QUOTES;`)(mod);
  } catch (err) {
    // 쉼표 하나 빠진 것도 앱 전체를 멈추게 한다. 스택 대신 읽을 수 있는 말로.
    console.error(`\n✗ ${path.relative(ROOT, file)} 를 읽지 못했습니다 — 문법 오류: ${err.message}`);
    console.error("  앱도 이 파일을 똑같이 읽으므로, 이대로 배포하면 명언이 하나도 나오지 않습니다.\n");
    process.exit(1);
  }
  return { quotes: mod.exports, source };
}

/* quotes-vi.js(베트남어 베타)도 같은 방식으로 읽는다. */
function loadVietnamese(file = VI_FILE) {
  const source = fs.readFileSync(file, "utf8");
  const mod = { exports: null };
  try {
    new Function("module", `${source}\n;module.exports = QUOTES_VI;`)(mod);
  } catch (err) {
    console.error(`\n✗ ${path.relative(ROOT, file)} 를 읽지 못했습니다 — 문법 오류: ${err.message}\n`);
    process.exit(1);
  }
  const max = Number((source.match(/길이 상한 (\d+)자/) || [])[1]);
  return { vi: mod.exports, source, maxVi: max };
}

/* 기계 규칙은 tools/rules.js 하나에 있다. */
function readRules() {
  const r = require("./rules");
  return { maxKo: r.MAX_KO, maxEn: r.MAX_EN, authorCap: r.authorCap, tags: r.TAG_KEYS, kinds: r.SOURCE_KINDS };
}

/* 출력용: 통과/실패 줄을 모아 마지막에 한 번에 보여 준다. */
function createReport(title) {
  const rows = [];
  return {
    pass(name, detail = "") { rows.push({ ok: true, name, detail }); },
    fail(name, detail = "") { rows.push({ ok: false, name, detail }); },
    check(name, ok, detail = "") { rows.push({ ok: !!ok, name, detail }); },
    note(name, detail = "") { rows.push({ ok: null, name, detail }); },
    print() {
      console.log(`\n${title}`);
      console.log("─".repeat(Math.max(20, title.length)));
      for (const r of rows) {
        const mark = r.ok === null ? " · " : r.ok ? " ✓ " : " ✗ ";
        console.log(`${mark}${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
      }
      const failed = rows.filter((r) => r.ok === false).length;
      const passed = rows.filter((r) => r.ok === true).length;
      console.log(`\n${failed === 0 ? "통과" : "실패"}: ${passed}개 통과, ${failed}개 실패\n`);
      return failed;
    },
  };
}

module.exports = { ROOT, QUOTES_FILE, loadQuotes, loadVietnamese, readRules, createReport };
