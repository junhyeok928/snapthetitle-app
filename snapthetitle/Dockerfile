FROM node:16 AS build

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build
