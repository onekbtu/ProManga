FROM node:lts-alpine

COPY . /app

WORKDIR /app
RUN apk add bash && npm install

