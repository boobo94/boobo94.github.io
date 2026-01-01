---
layout: post
title: P&L Tracker
summary: Track your income and expenses.
# Available categories: abstract, devops, research, resources, startup, tools, tutorials
categories: tools
tags: tag1 tag2
date: 2025-11-30 09:09:09 +0000
# redirect_from:
# - /old1-route
# - /old2-route
# canonical_url: https://example.com
# sitemap: false // don't add it to sitemap
---

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<style>
    .pnl-tracker {
    --bg: #0b1220;
    --text: #e7eefc;
    --muted: #a9b7d6;
    --border: rgba(255, 255, 255, 0.1);
    --shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
    --radius: 14px;
    --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        "Liberation Mono", "Courier New", monospace;
    --sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
        Helvetica, Arial;
    position: relative;
    margin: 0;
    width: 100vw;
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    font-family: var(--sans);
    color: var(--text);
    background: radial-gradient(
        1200px 600px at 20% 10%,
        #162a53 0%,
        rgba(22, 42, 83, 0) 55%
        ),
        radial-gradient(
        900px 500px at 80% 20%,
        #1b2f5a 0%,
        rgba(27, 47, 90, 0) 55%
        ),
        var(--bg);
    }

    .pnl-tracker *,
    .pnl-tracker *::before,
    .pnl-tracker *::after {
    box-sizing: border-box;
    }

    .pnl-tracker header {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 18px 18px 12px;
    background: rgba(11, 18, 32, 0.78);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    display: flex;
    gap: 14px;
    align-items: flex-start;
    justify-content: space-between;
    }
    .pnl-tracker header h1 {
    margin: 0;
    font-size: 16px;
    letter-spacing: 0.2px;
    }
    .pnl-tracker header .sub {
    margin-top: 6px;
    font-size: 12.5px;
    color: var(--muted);
    line-height: 1.35;
    max-width: 980px;
    }

    .pnl-tracker .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    }
    .pnl-tracker button,
    .pnl-tracker input,
    .pnl-tracker select,
    .pnl-tracker textarea {
    font: inherit;
    color: inherit;
    }
    .pnl-tracker button {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border);
    padding: 10px 12px;
    border-radius: 12px;
    cursor: pointer;
    }
    .pnl-tracker button.primary {
    background: rgba(102, 163, 255, 0.14);
    border-color: rgba(102, 163, 255, 0.35);
    }
    .pnl-tracker button.danger {
    background: rgba(255, 107, 107, 0.12);
    border-color: rgba(255, 107, 107, 0.35);
    }
    .pnl-tracker button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    }

    .pnl-tracker .pill {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    font-size: 12px;
    color: var(--muted);
    font-family: var(--mono);
    max-width: 620px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: border-color 0.2s ease, background 0.2s ease,
        color 0.2s ease;
    }
    .pnl-tracker .pill.success {
    border-color: rgba(72, 199, 116, 0.55);
    background: rgba(72, 199, 116, 0.15);
    color: #baf3cf;
    }
    .pnl-tracker .pill.warn {
    border-color: rgba(244, 177, 93, 0.7);
    background: rgba(244, 177, 93, 0.18);
    color: #ffe3c4;
    }
    .pnl-tracker .pill.danger {
    border-color: rgba(255, 107, 107, 0.55);
    background: rgba(255, 107, 107, 0.14);
    color: #ffdada;
    }

    .pnl-tracker main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 14px 18px 30px;
    }
    .pnl-tracker .layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 12px;
    align-items: start;
    }
    @media (max-width: 980px) {
    .pnl-tracker .layout {
        grid-template-columns: 1fr;
    }
    }

    .pnl-tracker .card {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.06),
        rgba(255, 255, 255, 0.03)
    );
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    }
    .pnl-tracker .hd {
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    background: rgba(15, 27, 51, 0.55);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    }
    .pnl-tracker .hd h2 {
    margin: 0;
    font-size: 13px;
    letter-spacing: 0.2px;
    }
    .pnl-tracker .bd {
    padding: 14px;
    }
    .pnl-tracker .nav {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    }
    .pnl-tracker .nav button {
    text-align: left;
    }
    .pnl-tracker .nav button.active {
    background: rgba(102, 163, 255, 0.14);
    border-color: rgba(102, 163, 255, 0.35);
    }

    .pnl-tracker .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    }
    .pnl-tracker .row3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    }
    @media (max-width: 900px) {
    .pnl-tracker .row,
    .pnl-tracker .row3 {
        grid-template-columns: 1fr;
    }
    }

    .pnl-tracker label {
    display: block;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 6px;
    }
    .pnl-tracker input[type="text"],
    .pnl-tracker input[type="number"],
    .pnl-tracker input[type="date"],
    .pnl-tracker select,
    .pnl-tracker textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 10px;
    outline: none;
    }
    .pnl-tracker textarea {
    min-height: 70px;
    resize: vertical;
    }

    .pnl-tracker table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
    }
    .pnl-tracker th,
    .pnl-tracker td {
    padding: 10px 8px;
    border-bottom: 1px solid var(--border);
    text-align: left;
    vertical-align: top;
    }
    .pnl-tracker th {
    color: var(--muted);
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    }
    .pnl-tracker td.mono {
    font-family: var(--mono);
    }
    .pnl-tracker tr:hover td {
    background: rgba(255, 255, 255, 0.03);
    }
    .pnl-tracker .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;
    }
    .pnl-tracker .toolbar .left,
    .pnl-tracker .toolbar .right {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: end;
    }

    .pnl-tracker .kpis {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 12px;
    }
    @media (max-width: 980px) {
    .pnl-tracker .kpis {
        grid-template-columns: 1fr 1fr;
    }
    }
    @media (max-width: 520px) {
    .pnl-tracker .kpis {
        grid-template-columns: 1fr;
    }
    }
    .pnl-tracker .kpi {
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.04);
    }
    .pnl-tracker .kpi .t {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 6px;
    }
    .pnl-tracker .kpi .v {
    font-family: var(--mono);
    font-size: 18px;
    }

    .pnl-tracker .gridCharts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    }
    @media (max-width: 980px) {
    .pnl-tracker .gridCharts {
        grid-template-columns: 1fr;
    }
    }
    .pnl-tracker .chartWrap {
    padding: 12px;
    }
    .pnl-tracker canvas {
    width: 100% !important;
    height: 320px !important;
    }

    /* Modal */
    .pnl-tracker .modalBack {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: none;
    place-items: center;
    padding: 16px;
    z-index: 50;
    }
    .pnl-tracker .modal {
    position: relative;
    width: min(860px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    overflow: auto;
    background: rgba(16, 31, 60, 0.96);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow);
    }
    .pnl-tracker .modal .hd {
    background: rgba(15, 27, 51, 0.9);
    }
    .pnl-tracker .hint {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.35;
    }
    .pnl-tracker .warn {
    font-size: 12px;
    color: #ffd166;
    line-height: 1.35;
    }
</style>

<div class="pnl-tracker">
    <header>
        <div>
        <h1>P&L Tracker</h1>
        <div class="sub">Track profitability of your company</div>
        </div>
        <div class="actions">
        <span class="pill" id="dbPill">DB: IndexedDB</span>
        </div>
    </header>

    <input
        type="file"
        id="fileInputJson"
        accept=".json,application/json"
        style="display: none"
    />
    <input
        type="file"
        id="fileInputCsv"
        accept=".csv,text/csv"
        style="display: none"
    />

    <main>
        <div class="layout">
        <div class="card">
            <div class="hd"><h2>Navigation</h2></div>
        <div class="nav">
        <button class="active" data-view="dashboard">Dashboard</button>
        <button data-view="transactions">Income & Expenses</button>
        <button data-view="categories">Categories</button>
        <button data-view="projects">Projects</button>
        <button data-view="reports">Reports</button>
        <button data-view="settings">Settings</button>
        </div>
            <div class="bd">
            <div class="hint" id="status">Initializing…</div>
            <div class="warn" style="margin-top: 10px">
                Data is stored in your browser (IndexedDB). Use Settings to back
                up or restore data across machines.
            </div>
            </div>
        </div>

        <div class="card">
            <div class="hd"><h2 id="viewTitle">Dashboard</h2></div>
            <div class="bd" id="viewRoot"></div>
        </div>
        </div>

    </main>

    <!-- Modal -->
    <div class="modalBack" id="modalBack">
        <div class="modal">
        <div class="hd">
            <h2 id="modalTitle">Edit</h2>
            <div style="display: flex; gap: 10px">
            <button id="btnModalClose">Close</button>
            </div>
        </div>
        <div class="bd" id="modalBody"></div>
        </div>
    </div>

</div>

<script>
    let db = null; // in-memory data object
    const DB_KEY = "pnl.json";
    let idbHealthy = true; // flag to skip persistence if IndexedDB is not available
    let charts = {
    profitMonthly: null,
    profitByProject: null,
    revenueByProject: null,
    };
    let backupDirty = true;

    const el = (id) => document.getElementById(id);
    const fmt = (n) =>
    n === null || n === undefined || isNaN(n) ? "—" : Number(n).toFixed(2);
    const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    });
    const fmtNum = (n) => numberFormatter.format(Number(n || 0));
    const todayISO = () => {
    const d = new Date();
    const p = (x) => String(x).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    };
    const firstDayOfMonthISO = () => {
    const d = new Date();
    const p = (x) => String(x).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-01`;
    };
    const setStatus = (msg) => (el("status").textContent = msg);
    const setDbLabel = (msg) => (el("dbPill").textContent = msg);
    const setBackupState = (dirty) => {
    backupDirty = dirty;
    const pill = el("dbPill");
    if (!pill) return;
    pill.classList.toggle("warn", dirty);
    pill.classList.toggle("success", !dirty);
    };
    const markDirty = () => setBackupState(true);
    const markBackedUp = () => setBackupState(false);
    const dominantCurrency = (rows) => {
    const counts = new Map();
    rows.forEach((t) => {
        const cur = (t.currency || "RON").toUpperCase();
        counts.set(cur, (counts.get(cur) || 0) + 1);
    });
    return counts.size
        ? [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0]
        : "RON";
    };
    const chartOptions = (currency, { stacked = false } = {}) => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: { position: "bottom" },
        tooltip: {
        callbacks: {
            label: (ctx) => {
            const raw = ctx.raw ?? ctx.parsed?.y ?? ctx.parsed ?? 0;
            const name = ctx.dataset?.label || "";
            const suffix = currency ? ` ${currency}` : "";
            return `${name}: ${fmtNum(raw)}${suffix}`;
            },
        },
        },
    },
    scales: {
        x: { stacked },
        y: {
        stacked,
        beginAtZero: true,
        ticks: {
            callback: (v) => fmtNum(v),
        },
        },
    },
    });

    // ---------- IndexedDB storage ----------
    function openIDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open("pnl_sqljs_db", 1);
        req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains("files"))
            db.createObjectStore("files");
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    }

    async function idbGet(key) {
    const idb = await openIDB();
    return new Promise((resolve, reject) => {
        const tx = idb.transaction("files", "readonly");
        const store = tx.objectStore("files");
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
    }

    async function idbPut(key, value) {
    const idb = await openIDB();
    return new Promise((resolve, reject) => {
        const tx = idb.transaction("files", "readwrite");
        const store = tx.objectStore("files");
        const req = store.put(value, key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
    });
    }

    async function idbDel(key) {
    const idb = await openIDB();
    return new Promise((resolve, reject) => {
        const tx = idb.transaction("files", "readwrite");
        const store = tx.objectStore("files");
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
    });
    }

    async function persist() {
    if (!db || !idbHealthy) return;
    try {
        await idbPut(DB_KEY, db);
    } catch (e) {
        console.error("IndexedDB write failed; disabling persistence", e);
        idbHealthy = false;
        setStatus(
        "IndexedDB unavailable; continuing in-memory (changes will not persist)."
        );
    }
    }

    // ---------- Data helpers ----------
    const defaultCategories = () => [
    { id: 1, name: "Services", type: "income" },
    { id: 2, name: "Products", type: "income" },
    { id: 3, name: "Subscriptions", type: "income" },
    { id: 4, name: "Payroll", type: "expense" },
    { id: 5, name: "Operations", type: "expense" },
    { id: 6, name: "Marketing", type: "expense" },
    ];

    const createEmptyDb = () => ({
    projects: [],
    categories: defaultCategories(),
    transactions: [],
    nextProjectId: 1,
    nextCategoryId: 7,
    nextTxId: 1,
    });

    const findProject = (id) =>
    db.projects.find((p) => p.id === id) || null;
    const projectName = (id) =>
    findProject(id)?.name || "(Unassigned project)";

    // ---------- Export / Import ----------
    function exportJson() {
    if (!db) {
        setStatus("DB not ready yet.");
        return;
    }
    const blob = new Blob([JSON.stringify(db, null, 2)], {
        type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = DB_KEY;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Exported JSON.");
    markBackedUp();
    }

    async function importJson(file) {
    try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (!parsed || !Array.isArray(parsed.projects) || !Array.isArray(parsed.transactions)) {
        throw new Error("Invalid JSON structure.");
        }
        const categories = Array.isArray(parsed.categories)
        ? parsed.categories
        : defaultCategories();
        db = {
        projects: parsed.projects,
        categories,
        transactions: parsed.transactions,
        nextProjectId: parsed.nextProjectId || 1,
        nextCategoryId:
            parsed.nextCategoryId ||
            (categories.length
            ? Math.max(...categories.map((c) => Number(c.id) || 0)) + 1
            : 1),
        nextTxId: parsed.nextTxId || 1,
        };
        await persist();
        renderCurrentView();
        setStatus(`Imported ${file.name}.`);
        setDbLabel("DB: IndexedDB (JSON)");
        markDirty();
    } catch (e) {
        console.error("Import failed", e);
        setStatus(`Import failed: ${e.message || e}`);
    }
    }

    function exportModelCsv() {
    const headers = [
        "type",
        "date",
        "project",
        "party",
        "category",
        "amount_net",
        "vat_pct",
        "currency",
        "notes",
    ];
    const sample = [
        "income",
        todayISO(),
        "Sample Project",
        "ACME Corp",
        "Services",
        "1200",
        "0.19",
        "EUR",
        "Optional notes",
    ];
    const csv = [headers.join(","), sample.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pnl-model.csv";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Exported CSV model template.");
    }

    async function importCsvFile(file) {
    try {
        if (!db) {
        setStatus("DB not ready yet.");
        return;
        }
        const text = await file.text();
        const rows = parseCsv(text);
        if (!rows.length) {
        setStatus("CSV import: no data rows found.");
        return;
        }

        const required = ["type", "date", "amount_net"];
        const missing = required.filter((r) => !(r in rows[0]));
        if (missing.length) {
        setStatus(
            `CSV import failed: missing headers ${missing.join(", ")}.`
        );
        return;
        }

        let created = 0;
        let createdProjects = 0;
        rows.forEach((row, idx) => {
        const type = String(row.type || "").toLowerCase();
        if (type !== "income" && type !== "expense") return;

        const date = String(row.date || "").trim() || todayISO();
        const amount_net = Number(row.amount_net || 0);
        if (!isFinite(amount_net)) return;

        const vat_pct = Number(row.vat_pct || 0);
        const vat_amount = amount_net * vat_pct;
        const amount_gross = amount_net + vat_amount;
        const currency = (row.currency || "RON").toUpperCase();

        const projectLabel = (row.project || "").trim();
        let project_id = null;
        if (projectLabel) {
            const existing =
            db.projects.find(
                (p) => p.name.toLowerCase() === projectLabel.toLowerCase()
            ) || null;
            if (existing) {
            project_id = existing.id;
            } else {
            const newProject = {
                id: db.nextProjectId++,
                name: projectLabel,
                is_active: 1,
            };
            db.projects.push(newProject);
            project_id = newProject.id;
            createdProjects += 1;
            }
        }

        db.transactions.push({
            id: db.nextTxId++,
            type,
            date,
            project_id,
            party: row.party?.trim() || null,
            category: row.category?.trim() || null,
            amount_net,
            vat_pct,
            vat_amount,
            amount_gross,
            currency,
            notes: row.notes?.trim() || null,
        });
        created += 1;
        });

        markDirty();
        await persist();
        renderCurrentView();
        setStatus(
        `Imported ${created} row(s) from ${file.name}${
            createdProjects ? ` (created ${createdProjects} new project(s))` : ""
        }.`
        );
    } catch (e) {
        console.error("CSV import failed", e);
        setStatus(`CSV import failed: ${e.message || e}`);
    }
    }

    async function initDb() {
    setStatus("Checking IndexedDB for existing DB…");
    let raw = null;
    try {
        raw = await idbGet(DB_KEY);
    } catch (e) {
        console.error("IndexedDB read failed; continuing in-memory only", e);
        idbHealthy = false;
        setStatus(
        "IndexedDB unavailable; using in-memory DB (data will not persist)."
        );
        setDbLabel("DB: in-memory (no persistence)");
    }

    const parseRaw = (r) => {
        if (!r) return null;
        if (r.projects && r.transactions) return r;
        try {
        // Attempt to decode Uint8Array or ArrayBuffer as JSON text
        const txt = new TextDecoder().decode(r);
        const obj = JSON.parse(txt);
        if (obj.projects && obj.transactions) return obj;
        } catch {}
        return null;
    };

    db = parseRaw(raw) || createEmptyDb();
    if (!Array.isArray(db.categories)) db.categories = defaultCategories();
    if (!db.nextCategoryId) {
        db.nextCategoryId =
        db.categories.length > 0
            ? Math.max(...db.categories.map((c) => Number(c.id) || 0)) + 1
            : 1;
    }
    await persist();
    setStatus(
        raw
        ? "DB loaded from IndexedDB (auto-save enabled)."
        : idbHealthy
        ? "No DB found. Created empty DB automatically in IndexedDB."
        : "Started empty in-memory DB (no persistence)."
    );
    setDbLabel(
        idbHealthy ? "DB: IndexedDB (JSON)" : "DB: in-memory (no persistence)"
    );

    renderCurrentView();
    setBackupState(true);
    }

    function requireDb() {
    if (!db) {
        setStatus("DB not ready yet.");
        return false;
    }
    return true;
    }

    // ---------- Views ----------
    let currentView = "dashboard";
    function setView(v) {
    currentView = v;
    document
        .querySelectorAll(".nav button")
        .forEach((b) => b.classList.toggle("active", b.dataset.view === v));
    renderCurrentView();
    }

    function viewTitle() {
    return currentView === "dashboard"
        ? "Dashboard"
        : currentView === "transactions"
        ? "Income & Expenses (CRUD)"
        : currentView === "categories"
        ? "Categories (CRUD)"
        : currentView === "projects"
        ? "Projects (CRUD)"
        : currentView === "settings"
        ? "Settings"
        : "Reports";
    }

    function renderCurrentView() {
    el("viewTitle").textContent = viewTitle();
    const root = el("viewRoot");
    root.innerHTML = "";

    if (!requireDb()) {
        root.innerHTML = `<div class="hint">Initializing…</div>`;
        return;
    }

    if (currentView === "dashboard") renderDashboard(root);
    else if (currentView === "transactions") renderTransactions(root);
    else if (currentView === "categories") renderCategories(root);
    else if (currentView === "projects") renderProjects(root);
    else if (currentView === "settings") renderSettings(root);
    else renderReports(root);
    }

    // ---------- Dashboard ----------
    function renderDashboard(root) {
    const start = firstDayOfMonthISO();
    const end = todayISO();

    root.innerHTML = `
    <div class="toolbar">
    <div class="left">
        <div><label>Start</label><input id="dStart" type="date" value="${start}"></div>
        <div><label>End</label><input id="dEnd" type="date" value="${end}"></div>
    </div>
    <div class="right">
        <button id="btnDashRefresh" class="primary">Refresh</button>
    </div>
    </div>

    <div class="kpis">
    <div class="kpi"><div class="t">Income (Net)</div><div class="v" id="kIncome">—</div></div>
    <div class="kpi"><div class="t">Expenses (Net)</div><div class="v" id="kExpense">—</div></div>
    <div class="kpi"><div class="t">Profit (Net)</div><div class="v" id="kProfit">—</div></div>
    <div class="kpi"><div class="t">Transactions</div><div class="v" id="kCount">—</div></div>
    </div>

    <div class="gridCharts">
    <div class="card" style="box-shadow:none;">
        <div class="hd"><h2>Monthly profitability</h2></div>
        <div class="chartWrap"><canvas id="cProfitMonthly"></canvas></div>
    </div>
    <div class="card" style="box-shadow:none;">
        <div class="hd"><h2>Profitability by project</h2></div>
        <div class="chartWrap"><canvas id="cProfitByProject"></canvas></div>
    </div>
    </div>

    <div class="card" style="margin-top:12px; box-shadow:none;">
    <div class="hd"><h2>Monthly revenue by project</h2></div>
    <div class="chartWrap"><canvas id="cRevenueByProject"></canvas></div>
    </div>
`;

    el("btnDashRefresh").onclick = () => refreshDashboard();
    refreshDashboard();
    }

    function refreshDashboard() {
    const start = el("dStart").value;
    const end = el("dEnd").value;
    const txs = db.transactions.filter(
        (t) => t.date >= start && t.date <= end
    );
    const currency = dominantCurrency(txs);

    const income = txs
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + Number(t.amount_net || 0), 0);
    const expense = txs
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + Number(t.amount_net || 0), 0);
    const count = txs.length;

    el("kIncome").textContent = fmt(income);
    el("kExpense").textContent = fmt(expense);
    el("kProfit").textContent = fmt(Number(income) - Number(expense));
    el("kCount").textContent = String(count);

    // Monthly profitability
    const monthlyMap = new Map();
    txs.forEach((t) => {
        const m = String(t.date).slice(0, 7);
        const cur = monthlyMap.get(m) || { month: m, income: 0, expense: 0 };
        if (t.type === "income") cur.income += Number(t.amount_net || 0);
        else cur.expense += Number(t.amount_net || 0);
        monthlyMap.set(m, cur);
    });
    const monthly = [...monthlyMap.values()].sort((a, b) =>
        a.month.localeCompare(b.month)
    );

    const labels = monthly.map((r) => r.month);
    const incomeSeries = monthly.map((r) => Number(r.income || 0));
    const expenseSeries = monthly.map((r) => Number(r.expense || 0));
    const profitSeries = monthly.map(
        (r) => Number(r.income || 0) - Number(r.expense || 0)
    );

    if (charts.profitMonthly) charts.profitMonthly.destroy();
    charts.profitMonthly = new Chart(el("cProfitMonthly"), {
        type: "line",
        data: {
        labels,
        datasets: [
            { label: "Income (Net)", data: incomeSeries, tension: 0.2 },
            { label: "Expenses (Net)", data: expenseSeries, tension: 0.2 },
            { label: "Profit (Net)", data: profitSeries, tension: 0.2 },
        ],
        },
        options: chartOptions(currency),
    });

    // Profitability by project
    const projectMap = new Map();
    txs.forEach((t) => {
        const key = projectName(t.project_id);
        const cur =
        projectMap.get(key) || { project: key, income: 0, expense: 0 };
        if (t.type === "income") cur.income += Number(t.amount_net || 0);
        else cur.expense += Number(t.amount_net || 0);
        projectMap.set(key, cur);
    });
    const profit = (row) =>
        Number(row.income || 0) - Number(row.expense || 0);
    const byProject = [...projectMap.values()].sort(
        (a, b) => profit(b) - profit(a)
    );

    const projectLabels = byProject.map((r) => r.project);
    const projectProfit = byProject.map(
        (r) => Number(r.income || 0) - Number(r.expense || 0)
    );

    if (charts.profitByProject) charts.profitByProject.destroy();
    charts.profitByProject = new Chart(el("cProfitByProject"), {
        type: "bar",
        data: {
        labels: projectLabels,
        datasets: [{ label: "Profit (Net)", data: projectProfit }],
        },
        options: chartOptions(currency),
    });

    // Monthly revenue by project (stacked)
    // Aggregate income per project per month so stacked totals are correct
    const incomeByProjectMonth = new Map();
    txs.filter((t) => t.type === "income").forEach((t) => {
        const month = String(t.date).slice(0, 7);
        const project = projectName(t.project_id);
        if (!incomeByProjectMonth.has(project))
        incomeByProjectMonth.set(project, new Map());
        const monthMap = incomeByProjectMonth.get(project);
        monthMap.set(month, (monthMap.get(month) || 0) + Number(t.amount_net || 0));
    });

    const monthSet = new Set();
    incomeByProjectMonth.forEach((monthMap) =>
        monthMap.forEach((_, month) => monthSet.add(month))
    );
    const months = [...monthSet].sort((a, b) => a.localeCompare(b));
    const projects = [...incomeByProjectMonth.keys()];

    const datasets = projects.map((project) => {
        const monthMap = incomeByProjectMonth.get(project) || new Map();
        return {
        label: project,
        data: months.map((mm) => monthMap.get(mm) || 0),
        };
    });

    if (charts.revenueByProject) charts.revenueByProject.destroy();
    charts.revenueByProject = new Chart(el("cRevenueByProject"), {
        type: "bar",
        data: { labels: months, datasets },
        options: chartOptions(currency, { stacked: true }),
    });

    setStatus(`Dashboard refreshed for ${start} → ${end}.`);
    }

    // ---------- Transactions (CRUD) ----------
    function renderTransactions(root) {
    root.innerHTML = `
    <div class="toolbar">
    <div class="left">
        <div><label>Start</label><input id="tStart" type="date" value="${firstDayOfMonthISO()}"></div>
        <div><label>End</label><input id="tEnd" type="date" value="${todayISO()}"></div>
        <div>
        <label>Type</label>
        <select id="tType">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
        </select>
        </div>
        <div><label>Search (party/category)</label><input id="tSearch" type="text" placeholder="optional"></div>
        <div><label>Project</label><select id="tProject"></select></div>
    </div>
    <div class="right">
        <button id="btnAddTx" class="primary">Add income/expense</button>
    </div>
    </div>

    <div class="card" style="box-shadow:none;">
    <div class="hd"><h2>Records</h2></div>
    <div class="bd" style="padding:0;">
        <table>
        <thead>
            <tr>
            <th>Date</th><th>Type</th><th>Project</th><th>Party</th><th>Category</th>
            <th class="mono">Net</th><th class="mono">VAT</th><th class="mono">Gross</th><th>Cur</th><th></th>
            </tr>
        </thead>
        <tbody id="txRows"></tbody>
        </table>
    </div>
    </div>
`;

    fillProjectSelect(el("tProject"), true);
    const refresh = () => refreshTransactions();
    ["tStart", "tEnd", "tType", "tProject"].forEach(
        (id) => (el(id).onchange = refresh)
    );
    el("tSearch").oninput = debounce(refresh, 250);
    el("btnAddTx").onclick = () => openTxModal(null, refresh);

    refreshTransactions();
    }

    function refreshTransactions() {
    const start = el("tStart").value;
    const end = el("tEnd").value;
    const type = el("tType").value;
    const projectId = el("tProject").value;
    const q = (el("tSearch").value || "").trim();

    const where = ["t.date>=?", "t.date<=?"];
    const params = [start, end];

    let rows = db.transactions.filter(
        (t) => t.date >= start && t.date <= end
    );
    if (type !== "all") rows = rows.filter((t) => t.type === type);
    if (projectId !== "all") {
        const val = projectId === "null" ? null : Number(projectId);
        rows = rows.filter((t) => t.project_id === val);
    }
    if (q) {
        const qq = q.toLowerCase();
        rows = rows.filter(
        (t) =>
            (t.party || "").toLowerCase().includes(qq) ||
            (t.category || "").toLowerCase().includes(qq)
        );
    }

    rows = rows
        .slice()
        .sort((a, b) =>
        a.date === b.date
            ? Number(b.id || 0) - Number(a.id || 0)
            : b.date.localeCompare(a.date)
        )
        .slice(0, 2000)
        .map((t) => ({ ...t, project_name: projectName(t.project_id) }));

    el("txRows").innerHTML =
        rows
        .map(
            (r) => `
    <tr>
    <td class="mono">${r.date}</td>
    <td>${r.type}</td>
    <td>${escapeHtml(r.project_name || "")}</td>
    <td>${escapeHtml(r.party || "")}</td>
    <td>${escapeHtml(r.category || "")}</td>
    <td class="mono">${fmt(r.amount_net)}</td>
    <td class="mono">${fmt(r.vat_amount)}</td>
    <td class="mono">${fmt(r.amount_gross)}</td>
    <td class="mono">${r.currency}</td>
    <td style="white-space:nowrap;">
        <button data-edit="${r.id}">Edit</button>
        <button class="danger" data-del="${r.id}">Delete</button>
    </td>
    </tr>
`
        )
        .join("") ||
        `<tr><td colspan="10" style="padding:12px;" class="hint">No records.</td></tr>`;

    el("txRows").onclick = async (e) => {
        const editId = e.target?.getAttribute?.("data-edit");
        const delId = e.target?.getAttribute?.("data-del");
        if (editId) {
        openTxModal(Number(editId), () => refreshTransactions());
        } else if (delId) {
        await deleteTransaction(Number(delId));
        refreshTransactions();
        }
    };
    }

    async function deleteTransaction(id) {
    db.transactions = db.transactions.filter((t) => t.id !== id);
    markDirty();
    await persist();
    setStatus(`Deleted transaction #${id}.`);
    }

    // ---------- Categories (CRUD) ----------
    function renderCategories(root) {
    root.innerHTML = `
    <div class="toolbar">
    <div class="left">
        <div class="hint">Define reusable categories to tag income and expense records.</div>
    </div>
    <div class="right">
        <button id="btnAddCat" class="primary">Add category</button>
    </div>
    </div>

    <div class="card" style="box-shadow:none;">
    <div class="hd"><h2>Categories</h2></div>
    <div class="bd" style="padding:0;">
        <table>
        <thead><tr><th>Name</th><th>Type</th><th></th></tr></thead>
        <tbody id="catRows"></tbody>
        </table>
    </div>
    </div>
`;

    el("btnAddCat").onclick = () =>
        openCategoryModal(null, () => refreshCategories());
    refreshCategories();
    }

    function refreshCategories() {
    const rows = db.categories
        .slice()
        .sort(
        (a, b) =>
            a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
        );
    el("catRows").innerHTML =
        rows
        .map(
            (c) => `
    <tr>
    <td>${escapeHtml(c.name)}</td>
    <td>${c.type}</td>
    <td style="white-space:nowrap;">
        <button data-edit="${c.id}">Edit</button>
        <button class="danger" data-del="${c.id}">Delete</button>
    </td>
    </tr>
`
        )
        .join("") ||
        `<tr><td colspan="3" style="padding:12px;" class="hint">No categories.</td></tr>`;

    el("catRows").onclick = async (e) => {
        const editId = e.target?.getAttribute?.("data-edit");
        const delId = e.target?.getAttribute?.("data-del");
        if (editId) {
        openCategoryModal(Number(editId), refreshCategories);
        } else if (delId) {
        const id = Number(delId);
        const cat = db.categories.find((c) => c.id === id);
        db.transactions.forEach((t) => {
            if (cat && t.category === cat.name) t.category = null;
        });
        db.categories = db.categories.filter((c) => c.id !== id);
        markDirty();
        await persist();
        setStatus(`Deleted category #${id}.`);
        refreshCategories();
        }
    };
    }

    // ---------- Projects (CRUD) ----------
    function renderProjects(root) {
    root.innerHTML = `
    <div class="toolbar">
    <div class="left">
        <div class="hint">Projects drive the “profitability by project” charts and filters.</div>
    </div>
    <div class="right">
        <button id="btnAddProject" class="primary">Add project</button>
    </div>
    </div>

    <div class="card" style="box-shadow:none;">
    <div class="hd"><h2>Projects</h2></div>
    <div class="bd" style="padding:0;">
        <table>
        <thead><tr><th>Name</th><th>Active</th><th></th></tr></thead>
        <tbody id="projectRows"></tbody>
        </table>
    </div>
    </div>
`;

    el("btnAddProject").onclick = () => openProjectModal(null, refreshProjects);
    refreshProjects();
    }

    function refreshProjects() {
    const projects = db.projects
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    el("projectRows").innerHTML =
        projects
        .map(
            (p) => `
    <tr>
    <td>${escapeHtml(p.name)}</td>
    <td class="mono">${p.is_active ? "1" : "0"}</td>
    <td style="white-space:nowrap;">
        <button data-edit="${p.id}">Edit</button>
        <button class="danger" data-del="${p.id}">Delete</button>
    </td>
    </tr>
`
        )
        .join("") ||
        `<tr><td colspan="3" style="padding:12px;" class="hint">No projects.</td></tr>`;

    el("projectRows").onclick = async (e) => {
        const editId = e.target?.getAttribute?.("data-edit");
        const delId = e.target?.getAttribute?.("data-del");
        if (editId) {
        openProjectModal(Number(editId), refreshProjects);
        } else if (delId) {
        const id = Number(delId);
        db.transactions.forEach((t) => {
            if (t.project_id === id) t.project_id = null;
        });
        db.projects = db.projects.filter((p) => p.id !== id);
        markDirty();
        await persist();
        setStatus(`Deleted project #${id}.`);
        refreshProjects();
        }
    };
    }

    // ---------- Reports ----------
    function renderReports(root) {
    root.innerHTML = `
    <div class="toolbar">
    <div class="left">
        <div><label>Start</label><input id="rStart" type="date" value="${firstDayOfMonthISO()}"></div>
        <div><label>End</label><input id="rEnd" type="date" value="${todayISO()}"></div>
        <div>
        <label>Group</label>
        <select id="rGroup">
            <option value="category">By category</option>
            <option value="project">By project</option>
            <option value="month">By month</option>
        </select>
        </div>
    </div>
    <div class="right">
        <button id="btnRunReport" class="primary">Run</button>
    </div>
    </div>

    <div class="card" style="box-shadow:none;">
    <div class="hd"><h2>Report output</h2></div>
    <div class="bd" style="padding:0;">
        <table>
        <thead id="rHead"></thead>
        <tbody id="rBody"></tbody>
        </table>
    </div>
    </div>
`;
    el("btnRunReport").onclick = runReport;
    runReport();
    }

    function runReport() {
    const start = el("rStart").value;
    const end = el("rEnd").value;
    const grp = el("rGroup").value;

    if (grp === "category") {
        el(
        "rHead"
        ).innerHTML = `<tr><th>Type</th><th>Category</th><th class="mono">Net</th></tr>`;
        const rowsMap = new Map();
        db.transactions
        .filter((t) => t.date >= start && t.date <= end)
        .forEach((t) => {
            const key = `${t.type}||${t.category || "Uncategorized"}`;
            const cur = rowsMap.get(key) || {
            type: t.type,
            key: t.category || "Uncategorized",
            v: 0,
            };
            cur.v += Number(t.amount_net || 0);
            rowsMap.set(key, cur);
        });
        const rows = [...rowsMap.values()].sort((a, b) => b.v - a.v);
        el("rBody").innerHTML =
        rows
            .map(
            (r) => `
    <tr><td>${r.type}</td><td>${escapeHtml(
                r.key
            )}</td><td class="mono">${fmt(r.v)}</td></tr>
    `
            )
            .join("") ||
        `<tr><td colspan="3" style="padding:12px;" class="hint">No data.</td></tr>`;
    }

    if (grp === "project") {
        el(
        "rHead"
        ).innerHTML = `<tr><th>Project</th><th class="mono">Income</th><th class="mono">Expenses</th><th class="mono">Profit</th></tr>`;
        const rowsMap = new Map();
        db.transactions
        .filter((t) => t.date >= start && t.date <= end)
        .forEach((t) => {
            const key = projectName(t.project_id);
            const cur = rowsMap.get(key) || {
            key,
            income: 0,
            expense: 0,
            };
            if (t.type === "income") cur.income += Number(t.amount_net || 0);
            else cur.expense += Number(t.amount_net || 0);
            rowsMap.set(key, cur);
        });
        const profit = (r) => Number(r.income || 0) - Number(r.expense || 0);
        const rows = [...rowsMap.values()].sort(
        (a, b) => profit(b) - profit(a)
        );
        el("rBody").innerHTML =
        rows
            .map(
            (r) => `
    <tr>
        <td>${escapeHtml(r.key)}</td>
        <td class="mono">${fmt(r.income)}</td>
        <td class="mono">${fmt(r.expense)}</td>
        <td class="mono">${fmt(
        Number(r.income || 0) - Number(r.expense || 0)
        )}</td>
    </tr>
    `
            )
            .join("") ||
        `<tr><td colspan="4" style="padding:12px;" class="hint">No data.</td></tr>`;
    }

    if (grp === "month") {
        el(
        "rHead"
        ).innerHTML = `<tr><th>Month</th><th class="mono">Income</th><th class="mono">Expenses</th><th class="mono">Profit</th></tr>`;
        const rowsMap = new Map();
        db.transactions
        .filter((t) => t.date >= start && t.date <= end)
        .forEach((t) => {
            const key = String(t.date).slice(0, 7);
            const cur = rowsMap.get(key) || {
            key,
            income: 0,
            expense: 0,
            };
            if (t.type === "income") cur.income += Number(t.amount_net || 0);
            else cur.expense += Number(t.amount_net || 0);
            rowsMap.set(key, cur);
        });
        const rows = [...rowsMap.values()].sort((a, b) =>
        a.key.localeCompare(b.key)
        );
        el("rBody").innerHTML =
        rows
            .map(
            (r) => `
    <tr>
        <td class="mono">${r.key}</td>
        <td class="mono">${fmt(r.income)}</td>
        <td class="mono">${fmt(r.expense)}</td>
        <td class="mono">${fmt(
        Number(r.income || 0) - Number(r.expense || 0)
        )}</td>
    </tr>
    `
            )
            .join("") ||
        `<tr><td colspan="4" style="padding:12px;" class="hint">No data.</td></tr>`;
    }

    setStatus(`Report generated for ${start} → ${end}.`);
    }

    // ---------- Settings ----------
    function renderSettings(root) {
    const storageLabel = el("dbPill")?.textContent || "DB";
    root.innerHTML = `
    <div class="card" style="box-shadow:none;">
    <div class="hd"><h2>Data management</h2></div>
    <div class="bd">
        <div class="row">
        <div>
            <label>JSON backup</label>
            <div class="hint">Export/import the full database with IDs intact.</div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <button id="btnSettingsExport" class="primary">Export JSON</button>
            <button id="btnSettingsImport">Import JSON</button>
            </div>
        </div>
        <div>
            <label>CSV import & model</label>
            <div class="hint">
            CSV headers: type, date (YYYY-MM-DD), project, party, category, amount_net, vat_pct, currency, notes.
            Missing projects will be created automatically.
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
            <button id="btnSettingsImportCsv">Import CSV</button>
            <button id="btnExportModel">Export model file</button>
            </div>
        </div>
        </div>
        <div class="row">
        <div>
            <label>Reset database</label>
            <div class="hint">Clears all data stored locally for this tracker.</div>
            <div style="margin-top:8px;">
            <button id="btnReset" class="danger">Reset DB</button>
            </div>
        </div>
        <div>
            <label>Storage</label>
            <div class="pill">${escapeHtml(storageLabel)}</div>
            <div class="hint" style="margin-top:8px;">Changes auto-save to IndexedDB when available.</div>
        </div>
        </div>
    </div>
    </div>
`;

    el("btnSettingsExport").onclick = exportJson;
    el("btnSettingsImport").onclick = () => el("fileInputJson").click();
    el("btnSettingsImportCsv").onclick = () => el("fileInputCsv").click();
    el("btnExportModel").onclick = exportModelCsv;
    el("btnReset").onclick = resetDb;
    }

    // ---------- Modal: Category CRUD ----------
    function openCategoryModal(categoryId, onDone) {
    const isEdit = !!categoryId;
    const cat = isEdit
        ? db.categories.find((c) => c.id === categoryId) || {
            name: "",
            type: "income",
        }
        : { name: "", type: "income" };

    el("modalTitle").textContent = isEdit
        ? `Edit category #${categoryId}`
        : "Add category";
    el("modalBody").innerHTML = `
    <div class="row">
    <div>
        <label>Name</label>
        <input id="mCatName" type="text" value="${escapeAttr(
        cat.name || ""
        )}" />
    </div>
    <div>
        <label>Type</label>
        <select id="mCatType">
        <option value="income" ${
            cat.type === "income" ? "selected" : ""
        }>income</option>
        <option value="expense" ${
            cat.type === "expense" ? "selected" : ""
        }>expense</option>
        </select>
    </div>
    </div>
    <div class="toolbar">
    <div class="left"><div class="hint">Categories feed the dropdown when adding transactions.</div></div>
    <div class="right">
        <button id="btnSaveCat" class="primary">${
        isEdit ? "Save" : "Create"
        }</button>
    </div>
    </div>
`;

    el("btnSaveCat").onclick = async () => {
        const name = el("mCatName").value.trim();
        const type = el("mCatType").value;
        if (!name) {
        setStatus("Category name is required.");
        return;
        }

        try {
        if (isEdit) {
            const idx = db.categories.findIndex((c) => c.id === categoryId);
            if (idx >= 0) {
            const prevName = db.categories[idx].name;
            db.categories[idx] = { ...db.categories[idx], name, type };
            if (prevName !== name) {
                db.transactions.forEach((t) => {
                if (t.category === prevName) t.category = name;
                });
            }
            }
        } else {
            db.categories.push({ id: db.nextCategoryId++, name, type });
        }

        markDirty();
        await persist();
        closeModal();
        setStatus(isEdit ? "Category updated." : "Category created.");
        onDone?.();
        if (currentView === "transactions") refreshTransactions();
        } catch (e) {
        setStatus(`Error: ${String(e.message || e)}`);
        }
    };

    openModal();
    }

    // ---------- Modal: Project CRUD ----------
    function openProjectModal(projectId, onDone) {
    const isEdit = !!projectId;
    const project = isEdit
        ? db.projects.find((p) => p.id === projectId)
        : { name: "", is_active: 1 };

    el("modalTitle").textContent = isEdit
        ? `Edit project #${projectId}`
        : "Add project";
    el("modalBody").innerHTML = `
    <div class="row">
    <div>
        <label>Name</label>
        <input id="mProjectName" type="text" value="${escapeAttr(
        project.name || ""
        )}" />
    </div>
    <div>
        <label>Active</label>
        <select id="mProjectActive">
        <option value="1" ${project.is_active ? "selected" : ""}>1</option>
        <option value="0" ${!project.is_active ? "selected" : ""}>0</option>
        </select>
    </div>
    </div>
    <div class="toolbar">
    <div class="left"><div class="hint">Projects are referenced by transactions via project_id.</div></div>
    <div class="right">
        <button id="btnSaveProject" class="primary">${
        isEdit ? "Save" : "Create"
        }</button>
    </div>
    </div>
`;

    el("btnSaveProject").onclick = async () => {
        const name = el("mProjectName").value.trim();
        const active = Number(el("mProjectActive").value);
        if (!name) {
        setStatus("Project name is required.");
        return;
        }

        try {
        if (isEdit) {
            const idx = db.projects.findIndex((p) => p.id === projectId);
            if (idx >= 0)
            db.projects[idx] = {
                ...db.projects[idx],
                name,
                is_active: active,
            };
        } else {
            db.projects.push({
                id: db.nextProjectId++,
                name,
                is_active: active,
            });
        }

        markDirty();
        await persist();
        closeModal();
        setStatus(isEdit ? "Project updated." : "Project created.");
        onDone?.();
        if (currentView === "dashboard") refreshDashboard();
        } catch (e) {
        setStatus(`Error: ${String(e.message || e)}`);
        }
    };

    openModal();
    }

    // ---------- Modal: Transaction CRUD ----------
    function openTxModal(txId, onDone) {
    const isEdit = !!txId;
    const tx = isEdit
        ? db.transactions.find((t) => t.id === txId)
        : {
            type: "income",
            date: todayISO(),
            project_id: null,
            party: "",
            category: "",
            amount_net: 0,
            vat_pct: 0,
            vat_amount: 0,
            amount_gross: 0,
            currency: "RON",
            notes: "",
        };

    el("modalTitle").textContent = isEdit
        ? `Edit transaction #${txId}`
        : "Add transaction";
    el("modalBody").innerHTML = `
    <div class="row3">
    <div>
        <label>Type</label>
        <select id="mTxType">
        <option value="income" ${
            tx.type === "income" ? "selected" : ""
        }>income</option>
        <option value="expense" ${
            tx.type === "expense" ? "selected" : ""
        }>expense</option>
        </select>
    </div>
    <div>
        <label>Date</label>
        <input id="mTxDate" type="date" value="${escapeAttr(
        tx.date || todayISO()
        )}" />
    </div>
    <div>
        <label>Currency</label>
        <select id="mTxCur">
        <option value="RON" ${
            tx.currency === "RON" ? "selected" : ""
        }>RON</option>
        <option value="EUR" ${
            tx.currency === "EUR" ? "selected" : ""
        }>EUR</option>
        <option value="USD" ${
            tx.currency === "USD" ? "selected" : ""
        }>USD</option>
        </select>
    </div>
    </div>

    <div class="row">
    <div>
        <label>Project</label>
        <select id="mTxProject"></select>
    </div>
    <div>
        <label>Category</label>
        <select id="mTxCat"></select>
    </div>
    </div>

    <div class="row">
    <div>
        <label>Client/Vendor (Party)</label>
        <input id="mTxParty" type="text" value="${escapeAttr(
        tx.party || ""
        )}" />
    </div>
    <div>
        <label>Notes</label>
        <input id="mTxNotes" type="text" value="${escapeAttr(
        tx.notes || ""
        )}" />
    </div>
    </div>

    <div class="row3">
    <div>
        <label>Net</label>
        <input id="mTxNet" type="number" step="0.01" value="${Number(
        tx.amount_net || 0
        )}" />
    </div>
    <div>
        <label>VAT % (e.g., 0.19)</label>
        <input id="mTxVatPct" type="number" step="0.01" value="${Number(
        tx.vat_pct || 0
        )}" />
    </div>
    <div>
        <label>Gross (computed)</label>
        <input id="mTxGross" type="number" step="0.01" value="${Number(
        tx.amount_gross || 0
        )}" disabled />
    </div>
    </div>

    <div class="toolbar">
    <div class="left"><div class="hint">Auto-saves to IndexedDB after save/delete.</div></div>
    <div class="right">
        <button id="btnSaveTx" class="primary">${
        isEdit ? "Save" : "Create"
        }</button>
    </div>
    </div>
`;

    fillProjectSelect(el("mTxProject"), true);
    el("mTxProject").value =
        tx.project_id === null || tx.project_id === undefined
        ? "null"
        : String(tx.project_id);
    const categorySel = el("mTxCat");
    const refreshCategoriesForType = (current) =>
        fillCategorySelect(
        categorySel,
        el("mTxType").value,
        current ?? categorySel.value ?? tx.category
        );
    refreshCategoriesForType(tx.category);
    el("mTxType").onchange = () => {
        refreshCategoriesForType("");
    };

    const recompute = () => {
        const net = Number(el("mTxNet").value || 0);
        const vatPct = Number(el("mTxVatPct").value || 0);
        const vat = net * vatPct;
        el("mTxGross").value = (net + vat).toFixed(2);
    };
    el("mTxNet").oninput = recompute;
    el("mTxVatPct").oninput = recompute;
    recompute();

    el("btnSaveTx").onclick = async () => {
        const type = el("mTxType").value;
        const date = el("mTxDate").value;
        const currency = el("mTxCur").value;
        const projectVal = el("mTxProject").value;
        const project_id = projectVal === "null" ? null : Number(projectVal);

        const party = el("mTxParty").value.trim() || null;
        const category = el("mTxCat").value.trim() || null;
        const notes = el("mTxNotes").value.trim() || null;

        const amount_net = Number(el("mTxNet").value || 0);
        const vat_pct = Number(el("mTxVatPct").value || 0);
        const vat_amount = amount_net * vat_pct;
        const amount_gross = amount_net + vat_amount;

        if (!date) {
        setStatus("Date is required.");
        return;
        }
        if (!isFinite(amount_net)) {
        setStatus("Net must be a number.");
        return;
        }

        if (isEdit) {
        const idx = db.transactions.findIndex((t) => t.id === txId);
        if (idx >= 0)
            db.transactions[idx] = {
            ...db.transactions[idx],
            type,
            date,
            project_id,
            party,
            category,
            amount_net,
            vat_pct,
            vat_amount,
            amount_gross,
            currency,
            notes,
            };
        } else {
        db.transactions.push({
            id: db.nextTxId++,
            type,
            date,
            project_id,
            party,
            category,
            amount_net,
            vat_pct,
            vat_amount,
            amount_gross,
            currency,
            notes,
        });
        }

        markDirty();
        await persist();
        closeModal();
        setStatus(isEdit ? "Transaction updated." : "Transaction created.");
        onDone?.();
        if (currentView === "dashboard") refreshDashboard();
    };

    openModal();
    }

    // ---------- Helpers ----------
    function fillProjectSelect(sel, includeAll) {
    const projects = db.projects
        .filter((a) => a.is_active)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    const options = [];
    if (includeAll) options.push(`<option value="all">All</option>`);
    options.push(`<option value="null">(Unassigned project)</option>`);
    projects.forEach((p) =>
        options.push(
        `<option value="${p.id}">${escapeHtml(p.name)}</option>`
        )
    );
    sel.innerHTML = options.join("");
    }

    function fillCategorySelect(sel, type, currentValue) {
    const cats = db.categories
        .filter((c) => c.type === type)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    const options = [`<option value="">(Uncategorized)</option>`];
    cats.forEach((c) =>
        options.push(
        `<option value="${escapeAttr(c.name)}">${escapeHtml(c.name)}</option>`
        )
    );
    if (
        currentValue &&
        !cats.find((c) => c.name.toLowerCase() === currentValue.toLowerCase())
    ) {
        options.push(
        `<option value="${escapeAttr(currentValue)}">Custom: ${escapeHtml(
            currentValue
        )}</option>`
        );
    }
    sel.innerHTML = options.join("");
    sel.value = currentValue || "";
    }

    function escapeHtml(s) {
    return String(s ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
    function escapeAttr(s) {
    return escapeHtml(s).replaceAll("\n", " ");
    }

    function splitCsvLine(line) {
    const cols = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
            cur += '"';
            i += 1;
        } else {
            inQuotes = !inQuotes;
        }
        } else if (ch === "," && !inQuotes) {
        cols.push(cur);
        cur = "";
        } else {
        cur += ch;
        }
    }
    cols.push(cur);
    return cols;
    }

    function parseCsv(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
    if (!lines.length) return [];
    const headers = splitCsvLine(lines[0]).map((h) =>
        h.trim().toLowerCase()
    );
    return lines.slice(1).map((line) => {
        const parts = splitCsvLine(line);
        const row = {};
        headers.forEach((h, idx) => {
        row[h] = (parts[idx] || "").trim();
        });
        return row;
    });
    }

    function openModal() {
    el("modalBack").style.display = "grid";
    document.body.style.overflow = "hidden";
    }
    function closeModal() {
    el("modalBack").style.display = "none";
    document.body.style.overflow = "";
    }
    el("btnModalClose").onclick = closeModal;
    el("modalBack").onclick = (e) => {
    if (e.target === el("modalBack")) closeModal();
    };

    function debounce(fn, ms) {
    let t = null;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
    }

    // ---------- Reset ----------
    async function resetDb() {
    if (
        !confirm(
        "Reset will delete all data stored in this browser for this DB. Continue?"
        )
    )
        return;
    db = createEmptyDb();
    markDirty();
    await persist();
    setStatus("Reset done. Fresh DB in IndexedDB.");
    setDbLabel(
        idbHealthy ? "DB: IndexedDB (JSON)" : "DB: in-memory (no persistence)"
    );
    renderCurrentView();
    }

    // Navigation
    document
    .querySelectorAll(".nav button")
    .forEach((b) => (b.onclick = () => setView(b.dataset.view)));

    // File inputs
    el("fileInputJson").onchange = (e) => {
    const file = e.target.files?.[0];
    if (file) importJson(file);
    e.target.value = "";
    };
    el("fileInputCsv").onchange = (e) => {
    const file = e.target.files?.[0];
    if (file) importCsvFile(file);
    e.target.value = "";
    };

    // Boot
    initDb();
</script>
