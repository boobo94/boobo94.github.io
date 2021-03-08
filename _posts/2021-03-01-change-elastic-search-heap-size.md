---
title: Change Heap Size for Elastic Search
summary: There are two ways to change the heap size in Elasticsearch. The easiest is to set an environment variable called ES_HEAP_SIZE.
categories: devops
tags: elasticsearch devops
date: 2021-03-01 09:09:09 +0000
cover: https://images.contentstack.io/v3/assets/bltefdd0b53724fa2ce/blt280217a63b82a734/5bbdaacf63ed239936a7dd56/elastic-logo.svg
layout: post
---

> The default installation of Elasticsearch is configured with a 1 GB heap. For just about every deployment, this number is usually too small. If you are using the default heap values, your cluster is probably configured incorrectly.

> There are two ways to change the heap size in Elasticsearch. The easiest is to set an environment variable called ES_HEAP_SIZE. When the server process starts, it will read this environment variable and set the heap accordingly. As an example, you can set it via the command line as follows:

```sh
export ES_HEAP_SIZE=10g
```

Alternatively, you can pass in the heap size via JVM flags when starting the process, if that is easier for your setup:

```sh
ES_JAVA_OPTS="-Xms10g -Xmx10g" ./bin/elasticsearch 
```

Ensure that the min (Xms) and max (Xmx) sizes are the same to prevent the heap from resizing at runtime, a very costly process.

```sh
sudo vi /etc/elasticsearch/jvm.options
```

Generally, setting the ES_HEAP_SIZE environment variable is preferred over setting explicit -Xmx and -Xms values.

Source: <https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html>
See also [Setting JVM options](There are two ways to change the heap size in Elasticsearch. The easiest is to set an environment variable called ES_HEAP_SIZE.)
