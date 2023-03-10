FROM node:latest

COPY . /app
WORKDIR /app

RUN npm i -g pnpm \
  && pnpm i

EXPOSE 3333:3000
CMD ["node", "./index.js"]
