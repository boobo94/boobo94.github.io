---
title: How do you detect Credit card type based on the number?
summary: How do you detect Credit card type based on the number using JavaScript? Simple solution using only code, no library required.
categories: tutorials
tags: card number regexp javascript
date: 2022-04-12 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2016/05/03/12/19/credit-card-1369111_1280.png
layout: post
---

How do you detect Credit card type based on the number using JavaScript? Simple solution using only code, no library required.

```js
function getCardType (number) {
  const re = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  }

  for (var key in re) {
    if (re[key].test(number)) {
      return key
    }
  }
}
```

## Test cards

UNIONPAY

8800000000000000

ELECTRON

4026000000000000

4175000000000000

4405000000000000

4508000000000000

4844000000000000

4913000000000000

4917000000000000

DANKORT

5019000000000000

MAESTRO

5018000000000000

5020000000000000

5038000000000000

5612000000000000

5893000000000000

6304000000000000

6759000000000000

6761000000000000

6762000000000000

6763000000000000

0604000000000000

6390000000000000

JCB

3528000000000000

3589000000000000

3529000000000000

INTERPAYMENT

6360000000000000

VISA

4916338506082832

4556015886206505

4539048040151731

4024007198964305

4716175187624512

MASTERCARD

5280934283171080

5456060454627409

5331113404316994

5259474113320034

5442179619690834

DISCOVER

6011894492395579

6011388644154687

6011880085013612

6011652795433988

6011375973328347

AMEX

345936346788903

377669501013152

373083634595479

370710819865268

371095063560404


![detect card type by number](https://i.stack.imgur.com/Cu7PG.jpg)

Sources:

- <https://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number>
- <https://stackoverflow.com/questions/5911236/identify-card-type-from-card-number>