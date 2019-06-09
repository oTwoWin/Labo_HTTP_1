FROM php:5.6-apache

COPY apache2-foreground /usr/local/bin/
COPY templates /var/apache2/templates
COPY conf/ /etc/apache2
RUN chmod +x /usr/local/bin/apache2-foreground
RUN apt-get update && apt-get install -y vim
RUN a2enmod proxy proxy_http proxy_balancer proxy_hcheck lbmethod_bytraffic headers lbmethod_byrequests
RUN a2ensite 000-* 001-*
