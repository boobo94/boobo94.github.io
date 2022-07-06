---
title: Linux disk space alerts on Discord
summary: Linux disk space alerts. Check your space and be responsible with your project. Take care of your space and don't crack the project.
categories: tools
tags: linux discord
date: 2022-07-05 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2016/02/14/20/03/open-hard-drive-1200075_1280.jpg
layout: post
---

Linux disk space alerts. Check your space and be responsible with your project. Take care of your space and don't crack the project.

This is a very simple and handy tutorial about how to check the disk space every day and send the alert using Discord. 

Prerequisite:

- discord webhook

## Create the script

Create new file **check-disk.sh**:

```sh
#!/bin/bash

# This variable holds the usage disk space in percents
CURRENT=$(df / | grep / | awk '{ print $5}' | sed 's/%//g')

# The threshold where the alert will be sent. By default is 90, so when your server disk usage cross this border, the alerts will come on your discord.
THRESHOLD=90

# The url of the webhook. You can copy this value from Discord.
DISCORD_WEBHOOK_URL=<Your webhook url here without tags>

# The name of the project. You can put whatever you want here.
PROJECT_NAME="<project name without tags>"
# The url of the project.
PROJECT_URL=<project url without tags>

if [ "$CURRENT" -gt "$THRESHOLD" ] ; then

curl --location --request POST "$DISCORD_WEBHOOK_URL" \
--form "content=\":floppy_disk: The disk space for $PROJECT_NAME - $PROJECT_URL is critical.
Used: $CURRENT%. 
Please clean up some space.\" " \
--form 'username="Disk Space Alert"'

fi
```

# Make the script executable

Be sure that you have permissions to at least 755 set.

```sh
sudo chmod +x /home/ubuntu/check-disk.sh
```

!!! Use your full path the the file

# Automate the script

```sh
crontab -e
```

and at the end of the file enter

```sh
0 6 * * * /bin/bash /home/ubuntu/check_disk.sh
```

!!! Use your full path the the file
