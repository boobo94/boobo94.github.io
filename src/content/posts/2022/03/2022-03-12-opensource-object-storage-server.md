---
title: Opensource Object Storage with Minio
summary: Opensource Object Storage with Minio using Docker. An alternative to AWS S3, Linode Storage, Google Storage, Azure Storage.
categories: resources
tags: object storage s3 docker
date: 2022-03-12 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2014/09/11/22/00/dock-441989_1280.jpg
layout: post
---

Discover an opensource Object Storage as alternative to AWS S3, Linode Storage, Google Storage, Azure Storage, but for free. You can handle your own servers and be in charge with all your storage. Don't worry is very simple to start the server with Docker, follow my example.

## What is min.io

MinIO offers high-performance, S3 compatible object storage.
Native to Kubernetes, MinIO is the only object storage suite available on every public cloud, every Kubernetes distribution, the private cloud and the edge. MinIO is software-defined and is 100% open source under GNU AGPL v3.

Found more about [MinIo](https://min.io/)

## How to setup min.io using docker


```conf
version: "3"
services:
  minio:
    image: quay.io/minio/minio:RELEASE.2022-02-18T01-50-10Z
    command: server /data  --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      MINIO_ROOT_USER: minio
      MINIO_ROOT_PASSWORD: minio123
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    volumes:
      - minio-1:/data1
      - minio-2:/data2
    networks:
      - my-network

networks:
  my-network:
    driver: bridge

volumes:
  minio-1:
  minio-2:
```

Run docker

```sh
docker-compose up
```

And let's use the Object Storage server by URL:  http://127.0.0.1:9000.

## Configure Nginx with Minio

```conf
server {
    listen       9000;
    listen  [::]:9000;
    server_name  localhost;

    # To allow special characters in headers
    ignore_invalid_headers off;
    # Allow any size file to be uploaded.
    # Set to a value such as 1000m; to restrict file size to a specific value
    client_max_body_size 0;
    # To disable buffering
    proxy_buffering off;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 300;
        # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        chunked_transfer_encoding off;

        proxy_pass http://minio:9000/;
    }
}

server {
    listen       9001;
    listen  [::]:9001;
    server_name  localhost;

    # To allow special characters in headers
    ignore_invalid_headers off;
    # Allow any size file to be uploaded.
    # Set to a value such as 1000m; to restrict file size to a specific value
    client_max_body_size 0;
    # To disable buffering
    proxy_buffering off;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-NginX-Proxy true;

        # This is necessary to pass the correct IP to be hashed
        real_ip_header X-Real-IP;

        proxy_connect_timeout 300;

        # To support websocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        chunked_transfer_encoding off;

        proxy_pass http://minio:9001/;
    }
}
```