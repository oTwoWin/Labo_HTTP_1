# RES - Labo HTTP Infrastrcuture

## About the repo

The repo provides differents docker images for different HTTP infrastructure.

Here are the list of the docker images provided by the repo :

- Static HTTP server with apache httpd (apache-php-image) 
- Dynamic HTTP server with express.js (express-image)
- Reverse proxy with apache (static configuration) (reverse-proxy-apache)




## 1. Static HTTP server with apache httpd

### About the server

The server is designed to be run in a Docker container.

You will find the Dockefile in `docker-images/apache-php-image` repository.

All the command shown below are executed in `docker-images/apache-php-image` repository.

The source for the apache server are in the `src` folder if you want to make any change.

### Configure the server with Docker

#### Building the apache image

Use the command `docker build -t nameOfYourImage .` to build the image.

#### Running the server

The final step is to run your server with the port mapping you wish.

Here is an example how to run it : `docker run -d -p 9090:80 nameOfYourImage`.

#### Access the server

To access your host, just open your favorite browser and write in the  URL `localhost:9090`.

If you change the port number when you previously launched the docker, don't forget to change it in the URL too. 


## 2. Dynamic HTTP server with express.js

### About the server

The server is designed to be run in a Docker container.

All the command shown below are executed in this repository.

The source for the express server are in the `src` folder if you want to make any change.

### Configure the source for the server

First, you need to assure that the `node_modules` folder is present. If not just run this command : 
`npm install ` to install the dependencies. 

In the `index.js` file, you can configure the routes and the port that the server is listening to.   

### Configure the server with Docker

#### Building the apache image

Use the command `docker build -t nameOfYourImage .` to build the image.

#### Running the server

The final step is to run your server with the port mapping you wish.

Here is an example how to run it : `docker run -d -p 9090:3000 nameOfYourImage`.

#### Access the server

To access your host, just open your favorite browser and write in the  URL `localhost:9090`.

If you change the port number when you previously launched the docker, don't forget to change it in the URL too. 


## 3. Reverse Proxy Apache httpd

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

Go to `docker_images/apache-reverse-proxy` folder and use the command `docker build -t nameOfYourImage .` to build the image.

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

## 4. AJAX requests with JQuery

### Implementation

#### Script animal.js

We created a JS script in the js folder of our static apache server. The script ask the dynamic server a JSON, and will take the first element and write the content of the first element in the tag with the "animals" class. It will send a request to the dynamic server every 2 seconds.

Here is the script : 

```javascript
$(function(){
	console.log("Loading animals");
	
	function loadAnimals(){
		$.getJSON("/api/animals/", function( animals ){
		console.log(animals);
		var message = "No animals";
		if ( animals.length > 0 ){
			message = animals[0].name + " the " + animals[0].type;
		}
		$(".animals").text(message);
	});
	};
	loadAnimals();
	setInterval( loadAnimals, 2000);
});
```

#### index.html modifications

We just imported the script at the bottom of the index.html file with this line : 

`<script src="js/animals.js"></script>`

Then we just added a `h2` tag with a class containing `animals` which will be the target of the animal.js script.

## 5. Dynamic reverse proxy configuration

### Running the server

To run the server, you have to build the image with the Dockerfile located in `docker_images/apache-reverse-proxy` folder. After you built it, you can run the server with the command `docker run -d -e STATIC_APP={IP ADRESS OF YOUR STATIC SERVER} -e DYNAMIC_APP={IP ADRESS OF YOUR DYNAMIC SERVER} --name {NAME OF YOUR CONTAINER} -p 8080:{PORT OF YOUR STATIC SERVER} {NAME OF YOUR IMAGE}`

### Test

We ran multiple containers containing multiple dynamic servers and static servers. After that, we checked their IP addresses and choose one IP address of one dynamic server, and one IP address of one static server. Then, we built the reverse proxy image, ran the command mentioned above with the two IP addresses passed in parameters. Finally, we checked if everything worked fine with our browser, and I yes, everything worked fine.



## 6. Management UI

### Description

This tool provides a web interface that allows you to manage the different containers on the PC. It uses a nodejs server and the Dockerode library. 

### Starting the management tool

To launch the interface, simply go to the `docker_images/management-ui/src` folder and type the command `node index.js`. Then you can access it via the URL : `127.0.0.1:2000`.
It is important to make sure that you have the right packages installed on your machine. 

### Implementation

#### Server side

The server runs on nodejs and uses the Dockerode library.
When the server starts, it will retrieve all the containers running on the host machine. It will also retrieve all available Docker images from the host machine. It will launch these two functions every second. 

It will also provide two URLs that allow a customer to retrieve the images as well as the containers that are launched. These two URLs are /getContainers and /getImages.

It also provides several features that depend on a URL. Here are the features: 
- /create: allows you to create a container using the data sent from a client. It will retrieve the name of the container to be created, the desired image and the options. These are passed in the URL. He will retrieve the information and create the container.
- /stopAll: allows you to stop all containers. 
- /stop: allows to stop a container thanks to its id which is passed in the URL.
- /start: allows you to start a container according to the name of the container to be started which is passed in the URL as a parameter.
- /delete : allows you to delete a container according to the name of the container to be deleted that is passed in the URL as a parameter.

#### Client side

The client is based on a bootstrap template. It allows to dynamically display boxes for each container running on the machine. It retrieves the information via a JavaScript script that accesses the URL of the server `/getContainers`. It also provides a form whose available images are retrieved from the nodejs server via the url `/getImages`.

The interface allows you to stop a container, start it, delete it if it is stopped. It allows you to create a container according to a name, an image and options.
