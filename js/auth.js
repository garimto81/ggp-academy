/**
 * GGP Academy - 인증 모듈
 * localStorage 기반 간단한 인증 시스템
 */

const AUTH_CONFIG = {
  PASSWORD: '1234', // GGP Academy 접근 비밀번호
  STORAGE_KEY: 'ggp_auth_token',
  SESSION_DURATION: 24 * 60 * 60 * 1000 // 24시간
};

/**
 * 비밀번호 검증
 * @param {string} password - 입력된 비밀번호
 * @returns {boolean} - 검증 결과
 */
function verifyPassword(password) {
  return password === AUTH_CONFIG.PASSWORD;
}

/**
 * 로그인 처리
 * @param {string} password - 비밀번호
 * @returns {boolean} - 로그인 성공 여부
 */
function login(password) {
  if (verifyPassword(password)) {
    const authData = {
      token: 'authenticated',
      timestamp: Date.now()
    };
    localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
}

/**
 * 로그아웃 처리
 */
function logout() {
  localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
  window.location.href = '/index.html';
}

/**
 * 인증 상태 확인
 * @returns {boolean} - 인증 여부
 */
function isAuthenticated() {
  const authDataStr = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY);

  if (!authDataStr) {
    return false;
  }

  try {
    const authData = JSON.parse(authDataStr);
    const now = Date.now();

    // 세션 만료 확인
    if (now - authData.timestamp > AUTH_CONFIG.SESSION_DURATION) {
      logout();
      return false;
    }

    return authData.token === 'authenticated';
  } catch (error) {
    console.error('Auth data parse error:', error);
    return false;
  }
}

/**
 * 인증 필수 페이지 보호
 * 인증되지 않은 경우 로그인 페이지로 리다이렉트
 */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/index.html';
  }
}

/**
 * 로그인 페이지에서 이미 인증된 경우 대시보드로 리다이렉트
 */
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = '/dashboard.html';
  }
}

// Export for ES6 modules
export { login, logout, isAuthenticated, requireAuth, redirectIfAuthenticated };
