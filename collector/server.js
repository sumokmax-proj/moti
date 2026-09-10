#!/usr/bin/env node

/**
 * Collector Backend Server
 * 명언 수집기의 백엔드 API 서버
 *
 * 제공 엔드포인트:
 * - GET  /api/quotes/pending - 검증 대기 중인 명언
 * - GET  /api/quotes/approved - 승인된 명언
 * - POST /api/quotes/approve - 명언 승인
 * - POST /api/quotes/reject - 명언 거절
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const DATA_FILE = path.join(__dirname, 'data/pending-quotes.json');
const PORT = process.env.PORT || 3001;

/**
 * 데이터 파일 읽기
 */
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('데이터 파일 읽기 오류:', error);
  }
  return { pending: [], approved: [], lastUpdated: new Date().toISOString().split('T')[0] };
}

/**
 * 데이터 파일 쓰기
 */
function writeData(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('데이터 파일 쓰기 오류:', error);
    return false;
  }
}

/**
 * JSON 응답
 */
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 * 요청 바디 파싱
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * 요청 핸들러
 */
async function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // GET /api/quotes/pending
    if (method === 'GET' && pathname === '/api/quotes/pending') {
      const data = readData();
      sendJson(res, 200, {
        pending: data.pending || [],
        count: (data.pending || []).length,
      });
      return;
    }

    // GET /api/quotes/approved
    if (method === 'GET' && pathname === '/api/quotes/approved') {
      const data = readData();
      sendJson(res, 200, {
        approved: data.approved || [],
        count: (data.approved || []).length,
      });
      return;
    }

    // POST /api/quotes/approve
    if (method === 'POST' && pathname === '/api/quotes/approve') {
      const body = await parseBody(req);
      const { tempId } = body;

      if (!tempId) {
        sendJson(res, 400, { error: 'tempId is required' });
        return;
      }

      const data = readData();
      const index = (data.pending || []).findIndex(q => q.tempId === tempId);

      if (index === -1) {
        sendJson(res, 404, { error: 'Quote not found' });
        return;
      }

      const quote = data.pending[index];
      quote.approvedAt = new Date().toISOString();
      quote.status = 'approved';

      data.approved = [...(data.approved || []), quote];
      data.pending.splice(index, 1);
      data.lastUpdated = new Date().toISOString().split('T')[0];

      if (writeData(data)) {
        sendJson(res, 200, {
          success: true,
          message: '명언이 승인되었습니다.',
          quote,
        });
      } else {
        sendJson(res, 500, { error: 'Failed to save data' });
      }
      return;
    }

    // POST /api/quotes/reject
    if (method === 'POST' && pathname === '/api/quotes/reject') {
      const body = await parseBody(req);
      const { tempId, reason } = body;

      if (!tempId) {
        sendJson(res, 400, { error: 'tempId is required' });
        return;
      }

      const data = readData();
      const index = (data.pending || []).findIndex(q => q.tempId === tempId);

      if (index === -1) {
        sendJson(res, 404, { error: 'Quote not found' });
        return;
      }

      const quote = data.pending[index];
      const rejected = {
        ...quote,
        rejectedAt: new Date().toISOString(),
        status: 'rejected',
        rejectionReason: reason || 'No reason provided',
      };

      data.rejected = [...(data.rejected || []), rejected];
      data.pending.splice(index, 1);
      data.lastUpdated = new Date().toISOString().split('T')[0];

      if (writeData(data)) {
        sendJson(res, 200, {
          success: true,
          message: '명언이 거절되었습니다.',
          quote: rejected,
        });
      } else {
        sendJson(res, 500, { error: 'Failed to save data' });
      }
      return;
    }

    // GET / (health check)
    if (method === 'GET' && pathname === '/') {
      sendJson(res, 200, {
        status: 'ok',
        message: 'Collector Backend Server is running',
        version: '1.0.0',
      });
      return;
    }

    sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('요청 처리 오류:', error);
    sendJson(res, 500, { error: error.message });
  }
}

// 서버 생성
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`🚀 Collector Backend Server 시작`);
  console.log(`═══════════════════════════════════════════════════════════`);
  console.log(`📍 주소: http://localhost:${PORT}`);
  console.log(`📁 데이터: ${DATA_FILE}`);
  console.log(`═══════════════════════════════════════════════════════════\n`);

  console.log('📌 API 엔드포인트:');
  console.log(`   GET  http://localhost:${PORT}/api/quotes/pending   - 검증 대기 중`);
  console.log(`   GET  http://localhost:${PORT}/api/quotes/approved   - 승인됨`);
  console.log(`   POST http://localhost:${PORT}/api/quotes/approve    - 승인`);
  console.log(`   POST http://localhost:${PORT}/api/quotes/reject     - 거절\n`);

  console.log('💡 Collector UI: http://localhost:8000/collector/');
  console.log('(http-server로 정적 파일 서빙)\n');
});

server.on('error', (error) => {
  console.error('❌ 서버 오류:', error);
  process.exit(1);
});

// 우아한 종료
process.on('SIGTERM', () => {
  console.log('\n📍 서버 종료 중...');
  server.close(() => {
    console.log('✅ 서버 종료됨');
    process.exit(0);
  });
});
