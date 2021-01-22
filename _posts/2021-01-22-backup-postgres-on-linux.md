---
layout: post
title: How to back-up Postgres database on Linux using cronjob
summary: Learn how to backup Postgres database on Linux, using cronjobs. Very simple and very straight forward guide step by step using only scripts.
categories: devops
tags:
- devops
- linux
- postgres
- cronjob
date: 2021-01-22 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2015/09/09/17/55/usb-932180_960_720.jpg
---


Learn how to backup Postgres database on Linux, using cronjobs. Very simple and very straight forward guide step by step using only scripts.

1. Make new .pgpass file in the root folder

```
$ vi .pgpass
```

And paste the content from `/root/.pgpass`

1. Create new file `/root/pg_backup.sh` and paste the content
2. Change permissions

```
$ chmod 700 /root/pg_backup.sh
```

1. Add new cron

```
$ crontab -e
```

Add at the end of the file the content:

```
0 0 * * * /root/pg_backup.sh
```

## .pgpass

```
localhost:5432:DATABASE:USER:PASSWORD
```

## pg\_backup.sh

```
#!/bin/bash
# This script will backup the postgresql database
# and store it in a specified directory

# Constants

USER="user_name_of_db"
DATABASE="name"
HOST="localhost"
BACKUP_DIRECTORY="/root/backup_db"

# Date stamp (formated YYYYMMDD)
# just used in file name
CURRENT_DATE=$(date "+%Y%m%d")
 
# Database named (command line argument) use pg_dump for targed backup
pg_dump -U $USER $DATABASE -h $HOST | gzip - > $BACKUP_DIRECTORY/$DATABASE\_$CURRENT_DATE.sql.gz

# Cleanup old backups

find $BACKUP_DIRECTORY/* -mtime +7 -exec rm {} \;
```