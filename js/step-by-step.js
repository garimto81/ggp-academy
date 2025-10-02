/**
 * GGP Academy - Step-by-Step Module Viewer
 * Markdown 기반 단계별 학습 시스템
 */

class StepByStepModule {
  constructor() {
    this.currentStep = 1;
    this.steps = [];
    this.moduleData = null;
    this.init();
  }

  async init() {
    // URL에서 모듈 경로 읽기
    const params = new URLSearchParams(window.location.search);
    const modulePath = params.get('module');

    if (!modulePath) {
      this.showError('모듈 경로가 지정되지 않았습니다.');
      return;
    }

    // 커리큘럼에서 모듈 정보 가져오기
    this.moduleData = window.getModuleByPathV2(modulePath);

    if (!this.moduleData) {
      this.showError('모듈을 찾을 수 없습니다.');
      return;
    }

    // Markdown 파일 로드
    await this.loadMarkdown(modulePath);
  }

  async loadMarkdown(path) {
    try {
      // .md 확장자 추가
      const mdPath = `/ggp-academy/${path}.md`;
      const response = await fetch(mdPath);

      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`);
      }

      const markdownText = await response.text();

      // Markdown을 Steps로 파싱
      this.parseToSteps(markdownText);

      // 저장된 진도 복원
      this.loadProgress();

      // 첫 번째 스텝 표시
      this.showStep(this.currentStep);

    } catch (error) {
      console.error('Markdown loading error:', error);
      this.showError(`문서를 불러올 수 없습니다: ${error.message}`);
    }
  }

  parseToSteps(markdown) {
    // ## 헤더를 기준으로 섹션 분할
    const lines = markdown.split('\n');
    let currentSection = {
      title: '',
      icon: '📚',
      time: '3분',
      content: []
    };
    let sections = [];
    let inFrontMatter = false;
    let skipFirstH1 = true;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Front-matter 스킵 (---)
      if (line.trim() === '---') {
        inFrontMatter = !inFrontMatter;
        continue;
      }
      if (inFrontMatter) continue;

      // H1 제목 (첫 번째만 스킵)
      if (line.startsWith('# ')) {
        if (skipFirstH1) {
          skipFirstH1 = false;
          continue;
        }
      }

      // H2 헤더 = 새로운 스텝
      if (line.startsWith('## ')) {
        // 이전 섹션 저장
        if (currentSection.content.length > 0) {
          sections.push({ ...currentSection });
        }

        // 새 섹션 시작
        currentSection = {
          title: line.replace('## ', '').trim(),
          icon: this.getIconForSection(line),
          time: this.getTimeForSection(sections.length + 1),
          content: []
        };
      } else {
        // 콘텐츠 추가
        currentSection.content.push(line);
      }
    }

    // 마지막 섹션 추가
    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    // 섹션이 너무 많으면 그룹화 (최대 7개 스텝)
    if (sections.length > 7) {
      this.steps = this.groupSections(sections, 5);
    } else {
      this.steps = sections.map(s => ({
        title: s.title,
        icon: s.icon,
        time: s.time,
        content: s.content.join('\n')
      }));
    }

    // 스텝이 없으면 전체를 하나의 스텝으로
    if (this.steps.length === 0) {
      this.steps = [{
        title: this.moduleData?.title || '학습 내용',
        icon: '📚',
        time: this.moduleData?.duration || '15분',
        content: markdown
      }];
    }
  }

  getIconForSection(heading) {
    const h = heading.toLowerCase();
    if (h.includes('역사') || h.includes('history')) return '🏛️';
    if (h.includes('규칙') || h.includes('rule')) return '🃏';
    if (h.includes('랭킹') || h.includes('rank') || h.includes('패')) return '🏆';
    if (h.includes('퀴즈') || h.includes('quiz') || h.includes('확인')) return '✅';
    if (h.includes('방송') || h.includes('broadcast') || h.includes('콘텐츠')) return '🎬';
    if (h.includes('팀') || h.includes('team')) return '👥';
    if (h.includes('기술') || h.includes('tech')) return '⚙️';
    if (h.includes('카메라') || h.includes('camera')) return '📹';
    return '📚';
  }

  getTimeForSection(index) {
    // 각 스텝의 예상 소요 시간 (분)
    const times = ['3분', '4분', '3분', '2분', '3분', '3분', '3분'];
    return times[index - 1] || '3분';
  }

  groupSections(sections, targetCount) {
    // 섹션을 targetCount개 그룹으로 묶기
    const groupSize = Math.ceil(sections.length / targetCount);
    const groups = [];

    for (let i = 0; i < sections.length; i += groupSize) {
      const group = sections.slice(i, i + groupSize);
      const combinedContent = group.map(s =>
        `## ${s.title}\n\n${s.content.join('\n')}`
      ).join('\n\n');

      groups.push({
        title: group[0].title + (group.length > 1 ? ' 외' : ''),
        icon: group[0].icon,
        time: `${group.length * 3}분`,
        content: combinedContent
      });
    }

    return groups;
  }

  showStep(stepNum) {
    if (stepNum < 1 || stepNum > this.steps.length) return;

    this.currentStep = stepNum;
    const step = this.steps[stepNum - 1];

    // Progress Bar 업데이트
    const progress = (stepNum / this.steps.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('currentStepNum').textContent = stepNum;
    document.getElementById('totalStepsNum').textContent = this.steps.length;
    document.getElementById('navStepNum').textContent = stepNum;
    document.getElementById('navTotalSteps').textContent = this.steps.length;

    // Step Header 업데이트
    document.getElementById('stepLabel').textContent = `Step ${stepNum} of ${this.steps.length}`;
    document.getElementById('stepTitle').textContent = step.title;
    document.getElementById('stepIcon').textContent = step.icon;
    document.getElementById('stepTime').textContent = `약 ${step.time} 소요`;

    // Markdown 콘텐츠 렌더링
    const htmlContent = marked.parse(step.content);
    document.getElementById('markdown-content').innerHTML = htmlContent;

    // Step Dots 업데이트
    this.updateStepDots();

    // 네비게이션 버튼 업데이트
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (stepNum === 1) {
      prevBtn.classList.add('hidden');
    } else {
      prevBtn.classList.remove('hidden');
    }

    if (stepNum === this.steps.length) {
      nextBtn.textContent = '완료 →';
      nextBtn.onclick = () => this.completeModule();
    } else {
      nextBtn.textContent = '다음 →';
      nextBtn.onclick = () => this.nextStep();
    }

    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 진도 저장
    this.saveProgress();
  }

  updateStepDots() {
    const dotsContainer = document.getElementById('stepDots');
    dotsContainer.innerHTML = '';

    for (let i = 1; i <= this.steps.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'step-dot';

      if (i === this.currentStep) {
        dot.classList.add('active', 'bg-red-600');
      } else if (i < this.currentStep) {
        dot.classList.add('bg-red-800');
      } else {
        dot.classList.add('bg-zinc-600');
      }

      dotsContainer.appendChild(dot);
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.showStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.showStep(this.currentStep - 1);
    }
  }

  saveProgress() {
    const moduleId = this.moduleData?.id;
    if (moduleId) {
      localStorage.setItem(`ggp_progress_${moduleId}`, this.currentStep);
    }
  }

  loadProgress() {
    const moduleId = this.moduleData?.id;
    if (moduleId) {
      const saved = localStorage.getItem(`ggp_progress_${moduleId}`);
      if (saved) {
        this.currentStep = parseInt(saved);
      }
    }
  }

  completeModule() {
    const moduleId = this.moduleData?.id;
    if (moduleId) {
      localStorage.setItem(`ggp_completed_${moduleId}`, 'true');
    }

    alert(`🎉 ${this.moduleData?.title} 완료!\n\n다음 모듈로 이동합니다.`);
    window.location.href = '/ggp-academy/dashboard.html';
  }

  showError(message) {
    document.getElementById('markdown-content').innerHTML = `
      <div class="text-center py-12">
        <div class="text-4xl mb-4">⚠️</div>
        <div class="text-xl font-bold mb-2">오류가 발생했습니다</div>
        <div class="text-zinc-400">${message}</div>
        <a href="/ggp-academy/dashboard.html" class="inline-block mt-6 px-6 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition">
          대시보드로 돌아가기
        </a>
      </div>
    `;
  }
}

// Global functions for navigation buttons
function nextStep() {
  if (window.moduleViewer) {
    window.moduleViewer.nextStep();
  }
}

function prevStep() {
  if (window.moduleViewer) {
    window.moduleViewer.prevStep();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.moduleViewer = new StepByStepModule();
  });
} else {
  window.moduleViewer = new StepByStepModule();
}
