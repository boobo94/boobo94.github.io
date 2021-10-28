---
title: Unserialize php in Javascript Nodejs
summary: Unserialize is an opinionated function from PHP. Here you'll learn how to handle this in Nodejs.
categories: tutorials
tags: nodejs js
date: 2021-10-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/11/16/09/32/matrix-2953869_1280.jpg
layout: post
---

[Unserialize()](https://www.php.net/manual/en/function.unserialize.php) is an opinionated function from PHP. The bad part is that beeing opinionated to PHP, when you need to go out from this environment, you can encounter some problems.

In the example below I used [php-unserialize](https://www.npmjs.com/package/php-unserialize) NPM Library. 

```js
import PhpUnserialize from 'php-unserialize';

const serialized = 'a:0:{}'
const jsObject = PhpUnserialize.unserialize(serialized);
console.log(jsObject) // {}
```

## What happens if your serialized string contains special characters ? 

Yeah, it fails!

In order to solve that we can use [encoding](https://www.npmjs.com/package/encoding) NPM library.

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

## How to handle array deserialization

Using php-unserialize library has some drawbacks

> Notes
>
> Note that array() will be converted to {} and not []. That can be discussed as array() in PHP has various significations. A choice had to be done, but it may change in the future (cf. next point).
>
> A less obvious conversion is array('a', 'b') which will be converted to {"0": "a", "1": "b"}. Quite annoying, and it will be fixed if necessary (this means I won't work on this issue unless you really need it, but I agree this is not normal behavior).


Having this context you cannot handle array functions, instead manipulate the objects:

```js
const objectArray = {
  1: {foo: "bar1"},
  2: {foo: "bar2"},
}

Object.keys(objectArray).forEach((key) => {
  console.log(objectArray[key].foo)
});

// Output
// bar1
// bar2
```