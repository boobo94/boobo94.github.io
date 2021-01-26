---
layout: post
title: How to setup LEMP server for Wordpress
categories: devops
summary: "In this tutorial, you’ll learn how to install and secure a LEMP server on Ubuntu or Debian. I used the following software versions, but most versions will be okay to use: Ubuntu 18.04 LTS, Nginx 1.14.0, MariaDB 15.1, PHP 7.2"
tags:
- devops
- ubuntu
- LEMP
- wordpress
- mariadb
- php
date: 2021-01-26 09:09:09 +0000
---

!Note: The article is taken over <https://tonyteaches.tech/wordpress-on-nginx-server/>

While it may sounds complicated, it’s actually quite simple to install WordPress on a LEMP server. For those who aren’t familiar, a LEMP server is simply an acronym describing the web software stack: Linux, Nginx, MySQL (or MariaDB), and PHP.

In this tutorial, you’ll learn how to install and secure a LEMP server on Ubuntu or Debian. I used the following software versions, but most versions will be okay to use:

- Ubuntu 18.04 LTS
- Nginx 1.14.0
- MariaDB 15.1
- PHP 7.2

Note: I’ll be using example.com as the domain name for this tutorial. You’ll want to have a domain name and set the DNS A record to the IP address of your server.

1. Update Your System

First things first. Login to your server via ssh and update your system.

```sh
sudo apt update && sudo apt upgrade
```

2. Install the Web Server

Use apt to install the Nginx web server.

```sh
sudo apt install nginx
```

3. Install and Secure Your Database

Install MariaDB, a popular fork of MySQL.

```sh
sudo apt install mariadb-server php-mysql
```

Next, we want to secure our database installation. After executing the following command, answer Y for each security configuration option.

```sh
sudo mysql_secure_installation
```

4. Install PHP

Install PHP FPM (FastCGI Process Manager) to interpret PHP requests.

```sh
sudo apt install php-fpm
```

Another security consideration is to tell PHP to only execute files that exist on your server. This prevents injections of potentially malicious code from being executed.

To do this, open `/etc/php/7.2/fpm/php.ini`

```sh
and set fix_pathinfo=0
```

5. Install WordPress

Next let’s download and install the latest version of WordPress from the official website.

```sh
cd /var/www
mkdir example.com
cd example.com
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
rm latest.tar.gz
cd wordpress
```

6. Setup the WordPress Database

Create a database for WordPress to use as well as a user with appropriate privileges. Access the MySQL command line by typing mysql
.

```sh
create database example_db default character set utf8 collate utf8_unicode_ci;
create user 'example_user'@'localhost' identified by 'example_pw';
grant all privileges on example_db.* TO 'example_user'@'localhost';
flush privileges;
```

7. Connect WordPress to the Database

Now let’s tell WordPress about our new database instance. First, make a copy of the WordPress sample configuration file.

```sh
cp wp-config-sample.php wp-config.php
```

Open `wp-config.php` with a text editor and make the following changes according to the values you provided to the database.

```sh
define( 'DB_NAME', 'example_db' );
define( 'DB_USER', 'example_user' ); 
define( 'DB_PASSWORD', 'example_pw' );
```

Finally, copy the values from here https://api.wordpress.org/secret-key/1.1/salt and replace the values in your `wp-config.php` file below the Authentication Unique Keys and Salts section.

8. Configure Nginx to Serve Your WordPress Website

Most of the configuration files for Nginx are located in `/etc/nginx`. Go here and let’s first remove the default Nginx configuration file.

```sh
cd /etc/nginx
rm sites-enabled/default
```

Next, make a configuration file for your WordPress website at `sites-available/example.conf` with the following content adjusted accordingly for your website.

```sh
upstream example-php-handler {
        server unix:/var/run/php/php7.2-fpm.sock;
}
server {
        listen 80;
        server_name example.com www.example.com;
        root /var/www/example.com/wordpress;
        index index.php;
        location / {
                try_files $uri $uri/ /index.php?$args;
        }
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
                fastcgi_pass example-php-handler;
        }
}
```

Publish your website by making a symlink from your `sites-available/example.conf` file to the sites-enabled directory.

```sh
sudo ln -s /etc/nginx/sites-available/example.conf /etc/nginx/sites-enabled/
```

Finally, test your Nginx configuration changes and restart the web server.

```sh
nginx -t
systemctl restart nginx
```

9. Setup WordPress

Navigate to your URL or domain name (in this case example.com) and you’ll see the famous five-minute WordPress installation process. In reality, it take about a minute to fill out this form.

Give your website a title, username, and secure password.