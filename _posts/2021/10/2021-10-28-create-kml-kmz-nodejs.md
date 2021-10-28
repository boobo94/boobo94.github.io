---
title: Create kml/kmz files in Nodejs
summary: Create kml/kmz files in Nodejs
categories: tutorials
tags: kml kmz js nodejs
date: 2021-10-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/01/31/05/43/web-3120321_1280.png
layout: post
---

Libraries used:

Create kml file - https://www.npmjs.com/package/@maphubs/tokml
Create geojson - https://www.npmjs.com/package/geojson
Create kmz using zip - https://www.npmjs.com/package/jszip


## Create KML File

```js

const points = [
    {latitude: 39.984, longitude: -75.343},
    {latitude: 39.284, longitude: -75.833},
    {latitude: 39.123, longitude: -74.534},
    {line: [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]],}
]

const geojsonObject = geojson.parse(points, {
    Point: ['latitude', 'longitude'],
    LineString: 'line',
}), {
    documentName: 'Document Name',
    documentDescription: 'KML Export'
}

  const response = tokml(geojsonObject);

```

Content-type for kml:

```js
'Content-Type': 'application/vnd.google-earth.kml+xml',
```


## Create KMZ File

```js
  const zip = new JSZip();
  zip.file('doc.kml', kmlFile);

  return zip.generateAsync({ type: 'nodebuffer' });
```

Content-type for kml:

```js
'Content-Type': 'application/vnd.google-earth.kmz',
```