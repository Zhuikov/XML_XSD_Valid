FROM node:8

WORKDIR /usr/src/XML_XSD_VALID

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
