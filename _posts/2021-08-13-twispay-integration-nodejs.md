---
title: Twispay Payment Provider integration in Nodejs
summary: Fully example of Twispay payment provider in Nodejs. A service to create a new customer, new order, subscription, renew a subscription or refund a payment.
tags: payment nodejs
date: 2021-08-13 09:09:09 +0000
cover: https://twispay.github.io/siteID&apiKey.gif
layout: post
---

I created a simple service file to create a new customer, new order, subscription, renew a subscription or refund a payment. Check the [official documentation](https://twispay.github.io/) or the [API](http://docs.twispay.com/)

_twispay-service.js_

```js
import axios from 'axios'

const TWISPAY_API_SITE = process.env.NODE_ENV === 'production' ? "https://secure.twispay.com/" : "https://secure-stage.twispay.com/"
const TWISPAY_PRIVATE_KEY = "TWISPAY_TWISPAY_PRIVATE_KEY"
const TWISPAY_SITE_ID = "TWISPAY_SITE_ID"

const WEBHOOOK_URL =  'https://example.com/hook'
const PAYMENT_DESCRIPTION = 'Product description demo'

/**
 * Get the `jsonRequest` parameter (order parameters as JSON and base64 encoded).
 * source: https://github.com/Twispay/hostedpage-nodejs-sdk/blob/master/src/Twispay.js
 *
 * @param {object} orderData The order parameters.
 *
 * @returns {string}
 */
export function getBase64JsonRequest (orderData) {
  const jsonText = JSON.stringify(orderData)
  return Buffer.alloc(Buffer.byteLength(jsonText), jsonText).toString('base64')
}

/**
 * Get the `checksum` parameter (the checksum computed over the `jsonRequest` and base64 encoded).
 * source: https://github.com/Twispay/hostedpage-nodejs-sdk/blob/master/src/Twispay.js
 *
 * @param {object} orderData The order parameters.
 * @param {string} secretKey The secret key (from Twispay).
 *
 * @returns {PromiseLike<ArrayBuffer>}
 */
export function getBase64Checksum (orderData, secretKey) {
  const crypto = require('crypto')
  const hmacSha512 = crypto.createHmac('sha512', secretKey)
  hmacSha512.update(JSON.stringify(orderData))
  return hmacSha512.digest('base64')
}

/**
 * Decrypt the IPN response from Twispay.
 * source: https://github.com/Twispay/hostedpage-nodejs-sdk/blob/master/src/Twispay.js
 *
 * @param {string} encryptedIpnResponse
 * @param {string} secretKey The secret key (from Twispay).
 *
 * @returns {object}
 */
export function decryptIpnResponse (encryptedIpnResponse, secretKey) {
  // get the IV and the encrypted data
  const encryptedParts = encryptedIpnResponse.split(',', 2)
  const iv = Buffer.from(encryptedParts[0], 'base64')
  const encryptedData = Buffer.from(encryptedParts[1], 'base64')

  // decrypt the encrypted data
  const crypto = require('crypto')
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv)
  const decryptedIpnResponse = Buffer.concat([decipher.update(encryptedData), decipher.final()]).toString()

  // JSON decode the decrypted data
  return JSON.parse(decryptedIpnResponse)
}

export async function order (customerId, cardId, amount, orderId, ip, currency) {
  const params = {
    ip,
    currency,
    siteId: parseInt(TWISPAY_SITE_ID),
    customerId: parseInt(customerId),
    amount: parseFloat(amount),
    cardId: parseInt(cardId),
    externalOrderId: orderId,
    transactionMethod: 'card',
    cardTransactionMode: 'authAndCapture',
    description: PAYMENT_DESCRIPTION,
    orderType: 'purchase'
  }

  const { data } = await axios({
    method: 'POST',
    url: `${TWISPAY_API_SITE}/order`,
    params: params,
    headers: {
      Authorization: `Bearer ${TWISPAY_PRIVATE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  if (data.code === 201 && data.data && data.data.isRedirect) {
    return compose3DSecureRedirectForm(data)
  }

  return data
}

function compose3DSecureRedirectForm (twispayResponse) {
  const redirect = twispayResponse.data.redirect

  let formData = `<form action="${redirect.url}" method="${redirect.formMethod}" accept-charset="UTF-8">`
  // attach all params to form
  for (const key in redirect.params) {
    formData += `<input type="hidden" name="${key}" value="${redirect.params[key]}">`
  }
  formData += '<input type="submit" value="Pay" id="payment_button">'

  return {
    formData,
    showCardRegistrationForm: true,
    is3DSecure: true
  }
}

/**
 * Create new customer with and new card
 * @param {object} user
 * @param {*} amount
 * @param {*} orderId
 * @param {*} currency
 * @returns HTML form data to be displayed for customer and fill in the card data
 */
export function customer (user, amount, orderId, currency) {
  const orderData = {
    siteId: parseInt(TWISPAY_SITE_ID),
    customer: {
      identifier: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      email: user.email
    },
    order: {
      orderId,
      currency,
      type: 'purchase',
      amount: parseFloat(amount),
      description: PAYMENT_DESCRIPTION
    },
    cardTransactionMode: 'authAndCapture',
    backUrl: WEBHOOOK_URL
  }

  // Encode data as base64
  const base64JsonRequest = getBase64JsonRequest(orderData)
  const base64Checksum = getBase64Checksum(orderData, TWISPAY_PRIVATE_KEY)
  const formData = `<form action="${TWISPAY_API_SITE}" method="post" accept-charset="UTF-8">
            <input type="hidden" name="jsonRequest" value="${base64JsonRequest}">
            <input type="hidden" name="checksum" value="${base64Checksum}">
            <input type="submit" value="Pay" id="payment_button">`

  return {
    formData,
    showCardRegistrationForm: true
  }
}

/**
 * Refund a transaction
 * @param {number|string} transactionId
 * @param {number} amount
 * @returns
 */
export async function refund (transactionId, amount) {
  const { data } = await axios({
    method: 'DELETE',
    url: `${TWISPAY_API_SITE}/transaction/${parseInt(transactionId)}`,
    headers: {
      Authorization: `Bearer ${TWISPAY_PRIVATE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      amount,
      reason: 'customer-demand'
    }
  })

  return data
}

/**
 * Create new subscription
 *
 * @param {*} customerId
 * @param {*} cardId
 * @param {*} amount
 * @param {*} orderId
 * @param {*} ip
 * @param {*} currency
 * @param {*} intervalType
 * @param {*} intervalValue
 * @returns
 */
export async function subscription (customerId, cardId, amount, orderId, ip, currency, intervalType, intervalValue) {
  const params = {
    ip,
    currency,
    siteId: parseInt(TWISPAY_SITE_ID),
    customerId: parseInt(customerId),
    amount: parseFloat(amount),
    cardId: parseInt(cardId),
    externalOrderId: orderId,
    transactionMethod: 'card',
    cardTransactionMode: 'authAndCapture',
    description: PAYMENT_DESCRIPTION,

    // subscription only
    orderType: 'recurring',
    intervalType, // string – one of: “day”, “month”
    intervalValue // integer – recurring interval
  }

  const { data } = await axios({
    method: 'POST',
    url: `${TWISPAY_API_SITE}/order`,
    params: params,
    headers: {
      Authorization: `Bearer ${TWISPAY_PRIVATE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  if (data.code === 201 && data.data && data.data.isRedirect) {
    return compose3DSecureRedirectForm(data)
  }

  return data
}

/**
 * Renew subscription
 * @param {string} orderId
 * @param {string} customerId
 * @returns
 */
export async function renew (customerId, cardId, amount, orderId, ip, currency, intervalType, intervalValue) {
  const { data } = await axios({
    method: 'PUT',
    url: `${TWISPAY_API_SITE}/order/${parseInt(orderId)}`,
    headers: {
      Authorization: `Bearer ${TWISPAY_PRIVATE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      customerId: parseInt(customerId),
      orderStatus: 'in-progress'
    }
  })

  return data
}

/**
 * Cancel subscription
 * @param {number|string} orderId
 * @param {boolean} terminateOrder Should finish the order immediately, without waiting until the expiry date
 * @returns
 */
export async function cancel (orderId, terminateOrder = false) {
  const { data } = await axios({
    method: 'DELETE',
    url: `${TWISPAY_API_SITE}/order/${parseInt(orderId)}`,
    headers: {
      Authorization: `Bearer ${TWISPAY_PRIVATE_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      terminateOrder,
      reason: 'customer-demand'
    }
  })

  return data
}
```

And let's have a look at the webhook where the confirmation is sent:

```js
export async (req, res) => {
  const result = req.body.opensslResult

  const decryptedMessage = TwispayService.decryptIpnResponse(result, TWISPAY_PRIVATE_KEY)
  console.log(decryptedMessage)
}
```