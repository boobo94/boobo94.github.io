---
title: Get your Jenkins Passwords from secrets
summary: How to get your Jenkins passwords from your secrets credentials. Follow this simple tutoriale and find your password or ssh private key.
categories: category
tags: jenkins password credentials secrets ssh private key
date: 2022-09-14 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/05/11/12/59/phishing-3390518_1280.jpg
layout: post
---

Demo

Check SEO meta: https://metadescriptiontool.com/

First of all, if you have access to your Jenkins server the credentials are stored at:

```sh
vi /var/lib/jenkins/credentials.xml
```

In order tot get your credentials go to http://YOUR_IP:8080/script and copy and paste the content below the hit RUN.

```
com.cloudbees.plugins.credentials.SystemCredentialsProvider.getInstance().getCredentials().forEach{
  it.properties.each { prop, val ->
    if (prop == "secretBytes") {
      println(prop + "=>\n" + new String(com.cloudbees.plugins.credentials.SecretBytes.fromString("${val}").getPlainData()) + "\n")
    } else {
      println(prop + ' = "' + val + '"')
    }
  }
  println("-----------------------")
}
```

Source: <https://devops.stackexchange.com/questions/2191/how-to-decrypt-jenkins-passwords-from-credentials-xml/8692#8692?newreg=9197ac19da1b457fb643798bcfa94e05>