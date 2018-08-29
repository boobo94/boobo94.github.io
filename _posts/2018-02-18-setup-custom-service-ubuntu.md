---
layout: post
title: Create systemd service - daemon (Ubuntu 15+)
date:       2018-02-18 12:31:19
summary:    Create systemd service - daemon (Ubuntu 15+)
categories: webservice
redirect_from: /tutorials/2018/02/18/create-custom-service-ubuntu/
---

## Setup

Start by creating a file: `/etc/systemd/system/CUSTOM_SERVICE_NAME.service` with the following content:

```
[Unit]
Description=CUSTOM_SERVICE_DESCRIPTION

[Service]
ExecStart=/opt/www/EXEC_FILE
WorkingDirectory=/opt/www
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable the service. It will start automatically on boot, after that.

```bash
$ sudo systemctl enable CUSTOM_SERVICE_NAME.service
```
  
Check status/start/stop/restart

```bash
$ sudo systemctl {status|start|stop|restart} CUSTOM_SERVICE_NAME
```

A complete list with all available directives that can be used inside the service file can be found [here](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files)

### Legend

- CUSTOM_SERVICE_DESCRIPTION - a short description for the current service
- CUSTOM_SERVICE_NAME - the name of service
- EXEC_FILE - exec file name with the absolute path

Example 1 for a webservice written in Golang

You must have a new folder `api` in the root `/home/ubuntu/`. The `main` file it's the binary file resulted after go compilation. In my example I use flags to set environment `--env=dev`, this is not mandatory.

```
[Unit]
Description= Go API Webservice Example

[Service]
ExecStart=/home/ubuntu/api/main --env=dev
WorkingDirectory=/home/ubuntu/api
Restart=always

[Install]
WantedBy=multi-user.target
```

Example 2 for a javascript

You must have create a `web` folder into `/home/ubuntu/` root folder. The npm must be installed before and use the absolute path in `ExecStart` command, as you can see in the below example `/usr/bin/npm`.

```
[Unit]
Description=Javascript Web Application Example

[Service]
ExecStart=/usr/bin/npm run start
WorkingDirectory=/home/ubuntu/web/
Restart=always

[Install]
WantedBy=multi-user.target
```

## Usefull command

`$ service --status-all` - display all services

- [ + ] for running services
- [ - ] for stopped services
- [ ? ] for services without a 'status' command
    

  
