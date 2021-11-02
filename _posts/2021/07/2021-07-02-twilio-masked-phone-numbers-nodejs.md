---
title: Twilio Proxy for masked phone numbers in Node.js
summary: Twilio offers a service called to allow masked phone numbers. What that means? You know when you call an Uber and the number shown to you is not the phone number of your driver?!
categories: tutorials
tags: nodejs twilio calls
date: 2021-07-02 09:09:09 +0000
cover: https://assets.twilio.com/public_assets/vnv-console-onboarding/1.0.1/masked-phone-numbers.ed81df198692d2e813637ffb21c5f188.png
layout: post
---

## Twilio Proxy for masked phone numbers in Node.js

Twilio offers a service called [Proxy](https://www.twilio.com/proxy) to allow masked phone numbers. What that means? You know when you call an Uber and the number shown to you is not the phone number of your driver?! Exactly that means *masked phone number*.

>  The Proxy API connects two parties together, allowing them to communicate and keep personal information private. 

<img src="https://www.twilio.com/docs/static/proxy/img/phone-number-pooling.a6ec80587.png" alt="masked phone numbers" />


## How to make a call in Node.js

Let's get to the point. I've made a `twilio-service.js`

```js
import Twilio from 'twilio'

const TWILIO_SERVICE_ID = 'YOUR_SERVICE_ID' // create a service here: https://console.twilio.com/us1/develop/proxy/services
const TWILIO_ACCOUNT_SID= 'YOUR_ACCOUNT_ID'
const TWILIO_AUTH_TOKEN = 'YOUR_AUTH_TOKEN'

const twilioService = function () {
  let client
  if (!client) {
    client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
      logLevel: 'debug'
    })
    delete client.constructor
  }

  return {
    _client: client,

    /**
     * Creates new session to prepare a call
     * docs: https://www.twilio.com/docs/proxy/api/session
     * @returns
     */
    createSession: async function () {
      return client.proxy.services(TWILIO_SERVICE_ID).sessions.create({
        mode: 'voice-only'
      })
    },

    /**
     * Delete a call sesion
     * @param {string} sessionId The id of session
     * docs: https://www.twilio.com/docs/proxy/api/session#delete-a-session-resource
     * @returns
     */
    deleteSession: async function (sessionId) {
      return client
        .proxy
        .services(TWILIO_SERVICE_ID)
        .sessions(sessionId)
        .remove()
    },

    /**
     * Add new participant to the call
     * Maximum 2 participants per call are allowed
     * docs: https://www.twilio.com/docs/proxy/api/participant
     *
     * @param {string} sessionId The id of session
     * @param {string} phoneNumber The phone number of participant to call
     * @returns
     */
    addParticipantToSession: async function (sessionId, phoneNumber) {
      return client
        .proxy
        .services(TWILIO_SERVICE_ID)
        .sessions(sessionId)
        .participants
        .create({
          identifier: phoneNumber
        })
    }

  }
}

export default twilioService()
```


To make a call only need 3 steps:


1. Create a new proxy session
2. Add participants to the session created previously. We have two participants. Each of them has a property `identifier` (their real phone number) and has assigned a new property `proxyIdentifier` (the masked phone number).
3. Now each of them can call their own `proxyIdentifier`, Twilio match their masked number with the masked number of the recipient, and call then the real number of the recipient.


```js
  import TwilioService from '../services/twilio';

  const participant1Number = '+14156789012';
  const participant2Number = '+17012345678';

  const session = await TwilioService.createSession()
  // session = {
  //   ...
  //    "sid": "KCaa270143d7a1ef87f743313a07d4069d",
  //    ...
  // }
  const participantFrom = await TwilioService.addParticipantToSession(session.sid,participant1Number)
  // participantFrom = {
  //   "sid": "KPa4947c3d7b8ca7b0138dbc8181f12e16",
  //   "sessionSid": "KCaa270143d7a1ef87f743313a07d4069d",
  //   "identifier": "+14156789012",
  //   "proxyIdentifier": "+14153749231",
  // }
  const participantTo = await TwilioService.addParticipantToSession(session.sid, participant2Number)  
  participantTo = {
  //   "sid": "KP48f197284b3f50c5b31891ecc8377c20",
  //   "sessionSid": "KCaa270143d7a1ef87f743313a07d4069d",
  //   "identifier": "+17012345678",
  //   "proxyIdentifier": "+40371246711",
  // }
```

### What is next?

Let's say you are **+14156789012** and you need to connect with **+17012345678**. You've run the previous code, now Twilio created a proxy between these two numbers. But you don't know the number of **+17012345678**. 

Take your phone, make a call to your `proxyIdentifier`, **+14153749231**, Twilio identifies your identity and match your masked phone number with the other paticipant, and call their real name **+17012345678**, but you never know which is the real number of your companion speaker. To make the call from the other side, do the same.

### Do you wanna cancel the proxy between two of them?

```js
 await TwilioService.deleteSession(session.sid);
 ```

That is all boys. For further questions send me an email or message on Twitter. Do you like the article? Share it!