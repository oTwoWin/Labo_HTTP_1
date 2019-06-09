FROM node:latest

COPY src/ /opt/app
COPY web_sources /opt/app/web_sources
COPY pkg /pkg
WORKDIR /opt/app

RUN npm install

#RUN apt-get update && apt-get install -y vim
#RUN dpkg -i /pkg/docker.deb

CMD ["node", "/opt/app/index.js"]
