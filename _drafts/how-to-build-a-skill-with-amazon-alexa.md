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

Recently, I started a new project, for Spanish market and at this moment that market it's in the beginning phase, in beta, I'll probably disclosure more in the future posts. The idea of this article it's to help you to develop a skill from scratch using a starter pack. In this article I want to present more about [**alexa-skill-starter-pack-typescript **](https://github.com/boobo94/alexa-skill-starter-pack-typescript)from my github account. I dont' want to discuss to much about this starter pack, because you can find more details how to use it or where to start from in the [README.md](https://github.com/boobo94/alexa-skill-starter-pack-typescript/blob/master/README.md)

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

As I already told you an utterance represent a sentence which it's part from a n Intent and define particularly that Intent. 

[https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html "https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html")

### Intent Slots

### Slots

You can exercise in the [Developer Console](https://developer.amazon.com/alexa/console/ask)

## How to run a server locally ?

## Should I choose Lambda Function or HTTPS server ?

## Where to start from the coding ?

## Which sdk to use v1 or v2 ?

###  Resources

     https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b
     https://github.com/balassy/aws-lambda-typescript
     https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html
     https://ngrok.com/
     https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
     https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html
     https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html