// 베트남어 — 베타 (QUOTE_STANDARDS.md 「베타 언어: 베트남어」)
//
// AI 번역이고 원어민 검수 전이다. 정식 데이터(quotes.js)와 섞지 않으려고 파일을
// 나눴다. 명언의 선정·출처·한/영 번역은 quotes.js 가 기준이고, 여기는 id 로
// 그 명언에 베트남어를 붙일 뿐이다. 수집기와 등재 기준은 이 파일을 모른다.
//
// 항목 { text, author, via, reviewed }
//   text      베트남어 명언
//   author    베트남어 위키백과의 그 인물 문서 제목. 문서가 없으면 중국 인물은
//             한월(Hán-Việt) 독음, 그 밖에는 author.en 그대로.
//   via       무엇을 보고 옮겼나 — "original"(원문에서) | "en"(영어를 거쳐서)
//             원문에서 옮기고, 한/영 번역과 정본 영역은 대조용으로만 본다.
//             원문을 확신 있게 읽을 수 없을 때만 "en" 으로 적는다.
//   reviewed  원어민 검수를 마쳤나. 검수자가 생기면 한 편씩 true 로 바꾼다.
//
// 길이 상한 190자 — 375x667 에서 기본 크기로 들어가는 길이가 영어보다 5% 짧았다
// (영어 180자, 베트남어 170자). 영어 상한 200자에 같은 비율을 적용했다.
// 표기는 유니코드 NFC(미리 조합된 글자)로 적는다. npm run check 가 둘 다 잰다.

const QUOTES_VI = {
  3: { text: "Đừng bao giờ để sang ngày mai việc bạn có thể làm hôm nay.", author: "Benjamin Franklin", via: "original", reviewed: false },
  4: { text: "Hành trình nghìn dặm bắt đầu từ một bước dưới chân.", author: "Lão Tử", via: "original", reviewed: false },
  6: { text: "Cách duy nhất để làm nên những việc vĩ đại là yêu điều mình làm.", author: "Steve Jobs", via: "original", reviewed: false },
  21: { text: "Đừng cố trở thành người thành công, mà hãy cố trở thành người có giá trị.", author: "Albert Einstein", via: "original", reviewed: false },
  41: { text: "Quyết chết thì sống, quyết sống thì chết.", author: "Lý Thuấn Thần", via: "original", reviewed: false },
  43: { text: "Có thể đoạt tướng của ba quân, nhưng không thể đoạt chí của một người thường.", author: "Khổng Tử", via: "original", reviewed: false },
  44: { text: "Khi trời sắp giao trọng trách cho người nào, ắt trước hết làm khổ tâm chí người ấy, làm nhọc gân cốt người ấy.", author: "Mạnh Tử", via: "original", reviewed: false },
  46: { text: "Không phải vì việc khó mà ta không dám, mà vì ta không dám nên việc mới khó.", author: "Seneca", via: "original", reviewed: false },
  48: { text: "Dù thế giới đầy khổ đau, thế giới cũng đầy những lần vượt qua khổ đau.", author: "Helen Keller", via: "original", reviewed: false },
  52: { text: "Tôi sẽ nắm lấy cổ họng số phận; nó nhất định không thể bắt tôi gục ngã hoàn toàn.", author: "Ludwig van Beethoven", via: "original", reviewed: false },
  53: { text: "Không có đấu tranh thì không có tiến bộ.", author: "Frederick Douglass", via: "original", reviewed: false },
  54: { text: "Đừng bao giờ khuất phục, đừng bao giờ khuất phục, không bao giờ, không bao giờ, không bao giờ, không bao giờ.", author: "Winston Churchill", via: "original", reviewed: false },
  55: { text: "Thiên tài là một phần trăm cảm hứng, chín mươi chín phần trăm mồ hôi.", author: "Thomas Edison", via: "original", reviewed: false },
  59: { text: "Điều duy nhất tôi muốn có đến vô hạn là sức mạnh của một nền văn hóa cao. Vì sức mạnh văn hóa làm chính chúng ta hạnh phúc, và hơn nữa, đem hạnh phúc đến cho người khác.", author: "Kim Gu", via: "original", reviewed: false },
  66: { text: "Bạn thường nghĩ đến những điều thế nào, tâm trí bạn cũng sẽ thành như thế; vì tâm hồn được nhuộm màu bởi những ý nghĩ.", author: "Marcus Aurelius", via: "original", reviewed: false },
  67: { text: "Điều làm con người bối rối không phải là sự việc, mà là những quan niệm về sự việc.", author: "Epictetus", via: "original", reviewed: false },
  71: { text: "Người ta ai cũng có một lần chết; có cái chết nặng hơn núi Thái Sơn, có cái chết nhẹ hơn lông hồng.", author: "Tư Mã Thiên", via: "original", reviewed: false },
  80: { text: "Ba người cùng đi, trong đó ắt có thầy của ta.", author: "Khổng Tử", via: "original", reviewed: false },
  105: { text: "Nếu thật sự một ngày đổi mới được, thì hãy ngày ngày đổi mới, lại ngày ngày đổi mới.", author: "Thành Thang", via: "original", reviewed: false },
  129: { text: "Con đường hôm qua tôi đã đi, hôm nay tôi lại sẽ đi: con đường của tôi, con đường mới.", author: "Yun Dong-ju", via: "original", reviewed: false },
};
