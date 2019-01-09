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
Yes you can automate this task, just run a simple command and get rid of this painful task. If you are a developer and you contribute and work with a lot of branches, after some time you face the problem of having a lot of dead branches on you local machine. If that is your case, follow the next steps.

What I suggest you to do it's to add an **alias** in your bash profile as the following:

1. Open bash profile
```bash
 $ vi .bash_profile
 ```
 
2. Add the alias
```bash  
alias clean-branch='echo Cleaning merged branches && git branch --merged | egrep -v "(^\\*|master|dev)" | xargs git branch -d'
```

3. Reset your bash to understand the new command or you can simply open a new terminal

```bash
source .bash_profile
```