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

/api

/cmd

/config

/db

/db/dbmodels

/db/handlers

/gen

/locales

/public

/utils

/vendor