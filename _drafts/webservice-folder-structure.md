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

In any web service that you write, must have at least an authorization method implemented like: 

* [OAuth](https://en.wikipedia.org/wiki/OAuth) — Open Authentication
* Basic Authentication
* Token Authentication ( I prefer this one with JWT —[ JSON Web Token](https://jwt.io))
* OpenID

Personally I use [JWT](https://jwt.io) because I write web services for our clients ([ATNM](https://www.airtouchmedia.com)), in the most of cases for mobile apps or [CMS](https://en.wikipedia.org/wiki/Content_management_system). If you'd like to read more about [Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API), Mozilla has a great article and very well explained.

##### What is JWT ?

> JSON Web Tokens are an open, industry standard [**RFC 7519**](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties.

##### Why you should use JWT ?

> * **Authorization**: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.
> * **Information Exchange**: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

So you have to verify the signature, to encode or decode the body or to compose the JWT body, so for this kind of processes I created that file _jwt.helper.go_, to keep a consistency and to find all the code related to JWT in a single place under the package _auth_.

Let's discuss about the other file, from _auth_ package, _principal.middleware.go_, the file has this name because is the first middleware in the interaction with any API, so all the requests are coming throw it. In this file I write a function which serve as a blocker for any requests and if the rules are not passed, a **401 status code** will be send as response. Now, if you're asking which are those rules, we already talked about JWT, so attached to any request (except endpoints like login, register, which doesn't need authorization) the client must send a [HTTP header](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields), **Authorization** which must contain the token provided. 

As a sum up, if the client app doesn't send a token or the token is corrupted or invalid, the web web service will invalidate the request.

##### Where to get that token from ?

Probably this is a question that you think of while read the previous paragraph, so let's make this clear. I mentions that on login or register (and yes, probably other routes as well doesn't required authentication) you don't need to send a token, because here is the place ( request ) where the token will be get. So you fill in your credentials and if them are right, you'll get a token in the response, on login, to be send all the time when a request impose that.

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