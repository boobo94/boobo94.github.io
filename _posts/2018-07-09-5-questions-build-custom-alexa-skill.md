---
layout: post
title: "5 common questions about how to build an Alexa Skill (Amazon Alexa)" 
date: 2018-07-09 00:00:00
summary: "5 common questions how to build an Alexa Skill. Read about intents, utterances, slot types, invocation name. How to run a server locally or why to deploy on AWS Lambda Function over HTTPS servers."
categories: ai
tags: ai alexa-skill
redirect_from: 
    - /ai/alexa-skill/2018/07/09/how-to-build-a-skill-with-amazon-alexa/
    - /ai/2018/07/09/alexa-skill/
cover: /images/alexa-skill.jpg
---

## 1. Alexa Skill, where to start from ?

The idea of this article it's to help you to develop a skill from scratch or based on a starter pack, this is an example [alexa-skill-starter-pack-typescript](https://github.com/boobo94/alexa-skill-starter-pack-typescript) from my github account. I dont' want to discuss too much about this starter pack, because you can find more details how to use it or where to start from in the [README.md](https://github.com/boobo94/alexa-skill-starter-pack-typescript/blob/master/README.md). So if you want to learn more about how to build alexa skill, keep reading. 

Recently, I started a new project, for the Spanish market. At this moment the market it's in the beginning phase, I'll probably disclosure more details in the future posts, but for the moment it's not very important. . Don't 

When I recently started the research, I had few questions about we will learn below:

## 2. How to build Alexa Skill ?

When I started it was very tough for me to understand where to start from, what to read first or how to know what I need to learn. If you are here, probably you started already to read some documents from Amazon and guess what ?! you already discovered that Amazon have a comprehensive documentation about [how to build a custom skill](https://developer.amazon.com/docs/custom-skills/understanding-custom-skills.html) and the documentation explains very well how to do it. You don't have to read all, just to understand basics, keep reading this for help.

I started to read about what it's an [Invocation Name](https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html), [Intents](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html#intents-and-slots), [Intent Slots](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots), [Utterances](https://developer.amazon.com/docs/custom-skills/create-the-interaction-model-for-your-skill.html#sample-utterances), [Slot Types](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots). So if you check the links, you'll find the official definitions on Amazon Alexa Developers Portal, but let's explain them more simple than that.

### Invocation Name

The invocation name represents the name used to invoke your skill. So if for example you want to build a skill which presents news about technology, a good invocation name can be "technology news" or "technology facts", so this it's the name which will open your skill, like you enter the name of a website in the web browser to open that website.

There are some requirements about choosing the invocation name and you can read them [here](https://developer.amazon.com/docs/custom-skills/choose-the-invocation-name-for-a-custom-skill.html#cert-invocation-name-req).

### Intents

So for the moment you know how to open the skill, but now we have the skill, how you can ask Alexa to open a section? Referring to the example presented before, we have a skill about technology news, but this it's a generic subject. If you want that your skill to be able to present informations about Artificial Intelligence, Programming Languages, New Smartphones etc.., you can create an intent for each of these departments. So when users says 'Alexa, ask technology news', Alexa will start a new session for my skill, but after that let say that user wants news about Artificial Intelligence and he will say something like 'Give me news about Artificial Intelligence' (this sentence it's an utterance, we'll discuss in the next chapter about them), defined under Artificial Intelligence intent, so Alexa will know, that my intention it's to get information about Artificial Intelligence.

Let's recap, **an intent** represent an action wanted by user, what he needs. [Here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#intent-name) you can find some rules about how to choose the best name for your intents. As well, there are some built in intents which can be found [here](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html).

### Utterances

As I already told you, an utterance represents a sentence which it's part from an Intent and define particularly that Intent. This it's a very important part, that you should focus on and think for all variations which point to the same idea or multiple ways that a user can ask the same thing. For example, if I want news about Artificial intelligence, you can say it as below:

1. Offer me news about Artificial Intelligence
2. Give me informations about Artificial Intelligence
3. I want news about AI
4. More information about AI

Don't be lazy and please not overrate your user, because not all of them are smart or maybe they are not used with AI, so please have in mind that your user can be not so clever and in that way, you'll make it better. Add as much as possible utterances you can to cover all the variations that a user can ask for an intent.

If you want to know best practices and recommendations please [visit this](https://developer.amazon.com/docs/custom-skills/best-practices-for-sample-utterances-and-custom-slot-type-values.html) or rules [check here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#h3_intentref_rules).

### Intent Slots

So now, you know what it's an intent and an utterance, but an **intent slot** it's like a variable. For example if we have an intent to get distance between two points, point a to point b, we will have utterances like:

1. Give me distance from Paris to New York
2. How long it's between Budapest to Bucharest

So we can identify two variables, _pointA_ and _pointB_, now we can rewrite rules like:

1. Give me distance from {pointA} to {pointB}
2. How long it's between {pointA} to {pointB}

Alexa will match the value in his slot. You can read more about how to identify slots inside utterances or best practices [here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#identify-slots). A slot can have a type, so if you want to know how to assign a slot type to a slot [read here](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#assign-slot-types).

### Slot Types

A slot type represents the type of slot, it's like a variable type. There are [default value](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html) builds by Amazon. If you want to discover best practices you can find [here](https://developer.amazon.com/docs/custom-skills/best-practices-for-sample-utterances-and-custom-slot-type-values.html#h3_custom_slot_values)

You can exercise more by doing on your own in the [Developer Console](https://developer.amazon.com/alexa/console/ask)

<iframe src="https://www.youtube.com/embed/q-mrSBrlDso" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## 3. How to run a server locally ?

You can do it simple, just by downloading \[ngrok\](https://ngrok.com/) and create a server with the following code

```js
import * as express from "express";
import * as bodyParser from "body-parser";
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";
import { RequestEnvelope } from "ask-sdk-model";
import { AddressInfo } from "net";

import { handler } from './lambda/custom/index'

// Convert LambdaFunction to RequestHandler

function ConvertHandler(handler: LambdaHandler): express.RequestHandler {
    return (req, res) => {
        handler(req.body as RequestEnvelope, null, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(result);
        });
    };
}

// create server
const server = express();
const listener = server.listen(process.env.port || process.env.PORT || 3000, function () {
    const { address, port } = listener.address() as AddressInfo;
    console.log('%s listening to %s%s', server.name, address, port);
});

// parse json
server.use(bodyParser.json());

// connect the lambda functions to http
server.post("/", ConvertHandler(handler));
```

Take a look at [this](https://github.com/boobo94/alexa-skill-starter-pack-typescript) alexa open source project.

Open Terminal and run

`$ ./ngrok http -bind-tls=true -host-header=rewrite 3000`

Copy the https link and go to [Alexa Console](https://developer.amazon.com/alexa/console/ask/test/amzn1.ask.skill.15bebd4e-4520-4a06-8fb7-57149258f4d0/development/en_US), under Endpoint section, select **TTPS** and paste the link in **Default Region** input field. From the below dropdown, choose **My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority**.

**Every time when you run the ngrok, you need to update the endpoint url.**

## 4. Should I choose Lambda Function or HTTPS server ?

Depends by your skill, but probably the most of you can use Lambda Function.

#### Why to choose Lambda:

* you don't need to administrate any resource
* don't need SSL certificate
* don't need to verify where requests come from
* AWS Lambda run only when a request comes
* First 1M requests per month are free. [Read more about pricing](https://aws.amazon.com/lambda/pricing/)

Read [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#about-lambda-functions-and-custom-skills) more about connecting Alexa with AWS Lambda or [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#create-a-lambda-function-for-an-alexa-skill) to create a Lambda for Alexa.

#### Requirements for HTTPS Web Service:

* The service must be Internet-accessible.
* The service must adhere to the [Alexa Skills Kit interface](https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html).
* The service must support HTTP over SSL/TLS, leveraging an Amazon-trusted certificate.
* The service must accept requests on port 443.
* The service must validate that incoming requests are coming from Alexa.

If you want to read more about configurations and requirements check [here](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html).

## 5. Where to start coding from ?

Before to start any code, I suggest you to choose an SDK, if you want to code in javascript, **SDK v2** it's a better option than v1 and after that, you can take a look throw other alexa open source projects. You can find basic examples on [Alexa's Github profile](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs), but can search for more: [alexa-typescript-hello-world](https://github.com/Xzya/alexa-typescript-hello-world), [alexa-romanian-radio](https://github.com/Xzya/alexa-romanian-radio), [alexa-lambda-typescript](https://github.com/Xzya/alexa-lambda-typescript). I really recommand you to choose an sdk because it's more easier to interact with Amazon Alexa API.

## Summary

What you've learned here will offer you a better overview about how to create alexa skills. You've learned about alexa skill intents, alexa slot types, alexa skill utterances, how to run a server locally and why to choose a Lambda function.

What alexa skill do you want to build ? Please leave me a comment and I can offer you more advices.

### Resources

- <https://medium.com/@cnadeau_/allow-alexa-to-run-your-locally-hosted-skill-1786e3ca7a1b>
- <https://github.com/balassy/aws-lambda-typescript>
- <https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html>
- <https://ngrok.com/>
- <https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html>
- <https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html>
