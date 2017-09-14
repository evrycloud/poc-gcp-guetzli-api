FROM node:8.3.0-alpine

RUN apk add --update alpine-sdk libc6-compat

WORKDIR /src

COPY package.json .

RUN npm i

ADD . .

EXPOSE 3000

CMD ["npm", "start"]
