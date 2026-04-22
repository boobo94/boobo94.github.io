---
layout: post
title: "🕹️ My Retro Gaming Vault"
summary: "A collection of classic games to play in your browser."
categories: abstract
tags: games
date: 2026-04-21 09:00:00 +0000
games:
  - title: "Chicken Invaders"
    url: "https://www.gamenora.com/splash/chicken-invaders/"
    image: "https://www.gamenora.com/upload/games/thumbnails/Chicken%20Invaders.webp"
  - title: "Coming Soon..."
    url: "#"
    image: "https://tse4.mm.bing.net/th/id/OIG1.sGUky.3a012Ess9NN72F?pid=ImgGn"
######## How to add your next game: ##################
#  - title: "New Retro Game"
#    url: "https://link-to-game.com"
#    image: "https://link-to-screenshot.jpg"
######################################################
---

Welcome to my retro collection. Click on any tile to launch the game in a new window.

<div class="game-grid">
  {% for game in page.games %}
    <a href="{{ game.url }}" target="_arg-blank" class="game-card" {% if game.url == "#" %}style="pointer-events: none; opacity: 0.6;"{% endif %}>
      <div class="game-card-inner">
        <div class="game-image" style="background-image: url('{{ game.image }}');"></div>
        <div class="game-info">
          <span class="game-title">{{ game.title }}</span>
          <span class="game-status">Click to Play</span>
        </div>
      </div>
    </a>
  {% endfor %}
</div>

<style>
  /* Grid Container */
  .game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  /* The Game Card */
  .game-card {
    text-decoration: none !important;
    color: inherit !important;
    display: block;
    transition: transform 0.3s ease;
  }

  .game-card-inner {
    background: #222;
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid #333;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  }

  /* Hover Effects */
  .game-card:hover .game-card-inner {
    transform: translateY(-10px);
    border-color: #ff0055; /* Retro Neon Pink */
    box-shadow: 0 10px 25px rgba(255, 0, 85, 0.4);
  }

  /* Image Area */
  .game-image {
    height: 150px;
    background-size: cover;
    background-position: center;
    border-bottom: 2px solid #333;
  }

  /* Text Area */
  .game-info {
    padding: 15px;
    text-align: center;
    background: linear-gradient(to bottom, #222, #111);
  }

  .game-title {
    display: block;
    font-weight: bold;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 5px;
  }

  .game-status {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #ff0055;
    letter-spacing: 1px;
  }

  /* Responsive Tweak */
  @media (max-width: 600px) {
    .game-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
