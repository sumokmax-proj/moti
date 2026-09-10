# moti

명언 앱 **motimoti** 와 명언을 등재하는 **수집기**.

- 앱: https://sumokmax-proj.github.io/moti/
- 수집기: https://sumokmax-proj.github.io/moti/collector/ (읽기·시험용. 등재는 아래 참고)

## 앱

정적 페이지다. 빌드가 없고 `index.html` 을 열면 그대로 돈다.

- `quotes.js` — 명언 데이터. 등재 기준은 [QUOTE_STANDARDS.md](QUOTE_STANDARDS.md).
- `style.css` / `tokens.css` — 확정 디자인(시안 E). 색과 간격은 전부 `tokens.css` 의 토큰이고, 수집기도 같은 파일을 쓴다.
- `.design/` — 확정안 5화면과 시안 A~G. `canvas.json` 이 배치를 갖고 있다.

한국어·영어를 지원한다. 모든 명언은 `text` 와 `author` 에 `{ ko, en }` 을 모두 가져야 한다. 한쪽이 없으면 그 언어에서 명언이 빠진다.

## 수집기

`collector/` 에 있다. 저장 위치가 두 가지고, 열 때 백엔드를 찾아보고 스스로 정한다. 어느 쪽인지는 화면 맨 위에 늘 표시된다.

### 백엔드 모드 — 등재까지 하려면 이쪽

```
npm run collector      # http://127.0.0.1:3001/collector/
```

- 검증 대기 목록은 `collector/data/pending-quotes.json` 에 저장된다.
- **승인하면 서버가 `quotes.js` 에 직접 등재한다.** id 는 파일 상단 `// 다음 id: N` 주석에서 받아 쓰고 주석을 하나 올린다.
- 등재 후 변경분을 확인하고 커밋하는 것은 사람이 한다.

로컬 전용 도구다. 인증이 없어서 `127.0.0.1` 에만 바인딩한다. 공개된 곳에 띄우지 말 것.

### 정적 모드 — GitHub Pages 등

백엔드가 없으면 브라우저 `localStorage` 에만 쌓인다. 승인해도 `quotes.js` 는 바뀌지 않는다. 대신 각 항목의 **코드 복사**와 승인 목록의 **전체를 quotes.js 코드로 복사**로 붙여넣을 코드를 얻는다.

### 넣는 방법 두 가지

- **폼** — 한 편씩 입력한다.
- **JSON 일괄 등록** — 배열이나 단일 객체를 붙여넣는다. 통과한 것만 들어가고, 걸린 항목은 몇 번째가 왜 걸렸는지 알려준다.

```json
[
  {
    "text": { "ko": "…", "en": "…" },
    "author": { "ko": "…", "en": "…" },
    "original": "…",
    "lang": "en",
    "source": "…",
    "year": 1758,
    "sourceUrl": "https://…",
    "tags": ["challenge"],
    "translator": "James Legge",
    "translatorUrl": "https://…"
  }
]
```

`translator` 는 공개된 정본 영역을 쓴 경우에만 적는다. 적었으면 `translatorUrl` 이 반드시 있어야 한다. 없으면 자체 번역으로 기록된다.

검사는 화면과 서버 양쪽에서 똑같이 한다 — 필수 항목, 한국어 60자·영어 170자, `sourceUrl` 이 http(s) 인지, 태그가 아는 값인지, 같은 한국어 명언이 이미 있는지.

## 배포

`main` 에 푸시하면 GitHub Pages 가 자동으로 배포한다. 별도 워크플로 파일은 없고 Pages 기본 빌드를 쓴다.
