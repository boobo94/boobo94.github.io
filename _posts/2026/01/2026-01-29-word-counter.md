---
layout: post
title: Word and Character Counter
summary: A simple tool to count words and characters from a text area.
# Available categories: abstract, devops, research, resources, startup, tools, tutorials
categories: tools
tags: javascript tools
date: 2026-01-29 08:19:01 +0000
---

<div>
  <strong>Words:</strong> <span id="wordCount">0</span> |
  <strong>Characters:</strong> <span id="charCount">0</span>
</div>
<br />
<textarea
  id="textInput"
  rows="15"
  style="width: 100%"
  placeholder="Start typing here..."
></textarea>

<script>
  const textInput = document.getElementById("textInput");
  const wordCount = document.getElementById("wordCount");
  const charCount = document.getElementById("charCount");

  textInput.addEventListener("input", () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    wordCount.textContent = words.length;
  });
</script>
