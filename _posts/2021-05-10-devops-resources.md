---
title: Devops resources
summary: This article is a journal about the best resources that I've read about devops. I update constantly the list, so stay ahead and follow me.
categories: resources devops
tags: devops
date: 2021-05-10 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/03/10/09/49/city-3213676_1280.jpg
layout: post
---

## Cloud Infrastructure

### 1. <a href="https://www.freecodecamp.org/news/cost-optimization-in-aws/" target="_blank">How to Optimize your AWS Cloud Architecture Costs</a> - from freeCodeCamp

In this article, you'll discover highlights about what means optimizing your costs in AWS cloud architecture. Then I'll share how you can do it with respect to the AWS Well-Architected framework.

## Docker containers

### 1. <a href="https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose" target="_blank">How To Secure a Containerized Node.js Application with Nginx, Let's Encrypt, and Docker Compose</a>

In this tutorial, you will deploy a Node.js application with an Nginx reverse proxy using Docker Compose. You will obtain TLS/SSL certificates for the domain associated with your application and ensure that it receives a high-security rating from SSL Labs. Finally, you will set up a cron job to renew your certificates so that your domain remains secure.

### 2. <a href="https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/" target="_blank">What is Docker Used For? A Docker Container Tutorial for Beginners</a> from FreeCodeCamp

Docker is a container runtime. A lot of people think that Docker was the first of its kind, but this is not true – Linux containers have existed since the 1970s.

Docker is important to both the development community and container community because it made using containers so easy that everyone started doing it.

Docker packages an application and all its dependencies in a virtual container that can run on any Linux server. This is why we call them containers. Because they have all the necessary dependencies contained in a single piece of software.


## Web server configurations

### 1. <a href="https://blog.detectify.com/2020/11/10/common-nginx-misconfigurations/" target="_blank">Common Nginx misconfigurations that leave your web server open to attack</a>

Nginx is the web server powering one-third of all websites in the world. Detectify Crowdsource has detected some common Nginx misconfigurations that, if left unchecked, leave your web site vulnerable to attack. Here’s how to find some of the most common misconfigurations before an attacker exploits them.

### 2. <a href="https://www.freecodecamp.org/news/nginx-rate-limiting-in-a-nutshell-128fe9e0126c/" target="_blank">NGINX rate-limiting in a nutshell</a>

This post focuses on the ngx_http_limit_req_module, which provides you with the limit_req_zone and limit_req directives. It also provides the limit_req_status and limit_req_level. Together these allow you to control the HTTP response status code for rejected requests, and how these rejections are logged.


### 3. <a href="https://www.nginx.com/blog/rate-limiting-nginx" target="_blank">Rate Limiting with NGINX and NGINX Plus</a>

One of the most useful, but often misunderstood and misconfigured, features of NGINX is rate limiting. It allows you to limit the amount of HTTP requests a user can make in a given period of time. A request can be as simple as a GET request for the homepage of a website or a POST request on a log‑in form.

Rate limiting can be used for security purposes, for example to slow down brute‑force password‑guessing attacks. It can help protect against DDoS attacks by limiting the incoming request rate to a value typical for real users, and (with logging) identify the targeted URLs. More generally, it is used to protect upstream application servers from being overwhelmed by too many user requests at the same time.

In this blog we will cover the basics of rate limiting with NGINX as well as more advanced configurations. Rate limiting works the same way in NGINX Plus. 

### 4. <a href="https://theawesomegarage.com/blog/limit-bandwidth-and-requests-to-your-nginx-server-with-rate_limit-and-limit_req" target="_blank">Limit bandwidth and requests to your Nginx server with rate_limit and limit_req</a>

There are many reasons for wanting to limit traffic. For my own personal use, the three most important factors are:

    Limiting resource consumption (bandwidth, but also cpu and memory)
    Protecting login pages from brute forcing
    Learning how it works

Nginx allows for many strategies to limit traffic. I'll walk you through the way I've employed rate_limit and limit_req, starting with the latter.

### 5. <a href="https://www.freecodecamp.org/news/the-nginx-handbook/" target="_blank">The NGINX Handbook</a> from FreeCodeCamp

[NGINX](https://nginx.org/) is a high performance web server developed to facilitate the increasing needs of the modern web. It focuses on high performance, high concurrency, and low resource usage. Although it's mostly known as a web server, NGINX at its core is a reverse proxy server.

Image source: [Pixabay](https://cdn.pixabay.com/photo/2018/03/10/09/49/city-3213676_1280.jpg)