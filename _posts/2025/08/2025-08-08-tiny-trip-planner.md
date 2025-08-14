---
layout: post
title: Tiny Trip Planner
summary: This is your tiny trip planner fully GDPR compliant, the data are stored only on your device.
categories: tools
tags: js trip app
date: 2025-08-08 09:09:09 +0000
cover: /images/logo-trip-planner.png
---

<script>
 // ---------- Predefined Trips (sample dataset) ----------
  window.PREDEFINED_TRIPS = [
    { id:'paris-2d', name:'Paris Highlights (2 days)', tags:['paris','france','europe','museum','landmarks'], places:[
      { name:'Eiffel Tower', lat:48.858370, lng:2.294481, notes:'Great views. Pre-book tickets.' },
      { name:'Louvre Museum', lat:48.860611, lng:2.337644, notes:'Mona Lisa time.' },
      { name:'Notre-Dame (outside)', lat:48.852968, lng:2.349902, notes:'Walk the Seine.' },
      { name:'Montmartre & Sacré-Cœur', lat:48.886705, lng:2.343104, notes:'Sunset on the steps.' },
    ]},
    { id:'tokyo-food', name:'Tokyo Food Crawl', tags:['tokyo','japan','food','markets','ramen'], places:[
      { name:'Tsukiji Outer Market', lat:35.665486, lng:139.770666, notes:'Fresh sushi breakfast.' },
      { name:'Ameya-Yokochō (Ueno)', lat:35.711246, lng:139.773719, notes:'Street eats + snacks.' },
      { name:'Ichiran Ramen Shibuya', lat:35.659022, lng:139.700475, notes:'Famous solo booths.' },
      { name:'Memory Lane (Omoide Yokochō)', lat:35.691340, lng:139.700531, notes:'Yakitori alley.' },
    ]},
    { id:'bucharest-day', name:'Bucharest City Day', tags:['bucharest','romania','old town','architecture'], places:[
      { name:'Old Town (Centrul Vechi)', lat:44.431220, lng:26.098839, notes:'Walk Lipscani streets.' },
      { name:'Romanian Athenaeum', lat:44.441334, lng:26.097317, notes:'Concert hall & photos.' },
      { name:'Palace of Parliament', lat:44.427539, lng:26.087536, notes:'Huge building tour.' },
      { name:'Herastrau Park', lat:44.476365, lng:26.080838, notes:'Relax by the lake.' },
    ]},
    { id:'nyc-1d', name:'NYC One-Day Blitz', tags:['new york','usa','city','iconic'], places:[
      { name:'Times Square', lat:40.758000, lng:-73.985500, notes:'Quick photo stop.' },
      { name:'Central Park (The Mall)', lat:40.773628, lng:-73.972533, notes:'Stroll through.' },
      { name:'Top of the Rock', lat:40.759101, lng:-73.979583, notes:'City view.' },
      { name:'Brooklyn Bridge', lat:40.706086, lng:-73.996864, notes:'Walk at sunset.' },
    ]},
  { 
    id: 'santorini-5d', 
    name: 'Santorini Greece (5 days)', 
    tags: ['santorini','greece','europe','beaches','historic','cliffs','boat','food'], 
    places: [
      { name: 'Orthodox Metropolitan Cathedral (Ypapanti), Fira', lat: 36.418889, lng: 25.431111, notes: 'Start here. Short walk to caldera path.' },
      { name: 'Cathedral of Saint John the Baptist (Catholic), Fira', lat: 36.41995, lng: 25.43185, notes: 'Baroque interior.' },
      { name: 'Agios Minas Church Viewpoint', lat: 36.4178, lng: 25.4308, notes: 'Classic caldera viewpoint.' },
      { name: 'Naoussa Restaurant (Fira)', lat: 36.42127, lng: 25.428107, notes: 'Dinner with caldera view.' },
      { name: 'PK Cocktail Bar', lat: 36.4209, lng: 25.4303, notes: 'Sunset drinks.' },
      { name: 'Pyrgos Kallistis', lat: 36.3918, lng: 25.4589, notes: 'Hilltop village with panoramic views.' },
      { name: 'Akrotiri Archaeological Site', lat: 36.35139, lng: 25.40361, notes: 'Bronze Age city preserved in ash.' },
      { name: 'Red Beach Viewpoint', lat: 36.348774, lng: 25.393743, notes: 'Photo stop with unique red cliffs.' },
      { name: 'Vlychada Beach', lat: 36.3425, lng: 25.4392, notes: 'Sculpted cliffs and calm waters.' },
      { name: 'Santo Wines', lat: 36.3869, lng: 25.4349, notes: 'Wine tasting at sunset.' },
      { name: 'Vlychada Marina', lat: 36.3465, lng: 25.4546, notes: 'Boat rental starting point.' },
      { name: 'Santorini SeaBreeze Rent a Boat', lat: 36.3467, lng: 25.4553, notes: 'Popular boat hire without license.' },
      { name: 'Red Beach (by boat)', lat: 36.3499, lng: 25.3938, notes: 'Swim stop accessible by sea.' },
      { name: 'Palea Kameni Hot Springs', lat: 36.4033, lng: 25.3956, notes: 'Warm sulfur waters in the caldera.' },
      { name: 'Ammoudi Bay', lat: 36.45818, lng: 25.37165, notes: 'Dock area under Oia with seafood tavernas.' },
      { name: 'Dimitris Ammoudi Taverna', lat: 36.4597, lng: 25.3712, notes: 'Seafood dinner by the water.' },
      { name: 'Oia Byzantine Castle Ruins', lat: 36.46001, lng: 25.37294, notes: 'Best visited early for views.' },
      { name: 'Caldera Viewpoint (Oia)', lat: 36.46063, lng: 25.37334, notes: 'Iconic cliffside views.' },
      { name: 'Melitini Oia', lat: 36.4613, lng: 25.3784, notes: 'Greek tapas with a view.' },
      { name: 'Kamari Beach', lat: 36.376159, lng: 25.484426, notes: 'Organized black sand beach.' },
      { name: 'Metaxi Mas', lat: 36.3853, lng: 25.4637, notes: 'Beloved local taverna; book ahead.' },
      { name: 'Imerovigli', lat: 36.4320, lng: 25.4200, notes: 'Cliff village with stunning vistas.' },
      { name: 'Skaros Rock', lat: 36.432378, lng: 25.418123, notes: 'Hike to fortress ruins with sea views.' },
      { name: 'Avocado Restaurant Imerovigli', lat: 36.4315, lng: 25.4218, notes: 'Casual lunch with view.' },
      { name: 'Ancient Thera', lat: 36.362969, lng: 25.47987, notes: 'Hilltop ruins with sweeping views.' },
      { name: 'Fira Old Town', lat: 36.4203, lng: 25.4322, notes: 'Shops, cafes, and last-minute views.' }
    ]
  }
  ];
</script>

<!-- Tiny Trip Planner — toolbars as full-width rows (mobile-safe), small place buttons -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin></script>

<div class="ttp" id="ttp-root">
  <!-- Shared content banner FIRST -->
  <div id="ttp-shareBanner" class="ttp-card ttp-share-banner" style="display:none;">
    <div class="ttp-row ttp-space-between ttp-wrap">
      <div>
        <div class="ttp-section-title">Shared content detected</div>
        <div class="ttp-muted" id="ttp-shareSummary">A friend sent you a trip.</div>
      </div>
      <div class="ttp-row ttp-wrap">
        <button class="ttp-btn ttp-accent ttp-btn--sm" id="ttp-importSharedNew">Import as New Trip</button>
        <button class="ttp-btn ttp-btn--sm" id="ttp-mergeSharedCurrent">Merge Places into Current</button>
        <button class="ttp-btn ttp-danger ttp-btn--sm" id="ttp-dismissShared">Dismiss</button>
      </div>
    </div>
    <div class="ttp-tiny ttp-muted">Note: Links are Base64-encoded and optionally gzip-compressed. They’re readable, not encrypted.</div>
  </div>

  <div class="ttp-gap"></div>

  <!-- Trip Starter (Unified Create/Search + Tools row + Trip navbar) -->
  <div class="ttp-starter ttp-card">
    <!-- tools row (full width, wraps on mobile) -->
    <div class="ttp-card-tools">
      <input id="ttp-importFile" type="file" accept="application/json,.json" style="display:none;">
      <button class="ttp-btn ttp-btn--sm" id="ttp-importBtn" title="Import (merge)">⤵️ Import</button>
      <button class="ttp-btn ttp-btn--sm" id="ttp-exportAllBtn" title="Export all">⤴️ Export All</button>
    </div>

    <div class="ttp-section-title">Create or search a trip</div>

    <!-- Unified input -->
    <div class="ttp-col">
      <input class="ttp-input" id="ttp-quickInput" type="text" placeholder="Type a new trip name (press Enter) or search predefined templates…">
      <!-- In-flow results list (no overlap) -->
      <div id="ttp-predefResults" class="ttp-predef-results" style="display:none;"></div>
    </div>

    <div class="ttp-spacer"></div>

    <div class="ttp-section-title">Your Trips</div>
    <div class="ttp-topbar-list" id="ttp-tripList"></div>

  </div>

  <div class="ttp-gap"></div>

  <!-- Content -->
  <div class="ttp-main">
    <div id="ttp-emptyState" class="ttp-card" style="display:none;">
      <div class="ttp-section-title">No trip selected</div>
      <p class="ttp-muted">Create a trip, open one, or use a predefined template.</p>
    </div>

    <div id="ttp-tripView" class="ttp-card ttp-edit-card" style="display:none;">
      <!-- trip tools row (full width, wraps on mobile) -->
      <div class="ttp-card-tools">
        <button id="ttp-tripVisitedBtn" class="ttp-btn ttp-btn--sm" title="Toggle trip visited">🗺️ Mark visited</button>
        <button id="ttp-exportTripBtn" class="ttp-btn ttp-btn--sm" title="Export this trip">⤴️ Export Trip</button>
        <button id="ttp-shareTripBtn" class="ttp-btn ttp-btn--sm" title="Share current trip via link">🔗 Share</button>
        <button id="ttp-deleteTripBtn" class="ttp-btn ttp-danger ttp-btn--sm" title="Delete this trip">🗑️ Delete</button>
      </div>

      <div class="ttp-row ttp-space-between ttp-wrap">
        <div>
          <div class="ttp-section-title">Trip</div>
          <div class="ttp-row ttp-align-center ttp-gap-12">
            <input class="ttp-input" id="ttp-tripNameInput" type="text" placeholder="Trip name">
            <span id="ttp-tripIdBadge" class="ttp-kbd"></span>
          </div>
          <div class="ttp-tiny">Name auto-saves as you type.</div>
        </div>
      </div>

      <!-- Share output panel (only shown when generating a link) -->
      <div id="ttp-sharePanel" class="ttp-share" style="display:none;">
        <input class="ttp-input" id="ttp-shareLink" readonly>
        <div class="ttp-row ttp-wrap">
          <button class="ttp-btn ttp-accent ttp-btn--sm" id="ttp-copyShare">Copy</button>
          <button class="ttp-btn ttp-btn--sm" id="ttp-closeShare">Close</button>
          <span class="ttp-tiny ttp-muted" id="ttp-shareNote"></span>
        </div>
      </div>

      <div class="ttp-spacer"></div>

      <!-- Filters delimiter -->
      <div class="ttp-section-title">Filters</div>
      <div class="ttp-row ttp-wrap">
        <label class="ttp-check">
          <input type="checkbox" id="ttp-filterVisited" checked>
          <span>Show visited</span>
        </label>
        <label class="ttp-check">
          <input type="checkbox" id="ttp-filterUnvisited" checked>
          <span>Show unvisited</span>
        </label>
      </div>

      <!-- All places map with vertical padding -->
      <div class="ttp-map-wrap">
        <div class="ttp-section-title">Trip map (Visited = green pin, Not visited = blue pin)</div>
        <div id="ttp-allMap" class="ttp-map"></div>
      </div>

      <div class="ttp-spacer"></div>

      <div class="ttp-grid">
        <div class="ttp-col">
          <div class="ttp-section-title">Add place</div>

          <!-- sub-card wrapper for add place -->
          <div class="ttp-subcard">
            <!-- Location first; auto-parse on input -->
            <input class="ttp-input" id="ttp-placeLocation" type="text" placeholder="Location (lat,lng • full Google Maps URL • or place text)">
            <div id="ttp-parseStatus" class="ttp-muted"></div>
            <div id="ttp-previewMap" class="ttp-map" style="display:none;"></div>

            <input class="ttp-input" id="ttp-placeName" type="text" placeholder="Place name (auto from Maps URL)">
            <textarea class="ttp-textarea" id="ttp-placeNotes" placeholder="Short notes (what to do, timings, etc.)"></textarea>

            <div class="ttp-row ttp-right">
              <button id="ttp-addPlaceBtn" class="ttp-btn ttp-accent">Add Place</button>
            </div>
          </div>
        </div>

        <div class="ttp-col">
          <div class="ttp-section-title">Places (drag to reorder)</div>
          <ul id="ttp-placeList" class="ttp-list"></ul>
        </div>
      </div>
    </div>

  </div>
</div>

<style>
  /* ---------- SCOPED STYLES ---------- */
  .ttp { --bg:#0f1220; --panel:#161A2B; --panel2:#1B2138; --text:#E8ECF1; --muted:#A7B0C0; --accent:#6EE7B7; --danger:#f87171; --border:#27304a; }
  .ttp * { box-sizing:border-box; }
  .ttp .ttp-main { color:var(--text); }
  .ttp .ttp-card { background:var(--panel2); border:1px solid var(--border); border-radius:12px; padding:12px; }
  .ttp .ttp-edit-card { border-radius:16px; }
  .ttp .ttp-gap { height:16px; }
  .ttp .ttp-section-title { font-size:13px; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin:4px 0 8px; }
  .ttp .ttp-row { display:flex; gap:8px; align-items:center; }
  .ttp .ttp-space-between { justify-content:space-between; }
  .ttp .ttp-right { justify-content:flex-end; }
  .ttp .ttp-align-center { align-items:center; }
  .ttp .ttp-wrap { flex-wrap:wrap; }
  .ttp .ttp-col { display:flex; flex-direction:column; gap:6px; }
  .ttp .ttp-input, .ttp .ttp-textarea {
    width:100%; background:#111426; color:var(--text); border:1px solid var(--border);
    border-radius:10px; padding:10px; outline:none; font:inherit;
  }
  .ttp .ttp-textarea { min-height:80px; resize:vertical; }
  .ttp .ttp-btn { background:#1f2542; color:var(--text); border:1px solid var(--border); padding:9px 12px; border-radius:10px; cursor:pointer; font:inherit; }
  .ttp .ttp-btn:hover { filter:brightness(1.1); }
  .ttp .ttp-btn--sm { padding:6px 8px; border-radius:9px; font-size:12px; line-height:1; }
  .ttp .ttp-primary { background:#26305b; border-color:#2f3a6e; }
  .ttp .ttp-accent { background:#123c33; border-color:#104235; color:var(--accent); }
  .ttp .ttp-danger { background:#3a1416; border-color:#4a1d20; color:#ffb4b4; }
  .ttp .ttp-muted { color:var(--muted); font-size:13px; }
  .ttp .ttp-kbd { font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; padding:1px 6px; border:1px solid var(--border); border-radius:6px; background:#0d1020; color:var(--muted); }
  .ttp .ttp-tiny { font-size:12px; color:var(--muted); }

  .ttp .ttp-spacer { height:8px; }
  .ttp .ttp-map { width:100%; height:300px; border-radius:12px; overflow:hidden; border:1px solid var(--border); }
  .ttp .ttp-map-wrap { padding:14px 0; } /* highlight main map vertically */
  .ttp .ttp-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
  .ttp .ttp-list-item { border:1px solid var(--border); border-radius:10px; padding:10px; background:#13182b; display:grid; gap:8px; }
  .ttp .ttp-title { font-weight:600; color:var(--text); }

  .ttp .ttp-subcard { border:1px solid var(--border); border-radius:10px; padding:10px; background:#13182b; display:grid; gap:8px; }

  /* actions grid */
  .ttp .ttp-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .ttp .ttp-handle-btn { cursor:grab; }
  .ttp .ttp-dragging { opacity:.6; }
  .ttp .ttp-drop-target { outline:2px dashed var(--accent); border-radius:10px; }

  .ttp .ttp-topbar-list { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
  .ttp .ttp-topbar-list .ttp-tripBtn { background:#13182b; border:1px solid var(--border); color:var(--text); padding:8px 10px; border-radius:10px; cursor:pointer; }
  .ttp .ttp-tripBtn.ttp-active { background:#123c33; border-color:#104235; color:var(--accent); }

  /* Predefined trips results — in-flow (no overlap) */
  .ttp .ttp-predef-results {
    display:grid; gap:8px; padding:8px; margin-top:8px;
    border:1px solid var(--border); border-radius:10px; background:#0f1428;
    max-height:320px; overflow:auto;
  }
  .ttp .ttp-predef-item { display:flex; flex-direction:column; gap:6px; border:1px solid var(--border); background:#121934; border-radius:8px; padding:8px; }
  .ttp .ttp-predef-title { font-weight:600; color:var(--text); }
  .ttp .ttp-predef-tags { font-size:12px; color:var(--muted); }
  .ttp .ttp-predef-actions { display:flex; gap:8px; flex-wrap:wrap; }

  /* Share panel & banner */
  .ttp .ttp-share { margin-top:10px; display:grid; gap:8px; }
  .ttp .ttp-share-banner { border-left:3px solid var(--accent); }

  /* Card tools: full-width row at top (no absolute positioning) */
  .ttp .ttp-card-tools {
    display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; margin-bottom:8px;
  }
</style>

<script>
(function(){
  // ---------- Storage ----------
  const LS_KEY = 'tiny_trip_planner'; // stable key
  const db = { trips: [], lastTripId: 0, lastPlaceId: 0 };
  const root = document.getElementById('ttp-root');

  function loadDB(){ try{ const raw=localStorage.getItem(LS_KEY); if(raw) Object.assign(db, JSON.parse(raw)); }catch(e){ console.warn('DB load failed', e); } }
  function saveDB(){ localStorage.setItem(LS_KEY, JSON.stringify(db)); }
  function nextTripId(){ db.lastTripId+=1; saveDB(); return db.lastTripId; }
  function nextPlaceId(){ db.lastPlaceId+=1; saveDB(); return db.lastPlaceId; }

  // ---------- Predefined Trips from page (no built-ins here) ----------
  const PREDEFINED_TRIPS = Array.isArray(window.PREDEFINED_TRIPS) ? window.PREDEFINED_TRIPS : [];

  // ---------- Helpers ----------
  function getEl(id){ return root.querySelector('#'+id); }
  const els = {
    // starter unified
    quickInput: getEl('ttp-quickInput'),
    predefResults: getEl('ttp-predefResults'),
    tripList: getEl('ttp-tripList'),

    // share (banner + panel)
    shareBanner: getEl('ttp-shareBanner'),
    shareSummary: getEl('ttp-shareSummary'),
    importSharedNew: getEl('ttp-importSharedNew'),
    mergeSharedCurrent: getEl('ttp-mergeSharedCurrent'),
    dismissShared: getEl('ttp-dismissShared'),
    shareTripBtn: getEl('ttp-shareTripBtn'),
    sharePanel: getEl('ttp-sharePanel'),
    shareLink: getEl('ttp-shareLink'),
    copyShare: getEl('ttp-copyShare'),
    closeShare: getEl('ttp-closeShare'),
    shareNote: getEl('ttp-shareNote'),

    // main
    emptyState: getEl('ttp-emptyState'),
    tripView: getEl('ttp-tripView'),
    tripNameInput: getEl('ttp-tripNameInput'),
    tripIdBadge: getEl('ttp-tripIdBadge'),
    tripVisitedBtn: getEl('ttp-tripVisitedBtn'),
    deleteTripBtn: getEl('ttp-deleteTripBtn'),
    exportTripBtn: getEl('ttp-exportTripBtn'),

    placeLocation: getEl('ttp-placeLocation'),
    placeName: getEl('ttp-placeName'),
    placeNotes: getEl('ttp-placeNotes'),
    parseStatus: getEl('ttp-parseStatus'),
    previewMap: getEl('ttp-previewMap'),
    addPlaceBtn: getEl('ttp-addPlaceBtn'),
    placeList: getEl('ttp-placeList'),

    allMap: getEl('ttp-allMap'),
    filterVisited: getEl('ttp-filterVisited'),
    filterUnvisited: getEl('ttp-filterUnvisited'),

    // utilities
    importBtn: getEl('ttp-importBtn'),
    importFile: getEl('ttp-importFile'),
    exportAllBtn: getEl('ttp-exportAllBtn'),
  };

  function addTrip(name){
    const t = { id: nextTripId(), name: name || `Trip ${db.lastTripId}`, createdAt: Date.now(), visited:false, places: [] };
    db.trips.push(t); saveDB(); return t;
  }
  function getTrip(id){ return db.trips.find(t=>t.id===id); }
  function updateTripName(id, name){ const t=getTrip(id); if(t){ t.name=name; saveDB(); } }
  function deleteTrip(id){ const i=db.trips.findIndex(t=>t.id===id); if(i>-1){ db.trips.splice(i,1); saveDB(); } }

  function addPlace(tripId, {name, notes, lat, lng, locationInput, visited}){
    const t=getTrip(tripId); if(!t) return;
    t.places.push({
      id: nextPlaceId(),
      name: name || `Place ${db.lastPlaceId}`,
      notes: notes||'',
      lat, lng,
      locationInput: locationInput||'',
      visited: !!visited,
      createdAt: Date.now()
    });
    saveDB();
  }
  function updatePlace(tripId, placeId, patch){
    const t=getTrip(tripId); if(!t) return;
    const p=t.places.find(x=>x.id===placeId);
    if(p){ Object.assign(p, patch); saveDB(); }
  }
  function deletePlace(tripId, placeId){
    const t=getTrip(tripId); if(!t) return;
    const i=t.places.findIndex(x=>x.id===placeId);
    if(i>-1){ t.places.splice(i,1); saveDB(); }
  }
  function movePlace(tripId, fromIdx, toIdx){
    const t=getTrip(tripId); if(!t) return;
    if(fromIdx===toIdx || fromIdx<0 || toIdx<0 || fromIdx>=t.places.length || toIdx>t.places.length) return;
    const [item] = t.places.splice(fromIdx,1);
    t.places.splice(toIdx,0,item);
    saveDB();
  }

  function formatLatLng(lat,lng){ return `${Number(lat).toFixed(6)}, ${Number(lng).toFixed(6)}`; }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }
  function isFullGmapsUrl(str){ return /https?:\/\/(www\.)?google\.com\/maps\//i.test(str||''); }
  function buildGmapsUrlFromLatLng(lat,lng,name){
    const base=`https://www.google.com/maps?q=${encodeURIComponent(lat+','+lng)}`;
    return name ? `${base}(${encodeURIComponent(name)})` : base;
  }

  // ---------- Google Maps desktop URL parsing only ----------
  function coordsFromGoogleUrl(input){
    try{
      const u = new URL(input);
      const href = u.href;
      const at = href.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if(at) return {lat:parseFloat(at[1]), lng:parseFloat(at[2])};
      const q = u.searchParams.get('q') || u.searchParams.get('ll');
      if(q){
        const m = q.match(/(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)/);
        if(m) return {lat:parseFloat(m[1]), lng:parseFloat(m[3])};
      }
      const bang = href.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if(bang) return {lat:parseFloat(bang[1]), lng:parseFloat(bang[2])};
    }catch(e){}
    return null;
  }
  function nameFromGoogleUrl(input){
    try{
      const u = new URL(input);
      const path = u.pathname || '';
      const placeIdx = path.indexOf('/place/');
      if(placeIdx !== -1){
        const seg = path.slice(placeIdx + 7).split('/')[0];
        const plusFixed = seg.replace(/\+/g,' ');
        let decoded = decodeURIComponent(plusFixed);
        decoded = decoded.replace(/`/g, "'").replace(/\s+/g,' ').trim();
        if(decoded) return decoded;
      }
      const q = u.searchParams.get('q');
      if(q && !/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(q)){
        const plusFixed = q.replace(/\+/g,' ');
        let decoded = decodeURIComponent(plusFixed).replace(/`/g,"'").replace(/\s+/g,' ').trim();
        if(decoded) return decoded;
      }
    }catch(e){}
    return '';
  }

  // ---------- Geocoding (auto, debounced) ----------
  let currentTripId = null; // declared once
  let previewLeaflet = null;

  // SINGLE map vars
  let allMapLeaflet = null;
  let allMapMarkers = [];
  let allMapPolyline = null;

  function setStatus(msg, isErr=false){
    els.parseStatus.textContent = msg || '';
    els.parseStatus.style.color = isErr ? 'var(--danger)' : 'var(--muted)';
  }

  async function parseLocation(input){
    input = (input||'').trim();

    // Explicitly reject short mobile links
    if (/(^https?:\/\/)?(maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(input)) {
      throw new Error('Mobile short links are not supported. Open the link and paste the full https://www.google.com/maps/... URL, or paste lat,lng.');
    }

    // 1) lat,lng
    const m = input.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
    if(m) return {lat:parseFloat(m[1]), lng:parseFloat(m[3]), source:'latlng'};

    // 2) full google.com/maps URL
    if (isFullGmapsUrl(input)){
      const c = coordsFromGoogleUrl(input);
      if(c) return {...c, source:'google'};
    }

    // 3) OSM Nominatim text search (free)
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(input)}&limit=1`;
    const res = await fetch(url, { headers:{'Accept':'application/json'} });
    if(!res.ok) throw new Error('Geocoding failed');
    const j = await res.json();
    if(Array.isArray(j) && j.length>0){
      const hit=j[0];
      return {lat:parseFloat(hit.lat), lng:parseFloat(hit.lon), source:'nominatim'};
    }
    throw new Error('No results for that place');
  }

  function debounce(fn, delay){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), delay); }; }

  const autoParse = debounce(async ()=>{
    const input = els.placeLocation.value.trim();
    if(!input){ els.previewMap.style.display='none'; setStatus(''); return; }
    try{
      setStatus('Finding location…');
      const res = await parseLocation(input);
      setStatus(`OK (${res.source}) → ${formatLatLng(res.lat,res.lng)}`);
      if(previewLeaflet && previewLeaflet.remove) previewLeaflet.remove();
      previewLeaflet = showSinglePin(els.previewMap, res.lat, res.lng, false);
      els.previewMap.style.display='block';
      els.previewMap.dataset.lat = res.lat;
      els.previewMap.dataset.lng = res.lng;

      if (isFullGmapsUrl(input)){
        const nm = nameFromGoogleUrl(input);
        if(nm && !els.placeName.value) els.placeName.value = nm;
      }
    }catch(e){
      setStatus(`Error: ${e.message}`, true);
      els.previewMap.style.display='none';
    }
  }, 400);

  // ---------- Default Leaflet pin icons ----------
  const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
  const icon = (url)=> new L.Icon({
    iconUrl: url, shadowUrl: shadowUrl,
    iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [1,-34], shadowSize: [41,41]
  });
  const visitedIcon   = icon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png');
  const unvisitedIcon = icon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png');
  const highlightIcon = icon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png');
  function pinIcon(visited){ return visited ? visitedIcon : unvisitedIcon; }

  // ---------- Map helpers ----------
  function showSinglePin(el, lat, lng, visited){
    el.innerHTML='';
    const map = L.map(el).setView([lat,lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat,lng], { icon: pinIcon(visited) }).addTo(map);
    setTimeout(()=>map.invalidateSize(),100);
    return map;
  }

  function renderAllPlacesMap(){
    const t=getTrip(currentTripId); if(!t) return;

    if(!allMapLeaflet){
      allMapLeaflet = L.map(els.allMap).setView([0,0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(allMapLeaflet);
      setTimeout(()=>allMapLeaflet.invalidateSize(), 100);
    }
    allMapMarkers.forEach(m=>allMapLeaflet.removeLayer(m));
    allMapMarkers = [];
    if(allMapPolyline){ allMapLeaflet.removeLayer(allMapPolyline); allMapPolyline=null; }

    const showVisited = els.filterVisited.checked;
    const showUnvisited = els.filterUnvisited.checked;

    const visible = getTrip(currentTripId).places
      .filter(p => (p.visited && showVisited) || (!p.visited && showUnvisited));

    const latlngs = [];

    for(const p of visible){
      const marker = L.marker([p.lat,p.lng], { icon: pinIcon(p.visited) })
        .addTo(allMapLeaflet)
        .bindPopup(`<strong>${escapeHtml(p.name)}</strong>${p.visited ? ' <span style="opacity:.7;">(visited)</span>' : ''}<br/>${formatLatLng(p.lat,p.lng)}`);
      allMapMarkers.push(marker);
      latlngs.push([p.lat, p.lng]);
    }

    if(latlngs.length >= 2){
      allMapPolyline = L.polyline(latlngs, { weight:3 }).addTo(allMapLeaflet);
    }

    if(latlngs.length){
      allMapLeaflet.fitBounds(L.latLngBounds(latlngs), { padding:[20,20] });
    }else{
      allMapLeaflet.setView([0,0], 2);
    }
  }

  function flashHighlight(lat, lng){
    if(!allMapLeaflet) return;
    const m = L.marker([lat,lng], { icon: highlightIcon, zIndexOffset: 1000 }).addTo(allMapLeaflet);
    setTimeout(()=>{ allMapLeaflet.removeLayer(m); }, 1500);
  }

  // ---------- UI ----------
  function renderTrips(){
    els.tripList.innerHTML='';
    const sorted=[...db.trips].sort((a,b)=>b.createdAt-a.createdAt);
    for(const t of sorted){
      const btn=document.createElement('button');
      btn.className='ttp-tripBtn' + (t.id===currentTripId ? ' ttp-active' : '');
      btn.textContent = `${t.name} (#${t.id})${t.visited ? ' ✅' : ''}`;
      btn.addEventListener('click',()=>openTrip(t.id));
      els.tripList.appendChild(btn);
    }
  }

  function openTrip(id){
    currentTripId = id;
    const t=getTrip(id); if(!t) return;
    if(typeof t.visited !== 'boolean'){ t.visited = false; saveDB(); }

    els.emptyState.style.display='none';
    els.tripView.style.display='block';
    els.tripNameInput.value=t.name;
    els.tripIdBadge.textContent=`Trip #${t.id}`;

    setTripVisitedButton(t.visited);

    renderTrips();
    renderPlaces();
    renderAllPlacesMap();
  }

  function setTripVisitedButton(isVisited){
    if(!els.tripVisitedBtn) return;
    els.tripVisitedBtn.classList.toggle('ttp-accent', !!isVisited);
    els.tripVisitedBtn.textContent = isVisited ? '✅ Trip visited' : '🗺️ Mark trip visited';
    els.tripVisitedBtn.setAttribute('aria-pressed', isVisited ? 'true' : 'false');
  }

  function googleLinkForPlace(p){
    if (isFullGmapsUrl(p.locationInput)) return p.locationInput;
    return buildGmapsUrlFromLatLng(p.lat, p.lng, p.name);
  }

  function renderPlaces(){
    const t=getTrip(currentTripId);
    if(!t) return;
    els.placeList.innerHTML='';

    t.places.forEach((p, idx)=>{
      const li=document.createElement('li');
      li.className='ttp-list-item' + (p.visited ? ' ttp-place-visited' : '');
      li.dataset.index = idx;

      li.innerHTML=`
        <div>
          <div class="ttp-title">${escapeHtml(p.name)}</div>
          <div class="ttp-muted">#${p.id} • ${formatLatLng(p.lat,p.lng)}</div>
          <div class="ttp-muted">${escapeHtml(p.notes||'')}</div>
        </div>

        <div class="ttp-actions">
          <button class="ttp-btn ttp-btn--sm ttp-primary" data-edit="${p.id}">✏️ Edit</button>
          <button class="ttp-btn ttp-btn--sm ttp-danger" data-del="${p.id}">🗑️ Delete</button>
          <button class="ttp-btn ttp-btn--sm ttp-accent" data-open="${p.id}" title="Open in Google Maps">📍 Open Map</button>
          <button class="ttp-btn ttp-btn--sm ${p.visited ? 'ttp-accent' : ''}" data-visit="${p.id}" aria-pressed="${p.visited ? 'true':'false'}" title="Toggle visited">
            ${p.visited ? '✅ Visited' : '🗺️ Mark visited'}
          </button>
          <button class="ttp-btn ttp-btn--sm ttp-handle-btn" draggable="true" data-handle="${idx}" title="Drag to reorder">↕️ Reorder</button>
        </div>
      `;

      li.querySelector(`[data-open="${p.id}"]`).addEventListener('click', ()=>{
        const url = googleLinkForPlace(p);
        window.open(url, '_blank', 'noopener,noreferrer');
      });

      li.querySelector(`[data-visit="${p.id}"]`).addEventListener('click', ()=>{
        updatePlace(t.id, p.id, { visited: !p.visited });
        renderPlaces();
        renderAllPlacesMap();
      });

      li.querySelector('[data-del]').addEventListener('click',()=>{
        if(confirm('Delete this place?')){ deletePlace(t.id, p.id); renderPlaces(); renderTrips(); renderAllPlacesMap(); }
      });

      li.querySelector('[data-edit]').addEventListener('click',()=>editPlaceInline(t.id,p));

      const handle = li.querySelector(`[data-handle="${idx}"]`);
      handle.addEventListener('dragstart', (ev)=>{
        ev.dataTransfer.setData('text/plain', String(idx));
        li.classList.add('ttp-dragging');
      });
      handle.addEventListener('dragend', ()=> li.classList.remove('ttp-dragging'));
      li.addEventListener('dragover', (ev)=>{ ev.preventDefault(); li.classList.add('ttp-drop-target'); });
      li.addEventListener('dragleave', ()=> li.classList.remove('ttp-drop-target'));
      li.addEventListener('drop', (ev)=>{
        ev.preventDefault();
        li.classList.remove('ttp-drop-target');
        const from = parseInt(ev.dataTransfer.getData('text/plain'),10);
        const to = parseInt(li.dataset.index,10);
        if(Number.isInteger(from) && Number.isInteger(to)){
          movePlace(t.id, from, to + (from < to ? 1 : 0));
          renderPlaces();
          renderAllPlacesMap();
        }
      });

      els.placeList.appendChild(li);
    });
  }

  function editPlaceInline(tripId, p){
    const container=document.createElement('div');
    container.className='ttp-list-item';
    container.innerHTML=`
      <div class="ttp-title">Edit: ${escapeHtml(p.name)}</div>

      <input class="ttp-input" id="eLoc" value="${escapeAttr(p.locationInput || formatLatLng(p.lat,p.lng))}" placeholder="Location (lat,lng / full GMaps URL / place text)">
      <div id="eStatus" class="ttp-muted"></div>
      <div id="eMap" class="ttp-map" style="display:none;"></div>

      <input class="ttp-input" id="eName" value="${escapeAttr(p.name)}" placeholder="Place name">
      <textarea class="ttp-textarea" id="eNotes" placeholder="Notes">${escapeHtml(p.notes||'')}</textarea>

      <div class="ttp-row ttp-right">
        <button class="ttp-btn ttp-primary" id="eSave">Save</button>
        <button class="ttp-btn" id="eCancel">Cancel</button>
      </div>
    `;
    els.placeList.prepend(container);

    let newCoords = {lat:p.lat, lng:p.lng};

    const eLoc = container.querySelector('#eLoc');
    const eName = container.querySelector('#eName');
    const eStatus = container.querySelector('#eStatus');
    const eMap = container.querySelector('#eMap');

    function setStatusInline(msg,isErr=false){ eStatus.textContent=msg||''; eStatus.style.color=isErr?'var(--danger)':'var(--muted)'; }

    const doAuto = debounce(async ()=>{
      const input = eLoc.value.trim();
      if(!input){ eMap.style.display='none'; setStatusInline(''); return; }
      try{
        setStatusInline('Finding location…');
        const res = await parseLocation(input);
        newCoords = {lat:res.lat, lng:res.lng};
        setStatusInline(`OK (${res.source}) → ${formatLatLng(res.lat,res.lng)}`);
        showSinglePin(eMap, res.lat, res.lng, p.visited); eMap.style.display='block';
        if (isFullGmapsUrl(input)){
          const nm = nameFromGoogleUrl(input);
          if(nm && (!eName.value || /^Place \d+$/.test(eName.value))) eName.value = nm;
        }
      }catch(err){
        setStatusInline(`Error: ${err.message}`, true);
        eMap.style.display='none';
      }
    }, 400);

    eLoc.addEventListener('input', doAuto);
    showSinglePin(eMap, p.lat, p.lng, p.visited); eMap.style.display='block';

    container.querySelector('#eSave').addEventListener('click',()=>{
      const name = eName.value.trim() || p.name;
      const notes = container.querySelector('#eNotes').value;
      const locationInput = eLoc.value.trim();
      updatePlace(tripId, p.id, { name, notes, lat:newCoords.lat, lng:newCoords.lng, locationInput });
      renderPlaces();
      renderAllPlacesMap();
    });
    container.querySelector('#eCancel').addEventListener('click',()=>renderPlaces());
  }

  // ---------- Import / Export (file) ----------
  function download(filename, text){
    const blob = new Blob([text], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download=filename; document.body.appendChild(a); a.click();
    setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); }, 0);
  }
  function timestamp(){ const d=new Date(); return d.toISOString().replace(/[:.]/g,'-'); }

  function exportAll(){
    const payload = { version: 1, exportedAt: new Date().toISOString(), data: db };
    download(`trip-planner-all-${timestamp()}.json`, JSON.stringify(payload, null, 2));
  }
  function exportTrip(id){
    const t=getTrip(id); if(!t){ alert('No trip selected'); return; }
    const payload = { version: 1, exportedAt: new Date().toISOString(), data: { trip: t } };
    download(`trip-${t.id}-${slug(t.name)}-${timestamp()}.json`, JSON.stringify(payload, null, 2));
  }
  function slug(s){ return String(s||'trip').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40); }

  async function importMerge(obj){
    const data = obj?.data ?? obj;
    if(!data){ alert('Invalid file: missing data'); return; }

    let trips = [];
    if(Array.isArray(data.trips)){ trips = data.trips; }
    else if(data.trip){ trips = [data.trip]; }
    else if(Array.isArray(obj)){ trips = obj; }
    else if(data.name && Array.isArray(data.places)){ trips = [data]; }

    if(!Array.isArray(trips) || trips.length===0){ alert('No trips found to import'); return; }

    const addedTripIds = [];
    for(const incoming of trips){
      const newTrip = {
        id: nextTripId(),
        name: incoming.name || `Imported Trip ${db.lastTripId}`,
        createdAt: Date.now(),
        visited: !!incoming.visited,
        places: []
      };
      const places = Array.isArray(incoming.places) ? incoming.places : [];
      for(const p of places){
        newTrip.places.push({
          id: nextPlaceId(),
          name: p.name || `Imported Place ${db.lastPlaceId}`,
          notes: p.notes || '',
          lat: Number(p.lat) || 0,
          lng: Number(p.lng) || 0,
          locationInput: p.locationInput || '',
          visited: !!p.visited,
          createdAt: Date.now()
        });
      }
      db.trips.push(newTrip);
      addedTripIds.push(newTrip.id);
    }
    saveDB();
    renderTrips();
    if(addedTripIds.length){ openTrip(addedTripIds[addedTripIds.length-1]); }
    alert(`Imported ${addedTripIds.length} trip(s).`);
  }

  // ---------- Share Links (gzip + Base64URL in #hash) ----------
  function uint8ToBase64(bytes){
    let bin = '';
    const chunk = 0x8000;
    for(let i=0; i<bytes.length; i+=chunk){
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i+chunk));
    }
    return btoa(bin);
  }
  function base64ToUint8(b64){
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for(let i=0; i<bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }
  function toBase64Url(bytes){
    return uint8ToBase64(bytes).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function fromBase64Url(str){
    const b64 = str.replace(/-/g,'+').replace(/_/g,'/');
    const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
    return base64ToUint8(b64 + pad);
  }

  async function gzipCompress(str){
    try{
      if('CompressionStream' in window){
        const cs = new CompressionStream('gzip');
        const stream = new Blob([str]).stream().pipeThrough(cs);
        const buf = await new Response(stream).arrayBuffer();
        return new Uint8Array(buf);
      }
    }catch(e){}
    return new TextEncoder().encode(str);
  }
  async function gzipDecompress(bytes){
    try{
      if('DecompressionStream' in window){
        const ds = new DecompressionStream('gzip');
        const stream = new Blob([bytes]).stream().pipeThrough(ds);
        return await new Response(stream).text();
      }
    }catch(e){}
    return new TextDecoder().decode(bytes);
  }

  async function makeShareLink(payloadObj){
    const json = JSON.stringify(payloadObj);
    const bytes = await gzipCompress(json);
    const encoded = toBase64Url(bytes);
    const url = `${location.origin}${location.pathname}#ttp-share=${encoded}`;
    return { url, usedGzip: ('CompressionStream' in window), length: url.length };
  }

  function showSharePanel(url, note){
    els.shareLink.value = url;
    els.sharePanel.style.display = 'grid';
    els.shareNote.textContent = note || '';
  }
  function hideSharePanel(){
    els.sharePanel.style.display = 'none';
    els.shareLink.value = '';
    els.shareNote.textContent = '';
  }
  async function shareCurrentTrip(){
    if(!currentTripId){ alert('Open a trip first'); return; }
    const t = getTrip(currentTripId);
    const payload = { version: 1, exportedAt: new Date().toISOString(), data: { trip: t } };
    const { url, usedGzip, length } = await makeShareLink(payload);
    let note = usedGzip ? 'Compressed with gzip + Base64. ' : 'No gzip support detected — using plain Base64. ';
    if(length > 4000) note += `Warning: link length is ${length} chars; some apps may truncate long links.`;
    showSharePanel(url, note);
  }

  async function tryLoadSharedFromHash(){
    const h = location.hash || '';
    const prefix = '#ttp-share=';
    if(!h.startsWith(prefix)) return null;
    const encoded = h.slice(prefix.length);
    try{
      const bytes = fromBase64Url(encoded);
      const text = await gzipDecompress(bytes);
      const obj = JSON.parse(text);

      const data = obj?.data ?? obj;
      let summary = 'A friend sent you a trip.';
      if(data?.trip){
        const name = data.trip.name || 'Untitled';
        const count = Array.isArray(data.trip.places) ? data.trip.places.length : 0;
        summary = `Trip: "${name}" with ${count} place(s).`;
      }else if(Array.isArray(data?.trips)){
        summary = `Dataset with ${data.trips.length} trip(s).`;
      }else if(data?.name && Array.isArray(data?.places)){
        const count = data.places.length;
        summary = `Trip: "${data.name}" with ${count} place(s).`;
      }
      els.shareSummary.textContent = summary;
      els.shareBanner.style.display = 'block';

      els.importSharedNew.onclick = async ()=>{
        await importMerge(obj);
        clearHash();
        els.shareBanner.style.display='none';
      };
      els.mergeSharedCurrent.onclick = async ()=>{
        const dataIn = obj?.data ?? obj;
        if(!currentTripId){ alert('Open or create a trip first to merge places.'); return; }
        const t = getTrip(currentTripId);
        if(dataIn?.trip && Array.isArray(dataIn.trip.places)){
          dataIn.trip.places.forEach(p=>{
            t.places.push({
              id: nextPlaceId(),
              name: p.name || `Imported Place ${db.lastPlaceId}`,
              notes: p.notes || '',
              lat: Number(p.lat) || 0,
              lng: Number(p.lng) || 0,
              locationInput: p.locationInput || '',
              visited: !!p.visited,
              createdAt: Date.now()
            });
          });
          saveDB(); renderPlaces(); renderAllPlacesMap(); clearHash(); els.shareBanner.style.display='none';
        }else{
          alert('Merge is available for a single shared trip. Use "Import as New Trip" for multi-trip data.');
        }
      };
      els.dismissShared.onclick = ()=>{ clearHash(); els.shareBanner.style.display='none'; };

      return obj;
    }catch(e){
      console.error('Failed to parse shared data:', e);
      els.shareSummary.textContent = 'Could not read shared content.';
      els.mergeSharedCurrent.style.display = 'none';
      els.importSharedNew.textContent = 'Dismiss';
      els.importSharedNew.onclick = ()=>{ clearHash(); els.shareBanner.style.display='none'; };
      els.shareBanner.style.display = 'block';
      return null;
    }
  }
  function clearHash(){
    if(history.replaceState){
      history.replaceState(null, '', location.pathname + location.search);
    }else{
      location.hash = '';
    }
  }

  // ---------- Unified Create/Search logic ----------
  function searchPredefs(q){
    if(!Array.isArray(PREDEFINED_TRIPS)) return [];
    q = (q||'').trim().toLowerCase();
    if(!q) return [];
    const words = q.split(/\s+/).filter(Boolean);
    const scored = PREDEFINED_TRIPS.map(t=>{
      const hay = (t.name + ' ' + (t.tags||[]).join(' ')).toLowerCase();
      const score = words.reduce((s,w)=> s + (hay.includes(w) ? 1 : 0), 0);
      return { trip:t, score };
    }).filter(x=>x.score>0);
    scored.sort((a,b)=> b.score - a.score || a.trip.name.localeCompare(b.trip.name));
    return scored.slice(0,8).map(x=>x.trip);
  }

  function renderUnifiedResults(){
    const q = els.quickInput.value.trim();
    const results = searchPredefs(q);
    const box = els.predefResults;
    box.innerHTML = '';

    if(q){
      const createItem = document.createElement('div');
      createItem.className = 'ttp-predef-item';
      createItem.innerHTML = `
        <div class="ttp-predef-title">➕ Create trip named “${escapeHtml(q)}”</div>
        <div class="ttp-predef-tags">Press Enter or click to create a new trip.</div>
      `;
      createItem.addEventListener('click', ()=>{
        const t = addTrip(q);
        els.quickInput.value = '';
        box.style.display = 'none';
        renderTrips(); openTrip(t.id);
      });
      box.appendChild(createItem);
    }

    results.forEach(tpl=>{
      const item = document.createElement('div');
      item.className='ttp-predef-item';
      item.innerHTML = `
        <div class="ttp-predef-title">${escapeHtml(tpl.name)}</div>
        <div class="ttp-predef-tags">Tags: ${(tpl.tags||[]).map(t=>`<span>#${escapeHtml(t)}</span>`).join(' ')}</div>
        <div class="ttp-predef-actions">
          <button class="ttp-btn ttp-accent ttp-btn--sm" data-add>➕ Add as New Trip</button>
          <button class="ttp-btn ttp-btn--sm" data-merge>➕ Add Places to Current</button>
        </div>
      `;
      item.querySelector('[data-add]').addEventListener('click', ()=>{
        const newTrip = {
          id: nextTripId(),
          name: tpl.name || 'New Trip',
          createdAt: Date.now(),
          visited: !!tpl.visited,
          places: []
        };
        (tpl.places||[]).forEach(p=>{
          newTrip.places.push({
            id: nextPlaceId(),
            name: p.name,
            notes: p.notes || '',
            lat: Number(p.lat),
            lng: Number(p.lng),
            locationInput: p.locationInput || '',
            visited: !!p.visited,
            createdAt: Date.now()
          });
        });
        db.trips.push(newTrip); saveDB();
        els.predefResults.style.display='none'; els.quickInput.value='';
        renderTrips(); openTrip(newTrip.id);
      });
      item.querySelector('[data-merge]').addEventListener('click', ()=>{
        if(!currentTripId){ alert('Open or create a trip first to merge places.'); return; }
        const t = getTrip(currentTripId);
        (tpl.places||[]).forEach(p=>{
          t.places.push({
            id: nextPlaceId(),
            name: p.name,
            notes: p.notes || '',
            lat: Number(p.lat),
            lng: Number(p.lng),
            locationInput: p.locationInput || '',
            visited: !!p.visited,
            createdAt: Date.now()
          });
        });
        saveDB();
        els.predefResults.style.display='none';
        renderPlaces(); renderAllPlacesMap();
      });
      box.appendChild(item);
    });

    box.style.display = (q || results.length) ? 'grid' : 'none';
  }

  // ---------- Events ----------
  els.quickInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      const name = els.quickInput.value.trim();
      if(!name) return;
      const t = addTrip(name);
      els.quickInput.value = '';
      els.predefResults.style.display='none';
      renderTrips(); openTrip(t.id);
    }
  });
  els.quickInput.addEventListener('input', debounce(renderUnifiedResults, 150));

  els.tripNameInput.addEventListener('input', debounce(()=>{
    if(currentTripId){
      const name = els.tripNameInput.value.trim();
      updateTripName(currentTripId, name || `Trip ${currentTripId}`);
      renderTrips();
    }
  }, 300));

  els.tripVisitedBtn.addEventListener('click', ()=>{
    if(!currentTripId) return;
    const t = getTrip(currentTripId);
    t.visited = !t.visited;
    saveDB();
    setTripVisitedButton(t.visited);
    renderTrips();
  });

  els.deleteTripBtn.addEventListener('click', ()=>{
    if(!currentTripId) return;
    const t=getTrip(currentTripId); if(!t) return;
    if(confirm(`Delete "${t.name}" and all its places?`)){
      deleteTrip(currentTripId);
      currentTripId=null;
      els.tripView.style.display='none';
      els.emptyState.style.display='block';
      renderTrips();
    }
  });

  // Import / Export (file)
  els.exportAllBtn.addEventListener('click', exportAll);
  els.exportTripBtn.addEventListener('click', ()=> currentTripId ? exportTrip(currentTripId) : alert('Open a trip first'));
  els.importBtn.addEventListener('click', ()=> els.importFile.click());
  els.importFile.addEventListener('change', async (e)=>{
    const file = e.target.files?.[0];
    if(!file) return;
    try{
      const text = await file.text();
      const json = JSON.parse(text);
      await importMerge(json);
    }catch(err){
      console.error(err);
      alert('Could not import this file. Make sure it is a JSON export from this app.');
    }finally{
      e.target.value = '';
    }
  });

  // Share (trip-level only)
  els.shareTripBtn.addEventListener('click', shareCurrentTrip);
  els.copyShare.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(els.shareLink.value);
      els.shareNote.textContent = (els.shareNote.textContent||'') + ' Copied!';
    }catch(e){
      els.shareNote.textContent = 'Could not auto-copy. Select and copy manually.';
    }
  });
  els.closeShare.addEventListener('click', hideSharePanel);

  // Add place flow
  els.placeLocation.addEventListener('input', autoParse);
  els.addPlaceBtn.addEventListener('click', ()=>{
    if(!currentTripId) return;
    const name = els.placeName.value.trim();
    const notes = els.placeNotes.value;
    const locInput = els.placeLocation.value.trim();
    const lat = parseFloat(els.previewMap.dataset.lat);
    const lng = parseFloat(els.previewMap.dataset.lng);
    const visited = false; // new places default unvisited
    if(!isFinite(lat) || !isFinite(lng)){
      alert('Type a location (lat,lng / full Google Maps URL / text) and wait for it to resolve first.');
      return;
    }
    addPlace(currentTripId, { name, notes, lat, lng, locationInput: locInput, visited });

    els.placeName.value=''; els.placeNotes.value=''; els.placeLocation.value='';
    els.previewMap.style.display='none'; els.previewMap.dataset.lat=''; els.previewMap.dataset.lng='';
    if(previewLeaflet && previewLeaflet.remove) previewLeaflet.remove(); previewLeaflet=null;

    renderPlaces(); renderTrips(); renderAllPlacesMap();
    flashHighlight(lat, lng);
  });

  // Map filters
  els.filterVisited.addEventListener('change', renderAllPlacesMap);
  els.filterUnvisited.addEventListener('change', renderAllPlacesMap);

  // ---------- Init ----------
  async function init(){
    loadDB();
    db.trips.forEach(t=>{ if(typeof t.visited!=='boolean'){ t.visited=false; } });
    saveDB();

    renderTrips();
    if(db.trips.length===0){
      els.emptyState.style.display='block';
    }else{
      const latest=[...db.trips].sort((a,b)=>b.createdAt-a.createdAt)[0];
      openTrip(latest.id);
    }
    await tryLoadSharedFromHash(); // shows banner before starter
  }
  init();
})();
</script>
