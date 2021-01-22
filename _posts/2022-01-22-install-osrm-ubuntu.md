---
layout: post
title: How to install OSRM backend on Ubuntu Ubuntu 20.04.1 LTS
categories: devops
summary: How to install OSRM backend on Ubuntu Ubuntu 20.04.1 LTS
tags:
- devops
- osrm
- map
date: 2021-01-22 09:09:09 +0000
cover: http://project-osrm.org/images/osrm_logo.svg
---

What is [OSRM](http://project-osrm.org/)?

> The Open Source Routing Machine or OSRM is a C++ implementation of a high-performance routing engine for shortest paths in road networks. Licensed under the permissive 2-clause BSD license, OSRM is a free network service. OSRM supports Linux, FreeBSD, Windows, and Mac OS X platform.


Tutorial used from [Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-osrm-server-on-ubuntu-14-04) using [Geofabrik Map](http://download.geofabrik.de).

Before digging into, you can check [Initial Server Setup with Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04). I added 4GB swap memory using [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04).

Please note that the structure for your folders should be

- ROOT
    - osrm
        - map.osm.pbf
    - osrm-backend (this is the repo cloned. info how to build also [here](https://github.com/Project-OSRM/osrm-backend/wiki/Building-OSRM))

See below for required dependencies.

```sh
mkdir -p build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build .
sudo cmake --build . --target install
```

    
To extract the maps you should be in the root.

```sh
~$ osrm-extract osrm/map-latest.osm.pbf -p ./osrm-backend/profiles/car.lua
```

How to run osrm locally:

```
osrm-routed /home/osrm/osrm/map.osrm
```

## Setup Nginx

Point 9 is described [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-osrm-server-on-ubuntu-14-04#step-9-%E2%80%94-set-up-nginx), but to summary let’s dive in:

Install Nginx

```sh
sudo apt-get install nginx
```

Create a new configuration file in sites-available

```sh
sudo nano /etc/nginx/sites-available/osrm.conf
```

Now fill in the content:

```sh
upstream osrm {
    server 0.0.0.0:5000;
}

server {
    listen 80;
    server_name your_IP_or_DNS;

    location / {
        proxy_pass http://osrm/;
        proxy_set_header Host $http_host;
    }
}
```

Then we should activate this configuration, by creating a link to sites-enabled.

```sh
cd /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/osrm.conf
```

Don’t forget to test the configuration. It should pass the syntax check.

```sh
nginx -t
```

Reload the configuration of Nginx

```sh
sudo service nginx reload
```

and start the server

```sh
sudo service nginx start
```

### Open ports

Maybe seems stupid, but please be sure that your machine has inbound ports open for port 80 and/or 443.

## Execute OSRM backend as Linux Daemon

We need to create first the service file

```sh
sudo nano /etc/systemd/system/osrm.service
```

Then fill in the content

```sh
[Unit]
Description=Daemon for osrm backend

[Service]
ExecStart= /usr/local/bin/osrm-routed /home/osrm/osrm/map.osrm
WorkingDirectory=/home/osrm/osrm/
Restart=always
User=osrm

[Install]
WantedBy=multi-user.target
```

Please take into consideration the folder structure discuss previously. So as you can see we have a Service block where we specify the start command, but using absolute path osrm-routed /home/osrm/osrm/map.osrm. Then the working directory which in our case is ~/osrm.

Press CTRL+X and save.

Enable the service. It will start automatically on boot, after that.

```sh
$ sudo systemctl enable osrm.service
```

Check status/start/stop/restart

```sh
$ sudo systemctl {status|start|stop|restart} osrm
```

A complete list with all available directives that can be used inside the service file can be found [here](https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files)

Test the api

curl "http://your_IP_or_DNS/route/v1/driving/route/v1/driving/source_longitude,source_latitude;destination_longitude,destination_latitude?steps=true&alternatives=true&geometries=geojson"


Official documentation from OSRM API can be found [here](http://project-osrm.org/docs/v5.23.0/api/#)

