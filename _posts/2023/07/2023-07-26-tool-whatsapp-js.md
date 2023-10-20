---
title: "Discover the Power of Whatsapp-web.js for Safe and Easy Automation"
summary: "Automate WhatsApp with ease using Whatsapp-web.js, a NodeJS client library that connects through the official WhatsApp Web app, reducing ban risks. Perfect for user or business accounts."
categories: tools
tags: js tools
date: 2023-07-28 09:09:09 +0000
cover: https://wwebjs.dev/logo.png
layout: post
---

Automate WhatsApp with ease using Whatsapp-web.js, a NodeJS client library that connects through the official WhatsApp Web app, reducing ban risks. Perfect for user or business accounts.

A WhatsApp client library for NodeJS that connects through the WhatsApp Web browser app whatsapp-web.js - <https://wwebjs.dev>, with the [Github repository](https://github.com/pedroslopez/whatsapp-web.js)

## How to setup the project

```sh
yarn init
yarn add whatsapp-web.js qrcode-terminal
```

then should look like:

```json
{
  "name": "whatsapp-sender",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "qrcode-terminal": "^0.12.0",
    "whatsapp-web.js": "^1.22.1"
  }
}

```

Create an `index.js` file and add the code:

```js
import { Client } from "whatsapp-web.js";
import qrcode  from 'qrcode-terminal';
import sendMessages from "./src/sendMessages.js";

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {    
    // Save the session object however you prefer.
    // Convert it to json, save it to a file, store it in a database...
    console.log('Authenticated')
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();
```

## Test it how it works

Start the codep project

```sh
yarn start
```

and you should see something like:

```sh
% yarn start
yarn run v1.22.19
$ node index.js
QR RECEIVED 2@+z3db4ckMTxcHkZDwWQ1Giql/nHg+J3orBdcPjik+Da8grWvNU80rx+MmZa2ow==,lZReDwpuYK+nakVa8B9/i1WhslxxbG3a2Nm+InE=,MwSE0qcS/nJ3k1yAU=,Xu2utPNJlPKbGEbvAyrvXI+igWG7QBZnNmcEnU=,1
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▄  ▀ █▄███ █▄▀ ▄▄▀▄█▄▄█▀▀▀▄▀ ██▄▄ ▀██ ▄▄▄▄▄ █
█ █   █ █▀█▄█▄ ▄▄█ ▀▄ ▄█▄▄▄█▀ ▄  ▄ ▀▀▀▀▄██▀▀▄▀█ █   █ █
█ █▄▄▄█ █▀ ▄█ ▀ ███▀ ███▄ ▄▄▄    █▄▀██▄█  █ ███ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀▄▀ █ ▀▄▀▄█▄█ █ █▄█ ▀ ▀ █ ▀▄█▄█▄█▄█ █▄▄▄▄▄▄▄█
█ ▄▄  █▄▄ ▄ ▀▄▄▄▄▀▄ ▀▄▄▀▀▄  ▄  ▀▀██▄█▄▄██▀▀ ▄▄▄█ █▄█▄▀█
█▄ ▄▄▀ ▄▀█▀█▀ █▄▄ ▄▀▀      █▀▀▄▀▀▀▀▄██  ██▀▄  ▄█▀▄▀▄ ▀█
█▀▀▄█▄ ▄█▄▀▄▄█ ▀▀▄▄ ▀▄██ ▀█▄ ▀▀ ▄▀█▄ ▄ ▄█▀▄▀▀██▄  ██▄ █
█▄ ▄█▀▀▄ █▄█▀ ▀█▀▀  ▀ █▀█▀ █ ██ █▀ ▄▄▀██▄ ▄█▀ ▀▀▄█ ▄▄██
██▄▀█  ▄▄█ █▀▀█▄▀█▀ █ ▀█▀██▀█▄▀▄▀▄  ▀█▄ ▀▄█▀█▀▄▀ ▄ ▄▀▀█
█▄▀ █▄ ▄▀█▀ ▄▀ ▀▀▄  ▀██▀▀  ▀ █▀ ▄████▄ ██▀ ▀█▄██  ▀█ ██
█▀▀▄▄█ ▄ █▄█▄█▄  ▄ ▀▄▀ ▀█▀▀█▄█ ▄▄  ██ ██▀▀  ▄ ▀▀ ▄▀█▀▀█
█▄▀▀ ▀█▄█ ▀▄▄▄▄▄▄▀█▄ ▄▄▀ █▀▀ ▄▀▀ ██▄▄▄ ██▀  ▀▄ █▄▀█ ▄▀█
█▄ ▀▄▄▄▄▄█   ▄█ ▄ ▄▄█▄█▀▀█▄▀▀▄▄ █ ▀█ ██ █▀█ ▀ █▀   █▄▀█
████▄██▄▄  ▄▄ ▄▄▄█▄▄ ██▀▄ ▄▄▄ ▀ ▀███ ▄ ▄▄█  █ ▄▄▄ █▄  █
█ ▄▄▄▄▄ █▄██████ ▀▄▀ ███▀ █▄█ ▀ ▄ ▀███▀ ▄▄▄▄█ █▄█  ▄▀██
█ █   █ █ ▄▀ ▀ ▀ █▀▄ ████  ▄ ▄▄ ▄▀▄█ ▄██▀█▀ █ ▄▄▄ ▀ ▄▄█
█ █▄▄▄█ █ █▄▄▄▄█▀█▀ █▀ ███▄█  ▄█▀ ▄▄▄█▀ ▀▀▄  █▄▄ ▄▀▄▀▄█
█▄▄▄▄▄▄▄█▄██▄▄▄▄█▄█▄▄▄██▄▄█▄██▄█████▄▄█▄██▄▄███▄███████

Authenticated
Client is ready!
```

### Let's test the implementation

As you can see, we have a code block:

```js
client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
    }
});
```

Which listen for every message received. If the message is `!ping`, then it automatically replies with `pong`.

Now all you have to do is to send a message to the connected phone number, type `!ping`

## How to automatically send messages to multiple numbers

Maybe you need to inform multiple clients or friends about the same topic or different messages. In this example, below I show you how to send the same message to all, but feel free to change the script and send different messages to each individual.

First of all I need to create the function which sends my notifications. Add it in your `index.js` file:

```js
function sendMessages(client, data) {
    for (const contact of data.contacts) {
        // get the number id from whatsapp of this phone number
        const numberDetails = await client.getNumberId(contact);
        // if the phone number is a valid whatsapp account, send the message
        if (numberDetails) {
            const sendMessageData = await client.sendMessage(numberDetails._serialized, data.message); // send message
            console.log(`Message sent to ${contact} successfully`);
        } else {
            console.log(`Mobile number <${contact}> is not registered`);
        }

        // add a delay of 5s to don't trigger any whatsapp api blocker
        // !!! this is not necessary a safe method, but it may help
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}
```

As you can see in function definition it has two params:
- `client`` - the whatsapp client created above
- `data` - where are stored the contacts and the message

The object looks like below and it's stored in `data.js` file, imported in `index.js`.

```js
// data.js

export default {
    message: "test message ",
    contacts: [
        "4072XYZXYZX",
        "4072AXYZXYZ",
    ]
}
```
!!! Very important to use the international prefix for your country.

Then I have to call that function inside of `ready` event, so the events now looks like:

```js
// index.js
import data from "./data.js";

client.on('ready', () => {
    console.log('Client is ready!');

    sendMessages(client, data)
});
```


## Known issues & fixies

On whatsapp-web.js v1.22.1, after QR scanning is stucked.

In order to fix it, go to `node_modules/whatsapp-web.js/src/CLient.js#175` (line 175) and replace

```js
const INTRO_IMG_SELECTOR = '[data-testid="intro-md-beta-logo-dark"], [data-testid="intro-md-beta-logo-light"], [data-asset-intro-image-light="true"], [data-asset-intro-image-dark="true"]';
```

with

```js
const INTRO_IMG_SELECTOR = 'div[role=\'textbox\']';
```

[Source](https://github.com/pedroslopez/whatsapp-web.js/issues/2473#issuecomment-1707469920)
