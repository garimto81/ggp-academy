/**
 * GGP Academy - Layer 1: Instant Check 시스템
 * 각 모듈 학습 후 즉시 확인 퀴즈
 */

class InstantCheckQuiz {
  constructor(quizData) {
    this.quizData = quizData; // { moduleId, questions: [...] }
    this.currentQuestion = 0;
    this.answers = [];
    this.score = 0;
    this.passThreshold = 70; // 70% 이상 통과
  }

  /**
   * 퀴즈 렌더링
   */
  render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = `
      <div class="instant-check-quiz" id="quiz-${this.quizData.moduleId}">
        <!-- Header -->
        <div class="quiz-header">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold">📝 학습 확인</h3>
            <div class="text-sm text-zinc-400">
              <span id="quiz-progress-${this.quizData.moduleId}">1</span>/${this.quizData.questions.length}
            </div>
          </div>
          <div class="progress-container mb-6">
            <div id="quiz-progress-bar-${this.quizData.moduleId}" class="progress-fill" style="width: 0%"></div>
          </div>
        </div>

        <!-- Questions Container -->
        <div id="quiz-questions-${this.quizData.moduleId}">
          ${this.renderQuestions()}
        </div>

        <!-- Results (hidden initially) -->
        <div id="quiz-results-${this.quizData.moduleId}" class="quiz-results" style="display: none;">
          <!-- Results will be injected here -->
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * 모든 질문 렌더링
   */
  renderQuestions() {
    return this.quizData.questions.map((q, index) => {
      const isFirst = index === 0;
      return `
        <div class="quiz-question-card ${isFirst ? 'active' : ''}"
             data-question="${index}"
             id="question-${this.quizData.moduleId}-${index}">

          <!-- Question Header -->
          <div class="question-header mb-6">
            <div class="flex items-start gap-3">
              <div class="question-icon">
                ${q.type === 'scenario' ? '🎬' : q.type === 'priority' ? '📋' : '❓'}
              </div>
              <div class="flex-1">
                <div class="text-xs text-zinc-500 mb-1 uppercase tracking-wide">
                  ${this.getQuestionTypeLabel(q.type)}
                </div>
                <h4 class="text-lg font-semibold mb-2">${q.question}</h4>
                ${q.context ? `<p class="text-sm text-zinc-400 mb-3">${q.context}</p>` : ''}
              </div>
            </div>
          </div>

          <!-- Options -->
          <div class="question-options space-y-3 mb-6">
            ${this.renderOptions(q, index)}
          </div>

          <!-- Feedback (hidden initially) -->
          <div class="question-feedback" id="feedback-${this.quizData.moduleId}-${index}" style="display: none;">
            <!-- Feedback will be injected here -->
          </div>

          <!-- Navigation -->
          <div class="question-navigation flex justify-between items-center mt-6 pt-6 border-t border-zinc-700">
            <button
              onclick="quizInstance_${this.quizData.moduleId}.previousQuestion()"
              class="btn-secondary ${index === 0 ? 'invisible' : ''}"
              ${index === 0 ? 'disabled' : ''}>
              ← 이전
            </button>
            <button
              onclick="quizInstance_${this.quizData.moduleId}.nextQuestion()"
              class="btn-primary"
              id="next-btn-${this.quizData.moduleId}-${index}"
              disabled>
              ${index === this.quizData.questions.length - 1 ? '결과 보기' : '다음 →'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * 질문 타입별 옵션 렌더링
   */
  renderOptions(question, qIndex) {
    switch (question.type) {
      case 'multiple-choice':
        return this.renderMultipleChoice(question, qIndex);
      case 'scenario':
        return this.renderScenario(question, qIndex);
      case 'priority':
        return this.renderPriority(question, qIndex);
      default:
        return this.renderMultipleChoice(question, qIndex);
    }
  }

  /**
   * 객관식 렌더링
   */
  renderMultipleChoice(question, qIndex) {
    return question.options.map((option, oIndex) => `
      <div class="option-card"
           data-question="${qIndex}"
           data-option="${oIndex}"
           onclick="quizInstance_${this.quizData.moduleId}.selectOption(${qIndex}, ${oIndex})">
        <div class="option-radio">
          <div class="radio-circle"></div>
        </div>
        <div class="option-text">${option}</div>
      </div>
    `).join('');
  }

  /**
   * 시나리오 문제 렌더링
   */
  renderScenario(question, qIndex) {
    return `
      <div class="scenario-box mb-4">
        <div class="scenario-icon">🎬</div>
        <div class="scenario-content">
          ${question.scenario}
        </div>
      </div>
      ${this.renderMultipleChoice(question, qIndex)}
    `;
  }

  /**
   * 우선순위 문제 렌더링
   */
  renderPriority(question, qIndex) {
    return `
      <div class="priority-instructions mb-4">
        <div class="text-sm text-zinc-400">
          💡 올바른 순서대로 선택하세요
        </div>
      </div>
      ${question.options.map((option, oIndex) => `
        <div class="option-card priority-option"
             data-question="${qIndex}"
             data-option="${oIndex}"
             onclick="quizInstance_${this.quizData.moduleId}.selectPriorityOption(${qIndex}, ${oIndex})">
          <div class="priority-number" id="priority-num-${qIndex}-${oIndex}"></div>
          <div class="option-text">${option}</div>
        </div>
      `).join('')}
    `;
  }

  /**
   * 질문 타입 레이블
   */
  getQuestionTypeLabel(type) {
    const labels = {
      'multiple-choice': '객관식',
      'scenario': '상황 판단',
      'priority': '우선순위'
    };
    return labels[type] || '질문';
  }

  /**
   * 옵션 선택 (객관식/시나리오)
   */
  selectOption(questionIndex, optionIndex) {
    // 이미 답변했으면 무시
    if (this.answers[questionIndex] !== undefined) return;

    const question = this.quizData.questions[questionIndex];
    const isCorrect = optionIndex === question.correctAnswer;

    // 답변 저장
    this.answers[questionIndex] = optionIndex;

    // UI 업데이트
    const questionCard = document.querySelector(`#question-${this.quizData.moduleId}-${questionIndex}`);
    const options = questionCard.querySelectorAll('.option-card');

    options.forEach((opt, idx) => {
      opt.classList.remove('selected');
      if (idx === optionIndex) {
        opt.classList.add('selected');
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
      // 정답 표시
      if (idx === question.correctAnswer) {
        opt.classList.add('correct-answer');
      }
      // 더 이상 클릭 불가
      opt.style.pointerEvents = 'none';
    });

    // 피드백 표시
    this.showFeedback(questionIndex, isCorrect);

    // 다음 버튼 활성화
    const nextBtn = document.getElementById(`next-btn-${this.quizData.moduleId}-${questionIndex}`);
    if (nextBtn) nextBtn.disabled = false;

    // 점수 업데이트
    if (isCorrect) this.score++;
  }

  /**
   * 우선순위 선택
   */
  selectPriorityOption(questionIndex, optionIndex) {
    if (!this.answers[questionIndex]) {
      this.answers[questionIndex] = [];
    }

    const selectedOrder = this.answers[questionIndex];
    const question = this.quizData.questions[questionIndex];

    // 이미 선택된 옵션이면 제거
    const existingIndex = selectedOrder.indexOf(optionIndex);
    if (existingIndex !== -1) {
      selectedOrder.splice(existingIndex, 1);
    } else {
      selectedOrder.push(optionIndex);
    }

    // UI 업데이트
    const questionCard = document.querySelector(`#question-${this.quizData.moduleId}-${questionIndex}`);
    const options = questionCard.querySelectorAll('.priority-option');

    options.forEach((opt, idx) => {
      const numEl = opt.querySelector('.priority-number');
      const orderIndex = selectedOrder.indexOf(idx);

      if (orderIndex !== -1) {
        opt.classList.add('selected');
        numEl.textContent = orderIndex + 1;
      } else {
        opt.classList.remove('selected');
        numEl.textContent = '';
      }
    });

    // 모든 옵션을 선택했으면 정답 확인
    if (selectedOrder.length === question.options.length) {
      const isCorrect = JSON.stringify(selectedOrder) === JSON.stringify(question.correctAnswer);

      // 피드백 표시
      this.showFeedback(questionIndex, isCorrect);

      // 옵션 비활성화
      options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (!isCorrect) {
          opt.classList.add('incorrect');
        }
      });

      // 다음 버튼 활성화
      const nextBtn = document.getElementById(`next-btn-${this.quizData.moduleId}-${questionIndex}`);
      if (nextBtn) nextBtn.disabled = false;

      // 점수 업데이트
      if (isCorrect) this.score++;
    }
  }

  /**
   * 피드백 표시
   */
  showFeedback(questionIndex, isCorrect) {
    const question = this.quizData.questions[questionIndex];
    const feedbackEl = document.getElementById(`feedback-${this.quizData.moduleId}-${questionIndex}`);

    const feedbackHtml = `
      <div class="feedback-content ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
        <div class="feedback-icon">
          ${isCorrect ? '✅' : '❌'}
        </div>
        <div class="feedback-text">
          <div class="font-bold mb-2">
            ${isCorrect ? '정답입니다!' : '아쉽습니다!'}
          </div>
          <div class="text-sm text-zinc-300">
            ${question.explanation}
          </div>
          ${question.tip ? `
            <div class="feedback-tip mt-3">
              💡 <strong>현장 팁:</strong> ${question.tip}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    feedbackEl.innerHTML = feedbackHtml;
    feedbackEl.style.display = 'block';

    // 부드럽게 스크롤
    setTimeout(() => {
      feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }

  /**
   * 다음 질문
   */
  nextQuestion() {
    const totalQuestions = this.quizData.questions.length;

    if (this.currentQuestion < totalQuestions - 1) {
      // 현재 질문 숨기기
      const currentCard = document.querySelector(`#question-${this.quizData.moduleId}-${this.currentQuestion}`);
      currentCard.classList.remove('active');

      // 다음 질문으로
      this.currentQuestion++;

      // 다음 질문 표시
      const nextCard = document.querySelector(`#question-${this.quizData.moduleId}-${this.currentQuestion}`);
      nextCard.classList.add('active');
      nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 진도율 업데이트
      this.updateProgress();
    } else {
      // 모든 질문 완료 → 결과 표시
      this.showResults();
    }
  }

  /**
   * 이전 질문
   */
  previousQuestion() {
    if (this.currentQuestion > 0) {
      // 현재 질문 숨기기
      const currentCard = document.querySelector(`#question-${this.quizData.moduleId}-${this.currentQuestion}`);
      currentCard.classList.remove('active');

      // 이전 질문으로
      this.currentQuestion--;

      // 이전 질문 표시
      const prevCard = document.querySelector(`#question-${this.quizData.moduleId}-${this.currentQuestion}`);
      prevCard.classList.add('active');
      prevCard.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 진도율 업데이트
      this.updateProgress();
    }
  }

  /**
   * 진도율 업데이트
   */
  updateProgress() {
    const progressText = document.getElementById(`quiz-progress-${this.quizData.moduleId}`);
    const progressBar = document.getElementById(`quiz-progress-bar-${this.quizData.moduleId}`);

    const progress = ((this.currentQuestion + 1) / this.quizData.questions.length) * 100;

    if (progressText) progressText.textContent = this.currentQuestion + 1;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }

  /**
   * 결과 표시
   */
  showResults() {
    const totalQuestions = this.quizData.questions.length;
    const percentage = Math.round((this.score / totalQuestions) * 100);
    const passed = percentage >= this.passThreshold;

    // 질문 컨테이너 숨기기
    const questionsContainer = document.getElementById(`quiz-questions-${this.quizData.moduleId}`);
    questionsContainer.style.display = 'none';

    // 결과 표시
    const resultsContainer = document.getElementById(`quiz-results-${this.quizData.moduleId}`);

    const resultsHtml = `
      <div class="quiz-results-content">
        <!-- Score Circle -->
        <div class="score-circle ${passed ? 'passed' : 'failed'}">
          <div class="score-number">${percentage}%</div>
          <div class="score-label">정답률</div>
        </div>

        <!-- Status -->
        <div class="results-status ${passed ? 'status-passed' : 'status-failed'}">
          <div class="status-icon">
            ${passed ? '🎉' : '😔'}
          </div>
          <h3 class="text-2xl font-bold mb-2">
            ${passed ? '학습 완료!' : '복습이 필요합니다'}
          </h3>
          <p class="text-zinc-400">
            ${passed
              ? `${this.score}/${totalQuestions} 문제를 맞추셨습니다!`
              : `${this.score}/${totalQuestions} 문제를 맞추셨습니다. (통과 기준: ${this.passThreshold}%)`
            }
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="results-actions">
          ${!passed ? `
            <button
              onclick="quizInstance_${this.quizData.moduleId}.retryQuiz()"
              class="btn-primary w-full mb-3">
              🔄 다시 풀기
            </button>
            <button
              onclick="quizInstance_${this.quizData.moduleId}.reviewContent()"
              class="btn-secondary w-full">
              📖 내용 복습하기
            </button>
          ` : `
            <button
              onclick="completeModuleWithQuiz('${this.quizData.moduleId}', ${percentage})"
              class="btn-primary w-full">
              ✓ 완료하고 다음으로
            </button>
          `}
        </div>

        <!-- Performance Breakdown -->
        <div class="performance-breakdown mt-6">
          <h4 class="text-sm font-semibold text-zinc-400 mb-3">문제별 정답 현황</h4>
          <div class="space-y-2">
            ${this.quizData.questions.map((q, idx) => {
              const userAnswer = this.answers[idx];
              const isCorrect = q.type === 'priority'
                ? JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer)
                : userAnswer === q.correctAnswer;

              return `
                <div class="performance-item">
                  <span class="performance-icon">${isCorrect ? '✅' : '❌'}</span>
                  <span class="performance-text">Q${idx + 1}. ${q.question.substring(0, 40)}...</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    resultsContainer.innerHTML = resultsHtml;
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 결과를 localStorage에 저장
    this.saveResults(percentage, passed);
  }

  /**
   * 결과 저장
   */
  saveResults(percentage, passed) {
    const results = {
      moduleId: this.quizData.moduleId,
      score: this.score,
      total: this.quizData.questions.length,
      percentage,
      passed,
      timestamp: Date.now()
    };

    // localStorage에 저장
    const key = `quiz_result_${this.quizData.moduleId}`;
    localStorage.setItem(key, JSON.stringify(results));
  }

  /**
   * 퀴즈 재시도
   */
  retryQuiz() {
    this.currentQuestion = 0;
    this.answers = [];
    this.score = 0;

    // 결과 숨기기
    const resultsContainer = document.getElementById(`quiz-results-${this.quizData.moduleId}`);
    resultsContainer.style.display = 'none';

    // 질문 컨테이너 다시 표시
    const questionsContainer = document.getElementById(`quiz-questions-${this.quizData.moduleId}`);
    questionsContainer.style.display = 'block';

    // 모든 질문 초기화
    const allQuestions = questionsContainer.querySelectorAll('.quiz-question-card');
    allQuestions.forEach((card, idx) => {
      card.classList.remove('active');
      if (idx === 0) card.classList.add('active');

      // 옵션 초기화
      const options = card.querySelectorAll('.option-card');
      options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect', 'correct-answer');
        opt.style.pointerEvents = 'auto';
      });

      // 우선순위 번호 초기화
      const priorityNums = card.querySelectorAll('.priority-number');
      priorityNums.forEach(num => num.textContent = '');

      // 피드백 숨기기
      const feedback = card.querySelector('.question-feedback');
      if (feedback) feedback.style.display = 'none';

      // 다음 버튼 비활성화
      const nextBtn = card.querySelector(`#next-btn-${this.quizData.moduleId}-${idx}`);
      if (nextBtn) nextBtn.disabled = true;
    });

    // 진도율 초기화
    this.updateProgress();

    // 첫 질문으로 스크롤
    allQuestions[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * 내용 복습
   */
  reviewContent() {
    // 모듈 콘텐츠 섹션으로 스크롤
    const moduleContent = document.querySelector(`#content-${this.quizData.moduleId}`);
    if (moduleContent) {
      moduleContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * 이벤트 리스너 연결
   */
  attachEventListeners() {
    // 필요시 추가 이벤트 리스너
  }
}

/**
 * 전역 함수: 퀴즈 통과 후 모듈 완료
 */
window.completeModuleWithQuiz = function(moduleId, score) {
  // academy.html의 completeModule 호출
  if (typeof window.completeModule === 'function') {
    window.completeModule(moduleId);
  }
};

/**
 * 퀴즈 데이터 Export
 */
window.InstantCheckQuiz = InstantCheckQuiz;
