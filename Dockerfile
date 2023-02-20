FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["./docker/entrypoint.sh"]

CMD [ "npm", "run", "start:prod" ]
