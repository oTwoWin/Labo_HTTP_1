FROM node:latest

COPY src/ /opt/app

WORKDIR /opt/app

RUN nmp install

CMD ["node", "/opt/app/index.js"]
