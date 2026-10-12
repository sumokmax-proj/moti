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
  30: { text: "Ngay khi bạn tin vào chính mình, bạn sẽ biết cách sống.", author: "Johann Wolfgang von Goethe", via: "original", reviewed: false },
  37: { text: "Trong lĩnh vực quan sát, sự tình cờ chỉ ưu ái những trí óc đã được chuẩn bị.", author: "Louis Pasteur", via: "original", reviewed: false },
  41: { text: "Quyết chết thì sống, quyết sống thì chết.", author: "Lý Thuấn Thần", via: "original", reviewed: false },
  42: { text: "Một ngày không đọc sách, trong miệng mọc gai góc.", author: "An Jung-geun", via: "original", reviewed: false },
  43: { text: "Có thể đoạt tướng của ba quân, nhưng không thể đoạt chí của một người thường.", author: "Khổng Tử", via: "original", reviewed: false },
  44: { text: "Khi trời sắp giao trọng trách cho người nào, ắt trước hết làm khổ tâm chí người ấy, làm nhọc gân cốt người ấy.", author: "Mạnh Tử", via: "original", reviewed: false },
  45: { text: "Thật ra trên mặt đất vốn không có đường; người đi nhiều thì cũng thành đường.", author: "Lỗ Tấn", via: "original", reviewed: false },
  46: { text: "Không phải vì việc khó mà ta không dám, mà vì ta không dám nên việc mới khó.", author: "Seneca", via: "original", reviewed: false },
  47: { text: "Nếu một người tự tin tiến bước theo hướng ước mơ của mình và nỗ lực sống cuộc đời mình đã hình dung, người ấy sẽ gặp một thành công mà lúc thường không ngờ tới.", author: "Henry David Thoreau", via: "original", reviewed: false },
  48: { text: "Dù thế giới đầy khổ đau, thế giới cũng đầy những lần vượt qua khổ đau.", author: "Helen Keller", via: "original", reviewed: false },
  50: { text: "Tôi cho rằng thành công của mình là nhờ điều này: tôi chưa bao giờ đưa ra hay chấp nhận một lời bào chữa.", author: "Florence Nightingale", via: "original", reviewed: false },
  51: { text: "Nếu có điều gì trong chính bạn nói “bạn không phải là họa sĩ” — thì CHÍNH LÚC ẤY HÃY VẼ, anh bạn ạ, và tiếng nói ấy cũng sẽ lặng đi, nhưng chỉ bằng cách đó.", author: "Vincent van Gogh", via: "original", reviewed: false },
  52: { text: "Tôi sẽ nắm lấy cổ họng số phận; nó nhất định không thể bắt tôi gục ngã hoàn toàn.", author: "Ludwig van Beethoven", via: "original", reviewed: false },
  53: { text: "Không có đấu tranh thì không có tiến bộ.", author: "Frederick Douglass", via: "original", reviewed: false },
  54: { text: "Đừng bao giờ khuất phục, đừng bao giờ khuất phục, không bao giờ, không bao giờ, không bao giờ, không bao giờ.", author: "Winston Churchill", via: "original", reviewed: false },
  55: { text: "Thiên tài là một phần trăm cảm hứng, chín mươi chín phần trăm mồ hôi.", author: "Thomas Edison", via: "original", reviewed: false },
  56: { text: "Khắc rồi bỏ dở thì gỗ mục cũng chẳng gãy; khắc mãi không thôi thì kim loại, đá cũng chạm khắc được.", author: "Tuân Tử", via: "original", reviewed: false },
  57: { text: "Tôi không phải là con chim; và không tấm lưới nào giăng bẫy được tôi; tôi là một con người tự do với ý chí độc lập.", author: "Charlotte Brontë", via: "original", reviewed: false },
  58: { text: "Hy vọng là thứ có lông vũ, đậu trong tâm hồn, và hát giai điệu không lời.", author: "Emily Dickinson", via: "original", reviewed: false },
  59: { text: "Điều duy nhất tôi muốn có đến vô hạn là sức mạnh của một nền văn hóa cao. Vì sức mạnh văn hóa làm chính chúng ta hạnh phúc, và hơn nữa, đem hạnh phúc đến cho người khác.", author: "Kim Gu", via: "original", reviewed: false },
  60: { text: "Chớ nói nhiều. Chớ nổi cơn thịnh nộ.", author: "Jeong Yak-yong", via: "original", reviewed: false },
  61: { text: "Tôi không mong phụ nữ có quyền lực đối với đàn ông, mà là đối với chính mình.", author: "Mary Wollstonecraft", via: "original", reviewed: false },
  63: { text: "Con đê nghìn trượng cũng vỡ vì một hang kiến.", author: "Hàn Phi", via: "original", reviewed: false },
  64: { text: "Đường dằng dặc xa xôi, ta sẽ ngược xuôi mà tìm kiếm.", author: "Khuất Nguyên", via: "original", reviewed: false },
  65: { text: "Hãy hy vọng và đừng ngơi tay.", author: "Louisa May Alcott", via: "original", reviewed: false },
  66: { text: "Bạn thường nghĩ đến những điều thế nào, tâm trí bạn cũng sẽ thành như thế; vì tâm hồn được nhuộm màu bởi những ý nghĩ.", author: "Marcus Aurelius", via: "original", reviewed: false },
  67: { text: "Điều làm con người bối rối không phải là sự việc, mà là những quan niệm về sự việc.", author: "Epictetus", via: "original", reviewed: false },
  68: { text: "Ai có được ‘tại sao’ của đời mình thì có thể chịu đựng gần như mọi ‘như thế nào’.", author: "Friedrich Nietzsche", via: "original", reviewed: false },
  69: { text: "Hãy tin chính mình: mọi trái tim đều rung theo sợi dây sắt ấy.", author: "Ralph Waldo Emerson", via: "original", reviewed: false },
  70: { text: "Tôi đã học được rằng thành công không đo bằng địa vị một người đạt được trong đời cho bằng những trở ngại người ấy đã vượt qua khi cố gắng để thành công.", author: "Booker T. Washington", via: "original", reviewed: false },
  71: { text: "Người ta ai cũng có một lần chết; có cái chết nặng hơn núi Thái Sơn, có cái chết nhẹ hơn lông hồng.", author: "Tư Mã Thiên", via: "original", reviewed: false },
  72: { text: "Tôi là chủ nhân số phận mình: tôi là thuyền trưởng linh hồn mình.", author: "William Ernest Henley", via: "original", reviewed: false },
  73: { text: "Tâm trí là nơi chốn của riêng nó, và tự trong nó có thể biến Địa ngục thành Thiên đường, Thiên đường thành Địa ngục.", author: "John Milton", via: "original", reviewed: false },
  74: { text: "Những ngờ vực của ta là kẻ phản bội, khiến ta đánh mất điều tốt đẹp lẽ ra thường có thể giành được, chỉ vì sợ thử sức.", author: "William Shakespeare", via: "original", reviewed: false },
  75: { text: "Tất cả chúng ta đều ở dưới cống rãnh, nhưng vài người trong chúng ta đang ngắm nhìn các vì sao.", author: "Oscar Wilde", via: "original", reviewed: false },
  76: { text: "Tự do duy nhất xứng với cái tên ấy là tự do theo đuổi điều tốt cho chính mình theo cách của chính mình.", author: "John Stuart Mill", via: "original", reviewed: false },
  77: { text: "Những việc lớn được hoàn thành không phải nhờ sức mạnh, mà nhờ sự bền bỉ.", author: "Samuel Johnson", via: "original", reviewed: false },
  78: { text: "À, nhưng tầm với của con người phải vượt quá điều tay nắm được, nếu không thì thiên đường để làm gì?", author: "Robert Browning", via: "original", reviewed: false },
  79: { text: "Rồi sẽ có ngày lên tận đỉnh cao nhất, đưa mắt nhìn một lượt thấy muôn núi đều nhỏ.", author: "Đỗ Phủ", via: "original", reviewed: false },
  80: { text: "Ba người cùng đi, trong đó ắt có thầy của ta.", author: "Khổng Tử", via: "original", reviewed: false },
  81: { text: "Nếu miệt mài bận rộn từng giờ của ngày làm việc, người ta có thể yên tâm phó mặc kết quả cuối cùng cho chính nó.", author: "William James", via: "original", reviewed: false },
  82: { text: "Cuộc chiến càng gian nan, chiến thắng càng vẻ vang.", author: "Thomas Paine", via: "original", reviewed: false },
  83: { text: "Chúng ta học được sự khôn ngoan từ thất bại nhiều hơn hẳn so với từ thành công.", author: "Samuel Smiles", via: "original", reviewed: false },
  84: { text: "Lên đường với hy vọng là điều tốt đẹp hơn đến nơi, và thành công thật sự chính là nỗ lực.", author: "Robert Louis Stevenson", via: "original", reviewed: false },
  85: { text: "Phấn đấu, tìm kiếm, tìm thấy, và không khuất phục.", author: "Alfred Tennyson", via: "original", reviewed: false },
  86: { text: "Vậy thì, hãy đứng dậy và hành động, với một trái tim sẵn sàng cho mọi số phận.", author: "Henry Wadsworth Longfellow", via: "original", reviewed: false },
  87: { text: "Có lẽ một ngày nào đó, nhớ lại cả những điều này cũng sẽ là niềm vui.", author: "Vergilius", via: "original", reviewed: false },
  88: { text: "Hãy chịu đựng và kiên gan! Nỗi đau này một ngày kia sẽ có ích cho bạn.", author: "Ovidius", via: "original", reviewed: false },
  89: { text: "Những điều làm ta sợ hãi nhiều hơn những điều đè nặng lên ta; và ta thường khổ sở vì tưởng tượng hơn là vì thực tế.", author: "Seneca", via: "original", reviewed: false },
  90: { text: "Có lỗi mà không sửa, đó mới gọi là lỗi.", author: "Khổng Tử", via: "original", reviewed: false },
  91: { text: "Người khác làm một lần được, ta làm trăm lần; người khác làm mười lần được, ta làm nghìn lần.", author: "Khổng Cấp", via: "original", reviewed: false },
  92: { text: "Thất bại chỉ là cơ hội để bắt đầu lại một cách thông minh hơn.", author: "Henry Ford", via: "original", reviewed: false },
  93: { text: "Chướng ngại trên con đường lại giúp ta tiến bước trên chính con đường ấy.", author: "Marcus Aurelius", via: "original", reviewed: false },
  94: { text: "Tôi không sợ bão tố, vì tôi đang học cách lái con thuyền của mình.", author: "Louisa May Alcott", via: "original", reviewed: false },
  105: { text: "Nếu thật sự một ngày đổi mới được, thì hãy ngày ngày đổi mới, lại ngày ngày đổi mới.", author: "Thành Thang", via: "original", reviewed: false },
  129: { text: "Con đường hôm qua tôi đã đi, hôm nay tôi lại sẽ đi: con đường của tôi, con đường mới.", author: "Yun Dong-ju", via: "original", reviewed: false },
};
