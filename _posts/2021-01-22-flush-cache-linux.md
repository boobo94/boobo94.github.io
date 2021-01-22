---
layout: post
title: How to flush cache in Linux
summary: Flush cache in linux
categories: devops
date: 2020-07-16 01:09:00 UTC
tags: 
    - tutorials
    - cache
    - cronjob
    - linux
---

Hello guys,  
  
Me again with a very interesting problem. Today I was working on some tasks as usual and I discovered that something is wrong with one of our systems and the vehicles are not updated actively. Something went wrong with the MQTT connection and that’s how I arrived to write [How I found a simple UI Viewer for InfluxDB](https://boobo94.xyz/tips/ui-viewer-influxdb/(opens%20in%20a%20new%20tab)) article.

While I debugged the problem I observed that the server’s RAM memory is full, but guess what, the memory used was 489640 and free memory 359256 from a total of 4GB. That’s why I came with the great idea As you can see below, the buff/cache memory is above 3GB (3189056).

```
$ top

top - 13:42:55 up 168 days, 5:26, 1 user, load average: 0.00, 0.00, 0.00
Tasks: 109 total, 1 running, 67 sleeping, 0 stopped, 0 zombie
%Cpu(s): 0.3 us, 0.0 sy, 0.0 ni, 99.5 id, 0.0 wa, 0.0 hi, 0.0 si, 0.2 st
KiB Mem : 4037952 total, 359256 free, 489640 used, 3189056 buff/cache
KiB Swap: 0 total, 0 free, 0 used. 3268392 avail Mem 
```

## Check the cache memory

```
$ free -m

              total used free shared buff/cache available
Mem: 3943 503 365 1 3074 3167
Swap: 0 0 0
```

## Clear the cache memory

```
$ sync; echo 3 | sudo tee /proc/sys/vm/drop_caches
```

Now you can check again the cache, and surprise

```
$ free -m

              total used free shared buff/cache available
Mem: 3943 505 3123 1 314 3206
```

And this is how it looks now my result of top command

```
$ top

top - 13:46:19 up 168 days, 5:29, 1 user, load average: 0.00, 0.00, 0.00
Tasks: 110 total, 1 running, 67 sleeping, 0 stopped, 0 zombie
%Cpu(s): 0.0 us, 0.2 sy, 0.0 ni, 99.8 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
KiB Mem : 4037952 total, 3196540 free, 517812 used, 323600 buff/cache
KiB Swap: 0 total, 0 free, 0 used. 3282840 avail Mem 
```

## Automate this with a cronjob

I know that you’re lazy, so do I. Now let’s go back in business and create a Cronjob that automates this process for you.

```
$ crontab -e
```

A new text editor will open now, probably it’s VIM. All you have to do is to add at the end of file the following:

```
# m h dom mon dow command

0 2 * * * sync; echo 3 | sudo tee /proc/sys/vm/drop_caches
```

This cron will execute every day at 2am.

I hope you enjoyed this article, so if you consider this article great, hit the share button below and spread the word far away. If you have any mention, please tell me more in comments. Good suggestion will go directly in the article.

The post [How to flush cache in Linux](https://boobo94.xyz/tutorials/flush-cache-linux/) appeared first on [boobo94](https://boobo94.xyz).