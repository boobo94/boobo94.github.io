---
title: How to add two big numbers in javascript ?
date: 2017-11-30 22:52:16
tags:
    - javascript
    - html
    - regular expression
    - alghoritms
category:
    - blog
    - tutorials
---


## Description
Hi, today I will show you how to add two numbers with many digits using a simple javascript function.

Because javascript doesn’t work with big numbers we need to make a smart trick. If for examples we have the numbers:

``` bash
nr1 = 31739812364612784612476128376128371
nr2 = 5872641381853751896412475612190381965714981
```

And we want to calculate the sum, it’s not possible just typing nr1 + nr2, instead of that we can convert the numbers to string, get each digit and add one by one exactly like we are do it in mind. In the end, all we have to do is to join all the digits back in one number.

You can find all the code here, you can play with it and modify it [HERE](https://codepen.io/boobo94/pen/zZzJrd)

## Code

### Javascript Code
```
var n1 = document.getElementById("nr1")
console.log(n1)
var n2 = document.getElementById("nr2")
var sum = document.getElementById("sum")
var result = document.getElementById("result")

sum.onclick = function() {
if (n1.value.match(/^\d+$/) != null && n2.value.match(/^\d+$/) != null)
  result.innerHTML = ("Suma celor doua numere n1= " + n1.value + ", n2= " + n2.value + " este " + sumBigNumbers(n1.value, n2.value));
else
  result.innerHTML = ("Those two values are not numbers, try again")
}

function sumBigNumbers(nr1, nr2) {

  var nr1 = nr1.split('').reverse()
  var nr2 = nr2.split('').reverse()
  var sum = []
  var l;
  if (nr1.length > nr2.lenth)
    l = nr1.length
  else
    l = nr2.length

  var rest = 0;
  for (j = 0; j < l; j++) {
    if (nr1[j] && nr2[j]) {
      var addition = parseInt(nr1[j]) + parseInt(nr2[j]) + rest;
      if (addition > 9) {
        rest = parseInt(addition / 10)
        addition = addition % 10
      } else
        rest = 0;
      sum.push(addition)
    } else if (nr1[j]) {
      var addition = parseInt(nr1[j]) + rest;
      if (addition > 9) {
        rest = parseInt(addition / 10)
        addition = addition % 10
      } else
        rest = 0;
      sum.push(addition)
    } else if (nr2[j]) {
      var addition = parseInt(nr2[j]) + rest;
      if (addition > 9) {
        rest = parseInt(addition / 10)
        addition = addition % 10
      } else
        rest = 0;
      sum.push(addition)
    }
  }

  return sum.reverse().join('')
}
```

### HTML Code

```
<label for="nr1">nr1</label>
<input type="text" id="nr1" />
<br />
<label for="nr2">nr2</label>
<input type="text" id="nr2" />
<button id="sum">Sum</button>

<p id="result"></p>
```