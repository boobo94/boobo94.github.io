---
layout: post
title: "NodeJS Tests with microservices, Jenkins and Docker"
categories: webservice
summary: How I achieved testing nodejs project. Hi, this is my journey trying to add tests for a microservice architectured built with nodejs. I would need to use Jenkins and Docker.
keywords: ''
tags:
- nodejs
- jenkins
- docker
date: 2021-01-08 11:12:21 +0000

---

Hi, this is my journey trying to add tests for a microservice architectured built with nodejs. I would need to use Jenkins and Docker. 

This article is a dev log starting from nowhere (is not totally true, but I would like to make it sounds worst than in reality). I have an microservice architecture which connects its services through RabbitMQ, message broker and redis in place. So running integration tests, I need an environment capable of this.

I don't know which is the right approach, but time will be my fellow.

I read few things trying to setup the testing environment:

- https://dev.to/mrfrontend/how-to-mock-an-api-with-random-data-from-nodejs-dda
- https://scotch.io/tutorials/nodejs-tests-mocking-http-requests
- https://codersociety.com/blog/articles/contract-testing-pact
- https://martinfowler.com/articles/microservice-testing/
- https://hackernoon.com/set-up-jenkins-ci-in-docker-container-and-run-your-tests-inside-their-own-container-a-how-to-guide-7h8u32yi

The default test file, to check that mocha, chai, nuxt and axios works as expected is this:

```js
import nock from 'nock'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import axios from 'axios'

describe('Initial test', function () {
  it('should be equals with 2', function () {
    expect(1 + 1).equals(2)
  })
})

describe('Test Nock', function () {
  const baseUrl = 'https://example.com/'

  it('should use nock for request', async function () {
    const expectedResponse = { hello: 'world' }
    nock(baseUrl).get('/').reply(200, expectedResponse)

    const response = await axios(baseUrl, {
      method: 'GET',
      url: '/'
    })

    expect(response.status).to.be.equals(200)
    expect(response.data).to.be.deep.equals(expectedResponse)
  })
})
```