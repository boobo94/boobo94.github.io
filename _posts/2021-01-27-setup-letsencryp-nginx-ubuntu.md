---
layout: post
title: How to Setup Nginx with Let's Encrypt on Ubuntu 20.04
categories: devops
summary: This tutorial describes how to setup a free SSL certificate issued by Let's Encrypt on Ubuntu 20.04 LTS Server running Nginx.
tags:
- devops
- ubuntu
- nginx
- letsencrypt
- ssl
date: 2021-06-14 09:09:09 +0000
cover: https://cdn-images-1.medium.com/max/1600/1*Cd2NBjQD8Luwbu1Z23n5QQ.png
---

Prerequisites:

- Ubuntu 20.04 Server Installed with Nginx and Hosted Website

## Install Certbot on Ubuntu

> Certbot is an open-source tool that simplifies and automates the process of obtaining and renewing certificates from Let's Encrypt. We are going to install Certbot by using the Snap deployment system. Snap is pre-installed on Ubuntu 20.04.

### Update snapd

Run the following commands to update snapd.

```sh
$ sudo snap install core
$ sudo snap refresh core
```

### Install certbot snap

Note: If you have previously installed Certbot by using the standard apt command, then run the following command first to remove it. This will ensure that the Certbot snap works correctly.

```sh
$ sudo apt-get remove certbot

$ sudo snap install --classic certbot
certbot 1.11.0 from Certbot Project (certbot-eff✓) installed
```

### Enable certbot command

```sh
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Obtain your Certificate

When you run the command below, certbot will guide you through the process. Certbot also updates your NGINX configuration automatically to activate HTTPS.

```sh
$ sudo certbot --nginx
```

## Obtain a Certificate for a specific domain or subdomain

```sh
$ sudo certbot --nginx -d www.example.com
```

## Certificate Renewal Process

Certificates issued by Let's Encrypt are valid for 90 days. During installation, certbot creates a scheduled task to automatically renew your certificates before they expire. As long as you do not change your web server configuration, you would not have to run certbot again.

Run the following command to test the automatic renewal process.

```sh
$ sudo certbot renew --dry-run
```

!Note: Source post <https://linoxide.com/ubuntu-how-to/setup-nginx-with-lets-encrypt-on-ubuntu-20-04/>
