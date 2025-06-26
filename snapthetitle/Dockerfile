FROM node:16 AS build

WORKDIR /app
COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm install --legacy-peer-deps
RUN npm run build
