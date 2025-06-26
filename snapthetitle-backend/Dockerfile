# Java 17 기반 Spring Boot 실행용
FROM openjdk:17-jdk-slim

# 작업 디렉토리
WORKDIR /app

# 빌드된 JAR 복사
COPY build/libs/snapthetitle-backend-0.0.1-SNAPSHOT.jar app.jar

# 포트 개방
EXPOSE 8080

# Spring Boot 실행
ENTRYPOINT ["java", "-jar", "app.jar"]