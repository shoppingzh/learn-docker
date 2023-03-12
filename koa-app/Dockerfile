FROM node:latest

COPY . /app
WORKDIR /app

RUN npm i -g pnpm \
  && pnpm i

EXPOSE 3000:3000
CMD ["node", "./src/index.js"]
