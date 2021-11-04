---
title: What VSCode extensions do I use
summary: A complete list with VSCode extensions that I use daily for my work environment. Check how to display yours and how to install extensions from command line.
categories: tips
tags: vscode settings
date: 2021-04-26 09:09:09 +0000
layout: post
---

## Display all extensions installed

```bash
$ code --list-extensions | xargs -L 1 echo code --install-extension
```

## List with my VSCode extensions

```
code --install-extension aeschli.vscode-css-formatter
code --install-extension bmewburn.vscode-intelephense-client
code --install-extension CoenraadS.bracket-pair-colorizer
code --install-extension dbaeumer.vscode-eslint
code --install-extension donjayamanne.githistory
code --install-extension eamodio.gitlens
code --install-extension EditorConfig.EditorConfig
code --install-extension golang.go
code --install-extension Gruntfuggly.todo-tree
code --install-extension johnpapa.vscode-peacock
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension octref.vetur
code --install-extension oderwat.indent-rainbow
code --install-extension redhat.vscode-yaml
code --install-extension softwaredotcom.swdc-vscode
code --install-extension vscode-icons-team.vscode-icons
code --install-extension wix.vscode-import-cost
code --install-extension zhuangtongfa.material-theme
```