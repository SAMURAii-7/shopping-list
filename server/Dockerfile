# syntax=docker/dockerfile:1
FROM node:20.12

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 8080
CMD ["node", "server.js"]