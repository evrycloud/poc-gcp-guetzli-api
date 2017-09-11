FROM node:8.3.0-alpine

WORKDIR /src

COPY package.json .

RUN npm i

ADD . .

CMD ["npm", "start"]
