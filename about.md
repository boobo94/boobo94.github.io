---
layout: page
title: About me
permalink: /about/
tags: about
---


## Who am I?

Tech Startup Founder | Software Engineer | Building SaaS for Ridesharing Fleets and Loyalty System App for Coffee Shops | Helping Businesses Grow

## How I look like

<img src="{{ site.baseurl }}/images/me-02.jpg" alt="Bogdan Alexandru Militaru" class="avatar"  style="max-height: 400px;border-radius: 50%;display: block;margin: 0 auto;"/>

## Portfolio

<div class="portfolio">
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
            <p class="post-summary">{{ post.summary }}</p>
        </div>
        {% endfor %}
    </div>
</div>

## Personal

Vorbitor de limba romana. I speak English too.
