---
title: Unleashing the Power of Free API for Scrape Reverse Geocoding
summary: Learn how to harness the potential of reverse geocoding with our beginner's guide to scraping APIs for free. Unlock the power today.
categories: tutorials
tags: javascript api scrape nodejs
date: 2023-07-28 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2018/05/30/15/31/globe-3441673_1280.jpg
layout: post
---

Simple script using javascript to scrape a list of addresses and get the longitude and latitude for free using Google Maps API or MapDevelopers.

** addresses.csv **

```csv
address1
address2
address3
...
addressN
```

## JavaScript file to scrape

Here's the index file in two shapes, using google maps API or MapDevelopers.
** index.js **

### Geocode search using Google Maps API

```js
const axios = require("axios");

const url = "https://maps.googleapis.com/maps/api/geocode/json";

const getLocation = async (address) => {
  const response = await axios.get(url, {
    params: {
      key: "GOOGLE_MAPS_API_KEY",
      address: address,
    },
  });
  // console.log(response)
  const data = response.data;
  return data;
};

async function main() {
  // read the txt file
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "addresses.csv");
  const addresses = fs.readFileSync(filePath, "utf-8").split("\n");

  // loop over addresses

  for (let index = 0; index < addresses.length; index++) {
    const school = addresses[index];

    const data = await getLocation(school);
    // write to file
    const location = data.results[0];
    fs.appendFileSync(
      "results-google.json",
      JSON.stringify({ name: school, result: location }) + ",\n"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("finished", index);
  }
}

main();
```

### Geocode search using Mapdevelopers API

Using MapDevelopers, you need first to make a request on https://www.mapdevelopers.com/geocode_tool.php, check developer tools and inspect the request to'https://www.mapdevelopers.com/data.php', copy and paste below `lcode` and `lid`.

```js
const axios = require("axios");

const url = "https://www.mapdevelopers.com/data.php";

const getLocation = async (address) => {
  const response = await axios.get(url, {
    params: {
      address: address,
      operation: "geocode",
      region: "Europe",
      lcode: "HDxDfOJfv2FjA9Yl", // replace here
      lid: "51143627", // replace here
      code: "splitpea",
    },
  });
  // console.log(response)
  const data = response.data;
  return data;
};

async function main() {
  // read the txt file
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "addresses.csv");
  const addresses = fs.readFileSync(filePath, "utf-8").split("\n");

  // loop over addresses

  for (let index = 0; index < addresses.length; index++) {
    const school = addresses[index];

    const data = await getLocation(school);
    // write to file
    fs.appendFileSync(
      "results-google.csv",
      `${school}, ${data.lat}, ${data.lng}, ${data.country}, ${data.county}, ${data.address}, ${data.postcode}` +
        "\n"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("finished", index);
  }
}

main();
```

## Run the script

```sh
node index.js
```
