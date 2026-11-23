#!/usr/bin/env node
/* 크롬 익스텐션(새 탭에 명언 한 줄) 묶기 — LAUNCH_CHECKLIST C2.
 *
 *   node tools/build-extension.js            dist/extension/ 와 dist/motimoti-newtab-<버전>.zip
 *   node tools/build-extension.js --out <폴더> --no-zip
 *
 * extension/ 의 원본(새 탭 화면·글꼴)에 앱의 명언 데이터(quotes.js · quotes-vi.js ·
 * quotes-context.js)와 tokens.css 를 복사해 넣고, favicon.svg 로 아이콘(16·32·48·128)을 그린다.
 * 데이터는 저장소에 두 벌 두지 않는다 — 명언을 고치면 다시 묶어 웹 스토어에 올린다
 * (그때 extension/manifest.json 의 version 을 올린다. 스토어는 같은 버전을 받지 않는다).
 * dist/ 는 커밋하지 않는다. */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { ROOT } = require("./lib");
const { renderIcons } = require("./make-icons");

const SRC = path.join(ROOT, "extension");
const FROM_APP = ["quotes.js", "quotes-vi.js", "quotes-context.js", "tokens.css"];
const ICON_SIZES = [16, 32, 48, 128];

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const name of fs.readdirSync(from)) {
    const a = path.join(from, name);
    const b = path.join(to, name);
    if (fs.statSync(a).isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

async function buildExtension({ out = path.join(ROOT, "dist", "extension"), zip = true } = {}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "manifest.json"), "utf8"));
  fs.rmSync(out, { recursive: true, force: true });
  copyDir(SRC, out);
  for (const f of FROM_APP) fs.copyFileSync(path.join(ROOT, f), path.join(out, f));
  await renderIcons(ICON_SIZES.map((size) => ({ file: path.join(out, "icons", `${size}.png`), size })));

  // manifest 가 가리키는 파일이 모두 있는지.
  const wanted = [manifest.chrome_url_overrides.newtab, ...Object.values(manifest.icons)];
  const missing = wanted.filter((f) => !fs.existsSync(path.join(out, f)));
  if (missing.length) throw new Error(`없는 파일: ${missing.join(", ")}`);

  let zipFile = null;
  if (zip) {
    zipFile = path.join(path.dirname(out), `motimoti-newtab-${manifest.version}.zip`);
    fs.rmSync(zipFile, { force: true });
    execFileSync("zip", ["-qr", "-X", zipFile, "."], { cwd: out });
  }
  return { out, zipFile, version: manifest.version };
}

module.exports = { buildExtension, FROM_APP };

if (require.main === module) {
  const args = process.argv.slice(2);
  const i = args.indexOf("--out");
  buildExtension({ out: i >= 0 ? path.resolve(args[i + 1]) : undefined, zip: !args.includes("--no-zip") })
    .then((r) => {
      console.log(`익스텐션 ${r.version} → ${path.relative(ROOT, r.out)}`);
      if (r.zipFile) console.log(`웹 스토어에 올릴 파일 → ${path.relative(ROOT, r.zipFile)}`);
    })
    .catch((err) => {
      console.error(`\n✗ 익스텐션을 묶지 못했습니다 — ${err.message}\n`);
      process.exit(1);
    });
}
