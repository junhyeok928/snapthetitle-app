# build stage
FROM node:16 AS build

WORKDIR /app

COPY . .

# 🔥 프로덕션 빌드 시 소스맵 생성 비활성화
ENV GENERATE_SOURCEMAP=false

RUN npm install --legacy-peer-deps
RUN npm run build

# production stage
FROM nginx:stable

# nginx config 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# React build 결과물을 nginx html 디렉토리에 복사
COPY --from=build /app/build /usr/share/nginx/html
