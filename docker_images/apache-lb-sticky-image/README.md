# RES - Labo HTTP Infrastrcuture

## Reverse Proxy Apache httpd

### About the proxy

The proxy is designed to be run in a Docker container.

The proxy server will be placed between the web servers and users who want to connect to it. It will receive all requests made from outside and redirect them to the various web servers.

All the command shown below are executed in this repository.



### Configure the source for the proxy

Currently, the proxy is configured so that the `apache-php-image` server is at address 172.12.0.2:80 and the `express-image` server is at address 172.12.0.3:3000. It is also configured on the domain name `labo.res.ch`
If you do not want to change the proxy configuration, please make sure that you do not have any Docker containers that are started and start the `apache-php-image server` image first, and then the `express-image` server.

If you want to configure the proxy, you will have to modify the file located in the folder `conf/sites-availabe/001-reverse-proxy.conf`.

 If you want to change domain name, you will have to modify the `ServerName` field. 

If you want to change the different server, you will have to modify the `ProxyPass` and `ProxyPassReverse` of the server you want to change.   

### Configure the server with Docker

#### Building the apache image

Use the command `docker build -t nameOfYourImage .` to build the image.

#### Running the server

The final step is to run your server with the port mapping you wish. In the example below, we use the local port 8080.

Here is an example how to run it : `docker run -d -p 8080:80 nameOfYourImage`.

#### Modify host file

To add the domain name `labo.res.ch` (or the domain you specified if you changed it), we have to add this domain in our host file.

If you are on an UNIX system, modify the file `/etc/hosts`. You have to add this line : 

`127.0.0.1 labo.res.ch` (Replace the domain with your domain). 

#### Access the server

To access your host, just open your favorite browser and write in the  URL `labo.res.ch:8080`.

If you changed the port number when you previously launched the docker or the domain name in the configuration file, don't forget to change it in the URL too. 
