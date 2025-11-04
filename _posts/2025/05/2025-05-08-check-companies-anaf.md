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
<textarea
  id="cuiInput"
  rows="5"
  cols="40"
  placeholder="Enter CUI values, one per line"
></textarea>
<br /><br />

<button onclick="checkTva()">Check</button>

<div id="responseTable"></div>
<pre id="responseRaw"></pre>

<script>
  function checkTva() {
    const input = document.getElementById("cuiInput").value;
    const taxIds = input
      .split("\n")
      .map((line) => line.replace(/ro/gi, "").trim())
      .filter(Boolean);

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
        document.getElementById("responseTable").innerHTML =
          "<pre>Error: " + error + "</pre>";

      });

}

function cleanDenumire(denumire) {
return denumire
.replace(/S\.R\.L\./g, "SRL")
.replace(/S\.R\.L/g, "SRL")
.replace(/SOCIETATE CU RASPUNDERE LIMITATĂ/g, "SRL")
.replace(/PERSOANĂ FIZICĂ AUTORIZATĂ/g, "PFA")
.replace(/ÎNTREPRINDERE INDIVIDUALĂ/g, "II")
.replace(/ÎNTREPRINDERE FAMILIALĂ/g, "IF")
.replace(/\./g, "");
}

function copyToClipboard(text) {
navigator.clipboard.writeText(text);
}

function renderTable(results) {
if (!results.length) {
document.getElementById("responseTable").innerHTML =
"<p>No data found.</p>";
return;
}

    let table = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>CIF</th>
            <th>Name</th>
            <th>Address</th>
            <th>VAT</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
    `;

    results.forEach((item) => {
      const general = item.date_generale;
      const tva = item.inregistrare_scop_Tva;
      const sanitizedCompanyName = cleanDenumire(general.denumire);

      table += `
        <tr>
          <td>
            ${general.cui} <button onclick="copyToClipboard('${general.cui}')">📋</button>
          </td>
          <td>
            ${sanitizedCompanyName} <button onclick="copyToClipboard('${sanitizedCompanyName.replace(/'/g, "\\'")}')">📋</button>
          </td>
          <td>
            ${general.adresa} <button onclick="copyToClipboard('${general.adresa.replace(/'/g, "\\'")}')">📋</button>
          </td>
          <td>${tva.scpTVA ? "DA" : "NU"}</td>
          <td>
            ${general.telefon} <button onclick="copyToClipboard('${general.telefon.replace(/'/g, "\\'")}')">📋</button>
          </td>
        </tr>
      `;
    });

    table += `</tbody></table>`;
    document.getElementById("responseTable").innerHTML = table;

}
</script>

<a href="https://cors-anywhere.herokuapp.com/" target="_blank">Pre-authorize CORS Anywhere</a>
