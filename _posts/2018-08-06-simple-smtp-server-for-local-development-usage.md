---
layout: post
title: "Simple SMTP server for local development usage"
date:       2018-08-06 22:09:00
summary: Discover how to set up Gmail smtp server or a simple mail server for local development. 
categories: tools
---

Today I needed a local smtp server and I tried to connect firstly with my gmail account, but that's not a good idea, because maybe you don't want to commit your credentials and share them with your team. 

## Use Gmail SMTP Settings

If you want to use gmail server, with your credentials, here are the credentials:

```
Host: smtp.gmail.com
Username: Your Gmail address (e.g. example@gmail.com)
Password: Your Gmail password
Port (TLS): 587
Port (SSL): 465
TLS/SSL required: true
```

## Use Local Server

### About MailCatcher

I installed MailCatcher and I discover that it's very easy to install it and to use it. MailCatcher runs a simple SMTP server, catch all the messages send to it and display them into a web interface.

### How to use it

`$ gem install mailcatcher`

`$ mailcatcher`

Go to http://127.0.0.1:1080/
Send mail through smtp://127.0.0.1:1025
Use mailcatcher --help to see the command line options. The brave can get the source from the GitHub repository.

[Github Repository can be found here](https://github.com/sj26/mailcatcher)

