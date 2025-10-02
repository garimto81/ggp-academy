/**
 * GGP Academy - 커리큘럼 v2.0 (최적화된 구조)
 * 단계별 학습 시스템 - 15-30분 모듈 단위
 */

const CURRICULUM_V2 = {
  steps: [
    {
      id: 'step-1',
      number: 1,
      title: '포커 기초 이해',
      subtitle: '입문 - 포커를 전혀 모르는 사람도 이해할 수 있게',
      icon: '🎰',
      color: 'red',
      totalTime: '80분',
      modules: [
        {
          id: '1-1',
          title: '포커란 무엇인가',
          path: 'step-1-poker-basics/1-1-what-is-poker',
          duration: '15분',
          description: 'WSOP, GGPoker, 텍사스 홀덤 기본 규칙',
          topics: ['WSOP 역사', 'GGPoker 성장', '패 랭킹', '방송 콘텐츠']
        },
        {
          id: '1-2',
          title: '포커 용어 사전',
          path: 'step-1-poker-basics/1-2-poker-terminology',
          duration: '20분',
          description: '필수 용어 30개와 실전 대화 예시',
          topics: ['Blind/Ante', 'All-in/Fold', 'Check/Raise', '직무별 용어']
        },
        {
          id: '1-3',
          title: '토너먼트의 이해',
          path: 'step-1-poker-basics/1-3-tournament-structure',
          duration: '25분',
          description: '토너먼트 구조와 블라인드 레벨',
          topics: ['토너먼트 vs 캐시', 'Day 1/2/Final', '블라인드 레벨', 'Bubble']
        },
        {
          id: '1-4',
          title: '방송 관점의 포커',
          path: 'step-1-poker-basics/1-4-broadcast-perspective',
          duration: '20분',
          description: '드라마틱한 순간과 스토리텔링',
          topics: ['All-in 순간', 'Bad Beat', '유명 프로', '스토리 포인트']
        }
      ]
    },
    {
      id: 'step-2',
      number: 2,
      title: 'GGP 팀 이해',
      subtitle: '조직 - 우리는 누구이고, 어떻게 일하는가',
      icon: '🏢',
      color: 'blue',
      totalTime: '60분',
      modules: [
        {
          id: '2-1',
          title: 'GG Production 소개',
          path: 'step-2-team-structure/2-1-ggp-introduction',
          duration: '15분',
          description: '회사 역사, 비전, 글로벌 위치',
          topics: ['회사 역사', '연간 300+ 이벤트', '글로벌 1위', '비전']
        },
        {
          id: '2-2',
          title: '우리 팀 구조',
          path: 'step-2-team-structure/2-2-team-organization',
          duration: '20분',
          description: '프로덕션팀 조직도와 각 파트 역할',
          topics: ['조직도', '카메라 파트', '기술 파트', '편집 파트', 'PM 파트']
        },
        {
          id: '2-3',
          title: '협업 파트너',
          path: 'step-2-team-structure/2-3-collaboration-partners',
          duration: '15분',
          description: '외주 협업팀과의 워크플로우',
          topics: ['Tournament Director', 'RFID Operator', 'Commentary', '협업 흐름']
        },
        {
          id: '2-4',
          title: '커뮤니케이션 시스템',
          path: 'step-2-team-structure/2-4-communication-systems',
          duration: '10분',
          description: '토키, Slack, 긴급 상황 대응',
          topics: ['토키 시스템', 'Slack 채널', '긴급 프로토콜']
        }
      ]
    },
    {
      id: 'step-3',
      number: 3,
      title: '첫 날 준비',
      subtitle: '현장 입문 - 현장에 가기 전 알아야 할 것들',
      icon: '🎬',
      color: 'purple',
      totalTime: '90분',
      modules: [
        {
          id: '3-1',
          title: '현장의 하루',
          path: 'step-3-first-day/3-1-daily-timeline',
          duration: '20분',
          description: 'T-2h부터 종료까지 타임라인',
          topics: ['세팅 체크', '크루 브리핑', '방송 시작', '마무리']
        },
        {
          id: '3-2',
          title: '나의 역할 찾기',
          path: 'step-3-first-day/3-2-role-definition',
          duration: '25분',
          description: '직무별 상세 업무와 체크리스트',
          topics: ['카메라 역할', '기술 역할', '편집 역할', '첫 날 팁']
        },
        {
          id: '3-3',
          title: '장비 기초',
          path: 'step-3-first-day/3-3-equipment-basics',
          duration: '25분',
          description: 'FR7 카메라, RFID, 네트워크 시스템',
          topics: ['FR7 PTZ', 'RFID 리더', '네트워크', '장비 역할']
        },
        {
          id: '3-4',
          title: '안전과 에티켓',
          path: 'step-3-first-day/3-4-safety-etiquette',
          duration: '20분',
          description: '현장 안전 수칙과 협업 에티켓',
          topics: ['안전 수칙', '플레이어 거리', 'TD 협업', '긴급 대응']
        }
      ]
    },
    {
      id: 'step-4',
      number: 4,
      title: '핵심 기술 숙달',
      subtitle: '실무 - 실제로 손으로 해보는 것들',
      icon: '⚙️',
      color: 'green',
      totalTime: '120분',
      modules: [
        {
          id: '4-1',
          title: '카메라 워크',
          path: 'step-4-core-skills/4-1-camera-work',
          duration: '30분',
          description: 'PTZ 카메라 프리셋과 멀티앵글 스위칭',
          topics: ['PTZ 프리셋', '멀티앵글', '플레이어 추적', '실전 팁']
        },
        {
          id: '4-2',
          title: 'RFID 데이터 관리',
          path: 'step-4-core-skills/4-2-rfid-data',
          duration: '25분',
          description: '실시간 데이터 수집과 정합성 검증',
          topics: ['데이터 수집', '정합성 검증', '오류 대응', 'IA 연동']
        },
        {
          id: '4-3',
          title: '그래픽 시스템',
          path: 'step-4-core-skills/4-3-graphics-system',
          duration: '30분',
          description: 'POKER GFX 사용법과 실시간 업데이트',
          topics: ['GFX 사용법', '팟 사이즈', '프로필 삽입', '실시간 업데이트']
        },
        {
          id: '4-4',
          title: '스위칭과 편집',
          path: 'step-4-core-skills/4-4-switching-editing',
          duration: '35분',
          description: '라이브 스위칭과 하이라이트 편집',
          topics: ['멀티캠 스위칭', '스토리 편집', '하이라이트', '패키징']
        }
      ]
    },
    {
      id: 'step-5',
      number: 5,
      title: '라이브 운영 마스터',
      subtitle: '고급 - 실시간 방송의 모든 것',
      icon: '📡',
      color: 'orange',
      totalTime: '90분',
      modules: [
        {
          id: '5-1',
          title: '라이브 방송 프로세스',
          path: 'step-5-live-operations/5-1-live-process',
          duration: '25분',
          description: '라이브 vs VOD, 실시간 의사결정',
          topics: ['라이브 특성', '의사결정', '백업 시스템', '지연 대응']
        },
        {
          id: '5-2',
          title: '위기 관리',
          path: 'step-5-live-operations/5-2-crisis-management',
          duration: '30분',
          description: '장비 고장, 네트워크 다운 대응',
          topics: ['장비 고장', '네트워크 문제', '플레이어 이슈', '실제 사례']
        },
        {
          id: '5-3',
          title: '품질 관리',
          path: 'step-5-live-operations/5-3-quality-control',
          duration: '20분',
          description: '체크리스트와 실시간 모니터링',
          topics: ['체크리스트', '모니터링', '품질 기준', '개선 사이클']
        },
        {
          id: '5-4',
          title: '시뮬레이션 연습',
          path: 'step-5-live-operations/5-4-simulation',
          duration: '15분',
          description: '가상 시나리오와 빠른 판단 연습',
          topics: ['시나리오 10가지', '빠른 판단', '팀 협업 시뮬레이션']
        }
      ]
    },
    {
      id: 'step-6',
      number: 6,
      title: '전문가로 성장',
      subtitle: '심화 - 한 단계 더 나아가기',
      icon: '🌟',
      color: 'yellow',
      totalTime: '60분',
      modules: [
        {
          id: '6-1',
          title: '고급 촬영 기법',
          path: 'step-6-advanced/6-1-advanced-filming',
          duration: '20분',
          description: '창의적 앵글과 스토리텔링',
          topics: ['창의적 앵글', '스토리텔링', '감정 포착']
        },
        {
          id: '6-2',
          title: '콘텐츠 기획',
          path: 'step-6-advanced/6-2-content-planning',
          duration: '20분',
          description: '플레이어 스토리와 하이라이트 전략',
          topics: ['스토리 발굴', '편집 전략', '소셜 미디어']
        },
        {
          id: '6-3',
          title: '커리어 발전',
          path: 'step-6-advanced/6-3-career-growth',
          duration: '20분',
          description: '성장 경로와 리더십 개발',
          topics: ['성장 경로', '리더십', '혁신 제안']
        }
      ]
    }
  ]
};

/**
 * 전체 모듈 목록 가져오기 (flat)
 */
function getAllModulesV2() {
  const allModules = [];
  CURRICULUM_V2.steps.forEach(step => {
    step.modules.forEach(module => {
      allModules.push({
        ...module,
        stepId: step.id,
        stepNumber: step.number,
        stepTitle: step.title,
        stepIcon: step.icon
      });
    });
  });
  return allModules;
}

/**
 * 모듈 ID로 모듈 찾기
 */
function getModuleByIdV2(moduleId) {
  const allModules = getAllModulesV2();
  return allModules.find(m => m.id === moduleId) || null;
}

/**
 * 경로로 모듈 찾기
 */
function getModuleByPathV2(modulePath) {
  const allModules = getAllModulesV2();
  return allModules.find(m => m.path === modulePath) || null;
}

/**
 * 다음 모듈 찾기
 */
function getNextModuleV2(currentModuleId) {
  const allModules = getAllModulesV2();
  const currentIndex = allModules.findIndex(m => m.id === currentModuleId);
  if (currentIndex === -1 || currentIndex === allModules.length - 1) {
    return null;
  }
  return allModules[currentIndex + 1];
}

/**
 * 이전 모듈 찾기
 */
function getPrevModuleV2(currentModuleId) {
  const allModules = getAllModulesV2();
  const currentIndex = allModules.findIndex(m => m.id === currentModuleId);
  if (currentIndex <= 0) {
    return null;
  }
  return allModules[currentIndex - 1];
}

/**
 * 단계 정보 가져오기
 */
function getStepV2(stepId) {
  return CURRICULUM_V2.steps.find(s => s.id === stepId) || null;
}

/**
 * 전체 모듈 수
 */
function getTotalModuleCountV2() {
  return getAllModulesV2().length;
}

/**
 * 단계별 모듈 수
 */
function getStepModuleCountV2(stepId) {
  const step = getStepV2(stepId);
  return step ? step.modules.length : 0;
}

/**
 * 단계별 진도율 계산
 */
function getStepProgressV2(stepId, completedModules) {
  const step = getStepV2(stepId);
  if (!step) return 0;

  const stepModuleIds = step.modules.map(m => m.path);
  const completedInStep = completedModules.filter(path =>
    stepModuleIds.includes(path)
  ).length;

  return Math.round((completedInStep / step.modules.length) * 100);
}

// Export for ES6 modules
export {
  CURRICULUM_V2,
  getAllModulesV2,
  getModuleByIdV2,
  getModuleByPathV2,
  getNextModuleV2,
  getPrevModuleV2,
  getStepV2,
  getTotalModuleCountV2,
  getStepModuleCountV2,
  getStepProgressV2
};

// Compatibility exports for v1.0 HTML files
export const CURRICULUM_DATA = {
  steps: CURRICULUM_V2.steps.map(step => ({
    id: step.id,
    title: step.title,
    icon: step.icon,
    color: step.color,
    docs: step.modules.map(module => ({
      id: module.id,
      title: module.title,
      path: module.path,
      duration: module.duration,
      description: module.description
    }))
  }))
};

export function getTotalDocCount() {
  return getTotalModuleCountV2();
}

export function getDocByPath(path) {
  const module = getModuleByPathV2(path);
  if (!module) return null;

  return {
    id: module.id,
    title: module.title,
    path: module.path,
    duration: module.duration,
    stepTitle: module.stepTitle,
    stepIcon: module.stepIcon
  };
}

export function getNextDoc(moduleId) {
  const module = getNextModuleV2(moduleId);
  if (!module) return null;

  return {
    id: module.id,
    title: module.title,
    path: module.path
  };
}

export function getPrevDoc(moduleId) {
  const module = getPrevModuleV2(moduleId);
  if (!module) return null;

  return {
    id: module.id,
    title: module.title,
    path: module.path
  };
}
