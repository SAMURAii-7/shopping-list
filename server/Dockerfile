# syntax=docker/dockerfile:1
FROM node:20.12

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 8080
CMD ["pm2-runtime", "--name", "shopping-list", "server.js"]