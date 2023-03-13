FROM node:latest

COPY . /app
WORKDIR /app

RUN npm i -g pnpm \
  && pnpm i

CMD ["node", "./src/index.js"]
