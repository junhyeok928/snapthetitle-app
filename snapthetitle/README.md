# 📸 SnapTheTitle App

> **모노레포 프로젝트** — React(프론트) + Spring Boot(백엔드) + MySQL + Nginx + Docker  
> 스냅더타이틀은 **스냅 촬영 및 상품 관리**, **갤러리 운영**, **방문자 통계** 기능을 통합 제공하는 홈페이지입니다.

---

## 📖 프로젝트 소개
SnapTheTitle은 사진 스튜디오/촬영 업체를 위한 **통합 관리 솔루션**입니다.  
관리자는 웹 기반 대시보드에서 상품과 옵션, 갤러리 사진, FAQ, 파트너 정보를 손쉽게 관리할 수 있으며,  
사용자는 깔끔하게 정리된 갤러리와 상품 정보를 열람할 수 있습니다.

본 프로젝트는 **프론트엔드(React + Tailwind)**와 **백엔드(Spring Boot + MySQL)**를 Docker 기반 환경에서 함께 운영하도록 구성되어 있습니다.  
이미지 업로드 시 **WebP 변환 + 썸네일 생성**이 자동으로 처리되어, 빠른 로딩 속도와 트래픽 절감을 동시에 달성합니다.

---

## ✨ 주요 기능
- 📦 **관리자 페이지**: 상품, 옵션, FAQ, 가이드, 파트너 CRUD
- 🖼 **갤러리 업로드**: WebP 변환 + 썸네일 자동 생성
- 🎯 **카테고리별 Drag & Drop 정렬** (displayOrder 유지)
- 📊 **방문자 통계 대시보드**: 최근 7일 LineChart, 유입경로 PieChart
- 🔐 **JWT 기반 관리자 인증**
- 🌐 정적 서빙(Nginx), `/uploads/**` 이미지 조회

---

## 📂 프로젝트 구조
```bash
snapthetitle-app/
├─ snapthetitle/          # React (CRA + Tailwind)
├─ snapthetitle-backend/  # Spring Boot (Java 17, JPA, Security)
├─ docker-compose.yml     # 로컬 통합 실행
└─ README.md
```

---

## 🚀 빠른 시작 (Docker)
> 로컬에 **Docker / Docker Compose**만 있으면 됩니다.

```bash
# 1) (선택) 프론트 빌드
cd snapthetitle
npm install
npm run build
cd ..

# 2) 통합 실행
docker-compose up --build
```

접속:
- **웹**: http://localhost
- **API**: http://localhost/api
- **이미지**: http://localhost/uploads/<파일명>.webp

---

## ⚙ 환경 변수(.env 예시)
```env
# DB
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/snapthetitle
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=change-me

# 파일 저장 경로
FILE_UPLOAD_DIR=/home/app/uploads

# 인증
JWT_SECRET=ThisIsASecretKeyForJwtTokenGeneration123456

# 프론트
REACT_APP_API_URL=/api
```

---

## 📡 API 예시
- **연도 목록**: `GET /api/products/years`
- **연도별 상품**: `GET /api/products?year=YYYY`
- **방문 기록**: `POST /api/track/visit`
- **관리자 로그인**: `POST /api/admin/login`

---

## 🛠 트러블슈팅
- **권한 경고**: `warning: could not open directory 'certbot/...': Permission denied`
    - `.gitignore`에 `certbot/` 추가하거나 권한 수정
- **브라우저 캐시 문제**
    - 강력 새로고침(Ctrl+F5) 또는 캐시 비활성 후 새로고침
- **Docker 캐시 문제**
    - 컨테이너 재빌드(`--no-cache`) 또는 볼륨 재마운트

---

## 📝 권장 .gitignore
```gitignore
# 인증서
certbot/
*.pem
*.key

# 프론트 빌드
snapthetitle/build/

# 백엔드 빌드 산출물
snapthetitle-backend/target/

# 업로드 데이터
uploads/
```

---

## 🗺 로드맵
- 🌍 EC2 배포 및 도메인 연결
- 🔑 SSL 자동 갱신 (Let's Encrypt)
- ⚙ CI/CD (GitHub Actions)
- 📈 방문 통계 고도화

---

## 👤 Maintainer
- GitHub: [@junhyeok928](https://github.com/junhyeok928)
