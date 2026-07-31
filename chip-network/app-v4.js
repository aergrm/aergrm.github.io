(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const MAP = { left: 25, right: 975, top: 25, bottom: 575, minLat: -60, maxLat: 85 };
  const byId = new Map(COUNTRIES.map((country) => [country.id, country]));

  const TYPE_META = {
    resilience: { label: 'Supply-chain resilience', color: '#176b87' },
    research: { label: 'Research and technology', color: '#6f42a5' },
    ecosystem: { label: 'Ecosystem and workforce', color: '#2f7d4a' },
    investment: { label: 'Investment and manufacturing', color: '#b56320' },
    trusted_network: { label: 'Trusted-network coordination', color: '#a02d4f' }
  };

  const STATUS_META = {
    signed: { label: 'Signed', dash: '8 5' },
    funded: { label: 'Funded', dash: '14 4 3 4' },
    open_call: { label: 'Open call', dash: '2 5' },
    implementation: { label: 'Under implementation', dash: '' },
    operational: { label: 'Operational', dash: '' },
    announced: { label: 'Announced', dash: '2 5' }
  };

  const SCOPE_META = {
    'semiconductor-specific': 'Semiconductor-specific',
    'broader-framework': 'Broader framework'
  };

  const STAGE_LABELS = {
    advanced_manufacturing: 'Advanced manufacturing',
    compute: 'Compute',
    design: 'Design',
    equipment: 'Equipment',
    fabrication: 'Fabrication',
    infrastructure: 'Infrastructure',
    investment: 'Investment',
    materials: 'Materials',
    packaging: 'Packaging and testing',
    research: 'Research',
    semiconductors: 'Semiconductors',
    supply_chain: 'Supply chain',
    trusted_network: 'Trusted network',
    workforce: 'Workforce'
  };

  const CLASS_META = {
    focal_middle_power: 'Focal middle power',
    major_hub: 'Major semiconductor hub',
    external_anchor: 'External anchor'
  };

  const TRADE_GROUPS = {
    integrated_circuits: { label: 'Integrated circuits', color: '#c62828' },
    semiconductor_devices: { label: 'Semiconductor devices', color: '#7b1fa2' },
    manufacturing_equipment: { label: 'Manufacturing equipment', color: '#2e7d32' },
    wafers_materials: { label: 'Wafers and materials', color: '#00897b' }
  };

  const state = {
    mode: 'cooperation',
    selected: null,
    compare: null,
    year: 2026,
    cooperation: { type: 'all', scope: 'all', status: 'all', stage: 'all', search: '' },
    trade: {
      groups: new Set(Object.keys(TRADE_GROUPS)),
      direction: 'both',
      minimum: 100_000_000,
      limit: 25,
      metric: 'value',
      selectedOnly: false
    },
    view: { scale: 1, x: 0, y: 0 }
  };

  const elements = {
    map: document.getElementById('map'),
    mapFrame: document.getElementById('mapFrame'),
    researchView: document.getElementById('researchView'),
    tooltip: document.getElementById('tooltip'),
    panel: document.getElementById('panel'),
    legend: document.getElementById('legend'),
    countrySelect: document.getElementById('countrySelect'),
    compareSelect: document.getElementById('compareSelect'),
    yearSelect: document.getElementById('yearSelect'),
    yearControl: document.getElementById('yearControl'),
    clearSelection: document.getElementById('clearSelection'),
    cooperationControls: document.getElementById('cooperationControls'),
    tradeControls: document.getElementById('tradeControls'),
    coopType: document.getElementById('coopType'),
    coopScope: document.getElementById('coopScope'),
    coopStatus: document.getElementById('coopStatus'),
    coopStage: document.getElementById('coopStage'),
    tradeDirection: document.getElementById('tradeDirection'),
    tradeMinimum: document.getElementById('tradeMinimum'),
    tradeLimit: document.getElementById('tradeLimit'),
    tradeMetric: document.getElementById('tradeMetric'),
    selectedOnly: document.getElementById('selectedOnly'),
    cooperationSearch: document.getElementById('cooperationSearch'),
    cooperationCount: document.getElementById('cooperationCount'),
    cooperationTableBody: document.getElementById('cooperationTableBody'),
    cooperationDataSection: document.getElementById('cooperationDataSection'),
    comparisonSection: document.getElementById('comparisonSection'),
    comparisonTitle: document.getElementById('comparisonTitle'),
    comparisonContent: document.getElementById('comparisonContent'),
    mapTitle: document.getElementById('mapTitle'),
    mapNote: document.getElementById('mapNote'),
    zoomIn: document.getElementById('zoomIn'),
    zoomOut: document.getElementById('zoomOut'),
    resetMap: document.getElementById('resetMap')
  };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function money(value) {
    return Number.isFinite(value)
      ? new Intl.NumberFormat('en-US', {
          style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1
        }).format(value)
      : '—';
  }

  function percent(value, digits = 1) {
    return Number.isFinite(value) ? `${(value * 100).toFixed(digits)}%` : '—';
  }

  function formatDate(value) {
    if (!value) return '—';
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      .format(new Date(Date.UTC(year, month - 1, day)));
  }

  function normalizePartnerName(row) {
    if (row?.id && byId.has(row.id)) return byId.get(row.id).name;
    const name = row?.name || 'Unknown';
    if (name === 'USA') return 'United States';
    if (name === 'Rep. of Korea') return 'South Korea';
    if (name === 'Other Asia, nes') return 'Taiwan proxy';
    if (name === 'Viet Nam') return 'Vietnam';
    return name;
  }

  function countrySources(countryId) {
    return COUNTRY_SOURCES?.[countryId]?.links || [];
  }

  function classification(countryId) {
    return COUNTRY_SOURCES?.[countryId]?.classification || (byId.get(countryId)?.kind === 'anchor' ? 'external_anchor' : 'focal_middle_power');
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

  function svgNode(name, attrs = {}) {
    const element = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') element.setAttribute(key, value);
    });
    return element;
  }

  function initializeSelects() {
    const groups = [
      ['focal_middle_power', 'Focal middle powers'],
      ['major_hub', 'Major semiconductor hubs'],
      ['external_anchor', 'External anchors']
    ];
    const options = groups.map(([key, label]) => {
      const rows = COUNTRIES
        .filter((country) => classification(country.id) === key)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((country) => `<option value="${country.id}">${escapeHtml(country.name)}</option>`)
        .join('');
      return `<optgroup label="${label}">${rows}</optgroup>`;
    }).join('');
    elements.countrySelect.innerHTML = `<option value="">Overview</option>${options}`;
    elements.compareSelect.innerHTML = `<option value="">No comparison</option>${options}`;
  }

  function parseUrl() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('layer');
    if (['cooperation', 'trade', 'research'].includes(mode)) state.mode = mode;
    const country = params.get('country');
    if (byId.has(country)) state.selected = country;
    const compare = params.get('compare');
    if (byId.has(compare) && compare !== state.selected) state.compare = compare;
    const year = Number(params.get('year'));
    if (year >= 2021 && year <= 2026) state.year = year;

    const type = params.get('ctype');
    if (type && (type === 'all' || TYPE_META[type])) state.cooperation.type = type;
    const scope = params.get('scope');
    if (scope && (scope === 'all' || SCOPE_META[scope])) state.cooperation.scope = scope;
    const status = params.get('status');
    if (status && (status === 'all' || STATUS_META[status])) state.cooperation.status = status;
    const stage = params.get('stage');
    if (stage && (stage === 'all' || STAGE_LABELS[stage])) state.cooperation.stage = stage;

    const groups = params.get('groups');
    if (groups) {
      const valid = groups.split(',').filter((group) => TRADE_GROUPS[group]);
      if (valid.length) state.trade.groups = new Set(valid);
    }
    const direction = params.get('direction');
    if (['both', 'imports', 'exports'].includes(direction)) state.trade.direction = direction;
    const minimum = Number(params.get('min'));
    if (Number.isFinite(minimum) && minimum >= 0) state.trade.minimum = minimum * 1_000_000;
    const limit = params.get('limit');
    if (limit === 'all') state.trade.limit = 'all';
    else if ([10, 25, 50].includes(Number(limit))) state.trade.limit = Number(limit);
    const metric = params.get('metric');
    if (['value', 'share'].includes(metric)) state.trade.metric = metric;
    state.trade.selectedOnly = params.get('selectedOnly') === '1';
  }

  function syncUrl() {
    const params = new URLSearchParams();
    if (state.mode !== 'cooperation') params.set('layer', state.mode);
    if (state.selected) params.set('country', state.selected);
    if (state.compare) params.set('compare', state.compare);
    if (state.year !== 2026) params.set('year', String(state.year));

    if (state.cooperation.type !== 'all') params.set('ctype', state.cooperation.type);
    if (state.cooperation.scope !== 'all') params.set('scope', state.cooperation.scope);
    if (state.cooperation.status !== 'all') params.set('status', state.cooperation.status);
    if (state.cooperation.stage !== 'all') params.set('stage', state.cooperation.stage);

    const allGroups = Object.keys(TRADE_GROUPS);
    const activeGroups = [...state.trade.groups];
    if (activeGroups.length !== allGroups.length) params.set('groups', activeGroups.join(','));
    if (state.trade.direction !== 'both') params.set('direction', state.trade.direction);
    if (state.trade.minimum !== 100_000_000) params.set('min', String(state.trade.minimum / 1_000_000));
    if (state.trade.limit !== 25) params.set('limit', String(state.trade.limit));
    if (state.trade.metric !== 'value') params.set('metric', state.trade.metric);
    if (state.trade.selectedOnly) params.set('selectedOnly', '1');

    const query = params.toString();
    history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }

  function syncControls() {
    elements.countrySelect.value = state.selected || '';
    elements.compareSelect.value = state.compare || '';
    elements.yearSelect.value = String(state.year);
    elements.coopType.value = state.cooperation.type;
    elements.coopScope.value = state.cooperation.scope;
    elements.coopStatus.value = state.cooperation.status;
    elements.coopStage.value = state.cooperation.stage;
    elements.tradeDirection.value = state.trade.direction;
    elements.tradeMinimum.value = String(state.trade.minimum / 1_000_000);
    elements.tradeLimit.value = String(state.trade.limit);
    elements.tradeMetric.value = state.trade.metric;
    elements.selectedOnly.checked = state.trade.selectedOnly;
    document.querySelectorAll('input[name="tradeGroup"]').forEach((box) => {
      box.checked = state.trade.groups.has(box.value);
    });
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.classList.toggle('active', button.dataset.mode === state.mode);
    });
    elements.cooperationControls.hidden = state.mode !== 'cooperation';
    elements.tradeControls.hidden = state.mode !== 'trade';
    elements.yearControl.style.opacity = state.mode === 'cooperation' ? '1' : '.55';
    elements.yearSelect.disabled = state.mode !== 'cooperation';
    elements.tradeDirection.disabled = !state.selected;
    elements.selectedOnly.disabled = !state.selected;
    elements.clearSelection.disabled = !state.selected && !state.compare;
    elements.cooperationDataSection.hidden = state.mode !== 'cooperation';
  }

  function bindEvents() {
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => {
        state.mode = button.dataset.mode;
        hideTooltip();
        render();
      });
    });
    elements.countrySelect.addEventListener('change', () => {
      state.selected = elements.countrySelect.value || null;
      if (state.compare === state.selected) state.compare = null;
      render();
    });
    elements.compareSelect.addEventListener('change', () => {
      const value = elements.compareSelect.value || null;
      state.compare = value === state.selected ? null : value;
      render();
    });
    elements.yearSelect.addEventListener('change', () => {
      state.year = Number(elements.yearSelect.value);
      render();
    });
    elements.clearSelection.addEventListener('click', () => {
      state.selected = null;
      state.compare = null;
      render();
    });

    [
      [elements.coopType, 'type'],
      [elements.coopScope, 'scope'],
      [elements.coopStatus, 'status'],
      [elements.coopStage, 'stage']
    ].forEach(([element, key]) => {
      element.addEventListener('change', () => {
        state.cooperation[key] = element.value;
        render();
      });
    });

    document.querySelectorAll('input[name="tradeGroup"]').forEach((box) => {
      box.addEventListener('change', () => {
        if (box.checked) state.trade.groups.add(box.value);
        else state.trade.groups.delete(box.value);
        if (!state.trade.groups.size) {
          box.checked = true;
          state.trade.groups.add(box.value);
        }
        render();
      });
    });
    elements.tradeDirection.addEventListener('change', () => {
      state.trade.direction = elements.tradeDirection.value;
      if (state.trade.direction !== 'both') state.trade.selectedOnly = true;
      render();
    });
    elements.tradeMinimum.addEventListener('change', () => {
      state.trade.minimum = Number(elements.tradeMinimum.value) * 1_000_000;
      render();
    });
    elements.tradeLimit.addEventListener('change', () => {
      state.trade.limit = elements.tradeLimit.value === 'all' ? 'all' : Number(elements.tradeLimit.value);
      render();
    });
    elements.tradeMetric.addEventListener('change', () => {
      state.trade.metric = elements.tradeMetric.value;
      render();
    });
    elements.selectedOnly.addEventListener('change', () => {
      state.trade.selectedOnly = elements.selectedOnly.checked;
      render();
    });
    elements.cooperationSearch.addEventListener('input', () => {
      state.cooperation.search = elements.cooperationSearch.value.trim().toLowerCase();
      renderCooperationTable();
    });

    elements.zoomIn.addEventListener('click', () => zoomAt(1.25, 500, 312));
    elements.zoomOut.addEventListener('click', () => zoomAt(0.8, 500, 312));
    elements.resetMap.addEventListener('click', resetMapView);
    bindMapPanZoom();
    window.addEventListener('popstate', () => {
      resetStateFromUrl();
      render();
    });
  }

  function resetStateFromUrl() {
    state.mode = 'cooperation';
    state.selected = null;
    state.compare = null;
    state.year = 2026;
    state.cooperation = { type: 'all', scope: 'all', status: 'all', stage: 'all', search: '' };
    state.trade = {
      groups: new Set(Object.keys(TRADE_GROUPS)),
      direction: 'both',
      minimum: 100_000_000,
      limit: 25,
      metric: 'value',
      selectedOnly: false
    };
    parseUrl();
  }

  function bindMapPanZoom() {
    let dragging = false;
    let start = null;
    elements.map.addEventListener('wheel', (event) => {
      if (state.mode === 'research') return;
      event.preventDefault();
      const point = eventToMapPoint(event);
      zoomAt(event.deltaY < 0 ? 1.12 : 0.89, point.x, point.y);
    }, { passive: false });
    elements.map.addEventListener('pointerdown', (event) => {
      if (state.mode === 'research' || event.target.closest('.node')) return;
      dragging = true;
      start = { x: event.clientX, y: event.clientY, tx: state.view.x, ty: state.view.y };
      elements.map.classList.add('dragging');
      elements.map.setPointerCapture(event.pointerId);
    });
    elements.map.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const rect = elements.map.getBoundingClientRect();
      state.view.x = start.tx + (event.clientX - start.x) * (1000 / rect.width);
      state.view.y = start.ty + (event.clientY - start.y) * (625 / rect.height);
      applyViewTransform();
    });
    const endDrag = (event) => {
      if (!dragging) return;
      dragging = false;
      elements.map.classList.remove('dragging');
      try { elements.map.releasePointerCapture(event.pointerId); } catch (_) {}
    };
    elements.map.addEventListener('pointerup', endDrag);
    elements.map.addEventListener('pointercancel', endDrag);
  }

  function eventToMapPoint(event) {
    const rect = elements.map.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 1000,
      y: ((event.clientY - rect.top) / rect.height) * 625
    };
  }

  function zoomAt(factor, centerX, centerY) {
    const oldScale = state.view.scale;
    const newScale = Math.max(1, Math.min(6, oldScale * factor));
    if (newScale === oldScale) return;
    const ratio = newScale / oldScale;
    state.view.x = centerX - (centerX - state.view.x) * ratio;
    state.view.y = centerY - (centerY - state.view.y) * ratio;
    state.view.scale = newScale;
    applyViewTransform();
  }

  function resetMapView() {
    state.view = { scale: 1, x: 0, y: 0 };
    applyViewTransform();
  }

  function applyViewTransform() {
    const viewport = elements.map.querySelector('#mapViewport');
    if (viewport) viewport.setAttribute('transform', `translate(${state.view.x} ${state.view.y}) scale(${state.view.scale})`);
  }

  function showTooltip(event, title, lines = []) {
    const rect = elements.mapFrame.getBoundingClientRect();
    elements.tooltip.innerHTML = `<strong>${escapeHtml(title)}</strong>${lines.map((line) => `<div>${escapeHtml(line)}</div>`).join('')}`;
    elements.tooltip.hidden = false;
    const x = Math.min(rect.width - 330, Math.max(8, event.clientX - rect.left + 12));
    const y = Math.min(rect.height - 100, Math.max(8, event.clientY - rect.top + 12));
    elements.tooltip.style.left = `${x}px`;
    elements.tooltip.style.top = `${y}px`;
  }

  function hideTooltip() {
    elements.tooltip.hidden = true;
  }

  function filteredCooperationRecords({ includeSearch = false } = {}) {
    return COOPERATION_DATA.filter((record) => {
      if (record.year > state.year) return false;
      if (state.cooperation.type !== 'all' && record.type !== state.cooperation.type) return false;
      if (state.cooperation.scope !== 'all' && record.scope !== state.cooperation.scope) return false;
      if (state.cooperation.status !== 'all' && record.status !== state.cooperation.status) return false;
      if (state.cooperation.stage !== 'all' && !record.stages.includes(state.cooperation.stage)) return false;
      if (includeSearch && state.cooperation.search) {
        const haystack = [
          record.title,
          record.participants.join(' '),
          record.type,
          record.scope,
          record.status,
          record.stages.join(' '),
          record.detail,
          record.implementation
        ].join(' ').toLowerCase();
        if (!haystack.includes(state.cooperation.search)) return false;
      }
      return true;
    });
  }

  function recordTouchesCountry(record, countryId) {
    return record.participantIds?.includes(countryId)
      || record.mapPairs?.some(([a, b]) => a === countryId || b === countryId);
  }

  function updateHeader() {
    if (state.mode === 'cooperation') {
      elements.mapTitle.textContent = `Semiconductor cooperation through ${state.year === 2026 ? 'July 2026' : state.year}`;
      elements.mapNote.textContent = 'Colors show cooperation type. Line style shows implementation status. Broader frameworks contain an explicit semiconductor component.';
    } else if (state.mode === 'trade') {
      elements.mapTitle.textContent = 'Semiconductor trade, 2024';
      elements.mapNote.textContent = state.selected
        ? 'Arrows show imports to and exports from the selected country under the active filters.'
        : 'Arrows run from exporter to importer. Select a country for direction and partner-share analysis.';
    } else {
      elements.mapTitle.textContent = 'Published firm-network findings through 2025';
      elements.mapNote.textContent = 'Research summary only. The source paper’s firm-level edge list is not reproduced.';
    }
  }

  function renderLegend() {
    elements.legend.innerHTML = '';
    if (state.mode === 'cooperation') {
      Object.entries(TYPE_META).forEach(([key, meta]) => {
        const item = document.createElement('span');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-line" style="border-color:${meta.color}"></span>${escapeHtml(meta.label)}`;
        elements.legend.appendChild(item);
      });
      [
        ['operational', 'Operational / implementation'],
        ['signed', 'Signed'],
        ['open_call', 'Open call'],
        ['announced', 'Announced']
      ].forEach(([status, label]) => {
        const item = document.createElement('span');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-line ${status}" style="border-color:#59677a"></span>${label}`;
        elements.legend.appendChild(item);
      });
      appendVersion(`${filteredCooperationRecords().length} records shown`);
    } else if (state.mode === 'trade') {
      Object.values(TRADE_GROUPS).forEach((meta) => {
        const item = document.createElement('span');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:${meta.color}"></span>${escapeHtml(meta.label)}`;
        elements.legend.appendChild(item);
      });
      appendVersion('BACI 2024');
    } else {
      const item = document.createElement('span');
      item.className = 'legend-item';
      item.textContent = 'Köse et al. (2026): observed firm relationships through 2025';
      elements.legend.appendChild(item);
      appendVersion('Figures 1, 3, 4 and Supplementary Figure S3.2');
    }
  }

  function appendVersion(text) {
    const item = document.createElement('span');
    item.className = 'map-version';
    item.textContent = text;
    elements.legend.appendChild(item);
  }

  function drawDefinitions(svg) {
    const definitions = svgNode('defs');
    const marker = svgNode('marker', {
      id: 'tradeArrowV4', markerWidth: 7, markerHeight: 7, refX: 5.5, refY: 3.5,
      orient: 'auto', markerUnits: 'strokeWidth'
    });
    marker.appendChild(svgNode('path', { d: 'M0,0 L7,3.5 L0,7 Z', fill: 'context-stroke' }));
    definitions.appendChild(marker);
    svg.appendChild(definitions);
  }

  function drawBasemap(viewport) {
    const group = svgNode('g', { class: 'basemap' });
    group.appendChild(svgNode('path', { d: WORLD_LAND_PATH, class: 'country-shape' }));
    group.appendChild(svgNode('path', { d: WORLD_BORDER_PATH, fill: 'none', stroke: '#c7d0dc', 'stroke-width': '.45' }));
    viewport.appendChild(group);
  }

  function drawCooperation(viewport) {
    const records = filteredCooperationRecords();
    const group = svgNode('g');
    let pairIndex = 0;
    records.forEach((record) => {
      (record.mapPairs || []).forEach(([sourceId, targetId]) => {
        const source = byId.get(sourceId);
        const target = byId.get(targetId);
        if (!source || !target) return;
        const selected = !state.selected || recordTouchesCountry(record, state.selected);
        const meta = TYPE_META[record.type] || { color: '#65758a', label: record.type };
        const status = STATUS_META[record.status] || STATUS_META.signed;
        const path = svgNode('path', {
          d: curve(source, target, pairIndex++ % 2 ? -0.13 : 0.13),
          class: 'coop-link',
          stroke: meta.color,
          'stroke-width': record.scope === 'semiconductor-specific' ? 2.8 : 2.1,
          'stroke-dasharray': status.dash,
          opacity: selected ? (record.scope === 'semiconductor-specific' ? .84 : .62) : .06
        });
        path.addEventListener('pointermove', (event) => showTooltip(event, record.title, [
          `${record.participants.join(' · ')} · ${record.year}`,
          `${meta.label} · ${SCOPE_META[record.scope]} · ${status.label}`
        ]));
        path.addEventListener('pointerleave', hideTooltip);
        path.addEventListener('click', () => {
          state.selected = sourceId;
          if (state.compare === state.selected) state.compare = targetId;
          render();
        });
        group.appendChild(path);
      });
    });
    viewport.appendChild(group);
  }

  function tradeGroupValue(link) {
    return [...state.trade.groups].reduce((sum, group) => sum + Number(link.groups?.[group] || 0), 0);
  }

  function countryGroupTotal(countryId, direction) {
    const values = TRADE_DATA?.countries?.[countryId];
    if (!values) return 0;
    const key = direction === 'imports' ? 'import_groups' : 'export_groups';
    return [...state.trade.groups].reduce((sum, group) => sum + Number(values[key]?.[group] || 0), 0);
  }

  function tradeMetricValue(link, value) {
    if (state.trade.metric === 'value') return value;
    if (state.selected) {
      if (link.target === state.selected && state.trade.direction !== 'exports') {
        return value / Math.max(1, countryGroupTotal(state.selected, 'imports'));
      }
      if (link.source === state.selected && state.trade.direction !== 'imports') {
        return value / Math.max(1, countryGroupTotal(state.selected, 'exports'));
      }
      return value / Math.max(1, countryGroupTotal(state.selected, 'imports') + countryGroupTotal(state.selected, 'exports'));
    }
    return value / Math.max(1, countryGroupTotal(link.source, 'exports'));
  }

  function filteredTradeLinks() {
    let links = (TRADE_DATA?.links || [])
      .filter((link) => byId.has(link.source) && byId.has(link.target))
      .map((link) => ({ ...link, filteredValue: tradeGroupValue(link) }))
      .filter((link) => link.filteredValue >= state.trade.minimum);

    if (state.selected) {
      if (state.trade.direction === 'imports') links = links.filter((link) => link.target === state.selected);
      else if (state.trade.direction === 'exports') links = links.filter((link) => link.source === state.selected);
      else if (state.trade.selectedOnly) links = links.filter((link) => link.source === state.selected || link.target === state.selected);
    }

    links.forEach((link) => { link.metricValue = tradeMetricValue(link, link.filteredValue); });
    links.sort((a, b) => b.metricValue - a.metricValue);
    if (state.trade.limit !== 'all') links = links.slice(0, state.trade.limit);
    return links;
  }

  function dominantSelectedGroup(link) {
    const groups = [...state.trade.groups].map((group) => [group, Number(link.groups?.[group] || 0)]);
    groups.sort((a, b) => b[1] - a[1]);
    return groups[0]?.[0] || 'integrated_circuits';
  }

  function drawTrade(viewport) {
    const links = filteredTradeLinks();
    const metrics = links.map((link) => link.metricValue).filter((value) => value > 0);
    const minimum = metrics.length ? Math.log10(Math.min(...metrics)) : 0;
    const maximum = metrics.length ? Math.log10(Math.max(...metrics)) : 1;
    const group = svgNode('g');

    links.forEach((link, index) => {
      const source = byId.get(link.source);
      const target = byId.get(link.target);
      const product = dominantSelectedGroup(link);
      const meta = TRADE_GROUPS[product];
      const metric = Math.max(link.metricValue, Number.EPSILON);
      const width = maximum === minimum ? 2.8 : 1.1 + ((Math.log10(metric) - minimum) / (maximum - minimum)) * 4.8;
      const path = svgNode('path', {
        d: curve(source, target, index % 2 ? -0.09 : 0.09),
        class: 'trade-link',
        stroke: meta.color,
        'stroke-width': width,
        opacity: state.selected ? .86 : .48,
        'marker-end': 'url(#tradeArrowV4)'
      });
      const shareText = state.trade.metric === 'share' ? ` · ${percent(link.metricValue, 1)} partner share` : '';
      path.addEventListener('pointermove', (event) => showTooltip(event, `${source.name} → ${target.name}`, [
        `${money(link.filteredValue)}${shareText}`,
        `Largest selected product group: ${meta.label}`
      ]));
      path.addEventListener('pointerleave', hideTooltip);
      path.addEventListener('click', () => {
        state.selected = link.source;
        state.compare = link.target;
        render();
      });
      group.appendChild(path);
    });
    viewport.appendChild(group);
  }

  function isRelated(countryId) {
    if (!state.selected || countryId === state.selected || countryId === state.compare) return true;
    if (state.mode === 'cooperation') {
      return filteredCooperationRecords().some((record) => recordTouchesCountry(record, state.selected) && recordTouchesCountry(record, countryId));
    }
    if (state.mode === 'trade') {
      return filteredTradeLinks().some((link) => (
        (link.source === state.selected && link.target === countryId)
        || (link.target === state.selected && link.source === countryId)
      ));
    }
    return true;
  }

  function nodeRadius(country) {
    if (state.mode === 'trade') {
      const values = TRADE_DATA?.countries?.[country.id];
      if (values) {
        const total = countryGroupTotal(country.id, 'imports') + countryGroupTotal(country.id, 'exports');
        return 5 + Math.max(0, Math.min(10, (Math.log10(Math.max(1, total)) - 6) * 1.35));
      }
    }
    if (classification(country.id) === 'external_anchor') return 9.5;
    if (classification(country.id) === 'major_hub') return 8;
    return 6.8;
  }

  function labelLayout(countries) {
    const used = [];
    const visibility = new Map();
    const ordered = [...countries].sort((a, b) => {
      const priority = (country) => country.id === state.selected ? 0 : country.id === state.compare ? 1 : classification(country.id) === 'external_anchor' ? 2 : classification(country.id) === 'major_hub' ? 3 : 4;
      return priority(a) - priority(b);
    });
    ordered.forEach((country) => {
      const [x, y] = project(country);
      const radius = nodeRadius(country);
      const side = x > 760 ? -1 : 1;
      const width = country.name.length * 6.2;
      const box = {
        left: side > 0 ? x + radius + 4 : x - radius - 4 - width,
        right: side > 0 ? x + radius + 4 + width : x - radius - 4,
        top: y - radius - 13,
        bottom: y - radius + 2
      };
      const priorityVisible = country.id === state.selected || country.id === state.compare || classification(country.id) === 'external_anchor';
      const collision = used.some((other) => !(box.right < other.left || box.left > other.right || box.bottom < other.top || box.top > other.bottom));
      visibility.set(country.id, priorityVisible || !collision);
      if (priorityVisible || !collision) used.push(box);
    });
    return visibility;
  }

  function drawNodes(viewport) {
    const group = svgNode('g');
    const visibleLabels = labelLayout(COUNTRIES);
    COUNTRIES.forEach((country) => {
      const [x, y] = project(country);
      const radius = nodeRadius(country);
      const item = svgNode('g', {
        class: `node ${classification(country.id)}${state.selected === country.id ? ' selected' : ''}${isRelated(country.id) ? '' : ' dim'}`,
        transform: `translate(${x},${y})`,
        tabindex: '0',
        role: 'button',
        'aria-label': `Select ${country.name}`
      });
      item.appendChild(svgNode('circle', {
        class: 'ring', r: radius + 4,
        stroke: state.selected === country.id ? '#245f91' : state.compare === country.id ? '#b56320' : '#fff'
      }));
      item.appendChild(svgNode('circle', {
        class: 'core', r: radius, fill: ROLE_META[country.dominant]?.color || '#65758a'
      }));
      if (visibleLabels.get(country.id)) {
        const label = svgNode('text', {
          x: x > 760 ? -(radius + 5) : radius + 5,
          y: -radius - 1,
          'text-anchor': x > 760 ? 'end' : 'start'
        });
        label.textContent = country.name;
        item.appendChild(label);
      }
      const selectCountry = () => {
        if (state.selected && state.selected !== country.id && !state.compare) state.compare = country.id;
        else state.selected = country.id;
        if (state.compare === state.selected) state.compare = null;
        render();
      };
      item.addEventListener('click', selectCountry);
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectCountry();
        }
      });
      item.addEventListener('pointermove', (event) => showTooltip(event, country.name, [
        CLASS_META[classification(country.id)],
        `Primary role: ${ROLE_META[country.dominant]?.label || country.dominant}`
      ]));
      item.addEventListener('pointerleave', hideTooltip);
      group.appendChild(item);
    });
    viewport.appendChild(group);
  }

  function renderMap() {
    elements.map.innerHTML = '';
    elements.map.setAttribute('viewBox', '0 0 1000 625');
    drawDefinitions(elements.map);
    const viewport = svgNode('g', { id: 'mapViewport' });
    elements.map.appendChild(viewport);
    drawBasemap(viewport);
    if (state.mode === 'cooperation') drawCooperation(viewport);
    if (state.mode === 'trade') drawTrade(viewport);
    drawNodes(viewport);
    applyViewTransform();
  }

  function renderResearchView() {
    const findings = [
      {
        subject: 'Network construction',
        measure: 'Supply/buy, partnership, and ownership relationships',
        period: '2015–2025; analysis emphasizes 2017 onward',
        finding: 'The reconstructed network contains more than 1,300 linked semiconductor firms and distinguishes three relationship types.',
        source: 'Figure 1 and Table 1'
      },
      {
        subject: 'NVIDIA',
        measure: 'Firm-level betweenness and closeness',
        period: '2017–2025',
        finding: 'NVIDIA’s betweenness rises after 2022; closeness also increases.',
        source: 'Figure 4'
      },
      {
        subject: 'TSMC',
        measure: 'Firm-level betweenness',
        period: '2017–2025',
        finding: 'TSMC’s betweenness increases from 2020.',
        source: 'Figure 4'
      },
      {
        subject: 'Regional brokerage',
        measure: 'Average regional betweenness',
        period: '2017–2025',
        finding: 'The United States remains highest in the reported series but declines gradually, while EU and Chinese betweenness increase.',
        source: 'Figure 4'
      },
      {
        subject: 'U.S.–China links',
        measure: 'Country composition of newly observed links',
        period: '2024–2025',
        finding: 'Newly observed links between U.S. and Chinese firms decline sharply.',
        source: 'Supplementary Figure S3.2'
      },
      {
        subject: 'Regional collaboration',
        measure: 'Centered country-orientation trajectories',
        period: '2017–2025',
        finding: 'Selected firms display changing U.S., EU, China, Japan, and Taiwan orientations over time.',
        source: 'Figure 3'
      }
    ];
    const rows = findings.map((row) => `<tr>
      <td>${escapeHtml(row.subject)}</td>
      <td>${escapeHtml(row.measure)}</td>
      <td>${escapeHtml(row.period)}</td>
      <td>${escapeHtml(row.finding)}</td>
      <td>${escapeHtml(row.source)}</td>
    </tr>`).join('');
    const firmRows = FIRM_HUBS.map((firm) => `<tr>
      <td>${escapeHtml(firm.firm)}</td>
      <td>${escapeHtml(firm.country)}</td>
      <td>${escapeHtml(firm.stage)}</td>
      <td>${escapeHtml(firm.finding)}</td>
      <td>Figure 3 or 4</td>
    </tr>`).join('');

    elements.researchView.innerHTML = `
      <div class="research-intro">
        <h2>Firm-network findings through 2025</h2>
        <p>Köse et al. reconstruct supply, partnership, and ownership relationships from archived company webpages. The paper reports regional and selected firm-level results, but the complete derived edge list is not publicly downloadable. This section therefore reports source findings and figure locations without drawing a substitute network.</p>
      </div>
      <div class="research-grid">
        <article class="research-card"><div class="label">Coverage</div><h3>2015–2025</h3><p>Analysis emphasizes 2017 onward because early coverage is incomplete.</p></article>
        <article class="research-card"><div class="label">Relationships</div><h3>Three types</h3><p>Supply/buy, partnership, and ownership links.</p></article>
        <article class="research-card"><div class="label">Validation</div><h3>Table 1</h3><p>Model evaluation reports precision, recall, and F1 for relationship extraction.</p></article>
      </div>
      <h3>Reported findings</h3>
      <div class="table-wrap">
        <table class="findings-table">
          <thead><tr><th>Subject</th><th>Measure</th><th>Period</th><th>Finding</th><th>Source location</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <h3>Selected firms discussed in the paper</h3>
      <div class="table-wrap">
        <table class="findings-table">
          <thead><tr><th>Firm</th><th>Location</th><th>Value-chain role</th><th>Reported finding</th><th>Source location</th></tr></thead>
          <tbody>${firmRows}</tbody>
        </table>
      </div>
      <div class="data-note"><strong>Source:</strong> <a href="${escapeHtml(FIRM_EVIDENCE_META.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(FIRM_EVIDENCE_META.sourceTitle)}</a>. The site does not assign national scores or recreate unpublished firm-level links.</div>`;
  }

  function metric(label, value, note = '') {
    return `<div class="metric"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value)}</div><div class="meta">${escapeHtml(note)}</div></div>`;
  }

  function sourceMarkers(countryId) {
    const count = countrySources(countryId).length;
    if (!count) return '';
    return `<sup class="source-marker">[${count === 1 ? '1' : `1–${count}`}]</sup>`;
  }

  function profileList(countryId, items) {
    const marker = sourceMarkers(countryId);
    return `<ul class="clean-list">${items.map((item) => `<li>${escapeHtml(item)}${marker}</li>`).join('')}</ul>`;
  }

  function sourcesHtml(countryId) {
    const links = countrySources(countryId);
    if (!links.length) return '<div class="empty">No country-profile source has been added.</div>';
    return `<ol class="source-list">${links.map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label)}</a></li>`).join('')}</ol>`;
  }

  function agreementHtml(record) {
    const type = TYPE_META[record.type] || { label: record.type, color: '#65758a' };
    return `<div class="agreement" style="border-left-color:${type.color}">
      <a href="${escapeHtml(record.url)}" target="_blank" rel="noopener">${escapeHtml(record.title)}</a>
      <div class="meta">${formatDate(record.date)} · ${escapeHtml(type.label)} · ${escapeHtml(STATUS_META[record.status]?.label || record.status)}</div>
      <div class="detail">${escapeHtml(record.detail)}</div>
      <div class="small-note">${escapeHtml(SCOPE_META[record.scope])} · ${record.stages.map((stage) => escapeHtml(STAGE_LABELS[stage] || stage)).join(', ')}</div>
    </div>`;
  }

  function selectedCountryRecords(countryId, filtered = true) {
    const records = filtered ? filteredCooperationRecords() : COOPERATION_DATA.filter((record) => record.year <= state.year);
    return records.filter((record) => recordTouchesCountry(record, countryId));
  }

  function productComposition(values, direction) {
    const groups = values?.[direction === 'imports' ? 'import_groups' : 'export_groups'];
    if (!groups) return '';
    const total = [...state.trade.groups].reduce((sum, group) => sum + Number(groups[group] || 0), 0);
    return [...state.trade.groups].map((group) => {
      const value = Number(groups[group] || 0);
      const share = total > 0 ? value / total : 0;
      return `<div class="product-bar">
        <div class="row"><span>${escapeHtml(TRADE_GROUPS[group].label)}</span><strong>${money(value)} · ${percent(share, 1)}</strong></div>
        <div class="bar"><span style="width:${Math.min(100, share * 100)}%;background:${TRADE_GROUPS[group].color}"></span></div>
      </div>`;
    }).join('');
  }

  function rankingHtml(rows) {
    if (!rows?.length) return '<div class="empty">No partner ranking is available.</div>';
    return `<ol class="ranking">${rows.slice(0, 5).map((row, index) => `<li>
      <span>${index + 1}</span>
      <span>${escapeHtml(normalizePartnerName(row))}</span>
      <strong>${percent(row.share, 1)}</strong>
    </li>`).join('')}</ol>`;
  }

  function overviewPanel() {
    const classCounts = Object.keys(CLASS_META).reduce((result, key) => {
      result[key] = COUNTRIES.filter((country) => classification(country.id) === key).length;
      return result;
    }, {});
    if (state.mode === 'cooperation') {
      const records = filteredCooperationRecords();
      return `<h2>Semiconductor cooperation</h2>
        <p>Official semiconductor agreements and selected broader technology or supply-chain frameworks with a direct semiconductor component.</p>
        <div class="summary-grid">
          <div class="summary-card"><strong>${records.length}</strong><span>records shown</span></div>
          <div class="summary-card"><strong>${records.filter((record) => record.scope === 'semiconductor-specific').length}</strong><span>semiconductor-specific</span></div>
          <div class="summary-card"><strong>${records.filter((record) => record.scope === 'broader-framework').length}</strong><span>broader frameworks</span></div>
          <div class="summary-card"><strong>${state.year === 2026 ? 'Jul 2026' : state.year}</strong><span>data through</span></div>
        </div>
        <h3>Country sample</h3>
        <ul class="clean-list">
          <li>${classCounts.focal_middle_power} focal middle powers</li>
          <li>${classCounts.major_hub} major semiconductor hubs</li>
          <li>${classCounts.external_anchor} external anchors</li>
        </ul>
        <p>Select a country or use the filters to inspect cooperation type, scope, stage, and implementation status.</p>`;
    }
    if (state.mode === 'trade') {
      const links = filteredTradeLinks();
      return `<h2>Trade</h2>
        <p>Reconciled 2024 bilateral customs flows for the selected semiconductor product groups.</p>
        <div class="summary-grid">
          <div class="summary-card"><strong>${Object.keys(TRADE_DATA?.countries || {}).length}</strong><span>mapped entities</span></div>
          <div class="summary-card"><strong>${links.length}</strong><span>links shown</span></div>
          <div class="summary-card"><strong>${state.trade.groups.size}</strong><span>product groups</span></div>
          <div class="summary-card"><strong>${money(state.trade.minimum)}</strong><span>minimum link</span></div>
        </div>
        <p>Select a country to filter imports or exports, calculate partner shares, and compare two countries.</p>`;
    }
    return `<h2>Research findings</h2>
      <p>The main panel reports the period, network measure, finding, and figure location in the source paper. Select a country to see whether the paper reports a separate regional or firm-level result.</p>`;
  }

  function renderCountryPanel(country) {
    const values = TRADE_DATA?.countries?.[country.id];
    const classificationLabel = CLASS_META[classification(country.id)];
    let html = `<h2>${escapeHtml(country.name)}</h2>
      <span class="classification-tag">${escapeHtml(classificationLabel)}</span>
      <div class="role-row">${country.roles.map((role) => `<span class="role-tag" style="background:${ROLE_META[role]?.color || '#65758a'}">${escapeHtml(ROLE_META[role]?.label || role)}</span>`).join('')}</div>
      <p><strong>${escapeHtml(country.headline)}</strong></p>`;

    if (state.mode === 'cooperation') {
      const records = selectedCountryRecords(country.id);
      html += `<h3>Capabilities</h3>${profileList(country.id, country.strengths)}
        <h3>Dependencies</h3>${profileList(country.id, country.dependencies)}
        <h3>Semiconductor cooperation</h3>
        ${records.length ? records.map(agreementHtml).join('') : '<div class="empty">No record matches the current cooperation filters for this country.</div>'}
        <h3>Profile sources</h3>${sourcesHtml(country.id)}`;
    } else if (state.mode === 'trade') {
      if (!values) {
        html += '<div class="empty">No BACI trade record is available for this regional node.</div>';
      } else {
        const imports = countryGroupTotal(country.id, 'imports');
        const exports = countryGroupTotal(country.id, 'exports');
        html += `<div class="metric-grid">
          ${metric('Exports', money(exports), `${state.trade.groups.size} selected product groups`)}
          ${metric('Imports', money(imports), `${state.trade.groups.size} selected product groups`)}
          ${metric('Import HHI', Number.isFinite(values.import_hhi) ? values.import_hhi.toFixed(3) : '—', 'all-basket partner concentration')}
          ${metric('Top-three import share', percent(values.import_top3_share, 1), 'all-basket largest sources')}
        </div>
        <h3>Selected-product import composition</h3>${productComposition(values, 'imports')}
        <h3>Largest import sources</h3>${rankingHtml(values.top_import_sources)}
        <h3>Largest export destinations</h3>${rankingHtml(values.top_export_destinations)}
        <h3>Capabilities</h3>${profileList(country.id, country.strengths)}
        <h3>Dependencies</h3>${profileList(country.id, country.dependencies)}
        <h3>Profile sources</h3>${sourcesHtml(country.id)}`;
      }
    } else {
      const evidence = FIRM_COUNTRY_EVIDENCE[country.id];
      html += evidence
        ? `<div class="agreement"><strong>Reported finding</strong><div class="detail">${escapeHtml(evidence.finding)}</div></div>
          <h3>Network measures</h3>
          <ul class="clean-list">
            <li><strong>Betweenness:</strong> ${escapeHtml(evidence.brokerage)}</li>
            <li><strong>Closeness:</strong> ${escapeHtml(evidence.reach)}</li>
          </ul>
          ${evidence.firms.length ? `<h3>Firms discussed</h3><p>${escapeHtml(evidence.firms.join(', '))}</p>` : ''}
          <p><a href="${escapeHtml(FIRM_EVIDENCE_META.sourceUrl)}" target="_blank" rel="noopener">Source paper</a></p>`
        : '<div class="empty">The source paper does not report a separate country-level result for this country.</div>';
    }

    html += '<div class="data-note"><strong>Data:</strong> cooperation through July 2026; published firm-network findings through 2025; trade for 2024.</div>';
    elements.panel.innerHTML = html;
  }

  function renderPanel() {
    if (!state.selected) {
      elements.panel.innerHTML = overviewPanel();
      return;
    }
    renderCountryPanel(byId.get(state.selected));
  }

  function renderComparison() {
    if (!state.selected || !state.compare || state.selected === state.compare) {
      elements.comparisonSection.hidden = true;
      return;
    }
    const left = byId.get(state.selected);
    const right = byId.get(state.compare);
    const leftTrade = TRADE_DATA?.countries?.[left.id];
    const rightTrade = TRADE_DATA?.countries?.[right.id];
    const rows = [
      ['Classification', CLASS_META[classification(left.id)], CLASS_META[classification(right.id)]],
      ['Value-chain roles', left.roles.map((role) => ROLE_META[role]?.label || role).join(', '), right.roles.map((role) => ROLE_META[role]?.label || role).join(', ')],
      [`Cooperation records through ${state.year === 2026 ? 'July 2026' : state.year}`, selectedCountryRecords(left.id, false).length, selectedCountryRecords(right.id, false).length],
      ['2024 semiconductor imports', leftTrade ? money(leftTrade.imports) : '—', rightTrade ? money(rightTrade.imports) : '—'],
      ['2024 semiconductor exports', leftTrade ? money(leftTrade.exports) : '—', rightTrade ? money(rightTrade.exports) : '—'],
      ['2024 trade balance', leftTrade ? money(leftTrade.balance) : '—', rightTrade ? money(rightTrade.balance) : '—'],
      ['Import HHI', Number.isFinite(leftTrade?.import_hhi) ? leftTrade.import_hhi.toFixed(3) : '—', Number.isFinite(rightTrade?.import_hhi) ? rightTrade.import_hhi.toFixed(3) : '—'],
      ['Top-three import share', percent(leftTrade?.import_top3_share, 1), percent(rightTrade?.import_top3_share, 1)],
      ['Effective import partners', Number.isFinite(leftTrade?.effective_import_partners) ? leftTrade.effective_import_partners.toFixed(1) : '—', Number.isFinite(rightTrade?.effective_import_partners) ? rightTrade.effective_import_partners.toFixed(1) : '—'],
      ['Capabilities', left.strengths.join('; '), right.strengths.join('; ')],
      ['Dependencies', left.dependencies.join('; '), right.dependencies.join('; ')]
    ];
    elements.comparisonTitle.textContent = `${left.name} and ${right.name}`;
    elements.comparisonContent.innerHTML = `<div class="table-wrap"><table class="compare-table">
      <thead><tr><th>Measure</th><th>${escapeHtml(left.name)}</th><th>${escapeHtml(right.name)}</th></tr></thead>
      <tbody>${rows.map(([label, a, b]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(a)}</td><td>${escapeHtml(b)}</td></tr>`).join('')}</tbody>
    </table></div>`;
    elements.comparisonSection.hidden = false;
  }

  function renderCooperationTable() {
    if (state.mode !== 'cooperation') return;
    const records = filteredCooperationRecords({ includeSearch: true });
    elements.cooperationCount.textContent = `${records.length} of ${COOPERATION_DATA.length} records`;
    elements.cooperationTableBody.innerHTML = records.map((record) => {
      const type = TYPE_META[record.type] || { label: record.type };
      return `<tr>
        <td>${formatDate(record.date)}</td>
        <td>${escapeHtml(record.participants.join('; '))}</td>
        <td><strong>${escapeHtml(record.title)}</strong><div class="small-note">${escapeHtml(record.detail)}</div></td>
        <td>${escapeHtml(type.label)}</td>
        <td><span class="scope-badge ${record.scope}">${escapeHtml(SCOPE_META[record.scope])}</span></td>
        <td>${record.stages.map((stage) => escapeHtml(STAGE_LABELS[stage] || stage)).join(', ')}</td>
        <td><span class="status-badge">${escapeHtml(STATUS_META[record.status]?.label || record.status)}</span><div class="small-note">${escapeHtml(record.implementation)}</div></td>
        <td><a href="${escapeHtml(record.url)}" target="_blank" rel="noopener">Official source</a><div class="small-note">Verified ${escapeHtml(record.lastVerified)}</div></td>
      </tr>`;
    }).join('');
  }

  function render() {
    syncControls();
    updateHeader();
    renderLegend();
    elements.map.hidden = state.mode === 'research';
    elements.researchView.hidden = state.mode !== 'research';
    if (state.mode === 'research') renderResearchView();
    else renderMap();
    renderPanel();
    renderComparison();
    renderCooperationTable();
    syncUrl();
  }

  function init() {
    initializeSelects();
    parseUrl();
    bindEvents();
    render();
  }

  init();
})();
