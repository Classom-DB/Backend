FROM node:current-alpine

WORKDIR /usr/src/classom-db-api
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000


CMD ["npm", "start"]