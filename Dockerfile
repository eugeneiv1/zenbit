FROM node:20-alpine

MAINTAINER Yevhenii Ivankin

WORKDIR /app

COPY ./backend/package*.json /app

RUN npm install

COPY . .

COPY ./backend/dist .app/dist

CMD ["npm", "run", "start"]