/* 명언 카드 — 링크 미리보기 그림(1200×630)과 인스타그램 카드(1080×1350)의 모양 (LAUNCH_CHECKLIST.md B8)
 *
 * 그림에 무엇을 그리는지(cardSpec)와 어떻게 그리는지(cardHtml)를 한 곳에 둔다.
 * 그림 파일 이름에는 그 내용의 지문(key)이 들어간다 — 명언·저자·출처나 모양이 바뀌면
 * 이름이 바뀌어
 *   - 배포 때 바뀐 카드만 다시 그리고(tools/render-cards.js, 나머지는 캐시)
 *   - 카카오톡처럼 미리보기를 오래 기억하는 메신저도 새 그림을 가져간다.
 * 이 파일은 node 만으로 돈다(tools/build-pages.js 가 그림 주소를 정할 때도 쓴다). */

const crypto = require("crypto");

const FORMATS = {
  og: { width: 1200, height: 630, dir: "og" },               // 링크 미리보기
  instagram: { width: 1080, height: 1350, dir: "instagram" }, // 인스타그램 게시물(D6)
};

const plain = (s) => String(s || "").replace(/\*/g, "");
const pick = (field, L) => (field ? field[L] || field.en || field.ko || "" : "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* 카드의 모양. 색은 tokens.css 의 라이트 값, 글꼴은 앱과 같은 Hahmlet.
   명언은 들어갈 때까지 글자를 한 눈금씩 줄인다(fitCard). 이 문자열이 바뀌면 지문도 바뀌어
   모든 카드를 다시 그린다. */
const STYLE = `
html, body { margin: 0; }
body { background: #f1eae0; color: #33302b; font-family: "Hahmlet", serif; -webkit-font-smoothing: antialiased; }
.card { box-sizing: border-box; display: flex; flex-direction: column; overflow: hidden; }
.og { width: 1200px; height: 630px; padding: 76px 96px 64px; }
.instagram { width: 1080px; height: 1350px; padding: 140px 104px 112px; }
.rule { flex: none; width: 64px; height: 4px; background: #b4593a; }
/* 가운데 맞춤은 margin: auto 로 한다 — justify-content: center 는 넘친 글을 위아래로
   흘려 보내 재는 쪽에서 넘침이 안 보인다. */
.quote { flex: 1; min-height: 0; display: flex; padding: 28px 0 0; }
.inner { margin: auto 0; }
.text { margin: 0; font-weight: 400; line-height: 1.5; word-break: keep-all; overflow-wrap: break-word; text-wrap: pretty; letter-spacing: -0.005em; }
.who { margin: 28px 0 0; font-size: 26px; font-weight: 600; letter-spacing: 0.04em; color: #6f604f; }
.src { margin: 8px 0 0; font-size: 20px; line-height: 1.5; color: #6f604f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.instagram .who { margin-top: 44px; font-size: 32px; }
.instagram .src { font-size: 24px; white-space: normal; }
.foot { flex: none; display: flex; justify-content: space-between; align-items: baseline; padding-top: 28px; }
.name { font-size: 18px; font-weight: 600; letter-spacing: 0.32em; }
.domain { font-size: 20px; letter-spacing: 0.06em; color: #9c4529; }
.instagram .name { font-size: 22px; }
.instagram .domain { font-size: 24px; }
`;
const FONT_URL = "https://fonts.googleapis.com/css2?family=Hahmlet:wght@300;400;600&display=swap";
// 글자 크기의 시작과 바닥(px). 바닥까지 줄여도 넘치면 render-cards 가 알린다.
const SIZES = { og: { start: 56, min: 26 }, instagram: { start: 72, min: 34 } };
const LAYOUT = crypto.createHash("sha1").update(STYLE + FONT_URL + JSON.stringify(SIZES) + "v1").digest("hex");

function cardSpec(q, L, format = "og") {
  const text = q.text && q.text[L];
  if (!text) return null;
  const author = pick(q.author, L);
  const source = plain(pick(q.source, L));
  const key = crypto.createHash("sha1").update(JSON.stringify([format, L, text, author, source, LAYOUT])).digest("hex").slice(0, 10);
  const f = FORMATS[format];
  return { id: q.id, lang: L, format, text, author, source, key, width: f.width, height: f.height, file: `${f.dir}/${L}/${q.id}-${key}.png` };
}

// 그 카드 한 장의 HTML 몸통(render-cards 가 한 페이지 안에서 갈아 끼운다).
function cardBody(spec) {
  return `<div class="card ${spec.format}" lang="${spec.lang}">
  <div class="rule"></div>
  <div class="quote"><div class="inner"><p class="text">${esc(spec.text)}</p><p class="who">— ${esc(spec.author)}</p>${spec.source ? `<p class="src">${esc(spec.source)}</p>` : ""}</div></div>
  <div class="foot"><span class="name">MOTIMOTI</span><span class="domain">motimoti.page</span></div>
</div>`;
}

function pageShell() {
  return `<!doctype html><html><head><meta charset="UTF-8" /><link rel="stylesheet" href="${FONT_URL}" /><style>${STYLE}</style></head><body><div id="slot"></div></body></html>`;
}

module.exports = { FORMATS, SIZES, cardSpec, cardBody, pageShell };
