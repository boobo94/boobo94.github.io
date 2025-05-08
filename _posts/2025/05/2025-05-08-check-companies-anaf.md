---
layout: post
title: Check Companies in ANAF by CIF
summary: Check Romanian companies in ANAF by CIF
categories: tools
tags: cif anaf
date: 2025-05-07 09:09:09 +0000
# cover: https://example.com/img.png
# redirect_from:
# - /old1-route
# - /old2-route
# canonical_url: https://example.com
# sitemap: false // don't add it to sitemap
---

<h2>Check TVA Status</h2>
<textarea
    id="cuiInput"
    rows="5"
    cols="40"
    placeholder="Enter CUI values, one per line"
></textarea>
<br /><br />

<button onclick="checkTva()">Check</button>

<pre id="response"></pre>

<script>
    function checkTva() {
    const input = document.getElementById("cuiInput").value;
    const taxIds = input
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const today = new Date().toISOString().split("T")[0];

    const requestBody = taxIds.map((cui) => ({
        cui: parseInt(cui),
        data: today,
    }));

    const ANAF_API = "https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva";

    fetch(ANAF_API, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    })
        .then((response) => response.json())
        .then((data) => {
        document.getElementById("response").textContent = JSON.stringify(
            data,
            null,
            2
        );
        })
        .catch((error) => {
        document.getElementById("response").textContent = "Error: " + error;
        });
    }
</script>
