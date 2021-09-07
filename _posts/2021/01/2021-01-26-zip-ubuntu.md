---
layout: post
title: How to zip or unzip files in Ubuntu
categories: devops
summary: Zip or unzip files in Ubuntu, simple steps that you can reproduce instantly
tags:
- devops
- ubuntu
- zip
date: 2021-01-26 09:09:09 +0000
cover: https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Iomega_ZIP.svg/1920px-Iomega_ZIP.svg.png
---

First step, make sure that you have zip installed on your machine:

```sh
sudo apt-get install unzip
```

If you want to extract to a particular destination folder, you can use:

```sh
unzip file.zip -d destination_folder
```

If the source and destination directories are the same, you can simply do:

```sh
unzip file.zip
```