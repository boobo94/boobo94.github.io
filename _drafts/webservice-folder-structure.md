---
title: Webservice Folder Structure
layout: post
categories: webservice
date: 2018-09-26 19:07:54 +0000
summary: webservice folder structure
keywords: ''
tags: []
redirect_from: []

---
![](/images/webservice-folder-structure-golang.png)

Webservice folder structure it's the first phase before building every project, it's like you prepare to build a house and start by creating the architecture plan.

This article will presents you how I structure my projects when I need to create a simple web service in Golang. It's very important for you to keep a simple but intuitive architecture, because as you know, in golang you can call methods by reference the package name before.

In the following lines I'll present a simple, but traditional model architecture used by my in the most of the web services that I'm involved in

## /api

The api package is the folder where all the API endpoints are grouped by the purpose served, in other sub packages. That means, I prefer to have a special package with his main scope to solve a specific problem.

For example all the login, register, forgot password, reset password handlers, I prefer to be defined into a package, named for example **registration**.

The registration package can looks like below:

    .
    ├── api
    │   ├── auth
    │   │   ├── principal.middleware.go
    │   │   └── jwt.helper.go
    │   ├── registration
    │   │   ├── login.handler.go
    │   │   ├── social_login.handler.go
    │   │   ├── register.handler.go
    │   │   ├── social_register.handler.go
    │   │   ├── reset.handler.go
    │   │   ├── helper.go
    │   │   └── adapter.go
    ..........................

#### handler.go

As you can see, there is a suffix **handler.go**, in the name of the files. In these you can write effectively the code which will handle the request, where the data requested, will be retrieved from database, proccessed and in the end the response will be composed.

#### helper.go

Sometimes, before to send the response, you need to collect multiple data from multiple places, eventually to process them and after that, when all the infos are collected the response can be send to the client app. But the code, must be kept as simple as possible in the handler, so all that extra code which it's part from the process can be put here.

#### adapter.go

In the interaction between a client and a web service are send and received some data, but in the same time, probably there it's involved a third party API, another application or the database. Having this in mind, before to transfer some data from an application to another one, we need to convert the format, before to be accepted by the new app, so that converter function I write it here, in this _adapter.go_ file.

### /api/auth

about jwt

## /cmd

the place where I put main.go

## /config

usually I have this folder where I put a config.go file which unmarshal json files.

you can use multiple json files for you environments or a single one which will be used, but modified in any environment

## /db

I like to keep my database connection and interaction with the webservice totally disconnected by webservice.

* about db.go
* about service.go
* i preffer to use gorm talk about it

### /db/models

* what is a model

### /db/handlers

* this are queries .. but functions that will repeat all over the WS boilerplate code

## /gen

Sometimes we use tools like swagger which generate some code.. will be easier to keep all that code in a single place

## /locales

sometimes I need to have some translations for error messages or others .. depends by user's language preference

## /public

* email templates
* reset password form

## /utils

here is the place where to put all the "tools" that helps you

## /vendor

to keep all dependences together I use dep so where to place all those dependences if not in a folder like this