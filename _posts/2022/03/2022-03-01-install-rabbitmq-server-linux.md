---
title: How to install rabbitmq-server and erlang in Linux
summary: How to install rabbitmq-server and erlang in Amazon Linux 2, full tutorial to setup and manage rabbitmq channels and queues. 
categories: devops
tags: rabbitmq linux erlang
date: 2022-03-01 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/05/12/15/16/picnic-3393609_1280.jpg
layout: post
---

How to install rabbitmq-server and erlang in Amazon Linux 2, full tutorial to setup and manage rabbitmq channels and queues. 

## Update the system

```sh
sudo yum update -y
```

## Install Erlang

```sh
sudo yum install https://github.com/rabbitmq/erlang-rpm/releases/download/v23.3.4.11/erlang-23.3.4.11-1.el7.x86_64.rpm -y
```

## Install RabbitMQ

```sh
sudo yum install https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.9.13/rabbitmq-server-3.9.13-1.el7.noarch.rpm -y
```

## Start RabbitMQ Server

The server is not started as a daemon by default when the RabbitMQ server package is installed. To start the daemon by default when the system boots, as an administrator run

```sh
chkconfig rabbitmq-server on
```

then

```sh
sudo rabbitmq-server -detached
```

# After installation, restart service

```sh
sudo systemctl restart rabbitmq-server
```

## Managing the Service

To manage the service you can use the following functions:

sudo systemctl start rabbitmq-server
sudo systemctl restart rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl status rabbitmq-server
sudo systemctl stop rabbitmq-server

## Install the management plugin

By default, Rabbitmq is a client plugin that has not been installed, and it needs to be installed.

```sh
sudo rabbitmq-plugins enable rabbitmq_management
```

## User management

Description: Rabbitmq has a default account and password is: guest, by default, you can only access it under localhost this unit, so you need to add a remote login user.


### Add new users

```sh
sudo rabbitmqctl add_user admin admin
```

### Set user assignment operation permissions

```sh
sudo rabbitmqctl set_user_tags admin administrator
```

### Add resource permissions to users

```sh
sudo rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
```

### Change password

```sh
sudo rabbitmqctl change_password username newpassword
```

### Delete user

```sh
sudo rabbitmqctl delete_user username
```

### View All User List

```sh
sudo rabbitmqctl list_users
```

## Diagnostic rabbitmq

Checks if the local node is running and CLI tools can successfully authenticate with it

```sh
sudo rabbitmq-diagnostics ping
```

Prints enabled components (applications), TCP listeners, memory usage breakdown, alarms

```sh
sudo rabbitmq-diagnostics status
```

Prints cluster membership information

```sh
sudo rabbitmq-diagnostics cluster_status
```

Prints effective node configuration

```sh
sudo rabbitmq-diagnostics environment
```

## Cannot start after installation

Try:

```sh
sudo lsof -i :25672
sudo kill <PID>
sudo rabbitmq-server -detached
```

Where <PID> is [the process ID](https://stackoverflow.com/questions/63263177/cant-start-rabbitmq-server-after-installation/) that is occupying port 25672

## Uninstall Rabbitmq and Erlang

### Uninstall Erlang

```sh
yum list | grep erlang
yum -y remove erlang-*
rm -rf /usr/lib64/erlang
```

### Uninstall Rabbitmq

```sh
yum list | grep rabbitmq
yum -y remove rabbitmq-server.noarch

find / -name rabbit*
```



---

Other resources:

- <https://www.programmerall.com/article/30402247494/>
- <https://hackernoon.com/how-to-install-rabbitmq-on-the-aws-ec2-instance>
- <https://gist.github.com/misablaha/c74d9db48fcd57925e4a181c3615b3a2>
