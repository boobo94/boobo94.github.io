---
title: Nginx configuration example for nodejs app
summary: Use this NGINX configuration example for nodejs app, running on port 8000. The server has an SSL from Certbot installed.
categories: devops
tags: nginx nodejs certbot ssl
date: 2021-04-13 09:09:09 +0000
cover: https://image.freepik.com/free-vector/cloud-hosting-concept-illustration_114360-730.jpg
layout: post
---

Here is a simple example of how you can setup an nginx file to run a nodejs app. The lines which have the coment `# managed by Certbot` in the end are added automatically by Certbot.
```conf
# save this file in /etc/nginx/conf.d/your_file.conf
limit_req_zone $binary_remote_addr zone=one:10m rate=50r/s;

map $request_method $limit {
    default         "";
    POST            $binary_remote_addr;
}
# Creates 10mb zone in memory for storing binary ips
# Use this zone to limit the login route only 1 request per minute
limit_req_zone $limit zone=login_zone:10m rate=1r/m;

server {
    server_name  YOUR_IP_OR_DNS;

    # Limit the payload size
    client_max_body_size 10M;

    location / {
        # proxi the public port (https - 443) to the local port of the app (in this case 8000, but use yours)
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host      $host;
        # forward the real ip
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header  X-Forwarded-For $remote_addr;
        proxy_set_header  X-Forwarded-Host $remote_addr;
        # use the limit zone created previously to limit at maximum 50 requests per second (line 2)
        limit_req zone=one burst=10 nodelay;
    }

    location /auth/login {
        # Creates 10mb zone in memory for storing binary ips
        limit_req zone=login_zone;
        proxy_pass http://127.0.0.1:8000;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_IP_OR_DNS/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_IP_OR_DNS/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = YOUR_IP_OR_DNS) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen       80;
    listen       [::]:80;
    server_name  YOUR_IP_OR_DNS;
    return 404; # managed by Certbot
}
```