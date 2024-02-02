---
title: Manager Flota idea validation
summary: Manager Flota idea validation thread. Manage the car hailing business in one web app.
categories: startup
tags: idea validation business
date: 2023-03-25 09:09:09 +0000
cover: https://cmevo.com/wp-content/uploads/2023/08/manager-flota-thumbnail-meta.jpg
layout: post
---

Managerflota.ro idea validation thread

Manage the car hailing business in one web app.

Features:
- instant payment reports
- employee management
- financial management
- car management

Simple, clean and safe!

Recently I figure out that the car hailing fleet managers in Romania spend a lot of time with the administration part of their business.

The idea: create a simple app that manage their money, expensive, presenting weekly payment reports for each individual driver
First thing first I need to validate this idea.

So is very important to make it official and looks very professional.
Create a simple landing page which describes the app. After I talk with the potential client, I can share with him the link.

Look here (yes it’s in Romanian only)

Manager Flotă pentru Transport Alternativ​ - Cmevo Digital
Singura platformă web de administrare a flotelor de transport alternativ. Poți gestiona șoferii, plățile săptămânale, contracte de închiriere mașini și
https://cmevo.com/ro/manager-flota-pentru-transport-alternativ/
For easier understanding of the platform, created some mock-ups using diagrams.net

The flow of the app is complete. This helped me to understand what is the initial proposal and get some initial screens of the app (presented in the landing page as well)
https://diagrams.net
Next I need to contact potential customers.

Where can I find them?

Easy.. let’s search and see.

Options:

1. Ads websites who post job offers
2. An Romanian authority who manage and regulate this industry

First option seems very hard to follow so I decided to go with second.
I searched if there’s any place where I can find all the authorized fleets, and surprise .. they exists and is even public information.
One issue, I need the contact info of each fleet.

There are many pages with tables with name of the company and authorization number.

If you click on the row of the table, a new page is opened and there are many info like: phone number, company name, number of drivers
But the public info cannot be downloaded.

I can do manual work, and yes I don’t do it, because I’m an engineer and I want an automated way to handle it.

So I used https://webscraper.io/, spend 1-2h to figure out how to configure it with the website, but I succeed.
Now I have all the details about companies. Open the spreadsheet, sort descending by number of drivers and let’s go!

I used the following sitemap to scrape the website:

```json
{"_id":"arr-transport-alternativ","startUrl":["https://licente.arr.ro/alternativ?page=[1-341]"],"selectors":[{"id":"clickable-row","parentSelectors":["_root","clickable-row"],"paginationType":"auto","selector":".clickable-row","type":"SelectorPagination"},{"id":"company-name","parentSelectors":["clickable-row"],"type":"SelectorText","selector":".row .container h3","multiple":false,"regex":""},{"id":"cui","parentSelectors":["clickable-row"],"type":"SelectorText","selector":".card-block > li:nth-of-type(1)","multiple":false,"regex":""},{"id":"county","parentSelectors":["clickable-row"],"type":"SelectorText","selector":"li.list-group-item:nth-of-type(2)","multiple":false,"regex":""},{"id":"locality","parentSelectors":["clickable-row"],"type":"SelectorText","selector":"li:nth-of-type(3)","multiple":false,"regex":""},{"id":"address","parentSelectors":["clickable-row"],"type":"SelectorText","selector":"li:nth-of-type(4)","multiple":false,"regex":""},{"id":"phone","parentSelectors":["clickable-row"],"type":"SelectorText","selector":"li:nth-of-type(5)","multiple":false,"regex":""},{"id":"license","parentSelectors":["clickable-row"],"type":"SelectorText","selector":".list-group-item a","multiple":false,"regex":""},{"id":"drivers-nr","parentSelectors":["clickable-row"],"type":"SelectorText","selector":"h5 b","multiple":false,"regex":""}]}
```

Prepared the message that will be sent to each fleet.
I don’t want to call each one because is very time consuming, sms is not an option. But people use WhatsApp a lot here, so guess what I did?!

Use the api.whatsapp .com?phone=the-number-here&mesaage=your-message-url-encoded
Place the message in spreadsheet and use a concatenation formula between previous url and message

repeat formula for all lines in the table and that’s all..

we have a full prefilled list of messages
All I have to do is to click on each link and then the WhatsApp will automatically open

I just have to press the “send” button

How I organized to send messages.

Create the excel, put all the api messages in trellis checklist.

From phone, with the first click I open the WhatsApp, the message is already prefilled so I only need to send the message. The third click complete checkbox in trellis list.
Sent 14 WhatsApp messages to fleet managers today, Just to test.

Only 3 were interested to quick reply at 3 questions.

Only 2 replied as interested.
I had a phone call with one of them who provided a lot of very useful informations.

They already use an excel template and was trying to find someone and build a custom solution.

This was very helpful to hear. I don’t want to hear “I have a problem, didn’t tried a solutions yet
This first batch was only to see how they respond to the idea and how interact with my message.

Next I’ll sent more messages

2 out of 14 means 14% interest, which is satisfying

This week I have to contact most of them and next one decide if the dev starts or drop the idea.
New day, new updates

Today I contacted more fleet managers and it seems a promising app.

Here’s a big pain, many of them don’t want to go to work each Monday, because that’s the day when they have to do manual work and prepare the payments for their drivers.
This means my app is exactly what they need.

The interest percentage dropped to 13, but I’m still satisfied. There’s no market here so they don’t have a comparative solution.

I’m pretty sure more will want after they see a real demo.
I found some interesting perspective and ideas shared.

Some of them already tried to develop apps for internal use, but without full support for all requirements.
This means a proper validation to me. But I continue to ask them.

I have 160 more to ask, because is a validation and a presale round as well.

I want to find at least 20 customers at least.
The market share is around 6900 companies. But only 200 have a minimum of 20 employees (drivers). And they are the relevant audience.
I had even a partnership proposal.

A big company tried to create a similar app, but only for internal use.

They didn’t completed with all the necessary features and proposed me to work together and do this app.
Currently we have an open proposal, but probably is better to wait until I talk with more potential customers.

This company was very control freaked, tried a similar partnership, and block it because the other side wanted to have full ownership.
Partners are good, but I have already most of the features on the table, I have all the contacts, they don’t offer anything too much.

They want only to use the app and build it around their own requirements.
I contacted fleet managers to validate my idea

• more than 100 contacted
• 9 were interested to buy
• 4 wants to try a demo
• 7 unfinished discussion
• 5 not interested at all
• 40 seen

I have 70 more to contact.
They hate Mondays, because they have to do all the maths.

It sounds like a good idea after all and probably many will come later, after the app is released.

One came today to ask me if the platform is available. So probably they talk between themselves.
Today I had a look over the weekly payment reports, csv export, of car-hailing platforms: Uber, Bolt, Splash. I need to figure out how much time should be invested to aggregate all the data.
Uber seems pretty messy and error-prone.
Bolt and Splash are ok for the moment.
Each driver can have accounts on multiple platforms and their weekly activity has to be aggregated in one place (the manager flota app that I want to build).
The only unique identifier found is the name. Is not the best option, because I already know that existing fleets have more drivers with the same name.

Not all carhailing platforms offer the phone number in their exports, so this was a better option.
Is pretty insane that some people are so happy to share info with you. And spent time explaining what problems they have, how they can be solved, and many more.
Even one of them shared with me their Excel, to present how they automated the calculus with Excel, the structure, and all the needed info.
Another great discovery was that a few of them had the idea of building this app, for internal use or exactly the same product I want to build.

Is this proper validation? 

I coopted a friend to start developing this project.

new repo in @GitHub 

stack:

- nestjs
- vuejs
- docker
setup the codebase for both front and backend + preparing this as a boilerplate for future projects

@NestJS can be so fun. Is anyone using it?
folder structure

I used a monorepo structure for the project

Is so comfortable to work in that same workspace for the system. 

<img src="https://pbs.twimg.com/media/FspbeyNWcAEXads.png" alt="manager flota idea validation">

For the backend, I structured the project as in the picture above.

by default, Nestjs use a module folder structure, but adding a subfolder "modules" and "common" make it much easier to keep the code clean. 

<img src="https://pbs.twimg.com/media/Fspb8M9WYAMDteN.png" alt="manager flota idea validation">


setup the authentication + authorization 

I need a multi-tenant mechanism, achieved using Nestsjs guards 

<img src="https://pbs.twimg.com/media/FspdwpzWYAQly61.png" alt="manager flota idea validation">

It took me less than 6h to do setup the base for the frontend and setup the most of the backend, except the reports module.

Is this MVP or what?
The first meeting finished this evening and we decided what fields have to be calculated for the reports of the company and of the driver.

One more step 

<img src="https://pbs.twimg.com/media/Fs-prtDXwAQPBNZ.jpg" alt="manager flota idea validation">


Implemented report module for managerflota

guard to authorize requests of companies only to their reports, get all reports with pagination, get detailed reports 

<img src="https://pbs.twimg.com/media/FtD3V9cXgAEjbS8.jpg" alt="manager flota idea validation">

only three things remained:
1. Import & aggregates the CSV from providers (bolt, Uber, etc)
2. Subscriptions
3. Finish the UI Admin

Won't lie, thinking to open source Manager Flota. 

And no, is not written in Romanian, is in English.

What should I do?!

Implemented report upload API by a provider. 

And working on the CSV parser. 

<img src="https://pbs.twimg.com/media/FtIpIMRWIAMMAhp.png" alt="manager flota idea validation">

Implemented the csv parser, parse the Uber and bolt reports and interfaces.

Preparing the reports to be saved in the db. 

<img src="https://pbs.twimg.com/media/FtS7zXiWAAAvJ5q.jpg" alt="manager flota idea validation">


Finished the implementation to calculate the reports per company

Next: reports per driver 


<img src="https://pbs.twimg.com/media/FtYjXBzXsAEVNDQ.jpg" alt="manager flota idea validation">

Refactored the ridesharing report module in a better file structured Image

<img src="https://pbs.twimg.com/media/FtniZ9mX0AEbi7h.png" alt="manager flota idea validation">


I have an unsolicited feature (bug) in my code.

Should I fix it?
figure out that food delivery business is identical business model with the ridesharing.

So now there’s more market share 🤩

But for the moment I focus only on the ridesharing part.
Would you choose a local online payment provider vs Stripe for a local service?

Advantages
- small commission
- sustain local businesses
- non vat invoice

Disadvantages
- hard tech integration
- long registration process
What to choose between single domain strategy vs multiple domain strategy?

1/ managerflota .something
2/ managerflota.cmevo .com?

We finished
- the parsers for Bolt and Uber;
- the generated reports per company and per driver

<img src="https://pbs.twimg.com/media/Ft_Nn4qWwAAUUOy.jpg" alt="manager flota idea validation">

Building the product under the same brand as my software agency (Cmevo) can be a good strategy to grow them side by side, but the audience is not the same. And in this case, using managerflota.cmevo.com, doesn't necessary bring a +.

The domain is longer, so harder to remember.

Just bought the domain managerflota.ro for this new SaaS.

<img src="https://pbs.twimg.com/media/Ft_UjCSWIAEF72I.jpg" alt="manager flota idea validation">

The Projects management tool of Github is great.

Help us to keep the project on track and easy manage it. 

<img src="https://pbs.twimg.com/media/Ft_V829X0AEqlEU.jpg" alt="manager flota idea validation">

Update managerflota #buildinpublic

- Implement a guard to check if the company has a subscription
- use subscription guard to restrict access to the reports API
- implement CRUD APIs for subscriptions
- implement CRUD APIs for products
In the beginning the subscription has only one product attached, but in the future will be more so the db architecture

Subscription - products many:many
subscription - payments 1:n 

<img src="https://pbs.twimg.com/media/FuBXpJyWAAs754V.jpg" alt="manager flota idea validation">

Today I had a phone call with another local payment provider in Romania.

Waiting for their approval and probably we'll go together. They don have any SDK for programming languages, but connect via REST API and offer decent documentation.
I finished all the details with the payment provider for managerflota .ro and hopefully, the implementation will be ready in a few days.

meantime we're working on the web app
Decided to implement the CSV export for the reports, and here we are.

Don't worry about those decimals, it's just #javascript #buildinpublic hehe 

<img src="https://pbs.twimg.com/media/FuQeCkUWIBEqcMf.jpg" alt="manager flota idea validation">

Implementing the payment provider for the new SaaS is such a joy

nestjs + typescript + axios + sequelize :D pretty 

<img src="https://pbs.twimg.com/media/FuV_itLXgAIGauF.jpg" alt="manager flota idea validation">

 I had a long Saturday night finishing the payment integration in Managerflota .ro.

The feeling was like a hackathon, staying late until 3:30 in the morning, just to deliver one feature.

It was not needed, but I felt like enjoying the process so much.
Searching on the internet to see if there are other countries where ride-hailing works under this type of business (Ride-hailing company -> fleet -> driver/courier) and it looks like there are multiple countries in Eastern Europe.

That means more market.
The next big thing for Managerflota .ro is to create a stunning website.

What's the best solution for you?
The website is ready for managerflota. ro

here's a sneak peek

Some suggestions?!

used a template from @luciantartea

<img src="https://pbs.twimg.com/media/FuooOceX0AEyJT8.jpg" alt="manager flota idea validation">

New logo :D for managerflota .ro

What do you think? 

<img src="https://pbs.twimg.com/media/Fuoox6nXgAAqUqa.png" alt="manager flota idea validation">

Full joy to create legal pages for you SaaS

How do you feel writing Terms & Conditions? 

<img src="https://pbs.twimg.com/media/FutS7Q8XwAAu15_.jpg" alt="manager flota idea validation">

 This week I finished the website for managerflota and I’m trying to finish the web panel asap.

I had less time to work on it, being only a side project.

But I’m committed to release it until the end of the next week.
I have the tendency to implement a feature in its final shape, but I force myself to deliver only the minimum required at the current stage.

Later I can get feedback from customers and do it how they need. 

<video>
<source src="https://video.twimg.com/tweet_video/Fu3tLVtWwAI45Dg.mp4">
</video>

The first sneak peek from the managerflota .ro web platform for car-hailing fleet managers

Implemented:
- card preview
- products list
- subscriptions list
- payments list
- download invoice

Almost there. 

<img src="https://pbs.twimg.com/media/Fu5uzziX0AEmNe-.jpg" alt="manager flota idea validation">

managerflota.ro is released in beta.

It took me some time to make some small improvements, but my first customer is testing. I offered him an extended trial for consultation and feedback.

Hope to migrate the payment gateway to prod soon (still in sandbox) #buildinpublic

I applied a lot of small improvements today to Manager Flota

- refactored the report system
- changed the Uber parser
- show more reports data on the UI
- reorganize the UI
- retested everything

Can’t wait to how early adopters sees it

Any advice how to approach first users?
In the past week, I prepared all the details for managerflota.ro

- bug & fixies
- export reports
- export salary slips
- show more details in the UI
- improve the UI
- improve SEO of the website

Still waiting for the payment provider to validate the contract. 

<img src="https://pbs.twimg.com/media/FvoVdqmX0AAHOj1.jpg" alt="manager flota idea validation">

<img src="https://pbs.twimg.com/media/FvoVdqiWIBMDWEc.jpg" alt="manager flota idea validation">

After talking with my first customer, I decided to create a "how to section" on the website.

They had some questions and is much easier for me and effective for customers to check how the calculus are made and how they can handle different operations. 

<img src="https://pbs.twimg.com/media/FvoVdqiWIBMDWEc.jpg" alt="manager flota idea validation">

<video>
<source src="https://video.twimg.com/tweet_video/FvoXRTwX0AAEWZN.mp4">
</video>

 Great news for managerflota, because I just signed the contract for the payment provider.

These local payment provider are doesn’t have a flow less process as Stripe.

Waiting the production credentials

#managerflota #buildinpublic
I created a gif that shows how easy you can import the provider’s report in Manager Flota.

It took me 2-3s to calculate reversing for 200 drivers. Usually the fleet manager spends between 1-8h per week to do them.

#managerflota #buildinpublic

<video>
<source src="https://video.twimg.com/tweet_video/FvssCEiaEAIOe5G.mp4">
</video>

According to Romanian & European laws every website has to show the online dispute’s authority banners, somewhere.

<img src="https://pbs.twimg.com/media/FvssYyOaAAA_43W.jpg" alt="manager flota idea validation">

 The managerflota .Ro website was indexed by Google after a few days.

Already on 16th position for 2 top keywords.

Any advice?

#managerflota #buildinpublic
The great news: the payment gateway is in production mode

The bad news: the payment cannot be made successfully

The joy of launching software platforms

#buildinpublic #managerflota
The problem seems to be that my sales manager added to my account only the domain managerflota .ro, but I'm sending the request from a subdomain of this domain.

Now I'm waiting... is a mess 😅

The payment provider had to press 1 button and I waited for almost 24h, nothing yet, after that 1 week validation...

So I just try to work with local environment to sustain ourselves, but I cannot start selling ...

6th position on google for the main keyword for managerflota in one week

that's awesome ... preparing a small video demo to help clients more and keep them longer on the website

<img src="https://pbs.twimg.com/media/Fv1iekeXgAIjzMR.jpg" alt="manager flota idea validation">

took 24h+ for payment provider to press a checkbox

so tomorrow I can contact potential customers in mass to see if they want to buy.

officially we support payments on managerflota.ro

Most probably I need to increase prices at some point, but how can I do that without upsetting customers?

So I decided to show the current price as discounted. In that way, they can feel better and can understand that's a real deal currently.

<img src="https://pbs.twimg.com/media/Fv7WFZhWIAE3uGJ.jpg" alt="manager flota idea validation">

 Today I started to outreach potential customers for Manager Flota.

Prepared a FB ads campaign to target them.

Created a new article explaining how the calculus is made mathematically by the platform (in case they need to understand or double-check)

#buildinpublic #managerflota
We have 9 companies registered from the last week, and all are in Trial mode.

A few of them started to onboard their drivers in the app, to make the calculus later.

I keep in touch with customers and help them if needed.

#buildinpublic #managerflota
Move fast and build fast the product

3 hours ago discussed with another client who requested a way to filter the drivers with negative balances or those with 0 balances from the report.

Now implemented! hehe!!!

<img src="https://pbs.twimg.com/media/FwMVkO0WIAE84-_.jpg" alt="manager flota idea validation">

We added one new provider for ManagerFlota today, Splash

We have one more remaining, and we support all of them in Romania.

Mwhaha ... is such a joy to build your own product.

<img src="https://pbs.twimg.com/media/FwQEfg-XwAMMsZE.jpg" alt="manager flota idea validation">

 I haven't posted anything about Manager Flota, so here's the update:

- first paying customer
- many people already in 14days trial
- a lot of improvements and extra features added as feedback from existing customers
- created a blog on the website

#buildinpublic #managerflota
What is funny about doing marketing content for Manager Flota is that the main keywords are easy to index. I really like to create a blog post and in one week be on the first page of Google.

#buildinpublic #managerflota

<img src="https://pbs.twimg.com/media/Fwf603eXwAIzacv.jpg" alt="manager flota idea validation">
<img src="https://pbs.twimg.com/media/Fwf603nWIAEnhwH.jpg" alt="manager flota idea validation">
<img src="https://pbs.twimg.com/media/Fwf603iWIAUlSiN.jpg" alt="manager flota idea validation">

 That moment when your project managerflota.ro gets a 100 score from @ahrefs and you know it pays for the whole morning spent.

Can't wait to see the stats for the next week, after fixing all the issues.

<img src="https://pbs.twimg.com/media/Fwkbz5AWIAAH2P0.jpg" alt="manager flota idea validation">
