---
layout: page
title: About me
permalink: /about/
tags: about
---

## Who am I?

<button id="speakBtn" type="button">Read aloud</button>
<button id="stopBtn" type="button">Stop</button>

### On short short

Tech Startup Founder | Software Engineer | Building SaaS for Ridesharing Fleets and Loyalty System App for Coffee Shops | Helping Businesses Grow

### On short

<div id="speechContainer">
I'm passionate about leveraging technology to drive innovation and efficiency in today's dynamic digital landscape. With over a decade of experience in software engineering, I've had the privilege of leading Cmevo Digital, a cutting-edge software agency dedicated to delivering top-notch solutions.

As the founder of two successful SaaS applications, ManagerFlota and LoyalXpert, I've been at the forefront of revolutionizing fleet management and customer loyalty strategies. ManagerFlota stands as the premier platform in Romania, empowering ridesharing and food delivery businesses with streamlined operations. Meanwhile, LoyalXpert empowers companies to foster strong client relationships through tailored discounts and bonuses, ensuring lasting loyalty and satisfaction.

My ethos revolves around the relentless pursuit of progress. I believe in the transformative power of automation through software, continuously striving to make each day better than the last. Whether it's optimizing processes, developing innovative solutions, or envisioning groundbreaking technologies, I thrive on pushing the boundaries of what's possible.

Beyond the realm of software, you can find me indulging my passions outside the digital sphere. I relish the freedom of riding my bicycle, finding solace in the open road. Additionally, I enjoy the thrill of driving, where every journey holds the promise of new adventures. Above all, I'm fueled by a deep-seated desire to make a meaningful impact and contribute to a brighter, more interconnected world.

Let's connect and explore how we can collaborate to drive positive change through technology. Together, let's embark on a journey to transform ideas into reality and shape the future one innovation at a time.

</div>

## How I look like

<img src="{{ site.baseurl }}/images/me-03.jpg" alt="Bogdan Alexandru Militaru" class="avatar"  style="max-height: 400px;border-radius: 50%;display: block;margin: 0 auto;"/>

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

<script>
(function () {
    const speakBtn = document.getElementById("speakBtn");
    const stopBtn = document.getElementById("stopBtn");
    const textEl = document.getElementById("speechContainer");

    function speakText(text) {
    if (!("speechSynthesis" in window)) {
        alert("Sorry, your browser does not support text-to-speech.");
        return;
    }

    // Cancel anything currently speaking
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    // Robot-ish settings (tweak to taste)
    utter.rate = 1.0; // 0.1 to 10
    utter.pitch = 0.7; // 0 to 2 (lower pitch can sound more robotic)
    utter.volume = 1.0; // 0 to 1

    // Try to pick an English voice if available (optional)
    const voices = window.speechSynthesis.getVoices();
    const preferred =
        voices.find(
        (v) =>
            /en/i.test(v.lang) &&
            /google|microsoft|zira|david|mark|alex/i.test(v.name)
        ) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0];

    if (preferred) utter.voice = preferred;

    window.speechSynthesis.speak(utter);
    }

    speakBtn.addEventListener("click", () => {
        const text = textEl.innerText.trim();
        speakText(text);
    });

    stopBtn.addEventListener("click", () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    });

    // Some browsers load voices asynchronously
    if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        // Touching getVoices helps populate the list in some browsers
        window.speechSynthesis.getVoices();
    };
    }
})();
</script>
