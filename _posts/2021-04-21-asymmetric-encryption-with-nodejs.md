---
title: Asymmetric encryption (Public-key cryptography) with Node.js
summary: Summary Draft Template
categories: devops tutorials
tags: cryptography nodejs rsa
date: 2021-04-21 09:09:09 +0000
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Public_key_encryption.svg/500px-Public_key_encryption.svg.png
layout: post
---

## How asymmetric encryption works?

There are two sides in an encrypted communication: the sender, who encrypts the data, and the recipient, who decrypts it. As the name implies, asymmetric encryption or public-key cryptography is different on each side; the sender and the recipient use two different keys. 

A public key and Private keys are generated randomly using an algorithm, and the keys have a mathematical relationship with each other. The key should be longer in length (128 bits, 256 bits) to make it stronger and make it impossible to break the key even if the other paired key is known. 

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Public_key_encryption.svg/500px-Public_key_encryption.svg.png" alt="asymmetric encryption">

In an asymmetric key encryption scheme, anyone can encrypt messages using a public key, but only the holder of the paired private key can decrypt such a message. The security of the system depends on the secrecy of the private key, which must not become known to any other.

## Generating the public key and private key

I'll present two methods to generate the keys, depending on your needs, but for the next section, I'll present the first method, where the keys are stored in .pem files.

### 1. Using openssl

Generate private key

```sh
$ openssl rsa -pubout -in private_key.pem -out rsa_4096_pub.pem
```

Generate public key

```sh
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

### 2. Using Crypto built-in library of Nodej.js

```js
const crypto = require("crypto")

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// The standard secure default length for RSA keys is 2048 bits
	modulusLength: 2048,
})
```

## How to use it in Node

I created two helper functions:

```js
import fs from 'fs'
import crypto from 'crypto'

export function encryptText (plainText) {
  return crypto.publicEncrypt({
    key: fs.readFileSync('public_key.pem', 'utf8'),
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  // We convert the data string to a buffer
  Buffer.from(plainText)
  )
}

export function decryptText (encryptedText) {
  return crypto.privateDecrypt(
    {
      key: fs.readFileSync('private_key.pem', 'utf8'),
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encryptedText
  )
}
```

### Encrypt example

```js
const plainText = "simple text";

const encryptedText = encryptText(plainText)
// encryptedText will be returned as Buffer
// in order to see it in more readble form, convert it to base64
console.log('encrypted text: ', encryptedText.toString('base64'))
```

The output:

```sh
encrypted text:  V8ZwxwmjCosiiUGclRbGpwkTqEcwOw/fy6Sfg+xQnCZY51rr5e93XbcyDEBjrmTfkLKQ/y/fwskajrfattp7Pb5nXH+yqRi0jJ/mL0BrpAvwpY+5TMmGRubaWMEk6AbkrmOV+rNg8SSro1wZNc7dyVttXP6pjuBSBM4Mc9GCFCNPq28aClwVFmByQfR4gS+WfYHXpavBWi+obc4C+JrfG9L3PT1Th0XHi49xWQxrlQRwKahe7vbtBJIxG8H/VlUqlZcnABw0caIago1VGJbMo1XdE/OTpgIqozcP76wjEZNdeuBhVS3hU50gW/qx7gm/SlWwIaHjvsm8sMMI60TnDs9OAkSRXt3LXtTk7H+PjtTl2+5e46PYC6MXvFtJgqZOz5csilT/AXp/on2n0DdZT+nLwe5/8IK2LylRbIm7+ICGbGE97tn9v+LuGplPO953pVRPLgtFxxcCEFiCPGPxoYWm+TDfF3XstjdjiHFAkVeVPPd+1Vtu1WxDKKtXIu1ALY552jZQApGTBhTDrL2GbKRVgrSZdO7oTPiSBZcknL1IoRAK6sn3X/58JFkMsfPhtjlMFJ1AWNC1l+8wxzMbDrwkMuUN2lodw5rvy+IquxQPJPFkCHjv8gpReNyDU7iLR8IPwX09FY3CaGuUR3x+de5kUDRIuP19CTGV8M6jL0g=
```

### Decrypt example

```js
  const decryptedText = decryptText(encryptedText)
  console.log('decrypted text:', decryptedText.toString())
```

The output:

```sh
decrypted text: simple text
```

if you need to decrypt from base64 string:
```js
  const base64Encrypted = 'V8ZwxwmjCosiiUGclRbGpwkTqEcwOw/fy6Sfg+xQnCZY51rr5e93XbcyDEBjrmTfkLKQ/y/fwskajrfattp7Pb5nXH+yqRi0jJ/mL0BrpAvwpY+5TMmGRubaWMEk6AbkrmOV+rNg8SSro1wZNc7dyVttXP6pjuBSBM4Mc9GCFCNPq28aClwVFmByQfR4gS+WfYHXpavBWi+obc4C+JrfG9L3PT1Th0XHi49xWQxrlQRwKahe7vbtBJIxG8H/VlUqlZcnABw0caIago1VGJbMo1XdE/OTpgIqozcP76wjEZNdeuBhVS3hU50gW/qx7gm/SlWwIaHjvsm8sMMI60TnDs9OAkSRXt3LXtTk7H+PjtTl2+5e46PYC6MXvFtJgqZOz5csilT/AXp/on2n0DdZT+nLwe5/8IK2LylRbIm7+ICGbGE97tn9v+LuGplPO953pVRPLgtFxxcCEFiCPGPxoYWm+TDfF3XstjdjiHFAkVeVPPd+1Vtu1WxDKKtXIu1ALY552jZQApGTBhTDrL2GbKRVgrSZdO7oTPiSBZcknL1IoRAK6sn3X/58JFkMsfPhtjlMFJ1AWNC1l+8wxzMbDrwkMuUN2lodw5rvy+IquxQPJPFkCHjv8gpReNyDU7iLR8IPwX09FY3CaGuUR3x+de5kUDRIuP19CTGV8M6jL0g='

  const decryptedText = decryptText(Buffer.from(base64Encrypted, 'base64'))
  console.log('decrypted text', decryptedText.toString())
// decrypted text: simple text
```
