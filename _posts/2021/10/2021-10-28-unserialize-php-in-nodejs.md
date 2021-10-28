---
title: Unserialize php in Javascript Nodejs
summary: Unserialize php in Javascript Nodejs
categories: tutorials
tags: nodejs js
date: 2021-10-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/11/16/09/32/matrix-2953869_1280.jpg
layout: post
---

```js
import PhpUnserialize from 'php-unserialize';

const serialized = 'a:0:{}'
const jsObject = PhpUnserialize.unserialize(serialized);
console.log(jsObject) // {}
```

What happens if your serialized string contains special characters ? yeah, it fails!

In order to solve that we can use

```js
import encoding from 'encoding';

export function convertToUtf8Win1252(str) {
  return encoding.convert(str, 'WINDOWS-1252').toString();
}
```

So mixing both functions:

```js
export function unserializePhp(str) {
  return PhpUnserialize
    .unserialize(convertToUtf8Win1252(str));
}
```