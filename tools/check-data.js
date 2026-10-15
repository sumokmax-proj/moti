#!/usr/bin/env node
/* 명언 데이터 점검 — 네트워크 없이 몇 초 만에 끝난다.
 *
 *   npm run check
 *
 * 등재 규칙 중 기계로 잴 수 있는 것을 전부 잰다. 명언을 넣거나 고친 뒤,
 * 커밋하기 전에 돌린다. 하나라도 어긋나면 종료 코드 1.
 *
 * 재는 것
 * - id: 정수, 중복 없음, 삭제된 id 재사용 없음, 「// 다음 id」 가 최대 id 보다 큼
 * - 항목마다 필수 필드, 길이 상한(한/영), 연도 정수, URL 모양, translator 모양
 * - 태그가 수집기 검증기의 목록 안에 있음
 * - 저자당 상한
 * - 같은 text.ko 중복 없음
 * - quotes.js 머리 주석의 번역 경로 개수·목록이 실제 데이터와 맞음
 * - 수집기 기록(pending-quotes.json)의 승인 id 가 quotes.js 에 있음
 * - 베트남어 베타(quotes-vi.js): id 가 quotes.js 에 있음, 필드 모양, 길이 상한,
 *   NFC 표기. 몇 편이 번역됐고 검수됐는지는 참고로 보여 준다
 *
 * 기준값은 collector/server.js 에서 읽는다(tools/lib.js). */

const { loadQuotes, loadVietnamese, readServerRules, readCollectorData, createReport } = require("./lib");

const { quotes, source } = loadQuotes();
const rules = readServerRules();
const report = createReport(`명언 데이터 점검 — ${quotes.length}편`);
const isUrl = (v) => typeof v === "string" && /^https?:\/\/\S+$/.test(v);

/* ── id ───────────────────────────────────────────── */
const ids = quotes.map((q) => q.id);
report.check("id 가 모두 정수", ids.every(Number.isInteger));
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
report.check("id 중복 없음", dup.length === 0, dup.length ? `중복: ${dup.join(", ")}` : "");

const deletedBlock = source.match(/\/\/ 삭제된 id: ([\d,\s/]+?)\n\/\/ 다음 id/);
const deleted = deletedBlock ? deletedBlock[1].match(/\d+/g).map(Number) : [];
const reused = ids.filter((id) => deleted.includes(id));
report.check("삭제된 id 를 다시 쓰지 않음", deletedBlock && reused.length === 0,
  !deletedBlock ? "머리 주석에서 「삭제된 id」 를 찾지 못함" : reused.length ? `재사용: ${reused.join(", ")}` : `삭제된 id ${deleted.length}개`);

const next = Number((source.match(/^\/\/ 다음 id: (\d+)$/m) || [])[1]);
const maxId = Math.max(...ids);
report.check("「// 다음 id」 가 최대 id 보다 큼", next > maxId && !deleted.includes(next), `다음 id ${next}, 최대 id ${maxId}`);

/* ── 항목마다 ─────────────────────────────────────── */
const problems = [];
for (const q of quotes) {
  const p = (msg) => problems.push(`id ${q.id}: ${msg}`);
  const ko = q.text && q.text.ko, en = q.text && q.text.en;
  if (!ko) p("text.ko 없음"); else if (ko.length > rules.maxKo) p(`text.ko ${ko.length}자 > ${rules.maxKo}`);
  if (!en) p("text.en 없음"); else if (en.length > rules.maxEn) p(`text.en ${en.length}자 > ${rules.maxEn}`);
  if (!(q.author && q.author.ko && q.author.en)) p("author.ko/en 없음");
  if (!q.original) p("original 없음");
  if (!q.lang) p("lang 없음");
  if (!(q.source && typeof q.source === "object" && q.source.ko)) p("source 는 { ko, en } 이어야 함");
  if (q.kind !== undefined && !rules.kinds.has(q.kind)) p(`모르는 출처 종류 ${q.kind}`);
  if (!Number.isInteger(q.year)) p("year 가 정수가 아님");
  if (!isUrl(q.sourceUrl)) p("sourceUrl 이 http(s) 주소가 아님");
  if (q.translator !== undefined && !(q.translator && q.translator.en && isUrl(q.translator.enUrl))) {
    p("translator 는 { en, enUrl } 모양이어야 함");
  }
  if (!Array.isArray(q.tags) || q.tags.length === 0) p("tags 비어 있음");
  else q.tags.filter((t) => !rules.tags.has(t)).forEach((t) => p(`모르는 태그 ${t}`));
}
report.check(`필수 필드 · 길이 상한(한 ${rules.maxKo} / 영 ${rules.maxEn}) · 태그`, problems.length === 0,
  problems.length ? problems.join(" | ") : "");

const koDup = quotes.map((q) => q.text.ko).filter((t, i, a) => a.indexOf(t) !== i);
report.check("같은 text.ko 중복 없음", koDup.length === 0, koDup.join(" | "));

/* ── 저자당 상한 ──────────────────────────────────── */
const byAuthor = new Map();
quotes.forEach((q) => byAuthor.set(q.author.ko, (byAuthor.get(q.author.ko) || 0) + 1));
const cap = rules.authorCap(quotes.length);
const over = [...byAuthor].filter(([, n]) => n > cap);
const atCap = [...byAuthor].filter(([, n]) => n === cap).map(([a]) => a);
report.check(`저자당 상한 ${cap} (전체 ${quotes.length}편의 3%, 최소 3)`, over.length === 0,
  over.length ? `초과: ${over.map(([a, n]) => `${a} ${n}`).join(", ")}` : `저자 ${byAuthor.size}명, 상한에 닿은 저자: ${atCap.join(", ") || "없음"}`);

/* ── 머리 주석의 번역 경로 기록 ────────────────────── */
const en = quotes.filter((q) => q.lang === "en");
const tr = quotes.filter((q) => q.lang !== "en" && q.translator);
const self = quotes.filter((q) => q.lang !== "en" && !q.translator);
const headerCount = (label) => Number((source.match(new RegExp(`${label} \\((\\d+)개\\)`)) || [])[1]);
report.check("머리 주석 1) original 그대로 개수", headerCount("original 그대로") === en.length,
  `주석 ${headerCount("original 그대로")} · 실제 ${en.length}`);
report.check("머리 주석 2) 공개된 정본 영역 개수", headerCount("공개된 정본 영역") === tr.length,
  `주석 ${headerCount("공개된 정본 영역")} · 실제 ${tr.length}`);
report.check("머리 주석 3) 자체 번역 개수", headerCount("자체 번역") === self.length,
  `주석 ${headerCount("자체 번역")} · 실제 ${self.length}`);

const section = (from, to) => {
  const a = source.indexOf(from), b = source.indexOf(to, a);
  return a < 0 || b < 0 ? "" : source.slice(a, b);
};
const trListed = new Set([...section("2) 공개된 정본 영역", "3) 자체 번역").matchAll(/id (\d+)\s/g)].map((m) => Number(m[1])));
const trMissing = tr.map((q) => q.id).filter((id) => !trListed.has(id));
report.check("머리 주석 2) 목록에 정본 영역 항목이 모두 있음", trMissing.length === 0,
  trMissing.length ? `빠짐: ${trMissing.join(", ")}` : "");
const selfListed = new Set((section("3) 자체 번역", "정본을 찾으면").match(/\d+/g) || []).map(Number));
const selfMissing = self.map((q) => q.id).filter((id) => !selfListed.has(id));
report.check("머리 주석 3) 목록에 자체 번역 항목이 모두 있음", selfMissing.length === 0,
  selfMissing.length ? `빠짐: ${selfMissing.join(", ")}` : "");

/* ── 수집기 기록 ──────────────────────────────────── */
const data = readCollectorData();
const known = new Set(ids);
const orphan = (data.approved || []).filter((q) => !known.has(q.id)).map((q) => q.id);
report.check("수집기 승인 기록의 id 가 모두 quotes.js 에 있음", orphan.length === 0,
  orphan.length ? `없음: ${orphan.join(", ")}` : `승인 기록 ${(data.approved || []).length}건`);
report.note("검증 대기", `${(data.pending || []).length}건`);

/* ── 베트남어 (베타) ──────────────────────────────── */
const { vi, maxVi } = loadVietnamese();
const viIds = Object.keys(vi).map(Number);
const viOrphan = viIds.filter((id) => !known.has(id));
report.check("베트남어: id 가 모두 quotes.js 에 있음", viOrphan.length === 0, viOrphan.length ? `없음: ${viOrphan.join(", ")}` : "");
const viProblems = [];
for (const id of viIds) {
  const v = vi[id];
  const p = (msg) => viProblems.push(`id ${id}: ${msg}`);
  if (!v.text) p("text 없음");
  else {
    if (v.text.length > maxVi) p(`text ${v.text.length}자 > ${maxVi}`);
    if (v.text !== v.text.normalize("NFC")) p("text 가 NFC 가 아님");
  }
  if (!v.author) p("author 없음");
  else if (v.author !== v.author.normalize("NFC")) p("author 가 NFC 가 아님");
  if (!["original", "en"].includes(v.via)) p(`via 는 original | en — ${v.via}`);
  if (typeof v.reviewed !== "boolean") p("reviewed 는 true | false");
}
report.check(`베트남어: 필드 · 길이 상한 ${maxVi} · NFC`, Number.isInteger(maxVi) && viProblems.length === 0,
  !Number.isInteger(maxVi) ? "quotes-vi.js 머리 주석에서 「길이 상한 N자」 를 찾지 못함" : viProblems.join(" | "));
// 같은 저자는 언제나 같은 베트남어 이름이어야 한다.
const viNames = new Map();
for (const id of viIds) {
  const q = quotes.find((x) => x.id === id);
  if (!q) continue;
  const names = viNames.get(q.author.ko) || new Set();
  names.add(vi[id].author);
  viNames.set(q.author.ko, names);
}
const viNameClash = [...viNames].filter(([, s]) => s.size > 1).map(([a, s]) => `${a}: ${[...s].join(" / ")}`);
report.check("베트남어: 같은 저자는 같은 이름", viNameClash.length === 0, viNameClash.join(" | "));
const reviewed = viIds.filter((id) => vi[id].reviewed).length;
const viaEn = viIds.filter((id) => vi[id].via === "en");
report.note("베트남어 진행", `번역 ${viIds.length}/${quotes.length} · 검수 ${reviewed}${viaEn.length ? ` · 영어 경유 ${viaEn.join(", ")}` : ""}`);

/* ── 참고: 태그별 편수 — 명언을 모을 때 모자란 상황을 보는 용도 ── */
const tagCount = {};
quotes.forEach((q) => q.tags.forEach((t) => (tagCount[t] = (tagCount[t] || 0) + 1)));
report.note("태그별 편수 (편집용)", [...rules.tags].map((t) => `${t} ${tagCount[t] || 0}`).join(" · "));

/* ── 참고: 영어 출처 진행 — 출처 시트(작가 이름을 누르면 열린다)에 쓴다.
   다 채우면 이 줄을 「항목마다」 검사로 옮겨 빠진 것을 실패로 친다. ── */
const noSourceEn = quotes.filter((q) => !(q.source && q.source.en)).map((q) => q.id);
const kindCount = {};
quotes.forEach((q) => q.kind && (kindCount[q.kind] = (kindCount[q.kind] || 0) + 1));
report.note("영어 출처 진행", `${quotes.length - noSourceEn.length}/${quotes.length}` +
  (Object.keys(kindCount).length ? ` · 종류 ${Object.entries(kindCount).map(([k, n]) => `${k} ${n}`).join(" · ")}` : ""));

process.exitCode = report.print() > 0 ? 1 : 0;
