---
layout: post
title: Tiny Trip Planner
summary: This is your tiny trip planner fully GDPR compliant, the data are stored only on your device.
categories: tools
tags: js trip app
date: 2025-08-08 09:09:09 +0000
cover: https://example.com/img.png
---

<!-- Tiny Trip Planner (scoped widget) -->
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

<div class="ttp" id="ttp-root">
  <div class="ttp-wrap">
    <aside class="ttp-aside ttp-card">
      <div class="ttp-section-title">Create trip</div>
      <div class="ttp-row">
        <input class="ttp-input" id="ttp-newTripName" type="text" placeholder="Trip name (e.g., Athens – 5 days)" />
        <button class="ttp-btn ttp-accent" id="ttp-addTripBtn">Add Trip</button>
      </div>

      <div class="ttp-spacer"></div>
      <div class="ttp-section-title">Your trips</div>
      <ul id="ttp-tripList" class="ttp-list"></ul>
    </aside>

    <main class="ttp-main">
      <div id="ttp-emptyState" class="ttp-card" style="display:none;">
        <div class="ttp-section-title">No trip selected</div>
        <p class="ttp-muted">Create a trip or open one to add places.</p>
      </div>

      <div id="ttp-tripView" class="ttp-card" style="display:none;">
        <div class="ttp-row ttp-space-between">
          <div>
            <div class="ttp-section-title">Trip</div>
            <div class="ttp-row ttp-align-center ttp-gap-12">
              <input class="ttp-input" id="ttp-tripNameInput" type="text" placeholder="Trip name" />
              <span id="ttp-tripIdBadge" class="ttp-kbd"></span>
            </div>
            <div class="ttp-tiny">Tip: Break a day into multiple <em>places</em> (AM, PM, etc.).</div>
          </div>
          <div class="ttp-row">
            <button id="ttp-saveTripBtn" class="ttp-btn ttp-primary">Save Trip Name</button>
            <button id="ttp-deleteTripBtn" class="ttp-btn ttp-danger">Delete Trip</button>
          </div>
        </div>

        <div class="ttp-spacer"></div>

        <div class="ttp-grid">
          <div class="ttp-col">
            <div class="ttp-section-title">Add place</div>
            <input class="ttp-input" id="ttp-placeName" type="text" placeholder="Place name (auto-filled from Maps URL)" />
            <textarea class="ttp-textarea" id="ttp-placeNotes" placeholder="Short notes (what to do, timings, etc.)"></textarea>
            <div class="ttp-row ttp-wrap">
              <input class="ttp-input" id="ttp-placeLocation" type="text" placeholder="lat,lng • Google Maps URL • or place text" />
              <button id="ttp-pasteBtn" class="ttp-btn" title="Paste from clipboard">Paste</button>
              <button id="ttp-parseLocationBtn" class="ttp-btn">Parse/Geocode</button>
              <span id="ttp-parseStatus" class="ttp-muted"></span>
            </div>
            <div id="ttp-previewMap" class="ttp-map" style="display:none;"></div>
            <div class="ttp-row ttp-right">
              <button id="ttp-addPlaceBtn" class="ttp-btn ttp-accent">Add Place</button>
            </div>
          </div>

          <div class="ttp-col">
            <div class="ttp-section-title">Places</div>
            <ul id="ttp-placeList" class="ttp-list"></ul>
          </div>
        </div>
      </div>
    </main>

  </div>

  <!-- Map Modal -->
  <div id="ttp-mapModal" class="ttp-modal" aria-hidden="true">
    <div class="ttp-modal-card">
      <div class="ttp-modal-header">
        <h3 id="ttp-mapModalTitle" class="ttp-modal-title">Place Map</h3>
        <button id="ttp-closeModalBtn" class="ttp-btn">Close</button>
      </div>
      <div class="ttp-spacer"></div>
      <div id="ttp-modalMap" class="ttp-map"></div>
    </div>
  </div>
</div>

<style>
  /* ---------- SCOPED STYLES ---------- */
  .ttp { --bg:#0f1220; --panel:#161A2B; --panel2:#1B2138; --text:#E8ECF1; --muted:#A7B0C0; --accent:#6EE7B7; --danger:#f87171; --border:#27304a; }
  .ttp * { box-sizing:border-box; }
  .ttp .ttp-wrap { display:grid; grid-template-columns:320px 1fr; gap:0; }
  .ttp .ttp-aside { border-right:1px solid var(--border); background:var(--panel); padding:12px; }
  .ttp .ttp-main { padding:16px; background: linear-gradient(180deg, var(--panel2), var(--bg)); }
  .ttp .ttp-card { background:var(--panel2); border:1px solid var(--border); border-radius:10px; padding:12px; color:var(--text); }
  .ttp .ttp-section-title { font-size:13px; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin:8px 0 6px; }
  .ttp .ttp-row { display:flex; gap:8px; align-items:center; }
  .ttp .ttp-gap-12 { gap:12px; }
  .ttp .ttp-space-between { justify-content:space-between; }
  .ttp .ttp-right { justify-content:flex-end; }
  .ttp .ttp-align-center { align-items:center; }
  .ttp .ttp-wrap { flex-wrap:wrap; }
  .ttp .ttp-col { display:flex; flex-direction:column; gap:6px; }
  .ttp .ttp-input, .ttp .ttp-textarea {
    width:100%; background:#111426; color:var(--text); border:1px solid var(--border);
    border-radius:8px; padding:10px; outline:none; font:inherit;
  }
  .ttp .ttp-textarea { min-height:80px; resize:vertical; }
  .ttp .ttp-btn { background:#1f2542; color:var(--text); border:1px solid var(--border); padding:9px 12px; border-radius:8px; cursor:pointer; font:inherit; }
  .ttp .ttp-btn:hover { filter:brightness(1.1); }
  .ttp .ttp-primary { background:#26305b; border-color:#2f3a6e; }
  .ttp .ttp-accent { background:#123c33; border-color:#104235; color:var(--accent); }
  .ttp .ttp-danger { background:#3a1416; border-color:#4a1d20; color:#ffb4b4; }
  .ttp .ttp-muted { color:var(--muted); font-size:13px; }
  .ttp .ttp-tiny { font-size:12px; color:var(--muted); }
  .ttp .ttp-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
  .ttp .ttp-list-item { border:1px solid var(--border); border-radius:8px; padding:10px; background:#13182b; display:grid; gap:6px; }
  .ttp .ttp-title { font-weight:600; }
  .ttp .ttp-kbd { font-family:ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size:12px; padding:1px 6px; border:1px solid var(--border); border-radius:6px; background:#0d1020; color:var(--muted); }
  .ttp .ttp-spacer { height:8px; }
  .ttp .ttp-map { width:100%; height:300px; border-radius:10px; overflow:hidden; border:1px solid var(--border); }
  .ttp .ttp-modal { position:fixed; inset:0; background:rgba(0,0,0,.5); display:none; align-items:center; justify-content:center; z-index:9999; }
  .ttp .ttp-modal.active { display:flex; }
  .ttp .ttp-modal-card { width:min(900px,92vw); background:var(--panel); border:1px solid var(--border); border-radius:12px; padding:12px; }
  .ttp .ttp-modal-header { display:flex; justify-content:space-between; align-items:center; }
  .ttp .ttp-modal-title { margin:0; font-size:16px; color:var(--text); }
  .ttp .ttp-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  @media (max-width: 1000px){ .ttp .ttp-wrap { grid-template-columns:1fr; } .ttp .ttp-grid { grid-template-columns:1fr; } }
</style>

<script>
(function(){
  // ---------- Storage ----------
  const LS_KEY = 'tiny_trip_planner_v2'; // new key due to renaming itineraries -> places
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
    saveTripBtn: getEl('ttp-saveTripBtn'),
    deleteTripBtn: getEl('ttp-deleteTripBtn'),
    placeName: getEl('ttp-placeName'),
    placeNotes: getEl('ttp-placeNotes'),
    placeLocation: getEl('ttp-placeLocation'),
    pasteBtn: getEl('ttp-pasteBtn'),
    parseLocationBtn: getEl('ttp-parseLocationBtn'),
    parseStatus: getEl('ttp-parseStatus'),
    previewMap: getEl('ttp-previewMap'),
    addPlaceBtn: getEl('ttp-addPlaceBtn'),
    placeList: getEl('ttp-placeList'),
    mapModal: getEl('ttp-mapModal'),
    closeModalBtn: getEl('ttp-closeModalBtn'),
    modalMap: getEl('ttp-modalMap'),
    mapModalTitle: getEl('ttp-mapModalTitle'),
  };

  function addTrip(name){
    const t = { id: nextTripId(), name: name || `Trip ${db.lastTripId}`, createdAt: Date.now(), places: [] };
    db.trips.push(t); saveDB(); return t;
  }
  function getTrip(id){ return db.trips.find(t=>t.id===id); }
  function updateTripName(id, name){ const t=getTrip(id); if(t){ t.name=name; saveDB(); } }
  function deleteTrip(id){ const i=db.trips.findIndex(t=>t.id===id); if(i>-1){ db.trips.splice(i,1); saveDB(); } }

  function addPlace(tripId, {name, notes, lat, lng, locationInput}){
    const t=getTrip(tripId); if(!t) return;
    t.places.push({ id: nextPlaceId(), name: name || `Place ${db.lastPlaceId}`, notes: notes||'', lat, lng, locationInput: locationInput||'', createdAt: Date.now() });
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

  function formatLatLng(lat,lng){ return `${Number(lat).toFixed(6)}, ${Number(lng).toFixed(6)}`; }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'&quot;'); }

  // ---------- Google URL parsers ----------
  function coordsFromGoogleUrl(input){
    try{
      const u = new URL(input);
      const href = u.href;

      // @lat,lng,zoom
      const at = href.match(/@(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
      if(at) return {lat:parseFloat(at[1]), lng:parseFloat(at[2])};

      // q=lat,lng or ll=lat,lng
      const q = u.searchParams.get('q') || u.searchParams.get('ll');
      if(q){
        const m = q.match(/(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)/);
        if(m) return {lat:parseFloat(m[1]), lng:parseFloat(m[3])};
      }

      // !3dLAT!4dLNG
      const bang = href.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if(bang) return {lat:parseFloat(bang[1]), lng:parseFloat(bang[2])};
    }catch(e){}
    return null;
  }

  function nameFromGoogleUrl(input){
    try{
      const u = new URL(input);

      // 1) /maps/place/<NAME>/...
      const path = u.pathname || '';
      const placeIdx = path.indexOf('/place/');
      if(placeIdx !== -1){
        const after = path.slice(placeIdx + 7); // skip '/place/'
        const seg = after.split('/')[0]; // first segment is encoded name
        // decode '+' as spaces and percent-decoding
        const plusFixed = seg.replace(/\+/g,' ');
        let decoded = decodeURIComponent(plusFixed);
        // Normalize: backtick to apostrophe (Google sometimes uses U+0060)
        decoded = decoded.replace(/`/g, "'");
        // Trim and collapse spaces
        decoded = decoded.replace(/\s+/g,' ').trim();
        if(decoded) return decoded;
      }

      // 2) fallback: q parameter sometimes contains name (when not coords)
      const q = u.searchParams.get('q');
      if(q && !/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(q)){
        const plusFixed = q.replace(/\+/g,' ');
        let decoded = decodeURIComponent(plusFixed).replace(/`/g,"'").replace(/\s+/g,' ').trim();
        if(decoded) return decoded;
      }
    }catch(e){}
    return '';
  }

  // ---------- Geocoding ----------
  async function parseLocation(input){
    input = (input||'').trim();

    // lat,lng
    const m = input.match(/^(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)$/);
    if(m) return {lat:parseFloat(m[1]), lng:parseFloat(m[3]), source:'latlng'};

    // Google Maps URL
    if (/(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/.test(input)){
      const c = coordsFromGoogleUrl(input);
      if(c) return {...c, source:'google'};
    }

    // Nominatim (free)
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

  // ---------- UI / Maps ----------
  let currentTripId = null;
  let previewMap = null;

  function showMap(el, lat, lng){
    el.style.display='block';
    el.innerHTML='';
    const map = L.map(el).setView([lat,lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat,lng]).addTo(map);
    setTimeout(()=>map.invalidateSize(), 100);
    return map;
  }

  function setStatus(msg, isErr=false){
    els.parseStatus.textContent = msg || '';
    els.parseStatus.style.color = isErr ? 'var(--danger)' : 'var(--muted)';
  }

  function renderTrips(){
    els.tripList.innerHTML='';
    const sorted=[...db.trips].sort((a,b)=>b.createdAt-a.createdAt);
    for(const t of sorted){
      const li=document.createElement('li');
      li.className='ttp-list-item';
      const selected = t.id===currentTripId;
      li.innerHTML = `
        <div class="ttp-row ttp-space-between">
          <div>
            <div class="ttp-title">${escapeHtml(t.name)}</div>
            <div class="ttp-tiny">#${t.id} • ${t.places.length} places</div>
          </div>
          <button class="ttp-btn ${selected?'ttp-accent':''}" data-trip="${t.id}">
            ${selected?'Selected':'Open'}
          </button>
        </div>
      `;
      li.querySelector('button').addEventListener('click',()=>openTrip(t.id));
      els.tripList.appendChild(li);
    }
  }

  function openTrip(id){
    currentTripId=id;
    const t=getTrip(id); if(!t) return;
    els.emptyState.style.display='none';
    els.tripView.style.display='block';
    els.tripNameInput.value=t.name;
    els.tripIdBadge.textContent=`Trip #${t.id}`;
    renderTrips();
    renderPlaces();
  }

  function renderPlaces(){
    const t=getTrip(currentTripId);
    if(!t) return;
    els.placeList.innerHTML='';
    const places=[...t.places].sort((a,b)=>a.createdAt-b.createdAt);
    for(const p of places){
      const li=document.createElement('li');
      li.className='ttp-list-item';
      li.innerHTML=`
        <div class="ttp-title">${escapeHtml(p.name)}</div>
        <div class="ttp-tiny">#${p.id} • ${formatLatLng(p.lat,p.lng)}</div>
        <div class="ttp-muted">${escapeHtml(p.notes||'')}</div>
        <div class="ttp-row" style="justify-content:flex-end; gap:6px;">
          <button class="ttp-btn" data-view="${p.id}">View Map</button>
          <button class="ttp-btn ttp-primary" data-edit="${p.id}">Edit</button>
          <button class="ttp-btn ttp-danger" data-del="${p.id}">Delete</button>
        </div>
      `;
      li.querySelector('[data-view]').addEventListener('click',()=>openMapModal(p));
      li.querySelector('[data-del]').addEventListener('click',()=>{
        if(confirm('Delete this place?')){ deletePlace(t.id, p.id); renderPlaces(); renderTrips(); }
      });
      li.querySelector('[data-edit]').addEventListener('click',()=>editPlaceInline(t.id,p));
      els.placeList.appendChild(li);
    }
  }

  function editPlaceInline(tripId, p){
    const container=document.createElement('div');
    container.className='ttp-list-item';
    container.innerHTML=`
      <div class="ttp-title">Edit: ${escapeHtml(p.name)}</div>
      <div class="ttp-row"><input class="ttp-input" id="eName" value="${escapeAttr(p.name)}" placeholder="Place name"/></div>
      <div class="ttp-row"><textarea class="ttp-textarea" id="eNotes" placeholder="Notes">${escapeHtml(p.notes||'')}</textarea></div>
      <div class="ttp-row ttp-wrap">
        <input class="ttp-input" id="eLoc" value="${escapeAttr(p.locationInput || formatLatLng(p.lat,p.lng))}" placeholder="Location (lat,lng / GMaps URL / place text)" />
        <button class="ttp-btn" id="ePaste">Paste</button>
        <button class="ttp-btn" id="eParse">Parse/Geocode</button>
      </div>
      <div id="eStatus" class="ttp-muted"></div>
      <div id="eMap" class="ttp-map" style="display:none;"></div>
      <div class="ttp-row ttp-right">
        <button class="ttp-btn ttp-primary" id="eSave">Save</button>
        <button class="ttp-btn" id="eCancel">Cancel</button>
      </div>
    `;
    els.placeList.prepend(container);

    let newCoords = {lat:p.lat, lng:p.lng};

    async function doParse(inputEl, statusEl, mapEl){
      setStatusInline(statusEl, 'Parsing…');
      try{
        const input = inputEl.value.trim();
        const coords = await parseLocation(input);
        newCoords = {lat:coords.lat, lng:coords.lng};
        setStatusInline(statusEl, `OK (${coords.source}) → ${formatLatLng(coords.lat,coords.lng)}`);
        showMap(mapEl, coords.lat, coords.lng);
        mapEl.style.display='block';
        // Autofill name from Google URL when empty or looks generic
        if (/(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/.test(input)) {
          const nm = nameFromGoogleUrl(input);
          const nameEl = container.querySelector('#eName');
          if(nm && (!nameEl.value || /^Place \d+$/.test(nameEl.value))) nameEl.value = nm;
        }
      }catch(e){
        setStatusInline(statusEl, `Error: ${e.message}`, true);
      }
    }
    function setStatusInline(el,msg,isErr=false){ el.textContent=msg; el.style.color=isErr?'var(--danger)':'var(--muted)'; }

    container.querySelector('#eParse').addEventListener('click',()=>doParse(container.querySelector('#eLoc'), container.querySelector('#eStatus'), container.querySelector('#eMap')));
    container.querySelector('#ePaste').addEventListener('click', async ()=>{
      try{
        const txt = await navigator.clipboard.readText();
        container.querySelector('#eLoc').value = txt;
        // also try to fill name immediately
        const nm = nameFromGoogleUrl(txt);
        if(nm && !container.querySelector('#eName').value) container.querySelector('#eName').value = nm;
      }catch(e){ setStatusInline(container.querySelector('#eStatus'), 'Clipboard read failed (HTTPS required).', true); }
    });
    container.querySelector('#eSave').addEventListener('click',()=>{
      const name = container.querySelector('#eName').value.trim() || p.name;
      const notes = container.querySelector('#eNotes').value;
      const locationInput = container.querySelector('#eLoc').value.trim();
      updatePlace(tripId, p.id, { name, notes, lat:newCoords.lat, lng:newCoords.lng, locationInput });
      renderPlaces();
    });
    container.querySelector('#eCancel').addEventListener('click',()=>renderPlaces());

    // preload map
    showMap(container.querySelector('#eMap'), p.lat, p.lng);
    container.querySelector('#eMap').style.display='block';
  }

  // ---------- Modal ----------
  let modalMap = null;
  function openMapModal(p){
    els.mapModalTitle.textContent = `${p.name} — ${formatLatLng(p.lat,p.lng)}`;
    els.mapModal.classList.add('active');
    els.mapModal.setAttribute('aria-hidden','false');
    els.modalMap.innerHTML='';
    modalMap = showMap(els.modalMap, p.lat, p.lng);
  }
  function closeMapModal(){
    els.mapModal.classList.remove('active');
    els.mapModal.setAttribute('aria-hidden','true');
  }

  // ---------- Events ----------
  els.addTripBtn.addEventListener('click', ()=>{
    const name = els.newTripName.value.trim();
    const t = addTrip(name);
    els.newTripName.value='';
    renderTrips(); openTrip(t.id);
  });

  els.saveTripBtn.addEventListener('click', ()=>{
    const name = els.tripNameInput.value.trim();
    if(currentTripId && name) { updateTripName(currentTripId, name); renderTrips(); }
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

  els.pasteBtn.addEventListener('click', async ()=>{
    try{
      const txt = await navigator.clipboard.readText();
      els.placeLocation.value = txt;
      // Try to auto-fill name from Google URL
      const nm = nameFromGoogleUrl(txt);
      if(nm && !els.placeName.value) els.placeName.value = nm;
    }catch(e){
      setStatus('Clipboard read failed (site must be HTTPS).', true);
    }
  });

  els.parseLocationBtn.addEventListener('click', async ()=>{
    const input = els.placeLocation.value.trim();
    if(!input) return;
    setStatus('Parsing…');
    try{
      const r = await parseLocation(input);
      setStatus(`OK (${r.source}) → ${formatLatLng(r.lat,r.lng)}`);
      previewMap && previewMap.remove && previewMap.remove();
      previewMap = showMap(els.previewMap, r.lat, r.lng);
      els.previewMap.style.display='block';
      els.previewMap.dataset.lat = r.lat;
      els.previewMap.dataset.lng = r.lng;

      // auto-fill name when Maps URL and empty name
      if (/(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/.test(input)){
        const nm = nameFromGoogleUrl(input);
        if(nm && !els.placeName.value) els.placeName.value = nm;
      }
    }catch(e){
      setStatus(`Error: ${e.message}`, true);
    }
  });

  els.addPlaceBtn.addEventListener('click', ()=>{
    if(!currentTripId) return;
    const name = els.placeName.value.trim();
    const notes = els.placeNotes.value;
    const locInput = els.placeLocation.value.trim();
    const lat = parseFloat(els.previewMap.dataset.lat);
    const lng = parseFloat(els.previewMap.dataset.lng);
    if(!isFinite(lat) || !isFinite(lng)){
      alert('Please Parse/Geocode the location first.');
      return;
    }
    addPlace(currentTripId, { name, notes, lat, lng, locationInput: locInput });
    // reset
    els.placeName.value=''; els.placeNotes.value=''; els.placeLocation.value='';
    els.previewMap.style.display='none'; els.previewMap.dataset.lat=''; els.previewMap.dataset.lng='';
    previewMap && previewMap.remove && previewMap.remove(); previewMap=null;
    renderPlaces(); renderTrips();
  });

  els.closeModalBtn.addEventListener('click', closeMapModal);
  els.mapModal.addEventListener('click', (e)=>{ if(e.target===els.mapModal) closeMapModal(); });

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
