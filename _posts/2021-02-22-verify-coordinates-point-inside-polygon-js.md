---
layout: post
title: How to verify if point of coordinates is inside polygon [Javascript]
categories: research
summary: Verify if point of coordinates (longitude, latitude) is polygon of coordinates
tags:
- geolocation
- javascript
- es6
- polygon
- coordinates
date: 2021-01-13 09:09:09 +0000
cover: "https://cdn.pixabay.com/photo/2015/09/05/20/03/globe-924927_960_720.jpg"
---

Solution ES6å

```

/**
 * Verify if point of coordinates (longitude, latitude) is polygon of coordinates
 * https://github.com/substack/point-in-polygon/blob/master/index.js
 * @param {number} latitude Latitude
 * @param {number} longitude Longitude
 * @param {array<[number,number]>} polygon Polygon contains arrays of points. One array have the following format: [latitude,longitude]
 */
export function isPointInPolygon (latitude, longitude, polygon) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new TypeError('Invalid latitude or longitude. Numbers are expected')
  } else if (!polygon || !Array.isArray(polygon)) {
    throw new TypeError('Invalid polygon. Array with locations expected')
  } else if (polygon.length === 0) {
    throw new TypeError('Invalid polygon. Non-empty Array expected')
  }

  const x = latitude; const y = longitude

  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0]; const yi = polygon[i][1]
    const xj = polygon[j][0]; const yj = polygon[j][1]

    const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect) inside = !inside
  }

  return inside
};

```
