---
title: Opensource Object Storage with min.io
summary: Opensource Object Storage with min.io using Docker. An alternative to AWS S3, Linode Storage, Google Storage, Azure Storage.
categories: resources
tags: tag1 tag2
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