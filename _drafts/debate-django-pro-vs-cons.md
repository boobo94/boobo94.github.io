---
title: Debate Django [Pro vs. Cons]
layout: post
categories: tips
date: 2018-12-07 11:56:51 +0000
summary: Django debate
keywords: ''
tags:
- web development
- django
- software architecture
redirect_from: []
cover_image: "/images/boobo94-django-pro-vs-cons.png"

---
Why do you think is a great or a bad idea to use a technology ? We are humans and that makes us to be vulnerable taking personal decisions without trying to understand someone else opinion, so in this article I don't choose for you, but I just let you know some thoughts about subject

I had a real debate with one team mate, from work, which is a great developer and you can see his great work [here](https://github.com/Xzya), about choosing a new technology stack for our new office, the team grows and we really want to improve some stuff there.

> Always must be something to improve!

So he suggested [Django](https://www.djangoproject.com/), which is not bad, but I don't think it fits with me or my interests, but personal opinion doesn't must interfere with rational so I start looking over internet for pros and cons using it. I found some interesting opinions here and I let you feel the flavor:

## PRO

* Monolithic - everything was build to work together with all the stuff around, so every plugin/widget fits perfectly with others from the family
* Everything is maintainable from a single place - ORM through models
* Everything is deployed together
* Because is old there is a good part, people contribute to community
* It’s fit perfectly for big teams because all the developers have like a single way to write code, because that’s in fact django..
* With Django, comes a lot of 3rd party modules, a great REST framework. Works with dozens of additional features that significantly help with user authentication, site maps, content administration, RSS and many others. These aspects help to implement each stage of web development.
* It’s good for small to medium projects
* Speed: Django was designed to help developers create an application as quickly as possible. This includes the formation of ideas, the development and release of the project, where Django saves time and resources at each of these stages. Thus, it can be called the ideal solution for developers for whom the question of deadline is in priority.
* Security: By working in Django, you get protection from security-related errors and jeopardize the project. I mean such common mistakes as SQL injections, cross-site forgery, clickjacking and cross-site scripting. To effectively use logins and passwords, the user authentication system is the key.
* Scalability: The Django framework is best suited for working with the highest traffic. Therefore, it is logical that a large number of downloaded sites use Django to meet traffic-related requirements.

## CONS

* Knowledge - The learning curve
* Is OLD, so every update needs to support old versions, which sometimes is translated as DIRTY FIXES
* Evolves slowly
* There is an admin panel, but this doesn’t mean that fix everything or solve all the problems, you still need to add custom logic which is harder to implement than typing code from scratch, because you need to respect some patterns of Django
* It's ORM, created before SQLAlchemy existed, is now much inferior to SQLAlchemy. It is less flexible, its API is less well thought out, and it is based on the Active Record pattern which is worse than the Unit of Work pattern adopted by SQLAlchemy. This means, in Django, models can “save” themselves and transactions are off by default
* Model relationships have ON DELETECASCADE by default, which is a poor choice because it is not safe ― one might lose data because of this. The default should be safe, and the programmer would declare the cascade when applicable. To avoid cascading, one needs to writeon_delete=models.PROTECT in each ForeignKey.
* Don’t they realize this is actually a bad thing? Django is a tangled monolithic piece of software. The fewer dependencies you have, the more code you have to write yourself. Django is in fact a bad case of Not Invented Here syndrome. Django by itself does not encourage anyone to learn and use standard Python packaging tools.
* Class-based views, again, for a different reason. If you ever want to subclass one of them, to change their behaviour slightly, you will be in pain. This is because they themselves are a deep hierarchy of subclasses. Too deep. So you read about 10 classes trying to figure out where you should interfere. This is such a big problem for every Django user who likes class-based views, that an entire website was created to help understand them:http://ccbv.co.uk ― the very existence of which should be seen as a red flag
* Django didn't have was support for real time web applications
* Bad support for noSQL database
* the code base is huge and newbies might find it difficult to navigate the jargon
* For outsource Django is probably not a good solution, because is not so simple to find developers. But in our case, probably neither Golang isn’t.

### Sites Using Django

* Disqus
* Instagram
* Knight Foundation
* MacArthur Foundation
* Mozilla
* National Geographic
* Open Knowledge Foundation
* Pinterest
* Open Stack
* Bitbucket

##### Sources:

1. [https://www.quora.com/What-are-the-advantages-and-disadvantages-of-using-Django?share=1](https://www.quora.com/What-are-the-advantages-and-disadvantages-of-using-Django?share=1 "https://www.quora.com/What-are-the-advantages-and-disadvantages-of-using-Django?share=1")
2. [https://limestonedigital.co/articles/pros-and-cons-of-django-love-it-or-leave-it/](https://limestonedigital.co/articles/pros-and-cons-of-django-love-it-or-leave-it/ "https://limestonedigital.co/articles/pros-and-cons-of-django-love-it-or-leave-it/")
3. [https://www.djangoproject.com/start/overview/](https://www.djangoproject.com/start/overview/ "https://www.djangoproject.com/start/overview/")
4. [https://www.quora.com/What-are-the-pros-and-cons-of-using-Pythons-Django-instead-of-PHP?share=1](https://www.quora.com/What-are-the-pros-and-cons-of-using-Pythons-Django-instead-of-PHP?share=1 "https://www.quora.com/What-are-the-pros-and-cons-of-using-Pythons-Django-instead-of-PHP?share=1")
5. [https://www.quora.com/What-is-Django-Where-is-it-used-What-is-the-best-site-to-learn-it](https://www.quora.com/What-is-Django-Where-is-it-used-What-is-the-best-site-to-learn-it "https://www.quora.com/What-is-Django-Where-is-it-used-What-is-the-best-site-to-learn-it")
6. [https://hackernoon.com/advantages-and-disadvantages-of-django-499b1e20a2c5](https://hackernoon.com/advantages-and-disadvantages-of-django-499b1e20a2c5 "https://hackernoon.com/advantages-and-disadvantages-of-django-499b1e20a2c5")