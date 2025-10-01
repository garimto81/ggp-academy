/**
 * GGP Academy - 커리큘럼 데이터 모듈
 * 커리큘럼 구조 정의 및 네비게이션 로직
 */

/**
 * 커리큘럼 구조 데이터
 * 실제 마크다운 파일 경로와 매핑
 */
const CURRICULUM_DATA = {
  chapters: [
    {
      id: 'chapter-00',
      title: 'Chapter 0: 오리엔테이션',
      icon: '🎯',
      docs: [
        {
          id: 'MASTER_PLAN',
          title: '마스터 플랜 전체 개요',
          path: 'MASTER_PLAN',
          duration: '60분'
        },
        {
          id: 'TEAM_STRUCTURE',
          title: '팀 구조 이해',
          path: '00_master_plan/FOOTNOTES_TEAM_STRUCTURE',
          duration: '45분'
        },
        {
          id: 'PRODUCTION_WORKFLOW',
          title: '프로덕션 워크플로우',
          path: '00_master_plan/FOOTNOTES_PRODUCTION_WORKFLOW',
          duration: '60분'
        },
        {
          id: 'TECHNICAL_SYSTEMS',
          title: '기술 시스템 개요',
          path: '00_master_plan/FOOTNOTES_TECHNICAL_SYSTEMS',
          duration: '45분'
        },
        {
          id: 'CONTENT_TYPES',
          title: '콘텐츠 유형 이해',
          path: '00_master_plan/FOOTNOTES_CONTENT_TYPES',
          duration: '30분'
        }
      ]
    },
    {
      id: 'chapter-01',
      title: 'Chapter 1: 온보딩',
      icon: '🚀',
      docs: [
        {
          id: 'TRANSITION_GUIDE',
          title: '실무 전환 가이드',
          path: '01_onboarding/TRANSITION_GUIDE',
          duration: '90분'
        },
        {
          id: 'FOOTNOTES_TRANSITION',
          title: '전환 가이드 상세 설명',
          path: '01_onboarding/FOOTNOTES_TRANSITION_GUIDE',
          duration: '60분'
        }
      ]
    },
    {
      id: 'chapter-02',
      title: 'Chapter 2: 포커 기초',
      icon: '🎰',
      docs: [
        {
          id: 'POKER_KNOWLEDGE',
          title: '포커 지식 가이드',
          path: '02_poker_fundamentals/POKER_KNOWLEDGE_GUIDE',
          duration: '120분'
        },
        {
          id: 'FOOTNOTES_POKER',
          title: '포커 지식 상세 설명',
          path: '02_poker_fundamentals/FOOTNOTES_POKER_KNOWLEDGE_GUIDE',
          duration: '90분'
        }
      ]
    },
    {
      id: 'chapter-03',
      title: 'Chapter 3: 프로덕션 전환',
      icon: '🎬',
      docs: [
        {
          id: 'TECHNICAL_WORKFLOW',
          title: '기술 워크플로우',
          path: '03_production_transition/FOOTNOTES_TECHNICAL_WORKFLOW',
          duration: '120분'
        }
      ]
    },
    {
      id: 'chapter-04',
      title: 'Chapter 4: 기술 숙달',
      icon: '⚙️',
      docs: [
        {
          id: 'TECHNICAL_MASTERY',
          title: '기술 시스템 마스터',
          path: '04_technical_mastery/FOOTNOTES_TECHNICAL_SYSTEMS',
          duration: '150분'
        }
      ]
    },
    {
      id: 'chapter-05',
      title: 'Chapter 5: 라이브 운영',
      icon: '📡',
      docs: [
        {
          id: 'LIVE_SIMULATION',
          title: '라이브 시뮬레이션 체크리스트',
          path: '05_live_operations/LIVE_SIMULATION_CHECKLIST',
          duration: '90분'
        },
        {
          id: 'CRISIS_MANAGEMENT',
          title: '위기 관리 가이드',
          path: '05_live_operations/CRISIS_MANAGEMENT_GUIDE',
          duration: '120분'
        },
        {
          id: 'FOOTNOTES_CRISIS',
          title: '위기 관리 상세 설명',
          path: '05_live_operations/FOOTNOTES_CRISIS_MANAGEMENT',
          duration: '60분'
        }
      ]
    },
    {
      id: 'chapter-06',
      title: 'Chapter 6: 커리어 발전',
      icon: '🌟',
      docs: [
        {
          id: 'INNOVATION_CAREER',
          title: '혁신과 커리어 가이드',
          path: '06_career_path/INNOVATION_CAREER_GUIDE',
          duration: '60분'
        }
      ]
    }
  ]
};

/**
 * 전체 문서 목록 가져오기 (flat)
 * @returns {Array} - 모든 문서 객체 배열
 */
function getAllDocs() {
  const allDocs = [];

  CURRICULUM_DATA.chapters.forEach(chapter => {
    chapter.docs.forEach(doc => {
      allDocs.push({
        ...doc,
        chapterId: chapter.id,
        chapterTitle: chapter.title
      });
    });
  });

  return allDocs;
}

/**
 * 문서 ID로 문서 찾기
 * @param {string} docId - 문서 ID
 * @returns {Object|null} - 문서 객체
 */
function getDocById(docId) {
  const allDocs = getAllDocs();
  return allDocs.find(doc => doc.id === docId) || null;
}

/**
 * 경로로 문서 찾기
 * @param {string} docPath - 문서 경로
 * @returns {Object|null} - 문서 객체
 */
function getDocByPath(docPath) {
  const allDocs = getAllDocs();
  return allDocs.find(doc => doc.path === docPath) || null;
}

/**
 * 다음 문서 찾기
 * @param {string} currentDocId - 현재 문서 ID
 * @returns {Object|null} - 다음 문서 객체
 */
function getNextDoc(currentDocId) {
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex(doc => doc.id === currentDocId);

  if (currentIndex === -1 || currentIndex === allDocs.length - 1) {
    return null;
  }

  return allDocs[currentIndex + 1];
}

/**
 * 이전 문서 찾기
 * @param {string} currentDocId - 현재 문서 ID
 * @returns {Object|null} - 이전 문서 객체
 */
function getPrevDoc(currentDocId) {
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex(doc => doc.id === currentDocId);

  if (currentIndex <= 0) {
    return null;
  }

  return allDocs[currentIndex - 1];
}

/**
 * 챕터 정보 가져오기
 * @param {string} chapterId - 챕터 ID
 * @returns {Object|null} - 챕터 객체
 */
function getChapter(chapterId) {
  return CURRICULUM_DATA.chapters.find(ch => ch.id === chapterId) || null;
}

/**
 * 전체 문서 수
 * @returns {number} - 전체 문서 수
 */
function getTotalDocCount() {
  return getAllDocs().length;
}

/**
 * 챕터별 문서 수
 * @param {string} chapterId - 챕터 ID
 * @returns {number} - 해당 챕터 문서 수
 */
function getChapterDocCount(chapterId) {
  const chapter = getChapter(chapterId);
  return chapter ? chapter.docs.length : 0;
}

// Export for ES6 modules
export {
  CURRICULUM_DATA,
  getAllDocs,
  getDocById,
  getDocByPath,
  getNextDoc,
  getPrevDoc,
  getChapter,
  getTotalDocCount,
  getChapterDocCount
};
