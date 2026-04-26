# 📸 SnapTheTitle

> 웨딩·스냅 촬영 스튜디오를 위한 **통합 홈페이지 & 관리 솔루션**  
> React · Spring Boot · MySQL · Nginx · Docker 기반 모노레포

---

## 프로젝트 소개

**SnapTheTitle**은 스냅 촬영 업체가 자사 홈페이지를 직접 운영할 수 있도록 설계된 풀스택 웹 애플리케이션입니다.

- **일반 사용자**는 갤러리, 상품·가격 정보, FAQ, 가이드, 파트너 업체 정보를 열람하고 예약 문의를 남길 수 있습니다.
- **관리자**는 별도 대시보드에서 콘텐츠 전체를 CRUD하고, 실시간 방문자 통계를 확인합니다.
- 이미지 업로드 시 **WebP 자동 변환 + 썸네일 생성**이 서버 측에서 처리되어 로딩 속도를 최적화합니다.

---

## 주요 기능

| 영역 | 기능 |
|---|---|
| 공개 페이지 | 홈 슬라이더, 갤러리(Masonry + Lightbox), 연도별 상품 조회, FAQ / 가이드 / 파트너 페이지 |
| 관리자 대시보드 | 방문자 통계 (7일 LineChart, 유입경로 PieChart) |
| 콘텐츠 관리 | 상품·옵션 CRUD, 갤러리·메인 슬라이더 사진 업로드 및 Drag & Drop 정렬 |
| 파일 처리 | 다중 이미지 업로드 → WebP 변환 + 썸네일 자동 생성 (Scrimage) |
| 인증 | JWT 기반 관리자 로그인 / 인가 |
| 인프라 | Nginx SSL 종료(Let's Encrypt), Docker Compose 단일 명령 배포 |

---

## 기술 스택

### Frontend
- React 18 (Create React App)
- Tailwind CSS 3
- React Router v6
- Axios · JWT Decode
- Recharts · dnd-kit · React Masonry CSS · Yet Another React Lightbox

### Backend
- Java 17 · Spring Boot 3.5
- Spring Data JPA · Spring Security
- Flyway (DB 마이그레이션)
- Scrimage (WebP 변환 · 썸네일)
- Gradle · Lombok

### Infrastructure
- MySQL 8.0
- Nginx (리버스 프록시 · 정적 파일 서빙 · SSL)
- Docker · Docker Compose
- Let's Encrypt (Certbot)

---

## 프로젝트 구조

```
snapthetitle-app/
├── snapthetitle/               # React 프론트엔드 (CRA + Tailwind)
│   ├── src/
│   │   ├── api/                # adminApi.js (JWT), publicApi.js
│   │   ├── components/
│   │   │   ├── admin/          # 관리자 화면 컴포넌트
│   │   │   ├── common/         # 공통 레이아웃, Header, Footer
│   │   │   └── pages/          # 공개 페이지
│   │   └── contexts/           # AuthContext (JWT)
│   ├── Dockerfile              # Multi-stage: Node build → Nginx serve
│   └── nginx.conf
│
├── snapthetitle-backend/       # Spring Boot 백엔드
│   ├── src/main/java/com/snapthetitle/backend/
│   │   ├── controller/
│   │   │   ├── admin/          # 관리자 전용 API (JWT 인증 필요)
│   │   │   └── user/           # 공개 API
│   │   ├── service/            # 비즈니스 로직 (AttachmentService 등)
│   │   ├── entity/             # JPA 엔티티 (soft delete: deleted_yn)
│   │   ├── repository/
│   │   ├── dto/
│   │   ├── config/             # SecurityConfig, WebConfig
│   │   └── filter/             # JWT 인증 필터
│   ├── src/main/resources/
│   │   ├── application.yml / application-dev.yml / application-prod.yml
│   │   └── db/migration/V1__init_schema.sql
│   └── Dockerfile
│
├── docker-compose.yml          # MySQL + Backend + Frontend(Nginx) 통합 실행
├── .env                        # 환경 변수 (git 제외)
└── uploads/                    # 업로드 파일 저장소
```

---

## 빠른 시작 (Docker)

> **Docker / Docker Compose**만 설치되어 있으면 됩니다.

```bash
# 1. 환경 변수 설정
cp .env.example .env   # .env 파일 작성 (아래 환경 변수 섹션 참고)

# 2. 프론트엔드 빌드
cd snapthetitle
npm install && npm run build
cd ..

# 3. 전체 서비스 실행
docker-compose up --build
```

| 서비스 | 주소 |
|---|---|
| 웹 (프론트) | http://localhost |
| API | http://localhost/api |
| 업로드 이미지 | http://localhost/uploads/\<파일명\>.webp |
| MySQL | localhost:3307 |

---

## 로컬 개발 환경 (개별 실행)

### Frontend
```bash
cd snapthetitle
npm install
npm start        # http://localhost:3000
```

### Backend
```bash
cd snapthetitle-backend
# application-dev.yml 에서 로컬 DB 연결 정보 확인
./gradlew bootRun   # http://localhost:8080

# Swagger UI
# http://localhost:8080/swagger-ui/index.html
```

### 테스트 실행
```bash
# 프론트
cd snapthetitle && npm test

# 백엔드
cd snapthetitle-backend && ./gradlew test
```

---

## 환경 변수 (.env)

```env
# 데이터베이스
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/snapthetitle
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=your-db-password

# 파일 저장 경로 (Docker 내부 경로)
FILE_UPLOAD_DIR=/home/app/uploads

# JWT
JWT_SECRET=your-jwt-secret-key-32-chars-or-more

# Spring 프로파일
SPRING_PROFILES_ACTIVE=prod

# 프론트엔드
REACT_APP_API_URL=/api
```

---

## 주요 API

| 메서드 | 경로 | 설명 |
|---|---|---|
| `POST` | `/api/admin/login` | 관리자 로그인 → JWT 발급 |
| `GET` | `/api/products/years` | 연도 목록 조회 |
| `GET` | `/api/products?year=YYYY` | 연도별 상품 목록 |
| `GET` | `/api/gallery` | 갤러리 사진 목록 |
| `POST` | `/api/track/visit` | 방문 기록 저장 |
| `GET` | `/api/admin/dashboard` | 방문자 통계 (관리자 전용) |

전체 API 명세는 로컬 실행 후 Swagger에서 확인할 수 있습니다.  
→ `http://localhost:8080/swagger-ui/index.html`

---

## DB 스키마

Flyway로 자동 초기화됩니다 (`V1__init_schema.sql`).

| 테이블 | 역할 |
|---|---|
| `products` / `product_options` | 상품 및 옵션 |
| `gallery_photos` / `main_photos` | 갤러리 · 홈 슬라이더 사진 |
| `attachments` | WebP 파일 + 썸네일 (entity_type / entity_id 로 폴리모픽 연결) |
| `faqs` / `guides` / `guide_details` | 공지 콘텐츠 |
| `partners` | 파트너 업체 |
| `admin_users` | 관리자 계정 |
| `visit_logs` | 방문자 통계 원시 데이터 |

---

## 커밋 컨벤션

```
feat:     새로운 기능
fix:      버그 수정
infra:    인프라 / 배포 설정
refactor: 리팩토링
style:    UI / 스타일 변경
docs:     문서 수정
chore:    빌드 설정, 의존성 업데이트
```

---

## 트러블슈팅

- **`certbot/... Permission denied`** — `.gitignore`에 `certbot/` 추가
- **브라우저 캐시 문제** — `Ctrl + F5` 강력 새로고침
- **Docker 캐시 문제** — `docker-compose up --build --no-cache`

---

## 개발자

| 이름 | 역할 |
|---|---|
| 전준혁 ([@junhyeok928](https://github.com/junhyeok928)) | 풀스택 개발, 인프라 구성 |
