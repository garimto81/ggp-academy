# 🚀 GGP Academy - 배포 가이드

## ✅ 완성된 정적 HTML 시스템

### 핵심 설계 원칙
1. **빌드 없음** - HTML/CSS/JS만으로 동작
2. **의존성 최소화** - CDN만 사용 (TailwindCSS, Marked.js, Highlight.js)
3. **모듈 재사용** - 4개의 핵심 JS 모듈로 모든 기능 구현
4. **범용 뷰어** - viewer.html 하나로 모든 마크다운 렌더링

---

## 📁 프로젝트 구조

```
ggp-academy-static/
├── index.html              # 로그인 페이지
├── dashboard.html          # 대시보드 (커리큘럼 목록)
├── viewer.html             # 문서 뷰어 (범용)
├── js/
│   ├── auth.js            # 인증 모듈 (localStorage 기반)
│   ├── markdown.js        # 마크다운 렌더링 (marked.js)
│   ├── progress.js        # 진도 관리 (localStorage)
│   └── curriculum.js      # 커리큘럼 데이터 구조
└── curriculum/            # 마크다운 문서들
    └── docs/
        ├── MASTER_PLAN.md
        ├── 00_master_plan/
        ├── 01_onboarding/
        ├── 02_poker_fundamentals/
        ├── 03_production_transition/
        ├── 04_technical_mastery/
        ├── 05_live_operations/
        └── 06_career_path/
```

---

## 🔧 로컬 테스트

### 방법 1: Python HTTP Server (가장 간단)
```bash
cd ggp-academy-static
python -m http.server 8000
```

**접속**: http://localhost:8000

### 방법 2: Node.js HTTP Server
```bash
npm install -g http-server
cd ggp-academy-static
http-server -p 8000
```

### 방법 3: VS Code Live Server
1. VS Code 확장 "Live Server" 설치
2. `index.html` 우클릭 → "Open with Live Server"

---

## 🌐 GitHub Pages 배포 (추천)

### 1단계: GitHub 리포지토리 생성
```bash
cd ggp-academy-static

# Git 초기화
git init

# .gitignore 생성 (선택)
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore

# 커밋
git add .
git commit -m "feat: GGP Academy 정적 HTML 버전 초기 커밋"

# GitHub 리포 생성 후 푸시
git remote add origin https://github.com/garimto81/ggp-academy-static.git
git branch -M main
git push -u origin main
```

### 2단계: GitHub Pages 활성화
1. 리포지토리 → **Settings**
2. 왼쪽 메뉴 → **Pages**
3. **Source** → **Deploy from a branch**
4. **Branch** → `main` / `/ (root)` 선택
5. **Save** 클릭

### 3단계: 배포 완료! 🎉
- 자동 배포 URL: `https://garimto81.github.io/ggp-academy-static/`
- 배포 시간: 1-2분
- 변경 사항 푸시 시 자동 재배포

---

## 🔐 비밀번호 변경 방법

### auth.js 파일 수정
```javascript
// js/auth.js 파일 3번째 줄
const AUTH_CONFIG = {
  PASSWORD: 'ggproduction2024', // ← 여기를 원하는 비밀번호로 변경
  STORAGE_KEY: 'ggp_auth_token',
  SESSION_DURATION: 24 * 60 * 60 * 1000
};
```

변경 후 Git 푸시하면 자동 배포됩니다.

---

## 📝 커리큘럼 업데이트 방법

### 새 문서 추가
1. `curriculum/docs/` 폴더에 `.md` 파일 추가
2. `js/curriculum.js`의 `CURRICULUM_DATA`에 문서 정보 추가

```javascript
// 예시: Chapter 7 추가
{
  id: 'chapter-07',
  title: 'Chapter 7: 새 챕터',
  icon: '🎯',
  docs: [
    {
      id: 'NEW_DOC',
      title: '새 문서 제목',
      path: '07_new_chapter/NEW_DOC',
      duration: '60분'
    }
  ]
}
```

3. Git 푸시 → 자동 배포

---

## 🎨 디자인 커스터마이징

### TailwindCSS 색상 변경
각 HTML 파일에서 색상 클래스 수정:
- `bg-red-600` → 다른 색상 (예: `bg-blue-600`)
- `border-zinc-800` → 다른 색상
- `text-white` → 다른 색상

### 그라데이션 배경 변경
```html
<style>
  body {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 50%, #YOUR_COLOR3 100%);
  }
</style>
```

---

## 🐛 문제 해결

### 문제 1: 마크다운 파일이 로드되지 않음
**원인**: CORS 정책으로 로컬 파일 접근 차단

**해결**: HTTP 서버를 통해 실행 (위의 "로컬 테스트" 섹션 참고)

### 문제 2: 모듈 import 오류
**원인**: 브라우저가 ES6 모듈을 지원하지 않음

**해결**: 최신 브라우저 사용 (Chrome, Firefox, Safari, Edge)

### 문제 3: GitHub Pages에서 404 에러
**원인**: 경로 문제

**해결**:
```javascript
// 각 JS 파일에서 절대 경로 수정
const filePath = `/ggp-academy-static/curriculum/docs/${docPath}.md`;
```

---

## 🎯 Next.js와의 비교

| 항목 | Next.js | 정적 HTML |
|------|---------|-----------|
| 빌드 시간 | 10-30초 | **0초** ✅ |
| 의존성 | 500+ 패키지 | **3개 CDN** ✅ |
| 오류 가능성 | 높음 (빌드 오류) | **매우 낮음** ✅ |
| 배포 복잡도 | 높음 (Vercel 설정) | **낮음** (Git 푸시) ✅ |
| 로딩 속도 | 빠름 | **매우 빠름** ✅ |
| 유지보수 | 복잡 | **간단** ✅ |

---

## 📊 시스템 특징

### 장점 ✅
1. **빌드 불필요** - HTML 수정 즉시 반영
2. **오류 없음** - 런타임 오류 거의 없음
3. **빠른 배포** - Git 푸시만으로 완료
4. **유지보수 쉬움** - 코드가 단순하고 명확
5. **무료 호스팅** - GitHub Pages 무료

### 제약사항 ⚠️
1. **서버 사이드 없음** - localStorage만 사용
2. **비밀번호 노출** - JS 파일에 하드코딩 (보안 약함)
3. **다중 사용자 없음** - 개인 학습용

---

## 🔄 향후 개선 아이디어

### 1. 비밀번호 보안 강화
- GitHub Secrets + GitHub Actions 활용
- 환경 변수로 비밀번호 관리

### 2. 진도 백업
- GitHub Gist API로 진도 저장
- 다른 기기에서도 진도 동기화

### 3. 검색 기능
- Lunr.js 또는 Fuse.js 추가
- 전체 문서 검색

### 4. 다크/라이트 모드
- CSS 변수 + localStorage
- 테마 전환 버튼

---

## ✨ 완성!

이제 **복잡한 빌드 시스템 없이** 안정적으로 운영되는 GGP Academy가 완성되었습니다.

### 배포 완료 체크리스트
- [x] 로컬 테스트 완료
- [ ] GitHub 리포지토리 생성
- [ ] GitHub Pages 활성화
- [ ] 배포 URL 접속 확인
- [ ] 비밀번호 변경 (필요 시)

### 접속 정보
- **URL**: https://garimto81.github.io/ggp-academy-static/
- **비밀번호**: `ggproduction2024` (변경 가능)
- **문서 수정**: `curriculum/docs/` 폴더
- **디자인 수정**: HTML 파일 직접 수정

---

© 2024 GG Production. All Rights Reserved.
