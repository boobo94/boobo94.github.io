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

The api package is the folder where all the API endpoints are grouped by the purpose served, in other sub packages. That means, I prefer to have a special package which have as main scope to solve a specific problem. 

For example all the login, register, forgot password, reset password handlers, I prefer to be defined into a package, named for example **registration**.

The registration package can looks like below:

    .
    ├── api
    │   ├── registration
    │   │   ├── login.handler.go
    │   │   ├── social_login.handler.go
    │   │   ├── register.handler.go
    │   │   ├── social_register.handler.go
    │   │   ├── reset.handler.go
    │   │   ├── helper.go
    │   │   └── adapter.go
    ..........................
    

### /api/auth

### /api/errors

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