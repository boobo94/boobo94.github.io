---
layout: post
title: this.$__path is not a function mongoose error
categories: tips
summary: Fix mongoose error this.$__path is not a function. If you face the same issue I suggest you to update to the lastest version. 
tags:
- mongoose
- nodejs
- mongodb
date: 2021-01-11 09:09:09 +0000

---

Currently I faced a strange error with mongoose "this.$__path is not a function", described [here](https://github.com/pinojs/pino-pretty/issues/109). If you face the same issue I suggest you to [update mongoose](https://www.npmjs.com/package/mongoose) to the lastest version. 

Run 

```sh
$ npm update mongoose
```

Personally I encountered problems with version "^5.8.11" and works with "^5.11.11".