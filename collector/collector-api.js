/**
 * Collector API Client
 * pending-quotes.json과 통신하는 API 클라이언트
 */

class CollectorAPI {
  constructor(baseUrl = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
    this.useFallback = false;
  }

  /**
   * API 요청
   */
  async request(endpoint, method = 'GET', data = null) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`⚠️  API 요청 실패: ${endpoint}`, error.message);
      this.useFallback = true;
      throw error;
    }
  }

  /**
   * 검증 대기 중인 명언 가져오기
   */
  async getPendingQuotes() {
    try {
      const response = await this.request('/api/quotes/pending');
      return response.pending || [];
    } catch (error) {
      return this.getPendingFromLocalStorage();
    }
  }

  /**
   * 승인된 명언 가져오기
   */
  async getApprovedQuotes() {
    try {
      const response = await this.request('/api/quotes/approved');
      return response.approved || [];
    } catch (error) {
      return this.getApprovedFromLocalStorage();
    }
  }

  /**
   * 명언 승인
   */
  async approveQuote(tempId) {
    try {
      const response = await this.request('/api/quotes/approve', 'POST', {
        tempId,
      });
      return response.success;
    } catch (error) {
      return this.approveQuoteToLocalStorage(tempId);
    }
  }

  /**
   * 명언 거절
   */
  async rejectQuote(tempId, reason = '') {
    try {
      const response = await this.request('/api/quotes/reject', 'POST', {
        tempId,
        reason,
      });
      return response.success;
    } catch (error) {
      return this.rejectQuoteFromLocalStorage(tempId);
    }
  }

  // localStorage 폴백 메서드들
  getPendingFromLocalStorage() {
    console.log('💾 localStorage에서 검증 대기 명언 읽기');
    return JSON.parse(localStorage.getItem('pendingQuotes') || '[]');
  }

  getApprovedFromLocalStorage() {
    console.log('💾 localStorage에서 승인된 명언 읽기');
    return JSON.parse(localStorage.getItem('approvedQuotes') || '[]');
  }

  approveQuoteToLocalStorage(tempId) {
    const pending = this.getPendingFromLocalStorage();
    const approved = this.getApprovedFromLocalStorage();

    const index = pending.findIndex(q => q.tempId === tempId);
    if (index === -1) return false;

    const quote = pending[index];
    approved.push({ ...quote, status: 'approved' });

    pending.splice(index, 1);
    localStorage.setItem('pendingQuotes', JSON.stringify(pending));
    localStorage.setItem('approvedQuotes', JSON.stringify(approved));

    return true;
  }

  rejectQuoteFromLocalStorage(tempId) {
    const pending = this.getPendingFromLocalStorage();

    const index = pending.findIndex(q => q.tempId === tempId);
    if (index === -1) return false;

    pending.splice(index, 1);
    localStorage.setItem('pendingQuotes', JSON.stringify(pending));

    return true;
  }

  /**
   * 상황별 태그 반환
   */
  getSituationTags() {
    return {
      despair: {
        name: '절망할 때',
        emoji: '😔',
        description: '계속해도 괜찮아, 다시 일어날 수 있어',
      },
      failure: {
        name: '실패했을 때',
        emoji: '😤',
        description: '실패는 배움, 넘어져도 일어나',
      },
      challenge: {
        name: '도전할 때',
        emoji: '🚀',
        description: '할 수 있어, 지금이 시작하기 좋은 때',
      },
      fear: {
        name: '두려울 때',
        emoji: '😟',
        description: '이것도 지나간다, 무서워도 나아가',
      },
      love: {
        name: '관계의 어려움',
        emoji: '💔',
        description: '연결됨의 소중함, 함께라는 것',
      },
      success: {
        name: '성공했을 때',
        emoji: '😊',
        description: '계속해, 더 높이',
      },
      meaning: {
        name: '의미를 묻을 때',
        emoji: '🤔',
        description: '왜 사는가?, 내 삶의 목적',
      },
      energy: {
        name: '활기가 필요할 때',
        emoji: '⚡',
        description: '해내자!, 지금이야!',
      },
    };
  }

  /**
   * 명언 검증
   */
  validateQuote(quote) {
    const errors = [];

    const required = ['text', 'author', 'original', 'lang', 'source', 'year', 'sourceUrl', 'tags'];
    for (const field of required) {
      if (!quote[field]) {
        errors.push(`${field} - 필수 필드 누락`);
      }
    }

    if (quote.text && quote.text.length > 200) {
      errors.push('text - 200자 이내로 제한됩니다');
    }

    if (quote.year && typeof quote.year !== 'number') {
      errors.push('year - 숫자 타입이어야 합니다');
    }

    const validTags = Object.keys(this.getSituationTags());
    if (quote.tags && Array.isArray(quote.tags)) {
      const invalidTags = quote.tags.filter(tag => !validTags.includes(tag));
      if (invalidTags.length > 0) {
        errors.push(`tags - 유효하지 않은 태그: ${invalidTags.join(', ')}`);
      }
    }

    const validLangs = ['en', 'ko', 'zh', 'lzh', 'de', 'fr', 'ja', 'es', 'it', 'ru', 'la', 'nl'];
    if (quote.lang && !validLangs.includes(quote.lang)) {
      errors.push(`lang - 지원하지 않는 언어 코드: ${quote.lang}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// 전역 인스턴스 생성
window.collectorAPI = new CollectorAPI();

// 옛 호환성을 위한 wrapper
window.quoteCollector = {
  getSituationTags: () => window.collectorAPI.getSituationTags(),
  validateQuote: (quote) => window.collectorAPI.validateQuote(quote),
};
