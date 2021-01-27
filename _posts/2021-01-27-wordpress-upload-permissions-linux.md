---
layout: post
title: Unable to create directory wp-content/uploads/ hosted on Linux with Nginx/Apache
categories: devops
summary: This may indicate a permissions problem with your WordPress uploads directory.
tags:
- devops
- ubuntu
- nginx
- linux
- apache
- wordpress
date: 2021-01-27 09:09:09 +0000
---

This may indicate a permissions problem with your WordPress uploads directory.

Firstly please make sure that you have the right permissions on /uploads folder.

```sh
$ sudo chmod -R 755 uploads/
```

Then if still nothing happens, please check the owner permissions.

```sh
$ ls -l
total 24
-rw-r--r--  1 root     root       28 Jan 26 13:44 index.php
drwxr-xr-x 16 root     root     4096 Jan 26 14:50 plugins
drwxr-xr-x  7 root     root     4096 Jan 26 13:44 themes
drwxr-xr-x  2 root     root     4096 Jan 26 13:44 upgrade
drwxr-xr-x 11 root     root     4096 Jan 26 13:44 uploads
```

Let's offer the right permissions. As we can see the uploads folder has the `root` owner. The owner of Nginx/Apache servers is `www-data`


```sh
$ sudo chown -R www-data:www-data ./uploads/
```

Now if you check again, the owner is changed and the permissions 755 are set.

```sh
$ ls -l
total 24
-rw-r--r--  1 root     root       28 Jan 26 13:44 index.php
drwxr-xr-x 16 root     root     4096 Jan 26 14:50 plugins
drwxr-xr-x  7 root     root     4096 Jan 26 13:44 themes
drwxr-xr-x  2 root     root     4096 Jan 26 13:44 upgrade
drwxr-xr-x 11 www-data www-data 4096 Jan 26 13:44 uploads
```

That's it!
