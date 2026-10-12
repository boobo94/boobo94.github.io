---
layout: post
title: Validating CIF for Romanian Company in JS
summary: Validate CIF for Romanian companies in JS. Easily verify company information with our user-friendly tool. Ensure accuracy and reliability.
categories: tools
tags: cif js romanian romania company
date: 2025-04-13 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2022/09/24/16/27/audit-7476720_1280.png
---

CIF is the tax identification code is a numeric code that constitutes the unique identification code for a trader. It is also known as the fiscal code or unique identification code. Until January 1, 2007, it was called the Unique Registration Code (CUI).

<h2>Validate Romanian CIF</h2>

<input type="text" id="cifInput" placeholder="Enter CIF (e.g. RO1234567)" />
<button onclick="validateCIF()">Check</button>
<div id="result"></div>

According to Law No. 359 of September 8, 2004, regarding the simplification of formalities for the registration in the trade register of natural persons, family associations, and legal entities, their tax registration, as well as the authorization for the operation of legal entities:
The request for tax registration of a trader is made by submitting the registration application to the single office within the trade register office near the court, and the assignment of the unique registration code by the Ministry of Public Finance is conditioned by the acceptance of the registration application in the trade register by the delegated judge.

- For family associations, as well as for legal entities provided for in Article 2, the structure of the unique registration code is determined by the Ministry of Public Finance, the Ministry of Labor, Social Solidarity and Family, the Ministry of Health, the Ministry of Administration and Interior, and the Ministry of Justice.

- For individuals, the unique registration code coincides with the personal numeric code assigned by the Ministry of Administration and Interior or, as the case may be, with the tax identification number assigned by the Ministry of Public Finance.

The fiscal attribute attached to the unique registration code is an alphanumeric code representing the category of taxpayers for taxes and duties to the state budget. If the fiscal attribute has the value "RO," it certifies that the legal entity has been registered with the tax authority as a VAT payer¹.

## The algorithm who checks the validity of CIF or CUI

1. Check if the code complies with the CIF code format: maximum length of 10 digits and only numeric characters. Use testing key "753217532" to validate the CIF code.

2. Reverse the order of the CIF code digits and the testing key. Multiply each digit of the reversed CIF code by the corresponding digit of the reversed testing key, excluding the first digit (control digit).

3. Add all the products obtained, multiply the sum by 10, and divide the result by 11. The obtained digit after the MODULO 11 operation is the verification digit. If the remainder is 10, the verification digit is 0.

4. For a valid CIF, the verification digit must match the control digit of the initial CIF code.

### 📊 CIF Structure and Validation Process

#### ✅ Format:

A CIF (Cod de Identificare Fiscală) must be:

- **Maximum 10 digits**
- **Numeric only**
- Structure:
  ```
  [ Base Number (up to 9 digits) ] + [ Control Digit ]
  ```

---

### 🔍 Example Breakdown:

Assume CIF: `1234567891`  
**Testing Key**: `753217532` (used for validation)

#### Step 1: Split the CIF

| CIF Digits | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 1   |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Role       | B   | B   | B   | B   | B   | B   | B   | B   | B   | C   |

- **B = Base digits** (9 digits, left-padded with 0 if shorter)
- **C = Control digit** (last digit)

---

#### Step 2: Multiply reversed base with reversed key

| Position (reversed)        | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   |
| -------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CIF Base Digits (reversed) | 9   | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   |
| Testing Key (reversed)     | 2   | 3   | 5   | 7   | 1   | 2   | 3   | 5   | 7   |
| Product                    | 18  | 24  | 35  | 42  | 5   | 8   | 9   | 10  | 7   |

- **Sum**: `18 + 24 + 35 + 42 + 5 + 8 + 9 + 10 + 7 = 158`
- Multiply sum by 10: `158 * 10 = 1580`
- Modulo 11: `1580 % 11 = 7` → **Expected control digit**

---

#### Step 3: Compare with actual control digit

| Actual Control Digit | Expected (Calculated) |
| -------------------- | --------------------- |
| 1                    | 7 ❌ Invalid CIF      |

---

### ✅ Visual Summary

```
[ Base: 123456789 ] + [ Control: 1 ]
            ⇩
Validation using reversed key:
Sum of products → *10 → %11 → Compare with control digit
```

```js
/**
 * @param {string} cif
 * @returns {boolean}
 */
function checkCIF(cif) {
  // sanitize cif by removing the RO prefix in case does it exist
  cif = cif.toUpperCase().replace("RO", "");

  if (isNaN(cif)) return false;
  if (cif.length > 10) return false;

  let cifra_control = cif.slice(-1);
  cif = cif.slice(0, -1);

  while (cif.length != 9) {
    cif = "0" + cif;
  }

  let suma =
    cif[0] * 7 +
    cif[1] * 5 +
    cif[2] * 3 +
    cif[3] * 2 +
    cif[4] * 1 +
    cif[5] * 7 +
    cif[6] * 5 +
    cif[7] * 3 +
    cif[8] * 2;
  suma = suma * 10;

  let rest = suma % 11;

  if (rest === 10) rest = 0;

  return rest === cifra_control;
}
```

Useful resources:

- <a href="www.validari.ro/cui.html" target="_blank">Official documentation</a>
- <a href="https://gabrielsolomon.ro/validare-cuicif-folosind-php/" target="_blank">How to validate the cif using PHP</a>

<style>
#result {
    margin-top: 15px;
    margin-bottom: 50px;
    font-size: 18px;
    font-weight: bold;
}
.success {
    color: green;
}
.error {
    color: red;
}
</style>
<script>
function checkCIF(cif) {
  cif = cif.toUpperCase().replace("RO", "");

  if (isNaN(cif)) return false;
  if (cif.length > 10) return false;

  let cifra_control = parseInt(cif.slice(-1));
  cif = cif.slice(0, -1);

  while (cif.length != 9) {
    cif = "0" + cif;
  }

  let suma =
    cif[0] * 7 +
    cif[1] * 5 +
    cif[2] * 3 +
    cif[3] * 2 +
    cif[4] * 1 +
    cif[5] * 7 +
    cif[6] * 5 +
    cif[7] * 3 +
    cif[8] * 2;
  suma = suma * 10;

  let rest = suma % 11;
  if (rest === 10) rest = 0;

  return rest === cifra_control;
}

function validateCIF() {
  const input = document.getElementById("cifInput").value.trim();
  const isValid = checkCIF(input);
  const resultDiv = document.getElementById("result");

  if (isValid) {
    resultDiv.innerHTML = "✅ CIF is valid!";
    resultDiv.className = "success";
  } else {
    resultDiv.innerHTML = "❌ Invalid CIF. Please check the number.";
    resultDiv.className = "error";
  }
}

</script>
