# 📚 명언 수집 시스템 셋업 가이드

명언 자동 생성 및 검증 시스템의 완전한 설정 방법입니다.

## 🎯 시스템 개요

```
매주 월요일 오전 9시 (UTC)
    ↓
GitHub Actions 자동 실행
    ↓
Claude API로 명언 5개 생성
    ↓
pending-quotes.json에 저장
    ↓
당신이 Collector UI에서 검증
    ↓
승인/거절 결정
    ↓
update-quotes 스크립트로 quotes.js 업데이트
    ↓
앱에 자동 반영
```

---

## 📋 필요한 것

### 1. Node.js 환경
- **버전**: Node.js 18 이상
- **확인**: `node --version`

### 2. Anthropic API 키
- **필요한 이유**: Claude API로 명언 생성
- **획득**: https://console.anthropic.com/account/keys
- **비용**: 사용한 토큰만 결제 (매주 5개 명언 = ~$0.01)

### 3. GitHub 저장소 (선택)
- GitHub Actions로 자동화하려면 필요
- 수동 실행만 할 경우 불필요

---

## 🚀 로컬 셋업 (개발 환경)

### Step 1: 의존성 설치

```bash
cd /home/user/moti
npm install
```

### Step 2: API 키 설정

```bash
# 환경 변수 설정
export ANTHROPIC_API_KEY="sk-ant-..."
```

또는 `.env` 파일 생성:

```bash
cat > .env << 'EOF'
ANTHROPIC_API_KEY=sk-ant-...
EOF
```

### Step 3: 명언 생성 스크립트 실행

```bash
npm run generate-quotes
```

**출력 예시:**
```
═══════════════════════════════════════════════════════════
📚 명언 자동 생성 스크립트 시작
═══════════════════════════════════════════════════════════

📖 QUOTE_STANDARDS.md 읽기...
✅ 기준 문서 읽기 완료

🤖 Claude API를 사용하여 명언 생성 중...
✅ 5개의 명언 후보가 생성되었습니다.

💾 생성된 명언 저장 중...
💾 pending-quotes.json에 저장되었습니다.

═══════════════════════════════════════════════════════════
✅ 명언 생성 완료!

📊 생성 결과:

1. "명언 텍스트"
   저자: 저자명
   원문: Original text
   상황: despair
   태그: despair, energy

...
```

### Step 4: Collector UI 실행

**터미널 1 - 백엔드 서버:**
```bash
node collector/server.js
# 출력: 🚀 Collector Backend Server 시작
#      📍 주소: http://localhost:3001
```

**터미널 2 - 정적 파일 서빙:**
```bash
npx http-server collector -p 8000 -o
# 자동으로 브라우저에서 열림
```

### Step 5: 명언 검증

1. 브라우저에서 `http://localhost:8000/` 열기
2. "✓ 검증 대기" 탭 클릭
3. 생성된 명언 5개 검토
4. "✅ 승인" 또는 "❌ 거절" 클릭

### Step 6: 승인된 명언을 quotes.js에 추가

```bash
npm run update-quotes
```

**출력 예시:**
```
═══════════════════════════════════════════════════════════
📝 quotes.js 업데이트 스크립트 시작
═══════════════════════════════════════════════════════════

📖 파일 읽기 중...
✅ quotes.js 읽기 완료
✅ pending-quotes.json 읽기 완료
   └─ 승인됨: 3개

📊 처리할 명언: 3개

📊 현재 최대 ID: 65
📊 다음 ID부터 시작: 66

🔄 형식 변환 중...
✅ 3개 명언 형식 변환 완료

🔀 quotes.js에 명언 추가 중...
✅ "다음 id" 주석 업데이트: 69

💾 quotes.js가 업데이트되었습니다.
💾 pending-quotes.json이 업데이트되었습니다.

═══════════════════════════════════════════════════════════
✅ quotes.js 업데이트 완료!

📊 추가된 명언:

1. [ID: 66] "명언 텍스트"
   저자: 저자명
   태그: challenge, energy

...

═══════════════════════════════════════════════════════════
다음 ID: 69
```

---

## 🤖 GitHub Actions 자동화 셋업

### Step 1: GitHub Secrets 설정

저장소 Settings → Secrets and variables → Actions

**추가할 secret:**
- **Name**: `ANTHROPIC_API_KEY`
- **Value**: `sk-ant-...` (실제 API 키)

### Step 2: GitHub Actions Workflow 확인

`.github/workflows/generate-quotes.yml` 파일이 자동으로:
- **매주 월요일 오전 9시 UTC**에 실행
- 명언 5개 생성
- Pull Request 자동 생성
- 승인/거절 대기

### Step 3: 자동화된 워크플로우

```
매주 월요일 09:00 UTC
    ↓
GitHub Actions 시작
    ↓
.github/workflows/generate-quotes.yml 실행
    ↓
npm install
    ↓
npm run generate-quotes (ANTHROPIC_API_KEY 사용)
    ↓
pending-quotes.json 업데이트
    ↓
자동으로 Pull Request 생성
    ↓
브라우저 알림 (구독시)
```

### Step 4: PR 받은 후

1. **PR 확인**
   - PR 제목: "📚 Weekly Quote Generation - Review Required"
   - 파일 변경: `collector/data/pending-quotes.json`

2. **Collector UI에서 검증**
   - http://localhost:8000/collector/ 접속
   - "✓ 검증 대기" 탭에서 명언 검토
   - 승인/거절 결정

3. **quotes.js 업데이트**
   ```bash
   npm run update-quotes
   ```

4. **변경사항 커밋 및 푸시**
   ```bash
   git add .
   git commit -m "chore: 승인된 명언을 quotes.js에 추가"
   git push origin claude/quote-definition-selection-ha3x53
   ```

---

## 📁 파일 구조

```
moti/
├── QUOTE_STANDARDS.md              # 명언 선정 기준 (필수)
├── quotes.js                       # 최종 명언 데이터 (이 파일 업데이트됨)
├── package.json                    # 의존성 설정
│
├── scripts/
│   ├── generate-quotes.js          # 명언 생성 (AI)
│   └── update-quotes.js            # quotes.js에 추가
│
├── collector/
│   ├── index.html                  # UI
│   ├── collector.js                # 유효성 검증
│   ├── collector-api.js            # API 클라이언트 (새로움!)
│   ├── server.js                   # 백엔드 (새로움!)
│   ├── style.css
│   │
│   └── data/
│       └── pending-quotes.json     # 검증 대기/승인된 명언 저장
│
├── .github/workflows/
│   └── generate-quotes.yml         # GitHub Actions (새로움!)
│
└── COLLECTOR_SETUP.md              # 이 파일
```

---

## 🔧 트러블슈팅

### 1. "ANTHROPIC_API_KEY is not set"

**해결:**
```bash
# 환경 변수 확인
echo $ANTHROPIC_API_KEY

# 설정하기
export ANTHROPIC_API_KEY="sk-ant-..."

# 또는 .env 파일 생성
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env
```

### 2. "pending-quotes.json을 읽을 수 없습니다"

**해결:**
```bash
# 디렉토리 생성
mkdir -p collector/data

# 초기 파일 생성
echo '{"pending": [], "approved": [], "lastUpdated": "2026-09-10"}' > collector/data/pending-quotes.json
```

### 3. "Cannot find module '@anthropic-sdk/sdk'"

**해결:**
```bash
npm install @anthropic-sdk/sdk
```

### 4. "API 연결 실패"

**체크:**
- API 키 유효한지 확인: https://console.anthropic.com/account/keys
- 네트워크 연결 확인
- 인터넷 프록시 설정 확인

### 5. "Collector UI가 안 열려요"

**확인:**
```bash
# 포트 확인
netstat -tuln | grep 8000
netstat -tuln | grep 3001

# 프로세스 재시작
# 터미널에서 Ctrl+C로 종료 후
npx http-server collector -p 8000 -o
node collector/server.js
```

---

## 📊 월간 프로세스

### 1주차 (월요일)
- ✅ 명언 5개 자동 생성 (GitHub Actions)
- ✅ PR 자동 생성

### 2~4주차 (수요일까지)
- 📖 Collector UI에서 검증
- ✅ 승인/거절 결정
- ✅ `npm run update-quotes` 실행
- ✅ 변경사항 푸시

### 월말
- 📊 이번 달 통계
- 📈 QUOTE_STANDARDS.md 검토

---

## 🎓 학습 자료

### 명언 선정 기준
- 파일: `QUOTE_STANDARDS.md`
- 내용: 좋은 명언의 정의, 필수 조건, 우선순위, 품질 체크리스트

### 상황별 태그
- **despair** (😔): 절망할 때
- **challenge** (🚀): 도전할 때
- **meaning** (🤔): 의미를 묻을 때
- **energy** (⚡): 활기가 필요할 때
- 등...

---

## 💡 팁

### API 비용 최소화
- 월간 최대 20개 명언 = ~$0.20 (Opus 5 기준)
- 생성 전 QUOTE_STANDARDS.md 업데이트 권장

### 효율적인 검증
1. Collector UI의 "검증 대기" 탭 사용
2. 각 명언마다 sourceUrl 직접 열어 확인
3. 의역 없이 원문 그대로 번역 확인
4. 비슷한 명언과의 중복 확인

### 자동화 개선
- GitHub Actions 스케줄 변경 가능: `.github/workflows/generate-quotes.yml`
- 생성 개수 변경 가능: `scripts/generate-quotes.js`의 프롬프트 수정

---

## 📞 지원

문제 발생 시:
1. 이 가이드의 "트러블슈팅" 섹션 확인
2. `QUOTE_STANDARDS.md`에서 기준 재확인
3. GitHub Issues에서 유사한 문제 찾기

---

## 📝 변경 이력

| 날짜 | 변경 사항 | 버전 |
|------|---------|------|
| 2026-09-10 | 초안 작성 | v1.0 |

---

**생성됨:** Claude Code  
**마지막 수정:** 2026-09-10
