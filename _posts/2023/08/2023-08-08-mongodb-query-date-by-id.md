---
title: MongoDB Query date by _id field
summary: Query date by _id in mongodb. Straighforward guide to solve your issue right away.
categories: tutorials
tags: mongodb query
date: 2023-08-08 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2023/08/03/14/14/night-8167272_1280.jpg
layout: post
---

In order to make a query based on _id, comparing dates, you can use `$convert` function to extract the date from `ObjectId`.

Example:

```js
$convert: { input: "$_id", to: "date" } 
```

To query dates comparing between start and end time:

```js
db.collection.find({
  "$expr":{
    "$and":[
      {"$gte":[{"$convert":{"input":"$_id","to":"date"}}, ISODate("2023-08-01T00:00:00.000Z")]},
      {"$lte":[{"$convert":{"input":"$_id","to":"date"}}, ISODate("2023-08-02T11:59:59.999Z")]}
    ]
  }
})
```

The shorthand version using `$toDate` function helps you achieve the same result:

```js
db.collection.find({
  "$expr":{
    "$and":[
      {"$gte":[{"$toDate":"$_id"}, ISODate("2023-08-01T00:00:00.000Z")]},
      {"$lte":[{"$toDate":"$_id"},ISODate("2023-08-02T11:59:59.999Z")]}
    ]
  }
})
```

---

[Source](https://stackoverflow.com/a/51165575/4471897)

Image by <a href="https://pixabay.com/users/vikashkr50-35301037/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8167272">Vikash Kr Singh</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8167272">Pixabay</a>