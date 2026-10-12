---
title: How to auto-restart Mongodb in Linux AMI or Ubuntu
summary: How to auto-restart Mongodb in Linux AMI or Ubuntu in case of crash whenever mongod daemon gets killed, it will get respawned by systemctl.
categories: devops
tags: linux mongodb
date: 2022-02-24 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2019/06/27/19/34/boy-4302994_1280.jpg
layout: post
---

How to auto-restart Mongodb in Linux AMI or Ubuntu in case of crash whenever mongod daemon gets killed, it will get respawned by systemctl.

1. Edit your mongod service: 

```sh
sudo vi /lib/systemd/system/mongod.service
```

2. Add under service

```conf
Restart=always
```

3. Reload systemctl daemon

```sh
sudo systemctl daemon-reload
```

Now whenever mongod daemon gets killed, it will get respawned by systemctl.

## Autostart mongod process on reboot 

After you install MongoDB run on terminal:

```sh
systemctl enable mongod.service
```

This will make your MongoDB service daemon auto-start on reboot of the server.
