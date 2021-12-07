---
title: Update nginx version on AMI Linux
summary: Let's update the nginx version on AMI Linux in few steps. I'll show you how to do it, crash the server and fix it back. 
categories: devops
tags: nginx ami linux update
date: 2021-12-07 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2013/11/15/13/57/road-210913_1280.jpg
layout: post
---

Today I decided to show you how to update nginx version on AMI Linux


## Check current version

```sh
$ nginx -v
nginx version: nginx/1.16.1
```

## Update nginx

```sh
$ sudo yum update nginx
```

Then I said oo good that is all, let's restart nginx and see if it works:


```sh
$ sudo service nginx restart
```

What is the result for me: 

```
$ sudo service nginx status
Redirecting to /bin/systemctl status nginx.service
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: failed (Result: exit-code) since Tue 2021-12-07 12:17:05 UTC; 4s ago
  Process: 23112 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=1/FAILURE)
  Process: 23110 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 3121 (code=killed, signal=KILL)
   CGroup: /system.slice/nginx.service
           ├─9155 nginx: worker process is shutting down
           └─9156 nginx: worker process is shutting down

Dec 07 12:17:04 systemd[1]: Unit nginx.service entered failed state.
Dec 07 12:17:04 systemd[1]: nginx.service failed.
Dec 07 12:17:04 systemd[1]: Starting The nginx HTTP and reverse proxy server...
Dec 07 12:17:05 nginx[23112]: nginx: [emerg] module "/usr/lib64/nginx/modules/ngx_http_image_filter_module.so" version 1016001 instead of 1020001 in ...lter.conf:1
Dec 07 12:17:05 nginx[23112]: nginx: configuration file /etc/nginx/nginx.conf test failed
Dec 07 12:17:05 systemd[1]: nginx.service: control process exited, code=exited status=1
Dec 07 12:17:05 systemd[1]: Failed to start The nginx HTTP and reverse proxy server.
Dec 07 12:17:05 systemd[1]: Unit nginx.service entered failed state.
Dec 07 12:17:05 systemd[1]: nginx.service failed.
```

And I said ooou this is great :D, let's fix it:

```sh
sudo yum remove nginx-mod*
sudo yum install nginx-module-*
```

Now let's try again to restart the nginx

```sh
$ sudo service nginx restart
```

And here is the result, this time all good:

```sh
$ sudo service nginx status
Redirecting to /bin/systemctl status nginx.service
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: active (running) since Tue 2021-12-07 12:22:01 UTC; 5min ago
  Process: 23409 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 23407 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 23405 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 23411 (nginx)
   CGroup: /system.slice/nginx.service
           ├─ 9155 nginx: worker process is shutting down
           ├─ 9156 nginx: worker process is shutting down
           ├─23411 nginx: master process /usr/sbin/nginx
           ├─23412 nginx: worker process
           └─23413 nginx: worker process

Dec 07 12:22:01  systemd[1]: Starting The nginx HTTP and reverse proxy server...
Dec 07 12:22:01  nginx[23407]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
Dec 07 12:22:01  nginx[23407]: nginx: configuration file /etc/nginx/nginx.conf test is successful
Dec 07 12:22:01  systemd[1]: Started The nginx HTTP and reverse proxy server.
```

Let's check the current version of nginx:

```sh
$ nginx -v
nginx version: nginx/1.20.1
```

Soo all is good! Have a nice day, fellow!

<hr>

Are you interested by this subject because I've written some article on Nginx topic here:

1. [Setup 2way ssl authentication (mutual authentication) with Nginx](https://boobo94.github.io/webservice/2way-ssl-authentication/)
2. [How to Setup Nginx with Let's Encrypt on Ubuntu 20.04](https://boobo94.github.io/devops/setup-letsencryp-nginx-ubuntu/)
3. [https://boobo94.github.io/devops/nginx-configuration-for-node/](https://boobo94.github.io/devops/nginx-configuration-for-node/)
4. [How to setup LEMP stack for Wordpress](https://boobo94.github.io/devops/setup-lemp-stack-for-wordpress/)
5. [Install Nginx on Linux with ssl certificate](https://boobo94.github.io/devops/install-nginx-linux-with-ssl/)