# snapthetitle-backend

웨딩스냅 예약 및 관리 서비스 **Snap the Title**의 백엔드 프로젝트입니다.  
Spring Boot 기반으로 구축되었으며, 관리자 페이지와 사용자 요청 처리를 위한 API를 제공합니다.

## 🛠️ 기술 스택

- **Language:** Java 17
- **Framework:** Spring Boot 3.5
- **Database:** MySQL
- **ORM:** Spring Data JPA
- **Build Tool:** Gradle
- **Security:** Spring Security + JWT
- **Others:** Lombok, Swagger (Springdoc), Validation

## 📁 프로젝트 구조

```
src
├── main
│   ├── java/com/snapthetitle/backend
│   │   ├── controller       # API 컨트롤러
│   │   ├── dto              # 데이터 전송 객체
│   │   ├── entity           # JPA 엔티티
│   │   ├── repository       # JPA 레포지토리
│   │   ├── service          # 비즈니스 로직
│   │   └── config           # 보안/전역 설정 등
│   └── resources
│       ├── application.yml  # 환경 설정
│       └── static/templates
```

## ✅ 주요 기능

- 관리자 인증 (JWT 기반)
- 상품 및 옵션 등록/조회/수정/삭제
- 촬영 갤러리 관리 (사진 업로드 포함)
- 공지사항/FAQ/가이드 관리
- 예약 데이터 처리 및 유효성 검증
- 첨부파일 저장 및 연동

## ⚙️ 로컬 실행 방법

1. **Clone**
   ```bash
   git clone https://github.com/junhyeok928/snapthetitle-backend.git
   ```

2. **application.yml 설정**
   `src/main/resources/application.yml`에 DB 및 JWT 시크릿 설정을 입력하세요.

   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/snapthetitle
       username: root
       password: yourpassword
     jpa:
       hibernate:
         ddl-auto: update

   jwt:
     secret: your-jwt-secret-key
   ```

3. **MySQL 실행 및 DB 생성**
   ```sql
   CREATE DATABASE snapthetitle DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Gradle 실행**
   ```bash
   ./gradlew bootRun
   ```

5. **Swagger 문서 확인**
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

## 🔒 인증 방식

- 로그인 시 JWT 토큰 발급
- 이후 모든 요청은 `Authorization: Bearer <token>` 헤더 필요

## 💾 파일 업로드

- 다중 이미지 업로드 지원 (Multipart/form-data)
- 파일은 S3 또는 로컬 저장소에 저장 (설정에 따라 다름)
- 업로드된 파일은 `Attachment` 테이블과 연동

## 📝 커밋 컨벤션 (예시)

```
feat: 상품 등록 API 추가
fix: 예약 날짜 파라미터 검증 오류 수정
refactor: 갤러리 서비스 리팩토링
```

## 👤 개발자

| 이름 | 역할 |
|------|------|
| 전준혁 (@junhyeok928) | 백엔드 개발, API 설계 및 구현 |

---

> 프론트엔드 프로젝트는 [snapthetitle (React)](https://github.com/junhyeok928/snapthetitle) 레포를 참고해주세요.
