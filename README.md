# GGP Academy - Static HTML Version

## 📁 프로젝트 구조

```
ggp-academy-static/
├── index.html              # 로그인 페이지
├── dashboard.html          # 대시보드 (커리큘럼 목록)
├── viewer.html             # 문서 뷰어 (범용)
├── css/
│   └── style.css          # 전체 스타일 (TailwindCSS CDN 사용)
├── js/
│   ├── auth.js            # 인증 모듈
│   ├── markdown.js        # 마크다운 렌더링 모듈
│   ├── progress.js        # 진도 관리 모듈
│   └── curriculum.js      # 커리큘럼 데이터 및 네비게이션
└── curriculum/            # 마크다운 문서들 (기존 GGP-Curriculum 심볼릭 링크)
    └── docs/
        ├── MASTER_PLAN.md
        ├── 01_onboarding/
        ├── 02_poker_fundamentals/
        └── ...
```

## 🎯 핵심 설계 원칙

### 1. 모듈 재사용성
- 모든 JS 함수는 독립적으로 동작
- HTML은 최소한의 구조만 정의
- CSS는 유틸리티 클래스 중심

### 2. 마크다운 동적 로딩
```javascript
// viewer.html?doc=MASTER_PLAN
// viewer.html?doc=01_onboarding/TRANSITION_GUIDE
```

### 3. 빌드 없음
- CDN 기반 라이브러리 (marked.js, highlight.js)
- 순수 JavaScript ES6 모듈
- GitHub Pages 직접 배포

## 🚀 배포 방법

1. GitHub 리포지토리 생성
2. Settings → Pages → Source: main branch
3. 완료!

## 🔐 인증 시스템

- localStorage 기반 간단 인증
- 환경 변수: `GGP_PASSWORD` (HTML에 하드코딩)
- 세션 유지: localStorage에 토큰 저장
