---
layout: post
title: Validating CIF for Romanian Company in JS
summary: Validate CIF for Romanian companies in JS. Easily verify company information with our user-friendly tool. Ensure accuracy and reliability.
categories: tools
tags: cif js romanian romania company
date: 2024-07-14 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2012/10/29/15/36/ball-63527_1280.jpg
---

CIF is the tax identification code is a numeric code that constitutes the unique identification code for a trader. It is also known as the fiscal code or unique identification code. Until January 1, 2007, it was called the Unique Registration Code (CUI).

According to Law No. 359 of September 8, 2004, regarding the simplification of formalities for the registration in the trade register of natural persons, family associations, and legal entities, their tax registration, as well as the authorization for the operation of legal entities:
The request for tax registration of a trader is made by submitting the registration application to the single office within the trade register office near the court, and the assignment of the unique registration code by the Ministry of Public Finance is conditioned by the acceptance of the registration application in the trade register by the delegated judge.

* For family associations, as well as for legal entities provided for in Article 2, the structure of the unique registration code is determined by the Ministry of Public Finance, the Ministry of Labor, Social Solidarity and Family, the Ministry of Health, the Ministry of Administration and Interior, and the Ministry of Justice.

* For individuals, the unique registration code coincides with the personal numeric code assigned by the Ministry of Administration and Interior or, as the case may be, with the tax identification number assigned by the Ministry of Public Finance.

The fiscal attribute attached to the unique registration code is an alphanumeric code representing the category of taxpayers for taxes and duties to the state budget. If the fiscal attribute has the value "RO," it certifies that the legal entity has been registered with the tax authority as a VAT payer¹.


The CIF is made from:

[ ZZZZZZZZZ ] |C|
|___________  |_|

Number        | control digit
(max 9 chars)


## The algorithm who checks the validity of CIF or CUI

1. Check if the code complies with the CIF code format: maximum length of 10 digits and only numeric characters. Use testing key "753217532" to validate the CIF code.

2. Reverse the order of the CIF code digits and the testing key. Multiply each digit of the reversed CIF code by the corresponding digit of the reversed testing key, excluding the first digit (control digit).

3. Add all the products obtained, multiply the sum by 10, and divide the result by 11. The obtained digit after the MODULO 11 operation is the verification digit. If the remainder is 10, the verification digit is 0.

4. For a valid CIF, the verification digit must match the control digit of the initial CIF code.

```js
/**
 * @param {string} cif
 * @returns {boolean} 
 */
function checkCIF(cif) {
   // sanitize cif by removing the RO prefix in case does it exist
   cif = cif.toUpperCase().replace("RO", '');

    if (isNaN(cif)) return false;
    if (cif.length > 10) return false;

    let cifra_control = cif.slice(-1);
    cif = cif.slice(0, -1);

    while (cif.length != 9) {
        cif = '0' + cif;
    }

    let suma = cif[0] * 7 + cif[1] * 5 + cif[2] * 3 + cif[3] * 2 + cif[4] * 1 + cif[5] * 7 + cif[6] * 5 + cif[7] * 3 + cif[8] * 2;
    suma = suma * 10;
    
    let rest = suma % 11;

    if (rest === 10) rest = 0;

    return rest === cifra_control;
}
```


Useful resources:
- <a href="www.validari.ro/cui.html" target="_blank">Official documentation</a>
- <a href="https://gabrielsolomon.ro/validare-cuicif-folosind-php/" target="_blank">How to validate the cif using PHP</a>