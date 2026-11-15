// 책 한 권 값 보태기 — 후원 (LAUNCH_CHECKLIST.md A3)
//
// 판권면 맨 아래, 앱의 언어에 따라 그 나라 사람이 매일 쓰는 송금으로 보인다.
//   ko — 카카오페이 송금코드(링크). 휴대폰에서 누르면 카카오페이가 열린다.
//   vi — Techcombank VietQR. 베트남 은행 앱은 모두 읽는다. 계좌번호 복사도 함께.
//   en — 어느 나라에서 읽는지 몰라 두 길을 함께 보인다(show). 영어권 독자가 보이면 해외용(Ko-fi 등)을
//        더할지 정한다 — LAUNCH_CHECKLIST.md A3·D9.
//
// 받는 사람의 이름은 앱에 적지 않는다. 송금 앱이 확인용으로 보여 주는 이름(카카오페이는
// 가린 이름, 베트남 은행은 예금주 이름)은 송금 서비스의 몫이라 감출 수 없다.
// QR 그림(support/*.svg)은 여기의 값으로 tools/make-support-qr.js 가 만든다 — 값을 바꾸면
// 그 도구를 다시 돌린다(npm run check 가 그림이 값과 맞는지 본다).
// vi.payload 는 Techcombank 앱이 내준 VietQR 그대로다(은행 코드 970407 · 계좌 · 이체용, 이름 없음).

const SUPPORT = {
  en: { show: ["ko", "vi"] },
  ko: {
    via: "kakaopay",
    url: "https://qr.kakaopay.com/Ej7mmPMLm",
    qr: "support/kakaopay.svg",
  },
  vi: {
    via: "vietqr",
    bank: "Techcombank",
    account: "19040152054011",
    payload: "00020101021138580010A000000727012800069704070114190401520540110208QRIBFTTA53037045802VN8300840063048692",
    qr: "support/vietqr.svg",
  },
};
