---
title: Archiver reading zip data as a buffer without writing to filesystem
summary: Zip data from buffer without writing to filesystem with the Node.js module archiver
categories: webservice
tags: nodejs zip
date: 2021-12-13 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/11/15/23/04/zip-2952852_1280.png
layout: post
---

Zip data from buffer without writing to filesystem with the Node.js module archiver. All the examples offered in the description of [Archiver NPM Module](https://www.npmjs.com/package/archiver) explains how to create a Zip writing to a file. But if you need to write to a stream and return that stream as a buffer, here is an example.

## Util function 

```js
import archiver from 'archiver'
import { Writable } from 'stream'

/**
 * @param {array<{data: Buffer, name: String}>} files
 * @returns {Promise<Buffer>}
 */
function zipFiles (files) {
  return new Promise((resolve, reject) => {
    const buffs = []

    const converter = new Writable()

    converter._write = (chunk, encoding, cb) => {
      buffs.push(chunk)
      process.nextTick(cb)
    }

    converter.on('finish', () => {
      resolve(Buffer.concat(buffs))
    })

    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    archive.on('error', err => {
      reject(err)
    })

    archive.pipe(converter)

    for (const file of files) {
      archive.append(file.data, { name: file.name })
    }

    archive.finalize()
  })
}
```

## Usage

```js
const files = [
    ...
    {
        data: Buffer.from('just a buf'),
        name: 'file.txt'
    },
    ...
]

const zipBuffer = zipFiles(files)
```