---
layout: post
title: Working with legacy code in a world full of fake developers
summary: Working with legacy code is the hardest part of the entire career of any developer.
categories: abstract
tags:
- webdev
- motivation
- programming
- codequality
date: 2021-01-13 09:09:09 +0000
---

Working with legacy code is the hardest part of the entire career of any developer. I think there is no developer who did not face some [legacy code](https://www.techopedia.com/definition/25326/legacy-code). How to deal, where to complain and why to do is the scope of my article.

In this article, I’ll present my experience with legacy code and how I gained the gold medal to have the opportunity of working on an old project. In my experience, I’ve been working on many projects where the legacy code was present. At some point, I change my job and I start working for a financial project. The project is not so old, but the design of architecture looks strange and old.

## The roadmap of understanding the legacy code

Usually working on legacy code looks strange to you at the beginning. Trying to understand the project over and over again, can frustrate you after a period of time. You become angry and mad about your project. Then you are trying to think that you have to change something there. You consider refactoring the best idea for that project. And you continue to understand the project with this idea in mind. And you probably can have some luck and get some budget to start a refactoring processor to receive a negative response.

## Dead legacy code

When I started to understand the project at the beginning I had no clue what they tried to solve. The code is too hard to be understood and you think the problem is on you. I started to understand the application, but the implementation still looks very hard to me. The way of doing some functions or APIs is contra intuitive and I cannot figure out why to complicate a flow in that why. I decided then that I can refactor some functions or some tests. But in the end, architecture which uses a lot of components and libraries, outdated also, is too hard to be maintained or refactored.

## Refactor the code is a possibility

Sometimes the refactoring is possible when not all the project is built in a though manner. I had functions that can be implemented in a cleaner manner. Usually, if the project is well structured and the code is scope divided, a refactoring is feasible. Maybe only a side of the project is not very well split by scope and by writing some unitary tests and refactoring the code you can achieve the same functionality with better code.

## How to refactor

As I mentioned before, the best way to keep the integrity of application while you refactor some code is by writing tests. Before to start the refactoring, try to have the write tests. Converting the functionality with tests will assure you some confidence. While and after refactoring your tests can guarantee the integrity of functionality.

## When to don’t refactor

Not all the time refactoring is a good thing. When your code is too complicated, simply rewriting the application or a module looks like the best option. But you can face risks. The risks can make the project to fail entirely. Without an analysis of the risks, you should not start the refactoring process. I tried to apply the solution on my project but the client doesn’t want to invest money in this subject.

This problem maybe can frustrate you but remember that is not your app so you’re not in charge of decisions. You still need to inform your client about the options available and the risks involved.

## Keep legacy code as long as possible

If your client doesn’t want to offers you the chance to refactor the code, even if you explained the code will be impossible to maintain at some point, sooner or later in the future, don’t worry. Sometimes the client refuses to invest money in something that they think is still valuable, even if you know that the production costs will be increased with every dirty fix applied. It’s time to run. I’m not kidding, I think this is the best solution if after you tried many things they are not connected with reality.

Always the clients are asking about timing and cost and they disagree with you. And you are asked what we can remove or how to be divided into many sprints before to deliver functionality. But that’s how they think because they need to convert costs in profit. That’s not something bad.

## What to try before to run

Not all the time the client is the bad wolf that doesn’t want to do things just because the client is always right rule. They think differently and they are doing things differently. Sometimes is your duty to push them to understand what the legacy code is and which can be the impact of keeping that in production.

### Try to talk the client’s language

As I mentioned before, the client is trying to work with sums. They are trying to convert costs into profit. This is your gold card and probably the only one which can make them rethink.

How should you do it? I consider that before going there and talking about you, prepare your story. If you need to get instant results to try to make your homework. The client doesn’t care if for you is harder to work with angular 1, instead of working with the last version. They don’t care if you use a state management system or you are handling this by yourself. For sure they don’t care if your backend is full of chaos or if there is a good structure. But then, what you should do? Talk about risks and costs.

Prepare examples of how much time you have to spend on a specific feature with the actual implementation and how easy and fast it will be with well-written code. You can talk about the risk of not delivering at the time or how this can impact other areas from the project which theoretically have nothing to do with that feature. You can explain how long the refactoring will take and how much time can be saved in the future.

The last thing you can talk about is the biggest risk that legacy code can be for the project. If you consider for example that the project is dead soon in the current form you should talk about this. You can talk about competitors and how fast they can go over because of deliverability and maintainability. It is very hard to go on top, but very fast to go down. No one doesn’t care that you have even the latest technologies if the product has bugs and your team has to move a rock for every release.

## It’s time to go away

Some clients, CEOs or whatever is in charge of a project maybe doesn’t want to listen to the development team. That’s a very sad situation but is possible.

If the future plans for the company are to try to spin the ball and all of you know that the ball is very sensitive and can be broken at any moment, maybe it is the time to go away.

If you are that kind of developer who is lives with their work and challenges itself to become better and better, maybe it is the best solution for you to take your backpack and [find another place](/developer-story/i-left-the-company-after-3-years/) where to live.

This kind of place where the app is not so good and you work with the soul, trying to improve the code, but the client doesn’t care can be very toxic. This can lead you to procrastination and kills your creativity.

## Conclusion

If you’re working with legacy code I suggest you do something about this. Try to understand better the product and maybe to refactor it. I wish you good luck and let me know in the comments your story about trying to deal with legacy code.