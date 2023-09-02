---
title: Netopiajs library for nodejs
summary: Unofficial library of Netopia to integrate with Nodejs
categories: tools
tags: netopia library package js nodejs
date: 2023-04-06 09:09:09 +0000
cover: https://netopia-payments.com/storage/2018/04/logo-sizes.png
layout: post
---

Check the nodejs library module I wrote for the integration with Netopia Payments, an European Payment provider.

You can find the repository on Github [boobo94/netopia-js](https://github.com/boobo94/netopia-js)

# Initial setup

Copy the package to modules/netopia and install dependencies

```sh
  npm i ./modules/netopia-js
```

Set the environment variables

```sh
# or something else, for example  local, staging
ENVIRONMENT=production
# your fallback url, after the payment is made the user will be redirected to this screen
NETOPIA_BASE_URL=http://localhost
 # your webhook url where Netopia sends confirmation messages
NETOPIA_WEBHOOK_URL=http://localhost:8000/api/v1/webhooks/netopia
# the seller account id found in Admin > Seller Accounts > in the table press edit near the seller account >
# > Security Settings (4th tab) > is under Seller account id having format XXXX-XXXX-XXXX-XXXX-XXXX
NETOPIA_SELLER_ID=123456789
# under seller account there is Digital Certificate Netopia Payments (the public key)
# download the certificate then copy an paste the certificate inside quotes
# for those who use dotenv library, you need at least v15
NETOPIA_PUBLIC_KEY="change_me"
# under the public key there is Seller Account Certificate (the private key)
# download the certificate then copy an paste the certificate inside quotes
NETOPIA_PRIVATE_KEY="change_me"
# If your implementation requires an user go to Admin > Users > Create a new one (you should talk with Netopia about your needs)
# but here you find the username and the password that you picked
NETOPIA_ACCOUNT_USERNAME=change_me
NETOPIA_ACCOUNT_PASSWORD=change_me
NETOPIA_CURRENCY=RON
```

To get the settings of account [login into Netopia](https://admin.mobilpay.ro/ro/login).

## Usage

## Import

```js
import Netopia from '../../../modules/netopia'
```

## IPN using Express

```js
import Netopia from '../../../modules/netopia'
import { urlencoded } from 'express';

// ...

.post(
  '/api/v1/webhooks/netopia',
  urlencoded({ extended: false }),
  async (req, res) => {
    const ipnResponse = await Netopia.parseIPNResponse(req.body)

    // action = status only if the associated error code is zero
    if (ipnResponse.success) {
      switch (ipnResponse.decoded.order.mobilpay.action) {
        // every action has an error code and an error message
        case 'confirmed': {
          // confirmed actions means that the payment was successful and
          // the money was transferred from custtomers account to the merchant account and you can deliver the goods

          break
        }
        case 'confirmed_pending': {
          // confirmed pending action means that the transaction pending for antifraud validation
          // you should not deliver the goods to the customer until a confirmed or canceled action is received

          break
        }
        case 'paid_pending': {
          // confirmed paid pending action means that the transaction pending validation
          // you should not deliver the goods to the customer until a confirmed or canceled action is received

          break
        }
        case 'paid': {
          // paid action means that the transaction pre-authorized
          // you should not deliver the goods to the customer until a confirmed or canceled action is received

          break
        }
        case 'canceled': {
          // canceled action means that the payment was canceled
          // you should not deliver the goods to the customer

          break
        }
        case 'credit': {
          // credit action means that the payment was refund

          break
        }
        default:
          throw Error('action parameter is not supported')
      }
    } else {
      console.error('error ipn', ipnResponse.decoded.order.mobilpay.error)
    }

    return res.status(200).send(ipnResponse.response)
  }
)
```

(#ipn-response)
### IPN response example

```json
{
  "decoded": {
    "order": {
      "$": {
        "id": "l1or6vvj25sw9uxlae0g",
        "timestamp": "1649321087455",
        "type": "card"
      },
      "signature": "87Y7-EA62-UDK4-8EW2-4PQE",
      "url": {
        "return": "http://localhost:8000",
        "confirm": "http://localhost:8000/api/v1/webhooks/netopia"
      },
      "invoice": {
        "$": {
          "currency": "RON",
          "amount": "1"
        },
        "details": "test plata",
        "contact_info": {
          "billing": {
            "$": {
              "type": "person"
            },
            "first_name": "John",
            "last_name": "Doe",
            "address": "my street",
            "email": "contact@cmevo.com",
            "mobile_phone": "071034782"
          },
          "shipping": {
            "$": {
              "type": "person"
            },
            "first_name": "John",
            "last_name": "Doe",
            "address": "my street",
            "email": "contact@cmevo.com",
            "mobile_phone": "071034782"
          }
        }
      },
      "mobilpay": {
        "$": {
          "timestamp": "20220407115352",
          "crc": "536ef5f26486b6071161bc0ad4a2263b"
        },
        "action": "paid",
        "customer": {
          "$": {
            "type": "person"
          },
          "first_name": "John",
          "last_name": "Doe",
          "address": "my+street",
          "email": "contact%40cmevo.com",
          "mobile_phone": "071034782"
        },
        "purchase": "1334168",
        "original_amount": "1.00",
        "processed_amount": "1.00",
        "current_payment_count": "1",
        "pan_masked": "9****5098",
        "rrn": "9991649",
        "payment_instrument_id": "41679",
        "token_id": "MTUyOTI0OsFnpdPjsR3KzdyA1KKC5BHlVdHDrqbizsPYR39SlVuRrVbR6sBfr0tQPx5YxImCEIrIPShZ8nKcdsw/TFQR86c=",
        "token_expiration_date": "2024-04-07 11:53:52",
        "error": {
          "_": "Tranzactie aprobata",
          "$": {
            "code": "0"
          }
        }
      }
    }
  },
  "response": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<crc>success</crc>",
  "success": true
}
```

### Use IPN webhook from localhost

In order to connect Netopia with your local API, you need to expose your server running locally to the internat. To do that you can simply use SSH tunneling. [Connect localhost to the internet](https://whyboobo.com/devops/connect-localhost-to-the-internet/) is an article which describes how to do that.


If you're hurry use localhost.run, [documentation here](https://localhost.run/docs/) by simply:

```sh
ssh -R 80:localhost:8000 nokey@localhost.run
```

Pay attention which port your server is running, in my example the server is running on port 8000. Just change with your port and hit the ENTER button to get something like this in the console:

```sh
de3a810e7aa2b9.lhrtunnel.link tunneled with tls termination, https://de3a810e7aa2b9.lhrtunnel.link
```

Just copy that base url and set the environment variable `NETOPIA_WEBHOOK_URL`, now it should looks like `NETOPIA_WEBHOOK_URL=https://de3a810e7aa2b9.lhrtunnel.link/api/v1/webhooks/netopia`.

NOTE!!!

Very important to know, after few minutes/hour the ssh tunnel url is changed, you need to copy paste the url again.

## How to create a simple payment or add the card in Netopia

To create simple payments where the user insert the card. This method returns an html form that submits automatically, simulating the redirect to Netopia's payment page, where the customer has to fill the card details.

```js
const response = await Netopia.createSimplePayment(
  "10", // the price in RON, in string format
  {
    type: 'person', // optional, options: 'person' or 'company', default = 'person'
    firstName: 'John', // required
    lastName: 'Doe', // required
    address: "my street", // required
    email: "contact@cmevo.com", // required
    phone: "071034782", // required
    description: "the product or service description", // required
  },
  {
    // pass custom params that will be returned to you on IPN later
    "userId": 1,
    "internalPaymentId": "3sad3",
    "foo": "bar"
  }
);
```

This method can be used to register a card using the alias `registerCard(amount, billing, params)`. Is the same function. Create a symbolic transaction of 1 RON. If your seller account has an user which is activated for token usage, you'll receive on IPN a token. Save it for further payments. **Very important**, if your account is set with pre-authorization, when the IPN response confirm the card addition you should capture that transaction of 1 RON.

```js
await Netopia.capture(ipnResponse.decoded.order.$.id,1)
```

### Save the token for further payments

The token can be saved from the [IPN response](#ipn-response) from path `decoded.order.mobilpay.token_id`.

## Create payment based on tokens or authorize a payment

If your seller account doesn't have pre-authorization active, by default all payments are captured instantly.


```js
const response = await Netopia.captureWithoutAuthorization(
  "10", // the price in RON, in string format
  "the token stored previously",
  {
    type: 'person', // optional, options: 'person' or 'company', default = 'person'
    firstName: 'John', // required
    lastName: 'Doe', // required
    address: "my street", // required
    email: "contact@cmevo.com", // required
    phone: "071034782", // required
    description: "the product or service description", // required
    country: "Romania", // optional, default = 'Romania'
    county: "Bucharest", // optional, default = 'Bucharest'
    city: "Bucharest", // optional, default = 'Bucharest'
    postalCode: "123456", // optional, default = '123456'
  },
  {
    // pass custom params that will be returned to you on IPN later
    "userId": 1,
    "internalPaymentId": "3sad3",
    "foo": "bar"
  });
```

I created an alias of this function for pre-authorization (if your seller account supports), only to be easier for you with the name. Instead of `captureWithoutAuthorization(...)` use `authorize(...)`. Pre-authorization means the money are locked in the customer's account, but are not transferred to your account until you don't execute the capture method.
If you use have pre-authorization, save for later the order id created from `response.order.id`.

## Capture a pre-authorized payment

Execute this function to transfer the money from customer to your account.

```js
const response = await Netopia.capture(
  "previous order id pre-authorized", // response.order.id, where response = Netopia.authorize(...), in string format
  "5", // the price in RON, in string format
  )
```

You can capture the pre-authorize value or a smaller amount and the difference will remain in the customer. Is not a refund, because the money didn't leave his account yet. You only capture partially. You cannot capture more than the pre-authorized value.

Netopia has a limitation when you have pre-authorization active on you seller account and you need to do both payments with pre-authorizations and instant capture. The are unable to do it using a single customer account. I implemented this functionality using an workaround by doing authorize and capture. Use function `authorizeAndCapture(amount, token, billing, params)`.

## Cancel pre-authorized payment

If you decide at any moment to cancel a payment, use:

```js
const response = await Netopia.cancel(
  "previous order id pre-authorized", // response.order.id, where response = Netopia.authorize(...), in string format
)
```

## Refund payment

If you decide to refund a payment

```js
const response = await Netopia.refund(
  "previous order id pre-authorized", // response.order.id, where response = Netopia.authorize(...), in string format
  "5", // the price in RON, in string format
  )
```

The amount you refund can be different that the value you captured. For example if you captured 5 lei, you can refund only 2, maximum 5.

## Delete card by removing the token

To delete a card and make the token inactive for further payments do:

```js
const response = await Netopia.deleteCard(
  "the token stored previously",
)
```

## How to check the SOAP documentation

Install Wizdler browser extension and check https://secure.mobilpay.ro/api/payment2/?wsdl
There you'll find all methods available.

## Testing

You can find a [simple payment example](https://github.com/mobilpay/Node.js) and [Netopia's Github](https://github.com/mobilpay/).

### Cards

9900004810225098 - card accepted, CVV = 111

9900541631437790 - card expired

9900518572831942 - insufficinet funds

9900827979991500 - CVV2/CCV incorect

9900576270414197 - transaction declined 

9900334791085173 - high risk card (for example is a stolen card) 

9900130597497640 - error from the bank (connection with the bank cannot be established)
