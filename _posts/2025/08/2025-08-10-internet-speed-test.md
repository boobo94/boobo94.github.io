---
layout: post
title: Internet Speed Test
summary: Check your internet speed with this simple test
categories: tools
tags: speedtest
date: 2025-08-10 09:09:09 +0000
cover: https://example.com/img.png
---

<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
    }
    #test {
        margin-top: 20px;
    }
    #result {
        margin-top: 20px;
        font-size: 20px;
    }
</style>

<h1>Internet Speed Test</h1>
<button id="test" onclick="startTest()">Start Test</button>

<div id="result"></div>

<script>
function startTest() {
    document.getElementById('result').innerText = 'Testing...';

    // File to download from a server (you can use any large file URL or server you control)
    const testUrl = 'https://whyboobo.com/images/b94_logo.png'; // Example file
    const startTime = performance.now();

    fetch(testUrl)
        .then(response => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // in seconds
            const fileSize = response.headers.get('Content-Length') || 1; // in bytes
            const fileSizeInMb = fileSize / (1024 * 1024); // Convert bytes to MB

            const speed = (fileSizeInMb / duration).toFixed(2); // Speed in MB/s
            document.getElementById('result').innerText = `Download Speed: ${speed} MB/s`;
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Test failed. Please try again later.';
            console.error(error);
        });
}
</script>
