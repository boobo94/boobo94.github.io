---
title: How to detect the browser language in javascript
summary: How to detect the browser language in javascript in just a line of code. The method is working on all major browser
categories: tutorials
tags: javascript browser language
date: 2022-06-10 09:09:09 +0000
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/%C3%86toms_-_Translation.svg/200px-%C3%86toms_-_Translation.svg.png
layout: post
---

How to detect the browser language in javascript in just a line of code. The method is working on all major browser

```js
const language = navigator.language || navigator.userLanguage;
// en-US
```

If you need only the two letters:

```js
const language = (navigator.language || navigator.userLanguage).substr(0, 2)
// en
```

## How to change the language in browser in Vue 3 with i18n

This vue app example use API Composition. An working example on [QR Code Contact](https://whyboobo.com/qrcodecontact/)

src/i18n.js

```js
import { createI18n } from 'vue-i18n';

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
```

src/components/LanguageSelector.vue

```html
<template>
  <div class="language-selector">
    <h3>{{ t("language") }}</h3>
    <img :src="imageFlag" alt="" />
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>
```

```js
<script setup>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import i18n from '@/i18n';

const langs = ['en', 'ro'];
const { locale, t } = useI18n();

onMounted(() => {
// detect the language of browser
  i18n.global.locale.value = (navigator.language || navigator.userLanguage).substr(0, 2);
});

// eslint-disable-next-line import/no-dynamic-require, global-require
const imageFlag = computed(() => require(`@/assets/images/${locale.value}-flag.png`));
</script>
```

```css
<style>
.language-selector {
  display: flex;
  align-items: center;
}

img {
  margin-left: 10px;
  margin-right: 10px;
}

select {
  width: 75px;
  line-height: 49px;
  height: 38px;
  font-size: 22px;
  outline: 0;
}
</style>
```

```html
<i18n>
{
  "en": {
    "language": "Language",
  },
  "ro": {
    "language": "Limba",
  }
}
</i18n>
```