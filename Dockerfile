FROM node:8.3.0-alpine

WORKDIR /src

COPY package.json .

RUN npm i

ADD . .

EXPOSE 3000

CMD ["npm", "start"]
