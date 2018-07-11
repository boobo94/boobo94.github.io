---
title: How to build a skill with Amazon Alexa
layout: default
categories: articles
date: 2018-07-09 00:00:00 +0000
tags: ai
description: How to build an Alexa skill from scratch with TypeScript. Discover more
  from inside.
---
Hi guys,

Recently, I started a new project, for Spanish market and at this moment that market it's in the beginning phase, in beta, I'll probably disclosure more in the future posts. The idea of this article it's to help you to develop a skill from scratch using a starter pack. In this article I want to present more about [\*\*alexa-skill-starter-pack-typescript \*\*](https://github.com/boobo94/alexa-skill-starter-pack-typescript)from my github account. I dont' want to discuss to much about this starter pack, because you can find more details how to use it or where to start from in the [README.md](https://github.com/boobo94/alexa-skill-starter-pack-typescript/blob/master/README.md)

When I recently started the research to build this, I had few questions that I want to answer to you here.

## Where to start from ?

When I started it was very tough for me to understand where to start from, what to read first or how to know what I need to learn. If you are here, probably you started already to read some documents from Amazon and guess what ?! you already discovered that Amazon have a comprehensive documentation about [how to build a custom skill](https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html) and that documentation explain very well how to do it, but you don't want to read all just to understand basics.

I started to read about what it's an [Invocation Name](https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html), [Intents](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html#intents-and-slots), [Intent Slots](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots), [Utterances](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html#sample-utterances), [Slot Types](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots). So if you press the links, you'll find the official definitions from Amazon, but let's explain more simple than that.

### Invocation Name

The invocation name represents the name used to invoke your skill. So if for example you want to build a skill which presents news about technology, a good invocation name can be "technology news" or "technology facts", so this it's the name which will open your skill, like you enter the name of a website in the web browser to invoke that website.

There are some requirements about choosing the invocation name and you can read them [here](https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html#cert-invocation-name-req).

### Intents

So for the moment we know how to open the skill, but now we have the skill, how you can ask Alexa to open a section. Referring to the example presented before, we have a skill about technology news, but this it's a generic subject. If you want that your skill to be able to presents informations about Artificial Intelligence, Programming Languages, New Smartphones etc.., you need an intent for each of these departments. So when users says 'Alexa, ask technology news', she will knows that he wanted news from my skill, but after that let's say that user wants news about Artificial Intelligence and he will say something like 'Give me news about Artificial Intelligence', this sentence it's an utterance, but we will discuss in the next subchapter, but this it's an utterance defined under Artificial Intelligence intent, so Alexa will know, now, that my intention it's to get information about Artificial Intelligence.

Let's recap, an intent represent an action wanted by a user, it's like a definitory section. [Here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#intent-name) you can find some rules to choose the best name for your intents. As well, there are some built in intents which can be found [here](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html).

### Utterances

As I already told you an utterance represents a sentence which it's part from an Intent and define particularly that Intent. This it's a very important part, that you should focus on and think of all variations for an idea and multiple ways that a user can ask the same idea. For example, if I want news about Artificial intelligence you can have multiple way to open that intent like:

1. Offer me news about Artificial Intelligence
2. Give me informations about Artificial Intelligence
3. I want news about AI
4. More information about AI

Don't be lazy and please not overestimate your user, because not all of them are smart or maybe they are not used with AI, so please have in mind that your user can be very stupid and in that way, you'll make it the best. Add as much as possible utterances to cover all the variations that a user can ask for an intent.

If you want to know best practices and recommendations please [visit this](https://developer.amazon.com/docs/custom-skills/best-practices-for-sample-utterances-and-custom-slot-type-values.html) or rules [here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#h3_intentref_rules).

### Intent Slots

So now, you know what it's an intent and an utterance, but an intent slot it's like a variable. For example if we have an intent to get distance between two points, point a to point b, we will have utterances like:

1. Give me distance from Paris to New York
2. How long it's between Budapest to Bucharest

So we can identify two variables, _pointA_ and _pointB_, now we can rewrite rules like:

1. Give me distance from {pointA} to {pointB}
2. How long it's between {pointA} to {pointB}

Alexa will match the values with slots. You can read more [here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots), how to identify slots inside utterances or best practices. A slot can have a type, so if you want to know how to assign a slot type to a slot read [here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#assign-slot-types).

### Slot Types

A slot type represents the type of slot, it's like a variable type. There are [default value](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html) builds by Amazon. If you want to discover best practices you can find [here]()

You can exercise more by doing on your on in the [Developer Console](https://developer.amazon.com/alexa/console/ask)

## How to run a server locally ?

ngrok

## Should I choose Lambda Function or HTTPS server ?

Depends very much by your skill, but probably the most of you can use Lambda Function.

Why to choose Lambda:

* you don't need to administrate any resource
* don't need SSL certificate
* don't need to verify where requests come from
* AWS Lambda run only when a request comes
* First 1M requests per month are free. [Read more about pricing](https://aws.amazon.com/lambda/pricing/)

Read [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#about-lambda-functions-and-custom-skills) more about connecting Alexa with AWS Lambda or [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#create-a-lambda-function-for-an-alexa-skill) to create a Lambda for Alexa.

Requirements for HTTPS Web Service:

* The service must be Internet-accessible.
* The service must adhere to the [Alexa Skills Kit interface](https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html).
* The service must support HTTP over SSL/TLS, leveraging an Amazon-trusted certificate.
* The service must accept requests on port 443.
* The service must validate that incoming requests are coming from Alexa.

If you want to read more about configuration and requirements read [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html).

## Where to start from the coding ?

chose an sdk

write handlers

set up environment

## Which sdk to use v1 or v2 ?

### Resources

     https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b
     https://github.com/balassy/aws-lambda-typescript
     https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html
     https://ngrok.com/
     https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
     https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html
     https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html