---
title: Phone Number Validator
date: 2017-12-01 18:21:18
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
With this tool you can check if a phone number is valid or not. [DEMO](https://codepen.io/boobo94/pen/dvRNzV)

## Supported formats

You can see the list with all the formats supported as valid below:
- XX-XXXX-XXXX
- XX.XXXX.XXXX
- XX XXXX XXXX
- (XX)-XXXX-XXXX
- (XX).XXXX.XXXX
- (XX) XXXX XXXX
- X-XX-XXXX-XXXX
- X.XX.XXXX.XXXX
- X XX XXXX XXXX
- +XX-XXXX-XXXX
- +XX.XXXX.XXXX
- +XX XXXX XXXX
- +(XX)-XXXX-XXXX
- +(XX).XXXX.XXXX
- +(XX) XXXX XXXX
- +X-XX-XXXX-XXXX
- +X.XX.XXXX.XXXX
- +X XX XXXX XXXX

## Code


### Javascript Code
```
//for phone number
var checkButton = document.getElementById("checkNumber");
var phoneInput = document.getElementById("phone");
var message = document.getElementById("message");

checkButton.onclick = function(){
  var nr = phoneInput.value;
  if(checkNr(nr)){
    message.innerHTML = "Is a valid phone number"
    phoneInput.classList.add('correctNr');
  }
  else{
    message.innerHTML = "Is not a valid phone number"
    phoneInput.classList.add('wrongNr');
  }
}

// delete the message when user click again
phoneInput.onfocus = function() {
  message.innerHTML = "";
  phoneInput.classList.remove('correctNr')
  phoneInput.classList.remove('wrongNr')
}

function checkNr(nr) {

  var expression = /^\+?(\d{1})?[-. ]?\(?(\d{2})\)?[-. ]?(\d{4})[-. ]?(\d{4})$/

  
  if(nr.match(expression) )
    return true;
  return false;
}
```

### HTML Code

```
<div id="container">
  <h1>Check a phone number</h1>
  <label for="phone">Phone number</label>
  <input type="text" id="phone" placeholder="Your phone number here .." >
  <button id="checkNumber"> Check </button>
  
</div>
<div id="message"></div>
```
