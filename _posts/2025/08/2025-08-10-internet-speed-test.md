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
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    text-align: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
}

button:hover {
    background-color: #0056b3;
}

</style>

 <div class="container">
        <h1>Internet Speed Test</h1>
        <div id="speed">
            <p>Download: <span id="download">0</span> Mbps</p>
            <p>Upload: <span id="upload">0</span> Mbps</p>
            <p>IP: <span id="ip">Loading...</span></p>
        </div>
        <button id="startTest">Start Test</button>
    </div>

<script>
    document.getElementById('startTest').addEventListener('click', () => {
    // Start the speed test
    getIpAddress();
    downloadSpeedTest();
    uploadSpeedTest();

});

// Function to measure download speed
function downloadSpeedTest() {
const fileUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'; // A sample image for download
const startTime = performance.now();

    fetch(fileUrl)
        .then(response => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // in seconds
            const fileSize = response.headers.get('Content-Length') || 1; // in bytes
            const fileSizeInMb = fileSize / (1024 * 1024); // Convert bytes to MB

            const downloadSpeed = (fileSizeInMb / duration).toFixed(2); // Speed in MB/s
            document.getElementById('download').textContent = (downloadSpeed * 8).toFixed(2); // Convert MB/s to Mbps
        })
        .catch(error => {
            console.error(error);
        });

}

// Function to measure upload speed
function uploadSpeedTest() {
const data = new Blob([new Array(1000000).join('a')], { type: 'text/plain' }); // Creating a large blob to upload
const startTime = performance.now();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true); // Use a server endpoint that can accept the file
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // in seconds
            const fileSizeInMb = data.size / (1024 * 1024); // Convert bytes to MB

            const uploadSpeed = (fileSizeInMb / duration).toFixed(2); // Speed in MB/s
            document.getElementById('upload').textContent = (uploadSpeed * 8).toFixed(2); // Convert MB/s to Mbps
        }
    };
    xhr.send(data);

}

// Function to get user's public IP
function getIpAddress() {
const peerConnection = new RTCPeerConnection();
peerConnection.createDataChannel('');
peerConnection.createOffer().then(offer => peerConnection.setLocalDescription(offer));

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(event.candidate.candidate);
            if (ipMatch) {
                document.getElementById('ip').textContent = ipMatch[0];
            }
        }
    };

}
</script>
