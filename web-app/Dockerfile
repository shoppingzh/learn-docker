# 多阶段构建
FROM node:latest as build
COPY . /app
WORKDIR /app
RUN npm i -g pnpm \
  && pnpm i \
  && pnpm build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
