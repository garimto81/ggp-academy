# 📋 Changelog

All notable changes to GGP Academy will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🚀 Coming in v2.1.0
- 🎲 Question Bank 시스템 (모듈당 10개 문제 풀)
- 🔀 랜덤 문제 추출 (매 시도마다 다른 5개)
- 📊 스마트 평가 시스템 (약점 분석)
- 📕 오답 노트 자동 생성
- 📈 학습 통계 대시보드
- 🏆 난이도별 배지 시스템

---

## [2.0.0] - 2025-10-02

### ✨ Added - Major Features
- 🎯 **Layer 1 Instant Check Quiz 시스템**
  - 3가지 문제 유형: 객관식, 시나리오, 우선순위
  - 70% 통과 기준
  - 즉시 피드백 + 해설
  - 재시도 기능
  - 6개 모듈 퀴즈 데이터 (1-1 ~ 2-2)

- 📜 **단일 스크롤 학습 경험 (academy.html)**
  - 팝업 완전 제거 → 무한 스크롤
  - Auto-expand/collapse 모듈
  - Sticky section headers
  - Zero-click navigation
  - Netflix-style UX

- 💾 **Progress Management**
  - localStorage 자동 저장
  - 실시간 진도 추적 (헤더 표시)
  - 모듈 상태 관리 (completed, active, locked)
  - 세션 간 진도 복원

- 🔍 **Advanced Navigation**
  - 모듈 검색 (/, Ctrl+K)
  - Quick jump sidebar
  - Smooth scroll to section
  - Progress indicator per STEP

### 🔧 Changed - Improvements
- ⚡ Markdown 렌더링 성능 최적화
- 🎨 Glassmorphism 디자인 시스템
- 📱 완전 반응형 레이아웃
- ♿ 접근성 개선 (키보드 네비게이션)

### 🗑️ Removed - Breaking Changes
- ❌ **module-viewer.html** (deprecated)
  - 팝업 기반 UI 완전 제거
  - academy.html로 통합
- ❌ Modal 시스템
- ❌ Step-by-step viewer (별도 페이지)

### 🐛 Fixed
- Safari에서 backdrop-filter 지원 문제
- iOS에서 sticky header 깜빡임
- 진도 저장 시 race condition

### 📚 Documentation
- CURRICULUM_V2_GUIDE.md 업데이트
- DEPLOYMENT_GUIDE.md 추가
- FINAL_STATUS.md 작성

### 🔐 Security
- XSS 방지를 위한 DOMPurify 적용
- localStorage 암호화 준비

---

## [1.0.0] - 2025-09-28

### ✨ Added - Initial Release
- 📊 **대시보드 기반 커리큘럼 뷰어**
  - 6개 STEP, 23개 모듈 구조
  - 진도율 표시
  - 카드 기반 레이아웃

- 🎬 **팝업 모달 학습 시스템**
  - 모달 기반 컨텐츠 뷰어
  - 이전/다음 네비게이션
  - Markdown 지원

- 💾 **기본 진도 추적**
  - 완료 모듈 체크
  - localStorage 저장

- 📖 **커리큘럼 컨텐츠**
  - STEP 1: 온보딩 (4개 모듈)
  - STEP 2: 포커 기초 (4개 모듈)
  - STEP 3: 프로덕션 전환 (4개 모듈)
  - STEP 4: 기술 마스터리 (4개 모듈)
  - STEP 5: 라이브 오퍼레이션 (4개 모듈)
  - STEP 6: 성장 및 피드백 (3개 모듈)

### 🎨 Design
- Tailwind CSS 기반 스타일링
- 다크 모드 지원
- 카드 호버 효과

### 🔧 Tech Stack
- HTML5 + Vanilla JavaScript
- Marked.js (Markdown 파싱)
- Tailwind CSS
- localStorage API

---

## Version History Summary

```
v2.0.0 (2025-10-02) - Single-Scroll Learning Experience ⭐ Current
  └─ 팝업 제거, 퀴즈 시스템 추가, UX 대폭 개선

v1.0.0 (2025-09-28) - Initial Release
  └─ 대시보드 + 모달 기반 학습 시스템
```

---

## Upcoming Features (Roadmap)

### v2.1.0 - Question Bank & Smart Assessment
- ETA: 2025-10-03
- Status: 🚧 In Progress

### v2.2.0 - Adaptive Learning
- ETA: 2025-10-10
- Status: 📋 Planned

### v3.0.0 - Collaborative Learning
- ETA: 2025-10-20
- Status: 💭 Concept

---

## Migration Guides

### From v1.0.0 to v2.0.0

**Breaking Changes:**
1. `module-viewer.html` is deprecated
   - Use `academy.html` instead

2. Modal API removed
   - No more `openModal()` function
   - Use direct routing: `academy.html#module-1-1`

3. Progress data structure changed
   - Old: `{ completed: ['1-1', '1-2'] }`
   - New: `{ modules: { '1-1': { completed: true, score: 80 } } }`

**Migration Script:**
```javascript
// Auto-migrates old progress data
if (oldProgressFormat) {
  const newProgress = migrateProgress(oldProgressFormat);
  localStorage.setItem('progress', JSON.stringify(newProgress));
}
```

---

## Support

- 📧 Issues: [GitHub Issues](https://github.com/your-org/ggp-academy/issues)
- 📖 Docs: [Documentation](https://docs.ggp-academy.com)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-org/ggp-academy/discussions)

---

## Contributors

- Claude (AI Assistant) - Architecture & Implementation
- Eve.Noh - Product Owner & QA

---

## License

Proprietary - All rights reserved by GGPoker Productions
