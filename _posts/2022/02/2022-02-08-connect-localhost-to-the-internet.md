---
title: Connect localhost to the internet
summary: How to connect your localhost to the internet using a third party tool for development
categories: webservice
tags: localhost port
date: 2022-02-08 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/03/15/16/11/background-3228704_1280.jpg
layout: post
---

Discover multiple ways of connecting your webservice localhost to the internet. Just drop an eye here: simple, clean, fast solutions only.

## 1. <a href="http://localtunnel.me/" target="_blank">Localtunnel</a>

Localtunnel allows you to easily share a web service on your local development machine without messing with DNS and firewall settings.

### How to run localtunnel

```sh
npm install -g localtunnel
lt --port 8000
```

## 2. <a href="http://localhost.run/" target="_blank">Localhost.run</a>

Connect a tunnel to your web appplication

### How to run localhost.run

```sh
$ ssh -R 80:localhost:8000 nokey@localhost.run
```

## 3. <a href="https://ngrok.com/" target="_blank">Ngrok</a>

Public URLs for exposing your local webservice.

### How to run ngrok

Go and [download](https://ngrok.com/download) ngrok then:

```sh
ngrok http 8000
```


