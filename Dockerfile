FROM node:14-alpine3.14

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY . .

RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]