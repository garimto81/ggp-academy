/**
 * GGP Academy - Interactive Module JavaScript
 * 인터랙티브 학습 컴포넌트 로직
 */

// 1. 게임 시뮬레이터 (Pre-flop → River)
class GameSimulator {
  constructor() {
    this.currentStage = 'preflop';
    this.stages = ['preflop', 'flop', 'turn', 'river'];
    this.init();
  }

  init() {
    // 다음 단계 버튼 이벤트
    document.querySelectorAll('.next-stage-btn').forEach(btn => {
      btn.addEventListener('click', () => this.nextStage());
    });

    // 처음부터 다시 버튼 이벤트
    document.querySelectorAll('.reset-game-btn').forEach(btn => {
      btn.addEventListener('click', () => this.reset());
    });
  }

  nextStage() {
    const currentIndex = this.stages.indexOf(this.currentStage);
    if (currentIndex < this.stages.length - 1) {
      const nextStage = this.stages[currentIndex + 1];

      // 현재 스테이지 숨기기
      document.querySelector(`[data-stage="${this.currentStage}"]`).style.display = 'none';

      // 다음 스테이지 표시
      document.querySelector(`[data-stage="${nextStage}"]`).style.display = 'block';

      this.currentStage = nextStage;

      // 카드 애니메이션
      this.animateCardReveal(nextStage);
    }
  }

  animateCardReveal(stage) {
    const stageElement = document.querySelector(`[data-stage="${stage}"]`);
    const cards = stageElement.querySelectorAll('.card-reveal');

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease';
        card.style.opacity = '1';
      }, index * 200);
    });
  }

  reset() {
    // 모든 스테이지 숨기기
    this.stages.forEach(stage => {
      document.querySelector(`[data-stage="${stage}"]`).style.display = 'none';
    });

    // 첫 스테이지 표시
    document.querySelector('[data-stage="preflop"]').style.display = 'block';
    this.currentStage = 'preflop';
  }
}

// 2. 패 랭킹 카드 (3D Flip)
class HandRankingCards {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.hand-card').forEach(card => {
      card.addEventListener('click', () => this.flipCard(card));
    });
  }

  flipCard(card) {
    card.classList.toggle('flipped');
  }
}

// 3. 퀴즈 시스템
class QuizSystem {
  constructor() {
    this.correctCount = 0;
    this.totalQuestions = 0;
    this.init();
  }

  init() {
    const questions = document.querySelectorAll('.quiz-question');
    this.totalQuestions = questions.length;

    questions.forEach((question, index) => {
      const options = question.querySelectorAll('.quiz-option');
      const feedback = question.querySelector('.quiz-feedback');

      options.forEach(option => {
        option.addEventListener('click', () => {
          this.handleAnswer(option, options, feedback);
        });
      });
    });

    // 다시 풀기 버튼
    const retryBtn = document.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => this.reset());
    }
  }

  handleAnswer(selectedOption, allOptions, feedback) {
    const isCorrect = selectedOption.dataset.correct === 'true';

    // 모든 옵션 비활성화
    allOptions.forEach(option => {
      option.disabled = true;
    });

    // 정답/오답 표시
    if (isCorrect) {
      selectedOption.classList.add('correct');
      feedback.textContent = '✅ 정답입니다!';
      feedback.classList.add('correct');
      this.correctCount++;
    } else {
      selectedOption.classList.add('incorrect');
      feedback.textContent = '❌ 오답입니다. 다시 생각해보세요.';
      feedback.classList.add('incorrect');

      // 정답 표시
      allOptions.forEach(option => {
        if (option.dataset.correct === 'true') {
          option.classList.add('correct');
        }
      });
    }

    feedback.style.display = 'block';

    // 모든 문제 답변 완료 시 결과 표시
    this.checkCompletion();
  }

  checkCompletion() {
    const answeredQuestions = document.querySelectorAll('.quiz-option:disabled').length / 4;

    if (answeredQuestions === this.totalQuestions) {
      setTimeout(() => {
        this.showResult();
      }, 1000);
    }
  }

  showResult() {
    // 모든 질문 숨기기
    document.querySelectorAll('.quiz-question').forEach(q => {
      q.style.display = 'none';
    });

    // 결과 표시
    const result = document.querySelector('.quiz-result');
    const scoreSpan = result.querySelector('#correct-count');
    scoreSpan.textContent = this.correctCount;
    result.style.display = 'block';

    // 스크롤
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  reset() {
    this.correctCount = 0;

    // 모든 옵션 초기화
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.disabled = false;
      option.classList.remove('correct', 'incorrect');
    });

    // 피드백 숨기기
    document.querySelectorAll('.quiz-feedback').forEach(feedback => {
      feedback.style.display = 'none';
      feedback.textContent = '';
      feedback.classList.remove('correct', 'incorrect');
    });

    // 질문 다시 표시
    document.querySelectorAll('.quiz-question').forEach(q => {
      q.style.display = 'block';
    });

    // 결과 숨기기
    document.querySelector('.quiz-result').style.display = 'none';

    // 첫 번째 질문으로 스크롤
    document.querySelector('.quiz-question').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// 4. 다음 모듈 CTA 버튼
class NextModuleCTA {
  constructor() {
    this.init();
  }

  init() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        // TODO: 실제 다음 모듈로 이동하는 로직 구현
        // 현재는 step-by-step.js의 nextStep() 호출
        if (typeof window.stepByStepModule !== 'undefined') {
          window.stepByStepModule.nextStep();
        }
      });
    }
  }
}

// 5. 타임라인 애니메이션 Intersection Observer
class TimelineAnimator {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }
}

// 6. 카드 호버 3D 효과 (고급)
class CardHoverEffect {
  constructor() {
    this.init();
  }

  init() {
    const cards = document.querySelectorAll('.player-card, .reason-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        this.handleMouseMove(e, card);
      });

      card.addEventListener('mouseleave', (e) => {
        this.handleMouseLeave(e, card);
      });
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  handleMouseLeave(e, card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }
}

// 7. 숫자 카운트업 애니메이션
class NumberCountUp {
  constructor() {
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          this.animateNumber(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.highlight-item .number').forEach(num => {
      observer.observe(num);
    });
  }

  animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/[\d\s]/g, '');

    if (isNaN(number)) return;

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        element.textContent = number + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, stepDuration);
  }
}

// 초기화 함수
function initInteractiveModule() {
  // DOM이 로드된 후 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

function init() {
  // 모든 인터랙티브 컴포넌트 초기화
  new GameSimulator();
  new HandRankingCards();
  new QuizSystem();
  new NextModuleCTA();
  new TimelineAnimator();
  new CardHoverEffect();
  new NumberCountUp();

  console.log('✅ Interactive module initialized');
}

// 자동 실행
initInteractiveModule();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GameSimulator,
    HandRankingCards,
    QuizSystem,
    NextModuleCTA,
    TimelineAnimator,
    CardHoverEffect,
    NumberCountUp
  };
}
