---
title: Create kml/kmz files in Nodejs
summary: This article presents how to create kml or kmz files in Nodejs using JavaScript. A simple and fast way of generating kml and kmz files and how to preview them.
categories: tutorials
tags: kml kmz javascript nodejs
date: 2021-10-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/01/31/05/43/web-3120321_1280.png
layout: post
---

This article presents how to create kml or kmz files in Nodejs using JavaScript.

Libraries used:

Create kml file - [@maphubs/tokml](https://www.npmjs.com/package/@maphubs/tokml)

Create geojson - [geojson](https://www.npmjs.com/package/geojson)

Create kmz using zip - [archiver](https://www.npmjs.com/package/archiver)

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
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.append(Buffer.from(kmlFile), { name: "file.kml" });
// archive.pipe(res); // for expressjs stream

return archive.finalize();
```

Content-type for kml:

```js
'Content-Type': 'application/vnd.google-earth.kmz',
```

## How to vizualize kml or kmz files ?

I found an online tool [KML Viewer](https://kmlviewer.nsspot.net/) that do a great job.
