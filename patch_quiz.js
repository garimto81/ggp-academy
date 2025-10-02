// academy.html의 loadModuleContent 함수에 퀴즈 로직 추가할 패치

// 기존 loadModuleContent 함수 (367-384행)를 다음으로 교체:

async function loadModuleContent(moduleId) {
  const contentEl = document.getElementById(`content-${moduleId}`);
  const module = CURRICULUM_V2.steps.flatMap(s => s.modules).find(m => m.id === moduleId);

  if (!module) return;

  contentEl.innerHTML = '<div class="text-center py-8 text-zinc-400">로딩 중...</div>';

  const html = await loadMarkdown(module.path);
  contentEl.innerHTML = html;
  contentEl.dataset.loaded = 'true';

  // 인터랙티브 모듈 초기화
  if (window.initInteractiveModule) {
    window.initInteractiveModule();
  }

  // 퀴즈 추가 (퀴즈 데이터가 있으면)
  setTimeout(() => {
    const quizData = window.getQuizData ? window.getQuizData(moduleId) : null;
    if (quizData) {
      // 퀴즈 컨테이너 추가
      const quizContainer = document.createElement('div');
      quizContainer.id = `quiz-container-${moduleId}`;
      contentEl.appendChild(quizContainer);

      // 퀴즈 인스턴스 생성 및 렌더링
      const quiz = new window.InstantCheckQuiz(quizData);
      window[`quizInstance_${moduleId}`] = quiz; // 전역에 저장 (onclick에서 접근용)
      quiz.render(`quiz-container-${moduleId}`);
    }
  }, 300); // 마크다운 렌더링 후 약간의 딜레이
}
