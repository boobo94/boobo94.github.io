---
title: What VSCode extensions do I use
summary: A complete list with VSCode extensions that I use daily for my work environment. Check how to display yours and how to install extensions from command line.
categories: tips
tags: vscode settings
date: 2021-12-13 09:09:09 +0000
cover: https://code.visualstudio.com/assets/home/home-screenshot-mac-lg-2x.png
layout: post
---

## Display all extensions installed

```bash
$ code --list-extensions | xargs -L 1 echo code --install-extension
```

## List with my VSCode extensions


```sh
code --install-extension aeschli.vscode-css-formatter
code --install-extension bmewburn.vscode-intelephense-client
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
code --install-extension rangav.vscode-thunder-client
code --install-extension redhat.vscode-yaml
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension usernamehw.errorlens
code --install-extension vscode-icons-team.vscode-icons
code --install-extension wix.vscode-import-cost
code --install-extension zhuangtongfa.material-theme
```

### <a href="https://marketplace.visualstudio.com/items?itemName=aeschli.vscode-css-formatter" target="_blank">CSS formatter</a>

Install:

```sh
code --install-extension aeschli.vscode-css-formatter
```

### <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">ESLint</a>

Install:

```sh
code --install-extension dbaeumer.vscode-eslint
```

### <a href="https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client" target="_blank">Thunder Client for VS Code</a>

Thunder Client is Hand-crafted lightweight Rest Client for Testing APIs. <a href="https://github.com/rangav/thunder-client-support" target="_blank">The official documentation</a> explains all the features and limitations.

Install:

```sh
code --install-extension rangav.vscode-thunder-client
```
