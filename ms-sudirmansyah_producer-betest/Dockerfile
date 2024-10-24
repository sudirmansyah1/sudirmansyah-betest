FROM node:21.6.0-slim

ENV TZ="Asia/Jakarta"

WORKDIR /usr/src/app

COPY ms-sudirmansyah_producer-betest/package*.json ./

RUN npm install

COPY ms-sudirmansyah_producer-betest/ ./
COPY ms-sudirmansyah_producer-betest/.env.production ./.env

RUN npm run lint

CMD [ "npm", "run", "prod" ]
