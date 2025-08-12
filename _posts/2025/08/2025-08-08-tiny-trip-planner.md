---
layout: post
title: Tiny Trip Planner
summary: This is your tiny trip planner fully GDPR compliant, the data are stored only on your device.
categories: tools
tags: js trip app
date: 2025-08-08 09:09:09 +0000
cover: /images/logo-trip-planner.png
---

<!-- Tiny Trip Planner — final clean build (no short links, fixed map variable) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin></script>

<div class="ttp" id="ttp-root">
  <!-- Top nav -->
  <div class="ttp-topbar ttp-card">
    <div class="ttp-row ttp-wrap">
      <input class="ttp-input" id="ttp-newTripName" type="text" placeholder="Trip name (e.g., Athens – 5 days)">
      <button class="ttp-btn ttp-accent" id="ttp-addTripBtn">Add Trip</button>

      <span style="flex:1"></span>

      <!-- Import / Export controls -->
      <input id="ttp-importFile" type="file" accept="application/json,.json" style="display:none;">
      <button class="ttp-btn" id="ttp-importBtn">⤵️ Import (merge)</button>
      <button class="ttp-btn" id="ttp-exportAllBtn">⤴️ Export All</button>
    </div>
    <div class="ttp-topbar-list" id="ttp-tripList"></div>

  </div>

  <div class="ttp-gap"></div>

  <!-- Content -->
  <div class="ttp-main">
    <div id="ttp-emptyState" class="ttp-card" style="display:none;">
      <div class="ttp-section-title">No trip selected</div>
      <p class="ttp-muted">Create a trip or open one to add places.</p>
    </div>

    <div id="ttp-tripView" class="ttp-card ttp-edit-card" style="display:none;">
      <div class="ttp-row ttp-space-between">
        <div>
          <div class="ttp-section-title">Trip</div>
          <div class="ttp-row ttp-align-center ttp-gap-12">
            <input class="ttp-input" id="ttp-tripNameInput" type="text" placeholder="Trip name">
            <span id="ttp-tripIdBadge" class="ttp-kbd"></span>
          </div>
          <div class="ttp-tiny">Name auto-saves as you type.</div>
        </div>
        <div class="ttp-row">
          <button id="ttp-exportTripBtn" class="ttp-btn">⤴️ Export Trip</button>
          <button id="ttp-deleteTripBtn" class="ttp-btn ttp-danger">🗑️ Delete Trip</button>
        </div>
      </div>

      <div class="ttp-spacer"></div>

      <!-- Map filters -->
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

      <!-- All places map -->
      <div>
        <div class="ttp-section-title">Trip map (Visited = green pin, Not visited = blue pin)</div>
        <div id="ttp-allMap" class="ttp-map"></div>
      </div>

      <div class="ttp-spacer"></div>

      <div class="ttp-grid">
        <div class="ttp-col">
          <div class="ttp-section-title">Add place</div>

          <!-- Location first; auto-parse on input -->
          <input class="ttp-input" id="ttp-placeLocation" type="text" placeholder="Location (lat,lng • full Google Maps URL • or place text)">
          <div id="ttp-parseStatus" class="ttp-muted"></div>
          <div id="ttp-previewMap" class="ttp-map" style="display:none;"></div>

          <input class="ttp-input" id="ttp-placeName" type="text" placeholder="Place name (auto from Maps URL)">
          <textarea class="ttp-textarea" id="ttp-placeNotes" placeholder="Short notes (what to do, timings, etc.)"></textarea>

          <label class="ttp-check">
            <input type="checkbox" id="ttp-placeVisited">
            <span>Visited</span>
          </label>

          <div class="ttp-row ttp-right">
            <button id="ttp-addPlaceBtn" class="ttp-btn ttp-accent">Add Place</button>
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
  .ttp .ttp-topbar { background:var(--panel); border:1px solid var(--border); }
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
  .ttp .ttp-primary { background:#26305b; border-color:#2f3a6e; }
  .ttp .ttp-accent { background:#123c33; border-color:#104235; color:var(--accent); }
  .ttp .ttp-danger { background:#3a1416; border-color:#4a1d20; color:#ffb4b4; }
  .ttp .ttp-muted { color:var(--muted); font-size:13px; }
  .ttp .ttp-kbd { font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; padding:1px 6px; border:1px solid var(--border); border-radius:6px; background:#0d1020; color:var(--muted); }
  .ttp .ttp-tiny { font-size:12px; color:var(--muted); }

  .ttp .ttp-spacer { height:8px; }
  .ttp .ttp-map { width:100%; height:300px; border-radius:12px; overflow:hidden; border:1px solid var(--border); }
  .ttp .ttp-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
  .ttp .ttp-list-item { border:1px solid var(--border); border-radius:10px; padding:10px; background:#13182b; display:grid; gap:8px; }
  .ttp .ttp-title { font-weight:600; color:var(--text); }

  /* actions grid */
  .ttp .ttp-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
  .ttp .ttp-handle-btn { cursor:grab; }
  .ttp .ttp-dragging { opacity:.6; }
  .ttp .ttp-drop-target { outline:2px dashed var(--accent); border-radius:10px; }

  .ttp .ttp-topbar-list { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
  .ttp .ttp-topbar-list .ttp-tripBtn { background:#13182b; border:1px solid var(--border); color:var(--text); padding:8px 10px; border-radius:10px; cursor:pointer; }
  .ttp .ttp-tripBtn.ttp-active { background:#123c33; border-color:#104235; color:var(--accent); }

  /* clickable visited chip */
  .ttp .ttp-chip-btn {
    display:inline-flex; align-items:center; gap:6px;
    font-size:12px; padding:6px 10px; border-radius:999px; border:1px solid var(--border);
    background:#0d1020; color:var(--muted); cursor:pointer; user-select:none;
    justify-content:center; text-align:center;
  }
  .ttp .ttp-chip-btn:hover { filter:brightness(1.1); }
  .ttp .ttp-chip-btn:active { transform: translateY(1px); }
  .ttp .ttp-chip-btn.visited { color:#a3e7c9; border-color:#225a4a; background:#0e2c25; }
  .ttp .ttp-chip-icon { font-size:14px; line-height:1; }
  .ttp .ttp-place-visited .ttp-title { text-decoration: line-through; opacity:.75; }
  .ttp .ttp-check { display:flex; align-items:center; gap:8px; font-size:14px; color:var(--muted); }
</style>

<script>
(function(){
  // ---------- Storage ----------
  const LS_KEY = 'tiny_trip_planner';
  const db = { trips: [], lastTripId: 0, lastPlaceId: 0 };
  const root = document.getElementById('ttp-root');

  function loadDB(){ try{ const raw=localStorage.getItem(LS_KEY); if(raw) Object.assign(db, JSON.parse(raw)); }catch(e){ console.warn('DB load failed', e); } }
  function saveDB(){ localStorage.setItem(LS_KEY, JSON.stringify(db)); }
  function nextTripId(){ db.lastTripId+=1; saveDB(); return db.lastTripId; }
  function nextPlaceId(){ db.lastPlaceId+=1; saveDB(); return db.lastPlaceId; }

  // ---------- Helpers ----------
  function getEl(id){ return root.querySelector('#'+id); }
  const els = {
    newTripName: getEl('ttp-newTripName'),
    addTripBtn: getEl('ttp-addTripBtn'),
    tripList: getEl('ttp-tripList'),
    emptyState: getEl('ttp-emptyState'),
    tripView: getEl('ttp-tripView'),
    tripNameInput: getEl('ttp-tripNameInput'),
    tripIdBadge: getEl('ttp-tripIdBadge'),
    deleteTripBtn: getEl('ttp-deleteTripBtn'),
    exportTripBtn: getEl('ttp-exportTripBtn'),

    placeLocation: getEl('ttp-placeLocation'),
    placeName: getEl('ttp-placeName'),
    placeNotes: getEl('ttp-placeNotes'),
    placeVisited: getEl('ttp-placeVisited'),
    parseStatus: getEl('ttp-parseStatus'),
    previewMap: getEl('ttp-previewMap'),
    addPlaceBtn: getEl('ttp-addPlaceBtn'),
    placeList: getEl('ttp-placeList'),

    allMap: getEl('ttp-allMap'),
    filterVisited: getEl('ttp-filterVisited'),
    filterUnvisited: getEl('ttp-filterUnvisited'),

    importBtn: getEl('ttp-importBtn'),
    importFile: getEl('ttp-importFile'),
    exportAllBtn: getEl('ttp-exportAllBtn'),
  };

  function addTrip(name){
    const t = { id: nextTripId(), name: name || `Trip ${db.lastTripId}`, createdAt: Date.now(), places: [] };
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
  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }
  function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }

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
  let currentTripId = null;
  let previewLeaflet = null;

  // SINGLE declarations here (prevents redeclaration errors)
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
    if (/https?:\/\/(www\.)?google\.com\/maps\//i.test(input)){
      const c = coordsFromGoogleUrl(input);
      if(c) return {...c, source:'google'};
      // will fall through to OSM otherwise
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

      // auto name only for full google.com/maps URLs
      if (/https?:\/\/(www\.)?google\.com\/maps\//i.test(input)){
        const nm = nameFromGoogleUrl(input);
        if(nm && !els.placeName.value) els.placeName.value = nm;
      }
    }catch(e){
      setStatus(`Error: ${e.message}`, true);
      els.previewMap.style.display='none';
    }
  }, 400);

  // ---------- Default Leaflet pin icons (blue/green + highlight yellow) ----------
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
    // clear old layers
    allMapMarkers.forEach(m=>allMapLeaflet.removeLayer(m));
    allMapMarkers = [];
    if(allMapPolyline){ allMapLeaflet.removeLayer(allMapPolyline); allMapPolyline=null; }

    const showVisited = els.filterVisited.checked;
    const showUnvisited = els.filterUnvisited.checked;

    const ordered = getTrip(currentTripId).places.slice();
    const visible = ordered.filter(p => (p.visited && showVisited) || (!p.visited && showUnvisited));
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

  // Temporary highlight pin when adding a place
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
      btn.textContent = `${t.name} (#${t.id})`;
      btn.addEventListener('click',()=>openTrip(t.id));
      els.tripList.appendChild(btn);
    }
  }

  function openTrip(id){
    currentTripId = id;
    const t=getTrip(id); if(!t) return;
    els.emptyState.style.display='none';
    els.tripView.style.display='block';
    els.tripNameInput.value=t.name;
    els.tripIdBadge.textContent=`Trip #${t.id}`;
    renderTrips();
    renderPlaces();
    renderAllPlacesMap();
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
          <button class="ttp-btn ttp-primary" data-edit="${p.id}">✏️ Edit</button>
          <button class="ttp-btn ttp-danger" data-del="${p.id}">🗑️ Delete</button>

          <button class="ttp-btn ttp-handle-btn" draggable="true" data-handle="${idx}" title="Drag to reorder">↕️ Reorder</button>
          <button class="ttp-chip-btn ${p.visited ? 'visited':''}" data-chip="${p.id}" aria-pressed="${p.visited ? 'true':'false'}" title="Toggle visited">
            <span class="ttp-chip-icon">${p.visited ? '✅' : '🗺️'}</span>
            <span>${p.visited ? 'Visited' : 'Mark visited'}</span>
          </button>
        </div>
      `;

      // clickable visited chip
      li.querySelector(`[data-chip="${p.id}"]`).addEventListener('click', ()=>{
        updatePlace(t.id, p.id, { visited: !p.visited });
        renderPlaces();
        renderAllPlacesMap();
      });

      // delete
      li.querySelector('[data-del]').addEventListener('click',()=>{
        if(confirm('Delete this place?')){ deletePlace(t.id, p.id); renderPlaces(); renderTrips(); renderAllPlacesMap(); }
      });

      // edit inline
      li.querySelector('[data-edit]').addEventListener('click',()=>editPlaceInline(t.id,p));

      // drag & drop — handle initiates drag, items accept drop
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

      <!-- Location first; auto parse -->
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
        if (/https?:\/\/(www\.)?google\.com\/maps\//i.test(input)){
          const nm = nameFromGoogleUrl(input);
          if(nm && (!eName.value || /^Place \d+$/.test(eName.value))) eName.value = nm;
        }
      }catch(err){
        setStatusInline(`Error: ${err.message}`, true);
        eMap.style.display='none';
      }
    }, 400);

    eLoc.addEventListener('input', doAuto);
    // initial map
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

  // ---------- Import / Export ----------
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

  // ---------- Events ----------
  els.addTripBtn.addEventListener('click', ()=>{
    const name = els.newTripName.value.trim();
    const t = addTrip(name);
    els.newTripName.value='';
    renderTrips(); openTrip(t.id);
  });

  // Autosave trip name on input (debounced)
  els.tripNameInput.addEventListener('input', debounce(()=>{
    if(currentTripId){
      const name = els.tripNameInput.value.trim();
      updateTripName(currentTripId, name || `Trip ${currentTripId}`);
      renderTrips();
    }
  }, 300));

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

  // Import / Export buttons
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

  // Auto-parse while typing in "Add place"
  els.placeLocation.addEventListener('input', autoParse);

  els.addPlaceBtn.addEventListener('click', ()=>{
    if(!currentTripId) return;
    const name = els.placeName.value.trim();
    const notes = els.placeNotes.value;
    const locInput = els.placeLocation.value.trim();
    const lat = parseFloat(els.previewMap.dataset.lat);
    const lng = parseFloat(els.previewMap.dataset.lng);
    const visited = !!els.placeVisited.checked;
    if(!isFinite(lat) || !isFinite(lng)){
      alert('Type a location (lat,lng / full Google Maps URL / text) and wait for it to resolve first.');
      return;
    }
    addPlace(currentTripId, { name, notes, lat, lng, locationInput: locInput, visited });

    // reset the add form
    els.placeName.value=''; els.placeNotes.value=''; els.placeLocation.value=''; els.placeVisited.checked=false;
    els.previewMap.style.display='none'; els.previewMap.dataset.lat=''; els.previewMap.dataset.lng='';
    if(previewLeaflet && previewLeaflet.remove) previewLeaflet.remove(); previewLeaflet=null;

    // refresh UI and map, then temporarily highlight the just-added spot
    renderPlaces(); renderTrips(); renderAllPlacesMap();
    flashHighlight(lat, lng);
  });

  // Map filters
  els.filterVisited.addEventListener('change', renderAllPlacesMap);
  els.filterUnvisited.addEventListener('change', renderAllPlacesMap);

  // ---------- Init ----------
  function init(){
    loadDB();
    renderTrips();
    if(db.trips.length===0){
      els.emptyState.style.display='block';
    }else{
      const latest=[...db.trips].sort((a,b)=>b.createdAt-a.createdAt)[0];
      openTrip(latest.id);
    }
  }
  init();
})();
</script>
