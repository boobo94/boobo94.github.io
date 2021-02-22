---
title: How to add Swap space on Ubuntu
summary: Swap uses hard disk space memory (swap space) to store information from RAM and release some space from RAM.
categories: devops
tags: devops ubuntu swap
date: 2021-02-08 09:09:09 +0000
cover: https://www.linux-bibel-oesterreich.at/wp-content/uploads/2019/12/swap.png
layout: post
---

Create a file and preallocate size. In the following example we allocate 4GB

```sh
$ sudo fallocate -l 4G /swapfile
```

The prompt will return:

```sh
$ ls -lh /swapfile
-rw-r--r-- 1 root root 4.0G Feb  8 08:50 /swapfile
```

## Enable SWAP file

We need to enable it before to use it, but first let's make sure the permissions are right

```sh
$ sudo chmod 600 /swapfile
```

Check if the permissions were applied correctly:

```sh
$ ls -lh /swapfile
-rw------- 1 root root 4.0G Feb  8 08:50 /swapfile
```

So we have only read write only enabled for root.

Now that everything is correct we tell our OS to use this file as swap by typing:

```sh
$ sudo mkswap /swapfile

Setting up swapspace version 1, size = 4 GiB (4294963200 bytes)
no label, UUID=9457c9c4-96eb-4fd8-821e-dfdf202d7f45
```

All we have to do now is to **enable* it:

```sh
$ sudo swapon /swapfile
```

Verify if the procedure was correct:

```sh
$ sudo swapon -s
Filename				Type		Size	Used	Priority
/swapfile               file    	4194300	  0	        -2
```

## Make swap permanent

We have the swap activated, but after reboot it will be deactivated so we need to modify the `fstab` file

```sh
$ sudo nano /etc/fstab
```

At the end of the file add

```sh
/swapfile   none    swap    sw    0   0
```

Save and close the file when you are finished.