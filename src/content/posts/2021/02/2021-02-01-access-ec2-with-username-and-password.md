---
title: Access EC2 without pem file with with username and password
summary: Sometimes you need to grant permissions to someone else and maybe you don’t want to share the .pem file.
categories: devops
tags: security amazon ec2 ssh aws
date: 2021-02-01 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/06/23/19/16/woman-2435605_1280.jpg
layout: post
---

Sometimes you need to grant permissions to someone else and maybe you don’t want to share the .pem file. By default, the [ssh access](https://whyboobo.com/devops/generate-ssh-key/) is granted through a .pem file by [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).

1. You can create your own user and access the server using a password. In order to set up this, firstly first let’s login on the server as usual

```sh
$ ssh -i pem_file.pem ubuntu@ec2- ________.compute-1.amazonaws.com
```

2. Create a new user

```sh
$ sudo useradd -s /bin/bash -m -d /home/USERNAME -g root USERNAME
```

3. Add a password

```sh
$ sudo passwd USERNAME
```

4. Add users to sudoers

```sh
$ sudo visudo
```

Here you need to add the following line

```sh
USERNAME ALL=(ALL:ALL) ALL
```

5. Enable the access by password through ssh

```sh
$ vi /etc/ssh/sshd_config
```

Here you need to search _PasswordAuthentication_ from _no_ to _yes_.

6. Restart ssh

```sh
$ sudo /etc/init.d/ssh restart
```

7. Connect to the server using the new user

```sh
$ ssh USERNAME@ec2- ________.compute-1.amazonaws.com
```

This is all.

If you consider this tutorial was useful please let me a comment or share the article. For any suggestions or comments, please drop me a line below.