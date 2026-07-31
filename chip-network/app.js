(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const MAP = { left: 25, right: 975, top: 25, bottom: 575, minLat: -60, maxLat: 85 };
  const GROUP_META = {
    integrated_circuits: { label: 'Integrated circuits', color: '#c62828', role: 'fabrication' },
    semiconductor_devices: { label: 'Non-PV semiconductor devices', color: '#7b1fa2', role: 'materials' },
    manufacturing_equipment: { label: 'Manufacturing equipment', color: '#2e7d32', role: 'equipment' },
    wafers_materials: { label: 'Wafers & doped materials', color: '#00897b', role: 'materials' }
  };
  const ANCHORS = [
    ['usa', 'United States'], ['chn', 'China'], ['twn', 'Taiwan proxy'],
    ['kor', 'South Korea'], ['jpn', 'Japan'], ['eun', 'EU-27']
  ];
  const byId = new Map(COUNTRIES.map((d) => [d.id, d]));
  const state = {
    selected: 'ind',
    mode: 'trade',
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
    const midpoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const control = [
      midpoint[0] - (dy / length) * Math.hypot(dx, dy) * bend,
      midpoint[1] + (dx / length) * Math.hypot(dx, dy) * bend
    ];
    return `M${p1[0]},${p1[1]} Q${control[0]},${control[1]} ${p2[0]},${p2[1]}`;
  }

  function tradeCountry(id) {
    return TRADE_DATA && TRADE_DATA.countries ? TRADE_DATA.countries[id] : null;
  }

  function tradeReady() {
    return Boolean(TRADE_DATA && TRADE_DATA.countries && Object.keys(TRADE_DATA.countries).length);
  }

  function visible(d) {
    return d.kind === 'anchor' || d.roles.some((role) => state.activeRoles.has(role));
  }

  function tradeNeighbor(id, selected) {
    return (TRADE_DATA.links || []).some((link) =>
      (link.source === selected && link.target === id) || (link.target === selected && link.source === id)
    );
  }

  function cooperationNeighbor(id, selected) {
    return COOPERATION.some((record) => record.source && (
      (record.source === selected && record.target === id) ||
      (record.target === selected && record.source === id)
    ));
  }

  function neighbor(id, selected) {
    if (state.mode === 'trade') return tradeNeighbor(id, selected);
    if (state.mode === 'cooperation') return cooperationNeighbor(id, selected);
    return tradeNeighbor(id, selected) || cooperationNeighbor(id, selected);
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

    const key = document.createElement('span');
    key.className = 'legend-key';
    key.textContent = 'Trade data: 2024';
    legend.appendChild(key);

    updateMapCopy();
    draw();
    renderPanel();
  }

  function updateMapCopy() {
    const title = document.getElementById('mapTitle');
    const note = document.getElementById('mapNote');
    if (state.mode === 'trade') {
      title.textContent = '2024 semiconductor trade network';
      note.textContent = 'Arrows follow exporter → importer; width reflects bilateral value in the four-product semiconductor basket.';
    } else if (state.mode === 'cooperation') {
      title.textContent = 'Formal and institutional cooperation';
      note.textContent = 'Dashed links show bilateral agreements; multilateral memberships appear in country profiles.';
    } else {
      title.textContent = '2024 trade overlaid with formal cooperation';
      note.textContent = 'Solid arrows are BACI trade flows; dashed lines are official cooperation records.';
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

  function drawDefinitions() {
    const defs = node('defs');
    const marker = node('marker', {
      id: 'trade-arrow', markerWidth: 7, markerHeight: 7, refX: 5.5, refY: 3.5,
      orient: 'auto', markerUnits: 'strokeWidth'
    });
    marker.appendChild(node('path', { d: 'M0,0 L7,3.5 L0,7 Z', fill: 'context-stroke' }));
    defs.appendChild(marker);
    svg.appendChild(defs);
  }

  function selectedTradeLinks() {
    if (!tradeReady()) return [];
    const eligible = (TRADE_DATA.links || []).filter((link) => {
      const group = GROUP_META[link.dominant_group];
      return group && state.activeRoles.has(group.role) && byId.has(link.source) && byId.has(link.target);
    });
    const sorted = eligible.sort((a, b) => b.value - a.value);
    if (state.selected) {
      return sorted.filter((link) => link.source === state.selected || link.target === state.selected).slice(0, 20);
    }
    return sorted.slice(0, 42);
  }

  function drawTradeLinks() {
    const links = selectedTradeLinks();
    const group = node('g', { class: 'trade-links' });
    const values = links.map((link) => link.value).filter((value) => value > 0);
    const minLog = values.length ? Math.log10(Math.min(...values)) : 0;
    const maxLog = values.length ? Math.log10(Math.max(...values)) : 1;
    links.forEach((link, index) => {
      const source = byId.get(link.source);
      const target = byId.get(link.target);
      const meta = GROUP_META[link.dominant_group];
      const scaled = maxLog === minLog ? 2.5 : 1.2 + ((Math.log10(link.value) - minLog) / (maxLog - minLog)) * 4.3;
      const item = node('path', {
        d: linkPath(source, target, index % 2 ? -0.09 : 0.09),
        class: `link trade-link${state.selected && (link.source === state.selected || link.target === state.selected) ? ' selected' : ''}`,
        stroke: meta.color,
        'stroke-width': scaled,
        opacity: state.selected ? 0.88 : 0.46,
        'marker-end': 'url(#trade-arrow)'
      });
      const title = node('title');
      title.textContent = `${source.name} → ${target.name}: ${money(link.value)} (${meta.label}, dominant category)`;
      item.appendChild(title);
      group.appendChild(item);
    });
    svg.appendChild(group);
  }

  function drawCooperationLinks() {
    const group = node('g', { class: 'cooperation-links' });
    COOPERATION.filter((record) => record.source && record.year <= state.year).forEach((record, index) => {
      const source = byId.get(record.source);
      const target = byId.get(record.target);
      if (!source || !target) return;
      const item = node('path', {
        d: linkPath(source, target, index % 2 ? -0.13 : 0.13),
        class: 'link coop',
        stroke: '#0f6f8a',
        'stroke-width': 2.2,
        opacity: state.selected ? ((record.source === state.selected || record.target === state.selected) ? 0.95 : 0.08) : 0.65
      });
      const title = node('title');
      title.textContent = `${record.title} (${record.year})`;
      item.appendChild(title);
      group.appendChild(item);
    });
    svg.appendChild(group);
  }

  function tradeRadius(d) {
    const values = tradeCountry(d.id);
    if (!values) return d.kind === 'anchor' ? 7.5 : 5.5 + Math.sqrt(d.score) * 0.72;
    const volume = Math.max(1, values.imports + values.exports);
    const radius = 4.5 + Math.max(0, Math.min(10, (Math.log10(volume) - 6) * 1.5));
    return d.kind === 'anchor' ? Math.max(8, radius) : radius;
  }

  function drawNodes() {
    const group = node('g');
    COUNTRIES.forEach((d) => {
      const [x, y] = project(d);
      const radius = state.mode === 'cooperation' ? (d.kind === 'anchor' ? 7.5 : 5.5 + Math.sqrt(d.score) * 0.72) : tradeRadius(d);
      const dim = !visible(d) || (state.selected && d.id !== state.selected && !neighbor(d.id, state.selected));
      const item = node('g', {
        class: `node ${d.kind}${d.id === state.selected ? ' selected' : ''}${dim ? ' dim' : ''}`,
        transform: `translate(${x},${y})`
      });
      item.appendChild(node('circle', {
        class: 'ring', r: radius + 4,
        stroke: d.id === state.selected ? ROLE_META[d.dominant].color : '#fff'
      }));
      item.appendChild(node('circle', { class: 'core', r: radius, fill: ROLE_META[d.dominant].color }));
      const label = node('text', {
        x: x > 760 ? -(radius + 5) : radius + 5,
        y: -radius - 1,
        'text-anchor': x > 760 ? 'end' : 'start'
      });
      label.textContent = d.name;
      item.appendChild(label);
      const title = node('title');
      const trade = tradeCountry(d.id);
      title.textContent = trade ? `${d.headline} 2024 basket trade: ${money(trade.imports + trade.exports)}.` : d.headline;
      item.appendChild(title);
      item.addEventListener('click', () => {
        state.selected = d.id;
        select.value = d.id;
        draw();
        renderPanel();
      });
      group.appendChild(item);
    });
    svg.appendChild(group);
  }

  function draw() {
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 1000 625');
    drawDefinitions();
    drawBasemap();
    if (state.mode === 'trade' || state.mode === 'both') drawTradeLinks();
    if (state.mode === 'cooperation' || state.mode === 'both') drawCooperationLinks();
    drawNodes();
  }

  function agreement(record) {
    const meta = record.members ? `${record.year} · multilateral · ${record.status}` : `${record.year} · ${record.type} · ${record.status}`;
    return `<div class="agreement"><a href="${record.url}" target="_blank" rel="noopener">${record.title}</a><div class="meta">${meta}</div><div class="detail">${record.detail}</div></div>`;
  }

  function metric(label, value, meta = '', className = '') {
    return `<div class="metric"><div class="label">${label}</div><div class="value ${className}">${value}</div><div class="meta">${meta}</div></div>`;
  }

  function percentage(value, digits = 1) {
    return Number.isFinite(value) ? `${(value * 100).toFixed(digits)}%` : '—';
  }

  function number(value, digits = 2) {
    return Number.isFinite(value) ? value.toFixed(digits) : '—';
  }

  function partnerList(rows) {
    if (!rows || !rows.length) return '<div class="empty">No positive bilateral flow in the basket.</div>';
    return `<div class="partner-list">${rows.map((row) => `<div class="partner-row"><strong>${row.name}</strong><span class="share">${percentage(row.share)}</span><span class="amount">${money(row.value)}</span></div>`).join('')}</div>`;
  }

  function anchorExposure(values) {
    if (!values) return '<div class="empty">No exposure measures available.</div>';
    return ANCHORS.map(([id, label]) => {
      const share = values[id] || 0;
      return `<div class="exposure-row wide"><span>${label}</span><div class="bar"><span style="width:${Math.min(100, share * 100)}%"></span></div><strong>${percentage(share)}</strong></div>`;
    }).join('');
  }

  function composition(groups, total) {
    if (!groups || total <= 0) return '<div class="empty">No positive trade in the basket.</div>';
    return Object.entries(GROUP_META).map(([id, meta]) => {
      const value = groups[id] || 0;
      const share = value / total;
      return `<div class="composition-row"><div class="composition-head"><span>${meta.label}</span><span>${percentage(share)} · ${money(value)}</span></div><div class="composition-bar"><span style="width:${share * 100}%;background:${meta.color}"></span></div></div>`;
    }).join('');
  }

  function tradePanel(d) {
    const values = tradeCountry(d.id);
    if (!values) {
      return `<div class="method-banner">The fixed BACI release is being generated. The page no longer queries a live API; reload after the data-build workflow completes.</div>`;
    }
    const balanceClass = values.balance >= 0 ? 'positive' : 'negative';
    return `
      <div class="data-release"><span class="data-chip">2024</span><span class="data-chip">BACI HS22 v202601</span><span class="data-chip">4 product groups</span></div>
      <div class="metric-grid four">
        ${metric('Exports', money(values.exports), 'current USD')}
        ${metric('Imports', money(values.imports), 'current USD')}
        ${metric('Trade balance', money(values.balance), 'exports − imports', balanceClass)}
        ${metric('Export/import ratio', number(values.export_import_ratio), 'basket exports ÷ imports', 'small')}
      </div>
      <h3>Import concentration</h3>
      <div class="metric-grid four">
        ${metric('Partner HHI', number(values.import_hhi, 3), 'Σ partner shares²', 'small')}
        ${metric('Top-three share', percentage(values.import_top3_share), 'largest three sources', 'small')}
        ${metric('Effective partners', number(values.effective_import_partners, 1), '1 ÷ HHI', 'small')}
        ${metric('Positive partners', String(values.import_partner_count), 'reported bilateral flows', 'small')}
      </div>
      <h3>Measured import exposure</h3>
      ${anchorExposure(values.anchor_import_shares)}
      <h3>Import composition</h3>
      ${composition(values.import_groups, values.imports)}
      <h3>Top import sources</h3>
      ${partnerList(values.top_import_sources)}
      <h3>Top export destinations</h3>
      ${partnerList(values.top_export_destinations)}
      <div class="download-row"><a class="download-link" href="trade-country-indicators.csv">Download indicators</a><a class="download-link" href="trade-bilateral-links.csv">Download bilateral flows</a></div>
      <div class="source-note">Source: CEPII BACI HS22 version 202601. Taiwan uses code 490 (“Asia, nes”). Latest-year values may be revised in later BACI releases.</div>`;
  }

  function overviewPanel() {
    const middle = COUNTRIES.filter((d) => d.kind === 'middle');
    const hhis = middle.map((d) => tradeCountry(d.id)?.import_hhi).filter(Number.isFinite).sort((a, b) => a - b);
    const median = hhis.length ? hhis[Math.floor(hhis.length / 2)] : null;
    const top = middle.map((d) => ({ d, value: (tradeCountry(d.id)?.imports || 0) + (tradeCountry(d.id)?.exports || 0) }))
      .sort((a, b) => b.value - a.value).slice(0, 3);
    return `<h2>How to read the map</h2><p>This release treats semiconductor power as a network of specialized capabilities and measurable trade relationships rather than a ranking of national self-sufficiency.</p>
      <div class="summary-grid"><div class="summary-card"><strong>${middle.length}</strong><span>middle powers</span></div><div class="summary-card"><strong>2024</strong><span>fixed trade year</span></div><div class="summary-card"><strong>4</strong><span>product groups</span></div><div class="summary-card"><strong>${median === null ? '—' : median.toFixed(3)}</strong><span>median import HHI</span></div></div>
      <h3>Largest mapped trade nodes</h3>${top.length ? partnerList(top.map(({ d, value }) => ({ name: d.name, share: value / Math.max(1, top.reduce((s, x) => s + x.value, 0)), value }))) : '<div class="empty">Trade release is being generated.</div>'}
      <h3>Trade mode</h3><p>Solid arrows show reconciled 2024 BACI trade. Node size reflects combined imports and exports in the semiconductor basket.</p>
      <h3>Cooperation mode</h3><p>Dashed links show selected official bilateral frameworks. Multilateral memberships remain in country profiles.</p>
      <div class="method-banner">Select a country node or use the country menu. The cooperation year control does not alter the fixed 2024 trade data.</div>`;
  }

  function renderPanel() {
    if (!state.selected) {
      panel.innerHTML = overviewPanel();
      return;
    }
    const d = byId.get(state.selected);
    const agreements = COOPERATION.filter((record) => record.year <= state.year && (
      record.source ? (record.source === d.id || record.target === d.id) : record.members?.includes(d.id)
    ));
    const roles = d.roles.map((role) => `<span class="role-tag" style="background:${ROLE_META[role].color}">${ROLE_META[role].label}</span>`).join('');
    panel.innerHTML = `<h2>${d.name}</h2><div class="role-row">${roles}</div><p><strong>${d.headline}</strong></p><p>${d.strategy}</p>
      <h3>2024 semiconductor trade</h3>${tradePanel(d)}
      <h3>Principal strengths</h3><ul class="clean-list">${d.strengths.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h3>Key dependencies</h3><ul class="clean-list">${d.dependencies.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h3>Cooperation records</h3>${agreements.length ? agreements.map(agreement).join('') : '<div class="empty">No coded agreement in the current release.</div>'}
      <div class="method-banner">“Middle power” is an analytical project category. Value-chain roles remain qualitative; trade concentration and exposure measures are computed from the published bilateral data.</div>`;
  }

  function money(value) {
    if (!Number.isFinite(value)) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1
    }).format(value);
  }

  init();
})();
