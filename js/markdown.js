/**
 * GGP Academy - 마크다운 렌더링 모듈
 * marked.js와 highlight.js를 사용한 마크다운 파싱
 */

/**
 * 마크다운 파일 로드 및 렌더링
 * @param {string} docPath - 문서 경로 (예: 'MASTER_PLAN', '01_onboarding/TRANSITION_GUIDE')
 * @param {string} targetElementId - 렌더링할 DOM 요소 ID
 * @returns {Promise<void>}
 */
async function loadAndRenderMarkdown(docPath, targetElementId) {
  const targetElement = document.getElementById(targetElementId);

  if (!targetElement) {
    console.error(`Target element #${targetElementId} not found`);
    return;
  }

  // HTML 파일인지 확인
  if (docPath.endsWith(".html")) {
    // HTML 파일은 전체 페이지 리다이렉트
    window.location.href = `/ggp-academy/${docPath}`;
    return;
  }

  // 로딩 표시
  targetElement.innerHTML = '<div class="loading">문서를 불러오는 중...</div>';

  try {
    // 마크다운 파일 경로 생성
    const filePath = `/ggp-academy/${docPath}.md`;

    // 파일 fetch
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to load document: ${response.status}`);
    }

    const markdownText = await response.text();

    // 마크다운 → HTML 변환
    const htmlContent = renderMarkdown(markdownText);

    // DOM에 삽입
    targetElement.innerHTML = htmlContent;

    // 코드 하이라이팅 적용
    highlightCodeBlocks(targetElement);

    // 목차 생성
    generateTableOfContents(targetElement);

  } catch (error) {
    console.error('Markdown loading error:', error);
    targetElement.innerHTML = `
      <div class="error">
        <h2>⚠️ 문서를 불러올 수 없습니다</h2>
        <p>경로: ${docPath}.md</p>
        <p>오류: ${error.message}</p>
      </div>
    `;
  }
}

/**
 * 마크다운 텍스트를 HTML로 변환
 * @param {string} markdownText - 마크다운 텍스트
 * @returns {string} - HTML 문자열
 */
function renderMarkdown(markdownText) {
  // marked.js 설정
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    mangle: false
  });

  return marked.parse(markdownText);
}

/**
 * 코드 블록에 syntax highlighting 적용
 * @param {HTMLElement} container - 컨테이너 요소
 */
function highlightCodeBlocks(container) {
  const codeBlocks = container.querySelectorAll('pre code');

  codeBlocks.forEach(block => {
    // highlight.js 자동 감지
    hljs.highlightElement(block);
  });
}

/**
 * 목차 자동 생성
 * @param {HTMLElement} container - 문서 컨테이너
 */
function generateTableOfContents(container) {
  const headings = container.querySelectorAll('h2, h3, h4');

  if (headings.length === 0) {
    return;
  }

  const tocElement = document.getElementById('table-of-contents');

  if (!tocElement) {
    return;
  }

  const tocHTML = ['<nav class="toc"><h3>목차</h3><ul>'];

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent;
    const id = `heading-${index}`;

    heading.id = id;

    const indent = '  '.repeat(level - 2);
    tocHTML.push(`${indent}<li><a href="#${id}">${text}</a></li>`);
  });

  tocHTML.push('</ul></nav>');
  tocElement.innerHTML = tocHTML.join('\n');
}

/**
 * 마크다운 내용 검색
 * @param {string} searchQuery - 검색어
 * @param {string} targetElementId - 검색 대상 요소 ID
 * @returns {Array} - 매칭된 요소들
 */
function searchInMarkdown(searchQuery, targetElementId) {
  const targetElement = document.getElementById(targetElementId);

  if (!targetElement || !searchQuery) {
    return [];
  }

  const allElements = targetElement.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');
  const matches = [];

  allElements.forEach(element => {
    if (element.textContent.toLowerCase().includes(searchQuery.toLowerCase())) {
      matches.push(element);
    }
  });

  return matches;
}

// Export for ES6 modules
export {
  loadAndRenderMarkdown,
  renderMarkdown,
  highlightCodeBlocks,
  generateTableOfContents,
  searchInMarkdown
};
