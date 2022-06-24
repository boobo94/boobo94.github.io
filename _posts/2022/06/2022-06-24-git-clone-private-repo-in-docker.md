---
title: Git clone private repo in docker
summary: A simple how to guide to use git clone of a private repository inside docker container. With vuejs / nodejs app.
categories: devops
tags: docker nodejs vuejs
date: 2022-06-24 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2021/05/21/17/30/ship-6271649_1280.jpg
layout: post
---

A simple how to guide to use git clone of a private repository inside docker container. With vuejs / nodejs app.

## The package.json build script

```json
  "build": "vue-cli-service build --port 8003", # for vuejs projects
  "start:prod": "babel-node ./src/index.js", # for nodejs projects with babel-node
```

## env file

```env
SSH_KEY="-----BEGIN OPENSSH PRIVATE KEY-----
YOUR CONTENT HERE
-----END OPENSSH PRIVATE KEY-----"
```

# Vuejs app

```docker

# Choose and name our temporary image.
FROM alpine as intermediate

# Take an SSH key as a build argument.
ARG SSH_KEY

# Install dependencies required to git clone.
RUN apk update && \
    apk add --update git && \
    apk add --update openssh

# 1. Create the SSH directory.
RUN mkdir -p /root/.ssh/
# 2. Populate the private key file.
RUN echo "$SSH_KEY" > /root/.ssh/id_rsa
# 3. Set the required permissions.
RUN chmod -R 600 /root/.ssh/
# 4. Add github to our list of known hosts for ssh.
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# inject a datestamp arg which is treated as an environment variable and
# will break the cache for the next RUN command
ARG DATE_STAMP

# Clone a repository
RUN git clone git@github.com:USER/REPO_NAME.git

# default branch is master/main
# if you need to change the branch uncomment the following lines
# RUN cd /REPO_NAME && \
#    git checkout YOUR_BRANCH

## Build Stage ##

# pull the Node.js Docker image
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# create the directory inside the container
WORKDIR /usr/src/app

# copy essential files to install dependencies
COPY --from=intermediate /REPO_NAME/app/package*.json .
COPY --from=intermediate /REPO_NAME/app/babel.config.js .
COPY --from=intermediate /REPO_NAME/app/vue.config.js .

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY --from=intermediate /REPO_NAME/app/src/ ./src

# build app for production with minification
RUN npm run build

# our app is running on port 8003 within the container, so need to expose it
EXPOSE 8003

# the command that starts our app
CMD [ "http-server", "dist", "--port","8003" ]

# if you have a nodejs project, is not needed http-server,
# you can comment the line above and uncomment the next one
# CMD ["npm", "run", "start:prod"]
```

## Docker-compose file


```docker
version: '3.3'

services:
  app:
    build:
      context: .
      dockerfile: app.Dockerfile
      args:
      - SSH_KEY=${SSH_KEY}
      - DATE_STAMP=${DATE_STAMP}
    container_name: app
    restart: always
    depends_on:
      - postgres
    ports:
      - "8003:8003"
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
```
