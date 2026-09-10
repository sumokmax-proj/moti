#!/usr/bin/env node

/**
 * generate-quotes.js
 * AI가 명언 후보 5개를 자동으로 생성합니다.
 * 매주 월요일 오전에 실행되도록 설정됩니다.
 *
 * 사용법: node scripts/generate-quotes.js
 */

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-sdk/sdk').default;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 경로 설정
const QUOTE_STANDARDS_PATH = path.join(__dirname, '../QUOTE_STANDARDS.md');
const PENDING_QUOTES_PATH = path.join(__dirname, '../collector/data/pending-quotes.json');

/**
 * QUOTE_STANDARDS.md 읽기
 */
function readQuoteStandards() {
  try {
    return fs.readFileSync(QUOTE_STANDARDS_PATH, 'utf-8');
  } catch (error) {
    console.error('❌ QUOTE_STANDARDS.md를 읽을 수 없습니다:', error.message);
    process.exit(1);
  }
}

/**
 * pending-quotes.json 읽기
 */
function readPendingQuotes() {
  try {
    if (fs.existsSync(PENDING_QUOTES_PATH)) {
      const content = fs.readFileSync(PENDING_QUOTES_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('⚠️  pending-quotes.json을 읽을 수 없습니다. 새로 생성합니다.');
  }
  return { pending: [], approved: [], lastUpdated: new Date().toISOString().split('T')[0] };
}

/**
 * 명언 생성을 위한 프롬프트 작성
 */
function createGenerationPrompt(standards) {
  return `당신은 명언 수집 전문가입니다. 다음 기준에 따라 명언 5개를 생성하세요.

# 명언 기준

${standards}

# 생성 요구사항

1. **반드시 실제 존재하는 명언만 생성**
   - 가짜/만들어진 명언 절대 금지
   - 역사적으로 확인된 인물의 실제 말만

2. **다음 5개 상황 중 우선순위로 배분**
   - despair (절망): 2개
   - challenge (도전): 2개
   - meaning (의미): 1개

3. **다양한 시대/지역의 명언**
   - 고전 우선 (기원전 ~ 1900년)
   - 동양/서양 균형
   - 한 인물의 명언 중복 금지

4. **출처는 반드시 확인 가능한 1차 출처**
   - 위키소스, 공식 기관, 공개 문헌
   - sourceUrl은 실제로 존재하는 URL

5. **생성 형식 (JSON)**

다음은 생성할 명언의 JSON 형식입니다:

\`\`\`json
[
  {
    "tempId": "temp_20260910_001",
    "situation": "despair",
    "text": "한국어 명언 (60자 이내)",
    "author": "저자명",
    "original": "원문",
    "lang": "en",
    "source": "『책명』 또는 연설 정보",
    "year": 1234,
    "sourceUrl": "https://확인가능한_1차_출처",
    "tags": ["despair", "energy"],
    "generatedAt": "2026-09-10T09:00:00Z"
  },
  ...
]
\`\`\`

# 각 필드 설명

- **tempId**: temp_YYYYMMDD_001 형식
- **situation**: despair, challenge, meaning 중 하나
- **text**: 60자 이내 (휴대폰 화면에 맞게)
- **author**: 저자명 (한국식 표기)
- **original**: 원래 언어의 원문
- **lang**: 원문 언어 코드 (en, ko, lzh, zh, de, fr, ja, es, it, ru, la, nl)
- **source**: 책 제목, 연설, 편지 등
- **year**: 연도 (음수면 기원전)
- **sourceUrl**: 반드시 실제 존재하고 열 수 있는 URL
- **tags**: 상황 태그 배열 (1~3개)

# 중요 체크리스트

- [ ] 모든 명언이 역사적으로 검증됨
- [ ] 모든 sourceUrl이 실제 웹사이트
- [ ] 의역 없이 원문을 그대로 번역
- [ ] 길이 제약 준수 (한국어 60자)
- [ ] 다양한 시대/지역
- [ ] JSON 형식 정확함

**생성된 JSON 배열만 반환하세요. 다른 텍스트는 제외.**`;
}

/**
 * Claude API를 사용하여 명언 생성
 */
async function generateQuotes(standards) {
  console.log('🤖 Claude API를 사용하여 명언 생성 중...');

  try {
    const prompt = createGenerationPrompt(standards);

    const message = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // JSON 추출 (마크다운 코드블록이 있을 수 있음)
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1];
    } else {
      // JSON 배열 패턴 찾기
      const arrayMatch = responseText.match(/\[\s*\{[\s\S]*?\}\s*\]/);
      if (arrayMatch) {
        jsonStr = arrayMatch[0];
      }
    }

    const quotes = JSON.parse(jsonStr);

    if (!Array.isArray(quotes)) {
      throw new Error('생성된 결과가 배열이 아닙니다.');
    }

    console.log(`✅ ${quotes.length}개의 명언 후보가 생성되었습니다.`);
    return quotes;
  } catch (error) {
    console.error('❌ Claude API 호출 실패:', error.message);
    console.error('응답 전체:', error);
    process.exit(1);
  }
}

/**
 * 생성된 명언을 pending-quotes.json에 추가
 */
function savePendingQuotes(newQuotes) {
  try {
    const data = readPendingQuotes();

    // 새 명언을 pending에 추가
    data.pending = [...(data.pending || []), ...newQuotes];
    data.lastUpdated = new Date().toISOString().split('T')[0];

    // 디렉토리 확인
    const dir = path.dirname(PENDING_QUOTES_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(PENDING_QUOTES_PATH, JSON.stringify(data, null, 2));
    console.log(`💾 pending-quotes.json에 저장되었습니다. (${PENDING_QUOTES_PATH})`);
  } catch (error) {
    console.error('❌ pending-quotes.json 저장 실패:', error.message);
    process.exit(1);
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📚 명언 자동 생성 스크립트 시작');
  console.log('═══════════════════════════════════════════════════════════\n');

  // API 키 확인
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY 환경 변수가 설정되지 않았습니다.');
    console.error('사용법: export ANTHROPIC_API_KEY="sk-..." && node scripts/generate-quotes.js');
    process.exit(1);
  }

  try {
    // 1. QUOTE_STANDARDS.md 읽기
    console.log('📖 QUOTE_STANDARDS.md 읽기...');
    const standards = readQuoteStandards();
    console.log('✅ 기준 문서 읽기 완료\n');

    // 2. 명언 생성
    const newQuotes = await generateQuotes(standards);

    // 3. 생성된 명언 저장
    console.log('\n💾 생성된 명언 저장 중...');
    savePendingQuotes(newQuotes);

    // 4. 결과 출력
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ 명언 생성 완료!\n');
    console.log('📊 생성 결과:');
    newQuotes.forEach((quote, index) => {
      console.log(`\n${index + 1}. "${quote.text}"`);
      console.log(`   저자: ${quote.author}`);
      console.log(`   원문: ${quote.original}`);
      console.log(`   상황: ${quote.situation}`);
      console.log(`   태그: ${quote.tags.join(', ')}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('다음 단계: Collector UI에서 승인/거절하세요');
    console.log('http://localhost:3000/collector/\n');
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// 실행
main();
