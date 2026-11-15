#!/usr/bin/env node
/* 후원 QR 그림 만들기 — support.js 의 값으로 support/*.svg 를 만든다.
 *
 *   node tools/make-support-qr.js            만들기
 *   (npm run check 가 그림이 값과 맞는지 본다 — tools/check-data.js)
 *
 * 송금 앱이 내주는 QR 그림은 가운데에 프로필 사진이 들어가거나 이름이 적혀 있어
 * 그대로 쓰지 않는다. 같은 값을 앱의 색으로 다시 그린다. 처음 한 번:
 *   npm install   (qrcode 가 devDependencies 에 있다) */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { ROOT } = require("./lib");

const SVG_OPTS = { type: "svg", margin: 2, errorCorrectionLevel: "M", color: { dark: "#33302b", light: "#ffffff" } };

function loadSupport() {
  const mod = { exports: null };
  new Function("module", `${fs.readFileSync(path.join(ROOT, "support.js"), "utf8")}\n;module.exports = SUPPORT;`)(mod);
  return mod.exports;
}

// 그 언어의 QR 에 담을 값 — 카카오페이는 링크, VietQR 은 은행 앱이 읽는 문자열.
const qrValue = (entry) => entry.payload || entry.url;
// 그림 머리에 적는 지문 — npm run check 가 그림이 지금 값으로 만들어졌는지 본다.
const fingerprint = (entry) => crypto.createHash("sha1").update(qrValue(entry)).digest("hex").slice(0, 12);
// 휴대폰에 저장해 은행 앱에서 사진으로 읽게 하는 PNG(사진첩은 SVG 를 저장하지 못한다).
const pngPath = (entry) => entry.qr.replace(/\.svg$/, ".png");

module.exports = { loadSupport, qrValue, fingerprint, pngPath, SVG_OPTS };

if (require.main === module) {
  let QRCode;
  try {
    QRCode = require("qrcode");
  } catch {
    console.error("\nqrcode 가 없습니다. 처음 한 번: npm install\n");
    process.exit(1);
  }
  (async () => {
    const support = loadSupport();
    for (const [lang, entry] of Object.entries(support)) {
      if (!entry.qr) continue; // 다른 언어의 길을 빌려 쓰는 언어(영어)
      const svg = await QRCode.toString(qrValue(entry), SVG_OPTS);
      const out = path.join(ROOT, entry.qr);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, `<!-- ${lang} · ${entry.via} · ${fingerprint(entry)} — tools/make-support-qr.js 가 support.js 로 만든다 -->\n${svg}`);
      await QRCode.toFile(path.join(ROOT, pngPath(entry)), qrValue(entry), { ...SVG_OPTS, type: "png", width: 720 });
      console.log(`${lang} → ${entry.qr} · ${pngPath(entry)}`);
    }
  })();
}
