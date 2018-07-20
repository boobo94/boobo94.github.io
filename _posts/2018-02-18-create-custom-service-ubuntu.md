---
layout: post
title: Create systemd service (Ubuntu 15+)
date:       2018-02-18 12:31:19
summary:    Create systemd service (Ubuntu 15+)
categories: tutorials
---


## Setup

* Create a file: 
    ```sh
        $ sudo vi /etc/systemd/system/CUSTOM_SERVICE_NAME.service 
    ```

* With the following content

```sh
[Unit]
Description=CUSTOM_SERVICE_NAME

[Service]
ExecStart=/opt/www/EXEC_FILE
WorkingDirectory=/opt/www
Restart=always

[Install]
WantedBy=multi-user.target
```

* Enable the service to be started automatically on boot

    ```sh
        $ sudo systemctl enable CUSTOM_SERVICE_NAME.service
    ```

* Check status/start/stop/restart

    ```sh
        $ sudo systemctl {status|start|stop|restart} CUSTOM_SERVICE_NAME
    ```

<a href="https://gist.github.com/boobo94/ad6ed51c07024f17201eb234fb0c91f5" target="_blank"><i class="fab fa-github"></i> Gist on GitHub here</a>
  