---
title: Download files in Javascript from Node.js server
summary: How to download files in Javascript, either you use Vue.js, React, Angular, jQuery, or Vanilla JS. On the backend side, we run on Node.js using Express.js.
categories: tutorials
tags: javascript nodejs expressjs react angular jquery js vue
date: 2022-04-12 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png
redirect_from: 
- /webservice/download-files-in-js-from-nodejs/
layout: post
---

Download files in Javascript from the Node.js server using the Express.js framework. Hi there, long time no see. In this article, I want to show you how to download files in Javascript, either you use Vue.js, React, Angular, jQuery, or Vanilla JS. On the backend side, we run on Node.js using Express.js, and I write only the route’s handler.

## Back-end

```js
import cors from 'cors';
import fs from 'fs';

.get('/download',
  cors({
    exposedHeaders: ['Content-Disposition'],
  }),
  async (req, res) => {
    try {
      const fileName = 'file.pdf'
      const fileURL = '/path/to/file/file.pdf'
      const stream = fs.createReadStream(fileURL);
      res.set({
        'Content-Disposition': `attachment; filename='${fileName}'`,
        'Content-Type': 'application/pdf',
      });
      stream.pipe(res);
    } catch (e) {
      console.error(e)
      res.status(500).end();
    }
  };
})
```

This code is all you need to download any file from the back-end. In this example, I used a `.pdf` file, but you can change the content type, on line _15._

Is very important to use CORS as middleware to determine what headers are [exposed](https://stackoverflow.com/questions/43912862/axios-expose-response-headers-content-disposition)[to](https://stackoverflow.com/questions/43912862/axios-expose-response-headers-content-disposition)[Axios](https://stackoverflow.com/questions/43912862/axios-expose-response-headers-content-disposition) library, on the front-end side. We need to set `Content-Disposition`, declared on line _1_4, to inform the client about this request which has an attachment and the filename.

## Front-end

```js
import Axios from 'axios'
const response = await Axios.get('API_URL/download', { responseType: 'blob' });
if (response.data.error) {
  console.error(response.data.error)
}

const fileURL = window.URL.createObjectURL(new Blob([response.data]));
const fileLink = document.createElement('a');
fileLink.href = fileURL;
const fileName = response.headers['content-disposition'].substring(22, 52);
fileLink.setAttribute('download', fileName);
fileLink.setAttribute('target', '_blank');
document.body.appendChild(fileLink);
fileLink.click();
fileLink.remove();
```

We need to create an HTML object to be able to download the file:

```html
<a href="" download=""></a>
```

### Another option

Open the blob directly into browser

```js
const response = await Axios.get('API_URL/download', { responseType: 'blob' });
const file = window.URL.createObjectURL(new Blob([response.data]));
window.open(file);
```

Firstly, we need to make a request to the server, for that we use Axios. As you can see the URL is `API_URL`, your base URL and `/download` API route, defined above. Need to inform Axios, that the response waited it’s of type `blob`, because the response is not a plain text or JSON. With that response, creates a new object and attach that content on a new `a` HTML tag.

I hope you enjoy the article and it was helpful. If you have any issue or wanna add some notes, please leave me in comments bellow and I’ll try to answer as fast as possible. Please hit the like button below and share this article, it helps me a lot.