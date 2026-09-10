#!/usr/bin/env node

/**
 * update-quotes.js
 * 승인된 명언을 quotes.js에 추가합니다.
 * Collector UI에서 승인한 명언을 자동으로 메인 quotes.js에 통합합니다.
 *
 * 사용법: node scripts/update-quotes.js
 */

const fs = require('fs');
const path = require('path');

// 경로 설정
const QUOTES_JS_PATH = path.join(__dirname, '../quotes.js');
const PENDING_QUOTES_PATH = path.join(__dirname, '../collector/data/pending-quotes.json');

/**
 * quotes.js에서 현재 가장 큰 ID 찾기
 */
function findMaxId(quotesContent) {
  const idMatches = quotesContent.match(/id:\s*(\d+)/g);
  if (!idMatches || idMatches.length === 0) {
    return 65; // 기본값
  }
  const ids = idMatches.map(match => parseInt(match.match(/\d+/)[0]));
  return Math.max(...ids);
}

/**
 * quotes.js 읽기
 */
function readQuotesJs() {
  try {
    return fs.readFileSync(QUOTES_JS_PATH, 'utf-8');
  } catch (error) {
    console.error('❌ quotes.js를 읽을 수 없습니다:', error.message);
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
    console.error('❌ pending-quotes.json을 읽을 수 없습니다:', error.message);
    process.exit(1);
  }
  return { pending: [], approved: [], lastUpdated: new Date().toISOString().split('T')[0] };
}

/**
 * 승인된 명언을 quotes.js 형식으로 변환
 */
function convertToQuotesJsFormat(approvedQuote, nextId) {
  return {
    id: nextId,
    text: approvedQuote.text,
    author: approvedQuote.author,
    original: approvedQuote.original,
    lang: approvedQuote.lang,
    source: approvedQuote.source,
    year: approvedQuote.year,
    sourceUrl: approvedQuote.sourceUrl,
    tags: approvedQuote.tags,
  };
}

/**
 * quotes.js의 QUOTES 배열에 새 명언 추가
 */
function addQuotesToJs(quotesContent, newQuotes) {
  if (newQuotes.length === 0) {
    return quotesContent;
  }

  // QUOTES 배열 찾기
  const arrayMatch = quotesContent.match(/const QUOTES = \[([\s\S]*?)\n\];/);
  if (!arrayMatch) {
    console.error('❌ QUOTES 배열을 찾을 수 없습니다.');
    process.exit(1);
  }

  const oldArray = arrayMatch[0];
  const arrayContent = arrayMatch[1];

  // 새 명언들을 object literal로 변환
  const newQuotesStr = newQuotes
    .map(quote => {
      const tagsStr = JSON.stringify(quote.tags);
      return `  {
    id: ${quote.id},
    text: "${quote.text}",
    author: "${quote.author}",
    original: "${quote.original}",
    lang: "${quote.lang}",
    source: "${quote.source}",
    year: ${quote.year},
    sourceUrl: "${quote.sourceUrl}",
    tags: ${tagsStr},
  }`;
    })
    .join(',\n');

  // 마지막 쉼표 제거 및 새 명언 추가
  const newArrayContent = arrayContent.trimEnd() + ',\n' + newQuotesStr;
  const newArray = `const QUOTES = [\n${newArrayContent}\n];`;

  return quotesContent.replace(oldArray, newArray);
}

/**
 * quotes.js의 "다음 id" 주석 업데이트
 */
function updateNextIdComment(content, nextId) {
  return content.replace(/\/\/ 다음 id: \d+/i, `// 다음 id: ${nextId}`);
}

/**
 * quotes.js 저장
 */
function saveQuotesJs(content) {
  try {
    fs.writeFileSync(QUOTES_JS_PATH, content);
    console.log(`💾 quotes.js가 업데이트되었습니다.`);
  } catch (error) {
    console.error('❌ quotes.js 저장 실패:', error.message);
    process.exit(1);
  }
}

/**
 * pending-quotes.json 업데이트 (승인된 명언 처리 표시)
 */
function updatePendingQuotes(data, processedIndices) {
  if (processedIndices.length === 0) {
    return;
  }

  // 처리된 명언 제거 (역순으로 처리해야 인덱스가 밀리지 않음)
  const sortedIndices = [...processedIndices].sort((a, b) => b - a);
  for (const index of sortedIndices) {
    data.approved[index].processedAt = new Date().toISOString();
  }

  data.lastUpdated = new Date().toISOString().split('T')[0];

  try {
    const dir = path.dirname(PENDING_QUOTES_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PENDING_QUOTES_PATH, JSON.stringify(data, null, 2));
    console.log(`💾 pending-quotes.json이 업데이트되었습니다.`);
  } catch (error) {
    console.error('⚠️  pending-quotes.json 업데이트 실패:', error.message);
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('📝 quotes.js 업데이트 스크립트 시작');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // 1. 현재 상태 읽기
    console.log('📖 파일 읽기 중...');
    const quotesContent = readQuotesJs();
    const pendingData = readPendingQuotes();
    const approvedQuotes = pendingData.approved || [];

    console.log(`✅ quotes.js 읽기 완료`);
    console.log(`✅ pending-quotes.json 읽기 완료`);
    console.log(`   └─ 승인됨: ${approvedQuotes.length}개\n`);

    if (approvedQuotes.length === 0) {
      console.log('⏭️  처리할 승인된 명언이 없습니다.');
      process.exit(0);
    }

    // 2. 아직 처리되지 않은 명언 필터링
    const unprocessedQuotes = approvedQuotes.filter(q => !q.processedAt);
    console.log(`📊 처리할 명언: ${unprocessedQuotes.length}개\n`);

    if (unprocessedQuotes.length === 0) {
      console.log('✅ 모든 승인된 명언이 이미 처리되었습니다.');
      process.exit(0);
    }

    // 3. 다음 ID 계산
    const maxId = findMaxId(quotesContent);
    let nextId = maxId + 1;

    console.log(`📊 현재 최대 ID: ${maxId}`);
    console.log(`📊 다음 ID부터 시작: ${nextId}\n`);

    // 4. 승인된 명언을 quotes.js 형식으로 변환
    console.log('🔄 형식 변환 중...');
    const quotesJsFormat = unprocessedQuotes.map(quote => {
      const converted = convertToQuotesJsFormat(quote, nextId);
      nextId++;
      return converted;
    });

    console.log(`✅ ${quotesJsFormat.length}개 명언 형식 변환 완료\n`);

    // 5. quotes.js에 추가
    console.log('🔀 quotes.js에 명언 추가 중...');
    let updatedContent = addQuotesToJs(quotesContent, quotesJsFormat);

    // 6. "다음 id" 주석 업데이트
    updatedContent = updateNextIdComment(updatedContent, nextId);
    console.log(`✅ "다음 id" 주석 업데이트: ${nextId}`);

    // 7. quotes.js 저장
    console.log('');
    saveQuotesJs(updatedContent);

    // 8. pending-quotes.json 업데이트
    const processedIndices = unprocessedQuotes.map(q =>
      approvedQuotes.indexOf(q)
    ).filter(i => i !== -1);
    updatePendingQuotes(pendingData, processedIndices);

    // 9. 결과 출력
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ quotes.js 업데이트 완료!\n');
    console.log('📊 추가된 명언:');
    quotesJsFormat.forEach((quote, index) => {
      console.log(`\n${index + 1}. [ID: ${quote.id}] "${quote.text}"`);
      console.log(`   저자: ${quote.author}`);
      console.log(`   태그: ${quote.tags.join(', ')}`);
    });

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`다음 ID: ${nextId}\n`);
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 실행
main();
