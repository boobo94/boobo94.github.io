---
title: Generate hexagons in JS based on center coordinates and radius
summary: How to generate hexagons in javascript based on the center point coordinates and radius length
categories: tutorials
tags: js map hexagon coordinates
date: 2023-03-17 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2021/07/12/15/22/hexagon-6406639_1280.jpg
layout: post
---

How to generate hexagons in javascript based on the center point coordinates and radius length

```js
function drawHexagon (centerPointLatitude, centerPointLongitude, radiusLength) {
  const radius = radiusLength / 6371

  const angle = 2 * Math.PI / 6 // 2PI (360 degree) divded by 6 points of the hexagon shape

  const hexagon = []
  for (var i = 0; i < 6; i++) {
    const longitude = centerPointLongitude + (radius * Math.cos(angle * i))
    const latitude = centerPointLatitude + (radius * Math.sin(angle * i))

    hexagon.push([longitude, latitude])
  }

  // close the polygon adding the initial point
  hexagon.push(hexagon[0])

  return hexagon
}

drawHexagon(44.4268, 26.1024, 10)
```


Image credits <a href="https://pixabay.com/images/id-6406639/" target="_blank">Pixabay</a>