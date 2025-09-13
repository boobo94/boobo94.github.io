---
layout: post
title: Validate Romanian CNP
summary: How to validate the Romanian CNP with a JS function
categories: tools
tags: javascript validation
date: 2025-04-13 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/08/18/00/40/successful-2653403_1280.jpg
---

<h2>Validate CNP (Cod Numeric Personal)</h2>
<input type="text" id="cnpInput" placeholder="Introduceți CNP-ul" maxlength="13" />
<button onclick="validateCNP()">Verifică</button>

<div id="result"></div>

## 🔍 How the Romanian CNP (Cod Numeric Personal) Is Validated

The **Cod Numeric Personal (CNP)** is a unique 13-digit number assigned to every Romanian citizen and resident. It encodes information such as birthdate, gender, and county of registration, and ends with a **control digit** that ensures the integrity of the code. Validating a CNP involves checking both its format and this control digit using a well-defined algorithm.

### 📐 Structure of the CNP

The CNP is made up of 13 digits:

```
S YY MM DD JJ NNN C
```

| Position | Meaning                       |
| -------- | ----------------------------- |
| S        | Sex and century of birth      |
| YY       | Last two digits of birth year |
| MM       | Month of birth (01–12)        |
| DD       | Day of birth (01–31)          |
| JJ       | County code (01–52 or 99)     |
| NNN      | Serial number                 |
| C        | Control digit                 |

---

### 🧠 The Validation Algorithm

To validate a CNP, we perform these checks:

1. **Length and format**:  
   Ensure the CNP has exactly 13 numeric digits.

2. **First digit (S)**:  
   Must be between 1 and 9, depending on the person’s sex and century of birth:

   - 1/2 → 1900–1999
   - 3/4 → 1800–1899
   - 5/6 → 2000–2099
   - 7/8 → foreign residents
   - 9 → foreign citizens without permanent residence

3. **Control digit check**:  
   This is the key part of the validation.

   - Use the constant control key:
     ```
     279146358279
     ```
   - Multiply each of the first 12 digits of the CNP by the corresponding digit in the control key.
   - Add the results.
   - Divide the total sum by 11.
     - If the remainder is **10**, the control digit becomes **1**.
     - Otherwise, the remainder itself is the control digit.
   - Compare the result with the 13th digit of the CNP.

---

### ✅ Example

Let’s validate the following CNP:

```
1960129460018
```

- Multiply first 12 digits with the control key:
  ```
  (1×2) + (9×7) + (6×9) + (0×1) + (1×4) + (2×6) + (9×3) + (4×5) + (6×8) + (0×2) + (0×7) + (1×9)
  = 2 + 63 + 54 + 0 + 4 + 12 + 27 + 20 + 48 + 0 + 0 + 9 = 239
  ```
- `239 % 11 = 8`, so the expected control digit is **8**.
- Last digit in the CNP is also **8**, so the CNP is **valid**.

---

### 🛡️ Why This Matters

This algorithm ensures that any typo or accidental change in the CNP is likely to be detected, protecting systems from invalid or forged data. CNP validation is widely used in administrative systems, registration forms, and identity verification processes in Romania.

## The JS function that validates the CNP

```js
function validateCNP() {
  const cnp = document.getElementById("cnpInput").value.trim();
  const result = document.getElementById("result");

  // CNP should have exactly 13 digits
  if (!/^\d{13}$/.test(cnp)) {
    return false;
  }

  const controlKey = "279146358279";
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp[i]) * parseInt(controlKey[i]);
  }

  let remainder = sum % 11;
  let controlDigit = remainder === 10 ? 1 : remainder;

  // CNP invalid (control digit is incorect)
  if (parseInt(cnp[12]) !== controlDigit) {
    result.className = "invalid";
    return false;
  }

  const sex = parseInt(cnp[0]);
  // CNP invalid (first digit is invalid)
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(sex)) {
    return false;
  }

  return true;
}
```

<style>
    input, button { font-size: 16px; padding: 8px; }
    #result { margin-top: 15px; font-weight: bold; font-size: 18px; }
    .valid { color: green; }
    .invalid { color: red; }
</style>

<script>
function validateCNP() {
    const cnp = document.getElementById("cnpInput").value.trim();
    const result = document.getElementById("result");

    if (!/^\d{13}$/.test(cnp)) {
    result.textContent = "❌ CNP should have exactly 13 digits.";
    result.className = "invalid";
    return;
    }

    const controlKey = "279146358279";
    let sum = 0;

    for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp[i]) * parseInt(controlKey[i]);
    }

    let remainder = sum % 11;
    let controlDigit = remainder === 10 ? 1 : remainder;

    if (parseInt(cnp[12]) !== controlDigit) {
    result.textContent = "❌ CNP invalid (control digit is incorect).";
    result.className = "invalid";
    return;
    }

    const sex = parseInt(cnp[0]);
    if (![1,2,3,4,5,6,7,8,9].includes(sex)) {
    result.textContent = "❌ CNP invalid (first digit is invalid).";
    result.className = "invalid";
    return;
    }

    result.textContent = "✅ CNP valid!";
    result.className = "valid";
}
</script>
