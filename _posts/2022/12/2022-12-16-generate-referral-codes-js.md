---
title: How to generate referral codes in javascript
summary: How to generate referral codes in javascript very fast with less code
categories: tips
tags: js referral
date: 2022-12-16 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2022/12/13/20/36/carousel-7654138_1280.jpg
layout: post
---

You have to generate referral codes and for sure you want a quick answer, right?

Here's my code which generate referral codes and save them in a txt file.

```js
const fs = require('fs');

const CODE_LENGTH = 6;
const TOTAL_CODES_GENERATED = 100;

function generateCode(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n)).toUpperCase();
  }
  return retVal;
}

for (let index = 0; index < TOTAL_CODES_GENERATED; index++) {
  const code = `${generateCode(CODE_LENGTH)}\n`;
  fs.appendFile('codes.txt', code, (err) => {
    if (err) throw err;
  });
}
```

The length of the code can be changed using `CODE_LENGTH`, and the numbers of code can be changed by `TOTAL_CODES_GENERATED`.

Save this in a js file, for example `generate-referral-codes.js`, and then execute the file 

```sh
node generate-referral-codes.js
```

In the same directory you'll have now a generated `codes.txt` file with all the codes.

That's it!

Image by <a href="https://pixabay.com/users/photim-27214801/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=7654138">Tim</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=7654138">Pixabay</a>