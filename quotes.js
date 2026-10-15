// 수록 기준: QUOTE_STANDARDS.md. 근거가 그 시대의 기록까지 이어지고 위치를 댈 수
// 있는 명언만 싣는다(원문 대조 또는 믿을 만한 2차 자료의 인용 확인).
// 모든 항목은 original, lang, source, year, sourceUrl을 반드시 포함한다.
// source 는 { ko, en } — 작가 이름을 누르면 열리는 출처 시트에 보인다.
// kind 는 책·시 같은 저작이 아닐 때만 붙인다(speech·letter·diary·interview·
// calligraphy·inscription·testimony). QUOTE_STANDARDS.md 2장.
// circa: true — 연도가 대략이다(고대·중세 저작). 출처 쪽지에 「~년경」으로 보인다.
// cited: true — 아래 [B] 인용 확인 항목. 쪽지의 링크가 「출처 확인 자료」가 된다.
// 출처를 제시할 수 없으면 등재하지 않는다. 애매하면 탈락시킨다.
//
// id 규칙: app.js의 즐겨찾기가 id로만 매칭하므로 id는 절대 재사용하지 않는다.
// 삭제된 id: 1,2,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24,25,26,
//            27,28,29,31,32,33,34,35,36,38,39,40,49,62
// 다음 id: 178
//
// ── 이중 언어 ────────────────────────────────────────────────────────────
// text 와 author 는 { ko, en } 이다. 화면은 q.text[lang] 으로 읽는다.
//
// text.en 은 세 가지 경로로 만들어졌다.
//
//  1) original 그대로 (78개) — lang 이 "en" 인 항목. 이미 1차 출처와 문자
//     그대로 대조를 마친 문장이라 번역을 거치지 않는 것이 가장 정확하다.
//     예외는 id 54 처칠과 id 4 노자 — 각각 연설과 문장의 중간을 잘라온 것이라
//     소문자로 시작해서, 화면에 단독으로 놓이는 만큼 첫 글자만 대문자로 올렸다.
//     (82 페인, 84 스티븐슨, 101 앤 브론테, 104 메리 셸리, 정본 영역의
//      93 아우렐리우스도 같다. 134 엘리엇은 첫머리 접속사 「But」 를 떼고
//      대문자로 올렸다.)
//
//  2) 공개된 정본 영역 (30개) — translator 필드가 있는 항목. 번역자와 그
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
//       id 141 노자      James Legge
//       id 142 맹자      James Legge
//       id 154 증자      James Legge
//       id 158 몽테뉴     Charles Cotton
//       id 168 자공      James Legge
//       id 173 자하      James Legge
//       id 177 공자      James Legge
//
//  3) 자체 번역 (33개) — translator 가 없는 항목. 공개된 정본 영역을 찾지
//     못해 original 에서 직접 옮겼다. id 41,42,45,56,59,60,63,64,71,79,
//     87,88,91,106,107,114,115,124,125,126,128,129,130,146,147,149,151,163,165,166,167,169,172. (59·114·115·129 는
//     한국어 원문이라 text.en 만 자체 번역이다.)
//     정본을 찾으면 여기서 2)로 승급시킨다.
//
// translator 가 없다는 것은 자체 번역이라는 뜻이다. 이 규칙을 바꾸지 말 것.
//
// 한국어 text 는 반드시 original 에서 번역한다. 원문의 주장(주어/서술어/한정
// 조건)을 바꾸는 의역은 금지한다. 영어도 같은 규율을 따른다.
//
// ── 검증 상태 ────────────────────────────────────────────────────────
// [A] sourceUrl을 직접 열어 original이 문자 그대로 있음을 대조 완료:
//     3, 4, 30, 37, 43, 44, 45, 46, 47, 48, 51, 53, 54, 56~61, 63~71, 82~177
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
//      전사가 「ἄνδραδιαλέγεσθαι」로 붙여 쓴 것을 띄어 적고 글자 단위로 대조했다.
//      137 에디슨은 에디슨이 쓴 글이 아니라 곁에서 들은 월터 맬러리의 증언이다 —
//      에디슨 생전(1910)에 나온 전기에 실렸다(v1.6 근거 2 「직접 들은 사람의 기록」).
//      138 루스벨트·142 맹자는 혼자 서는 구간을 발췌했다(v1.9). 138 은 문장 중간이라
//      첫 글자를 대문자로 올렸고, 142 는 앞 구절(有為者辟若掘井)까지 넣으면 Legge
//      영역이 205자로 영어 상한을 넘었다. 145 제임스는 작품 속 인물(스트레더)의 말이다.
//      149 괴테는 Taylor 영역 2부를 찾지 못해 자체 번역이다(30·119 는 Taylor 1부). 151 안데르센은
//      동화 속 나비의 말, 155 프랭클린은 113 처럼 「가난한 리처드」 격언 인용이다.
//      157 루스벨트·164 켈러는 문장 중간이라 첫 글자를 대문자로 올렸다. 159 존슨은 소설 속
//      장인의 대사로, 그는 뒤에 날다가 호수에 떨어진다 — 맥락은 풍자지만 문장 자체를 실었다.
//      165 이백은 위키문헌의 이문 주석(「一作…」)을 빼고 본문 그대로 대조했다.
//      171 엘리엇은 맺음말 문장의 앞부분을 발췌했다(v1.9). 174 키츠는 원문의 「--」를 「—」로,
//      뒤 문장 머리의 대문자(Even·Proverb·Life)를 소문자로 적었다.
//      177 은 『논어』 첫 구절로 motimoti 의 모토다. 저자당 상한을 전체의 3% 로 바꾼 뒤(v1.11)
//      공자의 4번째로 실었다. 時 는 「때때로」(널리 알려진 풀이)로, Legge 는 「늘 꾸준히」로 읽었다.)
// [B] 인용 확인(QUOTE_STANDARDS.md v1.6 ②) — 원문이 온라인에 없거나 이 환경에서
//     열리지 않아, 원문 위치를 짚어 인용한 2차 자료로 문구를 대조한 항목:
//     6(스탠퍼드 연설 2005.6.12), 21(LIFE 1955.5.2), 41(『난중일기』 1597.9.15),
//     42(유묵, 보물 제569-2호), 50(Cook 1913 1권 506쪽),
//     52(베겔러에게 보낸 편지 1801.11.16), 55(Harper's Monthly 1932, 165권 987호 406쪽)
//     원문을 열 기회가 생기면 [A] 로 올린다. 일부러 찾아다니지는 않는다.
//     이 목록의 항목에는 cited: true 를 붙인다(check-data 가 둘이 같은지 본다).
// [C] (v1.6 에서 [B] 로 합쳤다 — 예전 「대체 페이지로 대조」 4건)
// [D] 재검증에서 삭제: 49 마리 퀴리 — 3차 출처뿐이었고 1차로 지목됐던
//     『피에르 퀴리』(1923) 전문에 해당 문장이 없음을 확인했다.
//     62 사마천 「시 삼백 편은 대개 성현이 발분하여 지은 것이다」 — 출처는
//     확실했으나(『사기』 태사공자서) 문장 혼자로는 뜻이 서지 않았다. 원문에서
//     이 구절은 여덟 개 예시의 마지막 항목이고, 결론은 그 다음 문장에 있다.
//     목록을 떼어내면 "『시경』의 저자가 누구인가" 라는 말로만 읽힌다.
//     같은 뜻을 혼자 설 수 있는 문장으로 옮겨 담은 것이 id 71 이다.
// [E] 기준 재검토 (2026-10-09) — 자립성(v1.1)·발전성(v1.3) 이전에 등재된 3~81 중
//     걸릴 만한 넷을 원전 맥락과 함께 다시 봤다. 같은 문장을 다듬은 것이라 id 는 유지.
//     59 김구: 주어가 「우리나라」라 혼자 놓으면 「누가, 왜」가 비었다. 원전의 바로
//        다음 문장(이유)까지 이어 실었다.
//     63 한비: 경고로 끝나지만 「작은 구멍을 막으면 된다」는 길이 그림 안에 있어
//        일침으로 본다(90 공자와 같은 판단). 태그만 warning → preparation 등으로.
//     65 올컷: 뒷문장(「너희는 결코 아버지 없는 아이가 될 수 없다」)이 맥락 없이는
//        서지 않아 앞 절만 남겼다. 소설에서도 딸들이 이 절을 「우리의 좌우명」으로
//        따로 인용한다. 「keep busy」 를 「부지런히 일하라」로 옮겼던 것을 「손을
//        놓지 마라」로, 출처의 「편지」를 「말」로 바로잡았다(떠나며 한 말이다).
//     60 정약용: 규칙 위반은 아니나 수령의 몸가짐 수칙이라 동기부여와 가장 멀다.
//        같은 조에 더 나은 대체 문장이 없어 그대로 둔다 — 가장 약한 카드로 기록.
//   (2026-10-12, v1.9 「원문에 충실한 것이 짧은 것보다 앞선다」) 짧게 쓰려고 뜻을
//     덜어낸 한국어판을 고쳤다. 51 「오직 그렇게 해야만」, 57 「독립된 의지를 지닌」을
//     되살리고, 70 「…가 아니라」를 원문의 비교 「…보다는」으로. 81 은 문장 중간
//     「whatever the line of it may be」를 생략 표시 없이 뺐었는데, 되살리면 201자로
//     영어 상한을 넘어 혼자 서는 둘째 문장을 발췌했다(original 도 그 구간으로).

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
    source: {
      ko: "『부자가 되는 길(The Way to Wealth)』 / 가난한 리처드의 달력",
      en: "*The Way to Wealth*, preface to *Poor Richard's Almanack*",
    },
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
    source: {
      ko: "『도덕경』 제64장 (왕필본)",
      en: "*Tao Te Ching*, ch. 64 (Wang Bi edition)",
    },
    year: -400,
    circa: true,
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
    source: {
      ko: "스탠퍼드대 졸업식 연설 (6월 12일)",
      en: "Stanford Commencement Address, June 12",
    },
    kind: "speech",
    year: 2005,
    sourceUrl: "https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says",
    cited: true,
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
    source: {
      ko: "LIFE 「Death of a Genius」 (윌리엄 밀러 기록, 5월 2일자)",
      en: "\"Death of a Genius,\" *LIFE*, May 2 — recorded by William Miller",
    },
    kind: "interview",
    year: 1955,
    sourceUrl: "https://quoteinvestigator.com/2017/11/20/value/",
    cited: true,
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
    source: {
      ko: "『파우스트』 1부 (서재 장면, 메피스토펠레스의 대사)",
      en: "*Faust*, Part One — the study scene, Mephistopheles",
    },
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
    source: {
      ko: "두에 강연 — 릴 대학 이학부 개설 기념 (12월 7일)",
      en: "Address at Douai, opening of the Faculty of Sciences of Lille, December 7",
    },
    kind: "speech",
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
    source: {
      ko: "『난중일기』 1597년 음력 9월 15일 (명량해전 전날)",
      en: "*War Diary* (Nanjung Ilgi), 15th day of the 9th month — eve of the Battle of Myeongnyang",
    },
    kind: "diary",
    year: 1597,
    sourceUrl: "https://ko.wikiquote.org/wiki/%EC%9D%B4%EC%88%9C%EC%8B%A0",
    cited: true,
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
    source: {
      ko: "유묵 (보물 제569-2호), 뤼순 감옥",
      en: "Calligraphy written in Lüshun Prison (Korean Treasure No. 569-2)",
    },
    kind: "calligraphy",
    year: 1910,
    sourceUrl: "https://ko.wikipedia.org/wiki/%EC%95%88%EC%A4%91%EA%B7%BC",
    cited: true,
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
    source: {
      ko: "『논어』 자한편 25",
      en: "*Analects* 9.25 (Zi Han)",
    },
    year: -450,
    circa: true,
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
    source: {
      ko: "『맹자』 고자하 15",
      en: "*Mencius* 6B.15 (Gaozi, Part II)",
    },
    year: -300,
    circa: true,
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
    source: {
      ko: "단편소설 「고향(故鄕)」, 『신청년』 제9권 제1호",
      en: "\"My Old Home\" (Guxiang), short story — *New Youth*, vol. 9, no. 1",
    },
    year: 1921,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E6%95%85%E9%84%89",
    tags: ["hope", "challenge"],
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
    source: {
      ko: "『도덕서한(Epistulae Morales)』 104편 26절",
      en: "*Moral Letters to Lucilius*, 104.26",
    },
    year: 65,
    circa: true,
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
    source: {
      ko: "『월든』 결론장",
      en: "*Walden*, Conclusion",
    },
    year: 1854,
    sourceUrl: "https://www.gutenberg.org/files/205/205-h/205-h.htm",
    tags: ["challenge", "hope"],
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
    source: {
      ko: "에세이 『낙관론(Optimism)』",
      en: "*Optimism*, an essay",
    },
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
    source: {
      ko: "힐러리 본햄 카터에게 보낸 편지 / E. 쿡 『The Life of Florence Nightingale』(1913) 1권 506쪽 수록",
      en: "Letter to Hilary Bonham Carter — quoted in E. T. Cook, *The Life of Florence Nightingale* (1913), vol. 1, p. 506",
    },
    kind: "letter",
    year: 1861,
    sourceUrl: "https://quoteinvestigator.com/2016/07/30/excuse/",
    cited: true,
    tags: ["success", "perseverance"],
  },
  {
    id: 51,
    text: {
      ko: "네 안에서 「너는 화가가 아니다」라고 말하거든 바로 그때 그려라, 친구여. 그러면 그 목소리도 잠잠해진다. 오직 그렇게 해야만.",
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
    source: {
      ko: "테오에게 보낸 편지 400번, 니우암스테르담 (10월 28일)",
      en: "Letter to Theo, no. 400 — Nieuw-Amsterdam, October 28",
    },
    kind: "letter",
    year: 1883,
    sourceUrl: "https://vangoghletters.org/vg/letters/let400/print.html",
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
    source: {
      ko: "베겔러에게 보낸 편지, 빈 (11월 16일) — 베토벤하우스 소장 자필본",
      en: "Letter to Franz Wegeler, Vienna, November 16 — autograph held by the Beethoven-Haus Bonn",
    },
    kind: "letter",
    year: 1801,
    sourceUrl: "https://www.beethoven.de/de/media/view/4862695861911552/Ludwig+van+Beethoven,+Brief+an+Franz+Gerhard+Wegeler+in+Bonn,+Wien,+16.+November+1801,+Autograph",
    cited: true,
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
    source: {
      ko: "서인도 해방 기념 연설, 커낸다이과 (8월 3일)",
      en: "West India Emancipation speech, Canandaigua, August 3",
    },
    kind: "speech",
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
    source: {
      ko: "해로 스쿨 연설 (10월 29일)",
      en: "Speech at Harrow School, October 29",
    },
    kind: "speech",
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
    source: {
      ko: "Harper's Monthly 165권 987호 406쪽 인터뷰",
      en: "Interview, *Harper's Monthly*, vol. 165, no. 987, p. 406",
    },
    kind: "interview",
    year: 1932,
    sourceUrl: "https://en.wikiquote.org/wiki/Thomas_Edison",
    cited: true,
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
    source: {
      ko: "『순자』 권학편",
      en: "*Xunzi*, \"Encouraging Learning\" (Quan Xue)",
    },
    year: -250,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%8D%80%E5%AD%90/%E5%8B%B8%E5%AD%B8%E7%AF%87",
    tags: ["perseverance", "challenge"],
  },
  {
    id: 57,
    text: {
      ko: "나는 새가 아니다. 어떤 그물도 나를 가두지 못한다. 나는 독립된 의지를 지닌 자유로운 인간이다.",
      en: "I am no bird; and no net ensnares me; I am a free human being with an independent will.",
    },
    author: {
      ko: "샬럿 브론테",
      en: "Charlotte Brontë",
    },
    original: "I am no bird; and no net ensnares me; I am a free human being with an independent will.",
    lang: "en",
    source: {
      ko: "『제인 에어』 23장",
      en: "*Jane Eyre*, ch. 23",
    },
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
    source: {
      ko: "시 「Hope」, 『Poems by Emily Dickinson』 제2집",
      en: "\"Hope is the thing with feathers\" — *Poems*, Second Series",
    },
    year: 1891,
    sourceUrl: "https://www.gutenberg.org/cache/epub/12242/pg12242.txt",
    tags: ["hope", "energy"],
  },
  {
    id: 59,
    text: {
      ko: "오직 한없이 가지고 싶은 것은 높은 문화의 힘이다. 문화의 힘은 우리 자신을 행복하게 하고, 나아가서 남에게 행복을 주겠기 때문이다.",
      en: "The one thing I want without limit is the power of a high culture, for the power of culture makes us happy and, beyond that, brings happiness to others.",
    },
    author: {
      ko: "김구",
      en: "Kim Ku",
    },
    original: "오직 한없이 가지고 싶은 것은 높은 문화의 힘이다. 문화의 힘은 우리 자신을 행복하게 하고, 나아가서 남에게 행복을 주겠기 때문이다.",
    lang: "ko",
    source: {
      ko: "『백범일지』 「내가 원하는 우리 나라」",
      en: "*Baekbeom Ilji*, \"The Country I Want\"",
    },
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
    source: {
      ko: "『목민심서』 율기 제1조 칙궁",
      en: "*Mongmin Simseo* (Admonitions on Governing the People), \"Yulgi,\" art. 1",
    },
    year: 1818,
    sourceUrl: "https://ko.wikisource.org/wiki/%EB%AA%A9%EB%AF%BC%EC%8B%AC%EC%84%9C/%EC%9C%A8%EA%B8%B0",
    tags: ["energy"],
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
    source: {
      ko: "『여성의 권리 옹호』 4장",
      en: "*A Vindication of the Rights of Woman*, ch. 4",
    },
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
    source: {
      ko: "『한비자』 유로편",
      en: "*Han Feizi*, \"Illustrations of Laozi\" (Yu Lao)",
    },
    year: -233,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%9F%93%E9%9D%9E%E5%AD%90/%E5%96%BB%E8%80%81",
    tags: ["preparation", "perseverance"],
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
    source: {
      ko: "「이소(離騷)」",
      en: "\"Li Sao\" (Encountering Sorrow)",
    },
    year: -300,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%9B%A2%E9%A8%B7",
    tags: ["challenge", "energy"],
  },
  {
    id: 65,
    text: {
      ko: "희망을 품고, 손을 놓지 마라.",
      en: "Hope and keep busy.",
    },
    author: {
      ko: "루이자 메이 올컷",
      en: "Louisa May Alcott",
    },
    original: "Hope and keep busy;",
    lang: "en",
    source: {
      ko: "『작은 아씨들』 15장 「전보」, 떠나며 딸들에게 한 마치 부인의 말",
      en: "*Little Women*, ch. 15, \"A Telegram\" — Mrs. March, leaving her daughters",
    },
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
    source: {
      ko: "『명상록』 5권 16",
      en: "*Meditations* 5.16",
    },
    year: 180,
    circa: true,
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
    source: {
      ko: "『엥케이리디온』 5",
      en: "*Enchiridion* 5",
    },
    year: 125,
    circa: true,
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
    source: {
      ko: "『우상의 황혼』 잠언과 화살 12",
      en: "*Twilight of the Idols*, \"Maxims and Arrows\" 12",
    },
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
    source: {
      ko: "『자기 신뢰(Self-Reliance)』",
      en: "\"Self-Reliance\" — *Essays: First Series*",
    },
    year: 1841,
    sourceUrl: "https://www.gutenberg.org/cache/epub/16643/pg16643.txt",
    tags: ["challenge", "freedom"],
  },
  {
    id: 70,
    text: {
      ko: "성공은 그가 오른 자리보다는, 성공하려 애쓰며 넘어선 장애물로 재야 한다.",
      en: "I have learned that success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
    },
    author: {
      ko: "부커 T. 워싱턴",
      en: "Booker T. Washington",
    },
    original: "I have learned that success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome while trying to succeed.",
    lang: "en",
    source: {
      ko: "『노예에서 일어서서(Up from Slavery)』 3장",
      en: "*Up from Slavery*, ch. 3",
    },
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
    source: {
      ko: "『한서』 권62 사마천전 「보임안서」",
      en: "Letter to Ren An — *Book of Han*, vol. 62, Biography of Sima Qian",
    },
    kind: "letter",
    year: -93,
    circa: true,
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
    source: {
      ko: "『시집(Poems)』 「인빅터스」",
      en: "\"Invictus\" — *Poems*",
    },
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
    source: {
      ko: "『실낙원』 1권",
      en: "*Paradise Lost*, Book 1",
    },
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
    source: {
      ko: "『자에는 자로』 1막 4장, 루치오의 대사",
      en: "*Measure for Measure*, Act 1, Scene 4 — Lucio",
    },
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
    source: {
      ko: "『윈더미어 부인의 부채』 3막, 달링턴 경의 대사",
      en: "*Lady Windermere's Fan*, Act 3 — Lord Darlington",
    },
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
    source: {
      ko: "『자유론』 1장",
      en: "*On Liberty*, ch. 1",
    },
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
    source: {
      ko: "『라셀라스』 13장",
      en: "*Rasselas*, ch. 13",
    },
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
    source: {
      ko: "「안드레아 델 사르토」",
      en: "\"Andrea del Sarto\" — *Men and Women*",
    },
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
    source: {
      ko: "『전당시』 권216 「망악(望嶽)」",
      en: "\"Gazing at the Mountain\" (Wang Yue) — *Complete Tang Poems*, vol. 216",
    },
    year: 736,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/wiki/%E6%9C%9B%E5%B6%BD_(%E5%B2%B1%E5%AE%97%E5%A4%AB%E5%A6%82%E4%BD%95)",
    tags: ["challenge"],
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
    source: {
      ko: "『논어』 술이편 21",
      en: "*Analects* 7.21 (Shu Er)",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["preparation"],
  },
  {
    id: 81,
    text: {
      ko: "일하는 날의 매시간을 성실히 바쁘게 보낸다면, 마지막 결과는 저절로 되도록 맡겨 두어도 좋다.",
      en: "If he keep faithfully busy each hour of the working day, he may safely leave the final result to itself.",
    },
    author: {
      ko: "윌리엄 제임스",
      en: "William James",
    },
    original: "If he keep faithfully busy each hour of the working day, he may safely leave the final result to itself.",
    lang: "en",
    source: {
      ko: "『교사에게 하는 심리학 강의』 8장 「습관의 법칙」",
      en: "*Talks to Teachers on Psychology*, ch. 8, \"The Laws of Habit\"",
    },
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
    source: {
      ko: "『아메리카의 위기(The American Crisis)』 제1호",
      en: "*The American Crisis*, No. 1",
    },
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
    source: {
      ko: "『자조론(Self-Help)』 11장",
      en: "*Self-Help*, ch. 11",
    },
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
    source: {
      ko: "『젊은이들을 위하여(Virginibus Puerisque)』 「엘도라도」",
      en: "\"El Dorado\" — *Virginibus Puerisque*",
    },
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
    source: {
      ko: "『시집(Poems)』 「율리시스」",
      en: "\"Ulysses\" — *Poems*",
    },
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
    source: {
      ko: "『밤의 목소리(Voices of the Night)』 「인생 찬가(A Psalm of Life)」",
      en: "\"A Psalm of Life\" — *Voices of the Night*",
    },
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
    source: {
      ko: "『아이네이스』 1권 203행",
      en: "*Aeneid* 1.203",
    },
    year: -19,
    circa: true,
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
    source: {
      ko: "『사랑의 노래(Amores)』 3권 11a편",
      en: "*Amores* 3.11a",
    },
    year: -16,
    circa: true,
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
    source: {
      ko: "『도덕서한(Epistulae Morales)』 13편 4절",
      en: "*Moral Letters to Lucilius*, 13.4",
    },
    year: 65,
    circa: true,
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
    source: {
      ko: "『논어』 위령공편 29",
      en: "*Analects* 15.29 (Wei Ling Gong)",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%AB%96%E8%AA%9E/%E8%A1%9E%E9%9D%88%E5%85%AC%E7%AC%AC%E5%8D%81%E4%BA%94",
    tags: ["failure"],
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
    source: {
      ko: "『중용』 20장",
      en: "*Doctrine of the Mean*, ch. 20",
    },
    year: -400,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E7%A6%AE%E8%A8%98/%E4%B8%AD%E5%BA%B8",
    tags: ["perseverance"],
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
    source: {
      ko: "『나의 삶과 일(My Life and Work)』 서문",
      en: "*My Life and Work*, Introduction",
    },
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
    source: {
      ko: "『명상록』 5권 20",
      en: "*Meditations* 5.20",
    },
    year: 180,
    circa: true,
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
    source: {
      ko: "『작은 아씨들』 44장 (에이미의 대사)",
      en: "*Little Women*, ch. 44 — Amy",
    },
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
    source: {
      ko: "『미들마치』 72장 (도러시아의 대사)",
      en: "*Middlemarch*, ch. 72 — Dorothea",
    },
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
    source: {
      ko: "『에세이 1집』 「원(Circles)」",
      en: "\"Circles\" — *Essays: First Series*",
    },
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
    source: {
      ko: "『도덕경』 제33장 (왕필본)",
      en: "*Tao Te Ching*, ch. 33 (Wang Bi edition)",
    },
    year: -400,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%81%93%E5%BE%B7%E7%B6%93_(%E7%8E%8B%E5%BC%BC%E6%9C%AC)",
    tags: ["challenge"],
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
    source: {
      ko: "『에세』 1권 39장 「고독에 대하여」",
      en: "*Essays*, Book 1, ch. 39, \"Of Solitude\"",
    },
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
    source: {
      ko: "에세이 『낙관론(Optimism)』",
      en: "*Optimism*, an essay",
    },
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
    source: {
      ko: "『과거와 현재(Past and Present)』 3권 11장 「노동」",
      en: "*Past and Present*, Book 3, ch. 11, \"Labour\"",
    },
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
    source: {
      ko: "시 「좁은 길(The Narrow Way)」",
      en: "\"The Narrow Way\"",
    },
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
    source: {
      ko: "『시집 제3집(Poems, Third Series)』 「새벽(Dawn)」",
      en: "\"Dawn\" — *Poems*, Third Series",
    },
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
    source: {
      ko: "「분투하는 삶(The Strenuous Life)」 해밀턴 클럽 연설, 시카고 (4월 10일)",
      en: "\"The Strenuous Life,\" speech to the Hamilton Club, Chicago, April 10",
    },
    kind: "speech",
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
    source: {
      ko: "『프랑켄슈타인』 (1818년 초판) 월턴의 첫 번째 편지",
      en: "*Frankenstein* (1818 edition), Walton's first letter",
    },
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
    source: {
      ko: "『대학』 전2장 (탕왕의 세숫대야에 새긴 글)",
      en: "Inscription on King Tang's washbasin — *The Great Learning*, commentary ch. 2",
    },
    kind: "inscription",
    year: -1600,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E7%A6%AE%E8%A8%98/%E5%A4%A7%E5%AD%B8",
    tags: ["energy", "challenge"],
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
    source: {
      ko: "『맹자』 이루하 8",
      en: "*Mencius* 4B.8 (Li Lou, Part II)",
    },
    year: -300,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E5%AD%9F%E5%AD%90/%E9%9B%A2%E5%A9%81%E4%B8%8B",
    tags: ["preparation"],
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
    source: {
      ko: "『서간집(Epistulae)』 1권 2편 40행",
      en: "*Epistles* 1.2.40",
    },
    year: -20,
    circa: true,
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
    source: {
      ko: "『얼간이 윌슨(Pudd'nhead Wilson)』 12장 「얼간이 윌슨의 달력」",
      en: "*Pudd'nhead Wilson*, ch. 12, \"Pudd'nhead Wilson's Calendar\"",
    },
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
    source: {
      ko: "『줄리어스 시저』 2막 2장, 시저의 대사",
      en: "*Julius Caesar*, Act 2, Scene 2 — Caesar",
    },
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
    source: {
      ko: "『제인 에어』 6장, 헬렌 번스의 대사",
      en: "*Jane Eyre*, ch. 6 — Helen Burns",
    },
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
    source: {
      ko: "『도덕서한(Epistulae Morales)』 1편 3절",
      en: "*Moral Letters to Lucilius*, 1.3",
    },
    year: 65,
    circa: true,
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
    source: {
      ko: "『돈키호테』 1부 21장, 돈키호테의 대사(속담 인용)",
      en: "*Don Quixote*, Part One, ch. 21 — Don Quixote, quoting a proverb",
    },
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
    source: {
      ko: "『부자가 되는 길(The Way to Wealth)』, 에이브러햄 영감의 연설(속담 인용)",
      en: "*The Way to Wealth* — Father Abraham's speech, quoting a proverb",
    },
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
    source: {
      ko: "『님의 침묵』 「님의 침묵」",
      en: "\"The Silence of Love\" — *The Silence of Love* (Nim-ui Chimmuk)",
    },
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
    source: {
      ko: "『하늘과 바람과 별과 시』(1948 초판) 「서시」",
      en: "\"Prologue\" (Seosi) — *Sky, Wind, Stars and Poems* (first edition, 1948)",
    },
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
    source: {
      ko: "『천국과 지옥의 결혼』 「악마의 목소리」",
      en: "*The Marriage of Heaven and Hell*, \"The Voice of the Devil\"",
    },
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
    source: {
      ko: "『산의 막간(Mountain Interval)』 「가지 않은 길」",
      en: "\"The Road Not Taken\" — *Mountain Interval*",
    },
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
    source: {
      ko: "「서풍에 부치는 노래(Ode to the West Wind)」",
      en: "\"Ode to the West Wind\"",
    },
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
    source: {
      ko: "『파우스트』 1부 「천상의 서곡」, 주님의 대사",
      en: "*Faust*, Part One, \"Prologue in Heaven\" — the Lord",
    },
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
    source: {
      ko: "『예언자』 「일에 대하여」",
      en: "*The Prophet*, \"On Work\"",
    },
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
    source: {
      ko: "『자기 신뢰(Self-Reliance)』",
      en: "\"Self-Reliance\" — *Essays: First Series*",
    },
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
    source: {
      ko: "『인간론(An Essay on Man)』 제1서간",
      en: "*An Essay on Man*, Epistle 1",
    },
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
    source: {
      ko: "『작은 아씨들』 13장 「공중누각」, 조의 대사",
      en: "*Little Women*, ch. 13, \"Castles in the Air\" — Jo",
    },
    year: 1868,
    sourceUrl: "https://www.gutenberg.org/cache/epub/514/pg514.txt",
    tags: ["passion", "challenge"],
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
    source: {
      ko: "『아이네이스』 5권 231행",
      en: "*Aeneid* 5.231",
    },
    year: -19,
    circa: true,
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
    source: {
      ko: "『송가(Carmina)』 1권 11편",
      en: "*Odes* 1.11",
    },
    year: -23,
    circa: true,
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
    source: {
      ko: "『흑해에서 보낸 편지(Epistulae ex Ponto)』 4권 10편 5행",
      en: "*Letters from the Black Sea* (Epistulae ex Ponto) 4.10.5",
    },
    year: 13,
    circa: true,
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
    source: {
      ko: "『신곡』 지옥편 26곡, 율리시스의 대사",
      en: "*Divine Comedy*, *Inferno*, Canto 26 — Ulysses",
    },
    year: 1320,
    circa: true,
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
    source: {
      ko: "『우화』 6권 10 「토끼와 거북」",
      en: "*Fables*, Book 6, no. 10, \"The Hare and the Tortoise\"",
    },
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
    source: {
      ko: "『하늘과 바람과 별과 시』(1948 초판) 「새로운 길」",
      en: "\"New Road\" (Saeroun Gil) — *Sky, Wind, Stars and Poems* (first edition, 1948)",
    },
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
    source: {
      ko: "「행로난(行路難)」 제1수",
      en: "\"The Hard Road\" (Xing Lu Nan), no. 1",
    },
    year: 744,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%A1%8C%E8%B7%AF%E9%9B%A3_(%E9%87%91%E6%A8%BD%E6%B8%85%E9%85%92%E6%96%97%E5%8D%81%E5%8D%83)",
    tags: ["hope", "challenge"],
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
    source: {
      ko: "『오만과 편견』 31장, 엘리자베스의 대사",
      en: "*Pride and Prejudice*, ch. 31 — Elizabeth",
    },
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
    source: {
      ko: "쿠퍼 유니언 연설, 뉴욕 (2월 27일)",
      en: "Cooper Union Address, New York, February 27",
    },
    kind: "speech",
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
    source: {
      ko: "『명상록』 10권 16",
      en: "*Meditations* 10.16",
    },
    year: 180,
    circa: true,
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
    source: {
      ko: "『미들마치』 51장",
      en: "*Middlemarch*, ch. 51",
    },
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
    source: {
      ko: "『월든』 2장 「내가 살았던 곳, 그리고 살았던 이유」",
      en: "*Walden*, ch. 2, \"Where I Lived, and What I Lived For\"",
    },
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
    source: {
      ko: "『햄릿』 1막 3장, 폴로니어스의 대사",
      en: "*Hamlet*, Act 1, Scene 3 — Polonius",
    },
    year: 1600,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1524/pg1524.txt",
    tags: ["freedom", "meaning"],
  },
  {
    id: 137,
    text: {
      ko: "결과라니! 이보게, 결과는 많이 얻었네! 안 되는 방법을 수천 가지나 알게 됐으니.",
      en: "Results! Why, man, I have gotten a lot of results! I know several thousand things that won't work.",
    },
    author: {
      ko: "토머스 에디슨",
      en: "Thomas Edison",
    },
    original: "Results! Why, man, I have gotten a lot of results! I know several thousand things that won't work.",
    lang: "en",
    source: {
      ko: "『에디슨: 그의 생애와 발명』(다이어·마틴) — 축전지 실험 중 월터 S. 맬러리에게 한 말, 맬러리의 증언",
      en: "Recalled by Walter S. Mallory, during the storage-battery experiments — Dyer & Martin, *Edison: His Life and Inventions*",
    },
    kind: "testimony",
    year: 1910,
    sourceUrl: "https://www.gutenberg.org/cache/epub/820/pg820.txt",
    tags: ["failure", "perseverance"],
  },
  {
    id: 138,
    text: {
      ko: "실수와 부족함이 없는 노력은 없다.",
      en: "There is no effort without error and shortcoming.",
    },
    author: {
      ko: "시어도어 루스벨트",
      en: "Theodore Roosevelt",
    },
    original: "there is no effort without error and shortcoming",
    lang: "en",
    source: {
      ko: "「공화국의 시민권」 연설(「경기장의 사나이」), 파리 소르본 (4월 23일)",
      en: "\"Citizenship in a Republic\" (\"The Man in the Arena\"), the Sorbonne, Paris, April 23",
    },
    kind: "speech",
    year: 1910,
    sourceUrl: "https://en.wikisource.org/wiki/Citizenship_in_a_Republic",
    tags: ["failure", "challenge"],
  },
  {
    id: 139,
    text: {
      ko: "나는 실패를 두려워한 적이 없다. 가장 위대한 이들 가운데 들지 못하느니 차라리 실패하겠다.",
      en: "I was never afraid of failure; for I would sooner fail than not be among the greatest.",
    },
    author: {
      ko: "존 키츠",
      en: "John Keats",
    },
    original: "I was never afraid of failure; for I would sooner fail than not be among the greatest",
    lang: "en",
    source: {
      ko: "제임스 헤시에게 보낸 편지 (10월 8일)",
      en: "Letter to James Hessey, October 8",
    },
    kind: "letter",
    year: 1818,
    sourceUrl: "https://www.gutenberg.org/cache/epub/35698/pg35698.txt",
    tags: ["failure", "passion"],
  },
  {
    id: 140,
    text: {
      ko: "위인들이 올라 지켜 낸 높은 곳은 단숨에 날아올라 닿은 것이 아니다. 동료들이 잠든 사이, 그들은 밤새 위로 애써 오르고 있었다.",
      en: "The heights by great men reached and kept were not attained by sudden flight, but they, while their companions slept, were toiling upward in the night.",
    },
    author: {
      ko: "헨리 워즈워스 롱펠로",
      en: "Henry Wadsworth Longfellow",
    },
    original: "The heights by great men reached and kept / Were not attained by sudden flight, / But they, while their companions slept, / Were toiling upward in the night.",
    lang: "en",
    source: {
      ko: "「성 아우구스티누스의 사다리」, 『철새들』",
      en: "\"The Ladder of Saint Augustine\" — *Birds of Passage*",
    },
    year: 1858,
    sourceUrl: "https://en.wikisource.org/wiki/Birds_of_Passage_(Collection)/The_Ladder_of_St._Augustine",
    tags: ["success", "perseverance"],
  },
  {
    id: 141,
    text: {
      ko: "큰 그릇은 늦게 이루어진다.",
      en: "A vessel great, it is the slowest made.",
    },
    author: {
      ko: "노자",
      en: "Laozi",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/216/pg216.txt",
    },
    original: "大器晚成",
    lang: "lzh",
    source: {
      ko: "『도덕경』 제41장 (왕필본)",
      en: "*Tao Te Ching*, ch. 41 (Wang Bi edition)",
    },
    year: -400,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%81%93%E5%BE%B7%E7%B6%93_(%E7%8E%8B%E5%BC%BC%E6%9C%AC)",
    tags: ["success", "perseverance"],
  },
  {
    id: 142,
    text: {
      ko: "우물을 아홉 길이나 파고도 샘에 닿기 전에 그만두면, 결국 버린 우물이다.",
      en: "To dig the well to a depth of seventy-two cubits, and stop without reaching the spring, is after all throwing away the well.",
    },
    author: {
      ko: "맹자",
      en: "Mencius",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter13",
    },
    original: "掘井九軔而不及泉，猶為棄井也",
    lang: "lzh",
    source: {
      ko: "『맹자』 진심상 29",
      en: "*Mencius* 7A.29 (Jin Xin, Part I)",
    },
    year: -300,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E5%AD%9F%E5%AD%90/%E7%9B%A1%E5%BF%83%E4%B8%8A",
    tags: ["perseverance", "success"],
  },
  {
    id: 143,
    text: {
      ko: "네 삶을 사랑하라, 그것이 아무리 초라할지라도.",
      en: "Love your life, poor as it is.",
    },
    author: {
      ko: "헨리 데이비드 소로",
      en: "Henry David Thoreau",
    },
    original: "Love your life, poor as it is.",
    lang: "en",
    source: {
      ko: "『월든』 「맺음말」",
      en: "*Walden*, Conclusion",
    },
    year: 1854,
    sourceUrl: "https://www.gutenberg.org/cache/epub/205/pg205.txt",
    tags: ["passion", "meaning"],
  },
  {
    id: 144,
    text: {
      ko: "한 사람의 마음이 무너지는 것을 막을 수 있다면, 나는 헛되이 사는 것이 아니리.",
      en: "If I can stop one heart from breaking, I shall not live in vain.",
    },
    author: {
      ko: "에밀리 디킨슨",
      en: "Emily Dickinson",
    },
    original: "If I can stop one heart from breaking, / I shall not live in vain;",
    lang: "en",
    source: {
      ko: "『에밀리 디킨슨 시집』 「삶」 6",
      en: "*Poems by Emily Dickinson*, \"Life\" 6",
    },
    year: 1890,
    sourceUrl: "https://www.gutenberg.org/cache/epub/12242/pg12242.txt",
    tags: ["meaning", "passion"],
  },
  {
    id: 145,
    text: {
      ko: "할 수 있는 한 마음껏 살아라. 그러지 않는 것은 실수다.",
      en: "Live all you can; it's a mistake not to.",
    },
    author: {
      ko: "헨리 제임스",
      en: "Henry James",
    },
    original: "Live all you can; it’s a mistake not to.",
    lang: "en",
    source: {
      ko: "『대사들(The Ambassadors)』 5부 2장, 스트레더의 말",
      en: "*The Ambassadors*, Book 5, ch. 2 — Strether",
    },
    year: 1903,
    sourceUrl: "https://www.gutenberg.org/cache/epub/432/pg432.txt",
    tags: ["passion", "energy"],
  },
  {
    id: 146,
    text: {
      ko: "학업은 부지런함으로 정밀해지고 놀이로 황폐해지며, 행실은 생각으로 이루어지고 되는 대로 함으로 무너진다.",
      en: "Learning is perfected by diligence and ruined by play; conduct is formed by thought and destroyed by drifting.",
    },
    author: {
      ko: "한유",
      en: "Han Yu",
    },
    original: "業精於勤，荒於嬉；行成於思，毀於隨",
    lang: "lzh",
    source: {
      ko: "「진학해(進學解)」",
      en: "\"An Explanation of Advancing in Learning\" (Jin Xue Jie)",
    },
    year: 812,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E9%80%B2%E5%AD%B8%E8%A7%A3",
    tags: ["preparation", "perseverance"],
  },
  {
    id: 147,
    text: {
      ko: "자기 자신의 지성을 사용할 용기를 가져라!",
      en: "Have the courage to use your own understanding!",
    },
    author: {
      ko: "임마누엘 칸트",
      en: "Immanuel Kant",
    },
    original: "Habe Muth dich deines eigenen Verstandes zu bedienen!",
    lang: "de",
    source: {
      ko: "「계몽이란 무엇인가에 대한 답변」",
      en: "\"An Answer to the Question: What Is Enlightenment?\"",
    },
    year: 1784,
    sourceUrl: "https://de.wikisource.org/wiki/Beantwortung_der_Frage:_Was_ist_Aufkl%C3%A4rung%3F",
    tags: ["freedom", "challenge"],
  },
  {
    id: 148,
    text: {
      ko: "무엇보다도, 양심에 따라 알고 말하고 자유롭게 논할 자유를 내게 달라.",
      en: "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
    },
    author: {
      ko: "존 밀턴",
      en: "John Milton",
    },
    original: "Give me the liberty to know, to utter, and to argue freely according to conscience, above all liberties.",
    lang: "en",
    source: {
      ko: "『아레오파기티카』",
      en: "*Areopagitica*",
    },
    year: 1644,
    sourceUrl: "https://www.gutenberg.org/cache/epub/608/pg608.txt",
    tags: ["freedom", "meaning"],
  },
  {
    id: 149,
    text: {
      ko: "날마다 쟁취해야 하는 사람만이 자유와 삶을 누릴 자격이 있다.",
      en: "Only he deserves freedom and life who must conquer them every day.",
    },
    author: {
      ko: "요한 볼프강 폰 괴테",
      en: "Johann Wolfgang von Goethe",
    },
    original: "Nur der verdient sich Freiheit wie das Leben, / Der täglich sie erobern muß.",
    lang: "de",
    source: {
      ko: "『파우스트』 2부 5막, 파우스트의 마지막 독백",
      en: "*Faust*, Part Two, Act 5 — Faust's last monologue",
    },
    year: 1832,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2230/pg2230.txt",
    tags: ["freedom", "perseverance"],
  },
  {
    id: 150,
    text: {
      ko: "여러분은 한 사람이 어떻게 노예가 되었는지 보았다. 이제 한 노예가 어떻게 사람이 되는지 보게 될 것이다.",
      en: "You have seen how a man was made a slave; you shall see how a slave was made a man.",
    },
    author: {
      ko: "프레더릭 더글러스",
      en: "Frederick Douglass",
    },
    original: "You have seen how a man was made a slave; you shall see how a slave was made a man.",
    lang: "en",
    source: {
      ko: "『프레더릭 더글러스의 삶 이야기』 10장",
      en: "*Narrative of the Life of Frederick Douglass*, ch. 10",
    },
    year: 1845,
    sourceUrl: "https://www.gutenberg.org/cache/epub/23/pg23.txt",
    tags: ["freedom", "challenge"],
  },
  {
    id: 151,
    text: {
      ko: "사는 것만으로는 부족해! 햇빛과 자유, 그리고 작은 꽃 한 송이가 있어야 해!",
      en: "Living is not enough! One must have sunshine, freedom, and a little flower!",
    },
    author: {
      ko: "한스 크리스티안 안데르센",
      en: "Hans Christian Andersen",
    },
    original: "„leve er ikke nok!” sagde han, „Solskin, Frihed og en lille Blomst maa man have!”",
    lang: "da",
    source: {
      ko: "동화 「나비」, 나비의 말",
      en: "\"The Butterfly,\" a fairy tale — the butterfly's words",
    },
    year: 1861,
    sourceUrl: "https://da.wikisource.org/wiki/Sommerfuglen",
    tags: ["passion", "freedom"],
  },
  {
    id: 152,
    text: {
      ko: "나와 함께 늙어 가자! 가장 좋은 날은 아직 오지 않았으니.",
      en: "Grow old along with me! The best is yet to be.",
    },
    author: {
      ko: "로버트 브라우닝",
      en: "Robert Browning",
    },
    original: "Grow old along with me! / The best is yet to be,",
    lang: "en",
    source: {
      ko: "「랍비 벤 에즈라」, 『극적 인물들』",
      en: "\"Rabbi Ben Ezra\" — *Dramatis Personae*",
    },
    year: 1864,
    sourceUrl: "https://en.wikisource.org/wiki/Dramatis_Person%C3%A6/Rabbi_Ben_Ezra",
    tags: ["hope", "passion"],
  },
  {
    id: 153,
    text: {
      ko: "밭을 가는 일에도 시를 쓰는 일만큼 존엄이 있음을 배우기 전까지, 어떤 민족도 번영할 수 없다.",
      en: "No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem.",
    },
    author: {
      ko: "부커 T. 워싱턴",
      en: "Booker T. Washington",
    },
    original: "No race can prosper till it learns that there is as much dignity in tilling a field as in writing a poem.",
    lang: "en",
    source: {
      ko: "애틀랜타 박람회 연설(1895) — 『노예에서 일어서서(Up from Slavery)』 14장 수록",
      en: "Atlanta Exposition Address (1895) — *Up from Slavery*, ch. 14",
    },
    kind: "speech",
    year: 1901,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2376/pg2376.txt",
    tags: ["passion", "preparation"],
  },
  {
    id: 154,
    text: {
      ko: "선비는 뜻이 넓고 굳세지 않으면 안 된다. 짐은 무겁고 길은 멀기 때문이다.",
      en: "The officer may not be without breadth of mind and vigorous endurance. His burden is heavy and his course is long.",
    },
    author: {
      ko: "증자",
      en: "Zengzi",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    original: "士不可以不弘毅，任重而道遠",
    lang: "lzh",
    source: {
      ko: "『논어』 태백편 7",
      en: "*Analects* 8.7 (Tai Bo)",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["perseverance", "meaning"],
  },
  {
    id: 155,
    text: {
      ko: "잃어버린 시간은 다시 찾을 수 없다.",
      en: "Lost time is never found again.",
    },
    author: {
      ko: "벤저민 프랭클린",
      en: "Benjamin Franklin",
    },
    original: "Lost time is never found again",
    lang: "en",
    source: {
      ko: "『부자가 되는 길(The Way to Wealth)』, 「가난한 리처드」의 격언(속담 인용)",
      en: "*The Way to Wealth* — a Poor Richard maxim, quoting a proverb",
    },
    year: 1758,
    sourceUrl: "https://en.wikisource.org/wiki/Way_to_wealth_(1)",
    tags: ["preparation", "energy"],
  },
  {
    id: 156,
    text: {
      ko: "해를 잃었다고 눈물 흘리면, 별들도 놓치고 만다.",
      en: "If you shed tears when you miss the sun, you also miss the stars.",
    },
    author: {
      ko: "라빈드라나트 타고르",
      en: "Rabindranath Tagore",
    },
    original: "If you shed tears when you miss the sun, you also miss the stars.",
    lang: "en",
    source: {
      ko: "『길 잃은 새(Stray Birds)』 6",
      en: "*Stray Birds* 6",
    },
    year: 1916,
    sourceUrl: "https://www.gutenberg.org/cache/epub/6524/pg6524.txt",
    tags: ["despair", "hope"],
  },
  {
    id: 157,
    text: {
      ko: "우리가 두려워해야 할 유일한 것은 두려움 그 자체다.",
      en: "The only thing we have to fear is fear itself.",
    },
    author: {
      ko: "프랭클린 D. 루스벨트",
      en: "Franklin D. Roosevelt",
    },
    original: "the only thing we have to fear is fear itself",
    lang: "en",
    source: {
      ko: "대통령 취임 연설 (3월 4일)",
      en: "First Inaugural Address, March 4",
    },
    kind: "speech",
    year: 1933,
    sourceUrl: "https://en.wikisource.org/wiki/Franklin_Roosevelt%27s_First_Inaugural_Address",
    tags: ["fear", "challenge"],
  },
  {
    id: 158,
    text: {
      ko: "고통받을까 두려워하는 사람은 이미 그 두려움으로 고통받고 있다.",
      en: "He who fears he shall suffer, already suffers what he fears.",
    },
    author: {
      ko: "미셸 드 몽테뉴",
      en: "Michel de Montaigne",
    },
    translator: {
      en: "Charles Cotton",
      enUrl: "https://www.gutenberg.org/cache/epub/3600/pg3600.txt",
    },
    original: "Qui craint de souffrir, il souffre desjà de ce qu’il craint.",
    lang: "fr",
    source: {
      ko: "『에세』 3권 13장 「경험에 대하여」",
      en: "*Essays*, Book 3, ch. 13, \"Of Experience\"",
    },
    year: 1588,
    sourceUrl: "https://fr.wikisource.org/wiki/Essais/Livre_III/Chapitre_13",
    tags: ["fear", "despair"],
  },
  {
    id: 159,
    text: {
      ko: "생길 수 있는 반대를 모두 넘어서야 한다면, 아무것도 시도되지 않을 것이다.",
      en: "Nothing will ever be attempted if all possible objections must be first overcome.",
    },
    author: {
      ko: "새뮤얼 존슨",
      en: "Samuel Johnson",
    },
    original: "“Nothing,” replied the artist, “will ever be attempted if all possible objections must be first overcome.",
    lang: "en",
    source: {
      ko: "『라셀라스』 6장, 나는 장치를 만드는 장인의 말",
      en: "*Rasselas*, ch. 6 — the artist who builds a flying machine",
    },
    year: 1759,
    sourceUrl: "https://www.gutenberg.org/cache/epub/652/pg652.txt",
    tags: ["challenge", "fear"],
  },
  {
    id: 160,
    text: {
      ko: "지나간 날을 슬피 돌아보지 마라. 그것은 다시 오지 않는다. 지금을 슬기롭게 가꾸어라. 지금은 너의 것이다. 어스름한 미래를 두려움 없이, 굳센 마음으로 맞으러 나아가라.",
      en: "Look not mournfully into the Past. It comes not back again. Wisely improve the Present. It is thine. Go forth to meet the shadowy Future, without fear, and with a manly heart.",
    },
    author: {
      ko: "헨리 워즈워스 롱펠로",
      en: "Henry Wadsworth Longfellow",
    },
    original: "Look not mournfully into the Past. It comes not back again. Wisely improve the Present. It is thine. Go forth to meet the shadowy Future, without fear, and with a manly heart.",
    lang: "en",
    source: {
      ko: "『하이페리온』 4권 8장 「천사의 발자국」, 묘비의 글",
      en: "*Hyperion*, Book 4, ch. 8, \"Footprints of Angels\" — words on a gravestone",
    },
    year: 1839,
    sourceUrl: "https://www.gutenberg.org/cache/epub/5436/pg5436.txt",
    tags: ["despair", "fear"],
  },
  {
    id: 161,
    text: {
      ko: "모든 고귀한 일은 처음에는 불가능해 보인다.",
      en: "Every noble work is at first impossible.",
    },
    author: {
      ko: "토머스 칼라일",
      en: "Thomas Carlyle",
    },
    original: "Every noble work is at first impossible.",
    lang: "en",
    source: {
      ko: "『과거와 현재(Past and Present)』 3권 11장 「노동」",
      en: "*Past and Present*, Book 3, ch. 11, \"Labour\"",
    },
    year: 1843,
    sourceUrl: "https://www.gutenberg.org/cache/epub/26159/pg26159.txt",
    tags: ["success", "challenge"],
  },
  {
    id: 162,
    text: {
      ko: "선한 대의를 위한 실패는 그래도 명예롭다. 악한 대의에서의 성공은 그저 수치일 뿐이다.",
      en: "Failure in any good cause is, however, honourable, whilst success in any bad cause is merely infamous.",
    },
    author: {
      ko: "새뮤얼 스마일스",
      en: "Samuel Smiles",
    },
    original: "Failure in any good cause is, however, honourable, whilst success in any bad cause is merely infamous.",
    lang: "en",
    source: {
      ko: "『자조론(Self-Help)』 머리말",
      en: "*Self-Help*, Preface",
    },
    year: 1859,
    sourceUrl: "https://www.gutenberg.org/cache/epub/935/pg935.txt",
    tags: ["failure", "success"],
  },
  {
    id: 163,
    text: {
      ko: "곤궁할수록 더욱 굳세어져, 높은 뜻을 떨어뜨리지 않는다.",
      en: "In hardship, grow ever firmer, and never let your lofty aim fall.",
    },
    author: {
      ko: "왕발",
      en: "Wang Bo",
    },
    original: "窮且益堅，不墜青雲之志",
    lang: "lzh",
    source: {
      ko: "「등왕각서(滕王閣序)」",
      en: "\"Preface to the Pavilion of Prince Teng\" (Teng Wang Ge Xu)",
    },
    year: 675,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/wiki/%E6%BB%95%E7%8E%8B%E9%96%A3%E5%BA%8F",
    tags: ["failure", "perseverance"],
  },
  {
    id: 164,
    text: {
      ko: "세상에 기쁨만 있다면 우리는 결코 용감해지는 법도, 참는 법도 배우지 못할 것이다.",
      en: "We could never learn to be brave and patient, if there were only joy in the world.",
    },
    author: {
      ko: "헬렌 켈러",
      en: "Helen Keller",
    },
    original: "we could never learn to be brave and patient, if there were only joy in the world.",
    lang: "en",
    source: {
      ko: "올리버 웬델 홈스에게 보낸 편지 (3월 1일), 『내가 살아온 이야기』 수록",
      en: "Letter to Oliver Wendell Holmes, March 1 — in *The Story of My Life*",
    },
    kind: "letter",
    year: 1890,
    sourceUrl: "https://www.gutenberg.org/cache/epub/2397/pg2397.txt",
    tags: ["despair", "perseverance"],
  },
  {
    id: 165,
    text: {
      ko: "하늘이 나를 낳았으니, 내 재능은 반드시 쓰일 데가 있다.",
      en: "Heaven gave me my talents; they will surely find their use.",
    },
    author: {
      ko: "이백",
      en: "Li Bai",
    },
    original: "天生我材必有用",
    lang: "lzh",
    source: {
      ko: "「장진주(將進酒)」",
      en: "\"Bring In the Wine\" (Qiang Jin Jiu)",
    },
    year: 752,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/wiki/%E5%B0%87%E9%80%B2%E9%85%92_(%E6%9D%8E%E7%99%BD)",
    tags: ["hope", "despair"],
  },
  {
    id: 166,
    text: {
      ko: "담박하지 않으면 뜻을 밝힐 수 없고, 고요하지 않으면 멀리 이를 수 없다.",
      en: "Without simplicity one cannot make one's purpose clear; without calm one cannot reach far.",
    },
    author: {
      ko: "제갈량",
      en: "Zhuge Liang",
    },
    original: "非澹泊無以明志，非寧靜無以致遠",
    lang: "lzh",
    source: {
      ko: "「계자서(誡子書)」, 아들에게 남긴 글",
      en: "\"Admonition to His Son\" (Jie Zi Shu)",
    },
    kind: "letter",
    year: 234,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/wiki/%E8%AA%A1%E5%AD%90%E6%9B%B8",
    tags: ["preparation", "meaning"],
  },
  {
    id: 167,
    text: {
      ko: "누구나 잘못할 수 있다. 그러나 잘못을 고집하는 것은 어리석은 자뿐이다.",
      en: "Any man can err; only a fool persists in his error.",
    },
    author: {
      ko: "키케로",
      en: "Cicero",
    },
    original: "Cuiusvis hominis est errare, nullius nisi insipientis in errore perseverare.",
    lang: "la",
    source: {
      ko: "『필리포스 탄핵 연설』 12편 5절",
      en: "*Philippics* 12.5",
    },
    kind: "speech",
    year: -43,
    sourceUrl: "https://la.wikisource.org/wiki/Philippicae/Oratio_XII",
    tags: ["failure", "challenge"],
  },
  {
    id: 168,
    text: {
      ko: "군자의 허물은 일식이나 월식과 같다. 잘못하면 모두가 보고, 고치면 모두가 우러러본다.",
      en: "The faults of the superior man are like the eclipses of the sun and moon. He has his faults, and all men see them; he changes again, and all men look up to him.",
    },
    author: {
      ko: "자공",
      en: "Zigong",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    original: "君子之過也，如日月之食焉：過也，人皆見之；更也，人皆仰之",
    lang: "lzh",
    source: {
      ko: "『논어』 자장편 21",
      en: "*Analects* 19.21 (Zi Zhang)",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["failure", "meaning"],
  },
  {
    id: 169,
    text: {
      ko: "무슨 일이든 미리 준비하면 서고, 준비하지 않으면 무너진다.",
      en: "In all things, what is prepared stands; what is unprepared falls.",
    },
    author: {
      ko: "자사",
      en: "Zisi",
    },
    original: "凡事豫則立，不豫則廢",
    lang: "lzh",
    source: {
      ko: "『중용』 20장",
      en: "*Doctrine of the Mean*, ch. 20",
    },
    year: -400,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E7%A6%AE%E8%A8%98/%E4%B8%AD%E5%BA%B8",
    tags: ["preparation", "success"],
  },
  {
    id: 170,
    text: {
      ko: "누군가의 짐을 덜어 주는 사람은 이 세상에서 결코 쓸모없는 사람이 아니다.",
      en: "No one is useless in this world who lightens the burden of it for any one else.",
    },
    author: {
      ko: "찰스 디킨스",
      en: "Charles Dickens",
    },
    original: "‘No one is useless in this world,’ retorted the Secretary, ‘who lightens the burden of it for any one else.’",
    lang: "en",
    source: {
      ko: "『우리 서로의 친구(Our Mutual Friend)』 3부 9장, 존 로크스미스의 말",
      en: "*Our Mutual Friend*, Book 3, ch. 9 — John Rokesmith",
    },
    year: 1865,
    sourceUrl: "https://www.gutenberg.org/cache/epub/883/pg883.txt",
    tags: ["meaning", "passion"],
  },
  {
    id: 171,
    text: {
      ko: "세상에 선이 자라나는 것은 얼마간, 역사에 기록되지 않는 행동들에 달려 있다.",
      en: "The growing good of the world is partly dependent on unhistoric acts.",
    },
    author: {
      ko: "조지 엘리엇",
      en: "George Eliot",
    },
    original: "the growing good of the world is partly dependent on unhistoric acts",
    lang: "en",
    source: {
      ko: "『미들마치』 맺음말",
      en: "*Middlemarch*, Finale",
    },
    year: 1872,
    sourceUrl: "https://www.gutenberg.org/cache/epub/145/pg145.txt",
    tags: ["meaning", "passion"],
  },
  {
    id: 172,
    text: {
      ko: "배움은 멈출 수 없다. 푸른 물감은 쪽에서 얻지만 쪽보다 더 푸르고, 얼음은 물로 되지만 물보다 더 차다.",
      en: "Learning must never stop. Blue is taken from the indigo plant, yet it is bluer than the plant; ice is made of water, yet it is colder than water.",
    },
    author: {
      ko: "순자",
      en: "Xunzi",
    },
    original: "學不可以已。青，取之於藍而青於藍；冰，水為之而寒於水。",
    lang: "lzh",
    source: {
      ko: "『순자』 권학편",
      en: "*Xunzi*, \"Encouraging Learning\" (Quan Xue)",
    },
    year: -250,
    circa: true,
    sourceUrl: "https://zh.wikisource.org/zh-hant/%E8%8D%80%E5%AD%90/%E5%8B%B8%E5%AD%B8%E7%AF%87",
    tags: ["preparation", "perseverance"],
  },
  {
    id: 173,
    text: {
      ko: "날마다 모르던 것을 알아 가고 달마다 할 줄 알게 된 것을 잊지 않으면, 배우기를 좋아한다고 할 만하다.",
      en: "He, who from day to day recognises what he has not yet, and from month to month does not forget what he has attained to, may be said indeed to love to learn.",
    },
    author: {
      ko: "자하",
      en: "Zixia",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    original: "日知其所亡，月無忘其所能，可謂好學也已矣",
    lang: "lzh",
    source: {
      ko: "『논어』 자장편 5",
      en: "*Analects* 19.5 (Zi Zhang)",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["preparation", "perseverance"],
  },
  {
    id: 174,
    text: {
      ko: "무엇이든 겪어 보기 전에는 진짜가 되지 않는다. 속담조차, 네 삶이 그것을 보여 주기 전까지는 속담이 아니다.",
      en: "Nothing ever becomes real till it is experienced—even a proverb is no proverb to you till your life has illustrated it.",
    },
    author: {
      ko: "존 키츠",
      en: "John Keats",
    },
    original: "Nothing ever becomes real till it is experienced--Even a Proverb is no proverb to you till your Life has illustrated it.",
    lang: "en",
    source: {
      ko: "조지·조지애나 키츠 부부에게 보낸 편지 (2~5월)",
      en: "Letter to George and Georgiana Keats, February–May",
    },
    kind: "letter",
    year: 1819,
    sourceUrl: "https://www.gutenberg.org/cache/epub/35698/pg35698.txt",
    tags: ["preparation", "meaning"],
  },
  {
    id: 175,
    text: {
      ko: "가장 가까이 놓인 의무, 네가 의무임을 아는 그것을 하라! 그러면 두 번째 의무는 이미 더 또렷해져 있을 것이다.",
      en: "Do the Duty which lies nearest thee, which thou knowest to be a Duty! Thy second Duty will already have become clearer.",
    },
    author: {
      ko: "토머스 칼라일",
      en: "Thomas Carlyle",
    },
    original: "Do the Duty which lies nearest thee, which thou knowest to be a Duty! Thy second Duty will already have become clearer.",
    lang: "en",
    source: {
      ko: "『의상 철학(Sartor Resartus)』 2권 9장 「영원한 긍정」",
      en: "*Sartor Resartus*, Book 2, ch. 9, \"The Everlasting Yea\"",
    },
    year: 1836,
    sourceUrl: "https://www.gutenberg.org/cache/epub/1051/pg1051.txt",
    tags: ["preparation", "challenge"],
  },
  {
    id: 176,
    text: {
      ko: "삶을 고여 있게 두지 마라. 흐르지 않으면 탁해진다. 다시 세상의 물결에 몸을 맡겨라.",
      en: "Do not suffer life to stagnate: it will grow muddy for want of motion; commit yourself again to the current of the world.",
    },
    author: {
      ko: "새뮤얼 존슨",
      en: "Samuel Johnson",
    },
    original: "Do not suffer life to stagnate: it will grow muddy for want of motion; commit yourself again to the current of the world;",
    lang: "en",
    source: {
      ko: "『라셀라스』 35장, 슬픔에 잠긴 공주에게 임락이 하는 말",
      en: "*Rasselas*, ch. 35 — Imlac, to the grieving princess",
    },
    year: 1759,
    sourceUrl: "https://www.gutenberg.org/cache/epub/652/pg652.txt",
    tags: ["energy", "despair"],
  },
  {
    id: 177,
    text: {
      ko: "배우고 때때로 익히면 또한 기쁘지 아니한가.",
      en: "Is it not pleasant to learn with a constant perseverance and application?",
    },
    author: {
      ko: "공자",
      en: "Confucius",
    },
    translator: {
      en: "James Legge",
      enUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    },
    original: "學而時習之，不亦說乎",
    lang: "lzh",
    source: {
      ko: "『논어』 학이편 1 — 『논어』의 첫 구절, motimoti 의 모토",
      en: "*Analects* 1.1 (Xue Er) — the opening line of the *Analects*, and motimoti's motto",
    },
    year: -450,
    circa: true,
    sourceUrl: "https://www.gutenberg.org/cache/epub/4094/pg4094.txt",
    tags: ["preparation", "passion"],
  },
];
