---
title: How to read an array in JavaScript
date: 2017-12-01 21:22:09
tags:
    - javascript
    - alghoritms
category:
    - blog
    - tutorials
---

## Description

Read a matrix with nL lines and nC columns.

## Code

### Function
```
/**
 * 
 * @param {*} nL - number of lines
 * @param {*} nC - number of columns
 */
function readMatrix(nL, nC) {
    var M = [];
    for (i = 0; i < nL; i++) {
        var line = [];
        for (j = 0; j < nC; j++) {
            var el = prompt("v["+i+"]["+j+"]")
            line.push(el);
        }
        M.push(line);
    }
    return M;
}
```

### Example of call:

```
var arr = readMatrix(4,4)
```