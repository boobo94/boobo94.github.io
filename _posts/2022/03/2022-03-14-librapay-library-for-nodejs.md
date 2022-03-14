---
title: LibraPay library for Nodejs
summary: LibraPay library for Nodejs - integrate Libra Bank online payment gateway using this library for NodeJs.
categories: tools
tags: nodejs payment
date: 2022-03-14 09:09:09 +0000
cover: https://www.librapay.ro/images/icon_securitate_LibraPay_180x192px.jpg
layout: post
---

LibraPay library for Nodejs - integrate Libra Bank online payment gateway using this library for NodeJs.

This library allows to connect with librapay using nodejs. The Github repo for this library can be found [here](https://github.com/boobo94/libra-pay).

Official documentation can be found [here](https://www.librapay.ro/documente/LibraPay_implementation_documentation_EN.pdf).

## Initial setup


```sh
npm i git+https://github.com/boobo94/libra-pay.git
```

## Usage

You can initialize librapay library as following:

```js
import { LibraPay, BASE_URL_SANDBOX } from 'libra-pay'

const libra = new LibraPay({
    merchantName: '<YOUR VALUE>',
    merchantUrl: '<YOUR VALUE>',
    email: '<YOUR VALUE>',
    key: '<YOUR VALUE>',
    merchant: '<YOUR VALUE>',
    terminal: '<YOUR VALUE>',
    callbackUrl: '<YOUR VALUE>',
    baseUrl: BASE_URL_SANDBOX,
  })
```

Replace all `<YOUR VALUE>` values with the configs received from Librabank after registration

Available imports for environment url:

```js
import { BASE_URL_PRODUCTION, BASE_URL_SANDBOX } from 'libra-pay'
```

## Usage express router example

```js
import { Router } from 'express'
import multer from 'multer'
import { LibraPay } from 'libra-pay'

const libra = new LibraPay({
    merchantName: '<YOUR VALUE>',
    merchantUrl: '<YOUR VALUE>',
    email: '<YOUR VALUE>',
    key: '<YOUR VALUE>',
    merchant: '<YOUR VALUE>',
    terminal: '<YOUR VALUE>',
    callbackUrl: '<YOUR VALUE>',
    baseUrl: LibraPay.BASE_URL_SANDBOX,
  })

export default Router()
  .post(
    'hooks',
    multer().none(),
    amqpMiddleware,
    (req, res, next) => {
      const response = new libra.handleIPN(req.body)
      if (response === '1') {
        console.log('paid with success')
      }

      res.status(200).send(response)
    }
  )

  .get('/card',
    (req, res, next) => {
      const orderId = new Date().getTime().toString()
      const response = libra.generateForm('1.00', orderId, 'comanda online de test', {
        ProductsData: [],
        UserData: {
          Email: 'testuser@exemplu.com',
          Name: 'Nume Prenume',
          Phone: '07537282989',
          BillingEmail: 'testuser@exemplu.com',
          BillingPhone: '07537282989',
          BillingCity: 'Focsani',
          BillingCountry: 'Romania'

        }
      })

      res.status(200).send(response)
    })

  .post('/capture',
    (req, res, next) => {
      const previousOrderId = '1644588481302'
      const res = await libra.captureTransaction('1.00', previousOrderId)

      res.status(200).send({})
    })


  .post('/capture/recurring',
    (req, res, next) => {
      const previousOrderId = '1644588481302'
      const res = await libra.captureRecurringTransaction('100.00', previousOrderId, 'recurring payment')

      res.status(200).send({})
    })

  .post('/cancel/recurring',
    (req, res, next) => {
      const previousOrderId = '1644588481302'
      const res = await libra.cancelRecurringTransaction('100.00', previousOrderId)

      res.status(200).send({})
    })

  .post('/refund',
    (req, res, next) => {
      const previousOrderId = '1644588481302'
      const res = await libra.refundTransaction('1.00', previousOrderId, true)

      res.status(200).send({})
    })
```


## How to test

Card number 4111111111111111

Type VISA

Expiry date: any

Name: any

CVV: any
