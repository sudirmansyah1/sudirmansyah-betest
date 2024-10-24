FROM node:21.6.0-slim

ENV TZ="Asia/Jakarta"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run lint

CMD [ "npm", "run", "prod" ]