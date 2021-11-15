---
title: Linode Object Storage usage in NodeJS
summary: Simple use case of Linode Object storage in NodeJS with AWS-SDK for S3. Learn how to handle Linode Objects in plain Javascript.
categories: tutorials
tags: tag1 tag2
date: 2021-11-15 09:09:09 +0000
cover: https://www.linode.com/wp-content/uploads//2019/06/linode-icon-block-storage-2c.svg
layout: post
---

Simple use case of Linode Object storage in NodeJS with AWS-SDK for S3. Learn how to handle Linode Objects in plain Javascript.

```js
import { Credentials } from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

const s3Client = new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY,
  }),
});

export async function uploadFileToObjectStorage(base64Data, path, fileName, fileType, extension) {
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key: `${path}/${fileName}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `${fileType}/${extension}`,
  };

  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const { Location } = await s3Client.upload(params).promise();
  return Location;
}

export async function deleteFileFromObjectStorage(url) {
  const Key = url.split(`${process.env.LINODE_OBJECT_STORAGE_ENDPOINT}/`)[1];
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key,
  };

  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
  // eslint-disable-next-line consistent-return
  return s3Client.deleteObject(params).promise();
}
```