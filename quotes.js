// 수록 기준: 1차 출처(책/연설/편지/당대 기록)로 확인된 명언만 등재한다.
// 모든 항목은 original, lang, source, year, sourceUrl을 반드시 포함한다.
// 출처를 제시할 수 없으면 등재하지 않는다. 애매하면 탈락시킨다.
//
// id 규칙: app.js의 즐겨찾기가 id로만 매칭하므로 id는 절대 재사용하지 않는다.
// 삭제된 id: 1,2,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,
//            27,28,29,31,32,33,34,35,36,38,39,40,49
// 다음 id: 71
//
// ── 이중 언어 ────────────────────────────────────────────────────────────
// text 와 author 는 { ko, en } 이다. 화면은 q.text[lang] 으로 읽는다.
//
// text.en 은 세 가지 경로로 만들어졌다.
//
//  1) original 그대로 (13개) — lang 이 "en" 인 항목. 이미 1차 출처와 문자
//     그대로 대조를 마친 문장이라 번역을 거치지 않는 것이 가장 정확하다.
//     예외는 id 54 처칠과 id 4 노자 — 각각 연설과 문장의 중간을 잘라온 것이라
//     소문자로 시작해서, 화면에 단독으로 놓이는 만큼 첫 글자만 대문자로 올렸다.
//
//  2) 공개된 정본 영역 (8개) — translator 필드가 있는 항목. 번역자와 그
//     번역문을 직접 열어 대조한 URL을 함께 기록한다.
//       id 4  노자      James Legge
//       id 30 괴테      Bayard Taylor
//       id 37 파스퇴르   R. L. Devonshire (Vallery-Radot 『The Life of Pasteur』)
//       id 43 공자      James Legge
//       id 44 맹자      James Legge
//       id 46 세네카     Richard M. Gummere
//       id 51 반 고흐    반 고흐 미술관 / Huygens ING 공식 영역
//       id 52 베토벤     Henry Edward Krehbiel (Thayer 『Life of Beethoven』)
//
//  3) 자체 번역 (9개) — translator 가 없는 항목. 공개된 정본 영역을 찾지
//     못해 original 에서 직접 옮겼다. id 41,42,45,56,59,60,62,63,64.
//     정본을 찾으면 여기서 2)로 승급시킨다.
//
// translator 가 없다는 것은 자체 번역이라는 뜻이다. 이 규칙을 바꾸지 말 것.
//
// 한국어 text 는 반드시 original 에서 번역한다. 원문의 주장(주어/서술어/한정
// 조건)을 바꾸는 의역은 금지한다. 영어도 같은 규율을 따른다.
//
// ── 2차 검증(재검증) 상태 ────────────────────────────────────────────────
// [A] sourceUrl을 직접 열어 original이 문자 그대로 있음을 대조 완료:
//     3, 4, 30, 37, 43, 44, 45, 46, 47, 48, 51, 53, 54, 56~65
// [B] 원문 인쇄물(1차)이 온라인에 없어, 그 인쇄물을 정확히 인용한 페이지를
//     열어 문구를 대조한 항목: 21(LIFE 1955.5.2), 50(Cook 1913 1권 506쪽),
//     55(Harper's Monthly 1932, 165권 987호 406쪽)
// [C] 1차 출처가 실재하나 해당 사이트가 이 환경에서 열리지 않아,
//     열리는 대체 페이지로 문구만 대조한 항목: 6, 41, 42, 52
// [D] 재검증에서 삭제: 49 마리 퀴리 — 3차 출처뿐이었고 1차로 지목됐던
//     『피에르 퀴리』(1923) 전문에 해당 문장이 없음을 확인했다.

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
    id: 62,
    text: {
      ko: "시 삼백 편은 대개 성현이 발분하여 지은 것이다.",
      en: "The three hundred poems of the Odes were, for the most part, written by worthies and sages pouring out their indignation.",
    },
    author: {
      ko: "사마천",
      en: "Sima Qian",
    },
    original: "詩三百篇，大抵賢聖發憤之所為作也",
    lang: "lzh",
    source: "『사기』 권130 태사공자서",
    year: -91,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E5%8F%B2%E8%A8%98/%E5%8D%B7130",
    tags: ["oriental", "meaning"],
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
];
