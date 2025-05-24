---
layout: post
title: Check Companies in ANAF by CIF
summary: Check Romanian companies in ANAF by CIF
categories: tools
tags: cif anaf
date: 2025-05-07 09:09:09 +0000
# cover: https://example.com/img.png
---

<h2>Check TVA Status</h2>
<div id="responseTable"></div>
<pre id="responseRaw"></pre>

<script>
  function checkTva() {
    const input = document.getElementById("cuiInput").value;
    const taxIds = input.split("\n").map((line) => line.trim()).filter(Boolean);
    const today = new Date().toISOString().split("T")[0];

    const requestBody = taxIds.map((cui) => ({
      cui: parseInt(cui),
      data: today,
    }));

    const ANAF_API = "https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva";

    fetch(`https://cors-anywhere.herokuapp.com/${ANAF_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        renderTable(data.found);
        document.getElementById("responseRaw").textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        document.getElementById("responseTable").innerHTML = "<pre>Error: " + error + "</pre>";
      });
  }

  function renderTable(results) {
    if (!results.length) {
      document.getElementById("responseTable").innerHTML = "<p>No data found.</p>";
      return;
    }

    let table = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>CUI</th>
            <th>Denumire</th>
            <th>Adresa</th>
            <th>TVA</th>
            <th>Data inregistrare TVA</th>
          </tr>
        </thead>
        <tbody>
    `;

    results.forEach((item) => {
      const general = item.date_generale;
      const tva = item.inregistrare_scop_Tva;
      const perioadaTVA = tva.perioade_TVA?.[0]?.data_inceput_ScpTVA || "-";

      table += `
        <tr>
          <td>${general.cui}</td>
          <td>${general.denumire}</td>
          <td>${general.adresa}</td>
          <td>${tva.scpTVA ? "DA" : "NU"}</td>
          <td>${perioadaTVA}</td>
        </tr>
      `;
    });

    table += "</tbody></table>";
    document.getElementById("responseTable").innerHTML = table;
  }
</script>


<a href="https://cors-anywhere.herokuapp.com/" target="_blank">Pre-authorize CORS Anywhere</a>
