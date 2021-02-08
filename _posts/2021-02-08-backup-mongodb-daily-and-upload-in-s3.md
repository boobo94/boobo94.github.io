---
title: Dump MongoDB daily and upload the backup on AWS S3 in Ubuntu with AWS CLI
summary: Step by step guide about how you can backup daily MongoDB using AWS CLI on Ubuntu OS
categories: devops
tags: mongodb ubuntu servers awscli s3
date: 2021-02-08 09:09:09 +0000
cover: https://universo-digital.net/wp-content/uploads/2016/10/mongodb-backupsl.jpg
layout: post
---

## Install AWS CLI on Ubuntu

```sh
$ sudo apt-get update
$ sudo apt-get install awscli
```

## AWS Credentials

To configure AWS Credentials

```sh
$ aws configure
```

Then you can check `~/.aws/credentials` and `~/.aws/config` to see the content.

Credentials file

```sh
$ cat ~/.aws/credentials

[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

Config file

```sh
$ cat ~/.aws/config

[default]
output = json
region = eu-central-1
```

# Backup files

First, we need to create a folder and within add two files

Got to the root

```sh
$ cd
```

Create a new folders `bin` and `logs`

```sh
$ mkdir bin logs
```

Add a new file to backup the database to S3

```sh
$ vi bin/db-backups.sh
```

And add the content

```sh
backup_name=~/db_backups-`date +%Y-%m-%d-%H%M`
mongodump --host localhost --port 27017 --authenticationDatabase admin -u ADMIN_USER -p YOUR_PASSWORD --out $backup_name
tar czf $backup_name.tar.gz $backup_name
aws s3 cp $backup_name.tar.gz s3://YOUR_PATH_HERE
rm -rf $backup_name
rm $backup_name.tar.gz
```

The second file needs to upload the logs to S3

```sh
$ vi bin/log-backup.sh 
```

Add the content

```sh
root_folder=/home/ubuntu
backup_name=~/log_backups-`date +%Y-%m-%d-%H%M`
tar czf $backup_name.tar.gz $root_folder/logs
aws s3 cp $backup_name.tar.gz s3://YOUR_PATH_HERE
for f in $root_folder/logs/*.log; do :> $f; done
rm $backup_name.tar.gz
```

The last step add the following script in crontab

```sh
$ crontab -e
```

At the end of the file add 

```sh
0 0 * * * /bin/bash ~/bin/db-backups.sh >> ~/logs/db_backups.log 2>&1
0 0 * * * /bin/bash ~/bin/log-backup.sh >> ~/logs/log_backup.log 2>&1
```