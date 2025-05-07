FROM node:20.12.1

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]