---
layout: post
title: What is my Internet IP Address?
summary: Discover your IP address over the internet
categories: tools
tags: ip
date: 2025-04-13 09:09:09 +0000
cover: https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg
---

<div id="ipaddress">Finding your IP address...</div>
<button id="copyBtn" style="display:none; margin-top:10px;">Copy IP</button>

<script>
	window.addEventListener('load', async function(){
		try{
			const response = await fetch("https://api.ipify.org/?format=json");
			const data = await response.json();
			
			// Display IP address
			document.getElementById("ipaddress").innerHTML = `
				<span id="ipValue" style="font-size:26px; font-weight:bold">${data.ip}</span><br>Your IP address
			`;
			
			// Show copy button
			const copyBtn = document.getElementById("copyBtn");
			copyBtn.style.display = "inline-block";
			
			// Copy logic
			copyBtn.onclick = function() {
				const ipText = document.getElementById("ipValue").textContent;
				navigator.clipboard.writeText(ipText)
					.then(() => {
						copyBtn.innerText = "Copied!";
						setTimeout(() => copyBtn.innerText = "Copy IP", 2000);
					})
					.catch(() => {
						alert("Failed to copy IP address.");
					});
			};
		}
		catch(err){
			document.getElementById("ipaddress").innerText = "Timeout, Please refresh and try again.";
		}
	});
</script>
