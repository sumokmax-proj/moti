// 명언 수집기 로직
class QuoteCollector {
  constructor() {
    this.pendingFile = './data/pending-quotes.json';
    this.quotesFile = '../quotes.js';
  }

  // 상황별 태그
  SITUATION_TAGS = {
    despair: {
      name: '절망할 때',
      emoji: '😔',
      description: '계속해도 괜찮아, 다시 일어날 수 있어'
    },
    failure: {
      name: '실패했을 때',
      emoji: '😤',
      description: '실패는 배움, 넘어져도 일어나'
    },
    challenge: {
      name: '도전할 때',
      emoji: '🚀',
      description: '할 수 있어, 지금이 시작하기 좋은 때'
    },
    fear: {
      name: '두려울 때',
      emoji: '😟',
      description: '이것도 지나간다, 무서워도 나아가'
    },
    love: {
      name: '관계의 어려움',
      emoji: '💔',
      description: '연결됨의 소중함, 함께라는 것'
    },
    success: {
      name: '성공했을 때',
      emoji: '😊',
      description: '계속해, 더 높이'
    },
    meaning: {
      name: '의미를 묻을 때',
      emoji: '🤔',
      description: '왜 사는가?, 내 삶의 목적'
    },
    energy: {
      name: '활기가 필요할 때',
      emoji: '⚡',
      description: '해내자!, 지금이야!'
    }
  };

  // 주제 카테고리
  THEMES = {
    determination: '의지/도전',
    passion: '열정/사랑',
    preparation: '준비/노력',
    hope: '희망',
    success: '성공/가치',
    freedom: '자유/개인의지',
    perseverance: '인내/꾸준함',
    oriental: '동양철학',
    failure_acceptance: '실패 수용',
    relationships: '사랑&관계',
    meaning: '죽음&의미',
    humor: '유머&역설'
  };

  /**
   * 새로운 명언을 pending 상태로 추가
   * @param {Object} quote - 명언 객체
   */
  async addPendingQuote(quote) {
    const requiredFields = ['text', 'author', 'original', 'lang', 'source', 'year', 'tags'];
    const missingFields = requiredFields.filter(field => !quote[field]);

    if (missingFields.length > 0) {
      throw new Error(`필수 필드 누락: ${missingFields.join(', ')}`);
    }

    // 유효한 태그 확인
    if (!Array.isArray(quote.tags) || quote.tags.length === 0) {
      throw new Error('최소 1개 이상의 태그가 필요합니다');
    }

    const invalidTags = quote.tags.filter(tag => !this.SITUATION_TAGS[tag] && !this.THEMES[tag]);
    if (invalidTags.length > 0) {
      throw new Error(`유효하지 않은 태그: ${invalidTags.join(', ')}`);
    }

    const newQuote = {
      tempId: `temp_${Date.now()}`,
      status: 'pending',
      addedAt: new Date().toISOString(),
      source_verified: false,
      ...quote
    };

    return newQuote;
  }

  /**
   * 명언 구조 검증
   */
  validateQuote(quote) {
    const errors = [];

    // 필수 필드 확인
    const required = ['text', 'author', 'original', 'lang', 'source', 'year', 'sourceUrl', 'tags'];
    for (const field of required) {
      if (!quote[field]) {
        errors.push(`${field} - 필수 필드 누락`);
      }
    }

    // 텍스트 길이 확인 (너무 길면 안 됨)
    if (quote.text && quote.text.length > 200) {
      errors.push('text - 200자 이내로 제한됩니다');
    }

    // 연도 타입 확인
    if (quote.year && typeof quote.year !== 'number') {
      errors.push('year - 숫자 타입이어야 합니다');
    }

    // 태그 확인
    if (quote.tags && Array.isArray(quote.tags)) {
      const invalidTags = quote.tags.filter(
        tag => !this.SITUATION_TAGS[tag] && !this.THEMES[tag]
      );
      if (invalidTags.length > 0) {
        errors.push(`tags - 유효하지 않은 태그: ${invalidTags.join(', ')}`);
      }
    }

    // 언어 코드 확인 (ISO 639 3자리 코드)
    const validLangs = ['en', 'ko', 'zh', 'lzh', 'de', 'fr', 'ja', 'es', 'it', 'ru', 'la', 'nl'];
    if (quote.lang && !validLangs.includes(quote.lang)) {
      errors.push(`lang - 지원하지 않는 언어 코드: ${quote.lang}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 명언을 quotes.js에 추가하기 위해 준비
   * @param {Object} quote - 검증된 명언 객체
   */
  prepareForQuotesJs(quote) {
    // tempId를 제거하고 정식 ID 할당
    const { tempId, status, addedAt, ...cleanQuote } = quote;
    return cleanQuote;
  }

  /**
   * 상황 태그 목록 반환
   */
  getSituationTags() {
    return this.SITUATION_TAGS;
  }

  /**
   * 주제 카테고리 목록 반환
   */
  getThemes() {
    return this.THEMES;
  }

  /**
   * 명언을 상황별로 필터링
   * @param {Array} quotes - 명언 배열
   * @param {String} tag - 필터링할 태그
   */
  filterByTag(quotes, tag) {
    return quotes.filter(quote =>
      quote.tags && quote.tags.includes(tag)
    );
  }

  /**
   * 명언을 주제별로 필터링
   * @param {Array} quotes - 명언 배열
   * @param {String} theme - 필터링할 주제
   */
  filterByTheme(quotes, theme) {
    return quotes.filter(quote =>
      quote.themes && quote.themes.includes(theme)
    );
  }
}

// 전역 객체로 사용 가능하게
if (typeof window !== 'undefined') {
  window.quoteCollector = new QuoteCollector();
}

// Node.js 환경에서도 사용 가능하게
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuoteCollector;
}
