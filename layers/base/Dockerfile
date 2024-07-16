FROM node:lts-alpine as runtime

ENV ENVIRONMENT=$ENVIRONMENT

RUN mkdir /app
RUN mkdir /cache

WORKDIR /app

COPY ./.output /app

ENV NUXT_HOST=0.0.0.0

ENTRYPOINT PORT=8080 node /app/server/index.mjs
