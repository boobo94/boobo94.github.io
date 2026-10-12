---
title: How to setup Docker with static HTML file
summary: Are you ready to launch your static website with HTML, Docker and NginxProxyManager. Check this out and do it yourself pretty easy.
categories: devops
tags: docker
date: 2023-01-01 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2021/05/29/09/12/container-port-6292881_1280.jpg
layout: post
---

Are you ready to launch your static website with HTML, Docker and NginxProxyManager. Check this out and do it yourself pretty easy.

**Dockerfile**

```Dockerfile
FROM node:lts-alpine

# install simple http server for serving static content
RUN yarn global add serve

# make the 'app' folder the current working directory
WORKDIR /usr/src/website

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080
CMD [ "serve", "-p", "8080"]
```

**docker-compose.yml**

```Dockerfile
version: "3.3"

services:
  ngxinxproxymanager:
    image: "jc21/nginx-proxy-manager:latest"
    container_name: yourproject-ngxinxproxymanager
    restart: unless-stopped
    ports:
      - "80:80" # Public HTTP Port
      - "443:443" # Public HTTPS Port
      - "81:81" # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    networks:
      - yourproject-network
    environment:
      # the SQLite DB file within the container
      DB_SQLITE_FILE: "/data/database.sqlite"
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt

  website:
    build:
      context: ../website
      dockerfile: ../docker/website.Dockerfile
    container_name: yourproject-website
    restart: always
    ports:
      - "8081:8080"
    networks:
      - yourproject-network

networks:
  yourproject-network:
    driver: bridge

volumes:
  yourproject-db:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: "${PWD}/db-data"


```

Related articles:

- [NodeJS Tests with microservices, Jenkins and Docker](/tutorials/nodejs-jenkins-docker-testing/)
- [Wordpress Dockerfile](/devops/wordpress-docker/)
