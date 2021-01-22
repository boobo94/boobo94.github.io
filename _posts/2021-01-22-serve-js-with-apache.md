---
layout: post
title: How to serve a JavaScript build with Apache
summary: To serve a JavaScript build with Apache is a very simple task and today I want to present you a very simple way of achieving that.
categories: devops
date: 2021-01-22 09:09:09 +0000
tags:
- devops
- javascript
- apache
- linux
cover: https://cdn.pixabay.com/photo/2017/06/14/16/20/network-2402637_960_720.jpg
---

To serve a JavaScript build with Apache is a very simple task and today I want to present you a very simple way of achieving that.

```
<VirtualHost *:80>
        ServerName subdomain1.example.com
        ServerAlias subdomain2.example.com

        RewriteEngine on
        RewriteCond %{HTTPS} off
        RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName subdomain1.example.com
        ServerAlias subdomain2.example.com

        DocumentRoot /var/vhosts/www/client
        <Directory />
                DirectoryIndex index.html
                Options Indexes FollowSymLinks
                AllowOverride All
                Require all granted
        </Directory>

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
</VirtualHost>
</IfModule>
```

If you consider this helpful please give it a share. For any question or discussion please consider the comments section.

The post [How to serve a JavaScript build with Apache](https://boobo94.xyz/devops/serve-a-javascript-build-with-apache/) appeared first on [boobo94](https://boobo94.xyz).