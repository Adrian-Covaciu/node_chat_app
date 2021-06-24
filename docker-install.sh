#!/bin/bash

#docker configuration and installation
sudo yum install -y yum-utils evice-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum -y install docker-ce

#starting docker
sudo systemctl start docker && sudo systemctl enable docker

#building image and running container
docker build -t weather .
docker container run -d -p 8080:3000 weather

#check webpage for html output
curl localhost:8080
