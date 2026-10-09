/* 검증 도구들이 함께 쓰는 것.
 *
 * 기준값(길이 상한, 태그 목록, 저자당 상한)은 여기 따로 적지 않고
 * collector/server.js 에서 읽는다. 수집기 검증기와 이 도구가 서로 다른
 * 숫자를 들고 있으면, 한쪽만 고쳤을 때 아무도 모르게 어긋난다. */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
// MOTI_QUOTES_FILE 로 다른 파일을 가리킬 수 있다 — 도구 자체를 시험할 때 쓴다.
const QUOTES_FILE = process.env.MOTI_QUOTES_FILE || path.join(ROOT, "quotes.js");
const SERVER_FILE = path.join(ROOT, "collector", "server.js");
const DATA_FILE = path.join(ROOT, "collector", "data", "pending-quotes.json");

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

function readServerRules() {
  const src = fs.readFileSync(SERVER_FILE, "utf8");
  const num = (name) => {
    const m = src.match(new RegExp(`const ${name} = (\\d+);`));
    if (!m) throw new Error(`collector/server.js 에서 ${name} 를 찾지 못했습니다`);
    return Number(m[1]);
  };
  const tagBlock = src.match(/const TAG_KEYS = new Set\(\[([\s\S]*?)\]\);/);
  if (!tagBlock) throw new Error("collector/server.js 에서 TAG_KEYS 를 찾지 못했습니다");
  const tags = new Set([...tagBlock[1].matchAll(/"([a-z_]+)"/g)].map((m) => m[1]));
  return {
    maxKo: num("MAX_KO"),
    maxEn: num("MAX_EN"),
    maxPerAuthor: num("MAX_PER_AUTHOR"),
    tags,
  };
}

function readCollectorData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
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

module.exports = { ROOT, QUOTES_FILE, loadQuotes, readServerRules, readCollectorData, createReport };
