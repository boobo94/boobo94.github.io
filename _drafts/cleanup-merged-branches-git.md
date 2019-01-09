---
layout: post
categories: tutorials
summary: Cleanup merged branches
keywords: ''
tags: []
redirect_from: []
cover: ''
date: 2019-01-09 11:12:21 +0000

---


vi .bash_profile 

```bash  
alias clean-branch='echo Cleaning merged branches && git branch --merged | egrep -v "(^\\*|master|dev)" | xargs git branch -d'

```

vi .bash_profile 