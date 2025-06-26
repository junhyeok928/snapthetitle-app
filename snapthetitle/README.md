# snapthetitle (Frontend)

Snap the Title - 웨딩스냅 촬영 및 예약 웹사이트의 프론트엔드 프로젝트입니다.  
React와 Tailwind CSS를 기반으로 구축되었으며, 사용자 페이지와 관리자 페이지를 통합 구성하고 있습니다.

## 🛠️ 기술 스택

- **Language:** JavaScript (ES6+)
- **Framework:** React (CRA 기반)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Form:** React Hook Form, Yup
- **Build Tool:** CRA (Create React App)
- **HTTP 통신:** Axios
- **상태 관리:** useState, useEffect

## 📁 디렉토리 구조

```
src/
├── assets/                # 이미지, 아이콘 등 정적 파일
├── components/            # 공통 컴포넌트
├── pages/                 # 주요 페이지 컴포넌트
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Notice/
│   │   ├── Faq.jsx
│   │   ├── Guide.jsx
│   │   └── Partner.jsx
│   ├── Product.jsx
│   └── Reservation.jsx
├── admin/                 # 관리자 페이지 전용 디렉토리
│   ├── Dashboard.jsx
│   ├── ProductManagement.jsx
│   ├── GalleryManagement.jsx
│   └── Login.jsx
├── api/                   # API 요청 함수 모음
├── App.js
└── index.js
```

## ✅ 주요 기능

- 사용자 페이지
  - 스냅 촬영 소개 및 안내 (가이드, FAQ 등)
  - 갤러리, 상품 안내, 예약 폼
- 관리자 페이지
  - 로그인 및 토큰 기반 인증
  - 상품/옵션 등록 및 수정
  - 갤러리 사진 업로드 및 삭제
  - 공지/FAQ/가이드 CRUD

## ⚙️ 로컬 실행 방법

1. **Clone**
   ```bash
   git clone https://github.com/junhyeok928/snapthetitle.git
   cd snapthetitle
   ```

2. **패키지 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   `.env` 파일을 생성하고 API 서버 주소를 설정합니다.

   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080
   ```

4. **로컬 실행**
   ```bash
   npm start
   ```

## 🔐 인증 방식

- 관리자 로그인 시 JWT 토큰 발급
- `Authorization` 헤더를 통해 인증 요청 처리
- 토큰은 localStorage에 저장 및 검증

## 🎨 UI/UX 참고 기준

- 심플한 화이트 테마
- Tailwind CSS 기반 반응형 디자인
- `Guide.jsx`를 기준으로 일관된 컴포넌트 구성

## 📦 배포

- Netlify, Vercel, 또는 S3 정적 호스팅으로 배포 가능
- 빌드 명령어
  ```bash
  npm run build
  ```

## 👤 개발자

| 이름 | 역할 |
|------|------|
| 전준혁 (@junhyeok928) | 프론트엔드 개발 및 관리자 UI 구성 |

---

> 백엔드 프로젝트는 [snapthetitle-backend](https://github.com/junhyeok928/snapthetitle-backend) 레포를 참고해주세요.
