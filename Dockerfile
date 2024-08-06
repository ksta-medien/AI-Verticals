FROM node:lts-alpine as runtime

ENV MANDATOR=$MANDATOR
ENV ENVIRONMENT=$ENVIRONMENT
ENV TARGET=$TARGET

RUN mkdir /app
RUN mkdir /cache

RUN npm install --platform=linuxmusl --arch=x64 sharp

WORKDIR /app

COPY ./.output /app

ENV NUXT_HOST=0.0.0.0

ENTRYPOINT PORT=8080 node /app/server/index.mjs