---
layout: post
title:  Generate SSH key and add it to the ssh-agent
summary:  Generate SSH key and add it to the ssh-agent. Simple guide to handle ssh keys on your own computer and use the key with ssh-agent.
categories: devops
tags:
- devops
- architecture
- javascript
- programming
date: 2021-01-13 09:09:09 +0000
---

## Generate SSH key

1. Open your terminal
2. Run the following command `$ ssh-keygen -t rsa -b 4096 -C "keyword"`, where keyword can be an email or any word which identify this ssh key. After this command you can see in the console the output `> Generating public/private rsa key pair`.
3. In the next step you need to add the file path where to generate the ssh key `> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]`. I suggest to create a new file inside `/Users/you/.ssh/` path. Example `/Users/you/.ssh/your-file-name`. Please be advised that `your-file-name` doesn’t have any extension.
4. Setup a password. If you don’t want you can skip this by pressing ENTER.

```
> Enter passphrase (empty for no passphrase): [Type a passphrase]> Enter same passphrase again: [Type passphrase again]
```

## Add SSH key to ssh-agent

Until now you [generated](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) your SSH key. But this key is not active yet. You need to activate it, so execute the command:

```
$ ssh-add -K ~/.ssh/your-file-name
```

## Copy the public key

On your local computer run the following command and copy the output

```
$ cat ~/.ssh/your-file-name.pub
```

## Add the public key on remote server

Then go on your hosting server and open the file `~/.ssh/authorized_keys` with whatever tool you prefer, vim, nano or something else, append at the end of file what you copy previously and save the file.

You’re ready to go and use your new ssh key.