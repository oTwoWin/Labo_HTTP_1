#!/bin/bash

list_containers() {
  keyword=$1
  if [ $# -ne 1 ]; then
      echo -e "Please set a keyword as argument! such as container name.\n"
      exit 255
  fi

  container_ids=$(docker ps | grep $keyword | grep -o -e '^\S*')

  for id in $container_ids
  do
      ip=$(docker inspect --format='{{ .NetworkSettings.IPAddress }}:' $id)
      port=$(docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}}{{$p}}{{end}}' $id)
      ip_adresses+=("${ip}${port%/*}")
  done
}
container=$1
# Verify the script is called with an argument
if [ $# -ne 1 ]; then
    echo -e "Please set the image name as argument!\n"
    exit 255
fi

# Recovering the ips of the static and dynamic containers
declare -a ip_adresses
list_containers 'static'
STATIC_APP="${ip_adresses[@]}"

unset ip_adresses
declare -a ip_adresses

list_containers 'express'
DYNAMIC_APP="${ip_adresses[@]}"

echo "${STATIC_APP[@]}"
echo "${DYNAMIC_APP[@]}"

docker run -d -p 80:80 -e STATIC_APP="${STATIC_APP}" -e DYNAMIC_APP="${DYNAMIC_APP}" --name apache_lb $container
