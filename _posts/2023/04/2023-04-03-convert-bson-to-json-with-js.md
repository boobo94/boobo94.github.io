---
title: Convert bson file to json with javascript
summary: How to convert bson file to json with javascript with a simple script file
categories: tutorials
tags: js json bson
date: 2023-04-03 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg
layout: post
---

How to convert bson file to json with javascript with a simple script file. Followup this simple proces

Save the following file into `index.js`

```js
const fs = require('fs')
const BSON = require('bson')

function BSON2JSON (from) {
  const buffer = fs.readFileSync(from)
  let index = 0
  const documents = []
  while (buffer.length > index) {
    index = BSON.deserializeStream(buffer, index, 1, documents, documents.length)
  }

  return documents
}

const bsonFilePath = 'file.bson'
const bson2json = BSON2JSON(bsonFilePath)
console.log('🚀 ~ file: bson2json:', bson2json)
```

If you want tot export the bson to a json file add at the end of the file this line of code:

```js
fs.writeFileSync('file.json', JSON.stringify(bson2json))
```

