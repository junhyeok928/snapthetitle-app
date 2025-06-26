# 📸 snapthetitle-app

> **스냅더타이틀**의 전체 시스템을 통합 관리하는 모노레포입니다.  
> 프론트엔드(React), 백엔드(Spring Boot), 인프라(Docker, Nginx, MySQL)를 하나의 저장소에서 구성하며, 파일 업로드, 관리자 기능, 방문 통계, 슬라이더 관리 등 실제 운영 기능을 포함합니다.

---

## 🗂 프로젝트 구조

```
snapthetitle-app/
├── snapthetitle/            # React 프론트엔드 (CRA + TailwindCSS)
├── snapthetitle-backend/    # Spring Boot 백엔드 (Java 17 + JPA + MySQL)
├── nginx/                   # Nginx 리버스 프록시 설정
├── uploads/                 # 업로드된 이미지 저장 디렉토리 (Docker 볼륨으로 연결)
├── docker-compose.yml       # 전체 환경 통합 실행
└── README.md
```

---

## 🚀 실행 방법 (로컬 Docker 환경)

### 1. 프론트엔드 빌드

```bash
cd snapthetitle
npm install
npm run build
```

### 2. 루트로 돌아와서 Docker 실행

```bash
docker-compose up --build
```

### 3. 접속 경로

- 웹 페이지: [http://localhost](http://localhost)
- API: [http://localhost/api](http://localhost/api)
- 업로드 이미지: [http://localhost/uploads/파일명.webp](http://localhost/uploads/파일명.webp)

---

## ⚙️ 환경 변수 예시

```env
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/snapthetitle
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=yourpassword

FILE_UPLOAD_DIR=/home/app/uploads
JWT_SECRET=ThisIsASecretKeyForJwtTokenGeneration123456

REACT_APP_API_URL=/api
```

---

## 📦 주요 기능

- 상품/옵션/FAQ/가이드/파트너 등 CRUD 관리자 기능
- 갤러리 이미지 업로드 + 썸네일 자동 생성(WebP)
- 카테고리별 Drag & Drop 정렬 기능
- 대시보드 방문자 통계 (Line, Pie Chart)
- JWT 기반 인증 + 관리자 로그인
- Nginx 프록시 + 정적 파일 서빙 + 이미지 조회

---

## 🛠 사용 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트 | React, CRA, Tailwind CSS |
| 백엔드 | Spring Boot, JPA, Spring Security |
| DB | MySQL 8 |
| 배포 | Docker, Nginx, EC2 예정 |
| 이미지 처리 | 썸네일, WebP 변환 |
| 인증 | JWT |
| 통계 시각화 | Recharts |
| 파일 저장 | Docker 볼륨 (uploads/) |

---

## 📌 향후 계획

- AWS EC2 배포 및 Nginx 기반 운영 서버 구성
- Route53 또는 외부 도메인 연결
- SSL 인증서 (Let's Encrypt) 적용
- GitHub Actions 통한 CI/CD 파이프라인 구성 예정

---

## 📝 Git 전략

- 루트 기준 `monorepo` 구조 (프론트 + 백엔드 통합)
- 이전 Git 히스토리는 `.bundle`로 백업 보관
- 커밋 메시지 스타일:

  ```
  feat: 새로운 기능 추가
  fix: 버그 수정
  infra: 도커/서버 구성 변경
  docs: 문서 또는 README 변경
  refactor: 리팩토링
  ```

---

## 🛡️ 기타

- `.bundle` 파일 등 대용량 백업은 Git에 포함되지 않음 (`.gitignore` 처리됨)
- `uploads/`는 운영 환경에 따라 외부 볼륨 또는 S3로 전환 가능

---

## 👤 Maintainer

- GitHub: [@junhyeok928](https://github.com/junhyeok928)
