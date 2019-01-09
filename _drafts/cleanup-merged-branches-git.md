---
layout: post
title: Cleanup merged branches from your repository [GIT]
categories: tutorials
summary: Cleanup merged branches and remove dead branches from your repository. You
  can see how to make a very simple bash script to achieve this.
keywords: ''
tags:
- git
- bash
redirect_from: []
cover: "/images/cleanup-merged-branches.png"
date: 2019-01-09 11:12:21 +0000

---
If you are a developer and you contribute and work with a lot of branches, after some time you face the problem of having a lot of [dead branches](https://stackoverflow.com/questions/27578521/git-remove-dead-branch-after-a-rebase) on you local machine. Yes, you can automate this task, just run a simple command and get rid of this painful job by simply remove the merged branches.

If that is your case, what I suggest you to do it's to add an **alias** in your [bash profile](https://www.quora.com/What-is-bash_profile-and-what-is-its-use) as the following:

1. Open bash profile

```bash
 $ vi .bash_profile
```

1. Add the alias inside vim, in my case I used `clean-branch`

```bash  
alias clean-branch='echo Cleaning merged branches && git branch --merged | egrep -v "(^\\*|master|dev)" | xargs git branch -d'
```

If you look at this command you can find an area having these specification: `master|dev`. All you need to do to escape a branch from beeing omited by this scrip is to add your branch name in this like for example I have a branch `my-branch`, the command will become `alias clean-branch='echo Cleaning merged branches && git branch --merged | egrep -v "(^\\*|master|dev|my-branch)" | xargs git branch -d'`

1. [Reset your bash](https://stackoverflow.com/questions/4608187/how-to-reload-bash-profile-from-the-command-line) to understand the new command or you can simply open a new terminal

```bash
$ source .bash_profile
```

So that's it. Now you can open a new terminal or type in the current one your alias command:

```bash
$ clean-branch
```

If you have questions please don't hesitate to leave me a comment.