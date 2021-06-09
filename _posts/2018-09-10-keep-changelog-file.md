---
title: 3 reasons to keep a changelog for your project [developer tips]
layout: post
categories: tips
date: 2018-09-10 19:09:38 +0000
summary: A changelog file it's just a history of changes made for a project. It's
  very useful to keep track of everything into a single place and to summarize some
  features than to look throw all the commits from git repository.
keywords: ''
tags:
- tips
- changelog
- projects
redirect_from: []

---
![changelog](https://keepachangelog.com/assets/images/logo-fe0986a5.png)

## Changelog file, what this means ?

Did you forgot what you implemented two months ago ? If the answer is no, probably you don't need lecithin. But I don't think that's the answer.

A changelog file it's just a history of changes made for a project. It's very useful to keep track of everything into a single place and to summarize some features than to look throw all the commits from git repository.

## Why to keep a Changelog ?

Personally the most important thing for me it's to keep track of all the changes that I made for a project, specially for webservices, because I need to know what resource I added, changed, removed or if I need fixed a bug or something it's deprecated.

The second reason it's about knowing which are the latest changes [deployed](/tips/5-questions-build-custom-alexa-skill//). Being involved into a big project with multiple developers, branches and features that must be deployed at some points can be hard, because you need to know what was deployed and probably when. I found it very useful to have a header with Unreleased changes.

The last reason that I think it's relevant here it's about versions and dates when the deploys were changed. Sometimes we need to know for a specific [version](/tools/mail-server-localhost/) which was the changes and when were deployed.

## How to do it ?

When I searched for this question I got the best answer for me [here](https://keepachangelog.com/en/1.0.0/). Keep a Changelog file it's an open-source project under [MIT License](https://choosealicense.com/licenses/mit/). Have a simple but powerful structure and [keep](/tools/bootable-windows-usb-from-mac/) tracking of everything I need.

### Most common types of changes

* `Added` for new features.
* `Changed` for changes in existing functionality.
* `Deprecated` for soon-to-be removed features.
* `Removed` for now removed features.
* `Fixed` for any bug fixes.
* `Security` in case of vulnerabilities.
* `Unreleased` for undeployed.