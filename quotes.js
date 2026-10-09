// 수록 기준: 1차 출처(책/연설/편지/당대 기록)로 확인된 명언만 등재한다.
// 모든 항목은 original, lang, source, year, sourceUrl을 반드시 포함한다.
// 출처를 제시할 수 없으면 등재하지 않는다. 애매하면 탈락시킨다.
//
// id 규칙: app.js의 즐겨찾기가 id로만 매칭하므로 id는 절대 재사용하지 않는다.
// 삭제된 id: 1,2,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,
//            27,28,29,31,32,33,34,35,36,38,39,40,49,62
// 다음 id: 137
//
// ── 이중 언어 ────────────────────────────────────────────────────────────
// text 와 author 는 { ko, en } 이다. 화면은 q.text[lang] 으로 읽는다.
//
// text.en 은 세 가지 경로로 만들어졌다.
//
//  1) original 그대로 (54개) — lang 이 "en" 인 항목. 이미 1차 출처와 문자
//     그대로 대조를 마친 문장이라 번역을 거치지 않는 것이 가장 정확하다.
//     예외는 id 54 처칠과 id 4 노자 — 각각 연설과 문장의 중간을 잘라온 것이라
//     소문자로 시작해서, 화면에 단독으로 놓이는 만큼 첫 글자만 대문자로 올렸다.
//     (82 페인, 84 스티븐슨, 101 앤 브론테, 104 메리 셸리, 정본 영역의
//      93 아우렐리우스도 같다. 134 엘리엇은 첫머리 접속사 「But」 를 떼고
//      대문자로 올렸다.)
//
//  2) 공개된 정본 영역 (23개) — translator 필드가 있는 항목. 번역자와 그
//     번역문을 직접 열어 대조한 URL을 함께 기록한다.
//       id 4  노자      James Legge
//       id 30 괴테      Bayard Taylor
//       id 37 파스퇴르   R. L. Devonshire (Vallery-Radot 『The Life of Pasteur』)
//       id 43 공자      James Legge
//       id 44 맹자      James Legge
//       id 46 세네카     Richard M. Gummere
//       id 51 반 고흐    반 고흐 미술관 / Huygens ING 공식 영역
//       id 52 베토벤     Henry Edward Krehbiel (Thayer 『Life of Beethoven』)
//       id 66 아우렐리우스 George Long
//       id 67 에픽테토스  Thomas Wentworth Higginson
//       id 68 니체      Anthony M. Ludovici
//       id 80 공자      James Legge
//       id 89 세네카     Richard M. Gummere
//       id 90 공자      James Legge
//       id 93 아우렐리우스 George Long
//       id 97 노자      James Legge
//       id 98 몽테뉴     Charles Cotton (W. C. Hazlitt 편)
//       id 105 탕왕      James Legge
//       id 111 세네카    Richard M. Gummere
//       id 112 세르반테스 John Ormsby
//       id 119 괴테      Bayard Taylor
//       id 127 단테      Henry Wadsworth Longfellow
//       id 133 아우렐리우스 George Long
//
//  3) 자체 번역 (23개) — translator 가 없는 항목. 공개된 정본 영역을 찾지
//     못해 original 에서 직접 옮겼다. id 41,42,45,56,59,60,63,64,71,79,
//     87,88,91,106,107,114,115,124,125,126,128,129,130. (59·114·115·129 는
//     한국어 원문이라 text.en 만 자체 번역이다.)
//     정본을 찾으면 여기서 2)로 승급시킨다.
//
// translator 가 없다는 것은 자체 번역이라는 뜻이다. 이 규칙을 바꾸지 말 것.
//
// 한국어 text 는 반드시 original 에서 번역한다. 원문의 주장(주어/서술어/한정
// 조건)을 바꾸는 의역은 금지한다. 영어도 같은 규율을 따른다.
//
// ── 2차 검증(재검증) 상태 ────────────────────────────────────────────────
// [A] sourceUrl을 직접 열어 original이 문자 그대로 있음을 대조 완료:
//     3, 4, 30, 37, 43, 44, 45, 46, 47, 48, 51, 53, 54, 56~61, 63~71, 82~136
//     (82~91 은 sourceUrl 을 받아 original 이 페이지에 있는지 기계로 대조했다.
//      90 의 Legge 영역은 구텐베르크 평문의 "--" 를 "—" 로, 91 은 위키문헌이
//      본문 사이에 끼운 이문 주석 「己 一作已」을 빼고 저본 己 로 대조했다.
//      107 호라티우스는 렌더링된 페이지가 행 번호 「40」을 끼워 넣어, 위키텍스트로
//      대조했다. 108 트웨인은 구텐베르크 평문의 "--" 를 text.en 에서 "—" 로 적었다.
//      112·113 은 작품 속 속담 인용이다 — QUOTE_STANDARDS.md v1.5.
//      115 윤동주는 1948 초판 표기(「우르러」「한점」)를 original 에 두고,
//      text.ko 는 표준 표기 「우러러」「한 점」으로 적었다.
//      130 이백은 91 처럼 이문 주석 「浪 一作波」를 빼고 대조했고, zh-hant 페이지가
//      보여주는 「掛」로 적었다(원 위키텍스트는 「挂」). 133 아우렐리우스는 위키문헌
//      전사가 「ἄνδραδιαλέγεσθαι」로 붙여 쓴 것을 띄어 적고 글자 단위로 대조했다.)
// [B] 원문 인쇄물(1차)이 온라인에 없어, 그 인쇄물을 정확히 인용한 페이지를
//     열어 문구를 대조한 항목: 21(LIFE 1955.5.2), 50(Cook 1913 1권 506쪽),
//     55(Harper's Monthly 1932, 165권 987호 406쪽)
// [C] 1차 출처가 실재하나 해당 사이트가 이 환경에서 열리지 않아,
//     열리는 대체 페이지로 문구만 대조한 항목: 6, 41, 42, 52
// [D] 재검증에서 삭제: 49 마리 퀴리 — 3차 출처뿐이었고 1차로 지목됐던
//     『피에르 퀴리』(1923) 전문에 해당 문장이 없음을 확인했다.
//     62 사마천 「시 삼백 편은 대개 성현이 발분하여 지은 것이다」 — 출처는
//     확실했으나(『사기』 태사공자서) 문장 혼자로는 뜻이 서지 않았다. 원문에서
//     이 구절은 여덟 개 예시의 마지막 항목이고, 결론은 그 다음 문장에 있다.
//     목록을 떼어내면 "『시경』의 저자가 누구인가" 라는 말로만 읽힌다.
//     같은 뜻을 혼자 설 수 있는 문장으로 옮겨 담은 것이 id 71 이다.

const QUOTES = [
  {
    id: 3,
    text: {
      ko: "오늘 할 수 있는 일을 내일로 미루지 마라.",
      en: "Never leave that till tomorrow, which you can do to-day.",
    },
    author: {
      ko: "벤저민 프랭클린",
      en: "Benjamin Franklin",
    },
    original: "Never leave that till tomorrow, which you can do to-day.",
    lang: "en",
    source: "『부자가 되는 길(The Way to Wealth)』 / 가난한 리처드의 달력",
    year: 1758,
    sourceUrl: "https://en.wikisource.org/wiki/Way_to_wealth_(1)",
    tags: ["challenge", "energy"],
  },
  {
    id: 4,
    text: {
      ko: "천 리 길도 발밑 한 걸음에서 시작된다.",
      en: "The journey of a thousand li commenced with a single step.",
    },
    author: {
      ko: "노자",
      en: "Laozi",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/216/pg216.txt",
    },
    original: "千里之行，始於足下",
    lang: "lzh",
    source: "『도덕경』 제64장 (왕필본)",
    year: -400,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%81%93%E5%BE%B7%E7%B6%93_(%E7%8E%8B%E5%BC%BC%E6%9C%AC)",
    tags: ["challenge", "energy"],
  },
  {
    id: 6,
    text: {
      ko: "위대한 일을 해내는 유일한 방법은 자신이 하는 일을 사랑하는 것이다.",
      en: "The only way to do great work is to love what you do.",
    },
    author: {
      ko: "스티브 잡스",
      en: "Steve Jobs",
    },
    original: "The only way to do great work is to love what you do.",
    lang: "en",
    source: "스탠퍼드대 졸업식 연설 (6월 12일)",
    year: 2005,
    sourceUrl: "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
    tags: ["energy", "passion"],
  },
  {
    id: 21,
    text: {
      ko: "성공한 사람이 되려 하지 말고, 가치 있는 사람이 되려고 하라.",
      en: "Try not to become a man of success but rather try to become a man of value.",
    },
    author: {
      ko: "알베르트 아인슈타인",
      en: "Albert Einstein",
    },
    original: "Try not to become a man of success but rather try to become a man of value.",
    lang: "en",
    source: "LIFE 「Death of a Genius」 (윌리엄 밀러 기록, 5월 2일자)",
    year: 1955,
    sourceUrl: "https://quoteinvestigator.com/2017/11/20/value/",
    tags: ["success", "meaning"],
  },
  {
    id: 30,
    text: {
      ko: "네가 너 자신을 믿는 순간, 너는 사는 법을 알게 된다.",
      en: "Be thou but self-possessed, thou hast the art of living!",
    },
    author: {
      ko: "요한 볼프강 폰 괴테",
      en: "Johann Wolfgang von Goethe",
    },
    translator: {
      en: "Bayard Taylor",
      enUrl: "https://www.gutenberg.org/cache/epub/14591/pg14591.txt",
    },
    original: "Sobald du dir vertraust, sobald weißt du zu leben.",
    lang: "de",
    source: "『파우스트』 1부 (서재 장면, 메피스토펠레스의 대사)",
    year: 1808,
    sourceUrl: "https://de.wikisource.org/wiki/Faust_-_Der_Trag%C3%B6die_erster_Teil",
    tags: ["challenge", "fear"],
  },
  {
    id: 37,
    text: {
      ko: "관찰의 영역에서 우연은 오직 준비된 정신만을 돕는다.",
      en: "In the fields of observation, chance only favours the mind which is prepared.",
    },
    author: {
      ko: "루이 파스퇴르",
      en: "Louis Pasteur",
    },
    translator: {
      en: "R. L. Devonshire",
      enUrl: "https://www.gutenberg.org/cache/epub/60956/pg60956.txt",
    },
    original: "dans les champs de l’observation le hasard ne favorise que les esprits préparés",
    lang: "fr",
    source: "두에 강연 — 릴 대학 이학부 개설 기념 (12월 7일)",
    year: 1854,
    sourceUrl: "https://fr.wikisource.org/wiki/Discours_prononc%C3%A9_%C3%A0_Douai_le_7_d%C3%A9cembre_1854_%C3%A0_l%E2%80%99occasion_de_l%E2%80%99installation_solennelle_de_la_facult%C3%A9_des_lettres_de_Douai_et_de_la_facult%C3%A9_des_sciences_de_Lille",
    tags: ["preparation", "success"],
  },
  {
    id: 41,
    text: {
      ko: "반드시 죽고자 하면 살고, 반드시 살고자 하면 죽는다.",
      en: "If you are determined to die, you will live; if you are determined to live, you will die.",
    },
    author: {
      ko: "이순신",
      en: "Yi Sun-sin",
    },
    original: "必死則生 必生則死",
    lang: "lzh",
    source: "『난중일기』 1597년 9월 15일 (명량해전 전날)",
    year: 1597,
    sourceUrl: "https://ko.wikiquote.org/wiki/%EC%9D%B4%EC%88%9C%EC%8B%A0",
    tags: ["challenge", "fear", "energy"],
  },
  {
    id: 42,
    text: {
      ko: "하루라도 책을 읽지 않으면 입 안에 가시가 돋는다.",
      en: "A single day without reading, and thorns grow in my mouth.",
    },
    author: {
      ko: "안중근",
      en: "An Jung-geun",
    },
    original: "一日不讀書口中生荊棘",
    lang: "lzh",
    source: "유묵 (보물 제569-2호), 뤼순 감옥",
    year: 1910,
    sourceUrl: "https://ko.wikipedia.org/wiki/%EC%95%88%EC%A4%91%EA%B7%BC",
    tags: ["perseverance", "energy"],
  },
  {
    id: 43,
    text: {
      ko: "삼군의 장수는 빼앗을 수 있어도, 한 사람의 뜻은 빼앗을 수 없다.",
      en: "The commander of the forces of a large state may be carried off, but the will of even a common man cannot be taken from him.",
    },
    author: {
      ko: "공자",
      en: "Confucius",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    original: "三軍可奪帥也，匹夫不可奪志也",
    lang: "lzh",
    source: "『논어』 자한편",
    year: -450,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%AB%96%E8%AA%9E/%E5%AD%90%E7%BD%95%E7%AC%AC%E4%B9%9D",
    tags: ["freedom", "energy"],
  },
  {
    id: 44,
    text: {
      ko: "하늘이 큰 임무를 내리려 할 때는, 먼저 그 마음을 괴롭게 하고 몸을 지치게 한다.",
      en: "When Heaven is about to confer a great office on any man, it first exercises his mind with suffering, and his sinews and bones with toil.",
    },
    author: {
      ko: "맹자",
      en: "Mencius",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter12",
    },
    original: "天將降大任於是人也，必先苦其心志，勞其筋骨",
    lang: "lzh",
    source: "『맹자』 고자하",
    year: -300,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E5%AD%9F%E5%AD%90/%E5%91%8A%E5%AD%90%E4%B8%8B",
    tags: ["challenge", "meaning"],
  },
  {
    id: 45,
    text: {
      ko: "본래 땅 위에 길은 없었다. 걷는 사람이 많아지면 그것이 곧 길이 된다.",
      en: "In truth the earth had no roads to begin with; where many people walk, a road is made.",
    },
    author: {
      ko: "루쉰",
      en: "Lu Xun",
    },
    original: "其實地上本沒有路；走的人多了，也便成了路",
    lang: "zh",
    source: "단편소설 「고향(故鄕)」, 『신청년』 제9권 제1호",
    year: 1921,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E6%95%85%E9%84%89",
    tags: ["failure_acceptance", "challenge"],
  },
  {
    id: 46,
    text: {
      ko: "어려워서 감히 못하는 것이 아니라, 감히 하지 않기에 어려워지는 것이다.",
      en: "Our lack of confidence is not the result of difficulty; the difficulty comes from our lack of confidence.",
    },
    author: {
      ko: "세네카",
      en: "Seneca",
    },
    translator: {
      en: "Richard M. Gummere",
      enUrl: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_104",
    },
    original: "Non quia difficilia sunt non audemus, sed quia non audemus difficilia sunt.",
    lang: "la",
    source: "『도덕서한(Epistulae Morales)』 104편 26절",
    year: 65,
    sourceUrl: "https://la.wikisource.org/wiki/Epistulae_morales_ad_Lucilium/Liber_XVII_-_XVIII",
    tags: ["challenge", "fear"],
  },
  {
    id: 47,
    text: {
      ko: "꿈을 향해 당당히 나아가며 그리던 삶을 살고자 하면, 예기치 못한 성공을 만난다.",
      en: "If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
    },
    author: {
      ko: "헨리 데이비드 소로",
      en: "Henry David Thoreau",
    },
    original: "If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
    lang: "en",
    source: "『월든』 결론장",
    year: 1854,
    sourceUrl: "https://www.gutenberg.org/files/205/205-h/205-h.htm",
    tags: ["challenge", "dream"],
  },
  {
    id: 48,
    text: {
      ko: "세상은 고통으로 가득하지만, 그 고통을 이겨내는 일로도 가득하다.",
      en: "Although the world is full of suffering, it is full also of the overcoming of it.",
    },
    author: {
      ko: "헬렌 켈러",
      en: "Helen Keller",
    },
    original: "Although the world is full of suffering, it is full also of the overcoming of it.",
    lang: "en",
    source: "에세이 『낙관론(Optimism)』",
    year: 1903,
    sourceUrl: "https://www.gutenberg.org/files/31622/31622-h/31622-h.htm",
    tags: ["hope", "despair"],
  },
  {
    id: 50,
    text: {
      ko: "내 성공의 비결은 이것이다. 나는 어떤 변명도 하지 않았고, 받아주지도 않았다.",
      en: "I attribute my success to this:—I never gave or took an excuse.",
    },
    author: {
      ko: "플로렌스 나이팅게일",
      en: "Florence Nightingale",
    },
    original: "I attribute my success to this:—I never gave or took an excuse.",
    lang: "en",
    source: "본햄 카터에게 보낸 편지 / E. 쿡 『The Life of Florence Nightingale』(1913) 1권 506쪽 수록",
    year: 1861,
    sourceUrl: "https://quoteinvestigator.com/2016/07/30/excuse/",
    tags: ["success", "perseverance"],
  },
  {
    id: 51,
    text: {
      ko: "네 안에서 「너는 화가가 아니다」라고 말하거든 바로 그때 그려라. 그 소리도 잠잠해진다.",
      en: "If something in you yourself says ‘you aren’t a painter’ — IT’S THEN THAT YOU SHOULD PAINT, old chap, and that voice will be silenced too, but precisely because of that.",
    },
    author: {
      ko: "빈센트 반 고흐",
      en: "Vincent van Gogh",
    },
    translator: {
      en: "Van Gogh Museum / Huygens ING",
      enUrl: "https://vangoghletters.org/vg/letters/let400/letter.html",
    },
    original: "Als iets in U zelf zegt “gij zijt geen schilder” – SCHILDER DAN JUIST kerel, en die stem bedaart ook, maar slechts daardoor.",
    lang: "nl",
    source: "테오에게 보낸 편지 400번, 니우암스테르담 (10월 28일)",
    year: 1883,
    sourceUrl: "https://vangoghletters.org/vg/letters/let400/letter.html",
    tags: ["challenge", "fear"],
  },
  {
    id: 52,
    text: {
      ko: "나는 운명의 목덜미를 움켜쥘 것이다. 운명이 나를 완전히 굴복시키지는 못한다.",
      en: "I will take Fate by the throat; it shall not wholly overcome me.",
    },
    author: {
      ko: "루트비히 판 베토벤",
      en: "Ludwig van Beethoven",
    },
    translator: {
      en: "Henry Edward Krehbiel",
      enUrl: "https://www.gutenberg.org/cache/epub/43591/pg43591.txt",
    },
    original: "Ich will dem Schicksal in den Rachen greifen, ganz niederbeugen soll es mich gewiß nicht.",
    lang: "de",
    source: "베겔러에게 보낸 편지, 빈 (11월 16일) — 베토벤하우스 소장 자필본",
    year: 1801,
    sourceUrl: "https://www.beethoven.de/de/media/view/4862695861911552/Ludwig+van+Beethoven,+Brief+an+Franz+Gerhard+Wegeler+in+Bonn,+Wien,+16.+November+1801,+Autograph",
    tags: ["challenge", "fear", "energy"],
  },
  {
    id: 53,
    text: {
      ko: "투쟁이 없으면 진보도 없다.",
      en: "If there is no struggle there is no progress.",
    },
    author: {
      ko: "프레더릭 더글러스",
      en: "Frederick Douglass",
    },
    original: "If there is no struggle there is no progress.",
    lang: "en",
    source: "서인도 해방 기념 연설, 커낸다이과 (8월 3일)",
    year: 1857,
    sourceUrl: "https://en.wikisource.org/wiki/West_India_Emancipation",
    tags: ["challenge", "success"],
  },
  {
    id: 54,
    text: {
      ko: "굴복하지 마라, 굴복하지 마라, 절대로, 절대로, 절대로, 절대로.",
      en: "Never give in, never give in, never, never, never, never.",
    },
    author: {
      ko: "윈스턴 처칠",
      en: "Winston Churchill",
    },
    original: "never give in, never give in, never, never, never, never",
    lang: "en",
    source: "해로 스쿨 연설 (10월 29일)",
    year: 1941,
    sourceUrl: "https://en.wikisource.org/wiki/Never_Give_In,_Never,_Never,_Never",
    tags: ["despair", "energy"],
  },
  {
    id: 55,
    text: {
      ko: "천재는 1퍼센트의 영감과 99퍼센트의 땀으로 이루어진다.",
      en: "Genius is one per cent inspiration, ninety-nine per cent perspiration.",
    },
    author: {
      ko: "토머스 에디슨",
      en: "Thomas Edison",
    },
    original: "Genius is one per cent inspiration, ninety-nine per cent perspiration.",
    lang: "en",
    source: "Harper's Monthly 165권 987호 406쪽 인터뷰",
    year: 1932,
    sourceUrl: "https://en.wikiquote.org/wiki/Thomas_Edison",
    tags: ["preparation", "success"],
  },
  {
    id: 56,
    text: {
      ko: "새기다 그만두면 썩은 나무도 못 자르고, 새기기를 그치지 않으면 쇠와 돌도 새긴다.",
      en: "Carve and give up, and even rotten wood will not break; carve without giving up, and metal and stone can be engraved.",
    },
    author: {
      ko: "순자",
      en: "Xunzi",
    },
    original: "鍥而舍之，朽木不折；鍥而不舍，金石可鏤",
    lang: "lzh",
    source: "『순자』 권학편",
    year: -250,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%8D%80%E5%AD%90/%E5%8B%B8%E5%AD%B8%E7%AF%87",
    tags: ["perseverance", "challenge"],
  },
  {
    id: 57,
    text: {
      ko: "나는 새가 아니다. 어떤 그물도 나를 가두지 못한다. 나는 자유로운 인간이다.",
      en: "I am no bird; and no net ensnares me; I am a free human being with an independent will.",
    },
    author: {
      ko: "샬럿 브론테",
      en: "Charlotte Brontë",
    },
    original: "I am no bird; and no net ensnares me; I am a free human being with an independent will.",
    lang: "en",
    source: "『제인 에어』 23장",
    year: 1847,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1260/pg1260.txt",
    tags: ["freedom", "energy"],
  },
  {
    id: 58,
    text: {
      ko: "희망은 깃털 달린 것, 영혼에 내려앉아 가사 없는 노래를 부른다.",
      en: "Hope is the thing with feathers That perches in the soul, And sings the tune without the words",
    },
    author: {
      ko: "에밀리 디킨슨",
      en: "Emily Dickinson",
    },
    original: "Hope is the thing with feathers That perches in the soul, And sings the tune without the words",
    lang: "en",
    source: "시 「Hope」, 『Poems by Emily Dickinson』 제2집",
    year: 1891,
    sourceUrl: "https://www.gutenberg.org/cache/epub/12242/pg12242.txt",
    tags: ["hope", "energy"],
  },
  {
    id: 59,
    text: {
      ko: "오직 한없이 가지고 싶은 것은 높은 문화의 힘이다.",
      en: "The one thing I want without limit is the power of a high culture.",
    },
    author: {
      ko: "김구",
      en: "Kim Ku",
    },
    original: "오직 한없이 가지고 싶은 것은 높은 문화의 힘이다.",
    lang: "ko",
    source: "『백범일지』 「내가 원하는 우리 나라」",
    year: 1947,
    sourceUrl: "https://ko.wikisource.org/wiki/%EB%B0%B1%EB%B2%94%EC%9D%BC%EC%A7%80",
    tags: ["meaning", "energy"],
  },
  {
    id: 60,
    text: {
      ko: "말을 많이 하지 말고, 갑자기 성내지 마라.",
      en: "Do not speak much. Do not fly into a rage.",
    },
    author: {
      ko: "정약용",
      en: "Jeong Yak-yong",
    },
    original: "毋多言。毋暴怒。",
    lang: "lzh",
    source: "『목민심서』 율기 제1조 칙궁",
    year: 1818,
    sourceUrl: "https://ko.wikisource.org/wiki/%EB%AA%A9%EB%AF%BC%EC%8B%AC%EC%84%9C/%EC%9C%A8%EA%B8%B0",
    tags: ["oriental", "energy"],
  },
  {
    id: 61,
    text: {
      ko: "나는 여성이 남성을 지배하기를 바라지 않는다. 자기 자신을 지배하기를 바란다.",
      en: "I do not wish them to have power over men; but over themselves.",
    },
    author: {
      ko: "메리 울스턴크래프트",
      en: "Mary Wollstonecraft",
    },
    original: "I do not wish them to have power over men; but over themselves.",
    lang: "en",
    source: "『여성의 권리 옹호』 4장",
    year: 1792,
    sourceUrl: "https://www.gutenberg.org/cache/epub/3420/pg3420.txt",
    tags: ["freedom", "energy"],
  },
  {
    id: 63,
    text: {
      ko: "천 길 둑도 개미구멍 하나로 무너진다.",
      en: "A dike of a thousand zhang collapses through the hole of an ant.",
    },
    author: {
      ko: "한비",
      en: "Han Fei",
    },
    original: "千丈之堤，以螻蟻之穴潰",
    lang: "lzh",
    source: "『한비자』 유로편",
    year: -233,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%9F%93%E9%9D%9E%E5%AD%90/%E5%96%BB%E8%80%81",
    tags: ["failure_acceptance", "warning"],
  },
  {
    id: 64,
    text: {
      ko: "길은 아득히 멀지만, 나는 오르내리며 찾아 헤매리라.",
      en: "The road stretches on, long and far; I shall search up and down.",
    },
    author: {
      ko: "굴원",
      en: "Qu Yuan",
    },
    original: "路曼曼其脩遠兮，吾將上下而求索",
    lang: "lzh",
    source: "「이소(離騷)」",
    year: -300,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%9B%A2%E9%A8%B7",
    tags: ["challenge", "energy"],
  },
  {
    id: 65,
    text: {
      ko: "희망을 품고 부지런히 일하라. 무슨 일이 있어도 너희에게 아버지는 있다.",
      en: "Hope and keep busy; and whatever happens, remember that you never can be fatherless.",
    },
    author: {
      ko: "루이자 메이 올컷",
      en: "Louisa May Alcott",
    },
    original: "Hope and keep busy; and whatever happens, remember that you never can be fatherless.",
    lang: "en",
    source: "『작은 아씨들』 15장 (마치 부인의 편지)",
    year: 1868,
    sourceUrl: "https://www.gutenberg.org/cache/epub/37106/pg37106.txt",
    tags: ["hope", "energy"],
  },
  {
    id: 66,
    text: {
      ko: "네가 자주 떠올리는 생각이 어떠하든 네 마음도 그러하게 된다. 영혼은 생각에 물들기 때문이다.",
      en: "Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts.",
    },
    author: {
      ko: "마르쿠스 아우렐리우스",
      en: "Marcus Aurelius",
    },
    original: "Οἷα ἂν πολλάκις φαντασθῇς, τοιαύτη σοι ἔσται ἡ διάνοια· βάπτεται γὰρ ὑπὸ τῶν φαντασιῶν ἡ ψυχή.",
    lang: "grc",
    translator: {
      en: "George Long",
      enUrl: "https://www.gutenberg.org/cache/epub/15877/pg15877.txt",
    },
    source: "『명상록』 5권 16",
    year: 180,
    sourceUrl: "https://el.wikisource.org/wiki/%CE%A4%CE%B1_%CE%B5%CE%B9%CF%82_%CE%B5%CE%B1%CF%85%CF%84%CF%8C%CE%BD/5",
    tags: ["meaning", "perseverance"],
  },
  {
    id: 67,
    text: {
      ko: "사람을 어지럽히는 것은 사물이 아니라, 사물에 대해 갖는 생각이다.",
      en: "Men are disturbed not by things, but by the views which they take of things.",
    },
    author: {
      ko: "에픽테토스",
      en: "Epictetus",
    },
    original: "Ταράσσει τοὺς ἀνθρώπους οὐ τὰ πράγματα, ἀλλὰ τὰ περὶ τῶν πραγμάτων δόγματα.",
    lang: "grc",
    translator: {
      en: "Thomas Wentworth Higginson",
      enUrl: "https://www.gutenberg.org/cache/epub/45109/pg45109.txt",
    },
    source: "『엥케이리디온』 5",
    year: 125,
    sourceUrl: "https://el.wikisource.org/wiki/%CE%95%CE%B3%CF%87%CE%B5%CE%B9%CF%81%CE%AF%CE%B4%CE%B9%CE%BF%CE%BD",
    tags: ["fear", "meaning"],
  },
  {
    id: 68,
    text: {
      ko: "자기 삶의 '왜'를 지닌 사람은 거의 모든 '어떻게'를 견뎌낸다.",
      en: "If a man knows the wherefore of his existence, then the manner of it can take care of itself.",
    },
    author: {
      ko: "프리드리히 니체",
      en: "Friedrich Nietzsche",
    },
    original: "Hat man sein warum? des Lebens, so verträgt man sich fast mit jedem wie?",
    lang: "de",
    translator: {
      en: "Anthony M. Ludovici",
      enUrl: "https://www.gutenberg.org/cache/epub/52263/pg52263.txt",
    },
    source: "『우상의 황혼』 잠언과 화살 12",
    year: 1889,
    sourceUrl: "https://www.gutenberg.org/cache/epub/7203/pg7203.txt",
    tags: ["despair", "meaning"],
  },
  {
    id: 69,
    text: {
      ko: "너 자신을 믿어라. 모든 심장은 그 쇠줄에 맞추어 울린다.",
      en: "Trust thyself: every heart vibrates to that iron string.",
    },
    author: {
      ko: "랠프 월도 에머슨",
      en: "Ralph Waldo Emerson",
    },
    original: "Trust thyself: every heart vibrates to that iron string.",
    lang: "en",
    source: "『자기 신뢰(Self-Reliance)』",
    year: 1841,
    sourceUrl: "https://www.gutenberg.org/cache/epub/16643/pg16643.txt",
    tags: ["challenge", "freedom"],
  },
  {
    id: 70,
    text: {
      ko: "성공은 그가 오른 자리가 아니라, 성공하려 애쓰며 넘어선 장애물로 재야 한다.",
      en: "I have learned that success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
    },
    author: {
      ko: "부커 T. 워싱턴",
      en: "Booker T. Washington",
    },
    original: "I have learned that success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
    lang: "en",
    source: "『노예에서 일어서서(Up from Slavery)』 3장",
    year: 1901,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2376/pg2376.txt",
    tags: ["failure", "success"],
  },
  {
    id: 71,
    text: {
      ko: "사람은 누구나 한 번 죽는다. 그 죽음이 태산보다 무겁기도 하고, 기러기 털보다 가볍기도 하다.",
      en: "Every man has but one death. That death may be heavier than Mount Tai, or lighter than a goose feather.",
    },
    author: {
      ko: "사마천",
      en: "Sima Qian",
    },
    original: "人固有一死，死有重於泰山，或輕於鴻毛",
    lang: "lzh",
    source: "『한서』 권62 사마천전 「보임안서」",
    year: -93,
    sourceUrl: "https://zh.wikisource.org/wiki/%E6%BC%A2%E6%9B%B8/%E5%8D%B7062",
    tags: ["despair", "meaning"],
  },
  {
    id: 72,
    text: {
      ko: "나는 내 운명의 주인이요, 내 영혼의 선장이다.",
      en: "I am the master of my fate: I am the captain of my soul.",
    },
    author: {
      ko: "윌리엄 어니스트 헨리",
      en: "William Ernest Henley",
    },
    original: "I am the master of my fate: I am the captain of my soul.",
    lang: "en",
    source: "『시집(Poems)』 「인빅터스」",
    year: 1888,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1568/pg1568.txt",
    tags: ["despair", "freedom"],
  },
  {
    id: 73,
    text: {
      ko: "마음은 그 자체로 하나의 세계라, 스스로 지옥을 천국으로도 천국을 지옥으로도 만든다.",
      en: "The mind is its own place, and in itself can make a Heaven of Hell, a Hell of Heaven.",
    },
    author: {
      ko: "존 밀턴",
      en: "John Milton",
    },
    original: "The mind is its own place, and in itself Can make a Heaven of Hell, a Hell of Heaven.",
    lang: "en",
    source: "『실낙원』 1권",
    year: 1667,
    sourceUrl: "https://www.gutenberg.org/cache/epub/26/pg26.txt",
    tags: ["meaning", "despair"],
  },
  {
    id: 74,
    text: {
      ko: "의심은 배신자다. 시도를 두려워하게 만들어, 얻었을 좋은 것을 잃게 한다.",
      en: "Our doubts are traitors, and make us lose the good we oft might win by fearing to attempt.",
    },
    author: {
      ko: "윌리엄 셰익스피어",
      en: "William Shakespeare",
    },
    original: "Our doubts are traitors, And make us lose the good we oft might win By fearing to attempt.",
    lang: "en",
    source: "『자에는 자로』 1막 4장, 루치오의 대사",
    year: 1604,
    sourceUrl: "https://www.gutenberg.org/cache/epub/100/pg100.txt",
    tags: ["fear", "challenge"],
  },
  {
    id: 75,
    text: {
      ko: "우리는 모두 시궁창에 있다. 그러나 그중 몇은 별을 바라본다.",
      en: "We are all in the gutter, but some of us are looking at the stars.",
    },
    author: {
      ko: "오스카 와일드",
      en: "Oscar Wilde",
    },
    original: "We are all in the gutter, but some of us are looking at the stars.",
    lang: "en",
    source: "『윈더미어 부인의 부채』 3막, 달링턴 경의 대사",
    year: 1892,
    sourceUrl: "https://www.gutenberg.org/cache/epub/790/pg790.txt",
    tags: ["hope", "despair"],
  },
  {
    id: 76,
    text: {
      ko: "그 이름에 값하는 유일한 자유는, 제 방식대로 제 좋음을 좇는 자유다.",
      en: "The only freedom which deserves the name, is that of pursuing our own good in our own way.",
    },
    author: {
      ko: "존 스튜어트 밀",
      en: "John Stuart Mill",
    },
    original: "The only freedom which deserves the name, is that of pursuing our own good in our own way.",
    lang: "en",
    source: "『자유론』 1장",
    year: 1859,
    sourceUrl: "https://www.gutenberg.org/cache/epub/34901/pg34901.txt",
    tags: ["freedom", "meaning"],
  },
  {
    id: 77,
    text: {
      ko: "위대한 일은 힘이 아니라 끈기로 이루어진다.",
      en: "Great works are performed not by strength, but perseverance.",
    },
    author: {
      ko: "새뮤얼 존슨",
      en: "Samuel Johnson",
    },
    original: "Great works are performed not by strength, but perseverance.",
    lang: "en",
    source: "『라셀라스』 13장",
    year: 1759,
    sourceUrl: "https://www.gutenberg.org/cache/epub/652/pg652.txt",
    tags: ["perseverance", "challenge"],
  },
  {
    id: 78,
    text: {
      ko: "사람이 닿으려는 곳은 잡히는 곳보다 멀어야 한다. 아니면 하늘은 무엇하러 있겠는가?",
      en: "Ah, but a man's reach should exceed his grasp, or what's a heaven for?",
    },
    author: {
      ko: "로버트 브라우닝",
      en: "Robert Browning",
    },
    original: "Ah, but a man's reach should exceed his grasp, Or what's a heaven for?",
    lang: "en",
    source: "「안드레아 델 사르토」",
    year: 1855,
    sourceUrl: "https://www.gutenberg.org/cache/epub/50954/pg50954.txt",
    tags: ["challenge", "meaning"],
  },
  {
    id: 79,
    text: {
      ko: "언젠가 반드시 정상에 올라, 뭇 산이 작음을 한눈에 보리라.",
      en: "One day I shall climb to the very summit, and see at a glance how small the mountains are.",
    },
    author: {
      ko: "두보",
      en: "Du Fu",
    },
    original: "會當凌絕頂，一覽衆山小",
    lang: "lzh",
    source: "『전당시』 권216 「망악(望嶽)」",
    year: 736,
    sourceUrl: "https://zh.wikisource.org/wiki/%E6%9C%9B%E5%B6%BD_(%E5%B2%B1%E5%AE%97%E5%A4%AB%E5%A6%82%E4%BD%95)",
    tags: ["challenge", "oriental"],
  },
  {
    id: 80,
    text: {
      ko: "세 사람이 길을 가면, 그중에 반드시 내 스승이 있다.",
      en: "When I walk along with two others, they may serve me as my teachers.",
    },
    author: {
      ko: "공자",
      en: "Confucius",
    },
    original: "三人行，必有我師焉",
    lang: "lzh",
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    source: "『논어』 술이편 21",
    year: -450,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["preparation", "oriental"],
  },
  {
    id: 81,
    text: {
      ko: "제 배움의 끝을 걱정하지 마라. 일하는 시간마다 성실히 바쁘다면, 마지막 결과는 저절로 되도록 맡겨도 좋다.",
      en: "Let no youth have any anxiety about the upshot of his education. If he keep faithfully busy each hour of the working day, he may safely leave the final result to itself.",
    },
    author: {
      ko: "윌리엄 제임스",
      en: "William James",
    },
    original: "Let no youth have any anxiety about the upshot of his education, whatever the line of it may be. If he keep faithfully busy each hour of the working day, he may safely leave the final result to itself.",
    lang: "en",
    source: "『교사에게 하는 심리학 강의』 8장 「습관의 법칙」",
    year: 1899,
    sourceUrl: "https://www.gutenberg.org/cache/epub/16287/pg16287.txt",
    tags: ["perseverance", "fear"],
  },
  {
    id: 82,
    text: {
      ko: "싸움이 힘겨울수록 승리는 더 영광스럽다.",
      en: "The harder the conflict, the more glorious the triumph.",
    },
    author: {
      ko: "토머스 페인",
      en: "Thomas Paine",
    },
    original: "the harder the conflict, the more glorious the triumph.",
    lang: "en",
    source: "『아메리카의 위기(The American Crisis)』 제1호",
    year: 1776,
    sourceUrl: "https://www.gutenberg.org/cache/epub/3741/pg3741.txt",
    tags: ["despair", "perseverance"],
  },
  {
    id: 83,
    text: {
      ko: "우리는 성공보다 실패에서 훨씬 더 많은 지혜를 배운다.",
      en: "We learn wisdom from failure much more than from success.",
    },
    author: {
      ko: "새뮤얼 스마일스",
      en: "Samuel Smiles",
    },
    original: "We learn wisdom from failure much more than from success.",
    lang: "en",
    source: "『자조론(Self-Help)』 11장",
    year: 1859,
    sourceUrl: "https://www.gutenberg.org/cache/epub/935/pg935.txt",
    tags: ["failure"],
  },
  {
    id: 84,
    text: {
      ko: "희망을 품고 길을 가는 것이 도착하는 것보다 낫다. 참된 성공은 애쓰는 것이다.",
      en: "To travel hopefully is a better thing than to arrive, and the true success is to labour.",
    },
    author: {
      ko: "로버트 루이스 스티븐슨",
      en: "Robert Louis Stevenson",
    },
    original: "to travel hopefully is a better thing than to arrive, and the true success is to labour.",
    lang: "en",
    source: "『젊은이들을 위하여(Virginibus Puerisque)』 「엘도라도」",
    year: 1881,
    sourceUrl: "https://www.gutenberg.org/cache/epub/386/pg386.txt",
    tags: ["hope", "perseverance"],
  },
  {
    id: 85,
    text: {
      ko: "애쓰고, 구하고, 찾아내되, 굴하지 않는 것.",
      en: "To strive, to seek, to find, and not to yield.",
    },
    author: {
      ko: "앨프리드 테니슨",
      en: "Alfred Tennyson",
    },
    original: "To strive, to seek, to find, and not to yield.",
    lang: "en",
    source: "『시집(Poems)』 「율리시스」",
    year: 1842,
    sourceUrl: "https://www.gutenberg.org/cache/epub/8601/pg8601.txt",
    tags: ["perseverance", "challenge"],
  },
  {
    id: 86,
    text: {
      ko: "그러니 일어나 움직이자, 어떤 운명이든 감당할 마음으로.",
      en: "Let us, then, be up and doing, with a heart for any fate.",
    },
    author: {
      ko: "헨리 워즈워스 롱펠로",
      en: "Henry Wadsworth Longfellow",
    },
    original: "Let us, then, be up and doing, / With a heart for any fate;",
    lang: "en",
    source: "『밤의 목소리(Voices of the Night)』 「인생 찬가(A Psalm of Life)」",
    year: 1839,
    sourceUrl: "https://en.wikisource.org/wiki/Voices_of_the_Night/A_Psalm_of_Life",
    tags: ["energy", "challenge"],
  },
  {
    id: 87,
    text: {
      ko: "어쩌면 언젠가는 이 일마저 기쁘게 떠올릴 날이 오리라.",
      en: "Perhaps one day it will be a pleasure to remember even these things.",
    },
    author: {
      ko: "베르길리우스",
      en: "Virgil",
    },
    original: "forsan et haec ōlim meminisse iuvābit.",
    lang: "la",
    source: "『아이네이스』 1권 203행",
    year: -19,
    sourceUrl: "https://la.wikisource.org/wiki/Aeneis/Liber_I",
    tags: ["despair", "hope"],
  },
  {
    id: 88,
    text: {
      ko: "참고 견뎌라. 이 고통이 언젠가 너에게 도움이 되리라.",
      en: "Bear up and endure; this pain will one day do you good.",
    },
    author: {
      ko: "오비디우스",
      en: "Ovid",
    },
    original: "perfer et obdura! dolor hic tibi proderit olim",
    lang: "la",
    source: "『사랑의 노래(Amores)』 3권 11a편",
    year: -16,
    sourceUrl: "https://la.wikisource.org/wiki/Amores/3.11a",
    tags: ["despair", "perseverance"],
  },
  {
    id: 89,
    text: {
      ko: "우리를 겁주는 것이 짓누르는 것보다 많다. 우리는 실제보다 상상 속에서 더 자주 괴로워한다.",
      en: "There are more things, Lucilius, likely to frighten us than there are to crush us; we suffer more often in imagination than in reality.",
    },
    author: {
      ko: "세네카",
      en: "Seneca",
    },
    original: "Plura sunt, Lucili, quae nos terrent quam quae premunt, et saepius opinione quam re laboramus.",
    lang: "la",
    translator: {
      en: "Richard M. Gummere",
      enUrl: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_13",
    },
    source: "『도덕서한(Epistulae Morales)』 13편 4절",
    year: 65,
    sourceUrl: "https://la.wikisource.org/wiki/Epistulae_morales_ad_Lucilium/Liber_II",
    tags: ["fear", "despair"],
  },
  {
    id: 90,
    text: {
      ko: "잘못하고도 고치지 않는 것, 이것을 잘못이라 한다.",
      en: "To have faults and not to reform them,—this, indeed, should be pronounced having faults.",
    },
    author: {
      ko: "공자",
      en: "Confucius",
    },
    original: "過而不改，是謂過矣",
    lang: "lzh",
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    source: "『논어』 위령공편 29",
    year: -450,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%AB%96%E8%AA%9E/%E8%A1%9E%E9%9D%88%E5%85%AC%E7%AC%AC%E5%8D%81%E4%BA%94",
    tags: ["failure", "oriental"],
  },
  {
    id: 91,
    text: {
      ko: "남이 한 번에 해내면 나는 백 번을 하고, 남이 열 번에 해내면 나는 천 번을 한다.",
      en: "If another succeeds in one try, I will make a hundred; if another in ten, I will make a thousand.",
    },
    author: {
      ko: "자사",
      en: "Zisi",
    },
    original: "人一能之，己百之；人十能之，己千之",
    lang: "lzh",
    source: "『중용』 20장",
    year: -400,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E7%A6%AE%E8%A8%98/%E4%B8%AD%E5%BA%B8",
    tags: ["perseverance", "oriental"],
  },
  {
    id: 92,
    text: {
      ko: "실패는 더 현명하게 다시 시작할 기회일 뿐이다.",
      en: "Failure is only the opportunity more intelligently to begin again.",
    },
    author: {
      ko: "헨리 포드",
      en: "Henry Ford",
    },
    original: "Failure is only the opportunity more intelligently to begin again.",
    lang: "en",
    source: "『나의 삶과 일(My Life and Work)』 서문",
    year: 1922,
    sourceUrl: "https://www.gutenberg.org/cache/epub/7213/pg7213.txt",
    tags: ["failure", "challenge"],
  },
  {
    id: 93,
    text: {
      ko: "길 위의 장애물이 이 길을 가도록 돕는다.",
      en: "That which is an obstacle on the road helps us on this road.",
    },
    author: {
      ko: "마르쿠스 아우렐리우스",
      en: "Marcus Aurelius",
    },
    original: "πρὸ ὁδοῦ τὸ τῆς ὁδοῦ ταύτης ἐνστατικόν",
    lang: "grc",
    translator: {
      en: "George Long",
      enUrl: "https://www.gutenberg.org/cache/epub/15877/pg15877.txt",
    },
    source: "『명상록』 5권 20",
    year: 180,
    sourceUrl: "https://el.wikisource.org/wiki/%CE%A4%CE%B1_%CE%B5%CE%B9%CF%82_%CE%B5%CE%B1%CF%85%CF%84%CF%8C%CE%BD/5",
    tags: ["failure", "challenge"],
  },
  {
    id: 94,
    text: {
      ko: "나는 폭풍이 두렵지 않다. 내 배를 모는 법을 배우고 있으니까.",
      en: "I'm not afraid of storms, for I'm learning how to sail my ship.",
    },
    author: {
      ko: "루이자 메이 올컷",
      en: "Louisa May Alcott",
    },
    original: "I’m not afraid of storms, for I’m learning how to sail my ship.",
    lang: "en",
    source: "『작은 아씨들』 44장 (에이미의 대사)",
    year: 1869,
    sourceUrl: "https://www.gutenberg.org/cache/epub/514/pg514.txt",
    tags: ["fear", "challenge"],
  },
  {
    id: 95,
    text: {
      ko: "서로의 삶을 덜 힘들게 해 주려는 게 아니라면, 우리는 무엇을 위해 사는가?",
      en: "What do we live for, if it is not to make life less difficult to each other?",
    },
    author: {
      ko: "조지 엘리엇",
      en: "George Eliot",
    },
    original: "What do we live for, if it is not to make life less difficult to each other?",
    lang: "en",
    source: "『미들마치』 72장 (도러시아의 대사)",
    year: 1872,
    sourceUrl: "https://www.gutenberg.org/cache/epub/145/pg145.txt",
    tags: ["meaning"],
  },
  {
    id: 96,
    text: {
      ko: "열정 없이 이루어진 위대한 일은 하나도 없다.",
      en: "Nothing great was ever achieved without enthusiasm.",
    },
    author: {
      ko: "랠프 월도 에머슨",
      en: "Ralph Waldo Emerson",
    },
    original: "Nothing great was ever achieved without enthusiasm.",
    lang: "en",
    source: "『에세이 1집』 「원(Circles)」",
    year: 1841,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2944/pg2944.txt",
    tags: ["passion", "energy"],
  },
  {
    id: 97,
    text: {
      ko: "남을 이기는 사람은 힘이 있고, 자신을 이기는 사람은 강하다.",
      en: "He who overcomes others is strong; he who overcomes himself is mighty.",
    },
    author: {
      ko: "노자",
      en: "Laozi",
    },
    original: "勝人者有力，自勝者強",
    lang: "lzh",
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/216/pg216.txt",
    },
    source: "『도덕경』 제33장 (왕필본)",
    year: -400,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%81%93%E5%BE%B7%E7%B6%93_(%E7%8E%8B%E5%BC%BC%E6%9C%AC)",
    tags: ["challenge", "oriental"],
  },
  {
    id: 98,
    text: {
      ko: "세상에서 가장 위대한 일은 자기 자신에게 속할 줄 아는 것이다.",
      en: "The greatest thing in the world is for a man to know that he is his own.",
    },
    author: {
      ko: "미셸 드 몽테뉴",
      en: "Michel de Montaigne",
    },
    original: "La plus grande chose du monde, c’est de sçavoir estre à soy.",
    lang: "fr",
    translator: {
      en: "Charles Cotton",
      enUrl: "https://www.gutenberg.org/cache/epub/3600/pg3600.txt",
    },
    source: "『에세』 1권 39장 「고독에 대하여」",
    year: 1580,
    sourceUrl: "https://fr.wikisource.org/wiki/Essais/Livre_I/Chapitre_39",
    tags: ["freedom", "meaning"],
  },
  {
    id: 99,
    text: {
      ko: "낙관은 성취로 이끄는 믿음이다. 희망 없이는 아무것도 이룰 수 없다.",
      en: "Optimism is the faith that leads to achievement; nothing can be done without hope.",
    },
    author: {
      ko: "헬렌 켈러",
      en: "Helen Keller",
    },
    original: "Optimism is the faith that leads to achievement; nothing can be done without hope.",
    lang: "en",
    source: "에세이 『낙관론(Optimism)』",
    year: 1903,
    sourceUrl: "https://www.gutenberg.org/cache/epub/31622/pg31622.txt",
    tags: ["hope", "success"],
  },
  {
    id: 100,
    text: {
      ko: "자기 일을 찾은 사람은 복되다. 다른 복은 구하지 말라.",
      en: "Blessed is he who has found his work; let him ask no other blessedness.",
    },
    author: {
      ko: "토머스 칼라일",
      en: "Thomas Carlyle",
    },
    original: "Blessed is he who has found his work; let him ask no other blessedness.",
    lang: "en",
    source: "『과거와 현재(Past and Present)』 3권 11장 「노동」",
    year: 1843,
    sourceUrl: "https://www.gutenberg.org/cache/epub/26159/pg26159.txt",
    tags: ["meaning", "passion"],
  },
  {
    id: 101,
    text: {
      ko: "가시를 쥘 엄두를 내지 못하는 사람은 장미를 바라서도 안 된다.",
      en: "He that dares not grasp the thorn should never crave the rose.",
    },
    author: {
      ko: "앤 브론테",
      en: "Anne Brontë",
    },
    original: "he that dares not grasp the thorn / Should never crave the rose.",
    lang: "en",
    source: "시 「좁은 길(The Narrow Way)」",
    year: 1848,
    sourceUrl: "https://en.wikisource.org/wiki/The_Complete_Poems_of_Anne_Bront%C3%AB/The_Narrow_Way",
    tags: ["challenge", "fear"],
  },
  {
    id: 102,
    text: {
      ko: "새벽이 언제 올지 몰라, 나는 모든 문을 열어 둔다.",
      en: "Not knowing when the dawn will come, I open every door.",
    },
    author: {
      ko: "에밀리 디킨슨",
      en: "Emily Dickinson",
    },
    original: "Not knowing when the dawn will come / I open every door;",
    lang: "en",
    source: "『시집 제3집(Poems, Third Series)』 「새벽(Dawn)」",
    year: 1896,
    sourceUrl: "https://www.gutenberg.org/cache/epub/12242/pg12242.txt",
    tags: ["hope", "despair"],
  },
  {
    id: 103,
    text: {
      ko: "실패는 괴롭다. 그러나 성공하려고 시도조차 하지 않은 것은 더 나쁘다.",
      en: "It is hard to fail, but it is worse never to have tried to succeed.",
    },
    author: {
      ko: "시어도어 루스벨트",
      en: "Theodore Roosevelt",
    },
    original: "It is hard to fail, but it is worse never to have tried to succeed.",
    lang: "en",
    source: "「분투하는 삶(The Strenuous Life)」 해밀턴 클럽 연설, 시카고 (4월 10일)",
    year: 1899,
    sourceUrl: "https://www.gutenberg.org/cache/epub/58821/pg58821.txt",
    tags: ["failure", "challenge"],
  },
  {
    id: 104,
    text: {
      ko: "확고한 목적만큼 마음을 고요하게 해 주는 것은 없다.",
      en: "Nothing contributes so much to tranquillize the mind as a steady purpose.",
    },
    author: {
      ko: "메리 셸리",
      en: "Mary Shelley",
    },
    original: "nothing contributes so much to tranquillize the mind as a steady purpose",
    lang: "en",
    source: "『프랑켄슈타인』 (1818년 초판) 월턴의 첫 번째 편지",
    year: 1818,
    sourceUrl: "https://www.gutenberg.org/cache/epub/41445/pg41445.txt",
    tags: ["meaning", "preparation"],
  },
  {
    id: 105,
    text: {
      ko: "진실로 하루를 새롭게 하려거든, 날마다 새롭게 하고, 또 날마다 새롭게 하라.",
      en: "If you can one day renovate yourself, do so from day to day. Yea, let there be daily renovation.",
    },
    author: {
      ko: "탕왕",
      en: "King Tang",
    },
    original: "苟日新，日日新，又日新",
    lang: "lzh",
    translator: {
      en: "James Legge",
      enUrl: "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_1/The_Great_Learning",
    },
    source: "『대학』 전2장 (탕왕의 세숫대야에 새긴 글)",
    year: -1600,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E7%A6%AE%E8%A8%98/%E5%A4%A7%E5%AD%B8",
    tags: ["energy", "challenge", "oriental"],
  },
  {
    id: 106,
    text: {
      ko: "사람은 하지 않는 것이 있은 뒤에야, 해낼 수 있는 것이 생긴다.",
      en: "Only when there are things a person will not do can there be things they will do.",
    },
    author: {
      ko: "맹자",
      en: "Mencius",
    },
    original: "人有不為也，而後可以有為",
    lang: "lzh",
    source: "『맹자』 이루하 8",
    year: -300,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E5%AD%9F%E5%AD%90/%E9%9B%A2%E5%A9%81%E4%B8%8B",
    tags: ["preparation", "oriental"],
  },
  {
    id: 107,
    text: {
      ko: "시작한 사람은 이미 절반을 이룬 것이다. 감히 지혜로워져라. 시작하라.",
      en: "He who has begun has half done. Dare to be wise; begin.",
    },
    author: {
      ko: "호라티우스",
      en: "Horace",
    },
    original: "Dimidium facti, qui coepit, habet; sapere aude, incipe.",
    lang: "la",
    source: "『서간집(Epistulae)』 1권 2편 40행",
    year: -20,
    sourceUrl: "https://la.wikisource.org/wiki/Epistulae_(Horatius)/Liber_I/Epistula_II",
    tags: ["challenge", "energy"],
  },
  {
    id: 108,
    text: {
      ko: "용기란 두려움에 맞서고 두려움을 다스리는 것이지, 두려움이 없는 것이 아니다.",
      en: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    },
    author: {
      ko: "마크 트웨인",
      en: "Mark Twain",
    },
    original: "Courage is resistance to fear, mastery of fear--not absence of fear.",
    lang: "en",
    source: "『얼간이 윌슨(Pudd'nhead Wilson)』 12장 「얼간이 윌슨의 달력」",
    year: 1894,
    sourceUrl: "https://www.gutenberg.org/cache/epub/102/pg102.txt",
    tags: ["fear", "challenge"],
  },
  {
    id: 109,
    text: {
      ko: "겁쟁이는 죽기 전에 여러 번 죽지만, 용감한 사람은 죽음을 단 한 번만 맛본다.",
      en: "Cowards die many times before their deaths; the valiant never taste of death but once.",
    },
    author: {
      ko: "윌리엄 셰익스피어",
      en: "William Shakespeare",
    },
    original: "Cowards die many times before their deaths; The valiant never taste of death but once.",
    lang: "en",
    source: "『줄리어스 시저』 2막 2장, 시저의 대사",
    year: 1599,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1522/pg1522.txt",
    tags: ["fear", "despair"],
  },
  {
    id: 110,
    text: {
      ko: "삶은 원한을 품거나 잘못을 따지며 보내기에는 너무 짧은 것 같다.",
      en: "Life appears to me too short to be spent in nursing animosity or registering wrongs.",
    },
    author: {
      ko: "샬럿 브론테",
      en: "Charlotte Brontë",
    },
    original: "Life appears to me too short to be spent in nursing animosity or registering wrongs.",
    lang: "en",
    source: "『제인 에어』 6장, 헬렌 번스의 대사",
    year: 1847,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1260/pg1260.txt",
    tags: ["meaning", "freedom"],
  },
  {
    id: 111,
    text: {
      ko: "모든 것은 남의 것이고, 오직 시간만이 우리 것이다.",
      en: "Nothing, Lucilius, is ours, except time.",
    },
    author: {
      ko: "세네카",
      en: "Seneca",
    },
    original: "Omnia, Lucili, aliena sunt, tempus tantum nostrum est",
    lang: "la",
    translator: {
      en: "Richard M. Gummere",
      enUrl: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_1",
    },
    source: "『도덕서한(Epistulae Morales)』 1편 3절",
    year: 65,
    sourceUrl: "https://la.wikisource.org/wiki/Epistulae_morales_ad_Lucilium/Liber_I",
    tags: ["meaning", "energy"],
  },
  {
    id: 112,
    text: {
      ko: "한 문이 닫히면 다른 문이 열린다.",
      en: "Where one door shuts, another opens.",
    },
    author: {
      ko: "미겔 데 세르반테스",
      en: "Miguel de Cervantes",
    },
    original: "Donde una puerta se cierra, otra se abre",
    lang: "es",
    translator: {
      en: "John Ormsby",
      enUrl: "https://www.gutenberg.org/cache/epub/996/pg996.txt",
    },
    source: "『돈키호테』 1부 21장, 돈키호테의 대사(속담 인용)",
    year: 1605,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2000/pg2000.txt",
    tags: ["hope", "failure"],
  },
  {
    id: 113,
    text: {
      ko: "근면은 행운의 어머니다.",
      en: "Diligence is the mother of good luck.",
    },
    author: {
      ko: "벤저민 프랭클린",
      en: "Benjamin Franklin",
    },
    original: "Diligence is the mother of good luck",
    lang: "en",
    source: "『부자가 되는 길(The Way to Wealth)』, 에이브러햄 영감의 연설(속담 인용)",
    year: 1758,
    sourceUrl: "https://en.wikisource.org/wiki/Way_to_wealth_(1)",
    tags: ["preparation", "success"],
  },
  {
    id: 114,
    text: {
      ko: "우리는 만날 때에 떠날 것을 염려하는 것과 같이 떠날 때에 다시 만날 것을 믿습니다.",
      en: "Just as we fear parting when we meet, so when we part we believe that we will meet again.",
    },
    author: {
      ko: "한용운",
      en: "Han Yong-un",
    },
    original: "우리는 만날 때에 떠날 것을 염려하는 것과 같이 떠날 때에 다시 만날 것을 믿습니다.",
    lang: "ko",
    source: "『님의 침묵』 「님의 침묵」",
    year: 1926,
    sourceUrl: "https://ko.wikisource.org/wiki/%EB%8B%98%EC%9D%98_%EC%B9%A8%EB%AC%B5/%EB%8B%98%EC%9D%98_%EC%B9%A8%EB%AC%B5",
    tags: ["hope", "despair"],
  },
  {
    id: 115,
    text: {
      ko: "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를.",
      en: "Until the day I die, may I look up to the heavens with not a speck of shame.",
    },
    author: {
      ko: "윤동주",
      en: "Yun Dong-ju",
    },
    original: "죽는 날까지 하늘을 우르러 / 한점 부끄럼이 없기를,",
    lang: "ko",
    source: "『하늘과 바람과 별과 시』(1948 초판) 「서시」",
    year: 1941,
    sourceUrl: "https://ko.wikisource.org/wiki/%ED%95%98%EB%8A%98%EA%B3%BC_%EB%B0%94%EB%9E%8C%EA%B3%BC_%EB%B3%84%EA%B3%BC_%EC%8B%9C_(1948%EB%85%84)/%EC%84%9C%EC%8B%9C",
    tags: ["meaning"],
  },
  {
    id: 116,
    text: {
      ko: "에너지는 영원한 기쁨이다.",
      en: "Energy is Eternal Delight.",
    },
    author: {
      ko: "윌리엄 블레이크",
      en: "William Blake",
    },
    original: "Energy is Eternal Delight.",
    lang: "en",
    source: "『천국과 지옥의 결혼』 「악마의 목소리」",
    year: 1790,
    sourceUrl: "https://www.gutenberg.org/cache/epub/45315/pg45315.txt",
    tags: ["energy", "passion"],
  },
  {
    id: 117,
    text: {
      ko: "숲속에 두 갈래 길이 있었고, 나는 사람들이 덜 다닌 길을 택했다. 그리고 그것이 모든 것을 바꾸어 놓았다.",
      en: "Two roads diverged in a wood, and I— I took the one less traveled by, and that has made all the difference.",
    },
    author: {
      ko: "로버트 프로스트",
      en: "Robert Frost",
    },
    original: "Two roads diverged in a wood, and I-- / I took the one less traveled by, / And that has made all the difference.",
    lang: "en",
    source: "『산의 막간(Mountain Interval)』 「가지 않은 길」",
    year: 1916,
    sourceUrl: "https://www.gutenberg.org/cache/epub/29345/pg29345.txt",
    tags: ["challenge", "freedom"],
  },
  {
    id: 118,
    text: {
      ko: "겨울이 오면, 봄이 어찌 멀리 있으랴?",
      en: "If Winter comes, can Spring be far behind?",
    },
    author: {
      ko: "퍼시 비시 셸리",
      en: "Percy Bysshe Shelley",
    },
    original: "If Winter comes, can Spring be far behind?",
    lang: "en",
    source: "「서풍에 부치는 노래(Ode to the West Wind)」",
    year: 1820,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4800/pg4800.txt",
    tags: ["hope", "despair"],
  },
  {
    id: 119,
    text: {
      ko: "사람은 애쓰는 동안에는 헤매기 마련이다.",
      en: "While Man’s desires and aspirations stir, He cannot choose but err.",
    },
    author: {
      ko: "요한 볼프강 폰 괴테",
      en: "Johann Wolfgang von Goethe",
    },
    original: "Es irrt der Mensch so lang er strebt.",
    lang: "de",
    translator: {
      en: "Bayard Taylor",
      enUrl: "https://www.gutenberg.org/cache/epub/14591/pg14591.txt",
    },
    source: "『파우스트』 1부 「천상의 서곡」, 주님의 대사",
    year: 1808,
    sourceUrl: "https://de.wikisource.org/wiki/Faust_-_Der_Trag%C3%B6die_erster_Teil",
    tags: ["failure", "perseverance"],
  },
  {
    id: 120,
    text: {
      ko: "일은 눈에 보이게 된 사랑이다.",
      en: "Work is love made visible.",
    },
    author: {
      ko: "칼릴 지브란",
      en: "Kahlil Gibran",
    },
    original: "Work is love made visible.",
    lang: "en",
    source: "『예언자』 「일에 대하여」",
    year: 1923,
    sourceUrl: "https://www.gutenberg.org/cache/epub/58585/pg58585.txt",
    tags: ["passion", "meaning"],
  },
  {
    id: 121,
    text: {
      ko: "너 자신 말고는 그 무엇도 너에게 평화를 가져다줄 수 없다.",
      en: "Nothing can bring you peace but yourself.",
    },
    author: {
      ko: "랠프 월도 에머슨",
      en: "Ralph Waldo Emerson",
    },
    original: "Nothing can bring you peace but yourself.",
    lang: "en",
    source: "『자기 신뢰(Self-Reliance)』",
    year: 1841,
    sourceUrl: "https://www.gutenberg.org/cache/epub/16643/pg16643.txt",
    tags: ["freedom", "meaning"],
  },
  {
    id: 122,
    text: {
      ko: "희망은 사람의 가슴속에서 영원히 솟아난다.",
      en: "Hope springs eternal in the human breast.",
    },
    author: {
      ko: "알렉산더 포프",
      en: "Alexander Pope",
    },
    original: "Hope springs eternal in the human breast:",
    lang: "en",
    source: "『인간론(An Essay on Man)』 제1서간",
    year: 1733,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2428/pg2428.txt",
    tags: ["hope"],
  },
  {
    id: 123,
    text: {
      ko: "내 성에 들어가기 전에 근사한 일을 하고 싶어. 내가 죽은 뒤에도 잊히지 않을, 영웅적이거나 놀라운 일을.",
      en: "I want to do something splendid before I go into my castle, something heroic or wonderful that won't be forgotten after I'm dead.",
    },
    author: {
      ko: "루이자 메이 올컷",
      en: "Louisa May Alcott",
    },
    original: "I want to do something splendid before I go into my castle, something heroic or wonderful that won’t be forgotten after I’m dead.",
    lang: "en",
    source: "『작은 아씨들』 13장 「공중누각」, 조의 대사",
    year: 1868,
    sourceUrl: "https://www.gutenberg.org/cache/epub/514/pg514.txt",
    tags: ["dream", "passion"],
  },
  {
    id: 124,
    text: {
      ko: "할 수 있다고 여기기에, 그들은 할 수 있다.",
      en: "They can, because they think they can.",
    },
    author: {
      ko: "베르길리우스",
      en: "Virgil",
    },
    original: "possunt, quia posse uidentur.",
    lang: "la",
    source: "『아이네이스』 5권 231행",
    year: -19,
    sourceUrl: "https://la.wikisource.org/wiki/Aeneis/Liber_V",
    tags: ["challenge", "fear"],
  },
  {
    id: 125,
    text: {
      ko: "오늘을 붙잡아라. 내일은 될 수 있는 한 믿지 마라.",
      en: "Seize the day, trusting as little as possible in tomorrow.",
    },
    author: {
      ko: "호라티우스",
      en: "Horace",
    },
    original: "carpe diem, quam minimum credula postero.",
    lang: "la",
    source: "『송가(Carmina)』 1권 11편",
    year: -23,
    sourceUrl: "https://la.wikisource.org/wiki/Carmina_(Horatius)/Liber_I/Carmen_XI",
    tags: ["energy", "challenge"],
  },
  {
    id: 126,
    text: {
      ko: "물방울이 바위를 뚫는다.",
      en: "Dripping water hollows out stone.",
    },
    author: {
      ko: "오비디우스",
      en: "Ovid",
    },
    original: "Gutta cavat lapidem",
    lang: "la",
    source: "『흑해에서 보낸 편지(Epistulae ex Ponto)』 4권 10편 5행",
    year: 13,
    sourceUrl: "https://la.wikisource.org/wiki/Epistulae_ex_Ponto/Liber_IV",
    tags: ["perseverance", "preparation"],
  },
  {
    id: 127,
    text: {
      ko: "너희는 짐승처럼 살려고 태어난 것이 아니라, 덕과 지식을 좇으려고 태어났다.",
      en: "Ye were not made to live like unto brutes, But for pursuit of virtue and of knowledge.",
    },
    author: {
      ko: "단테 알리기에리",
      en: "Dante Alighieri",
    },
    original: "fatti non foste a viver come bruti, ma per seguir virtute e canoscenza",
    lang: "it",
    translator: {
      en: "Henry Wadsworth Longfellow",
      enUrl: "https://www.gutenberg.org/cache/epub/1001/pg1001.txt",
    },
    source: "『신곡』 지옥편 26곡, 율리시스의 대사",
    year: 1320,
    sourceUrl: "https://it.wikisource.org/wiki/Divina_Commedia/Inferno/Canto_XXVI",
    tags: ["meaning", "challenge"],
  },
  {
    id: 128,
    text: {
      ko: "달리기만 해서는 소용없다. 제때 출발해야 한다.",
      en: "Running is no use; one must set out in time.",
    },
    author: {
      ko: "장 드 라퐁텐",
      en: "Jean de La Fontaine",
    },
    original: "Rien ne sert de courir ; il faut partir à point",
    lang: "fr",
    source: "『우화』 6권 10 「토끼와 거북」",
    year: 1668,
    sourceUrl: "https://fr.wikisource.org/wiki/Fables_de_La_Fontaine_(%C3%A9d._1874)/Le_Li%C3%A8vre_et_la_Tortue",
    tags: ["preparation", "perseverance"],
  },
  {
    id: 129,
    text: {
      ko: "어제도 가고 오늘도 갈 나의 길, 새로운 길.",
      en: "The road I walked yesterday and will walk today: my road, a new road.",
    },
    author: {
      ko: "윤동주",
      en: "Yun Dong-ju",
    },
    original: "어제도 가고 오늘도 갈 / 나의 길 새로운 길",
    lang: "ko",
    source: "『하늘과 바람과 별과 시』(1948 초판) 「새로운 길」",
    year: 1938,
    sourceUrl: "https://ko.wikisource.org/wiki/%ED%95%98%EB%8A%98%EA%B3%BC_%EB%B0%94%EB%9E%8C%EA%B3%BC_%EB%B3%84%EA%B3%BC_%EC%8B%9C_(1948%EB%85%84)/%EC%83%88%EB%A1%9C%EC%9A%B4_%EA%B8%B8",
    tags: ["hope", "challenge"],
  },
  {
    id: 130,
    text: {
      ko: "거센 바람 타고 물결을 헤칠 때가 반드시 오리니, 곧장 구름 돛을 올려 푸른 바다를 건너리라.",
      en: "The day will come to ride the long wind and break the waves; then I will raise my cloud-high sail and cross the vast sea.",
    },
    author: {
      ko: "이백",
      en: "Li Bai",
    },
    original: "長風破浪會有時，直掛雲帆濟滄海",
    lang: "lzh",
    source: "「행로난(行路難)」 제1수",
    year: 744,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%A1%8C%E8%B7%AF%E9%9B%A3_(%E9%87%91%E6%A8%BD%E6%B8%85%E9%85%92%E6%96%97%E5%8D%81%E5%8D%83)",
    tags: ["hope", "dream", "oriental"],
  },
  {
    id: 131,
    text: {
      ko: "내게는 남의 뜻에 겁먹는 것을 결코 견디지 못하는 고집이 있다. 누가 나를 위협하려 들 때마다 내 용기는 솟아오른다.",
      en: "There is a stubbornness about me that never can bear to be frightened at the will of others. My courage always rises with every attempt to intimidate me.",
    },
    author: {
      ko: "제인 오스틴",
      en: "Jane Austen",
    },
    original: "There is a stubbornness about me that never can bear to be frightened at the will of others. My courage always rises with every attempt to intimidate me.",
    lang: "en",
    source: "『오만과 편견』 31장, 엘리자베스의 대사",
    year: 1813,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1342/pg1342.txt",
    tags: ["fear", "freedom"],
  },
  {
    id: 132,
    text: {
      ko: "옳음이 힘을 만든다는 믿음을 갖자. 그리고 그 믿음으로 끝까지, 우리가 아는 대로 우리의 의무를 과감히 행하자.",
      en: "Let us have faith that right makes might; and in that faith, let us, to the end, dare to do our duty as we understand it.",
    },
    author: {
      ko: "에이브러햄 링컨",
      en: "Abraham Lincoln",
    },
    original: "Let us have faith that right makes might; and in that faith, let us, to the end, dare to do our duty as we understand it.",
    lang: "en",
    source: "쿠퍼 유니언 연설, 뉴욕 (2월 27일)",
    year: 1860,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2657/pg2657.txt",
    tags: ["challenge", "fear"],
  },
  {
    id: 133,
    text: {
      ko: "좋은 사람이란 어떠해야 하는지 더는 논하지 말고, 그런 사람이 되어라.",
      en: "No longer talk at all about the kind of man that a good man ought to be, but be such.",
    },
    author: {
      ko: "마르쿠스 아우렐리우스",
      en: "Marcus Aurelius",
    },
    original: "Μηκέθ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον.",
    lang: "grc",
    translator: {
      en: "George Long",
      enUrl: "https://www.gutenberg.org/cache/epub/15877/pg15877.txt",
    },
    source: "『명상록』 10권 16",
    year: 180,
    sourceUrl: "https://el.wikisource.org/wiki/%CE%A4%CE%B1_%CE%B5%CE%B9%CF%82_%CE%B5%CE%B1%CF%85%CF%84%CF%8C%CE%BD/10",
    tags: ["energy", "challenge"],
  },
  {
    id: 134,
    text: {
      ko: "우리가 절망이라 부르는 것은 흔히, 채워지지 못한 희망의 고통스러운 갈망일 뿐이다.",
      en: "What we call our despair is often only the painful eagerness of unfed hope.",
    },
    author: {
      ko: "조지 엘리엇",
      en: "George Eliot",
    },
    original: "what we call our despair is often only the painful eagerness of unfed hope.",
    lang: "en",
    source: "『미들마치』 51장",
    year: 1872,
    sourceUrl: "https://www.gutenberg.org/cache/epub/145/pg145.txt",
    tags: ["despair", "hope"],
  },
  {
    id: 135,
    text: {
      ko: "단순하게, 단순하게.",
      en: "Simplify, simplify.",
    },
    author: {
      ko: "헨리 데이비드 소로",
      en: "Henry David Thoreau",
    },
    original: "Simplify, simplify.",
    lang: "en",
    source: "『월든』 2장 「내가 살았던 곳, 그리고 살았던 이유」",
    year: 1854,
    sourceUrl: "https://www.gutenberg.org/cache/epub/205/pg205.txt",
    tags: ["freedom", "meaning"],
  },
  {
    id: 136,
    text: {
      ko: "무엇보다 이것만은 지켜라. 너 자신에게 진실하라.",
      en: "This above all: to thine own self be true.",
    },
    author: {
      ko: "윌리엄 셰익스피어",
      en: "William Shakespeare",
    },
    original: "This above all: to thine own self be true;",
    lang: "en",
    source: "『햄릿』 1막 3장, 폴로니어스의 대사",
    year: 1600,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1524/pg1524.txt",
    tags: ["freedom", "meaning"],
  },
];
