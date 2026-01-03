# Java 17 기반 Spring Boot 실행용
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY build/libs/snapthetitle-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# JAVA_OPTS를 JVM 옵션으로 반영
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
