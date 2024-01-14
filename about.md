---
layout: page
title: About me
permalink: /about/
tags: about
---


## Who am I?

I'm the one who I wanna be.

## How I look like

Hei you can find me with this avatar in the most communities on the web.

<img src="{{ site.baseurl }}/images/me-02.jpg" alt="Bogdan Alexandru Militaru" class="avatar"  style="max-height: 400px;border-radius: 50%;display: block;margin: 0 auto;"/>

## Portfolio

<div class="portfolio">
    <h1>Portfolio</h1>
    <div class="posts" id="search-container">
        {% for post in site.portfolio %}
        <div class="post">
            <a href="{{ post.url | prepend: site.baseurl }}" class="post-link">
                {% if post.cover %}
                <span class="cover">
                    <img src="{{ post.cover }}" alt="{{ post.title }}"/>
                </span>
                {% endif %}
                <h3 class="post-title">{{ post.title }}</h3>
            </a>
            <span class="post-summary">{{ post.summary }}</span>
        </div>
        {% endfor %}
    </div>
</div>

## Personal

Vorbitor de limba romana. I speak English too.