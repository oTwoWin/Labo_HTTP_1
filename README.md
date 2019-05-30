# RES - Labo HTTP Infrastrcuture

## Static HTTP server with apache httpd

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

