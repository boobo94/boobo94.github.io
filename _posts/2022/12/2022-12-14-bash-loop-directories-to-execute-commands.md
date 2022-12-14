---
title: Loop over directories in bash and execute commands
summary: How to loop over directories in bash and execute multiple commands
categories: devops
tags: bash linux
date: 2022-12-14 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2022/10/10/18/00/cosmetics-7512332_1280.jpg
layout: post
---

How to loop over directories in bash and execute multiple commands

In the following example I'll show you how to loop over a folder `/home/ec2-user/www/` and execute `pm2 start` command:

```sh
#!/bin/bash
for i in /home/ec2-user/www/* ; do
  if [ -d "$i" ]; then
    echo "$i"
    cd $i;
    pm2 start ecosystem.config.js;
  fi
done
```

Image by <a href="https://pixabay.com/users/ccxpistiavos-4540068/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2445540">CCXpistiavos</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2445540">Pixabay</a>