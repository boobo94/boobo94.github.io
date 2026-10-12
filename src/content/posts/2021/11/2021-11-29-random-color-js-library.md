---
title: Generate random hex colors in JS with a library
summary: How to generate random hex colors in Javascript? I've created a very simple library to solve this problem
categories: resources
tags: library js
date: 2021-11-29 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/03/24/08/56/colorful-3256055_1280.jpg
layout: post
---

How to generate random hex colors in Javascript? I've created a very simple library to solve this problem.

Why? Because is simple, reusability of code. Code reusability gives you the ability to reuse code multiple times so you can develop applications faster and with more consistency. I needed this functionality two times for 2 different projects in a single month and I decided to create something simple and import it into both projects. Then I said, wait, but why don't make it public.

And here we are, talking about this library <a href="https://github.com/boobo94/random-color" target="_blank">boobo94/random-color</a>

## Install

```sh
npm i github:boobo94/random-color
```

## Usage

```js
import RandomColor from 'random-color'

const newColor =  RandomColor.getColor();
console.log(newColor) // #44ad3c
```

## License

The MIT License. [Check it here](https://github.com/boobo94/random-color/blob/main/LICENSE)


Do you have a question about this project please open an <a href="https://github.com/boobo94/random-color/issues" target="_blank">issue on Github</a> or write me on <a href="https://twitter.com/militaru_bogdan" target="_blank">Twitter</a>
