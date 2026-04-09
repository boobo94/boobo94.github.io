---
layout: post
title: Check Companies in ANAF by CIF
summary: Check Romanian companies in ANAF by CIF
categories: tools
tags: cif anaf
date: 2025-05-07 09:09:09 +0000
# cover: https://example.com/img.png
---

<h2>Check Company TVA Status</h2>

<div style="margin-bottom:16px;">
  <label for="cuiInput" style="display:block;margin-bottom:6px;font-weight:bold;">CUI / CIF (one per line)</label>
  <textarea
    id="cuiInput"
    rows="4"
    placeholder="e.g.&#10;12345678&#10;RO87654321"
    style="width:100%;max-width:360px;padding:8px 12px;font-size:14px;border:1px solid #ccc;border-radius:4px;resize:vertical;box-sizing:border-box;"
  ></textarea>
</div>
<button onclick="checkTva()" style="padding:8px 24px;font-size:15px;cursor:pointer;">Check</button>

<div id="responseTable" style="margin-top:24px;"></div>

<div id="snackbar">Copied!</div>

<style>
#snackbar {
  visibility: hidden;
  min-width: 120px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 10px 18px;
  position: fixed;
  z-index: 999;
  right: 24px;
  bottom: 24px;
  font-size: 14px;
}
#snackbar.show {
  visibility: visible;
  animation: fadein 0.3s, fadeout 0.4s 2.3s;
}
@keyframes fadein { from {opacity:0;bottom:10px} to {opacity:1;bottom:24px} }
@keyframes fadeout { from {opacity:1;bottom:24px} to {opacity:0;bottom:10px} }

.company-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
  font-size: 14px;
}
.company-card-header {
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  padding: 14px 18px;
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.company-card-header h3 {
  margin: 0;
  font-size: 1.1em;
}
.company-card-header .cui-badge {
  color: #666;
  font-size: 0.85em;
  font-family: monospace;
}
.company-card-body {
  padding: 0 18px 14px;
}
.section-title {
  font-size: 0.75em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  margin: 16px 0 6px;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}
.fields-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 6px 16px;
}
.field-row {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}
.field-label {
  font-size: 0.75em;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.field-value {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.92em;
  word-break: break-word;
}
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.82em;
  font-weight: bold;
}
.badge-yes { background: #d4edda; color: #155724; }
.badge-no  { background: #f8d7da; color: #721c24; }
.badge-warn { background: #fff3cd; color: #856404; }
.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  font-size: 0.85em;
  opacity: 0.5;
  flex-shrink: 0;
}
.copy-btn:hover { opacity: 1; }
</style>

<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
  });
}

function cleanDenumire(denumire) {
  if (!denumire) return "";
  return denumire
    .replace(/S\.R\.L\./g, "SRL")
    .replace(/S\.R\.L/g, "SRL")
    .replace(/SOCIETATE CU RASPUNDERE LIMITATĂ/g, "SRL")
    .replace(/PERSOANĂ FIZICĂ AUTORIZATĂ/g, "PFA")
    .replace(/ÎNTREPRINDERE INDIVIDUALĂ/g, "II")
    .replace(/ÎNTREPRINDERE FAMILIALĂ/g, "IF")
    .replace(/\./g, "");
}

function esc(str) {
  return String(str || "").replace(/'/g, "\\'");
}

function copyField(val) {
  return `<button class="copy-btn" onclick="copyToClipboard('${esc(val)}')">📋</button>`;
}

function badge(condition, yesLabel, noLabel) {
  if (condition === null || condition === undefined) return '<span class="badge badge-warn">—</span>';
  return condition
    ? `<span class="badge badge-yes">${yesLabel || "DA"}</span>`
    : `<span class="badge badge-no">${noLabel || "NU"}</span>`;
}

function fieldRow(label, value, copyable) {
  if (!value && value !== 0) return "";
  const copyBtn = copyable !== false ? copyField(value) : "";
  return `
    <div class="field-row">
      <span class="field-label">${label}</span>
      <span class="field-value">${value}${copyBtn}</span>
    </div>`;
}

function renderCompany(item) {
  const g = item.date_generale || {};
  const tva = item.inregistrare_scop_Tva || {};
  const inactiv = item.stare_inactiv || {};
  const tvaI = item.inregistrare_RTVAI || {};

  const name = cleanDenumire(g.denumire);

  return `
    <div class="company-card">
      <div class="company-card-header">
        <h3>${name || "—"} ${copyField(name)}</h3>
        <span class="cui-badge">CUI: ${g.cui || "—"} ${copyField(g.cui)}</span>
      </div>
      <div class="company-card-body">

        <div class="section-title">General</div>
        <div class="fields-grid">
          ${fieldRow("Address", g.adresa)}
          ${fieldRow("Registration No.", g.nrRegCom)}
          ${fieldRow("CAEN Code", g.cod_CAEN)}
          ${fieldRow("Status", g.stare_inregistrare)}
          ${fieldRow("Registration Date", g.data_inregistrare)}
          ${fieldRow("Phone", g.telefon)}
          ${fieldRow("Fax", g.fax)}
          ${fieldRow("Postal Code", g.codPostal)}
          ${fieldRow("IBAN", g.iban)}
          ${g.act ? fieldRow("Act", g.act) : ""}
        </div>

        <div class="section-title">TVA Registration</div>
        <div class="fields-grid">
          <div class="field-row">
            <span class="field-label">TVA Payer</span>
            <span class="field-value">${badge(tva.scpTVA)}</span>
          </div>
          ${tva.dataInceputTva ? fieldRow("TVA Start", tva.dataInceputTva) : ""}
          ${tva.dataSfarsitTva ? fieldRow("TVA End", tva.dataSfarsitTva) : ""}
          ${tva.dataAnulateTva ? fieldRow("TVA Cancelled", tva.dataAnulateTva) : ""}
          ${tva.periodicitate_L ? fieldRow("Periodicity Monthly", tva.periodicitate_L) : ""}
          ${tva.periodicitate_T ? fieldRow("Periodicity Quarterly", tva.periodicitate_T) : ""}
          ${tva.periodicitate_D ? fieldRow("Periodicity Semi-annual", tva.periodicitate_D) : ""}
          ${tva.mesaj ? fieldRow("Note", tva.mesaj, false) : ""}
        </div>

        <div class="section-title">Inactive Status</div>
        <div class="fields-grid">
          <div class="field-row">
            <span class="field-label">Inactive</span>
            <span class="field-value">${badge(inactiv.statusInactiv, "YES", "NO")}</span>
          </div>
          ${inactiv.dataInactiv ? fieldRow("Inactive Since", inactiv.dataInactiv) : ""}
          ${inactiv.dataReactivare ? fieldRow("Reactivated", inactiv.dataReactivare) : ""}
          ${inactiv.dataPublicare ? fieldRow("Published", inactiv.dataPublicare) : ""}
          ${inactiv.dataRadiere ? fieldRow("Deleted", inactiv.dataRadiere) : ""}
        </div>

        <div class="section-title">TVA on Collection (RTVAI)</div>
        <div class="fields-grid">
          <div class="field-row">
            <span class="field-label">TVA on Collection</span>
            <span class="field-value">${badge(tvaI.statusTvaIncasare)}</span>
          </div>
          ${tvaI.dataInceputTvaI ? fieldRow("Start", tvaI.dataInceputTvaI) : ""}
          ${tvaI.dataSfarsitTvaI ? fieldRow("End", tvaI.dataSfarsitTvaI) : ""}
          ${tvaI.dataActualizareTvaI ? fieldRow("Updated", tvaI.dataActualizareTvaI) : ""}
          ${tvaI.dataPublicareTvaI ? fieldRow("Published", tvaI.dataPublicareTvaI) : ""}
          ${tvaI.tipTvaI ? fieldRow("Type", tvaI.tipTvaI) : ""}
        </div>

      </div>
    </div>`;
}

function checkTva() {
  const input = document.getElementById("cuiInput").value;
  const taxIds = input
    .split("\n")
    .map((line) => line.replace(/ro/gi, "").trim())
    .filter(Boolean);

  if (!taxIds.length) return;

  const today = new Date().toISOString().split("T")[0];
  const requestBody = taxIds.map((cui) => ({ cui: parseInt(cui), data: today }));
  const ANAF_API = "https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva";

  document.getElementById("responseTable").innerHTML = "<p>Loading...</p>";

  const PROXY = "https://anaf-proxy.bogdan-militaru.workers.dev";
  fetch(`${PROXY}/?url=${encodeURIComponent(ANAF_API)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((data) => {
      const found = data.found || [];
      if (!found.length) {
        document.getElementById("responseTable").innerHTML = "<p>No data found.</p>";
        return;
      }
      document.getElementById("responseTable").innerHTML = found.map(renderCompany).join("");
    })
    .catch((err) => {
      document.getElementById("responseTable").innerHTML = "<pre>Error: " + err + "</pre>";
    });
}
</script>

