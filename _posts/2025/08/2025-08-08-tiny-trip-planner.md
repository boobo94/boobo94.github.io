---
layout: post
title: Tiny Trip Planner
summary: Summary Draft Template
categories: tools
tags: js trip app
date: 2025-08-08 09:09:09 +0000
cover: https://example.com/img.png
---


  <!-- Leaflet (OpenStreetMap) -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>
  <style>
    :root {
      --bg: #0f1220;
      --panel: #161A2B;
      --panel-2: #1B2138;
      --text: #E8ECF1;
      --muted: #A7B0C0;
      --accent: #6EE7B7;
      --danger: #f87171;
      --border: #27304a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--text);
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, sans-serif;
    }
    header {
      padding: 14px 16px; border-bottom: 1px solid var(--border); background: var(--panel);
      display: flex; align-items: center; gap: 12px; position: sticky; top: 0; z-index: 10;
    }
    header h1 { font-size: 18px; margin: 0; font-weight: 600; letter-spacing: 0.2px; }
    .wrap {
      display: grid; grid-template-columns: 320px 1fr; min-height: calc(100vh - 56px);
    }
    aside {
      border-right: 1px solid var(--border); background: var(--panel); padding: 12px;
    }
    main { padding: 16px; background: linear-gradient(180deg, var(--panel-2), var(--bg)); }
    .card {
      background: var(--panel-2); border: 1px solid var(--border); border-radius: 10px;
      padding: 12px;
    }
    .section-title {
      font-size: 13px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin: 8px 0 6px;
    }
    .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .col { display: flex; flex-direction: column; gap: 6px; }
    input[type="text"], textarea {
      width: 100%; background: #111426; color: var(--text); border: 1px solid var(--border);
      border-radius: 8px; padding: 10px; outline: none; font: inherit;
    }
    textarea { min-height: 80px; resize: vertical; }
    .btn {
      background: #1f2542; color: var(--text); border: 1px solid var(--border);
      padding: 9px 12px; border-radius: 8px; cursor: pointer; font: inherit;
    }
    .btn:hover { filter: brightness(1.1); }
    .btn.primary { background: #26305b; border-color: #2f3a6e; }
    .btn.accent { background: #123c33; border-color: #104235; color: var(--accent); }
    .btn.danger { background: #3a1416; border-color: #4a1d20; color: #ffb4b4; }
    .muted { color: var(--muted); font-size: 13px; }
    ul.list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
    .list-item {
      border: 1px solid var(--border); border-radius: 8px; padding: 10px; background: #13182b;
      display: grid; gap: 6px;
    }
    .list-item .title { font-weight: 600; }
    .kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; padding: 1px 6px; border: 1px solid var(--border); border-radius: 6px; background: #0d1020; color: var(--muted); }
    .spacer { height: 8px; }
    .map-container { width: 100%; height: 300px; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
    .modal {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 50;
    }
    .modal.active { display: flex; }
    .modal-card {
      width: min(900px, 92vw); background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 12px;
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; }
    .modal-title { margin: 0; font-size: 16px; }
    .trip-row { display: grid; grid-template-columns: 1fr auto; gap: 6px; align-items: center; }
    .tiny { font-size: 12px; color: var(--muted); }
    .split { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    @media (max-width: 1000px) { .wrap { grid-template-columns: 1fr; } .split { grid-template-columns: 1fr; } }
  </style>

  <header>
    <h1>Tiny Trip Planner</h1>
    <span class="muted">Local-only • OpenStreetMap</span>
  </header>

  <div class="wrap">
    <aside>
      <div class="card">
        <div class="section-title">Create trip</div>
        <div class="row">
          <input id="newTripName" type="text" placeholder="Trip name (e.g., Athens 5 days)" />
          <button id="addTripBtn" class="btn accent">Add Trip</button>
        </div>
        <div class="spacer"></div>
        <div class="section-title">Your trips</div>
        <ul id="tripList" class="list"></ul>
      </div>
    </aside>

    <main>
      <div id="emptyState" class="card" style="display:none;">
        <div class="section-title">No trip selected</div>
        <p class="muted">Create a trip on the left, or select an existing one to add itineraries.</p>
      </div>

      <div id="tripView" class="card" style="display:none;">
        <div class="row" style="justify-content: space-between; align-items:center;">
          <div>
            <div class="section-title">Trip</div>
            <div class="row" style="align-items:center; gap:12px;">
              <input id="tripNameInput" type="text" placeholder="Trip name" />
              <span id="tripIdBadge" class="kbd"></span>
            </div>
            <div class="tiny">Tip: Use multiple itineraries per day (e.g., “Day 1 – City Walk”, “Day 2 AM – Brunch”, “Day 2 PM – Museum”).</div>
          </div>
          <div class="row">
            <button id="saveTripBtn" class="btn primary">Save Trip Name</button>
            <button id="deleteTripBtn" class="btn danger">Delete Trip</button>
          </div>
        </div>

        <div class="spacer"></div>
        <div class="split">
          <div class="col">
            <div class="section-title">Add itinerary</div>
            <input id="itinName" type="text" placeholder="Itinerary name (e.g., Day 1 – Old Town)" />
            <textarea id="itinNotes" placeholder="Short notes (what to do, timings, etc.)"></textarea>
            <input id="itinLocation" type="text" placeholder="Location: lat,lng • Google Maps URL • or place text" />
            <div class="row">
              <button id="parseLocationBtn" class="btn">Parse/Geocode</button>
              <span id="parseStatus" class="muted"></span>
            </div>
            <div id="previewMap" class="map-container" style="display:none;"></div>
            <div class="row" style="justify-content:flex-end;">
              <button id="addItinBtn" class="btn accent">Add Itinerary</button>
            </div>
          </div>

          <div class="col">
            <div class="section-title">Itineraries</div>
            <ul id="itinList" class="list"></ul>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Map Modal -->
  <div id="mapModal" class="modal" aria-hidden="true">
    <div class="modal-card">
      <div class="modal-header">
        <h3 id="mapModalTitle" class="modal-title">Itinerary Map</h3>
        <button id="closeModalBtn" class="btn">Close</button>
      </div>
      <div class="spacer"></div>
      <div id="modalMap" class="map-container"></div>
    </div>
  </div>

  <script>
  // -----------------------------
  // Storage & State
  // -----------------------------
  const LS_KEY = 'tiny_trip_planner_v1';
  const db = {
    trips: [],
    lastTripId: 0,
    lastItinId: 0
  };
  function loadDB() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) Object.assign(db, JSON.parse(raw));
    } catch(e) {
      console.warn('Failed to load DB', e);
    }
  }
  function saveDB() {
    localStorage.setItem(LS_KEY, JSON.stringify(db));
  }

  // -----------------------------
  // Utilities
  // -----------------------------
  function nextTripId(){ db.lastTripId += 1; saveDB(); return db.lastTripId; }
  function nextItinId(){ db.lastItinId += 1; saveDB(); return db.lastItinId; }

  function formatLatLng(lat, lng) {
    return `${Number(lat).toFixed(6)}, ${Number(lng).toFixed(6)}`;
  }

  // Extract coords from Google Maps URLs:
  // Supports:
  //  - https://www.google.com/maps/place/.../@LAT,LNG,15z
  //  - https://www.google.com/maps?q=LAT,LNG
  //  - https://maps.app.goo.gl/... (will often redirect, but may contain !3dLAT!4dLNG)
  function coordsFromGoogleUrl(input) {
    try {
      const u = new URL(input);
      const href = u.href;

      // @lat,lng,zoom
      const atMatch = href.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if (atMatch) {
        return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
      }

      // q=lat,lng or ll=lat,lng
      const q = u.searchParams.get('q') || u.searchParams.get('ll');
      if (q) {
        const m = q.match(/(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)/);
        if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[3]) };
      }

      // !3dLAT!4dLNG pattern
      const bang = href.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (bang) {
        return { lat: parseFloat(bang[1]), lng: parseFloat(bang[2]) };
      }
    } catch (_) {
      // not a valid URL
    }
    return null;
  }

  // Try to parse input:
  // - direct "lat,lng"
  // - google maps url
  // - otherwise geocode with Nominatim (free)
  async function parseLocation(input) {
    input = (input || '').trim();

    // 1) direct lat,lng
    const ll = input.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
    if (ll) {
      return { lat: parseFloat(ll[1]), lng: parseFloat(ll[3]), source: 'latlng' };
    }

    // 2) Google Maps URL
    if (input.includes('google.com/maps') || input.includes('goo.gl/maps') || input.includes('maps.app.goo.gl')) {
      const c = coordsFromGoogleUrl(input);
      if (c) return { ...c, source: 'google' };
      // If we couldn't extract numeric coords, fall back to geocoding the path text
    }

    // 3) Nominatim geocoding (OpenStreetMap, free; respect fair use)
    // NOTE: rate limits apply; this is for light personal use.
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(input)}&limit=1`;
    const res = await fetch(url, {
      headers: {
        // Nominatim recommends identifying your app via User-Agent; browser sets one.
        // Add a referer-like hint via this custom header in case some proxies strip referer.
        'Accept': 'application/json'
      }
    });
    if (!res.ok) throw new Error('Geocoding failed');
    const j = await res.json();
    if (Array.isArray(j) && j.length > 0) {
      const hit = j[0];
      return { lat: parseFloat(hit.lat), lng: parseFloat(hit.lon), source: 'nominatim' };
    }
    throw new Error('No results for that place');
  }

  // -----------------------------
  // Minimal “store” helpers
  // -----------------------------
  function addTrip(name) {
    const t = { id: nextTripId(), name: name || `Trip ${db.lastTripId}`, createdAt: Date.now(), itineraries: [] };
    db.trips.push(t);
    saveDB();
    return t;
  }
  function getTrip(id) { return db.trips.find(t => t.id === id); }
  function deleteTrip(id) {
    const idx = db.trips.findIndex(t => t.id === id);
    if (idx !== -1) db.trips.splice(idx, 1);
    saveDB();
  }
  function updateTripName(id, name) {
    const t = getTrip(id); if (t) { t.name = name; saveDB(); }
  }
  function addItinerary(tripId, { name, notes, lat, lng, locationInput }) {
    const t = getTrip(tripId); if (!t) return;
    t.itineraries.push({
      id: nextItinId(),
      name: name || `Itin ${db.lastItinId}`,
      notes: notes || '',
      lat, lng,
      locationInput: locationInput || '',
      createdAt: Date.now()
    });
    saveDB();
  }
  function updateItinerary(tripId, itinId, patch) {
    const t = getTrip(tripId); if (!t) return;
    const it = t.itineraries.find(i => i.id === itinId);
    if (it) { Object.assign(it, patch); saveDB(); }
  }
  function deleteItinerary(tripId, itinId) {
    const t = getTrip(tripId); if (!t) return;
    const idx = t.itineraries.findIndex(i => i.id === itinId);
    if (idx !== -1) { t.itineraries.splice(idx, 1); saveDB(); }
  }

  // -----------------------------
  // UI wiring
  // -----------------------------
  let currentTripId = null;
  let previewLeaflet = null;

  const els = {
    newTripName: document.getElementById('newTripName'),
    addTripBtn: document.getElementById('addTripBtn'),
    tripList: document.getElementById('tripList'),
    emptyState: document.getElementById('emptyState'),
    tripView: document.getElementById('tripView'),
    tripNameInput: document.getElementById('tripNameInput'),
    tripIdBadge: document.getElementById('tripIdBadge'),
    saveTripBtn: document.getElementById('saveTripBtn'),
    deleteTripBtn: document.getElementById('deleteTripBtn'),
    itinName: document.getElementById('itinName'),
    itinNotes: document.getElementById('itinNotes'),
    itinLocation: document.getElementById('itinLocation'),
    parseLocationBtn: document.getElementById('parseLocationBtn'),
    parseStatus: document.getElementById('parseStatus'),
    previewMap: document.getElementById('previewMap'),
    addItinBtn: document.getElementById('addItinBtn'),
    itinList: document.getElementById('itinList'),
    // modal
    mapModal: document.getElementById('mapModal'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    modalMap: document.getElementById('modalMap'),
    mapModalTitle: document.getElementById('mapModalTitle'),
  };

  function renderTrips() {
    els.tripList.innerHTML = '';
    const sorted = [...db.trips].sort((a,b) => b.createdAt - a.createdAt);
    for (const t of sorted) {
      const li = document.createElement('li');
      li.className = 'list-item';
      const selected = t.id === currentTripId;
      li.innerHTML = `
        <div class="trip-row">
          <div>
            <div class="title">${escapeHtml(t.name)}</div>
            <div class="tiny">#${t.id} • ${t.itineraries.length} itineraries</div>
          </div>
          <button class="btn ${selected ? 'accent' : ''}" data-trip="${t.id}">
            ${selected ? 'Selected' : 'Open'}
          </button>
        </div>
      `;
      li.querySelector('button').addEventListener('click', () => openTrip(t.id));
      els.tripList.appendChild(li);
    }
  }

  function openTrip(id) {
    currentTripId = id;
    const t = getTrip(id);
    if (!t) return;
    els.emptyState.style.display = 'none';
    els.tripView.style.display = 'block';
    els.tripNameInput.value = t.name;
    els.tripIdBadge.textContent = `Trip #${t.id}`;
    renderTrips();
    renderItineraries();
  }

  function renderItineraries() {
    const t = getTrip(currentTripId);
    els.itinList.innerHTML = '';
    if (!t) return;
    const its = [...t.itineraries].sort((a,b)=>a.createdAt - b.createdAt);
    for (const it of its) {
      const li = document.createElement('li');
      li.className = 'list-item';
      li.innerHTML = `
        <div class="title">${escapeHtml(it.name)}</div>
        <div class="tiny">#${it.id} • ${formatLatLng(it.lat, it.lng)}</div>
        <div class="muted">${escapeHtml(it.notes || '')}</div>
        <div class="row" style="justify-content:flex-end; gap:6px;">
          <button class="btn" data-view="${it.id}">View Map</button>
          <button class="btn primary" data-edit="${it.id}">Edit</button>
          <button class="btn danger" data-del="${it.id}">Delete</button>
        </div>
      `;
      li.querySelector('[data-view]').addEventListener('click', () => openMapModal(it));
      li.querySelector('[data-del]').addEventListener('click', () => {
        if (confirm('Delete this itinerary?')) {
          deleteItinerary(t.id, it.id);
          renderItineraries();
          renderTrips();
        }
      });
      li.querySelector('[data-edit]').addEventListener('click', () => editItineraryInline(t.id, it));
      els.itinList.appendChild(li);
    }
  }

  function editItineraryInline(tripId, it) {
    const container = document.createElement('div');
    container.className = 'list-item';
    container.innerHTML = `
      <div class="title">Edit: ${escapeHtml(it.name)}</div>
      <div class="row">
        <input type="text" id="eName" value="${escapeAttr(it.name)}" placeholder="Itinerary name" />
      </div>
      <div class="row">
        <textarea id="eNotes" placeholder="Notes">${escapeHtml(it.notes || '')}</textarea>
      </div>
      <div class="row">
        <input type="text" id="eLoc" value="${escapeAttr(it.locationInput || formatLatLng(it.lat, it.lng))}" placeholder="Location (lat,lng / GMaps URL / place text)" />
        <button class="btn" id="eParse">Parse/Geocode</button>
      </div>
      <div id="eStatus" class="muted"></div>
      <div id="eMap" class="map-container" style="display:none;"></div>
      <div class="row" style="justify-content:flex-end;">
        <button class="btn primary" id="eSave">Save</button>
        <button class="btn" id="eCancel">Cancel</button>
      </div>
    `;
    // Replace list with editor at the top
    els.itinList.prepend(container);

    let editMap = null;
    let newCoords = { lat: it.lat, lng: it.lng };

    container.querySelector('#eParse').addEventListener('click', async () => {
      const input = container.querySelector('#eLoc').value.trim();
      setStatus(container.querySelector('#eStatus'), 'Parsing…');
      try {
        const res = await parseLocation(input);
        newCoords = { lat: res.lat, lng: res.lng };
        setStatus(container.querySelector('#eStatus'), `OK (${res.source}) → ${formatLatLng(res.lat, res.lng)}`);
        showMap(container.querySelector('#eMap'), res.lat, res.lng, m => editMap = m);
      } catch (e) {
        setStatus(container.querySelector('#eStatus'), `Error: ${e.message}`, true);
      }
    });

    container.querySelector('#eSave').addEventListener('click', () => {
      const name = container.querySelector('#eName').value.trim();
      const notes = container.querySelector('#eNotes').value;
      const locationInput = container.querySelector('#eLoc').value.trim();
      updateItinerary(tripId, it.id, {
        name: name || it.name,
        notes,
        lat: newCoords.lat,
        lng: newCoords.lng,
        locationInput
      });
      renderItineraries();
    });
    container.querySelector('#eCancel').addEventListener('click', () => {
      renderItineraries();
    });

    // Preload map
    showMap(container.querySelector('#eMap'), it.lat, it.lng, m => editMap = m);
  }

  function setStatus(el, msg, isError=false) {
    el.textContent = msg;
    el.style.color = isError ? 'var(--danger)' : 'var(--muted)';
  }

  // Map helpers
  function showMap(el, lat, lng, onReady) {
    el.style.display = 'block';
    // Reset container
    el.innerHTML = '';
    const map = L.map(el).setView([lat, lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat, lng]).addTo(map);
    setTimeout(()=> map.invalidateSize(), 100); // fix hidden container sizing
    if (onReady) onReady(map);
    return map;
  }

  // Modal map
  let modalMapInstance = null;
  function openMapModal(it) {
    els.mapModalTitle.textContent = `${it.name} — ${formatLatLng(it.lat, it.lng)}`;
    els.mapModal.classList.add('active');
    if (modalMapInstance) { modalMapInstance.remove(); modalMapInstance = null; }
    modalMapInstance = showMap(els.modalMap, it.lat, it.lng);
    els.mapModal.setAttribute('aria-hidden', 'false');
  }
  function closeMapModal() {
    els.mapModal.classList.remove('active');
    els.mapModal.setAttribute('aria-hidden', 'true');
  }

  // -----------------------------
  // Event listeners
  // -----------------------------
  els.addTripBtn.addEventListener('click', () => {
    const name = els.newTripName.value.trim();
    const t = addTrip(name);
    els.newTripName.value = '';
    renderTrips();
    openTrip(t.id);
  });

  els.saveTripBtn.addEventListener('click', () => {
    const name = els.tripNameInput.value.trim();
    if (currentTripId && name) { updateTripName(currentTripId, name); renderTrips(); }
  });

  els.deleteTripBtn.addEventListener('click', () => {
    if (!currentTripId) return;
    const t = getTrip(currentTripId);
    if (!t) return;
    if (confirm(`Delete "${t.name}" and all its itineraries?`)) {
      deleteTrip(currentTripId);
      currentTripId = null;
      els.tripView.style.display = 'none';
      els.emptyState.style.display = 'block';
      renderTrips();
    }
  });

  els.parseLocationBtn.addEventListener('click', async () => {
    const input = els.itinLocation.value.trim();
    if (!input) return;
    els.parseStatus.textContent = 'Parsing…';
    els.parseStatus.style.color = 'var(--muted)';
    try {
      const res = await parseLocation(input);
      els.parseStatus.textContent = `OK (${res.source}) → ${formatLatLng(res.lat, res.lng)}`;
      els.parseStatus.style.color = 'var(--muted)';
      if (previewLeaflet && previewLeaflet.remove) previewLeaflet.remove();
      previewLeaflet = showMap(els.previewMap, res.lat, res.lng);
      els.previewMap.style.display = 'block';
      // store temp on element dataset
      els.previewMap.dataset.lat = res.lat;
      els.previewMap.dataset.lng = res.lng;
    } catch (e) {
      els.parseStatus.textContent = `Error: ${e.message}`;
      els.parseStatus.style.color = 'var(--danger)';
    }
  });

  els.addItinBtn.addEventListener('click', () => {
    if (!currentTripId) return;
    const name = els.itinName.value.trim();
    const notes = els.itinNotes.value;
    const locInput = els.itinLocation.value.trim();
    const lat = parseFloat(els.previewMap.dataset.lat);
    const lng = parseFloat(els.previewMap.dataset.lng);
    if (!isFinite(lat) || !isFinite(lng)) {
      alert('Please Parse/Geocode the location first.');
      return;
    }
    addItinerary(currentTripId, { name, notes, lat, lng, locationInput: locInput });
    // reset form (keep notes optional)
    els.itinName.value = '';
    els.itinNotes.value = '';
    els.itinLocation.value = '';
    els.previewMap.style.display = 'none';
    els.previewMap.dataset.lat = '';
    els.previewMap.dataset.lng = '';
    if (previewLeaflet && previewLeaflet.remove) previewLeaflet.remove();
    previewLeaflet = null;
    renderItineraries();
    renderTrips();
  });

  els.closeModalBtn.addEventListener('click', closeMapModal);
  els.mapModal.addEventListener('click', (e) => {
    if (e.target === els.mapModal) closeMapModal();
  });

  // -----------------------------
  // Bootstrap
  // -----------------------------
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function escapeAttr(s){ return escapeHtml(s).replace(/"/g, '&quot;'); }

  function init() {
    loadDB();
    renderTrips();
    if (db.trips.length === 0) {
      els.emptyState.style.display = 'block';
    } else {
      // Open the most recent trip by default
      const latest = [...db.trips].sort((a,b)=>b.createdAt - a.createdAt)[0];
      openTrip(latest.id);
    }
  }
  init();
  </script>
