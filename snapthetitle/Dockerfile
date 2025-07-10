# build stage
FROM node:16 AS build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# production stage
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
