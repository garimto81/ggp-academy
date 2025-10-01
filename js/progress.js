/**
 * GGP Academy - 진도 관리 모듈
 * localStorage 기반 학습 진도 추적
 */

const PROGRESS_STORAGE_KEY = 'ggp_learning_progress';

/**
 * 진도 데이터 로드
 * @returns {Object} - 진도 데이터
 */
function loadProgress() {
  const progressDataStr = localStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!progressDataStr) {
    return {
      completed: [],
      lastVisited: null,
      startedAt: Date.now()
    };
  }

  try {
    return JSON.parse(progressDataStr);
  } catch (error) {
    console.error('Progress data parse error:', error);
    return {
      completed: [],
      lastVisited: null,
      startedAt: Date.now()
    };
  }
}

/**
 * 진도 데이터 저장
 * @param {Object} progressData - 진도 데이터
 */
function saveProgress(progressData) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressData));
}

/**
 * 문서 완료 처리
 * @param {string} docPath - 문서 경로
 */
function markAsCompleted(docPath) {
  const progressData = loadProgress();

  if (!progressData.completed.includes(docPath)) {
    progressData.completed.push(docPath);
    progressData.lastVisited = docPath;
    progressData.lastUpdated = Date.now();
    saveProgress(progressData);
  }
}

/**
 * 문서 완료 여부 확인
 * @param {string} docPath - 문서 경로
 * @returns {boolean} - 완료 여부
 */
function isCompleted(docPath) {
  const progressData = loadProgress();
  return progressData.completed.includes(docPath);
}

/**
 * 마지막 방문 문서 저장
 * @param {string} docPath - 문서 경로
 */
function updateLastVisited(docPath) {
  const progressData = loadProgress();
  progressData.lastVisited = docPath;
  progressData.lastUpdated = Date.now();
  saveProgress(progressData);
}

/**
 * 전체 진도율 계산
 * @param {number} totalDocs - 전체 문서 수
 * @returns {number} - 진도율 (0-100)
 */
function calculateProgressPercentage(totalDocs) {
  const progressData = loadProgress();
  const completedCount = progressData.completed.length;

  if (totalDocs === 0) {
    return 0;
  }

  return Math.round((completedCount / totalDocs) * 100);
}

/**
 * 진도 초기화
 */
function resetProgress() {
  if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.location.reload();
  }
}

/**
 * 챕터별 진도율 계산
 * @param {string} chapterPrefix - 챕터 접두사 (예: '01_', '02_')
 * @param {Array} allDocs - 전체 문서 목록
 * @returns {number} - 챕터 진도율 (0-100)
 */
function getChapterProgress(chapterPrefix, allDocs) {
  const progressData = loadProgress();
  const chapterDocs = allDocs.filter(doc => doc.startsWith(chapterPrefix));
  const completedChapterDocs = progressData.completed.filter(doc => doc.startsWith(chapterPrefix));

  if (chapterDocs.length === 0) {
    return 0;
  }

  return Math.round((completedChapterDocs.length / chapterDocs.length) * 100);
}

/**
 * 학습 통계 조회
 * @returns {Object} - 학습 통계
 */
function getStudyStats() {
  const progressData = loadProgress();
  const now = Date.now();
  const daysStudied = Math.floor((now - progressData.startedAt) / (1000 * 60 * 60 * 24));

  return {
    completedDocs: progressData.completed.length,
    daysStudied: daysStudied || 1,
    lastVisited: progressData.lastVisited,
    lastUpdated: progressData.lastUpdated,
    startedAt: progressData.startedAt
  };
}

// Export for ES6 modules
export {
  loadProgress,
  saveProgress,
  markAsCompleted,
  isCompleted,
  updateLastVisited,
  calculateProgressPercentage,
  resetProgress,
  getChapterProgress,
  getStudyStats
};
