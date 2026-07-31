(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const MAP = { left: 25, right: 975, top: 25, bottom: 575, minLat: -60, maxLat: 85 };
  const byId = new Map(COUNTRIES.map((d) => [d.id, d]));
  const state = {
    selected: 'ind',
    mode: 'cooperation',
    year: 2026,
    activeRoles: new Set(Object.keys(ROLE_META))
  };

  const svg = document.getElementById('map');
  const panel = document.getElementById('panel');
  const select = document.getElementById('countrySelect');
  const yearSelect = document.getElementById('yearSelect');
  const modeControl = document.getElementById('modeControl');
  const legend = document.getElementById('legend');

  function node(name, attrs = {}) {
    const element = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }

  function project(d) {
    const x = MAP.left + ((d.lon + 180) / 360) * (MAP.right - MAP.left);
    const lat = Math.max(MAP.minLat, Math.min(MAP.maxLat, d.lat));
    const y = MAP.top + ((MAP.maxLat - lat) / (MAP.maxLat - MAP.minLat)) * (MAP.bottom - MAP.top);
    return [x, y];
  }

  function linkPath(a, b, bend = 0.12) {
    const p1 = project(a);
    const p2 = project(b);
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const length = Math.hypot(dx, dy) || 1;
    const mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const control = [
      mid[0] - (dy / length) * Math.hypot(dx, dy) * bend,
      mid[1] + (dx / length) * Math.hypot(dx, dy) * bend
    ];
    return `M${p1[0]},${p1[1]} Q${control[0]},${control[1]} ${p2[0]},${p2[1]}`;
  }

  function visible(d) {
    return d.kind === 'anchor' || d.roles.some((role) => state.activeRoles.has(role));
  }

  function neighbor(id, selected) {
    return COOPERATION.some((d) => d.source && (
      (d.source === selected && d.target === id) || (d.target === selected && d.source === id)
    )) || CORRIDORS.some((d) => (
      (d.source === selected && d.target === id) || (d.target === selected && d.source === id)
    ));
  }

  function init() {
    const middle = COUNTRIES.filter((d) => d.kind === 'middle').sort((a, b) => a.name.localeCompare(b.name));
    const anchors = COUNTRIES.filter((d) => d.kind === 'anchor').sort((a, b) => a.name.localeCompare(b.name));
    select.innerHTML = '<option value="">Overview</option>' +
      '<optgroup label="Middle powers">' + middle.map((d) => `<option value="${d.id}">${d.name}</option>`).join('') + '</optgroup>' +
      '<optgroup label="External anchors">' + anchors.map((d) => `<option value="${d.id}">${d.name}</option>`).join('') + '</optgroup>';
    select.value = state.selected;

    select.addEventListener('change', () => {
      state.selected = select.value || null;
      draw();
      renderPanel();
    });
    yearSelect.addEventListener('change', () => {
      state.year = Number(yearSelect.value);
      draw();
      renderPanel();
    });
    modeControl.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-mode]');
      if (!button) return;
      state.mode = button.dataset.mode;
      modeControl.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
      updateMapCopy();
      draw();
    });

    Object.entries(ROLE_META).forEach(([key, meta]) => {
      const item = document.createElement('span');
      item.className = 'legend-item';
      item.innerHTML = `<span class="legend-dot" style="background:${meta.color}"></span>${meta.label}`;
      item.addEventListener('click', () => {
        if (state.activeRoles.has(key) && state.activeRoles.size > 1) state.activeRoles.delete(key);
        else state.activeRoles.add(key);
        item.classList.toggle('dim', !state.activeRoles.has(key));
        draw();
      });
      legend.appendChild(item);
    });

    updateMapCopy();
    draw();
    renderPanel();
  }

  function updateMapCopy() {
    const title = document.getElementById('mapTitle');
    const note = document.getElementById('mapNote');
    if (state.mode === 'cooperation') {
      title.textContent = 'Formal and institutional cooperation';
      note.textContent = 'Dashed links show bilateral agreements; multilateral memberships appear in country profiles.';
    } else if (state.mode === 'corridors') {
      title.textContent = 'Structural dependence and complementarity';
      note.textContent = 'Solid directional corridors are qualitative research codings, not bilateral customs values.';
    } else {
      title.textContent = 'Cooperation overlaid on structural dependence';
      note.textContent = 'Dashed links are agreements; solid links are coded supply-chain corridors.';
    }
  }

  function drawBasemap() {
    const basemap = node('g', { class: 'basemap' });
    basemap.appendChild(node('path', { d: WORLD_LAND_PATH, class: 'country-shape' }));
    basemap.appendChild(node('path', { d: WORLD_BORDER_PATH, fill: 'none', stroke: '#c7d0dc', 'stroke-width': '.45' }));
    svg.appendChild(basemap);

    const grid = node('g', { class: 'map-grid' });
    for (let lon = -150; lon <= 150; lon += 30) {
      const x = MAP.left + ((lon + 180) / 360) * (MAP.right - MAP.left);
      grid.appendChild(node('line', { x1: x, y1: MAP.top, x2: x, y2: MAP.bottom, class: 'graticule' }));
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      const y = MAP.top + ((MAP.maxLat - lat) / (MAP.maxLat - MAP.minLat)) * (MAP.bottom - MAP.top);
      grid.appendChild(node('line', { x1: MAP.left, y1: y, x2: MAP.right, y2: y, class: 'graticule' }));
    }
    svg.appendChild(grid);
  }

  function draw() {
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 1000 625');
    drawBasemap();

    const links = [];
    if (state.mode === 'cooperation' || state.mode === 'both') {
      COOPERATION.filter((d) => d.source && d.year <= state.year).forEach((d) => links.push({ ...d, mode: 'coop' }));
    }
    if (state.mode === 'corridors' || state.mode === 'both') {
      CORRIDORS.filter((d) => state.activeRoles.has(d.layer)).forEach((d) => links.push({ ...d, mode: 'corridor' }));
    }

    const linkGroup = node('g');
    links.forEach((d, index) => {
      const source = byId.get(d.source);
      const target = byId.get(d.target);
      const item = node('path', {
        d: linkPath(source, target, index % 2 ? -0.11 : 0.11),
        class: `link ${d.mode === 'coop' ? 'coop' : 'corridor'}`,
        stroke: d.mode === 'corridor' ? ROLE_META[d.layer].color : '#0f6f8a',
        'stroke-width': d.mode === 'corridor' ? 1.2 + d.intensity * 0.45 : 2.2,
        opacity: state.selected ? ((d.source === state.selected || d.target === state.selected) ? 0.95 : 0.08) : 0.65
      });
      const title = node('title');
      title.textContent = d.mode === 'coop'
        ? `${d.title} (${d.year})`
        : `${source.name} → ${target.name}: ${d.label}`;
      item.appendChild(title);
      linkGroup.appendChild(item);
    });
    svg.appendChild(linkGroup);

    const nodeGroup = node('g');
    COUNTRIES.forEach((d) => {
      const [x, y] = project(d);
      const radius = d.kind === 'anchor' ? 7.5 : 5.5 + Math.sqrt(d.score) * 0.72;
      const dim = !visible(d) || (state.selected && d.id !== state.selected && !neighbor(d.id, state.selected));
      const group = node('g', {
        class: `node ${d.kind}${d.id === state.selected ? ' selected' : ''}${dim ? ' dim' : ''}`,
        transform: `translate(${x},${y})`
      });
      group.appendChild(node('circle', {
        class: 'ring',
        r: radius + 4,
        stroke: d.id === state.selected ? ROLE_META[d.dominant].color : '#fff'
      }));
      group.appendChild(node('circle', { class: 'core', r: radius, fill: ROLE_META[d.dominant].color }));
      const text = node('text', {
        x: x > 760 ? -(radius + 5) : radius + 5,
        y: -radius - 1,
        'text-anchor': x > 760 ? 'end' : 'start'
      });
      text.textContent = d.name;
      group.appendChild(text);
      const title = node('title');
      title.textContent = d.headline;
      group.appendChild(title);
      group.addEventListener('click', () => {
        state.selected = d.id;
        select.value = d.id;
        draw();
        renderPanel();
      });
      nodeGroup.appendChild(group);
    });
    svg.appendChild(nodeGroup);
  }

  function agreement(a) {
    const meta = a.members ? `${a.year} · multilateral · ${a.status}` : `${a.year} · ${a.type} · ${a.status}`;
    return `<div class="agreement"><a href="${a.url}" target="_blank" rel="noopener">${a.title}</a><div class="meta">${meta}</div><div class="detail">${a.detail}</div></div>`;
  }

  function exposure(values) {
    return [['us', 'United States'], ['china', 'China'], ['eu', 'Europe'], ['asia', 'Asian network']]
      .map(([key, label]) => `<div class="exposure-row"><span>${label}</span><div class="bar"><span style="width:${values[key] * 20}%"></span></div><strong>${values[key]}</strong></div>`)
      .join('');
  }

  function cachedTrade(d) {
    const countryData = (typeof TRADE_CACHE !== 'undefined' && TRADE_CACHE.data && TRADE_CACHE.data[d.id]) || {};
    const years = Object.keys(countryData)
      .map(Number)
      .filter((year) => year <= state.year && countryData[year] && Number.isFinite(countryData[year].exports) && Number.isFinite(countryData[year].imports))
      .sort((a, b) => b - a);
    if (!years.length) return null;
    const year = years[0];
    return { year, ...countryData[year] };
  }

  function tradeHtml(d) {
    if (!d.code) {
      return '<div class="method-banner">A single UN Comtrade reporter code is not used for this regional anchor.</div>';
    }
    const value = cachedTrade(d);
    if (!value) {
      return `<div class="method-banner">Cached UN Comtrade totals are not yet available for this reporter. The site refreshes its cache through GitHub Actions rather than querying the UN API from your browser. <a href="https://comtradeplus.un.org/" target="_blank" rel="noopener">Open UN Comtrade</a>.</div>`;
    }
    const updated = TRADE_CACHE.updated ? new Date(TRADE_CACHE.updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'unknown';
    return `<div class="metric-grid"><div class="metric"><div class="label">Exports</div><div class="value">${money(value.exports)}</div><div class="meta">HS 8542 · ${value.year}</div></div><div class="metric"><div class="label">Imports</div><div class="value">${money(value.imports)}</div><div class="meta">HS 8542 · ${value.year}</div></div></div><div class="method-banner">Latest cached year available through ${state.year}. Cache updated ${updated}. <a href="https://comtradeplus.un.org/" target="_blank" rel="noopener">UN Comtrade</a>.</div>`;
  }

  function renderPanel() {
    if (!state.selected) {
      panel.innerHTML = `<h2>How to read the map</h2><p>This project treats semiconductor power as a network of specialized capabilities rather than a ranking of national self-sufficiency.</p><div class="summary-grid"><div class="summary-card"><strong>${COUNTRIES.filter((d) => d.kind === 'middle').length}</strong><span>middle powers</span></div><div class="summary-card"><strong>${COOPERATION.filter((d) => d.source && d.year <= state.year).length}</strong><span>bilateral records</span></div><div class="summary-card"><strong>${COOPERATION.filter((d) => d.members && d.year <= state.year).length}</strong><span>frameworks</span></div><div class="summary-card"><strong>${CORRIDORS.length}</strong><span>corridors</span></div></div><h3>Cooperation mode</h3><p>Formal bilateral frameworks and selected multilateral supply-chain initiatives.</p><h3>Dependence mode</h3><p>Directions of complementarity or vulnerability across equipment, materials, fabrication, packaging, design, capital, and critical inputs.</p><div class="method-banner">Select a country node or use the menu. Click role labels above the map to filter the value chain.</div>`;
      return;
    }

    const d = byId.get(state.selected);
    const agreements = COOPERATION.filter((a) => a.year <= state.year && (a.source ? (a.source === d.id || a.target === d.id) : a.members?.includes(d.id)));
    const roles = d.roles.map((role) => `<span class="role-tag" style="background:${ROLE_META[role].color}">${ROLE_META[role].label}</span>`).join('');
    panel.innerHTML = `<h2>${d.name}</h2><div class="role-row">${roles}</div><p><strong>${d.headline}</strong></p><p>${d.strategy}</p><h3>Integrated-circuit trade</h3>${tradeHtml(d)}<h3>Strategic exposure</h3>${exposure(d.exposure)}<h3>Principal strengths</h3><ul class="clean-list">${d.strengths.map((item) => `<li>${item}</li>`).join('')}</ul><h3>Key dependencies</h3><ul class="clean-list">${d.dependencies.map((item) => `<li>${item}</li>`).join('')}</ul><h3>Cooperation records</h3>${agreements.length ? agreements.map(agreement).join('') : '<div class="empty">No coded agreement in the current release.</div>'}<div class="method-banner">“Middle power” is an analytical project category. Country roles and exposure scores are transparent research codings.</div>`;
  }

  function money(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }

  init();
})();
