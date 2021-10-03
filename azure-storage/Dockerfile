FROM node:16.9.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY ./src ./src
CMD yarn start
