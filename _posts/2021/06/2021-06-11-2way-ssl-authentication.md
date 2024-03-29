---
title: Setup 2way ssl authentication (mutual authentication) with Nginx
summary: This article presents you a simple way of configuring 2 way ssl or mutual authentication between two servers with Nginx.
categories: devops
tags: webservice nginx devops
date: 2021-06-16 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/10/30/18/44/hacking-2903156_1280.jpg
layout: post
redirect_from:
  - /webservice/2way-ssl-authentication/
---

## Pre-Requisites

Make sure that you have **openssl**

```sh
openssl version -a
```

To setup 2-way ssl (mutual authentication) you need:

- Certificate Authority (CA)
- Server 1 Certificate
- Server 2 Certificate

## Certificate Authority (CA)

What is [certificate authority](https://en.wikipedia.org/wiki/Certificate_authority)?

> In cryptography, a certificate authority or certification authority (CA) is an entity that issues digital certificates. A digital certificate certifies the ownership of a public key by the named subject of the certificate. This allows others (relying parties) to rely upon signatures or on assertions made about the private key that corresponds to the certified public key.

Having this mentioned, we need an authority which validates our certificates. Here are two options, to grant yourself the authority and self-sign certificates or use a trusted authority. In the following lines I'll describe the process of signing the certificate

### Using self-signed certificates

Now we should generate a new Certificate Authority self signed, run the following:

```sh
$ openssl req -new -x509 -days 9999 -keyout ca-key.pem -out ca-crt.pem
```

Note!! You can remove `-days 9999` to make the certificate to don't expire.

Then the terminal prompts the following:

```sh
Generating a 2048 bit RSA private key
................................................+++
....................................................+++
writing new private key to 'ca-key.pem'
Enter PEM pass phrase: YOUR_CA_PASSWORD
Verifying - Enter PEM pass phrase: YOUR_CA_PASSWORD
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:RO
State or Province Name (full name) []:Romania
Locality Name (eg, city) [Default City]:Bucharest
Organization Name (eg, company) [Default Company Ltd]:Cmevo Digital SRL
Organizational Unit Name (eg, section) []:devops
Common Name (eg, your name or your server's hostname) []:cmevo.com
Email Address []:contact@cmevo.com
```

Now you can check the files generated

```sh
$ ls -l

ca-crt.pem
ca-key.pem
```

### Using trusted signed certificates

To use a trusted signed certificate, simply search on internet, if you prefer privacy I recommend [Duckduckgo](https://duckduckgo.com/) & [Firefox](https://www.mozilla.org/en-US/firefox/new/).

Doesn't matter which provider you choose, to get the public certificate you need to provide a private key, generated on your server.

## Server 1 Certificate

### Generate the key for server

```sh
$ openssl genrsa -out server1-key.pem 4096


Generating RSA private key, 4096 bit long modulus
.......................................................................................++
...........................................................++
e is 65537 (0x10001)
```

### Generate a Server Certificate Signing Request

```sh
$ openssl req -new -key server1-key.pem -out server1-csr.pem


You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:RO
State or Province Name (full name) []:Bucharest
Locality Name (eg, city) [Default City]:^C
[ec2-user@api custom_cert]$ openssl req -new -key server1-key.pem -out server1-csr.pem
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:RO
State or Province Name (full name) []:Romania
Locality Name (eg, city) [Default City]:Bucharest
Organization Name (eg, company) [Default Company Ltd]:Cmevo Digital SRL
Organizational Unit Name (eg, section) []:devops
Common Name (eg, your name or your server's hostname) []:server1-api.cmevo.com
Email Address []:contact@cmevo.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:SERVER1_PASSWORD
An optional company name []:
```

### Sign the certificate with previously generated CA certificate

```sh
$ openssl x509 -req -days 9999 -in server1-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server1-crt.pem


Signature ok
subject=/C=RO/ST=Romania/L=Bucharest/O=Cmevo Digital SRL/OU=devops/CN=server1-api.cmevo.com/emailAddress=contact@cmevo.com
Getting CA Private Key
Enter pass phrase for ca-key.pem:YOUR_CA_PASSWORD
```

Look at our files:

```sh
$ ls
ca-crt.pem  ca-crt.srl  ca-key.pem  server1-crt.pem  server1-csr.pem  server1-key.pem
```

Oookk guys, let's check our certificate

```sh
$ openssl verify -CAfile ca-crt.pem server1-crt.pem
server1-crt.pem: OK
```

## Server 2 Certificate

We do the same thing on the second server.

### Generate the private key for server 2

```sh
$ openssl genrsa -out server2-key.pem 4096



Generating RSA private key, 4096 bit long modulus
.......................................................................................++
..............................................++
e is 65537 (0x10001)
```

### Generate Certificate Signing Request

```sh
$ openssl req -new -key server2-key.pem -out server2-csr.pem



You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [XX]:RO
State or Province Name (full name) []:Romania
Locality Name (eg, city) [Default City]:Bucharest
Organization Name (eg, company) [Default Company Ltd]:Cmevo Digital SRL
Organizational Unit Name (eg, section) []:devops
Common Name (eg, your name or your server's hostname) []:server2-api.cmevo.com
Email Address []:contact@cmevo.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:SERVER2_PASSWORD
An optional company name []:
```

### Sign the certificate with previously generated CA certificate

```sh
$ openssl x509 -req -days 9999 -in server2-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server2-crt.pem



Signature ok
subject=/C=RO/ST=Romania/L=Bucharest/O=Cmevo Digital SRL/OU=devops/CN=server2-api.cmevo.com/emailAddress=contact@cmevo.com
Getting CA Private Key
Enter pass phrase for ca-key.pem:YOUR_CA_PASSWORD
```

Check our certificate

```sh
$ openssl verify -CAfile ca-crt.pem server2-crt.pem



server2-crt.pem: OK
```

## Nginx configuration

Oh, we're almost there boys. Let's configure finally the nginx.

We need to create the certificate bundle. But if you buy one, you'll receive this file.

```sh
cat server1-crt.pem ca-crt.pem server1-key.pem > ssl-bundle.pem
```

Except that we need to create another file **client.certs.pem**. So this file will contains all the clients which connects secure to our serve.

```sh
cat server2-crt.pem ca-crt.pem > client.certs.pem
```

Note, if your CA is not self-signed is not required to append the ca-crt.pem file, you only need to append the certificate file.

In this example we have only two servers, but if you have for example another server "Server 3", you can replicate the above process and append **server3-crt.pem** to this **client.certs.pem** file.

The nginx conf example:

```conf
server {
    server_name  server1-api.cmevo.com;
    listen 443 ssl;

    ssl_certificate /etc/ssl/private-api/ssl-bundle.pem;
    ssl_certificate_key /etc/ssl/private-api/server1-key.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers   on;

    ssl_verify_client on;
    ssl_client_certificate /etc/ssl/private-api/client.certs.pem;
    ssl_verify_depth 2;

    client_max_body_size 100M;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host      $host;
        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header  X-Forwarded-For $remote_addr;
        proxy_set_header  X-Forwarded-Host $remote_addr;
    }
}
```

## How works mutual authentication?

Let's make an example request from server 2 to server 1

```curl
curl --location --request POST 'https://server1-api.cmevo.com' \
--header 'Content-Type: application/json' \
--cert server2-crt.pem --key server2-key.pem
```

For an extra layer of security, you can add as well a payload encryption, check <a href="https://whyboobo.com/devops/tutorials/asymmetric-encryption-with-nodejs/">Asymmetric encryption (Public-key cryptography) with Node.js</a>

I have two resources that I used for myself at some point and I want to share with you

1. <a href="https://www.matteomattei.com/client-and-server-ssl-mutual-authentication-with-nodejs/" target="_blank">Client and server SSL mutual authentication with NodeJs</a>

Additional

## How to convert pkcs7 cert to pem

```sh
openssl pkcs7 -in certificate_file.p7b -print_certs -out cert.pem
```
