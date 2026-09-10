# 📚 명언 자동 생성 및 검증 시스템

## 🎯 개요

이 시스템은 **명언을 AI로 자동 생성하고, 사람이 검증하고, 자동으로 반영**하는 완전 자동화된 파이프라인입니다.

```
매주 월요일 09:00 UTC
    │
    ├─→ GitHub Actions 실행
    │   └─→ generate-quotes.js 실행
    │       └─→ Claude API로 5개 명언 생성
    │           └─→ pending-quotes.json 저장
    │
    ├─→ 개발자 (당신)
    │   └─→ Collector UI에서 검증
    │       └─→ 승인/거절 결정
    │
    ├─→ update-quotes.js 실행
    │   └─→ 승인된 명언을 quotes.js에 추가
    │
    └─→ 앱에 자동 반영
        └─→ GitHub Pages 배포
```

---

## 📂 파일 구조

```
moti/
├── README.md                                    # 프로젝트 메인 문서
├── QUOTE_STANDARDS.md                          # ⭐ 명언 선정 기준 (AI가 읽음)
├── QUOTE_AUTOMATION.md                         # 이 파일
├── COLLECTOR_SETUP.md                          # 셋업 가이드
│
├── quotes.js                                   # ⭐ 최종 명언 데이터
│
├── package.json                                # npm 의존성
│
├── scripts/
│   ├── generate-quotes.js                      # ⭐ 명언 생성 (AI) - Claude API 호출
│   └── update-quotes.js                        # ⭐ quotes.js 업데이트
│
├── collector/                                  # 명언 수집 및 검증 UI
│   ├── index.html                              # UI (날씨정보 검토 인터페이스)
│   ├── style.css                               # UI 스타일
│   ├── collector.js                            # 유효성 검증 로직
│   ├── collector-api.js                        # ⭐ API 클라이언트 (새로움!)
│   ├── server.js                               # ⭐ 백엔드 API (새로움!)
│   │
│   └── data/
│       └── pending-quotes.json                 # ⭐ 검증 대기/승인된 명언 저장소
│
├── .github/workflows/
│   └── generate-quotes.yml                     # ⭐ GitHub Actions 자동화
│
└── [기타 앱 파일]
    ├── index.html
    ├── app.js
    ├── style.css
    └── ...
```

**⭐ = 이번 업데이트로 새로 추가되거나 수정된 파일**

---

## 🔄 워크플로우 상세

### Phase 1: 자동 생성 (매주 월요일 09:00 UTC)

**GitHub Actions 실행:**
```
.github/workflows/generate-quotes.yml
    ↓
Node.js 18 환경 설정
    ↓
npm install
    ↓
npm run generate-quotes
```

**generate-quotes.js 동작:**
1. `QUOTE_STANDARDS.md` 읽기
2. Claude Opus 5 API 호출
   - 프롬프트: 명언 5개 생성 요청
   - 파라미터: 상황별 분배, 시대별 다양성, 출처 검증
3. 생성된 JSON 파싱
4. `pending-quotes.json`에 저장
5. 자동으로 Pull Request 생성

**pending-quotes.json 구조:**
```json
{
  "pending": [
    {
      "tempId": "temp_20260910_001",
      "situation": "despair",
      "text": "한국어 명언 (60자 이내)",
      "author": "저자명",
      "original": "원문",
      "lang": "en",
      "source": "책 제목 또는 연설",
      "year": 1234,
      "sourceUrl": "https://1차출처URL",
      "tags": ["despair", "energy"],
      "generatedAt": "2026-09-10T09:00:00Z"
    },
    ...
  ],
  "approved": [],
  "lastUpdated": "2026-09-10"
}
```

---

### Phase 2: 검증 (당신의 역할)

**Collector UI 접속:**
```
http://localhost:8000/collector/
```

**UI 구성:**
- **➕ 명언 수집**: 수동으로 명언 추가
- **✓ 검증 대기**: 자동 생성된 명언 검증 ← **당신은 여기서!**
- **✅ 승인됨**: 이미 승인한 명언 목록
- **📖 가이드**: 명언 선정 기준

**검증 프로세스:**

1. **"✓ 검증 대기" 탭 클릭**
   - 생성된 명언 5개 카드로 표시
   
2. **각 명언 검토:**
   - 한국어 번역 확인 (의역 없나?)
   - 원문(original) 확인
   - 저자 및 출처 확인
   - sourceUrl 클릭해서 실제로 존재하나 확인

3. **결정:**
   - ✅ **승인**: 품질 좋음 → `approved` 배열로 이동
   - ❌ **거절**: 품질 낮음 → 기록 후 삭제

**승인/거절 시 동작:**
- 클라이언트에서 API 호출
- 백엔드 서버 (server.js)가 처리
- `pending-quotes.json` 업데이트
- localStorage 폴백 (백엔드 미실행시 사용)

---

### Phase 3: 통합 (자동 스크립트)

**update-quotes.js 실행:**
```bash
npm run update-quotes
```

**동작:**
1. `pending-quotes.json`에서 `approved` 배열 읽기
2. 아직 처리되지 않은 명언 필터링 (`processedAt` 확인)
3. 현재 `quotes.js`의 최대 ID 찾기
4. 새 ID 할당 및 형식 변환
5. `quotes.js`의 `QUOTES` 배열에 추가
6. "다음 id" 주석 업데이트
7. `quotes.js` 저장
8. `pending-quotes.json` 업데이트 (`processedAt` 표기)

**quotes.js 업데이트:**
```javascript
const QUOTES = [
  // ... 기존 명언들 ...
  {
    id: 66,
    text: "새로운 한국어 명언",
    author: "새로운 저자",
    original: "Original text",
    lang: "en",
    source: "책 제목",
    year: 2026,
    sourceUrl: "https://...",
    tags: ["challenge", "energy"],
  },
  // ... 더 추가됨 ...
];
```

---

### Phase 4: 반영

**앱에 자동 반영:**
1. quotes.js 변경
2. GitHub에 자동 commit (선택적)
3. 정적 앱 새로고침 시 새 명언 표시
4. GitHub Pages 배포 (설정시)

---

## 🛠️ 설정 방법

### 로컬 환경 (개발)

**1단계: 의존성 설치**
```bash
cd moti
npm install
```

**2단계: API 키 설정**
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

**3단계: 전체 워크플로우 실행**

**터미널 1 - 백엔드:**
```bash
node collector/server.js
```

**터미널 2 - UI:**
```bash
npx http-server collector -p 8000
```

**터미널 3 - 명언 생성:**
```bash
npm run generate-quotes
```

**터미널 4 - quotes.js 업데이트:**
```bash
npm run update-quotes
```

### GitHub Actions (자동화)

**1단계: Repository Secrets 설정**

Settings → Secrets and variables → Actions

```
Name: ANTHROPIC_API_KEY
Value: sk-ant-...
```

**2단계: 워크플로우 확인**

`.github/workflows/generate-quotes.yml` 이미 설정됨
- 매주 월요일 09:00 UTC 실행
- 자동으로 PR 생성

---

## 📊 각 파일의 역할

### `QUOTE_STANDARDS.md`
- **목적**: AI의 가이드 + 당신의 검증 기준
- **내용**: 좋은 명언의 정의, 필수 조건, 상황별 태그, 품질 체크리스트
- **사용**: AI가 생성시 읽음, 당신이 검증시 참고

### `scripts/generate-quotes.js`
- **목적**: Claude API를 호출해서 명언 5개 생성
- **입력**: `QUOTE_STANDARDS.md`
- **출력**: `collector/data/pending-quotes.json`의 `pending` 배열
- **실행**: `npm run generate-quotes` 또는 GitHub Actions

### `collector/server.js`
- **목적**: 백엔드 API 서버
- **역할**: 
  - `/api/quotes/pending` - 검증 대기 명언 조회
  - `/api/quotes/approved` - 승인된 명언 조회
  - `/api/quotes/approve` - 명언 승인 (pending → approved)
  - `/api/quotes/reject` - 명언 거절
- **실행**: `node collector/server.js`

### `collector/index.html` + `collector-api.js`
- **목적**: Collector UI 및 API 클라이언트
- **역할**: 당신이 명언을 검증하는 인터페이스
- **특징**: API 실패시 localStorage 자동 폴백

### `scripts/update-quotes.js`
- **목적**: 승인된 명언을 quotes.js에 통합
- **입력**: `collector/data/pending-quotes.json`의 `approved` 배열
- **출력**: `quotes.js` 업데이트
- **실행**: `npm run update-quotes`

### `.github/workflows/generate-quotes.yml`
- **목적**: 자동 스케줄 및 PR 생성
- **실행**: 매주 월요일 09:00 UTC
- **동작**: generate-quotes.js 실행 후 PR 자동 생성

---

## 📈 월간 운영 예시

### 1주차 (월요일)
```
09:00 UTC
  └─→ GitHub Actions 실행
      └─→ 명언 5개 생성
          └─→ PR #123 자동 생성
              └─→ 제목: "📚 Weekly Quote Generation - Review Required"
```

### 2~4주차 (수요일까지 완료)
```
당신의 시간
  └─→ Collector UI 접속
      └─→ "검증 대기" 탭
          └─→ 명언 5개 검토
              ├─→ 명언 1: ✅ 승인
              ├─→ 명언 2: ✅ 승인
              ├─→ 명언 3: ❌ 거절
              ├─→ 명언 4: ✅ 승인
              └─→ 명언 5: ❌ 거절
  
  └─→ 터미널에서
      └─→ npm run update-quotes
          └─→ quotes.js 업데이트 (3개 추가)
  
  └─→ 변경사항 커밋
      └─→ git add .
          git commit -m "chore: 승인된 명언 3개를 quotes.js에 추가"
          git push
```

---

## 🎓 AI 프롬프트 구조

`generate-quotes.js`에서 Claude Opus 5에 전달되는 프롬프트:

```
요청:
  - 명언 5개 생성 (JSON 배열)
  - 상황별 우선순위 존중:
    - despair (절망): 2개
    - challenge (도전): 2개
    - meaning (의미): 1개
  - 실제 존재하는 명언만
  - 1차 출처 필수 (Wikisource, 공식 사이트 등)
  - 다양한 시대/지역

기준:
  - QUOTE_STANDARDS.md 전문 포함
  - 생성 형식 (JSON) 명시
  - 체크리스트 제공

결과:
  - JSON 배열만 반환
  - 마크다운 코드블록 또는 순수 JSON
```

---

## 🔒 보안 & 데이터 관리

### API 키 관리
- **로컬**: `.env` 파일 (`.gitignore`에 등록)
- **GitHub**: Repository Secrets
- **권한**: 읽기/쓰기만 필요한 수준 (전체 계정 권한 불필요)

### 데이터 저장
- **pending-quotes.json**: 로컬 JSON 파일
  - 형식 버전 관리: `lastUpdated` 필드
  - 이력: `approvedAt`, `rejectedAt`, `processedAt` 타임스탠프
- **quotes.js**: 최종 명언 데이터 (버전 관리)

### 백업
```bash
# 주간 백업 권장
cp collector/data/pending-quotes.json collector/data/pending-quotes.backup.json
cp quotes.js quotes.backup.js
```

---

## 🐛 알려진 문제

### 1. API 응답 타임아웃
- **원인**: Claude API 응답 지연
- **해결**: 재시도 메커니즘 있음 (기본 5초 타임아웃)

### 2. 생성된 명언의 sourceUrl 유효성
- **위험**: AI가 존재하지 않는 URL 생성 가능
- **검증**: 당신이 Collector UI에서 URL 직접 클릭해 확인 필수

### 3. 중복 검증 부재
- **위험**: 기존 명언과 비슷한 내용 생성 가능
- **검증**: 당신이 기존 quotes.js와 비교 필수

---

## 📝 커스터마이징

### 생성 빈도 변경
`.github/workflows/generate-quotes.yml` 수정:
```yaml
schedule:
  - cron: '0 9 * * 1'  # 현재: 매주 월요일 09:00 UTC
  # 변경 예:
  # - cron: '0 9 * * 1-5'  # 주중 매일
  # - cron: '0 9 * * 0'    # 매주 일요일
```

### 생성 개수 변경
`scripts/generate-quotes.js`의 프롬프트 수정:
```javascript
// "명언 5개 생성" → "명언 10개 생성" 등으로 변경
```

### 상황별 분배 변경
`scripts/generate-quotes.js`의 프롬프트 수정:
```javascript
// despair (2개), challenge (2개), meaning (1개)
// → 다른 분배로 변경 가능
```

---

## 📞 지원 & 문제 해결

### 기본 체크리스트
- [ ] API 키 설정됨 (`$ANTHROPIC_API_KEY`)
- [ ] Node.js 18+ 설치됨 (`node --version`)
- [ ] 의존성 설치됨 (`npm install`)
- [ ] 백엔드 서버 실행 중 (`node collector/server.js`)
- [ ] UI 서버 실행 중 (`npx http-server collector`)

### 상세 가이드
- **셋업**: `COLLECTOR_SETUP.md` 참고
- **기준**: `QUOTE_STANDARDS.md` 참고
- **에러**: 콘솔 로그 확인

---

## 📚 참고 자료

### 시스템 설명
- 이 파일: `QUOTE_AUTOMATION.md`

### 셋업 가이드
- `COLLECTOR_SETUP.md`

### 명언 선정 기준
- `QUOTE_STANDARDS.md`

### 코드 주석
- `scripts/generate-quotes.js`
- `scripts/update-quotes.js`
- `collector/server.js`
- `collector/collector-api.js`

---

## 🎉 다음 단계

1. **로컬 셋업**: `COLLECTOR_SETUP.md` 참고
2. **GitHub Actions 설정**: Repository Secrets에 API 키 추가
3. **테스트**: `npm run generate-quotes` 실행
4. **검증 UI**: Collector 접속해서 검증 시작
5. **통합**: `npm run update-quotes` 실행

---

**생성됨:** Claude Code  
**마지막 수정:** 2026-09-10  

🤖 Generated with [Claude Code](https://claude.ai/code)
