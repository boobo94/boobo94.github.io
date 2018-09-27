---
layout: post
title: How to setup an Apache Virtualhost as proxy
date: 2018-04-26 12:31:19 +0000
summary: How to setup an Apache Virtualhost as proxy
categories: tutorials
redirect_from: "/tutorials/2018/04/26/setup-virtualhosts-apache-as-proxy/"

---
If you want to use apache to set a virtualhost and to use it as proxy, to pass one or more localhosts to internet, all you have to do is to follow few simple rules described below:

1. create file /etc/apache2/sites-available/VIRTUALHOST_NAME.conf
2. _sudo a2ensite virtual_host_file_name_

* to disable an existing conf file _sudo a2dissite virtual_host_file_name_

1. move file in /etc/apache2/sites-enabled/VIRTUALHOST_NAME.conf
2. install ssl module _sudo a2enmod ssl_
3. _sudo service apache2 reload_

Other commands for apache:

* show all modules installed _apache2ctl -M_
* show logs _sudo systemctl status apache2.service_

References

* DESIRED_PORT: represent the port where your current local server is running (node/go/etc server)
* URL_ADDRESS: your DNS

```Bash
<VirtualHost *:80>
        #Redirect permanent / https://URL_ADDRESS
        #or
        ServerName URL_ADDRESS

        RewriteEngine on
        RewriteCond %{HTTPS} off
        RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>

<IfModule mod_ssl.c>
        <VirtualHost *:443>

                ServerAdmin EMAIL
                ServerName URL_ADDRESS

                ProxyPreserveHost On
                ProxyPass / http://127.0.0.1:DESIRED_PORT/
                ProxyPassReverse / http://127.0.0.1:DESIRED_PORT/

                SSLEngine on
                SSLCertificateFile /home/ubuntu/certificates/certificate.crt
                SSLCertificateKeyFile /home/ubuntu/certificates/certificate.key
                SSLCertificateChainFile /home/ubuntu/certificates/certificate.ca.crt

        </VirtualHost>
</IfModule>
```

This article can be found as well on <a href="https://gist.github.com/boobo94/90a4b5bd2b16261b8b5e8dfc91dad147" target="_blank">Gist</a>