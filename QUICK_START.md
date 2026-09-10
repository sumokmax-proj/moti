# 🚀 빠른 시작 가이드

5분 안에 명언 자동 생성 시스템을 시작하세요!

## ⚡ 최소 설정

### 1단계: API 키 준비 (2분)

```bash
# Anthropic API 키 획득
# https://console.anthropic.com/account/keys에서 발급받기
# (sk-ant-... 형태)

# 환경 변수 설정
export ANTHROPIC_API_KEY="sk-ant-xxx..."
```

### 2단계: 의존성 설치 (1분)

```bash
cd /home/user/moti
npm install
```

### 3단계: 시스템 테스트 (2분)

**터미널 1 - 백엔드:**
```bash
node collector/server.js
# 출력: 🚀 Collector Backend Server 시작
#      📍 주소: http://localhost:3001
```

**터미널 2 - UI:**
```bash
npx http-server collector -p 8000
# 자동으로 브라우저에서 http://localhost:8000 열림
```

**터미널 3 - 명언 생성:**
```bash
npm run generate-quotes
# 명언 5개 자동 생성 시작...
```

---

## 📖 다음 단계

### 1️⃣ Collector UI에서 검증

1. 브라우저에서 `http://localhost:8000` 접속
2. "✓ 검증 대기" 탭 클릭
3. 생성된 명언 5개 검토
4. "✅ 승인" 또는 "❌ 거절" 클릭

**검증 팁:**
- 각 명언의 sourceUrl을 클릭해서 실제로 존재하는지 확인
- 한국어 번역이 원문의 의미를 제대로 담았는지 확인
- 60자 이내인지 확인

### 2️⃣ 승인된 명언을 quotes.js에 추가

```bash
npm run update-quotes
# quotes.js 업데이트 시작...
```

**결과:**
- 승인된 명언이 `quotes.js`에 자동 추가됨
- ID는 자동 할당됨
- 변경사항이 터미널에 출력됨

### 3️⃣ 변경사항 저장

```bash
git add .
git commit -m "chore: 승인된 명언을 quotes.js에 추가"
git push origin claude/quote-definition-selection-ha3x53
```

---

## 🎯 완전 자동화 (선택)

GitHub Actions로 **매주 월요일 자동 실행**:

### Step 1: GitHub Secrets 설정

1. https://github.com/sumokmax-proj/moti 접속
2. Settings → Secrets and variables → Actions
3. "New repository secret" 클릭
4. Name: `ANTHROPIC_API_KEY`
5. Value: `sk-ant-...` (API 키)
6. Add secret

### Step 2: 워크플로우 확인

`.github/workflows/generate-quotes.yml` 이미 설정됨:
- 매주 월요일 09:00 UTC 자동 실행
- PR 자동 생성

### Step 3: 완료!

매주 월요일마다:
```
09:00 UTC
  └─→ 자동 실행
      └─→ 명언 5개 생성
          └─→ pending-quotes.json 업데이트
              └─→ Pull Request 자동 생성
```

당신은 다음만 하면 됨:
1. Collector UI에서 검증
2. `npm run update-quotes` 실행
3. 변경사항 푸시

---

## 🎓 자세한 정보

| 주제 | 파일 |
|------|------|
| 전체 시스템 설명 | `QUOTE_AUTOMATION.md` |
| 상세 셋업 가이드 | `COLLECTOR_SETUP.md` |
| 명언 선정 기준 | `QUOTE_STANDARDS.md` |
| 현재 명언 데이터 | `quotes.js` |

---

## 💡 유용한 명령어

```bash
# 명언 생성
npm run generate-quotes

# quotes.js 업데이트
npm run update-quotes

# Collector 백엔드
node collector/server.js

# Collector UI
npx http-server collector -p 8000

# 앱 실행
node app.js
```

---

## ❌ 문제 해결

### "ANTHROPIC_API_KEY is not set"
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### "Cannot find module"
```bash
npm install
```

### "Port 3001 already in use"
```bash
# 다른 포트 사용
PORT=3002 node collector/server.js
```

### "API 요청 실패"
- API 키 유효한지 확인
- 네트워크 연결 확인
- API 사용량 확인 (console.anthropic.com)

---

## 📱 Collector UI 가이드

### 탭 설명

| 탭 | 기능 |
|----|------|
| ➕ 명언 수집 | 수동으로 명언 추가 |
| ✓ 검증 대기 | **자동 생성된 명언 검증** ← 여기! |
| ✅ 승인됨 | 승인한 명언 목록 |
| 📖 가이드 | 명언 선정 기준 |

### 검증 대기 탭

**카드 정보:**
- 명언 텍스트 (한국어)
- 저자명
- 원문
- 출처
- 태그

**버튼:**
- ✅ 승인: `approved` 배열로 이동
- ❌ 거절: 삭제

---

## 🔄 월간 루틴

### 매주 월요일
```
09:00 UTC
  └─→ 명언 5개 자동 생성 (GitHub Actions)
      └─→ pending-quotes.json 업데이트
          └─→ PR 자동 생성
```

### 주중 (수요일까지)
```
당신의 시간
  └─→ Collector UI 접속
      └─→ "검증 대기" 검토
          └─→ 승인/거절 결정
  
  └─→ npm run update-quotes
      └─→ quotes.js 업데이트
  
  └─→ git push
      └─→ 변경사항 저장
```

---

## 📞 더 도움이 필요하면

1. **전체 워크플로우**: `QUOTE_AUTOMATION.md`
2. **상세 설정**: `COLLECTOR_SETUP.md`
3. **명언 기준**: `QUOTE_STANDARDS.md`

---

**준비 완료! 이제 시작하세요! 🚀**
