---
layout: post
title: Financial Reports ANAF by CUI
summary: Check Romanian company public financial reports from ANAF by CUI
categories: tools
tags: cif anaf
date: 2026-04-03 09:00:00 +0000
# cover: https://example.com/img.png
---

<h2>Company Financial Report</h2>

<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:16px;">
  <div>
    <label for="cuiInput" style="display:block;margin-bottom:4px;font-weight:bold;">CUI</label>
    <input
      id="cuiInput"
      type="text"
      placeholder="e.g. 12345678"
      style="padding:8px 12px;font-size:15px;border:1px solid #ccc;border-radius:4px;width:180px;"
    />
  </div>
  <div>
    <label for="yearInput" style="display:block;margin-bottom:4px;font-weight:bold;">Year</label>
    <input
      id="yearInput"
      type="number"
      min="2014"
      style="padding:8px 12px;font-size:15px;border:1px solid #ccc;border-radius:4px;width:100px;"
    />
  </div>
  <button onclick="fetchReport()" style="padding:8px 20px;font-size:15px;cursor:pointer;">Check</button>
</div>

<div id="reportOutput"></div>

<div id="snackbar">Copied to clipboard!</div>

<style>
#snackbar {
  visibility: hidden;
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  right: 30px;
  bottom: 30px;
  font-size: 17px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@-webkit-keyframes fadein { from {bottom:0;opacity:0} to {bottom:30px;opacity:1} }
@keyframes fadein { from {bottom:0;opacity:0} to {bottom:30px;opacity:1} }
@-webkit-keyframes fadeout { from {bottom:30px;opacity:1} to {bottom:0;opacity:0} }
@keyframes fadeout { from {bottom:30px;opacity:1} to {bottom:0;opacity:0} }

.report-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 20px;
  background: #fafafa;
}
.report-card h3 {
  margin: 0 0 4px 0;
  font-size: 1.2em;
}
.report-card .meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 14px;
}
.report-card table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92em;
}
.report-card table th {
  background: #f0f0f0;
  text-align: left;
  padding: 7px 10px;
  border-bottom: 2px solid #ccc;
}
.report-card table td {
  padding: 6px 10px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
}
.report-card table tr:last-child td {
  border-bottom: none;
}
.report-card table td:last-child {
  text-align: right;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  font-size: 0.9em;
  opacity: 0.6;
}
.copy-btn:hover { opacity: 1; }
.indicator-code {
  color: #888;
  font-size: 0.85em;
  margin-right: 6px;
}
</style>

<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
  });
}

function formatNumber(val) {
  if (val === null || val === undefined) return "—";
  return Number(val).toLocaleString("ro-RO");
}

function renderReport(data) {
  const out = document.getElementById("reportOutput");

  if (!data || (!data.cui && !data.deni)) {
    out.innerHTML = "<p>No data found for the given CUI and year.</p>";
    return;
  }

  const indicators = data.i || [];

  let rows = "";
  indicators.forEach((item) => {
    const val = formatNumber(item.val_indicator);
    rows += `
      <tr>
        <td>
          <span class="indicator-code">${item.indicator}</span>
          ${item.val_den_indicator}
        </td>
        <td>
          ${val}
          <button class="copy-btn" onclick="copyToClipboard('${item.val_indicator}')">📋</button>
        </td>
      </tr>
    `;
  });

  out.innerHTML = `
    <div class="report-card">
      <h3>
        ${data.deni || "—"}
        <button class="copy-btn" onclick="copyToClipboard('${(data.deni || "").replace(/'/g, "\\'")}')">📋</button>
      </h3>
      <div class="meta">
        CUI: <strong>${data.cui}</strong> &nbsp;|&nbsp;
        Year: <strong>${data.an}</strong> &nbsp;|&nbsp;
        CAEN: <strong>${data.caen || "—"}</strong> — ${data.den_caen || ""}
      </div>
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th style="text-align:right">Value (RON)</th>
          </tr>
        </thead>
        <tbody>
          ${rows || "<tr><td colspan='2'>No indicators available.</td></tr>"}
        </tbody>
      </table>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("yearInput").value = new Date().getFullYear() - 1;
});

function fetchReport() {
  const cui = document.getElementById("cuiInput").value.replace(/ro/gi, "").trim();
  const year = document.getElementById("yearInput").value;
  const out = document.getElementById("reportOutput");

  if (!cui) {
    out.innerHTML = "<p>Please enter a CUI.</p>";
    return;
  }

  out.innerHTML = "<p>Loading...</p>";

  const ANAF_API = `https://webservicesp.anaf.ro/bilant?an=${year}&cui=${encodeURIComponent(cui)}`;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(ANAF_API)}`)
    .then((res) => res.json())
    .then((data) => renderReport(JSON.parse(data.contents)))
    .catch((err) => {
      out.innerHTML = "<pre>Error: " + err + "</pre>";
    });
}
</script>

