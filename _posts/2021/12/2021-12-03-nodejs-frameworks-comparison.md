---
title: Nodejs frameworks comparison for Web Apps in 2022
summary: Start looking for Nodejs frameworks comparison, which has a lot of built-in packages and with a big extensability and integrations.
categories: webservice
tags: nodejs javascript framework comparison
date: 2021-12-03 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2021/07/31/08/22/network-6511448_1280.jpg
layout: post
---

Searching a fast solution to create an MVP, I start looking into Nodejs frameworks comparison. I'm looking for a similar solution to Django (python), which has a lot of built-in packages and with a big extensability and integrations. I found a good article that compares the Nodejs frameworks <a href="https://www.simform.com/blog/best-nodejs-frameworks/" target="_blank">12 Best Nodejs Frameworks for Web Apps in 2022]</a>, but I was eager to see myself. Start looking...

What I found useful are described below:

## 1. <a href="https://www.totaljs.com/code/" target="_blank">total.js</a>

Looks very solid and easy to build with. But seems that architecture is chaotic at first.

## 2. <a href="https://docs.nestjs.com/" target="_blank">nestjs</a>

A complete framework with rebuild components for plug and play. Comes with built-in features like ORM, request validation, caching, Queues, Loggers, compression. Has an authentication system implemented based on <a href="http://www.passportjs.org/" target="_blank">Passport</a> that permits social login, or with JWT. Besides, it has an authorization system that allows role definitions very simple. It has built-in integration with Graphql, WebSockets. The best part is the microservice architecture support for multiple transport layers. It supports OpenPI and generates a Swagger file. 

But what I think is really cool about Nest is that has CRUD generators, just type a command it creates a complete CRUD (ex: `nest g resource`).

Searching for an admin panel for Nest I found <a href="https://nestjs-admin.com/" target="_blank">NestJs Admin</a>, but the project looks dead, not maintained. Yeah, I searched for more info about this admin, has in mind the same architecture as Django.
Previously I mentioned Adminbro, they have <a href="https://adminbro.com/module-@admin-bro_nestjs.html" target="_blank">integration with Nestjs</a>, but custom components are written in React.

I found a medium article where is described how to integrate Nestjs with <a href="https://bayu-asrori.medium.com/fullstack-nestjs-with-adminlte-3-part-1-how-to-implement-template-5f931a2db24" target="_blank">adminlte3</a>, looks good and pretty simple. Need to look more into this.

## 3. <a href="https://github.com/simov/express-admin" target="_blank">express admin</a>

Looks promising.

## 4. <a href="https://adminbro.com/" target="_blank">adminbro</a>

Is very simple and has a lot of built-in components. Works great with ExpressJs.

## 5. <a href="https://adonisjs.com/" target="_blank">adonisjs</a>

A complete framework with rebuild components for plug and play. I like it and have a very well-structured example [here](https://adonisjs.com/adonisjs-at-a-glance). Has a router, request validation, auth, <a href="https://docs.adonisjs.com/guides/auth/social" target="_blank">social auth</a>, ORM, migrations, <a href="https://docs.adonisjs.com/guides/authorization" target="_blank">permission policy</a>, internalization, logger, and server-side rendering engine. They created a repository for <a href="https://github.com/adonisjs-community/awesome-adonisjs" target="_blank">official packages</a> supported for the biggest integration: Redis, JWT, Swagger, etc. They documented an example for <a href="https://docs.adonisjs.com/cookbooks/testing-adonisjs-apps" target="_blank">tests</a> with Adonisjs. Another integration that I found is with Vuejs, using server-side rendering, <a href="https://github.com/Atinux/vue-adonis" target="_blank">boilerplate example</a>.

## 6. <a href="https://foalts.org/" target="_blank">foalts</a>

## 7. <a href="https://redwoodjs.com/" target="_blank">redwoodjs</a>