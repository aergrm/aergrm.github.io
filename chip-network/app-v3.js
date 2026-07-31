(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const MAP = { left: 25, right: 975, top: 25, bottom: 575, minLat: -60, maxLat: 85 };
  const byId = new Map(COUNTRIES.map((d) => [d.id, d]));
  const state = { selected: null, mode: 'cooperation', year: 2026 };

  const svg = document.getElementById('map');
  const researchView = document.getElementById('researchView');
  const panel = document.getElementById('panel');
  const select = document.getElementById('countrySelect');
  const yearSelect = document.getElementById('yearSelect');
  const yearControl = document.getElementById('yearControl');
  const clearSelection = document.getElementById('clearSelection');
  const legend = document.getElementById('legend');

  const groupMeta = {
    integrated_circuits: { label: 'Integrated circuits', color: '#c62828' },
    semiconductor_devices: { label: 'Non-PV semiconductor devices', color: '#7b1fa2' },
    manufacturing_equipment: { label: 'Manufacturing equipment', color: '#2e7d32' },
    wafers_materials: { label: 'Wafers and doped materials', color: '#00897b' }
  };

  function svgNode(name, attrs = {}) {
    const element = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  }

  function project(country) {
    const x = MAP.left + ((country.lon + 180) / 360) * (MAP.right - MAP.left);
    const latitude = Math.max(MAP.minLat, Math.min(MAP.maxLat, country.lat));
    const y = MAP.top + ((MAP.maxLat - latitude) / (MAP.maxLat - MAP.minLat)) * (MAP.bottom - MAP.top);
    return [x, y];
  }

  function curve(source, target, bend = 0.12) {
    const p1 = project(source);
    const p2 = project(target);
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

  function money(value) {
    return Number.isFinite(value)
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(value)
      : '—';
  }

  function percent(value, digits = 1) {
    return Number.isFinite(value) ? `${(value * 100).toFixed(digits)}%` : '—';
  }

  function trade(countryId) {
    return TRADE_DATA?.countries?.[countryId] || null;
  }

  function init() {
    const middlePowers = COUNTRIES.filter((d) => d.kind === 'middle').sort((a, b) => a.name.localeCompare(b.name));
    const anchors = COUNTRIES.filter((d) => d.kind === 'anchor').sort((a, b) => a.name.localeCompare(b.name));
    select.innerHTML = '<option value="">Overview</option>'
      + `<optgroup label="Middle powers">${middlePowers.map((d) => `<option value="${d.id}">${d.name}</option>`).join('')}</optgroup>`
      + `<optgroup label="External anchors">${anchors.map((d) => `<option value="${d.id}">${d.name}</option>`).join('')}</optgroup>`;

    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => setMode(button.dataset.mode));
    });
    select.addEventListener('change', () => {
      state.selected = select.value || null;
      render();
    });
    yearSelect.addEventListener('change', () => {
      state.year = Number(yearSelect.value);
      render();
    });
    clearSelection.addEventListener('click', () => {
      state.selected = null;
      select.value = '';
      render();
    });

    setMode('cooperation');
  }

  function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.classList.toggle('active', button.dataset.mode === mode);
    });
    yearControl.style.opacity = mode === 'cooperation' ? '1' : '.55';
    yearSelect.disabled = mode !== 'cooperation';
    render();
  }

  function updateHeader() {
    const title = document.getElementById('mapTitle');
    const note = document.getElementById('mapNote');
    if (state.mode === 'cooperation') {
      title.textContent = `Cooperation through ${state.year === 2026 ? 'July 2026' : state.year}`;
      note.textContent = 'Dashed lines show coded bilateral agreements. Multilateral frameworks appear in country profiles.';
    } else if (state.mode === 'trade') {
      title.textContent = 'Semiconductor trade, 2024';
      note.textContent = 'Arrows run from exporter to importer. Width represents bilateral value in the four-product basket.';
    } else {
      title.textContent = 'Published firm-network findings through 2025';
      note.textContent = 'A research summary, not a reconstructed country-to-country network.';
    }
  }

  function renderLegend() {
    legend.innerHTML = '';
    if (state.mode === 'cooperation') {
      legend.innerHTML = '<span class="layer-legend"><span class="legend-line dashed" style="border-color:#0f6f8a"></span>Bilateral cooperation</span>';
      appendVersion(`Data through ${state.year === 2026 ? 'July 2026' : state.year}`);
    } else if (state.mode === 'trade') {
      Object.values(groupMeta).forEach((meta) => {
        const item = document.createElement('span');
        item.className = 'layer-legend';
        item.innerHTML = `<span class="legend-dot" style="background:${meta.color}"></span>${meta.label}`;
        legend.appendChild(item);
      });
      appendVersion('Data year: 2024');
    } else {
      legend.innerHTML = '<span class="layer-legend">Published findings from Köse et al. (2026)</span>';
      appendVersion('Coverage through 2025');
    }
  }

  function appendVersion(text) {
    const item = document.createElement('span');
    item.className = 'map-version';
    item.textContent = text;
    legend.appendChild(item);
  }

  function drawDefinitions() {
    const defs = svgNode('defs');
    const marker = svgNode('marker', { id: 'trade-arrow-v3', markerWidth: 7, markerHeight: 7, refX: 5.5, refY: 3.5, orient: 'auto', markerUnits: 'strokeWidth' });
    marker.appendChild(svgNode('path', { d: 'M0,0 L7,3.5 L0,7 Z', fill: 'context-stroke' }));
    defs.appendChild(marker);
    svg.appendChild(defs);
  }

  function drawBasemap() {
    const group = svgNode('g', { class: 'basemap' });
    group.appendChild(svgNode('path', { d: WORLD_LAND_PATH, class: 'country-shape' }));
    group.appendChild(svgNode('path', { d: WORLD_BORDER_PATH, fill: 'none', stroke: '#c7d0dc', 'stroke-width': '.45' }));
    svg.appendChild(group);
  }

  function isRelated(countryId) {
    if (!state.selected || countryId === state.selected) return true;
    if (state.mode === 'cooperation') {
      return COOPERATION.some((record) => record.source && (
        (record.source === state.selected && record.target === countryId)
        || (record.target === state.selected && record.source === countryId)
      ));
    }
    return (TRADE_DATA?.links || []).some((link) => (
      (link.source === state.selected && link.target === countryId)
      || (link.target === state.selected && link.source === countryId)
    ));
  }

  function drawCooperation() {
    const group = svgNode('g');
    COOPERATION.filter((record) => record.source && record.year <= state.year).forEach((record, index) => {
      const source = byId.get(record.source);
      const target = byId.get(record.target);
      if (!source || !target) return;
      const selected = !state.selected || record.source === state.selected || record.target === state.selected;
      const path = svgNode('path', {
        d: curve(source, target, index % 2 ? -0.13 : 0.13),
        class: 'link coop',
        stroke: '#0f6f8a',
        'stroke-width': 2.3,
        opacity: selected ? 0.78 : 0.07
      });
      const title = svgNode('title');
      title.textContent = `${record.title} (${record.year})`;
      path.appendChild(title);
      group.appendChild(path);
    });
    svg.appendChild(group);
  }

  function selectedTradeLinks() {
    const links = (TRADE_DATA?.links || []).filter((link) => byId.has(link.source) && byId.has(link.target)).sort((a, b) => b.value - a.value);
    return state.selected
      ? links.filter((link) => link.source === state.selected || link.target === state.selected).slice(0, 20)
      : links.slice(0, 38);
  }

  function drawTrade() {
    const links = selectedTradeLinks();
    const values = links.map((link) => link.value).filter((value) => value > 0);
    const minimum = values.length ? Math.log10(Math.min(...values)) : 0;
    const maximum = values.length ? Math.log10(Math.max(...values)) : 1;
    const group = svgNode('g');

    links.forEach((link, index) => {
      const source = byId.get(link.source);
      const target = byId.get(link.target);
      const meta = groupMeta[link.dominant_group] || { color: '#64748b', label: link.dominant_group };
      const width = maximum === minimum ? 2.5 : 1.1 + ((Math.log10(link.value) - minimum) / (maximum - minimum)) * 4.3;
      const path = svgNode('path', {
        d: curve(source, target, index % 2 ? -0.09 : 0.09),
        class: 'link trade-link',
        stroke: meta.color,
        'stroke-width': width,
        opacity: state.selected ? 0.88 : 0.45,
        'marker-end': 'url(#trade-arrow-v3)'
      });
      const title = svgNode('title');
      title.textContent = `${source.name} → ${target.name}: ${money(link.value)} · ${meta.label}`;
      path.appendChild(title);
      group.appendChild(path);
    });
    svg.appendChild(group);
  }

  function nodeRadius(country) {
    if (state.mode === 'trade') {
      const values = trade(country.id);
      if (values) {
        return 5 + Math.max(0, Math.min(10, (Math.log10(Math.max(1, values.imports + values.exports)) - 6) * 1.4));
      }
    }
    return country.kind === 'anchor' ? 9 : 7;
  }

  function drawNodes() {
    const group = svgNode('g');
    COUNTRIES.forEach((country) => {
      const [x, y] = project(country);
      const radius = nodeRadius(country);
      const item = svgNode('g', {
        class: `node ${country.kind}${state.selected === country.id ? ' selected' : ''}${isRelated(country.id) ? '' : ' dim'}`,
        transform: `translate(${x},${y})`
      });
      item.appendChild(svgNode('circle', { class: 'ring', r: radius + 4, stroke: state.selected === country.id ? '#245f91' : '#fff' }));
      item.appendChild(svgNode('circle', { class: 'core', r: radius, fill: ROLE_META[country.dominant].color }));
      const label = svgNode('text', { x: x > 760 ? -(radius + 5) : radius + 5, y: -radius - 1, 'text-anchor': x > 760 ? 'end' : 'start' });
      label.textContent = country.name;
      item.appendChild(label);
      const title = svgNode('title');
      title.textContent = country.headline;
      item.appendChild(title);
      item.addEventListener('click', () => {
        state.selected = country.id;
        select.value = country.id;
        render();
      });
      group.appendChild(item);
    });
    svg.appendChild(group);
  }

  function renderMap() {
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 1000 625');
    drawDefinitions();
    drawBasemap();
    if (state.mode === 'cooperation') drawCooperation();
    if (state.mode === 'trade') drawTrade();
    drawNodes();
  }

  function renderResearchView() {
    const rows = FIRM_HUBS.map((firm) => `<tr><td>${firm.firm}</td><td>${firm.country}</td><td>${firm.stage}</td><td>${firm.finding}</td></tr>`).join('');
    researchView.innerHTML = `
      <div class="research-intro">
        <h2>Firm-network findings through 2025</h2>
        <p>The source reconstructs supply, partnership, and ownership relationships from company webpages. The full firm-level edge list is not publicly downloadable, so this page summarizes the findings reported in the paper rather than drawing an estimated geographic network.</p>
      </div>
      <div class="research-grid">
        <article class="research-card"><div class="label">Firm centrality</div><h3>NVIDIA and TSMC</h3><p>NVIDIA’s betweenness rises after 2022. TSMC’s betweenness increases from 2020.</p></article>
        <article class="research-card"><div class="label">International links</div><h3>United States and China</h3><p>Newly observed links between U.S. and Chinese firms decline in 2024–2025.</p></article>
        <article class="research-card"><div class="label">Regional measures</div><h3>United States, EU, and China</h3><p>The United States retains the highest reported average brokerage measure; EU and Chinese betweenness increase.</p></article>
      </div>
      <table class="firm-table"><thead><tr><th>Firm</th><th>Location</th><th>Value-chain role</th><th>Reported finding</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="data-note"><strong>Data:</strong> findings reported through 2025 in <a href="${FIRM_EVIDENCE_META.sourceUrl}" target="_blank" rel="noopener">Köse et al. (2026)</a>. The site does not assign national scores or recreate unpublished firm-level links.</div>`;
  }

  function agreement(record) {
    return `<div class="agreement"><a href="${record.url}" target="_blank" rel="noopener">${record.title}</a><div class="meta">${record.year} · ${record.type || 'multilateral'} · ${record.status}</div><div class="detail">${record.detail}</div></div>`;
  }

  function metric(label, value, note = '') {
    return `<div class="metric"><div class="label">${label}</div><div class="value">${value}</div><div class="meta">${note}</div></div>`;
  }

  function list(items) {
    return `<ul class="clean-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  }

  function overviewPanel() {
    if (state.mode === 'cooperation') {
      const records = COOPERATION.filter((record) => record.year <= state.year);
      return `<h2>Cooperation</h2><p>Official bilateral agreements and selected multilateral frameworks coded through ${state.year === 2026 ? 'July 2026' : state.year}.</p><div class="summary-grid"><div class="summary-card"><strong>${records.filter((record) => record.source).length}</strong><span>bilateral records</span></div><div class="summary-card"><strong>${records.filter((record) => record.members).length}</strong><span>frameworks</span></div><div class="summary-card"><strong>${COUNTRIES.filter((country) => country.kind === 'middle').length}</strong><span>middle powers</span></div><div class="summary-card"><strong>${state.year === 2026 ? 'Jul 2026' : state.year}</strong><span>data through</span></div></div><p>Select a country to view its capabilities, dependencies, and coded cooperation records.</p>`;
    }
    if (state.mode === 'trade') {
      return `<h2>Trade</h2><p>Reconciled bilateral customs flows for four semiconductor-related product groups in 2024.</p><div class="summary-grid"><div class="summary-card"><strong>${Object.keys(TRADE_DATA?.countries || {}).length}</strong><span>mapped entities</span></div><div class="summary-card"><strong>${(TRADE_DATA?.links || []).length}</strong><span>directed links</span></div><div class="summary-card"><strong>4</strong><span>product groups</span></div><div class="summary-card"><strong>2024</strong><span>data year</span></div></div><p>Select a country to view trade totals, partner concentration, and import shares by source.</p>`;
    }
    return `<h2>Research findings</h2><p>The main panel summarizes published results through 2025. Select a country to see whether the paper reports a separate country or firm-level finding.</p>`;
  }

  function renderCountryPanel(country) {
    const agreements = COOPERATION.filter((record) => record.year <= state.year && (
      record.source ? record.source === country.id || record.target === country.id : record.members?.includes(country.id)
    ));
    const values = trade(country.id);
    let html = `<h2>${country.name}</h2><div class="role-row">${country.roles.map((role) => `<span class="role-tag" style="background:${ROLE_META[role].color}">${ROLE_META[role].label}</span>`).join('')}</div><p><strong>${country.headline}</strong></p>`;

    if (state.mode === 'cooperation') {
      html += `<h3>Capabilities</h3>${list(country.strengths)}<h3>Dependencies</h3>${list(country.dependencies)}<h3>Cooperation</h3>${agreements.length ? agreements.map(agreement).join('') : '<div class="empty">No official cooperation record is coded for this country in the current release.</div>'}`;
    } else if (state.mode === 'trade') {
      html += values
        ? `<span class="baseline-label">2024 data</span><div class="metric-grid">${metric('Exports', money(values.exports), 'four-product basket')}${metric('Imports', money(values.imports), 'four-product basket')}${metric('Import HHI', Number.isFinite(values.import_hhi) ? values.import_hhi.toFixed(3) : '—', 'partner concentration')}${metric('Top-three import share', percent(values.import_top3_share), 'largest three sources')}</div><h3>Import shares by source</h3>${Object.entries(values.import_anchor_shares || {}).map(([key, value]) => `<div class="exposure-row"><span>${key.toUpperCase()}</span><div class="bar"><span style="width:${Math.min(100, value * 100)}%"></span></div><strong>${percent(value, 0)}</strong></div>`).join('')}<h3>Capabilities</h3>${list(country.strengths)}<h3>Dependencies</h3>${list(country.dependencies)}`
        : '<div class="empty">No BACI record is available for this regional node.</div>';
    } else {
      const evidence = FIRM_COUNTRY_EVIDENCE[country.id];
      html += evidence
        ? `<div class="finding-box"><p>${evidence.finding}</p></div><h3>Network measures</h3><ul class="clean-list"><li><strong>Betweenness:</strong> ${evidence.brokerage}</li><li><strong>Closeness:</strong> ${evidence.reach}</li></ul>${evidence.firms.length ? `<h3>Firms discussed</h3><p>${evidence.firms.join(', ')}</p>` : ''}<p class="source-link"><a href="${FIRM_EVIDENCE_META.sourceUrl}" target="_blank" rel="noopener">Source paper</a></p>`
        : '<div class="empty">The source paper does not report a separate country-level result for this country.</div>';
    }

    html += `<div class="data-note"><strong>Data:</strong> cooperation through July 2026; firm-network findings through 2025; trade for 2024.</div>`;
    panel.innerHTML = html;
  }

  function renderPanel() {
    if (!state.selected) {
      panel.innerHTML = overviewPanel();
      return;
    }
    renderCountryPanel(byId.get(state.selected));
  }

  function render() {
    updateHeader();
    renderLegend();
    clearSelection.disabled = !state.selected;
    if (state.mode === 'research') {
      svg.hidden = true;
      researchView.hidden = false;
      renderResearchView();
    } else {
      researchView.hidden = true;
      svg.hidden = false;
      renderMap();
    }
    renderPanel();
  }

  init();
})();
