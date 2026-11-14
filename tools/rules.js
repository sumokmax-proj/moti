/* 명언 데이터의 기계 규칙 — npm run check 가 이 값으로 막는다.
 *
 * 예전에는 수집기 서버(collector/server.js)에 있었고 점검 도구가 그 파일을
 * 읽어 왔다. 수집기를 보관만 하기로 하면서(2026-10-16) 여기로 옮겼다.
 * 수집기 서버에는 옮기던 때의 값이 그대로 남아 있지만, 이제 맞추지 않는다 —
 * 기준은 이 파일 하나다. 근거는 QUOTE_STANDARDS.md. */

/* 길이 상한 — 「화면이 감당하는 최대치」다. 엄선 기준이 아니다.
   375x667(지원하는 가장 작은 기기)에서 한 화면에 들어가는 값을 재서 정했다.
   한국어 110자 / 영어 210자가 넘치기 시작하는 선이고 거기서 한 칸 물러섰다.
   더 작은 320x568 에서는 앱이 본문을 한 눈금씩 줄여 맞춘다(app.js 의 fitQuoteText).
   「짧을수록 좋다」는 QUOTE_STANDARDS.md 의 편집 원칙이다. */
const MAX_KO = 100;
const MAX_EN = 200;

/* 저자당 상한 — 전체의 3%, 최소 3(author.ko 가 같으면 같은 저자).
   처음 100편에 3편이었던 비율을 이어 간다. 141편이면 4편. */
const AUTHOR_CAP_RATIO = 0.03;
const AUTHOR_CAP_MIN = 3;
const authorCap = (total) => Math.max(AUTHOR_CAP_MIN, Math.floor(total * AUTHOR_CAP_RATIO));

/* QUOTE_STANDARDS.md 4장의 표 12개. 태그는 편집용 기록이다 — 앱은 쓰지 않는다. */
const TAG_KEYS = new Set([
  "despair", "failure", "challenge", "fear", "energy", "hope", "meaning",
  "perseverance", "freedom", "passion", "success", "preparation",
]);

/* 출처의 종류 — 출처 쪽지가 종류 표시와 링크 문구를 고르는 데 쓴다.
   책·시·희곡·에세이 같은 저작은 kind 를 적지 않는다. 그 밖의 기록만. */
const SOURCE_KINDS = new Set([
  "speech", "letter", "diary", "interview", "calligraphy", "inscription", "testimony",
]);

/* 문맥 해설(quotes-context.js) 길이 상한 — 쪽지에서 대여섯 줄이 넘지 않게. */
const MAX_CONTEXT_KO = 230;
const MAX_CONTEXT_EN = 480;

/* 명언 주소(/ko/42/ 등)가 생기기 전에 지운 id — 2026-11-14 에 묶었다.
   이 명언들은 주소가 퍼진 적이 없어 남길 페이지도 없다. 이 목록은 늘리지 않는다:
   이제부터 지우는 명언은 quotes-retired.js 에 이유와 함께 적어, 퍼진 주소가
   계속 열리게 한다. npm run check 가 quotes.js 의 「삭제된 id」 가 둘 중 하나에
   있는지 본다. */
const IDS_DELETED_BEFORE_ADDRESSES = new Set([
  1, 2, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26,
  27, 28, 29, 31, 32, 33, 34, 35, 36, 38, 39, 40, 49, 62,
]);

module.exports = { IDS_DELETED_BEFORE_ADDRESSES, MAX_CONTEXT_KO, MAX_CONTEXT_EN, MAX_KO, MAX_EN, AUTHOR_CAP_RATIO, AUTHOR_CAP_MIN, authorCap, TAG_KEYS, SOURCE_KINDS };
