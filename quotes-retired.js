// 지운 명언의 주소 — 「펼쳐서 건네기」 (PLANNING.md 9장, LAUNCH_CHECKLIST.md A6)
//
// 명언마다 /ko/42/ 같은 주소가 있고, 한 번 퍼진 주소는 영원히 열려야 한다.
// 그래서 주소가 생긴 뒤(2026-11-14~) 명언을 지우면 여기에 적는다. 그 주소에는
// 「이 쪽은 책에서 뺐다」는 페이지가 이유와 함께 남는다(tools/build-pages.js,
// 검색 제외). 지운 것을 숨기지 않고 밝히는 것도 「원문에서 확인했다」는 약속의 일부다.
//
// 명언을 지울 때
//   1. quotes.js 에서 빼고, 머리 주석 「삭제된 id」 에 그 id 를 더한다(지금처럼)
//   2. 여기에 { date, reason: { ko, en, vi } } 를 적는다(vi 가 없으면 영어로 보인다)
//   npm run check 가 1 만 하고 2 를 빠뜨리면 막는다.
//
// 주소가 생기기 전에 지운 id 는 tools/rules.js 의 IDS_DELETED_BEFORE_ADDRESSES 에 있다.
//
// 예)
//   49: {
//     date: "2026-09-07",
//     reason: {
//       ko: "출처를 원문에서 확인하지 못해 뺐습니다.",
//       en: "Taken out: we could not find the line in the source it was credited to.",
//     },
//   },

const QUOTES_RETIRED = {};
