FROM node:latest

COPY src/ /opt/app

WORKDIR /opt/app

RUN npm install

RUN apt-get update && apt-get install -y vim

CMD ["node", "/opt/app/index.js"]
