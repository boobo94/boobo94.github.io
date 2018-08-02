---
layout: post
title: "How to setup a Postgres Server on Ubuntu"
date:       2018-08-02 22:28:19
summary: How to setup a Postgres Server on Ubuntu, create an user, access it remotely
categories: tutorials ubuntu database
---

# Useful commands

Show all databases `\l+`

Show all roles `\du+`

Show all tables `\dt`

## Installing on Linux

`$ sudo apt-get update`

`$ sudo apt-get install postgresql postgresql-contrib`

Switch over to the postgres account on your server by typing:

`$ sudo -i -u postgres`

You can now access a Postgres prompt immediately by typing:

`$ psql`, exit with `\q`

## Creating user

`$ sudo -u postgres createuser <username>`

## Creating Database

`$ sudo -u postgres createdb <dbname>`

## Giving the user a password

`$ sudo -u postgres psql`

`psql=# alter user <username> with encrypted password '<password>';`

## Granting privileges on database

`psql=# grant all privileges on database <dbname> to <username> ;`

## Access remotely

1. `$ sudo su - postgres`
2. `postgres:$ vi /etc/postgresql/9.5/main/postgresql.conf`
Search after **listen_addresses** and uncomment that line or add this `listen_addresses = '*'`
3. `postgres:$ vi /etc/postgresql/9.5/main/pg_hba.conf`
Append at the end of the file these:

```bash 
host    all     all     0.0.0.0/0       md5
host    all     all     ::/0            md5
```
4. Restart postgres `$ sudo service postgresql restart`

PS: Make sure that you have postgres version 9.5 `$ psql --version` . If the file it's empty try to use autocomplete `vi /etc/postgresql/` and then press tab for version autocomplete.
