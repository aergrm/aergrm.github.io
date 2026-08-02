(() => {
  'use strict';

  const TYPE_COLORS = {
    resilience: '#176b87',
    research: '#6f42a5',
    ecosystem: '#2f7d4a',
    investment: '#b56320',
    trusted_network: '#a02d4f'
  };
  const STATUS_DASH = {
    signed: '8 5',
    funded: '14 4 3 4',
    open_call: '2 5',
    implementation: '',
    operational: '',
    announced: '2 5'
  };
  const STATUS_LABELS = {
    announced: 'Announced',
    signed: 'Signed',
    funded: 'Funded',
    open_call: 'Open call',
    implementation: 'Under implementation',
    operational: 'Operational'
  };
  const MAP = { left: 25, right: 975, top: 25, bottom: 575, minLat: -60, maxLat: 85 };
  const SVG_NS = 'http://www.w3.org/2000/svg';
  let scheduled = false;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function recordTouchesCountry(record, countryId) {
    return record.participantIds?.includes(countryId)
      || record.mapPairs?.some(([a, b]) => a === countryId || b === countryId);
  }

  function visibleRecords({ includeSearch = false, selectedCountry = false } = {}) {
    if (typeof COOPERATION_DATA === 'undefined') return [];
    const year = Number(document.getElementById('yearSelect')?.value || 2026);
    const type = document.getElementById('coopType')?.value || 'all';
    const scope = document.getElementById('coopScope')?.value || 'all';
    const status = document.getElementById('coopStatus')?.value || 'all';
    const stage = document.getElementById('coopStage')?.value || 'all';
    const countryId = selectedCountry ? (document.getElementById('countrySelect')?.value || '') : '';
    const search = includeSearch
      ? (document.getElementById('cooperationSearch')?.value || '').trim().toLowerCase()
      : '';

    return COOPERATION_DATA.filter((record) => {
      if (record.year > year) return false;
      if (type !== 'all' && record.type !== type) return false;
      if (scope !== 'all' && record.scope !== scope) return false;
      if (status !== 'all' && record.status !== status) return false;
      if (stage !== 'all' && !record.stages.includes(stage)) return false;
      if (countryId && !recordTouchesCountry(record, countryId)) return false;
      if (search) {
        const haystack = [
          record.title,
          record.participants.join(' '),
          record.type,
          record.scope,
          record.status,
          record.stages.join(' '),
          record.detail,
          record.implementation,
          record.funding
        ].join(' ').toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }

  function applyReleaseLabels() {
    const kicker = document.querySelector('.kicker');
    if (kicker) kicker.textContent = kicker.textContent.replace('Release 4.3', 'Release 4.3.1');
    const citation = document.querySelector('.citation-text');
    if (citation) citation.textContent = 'Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release 4.3.1.';
  }

  function updateCoverageStrip() {
    if (typeof COOPERATION_DATA === 'undefined') return;
    const subtitle = document.querySelector('.topbar .subtitle');
    if (!subtitle) return;
    let strip = document.getElementById('coverageStrip');
    if (!strip) {
      strip = document.createElement('div');
      strip.id = 'coverageStrip';
      strip.className = 'coverage-strip';
      subtitle.insertAdjacentElement('afterend', strip);
    }
    strip.innerHTML = `<strong>${COOPERATION_DATA.length}</strong> documented cooperation records <span>·</span> 2021–July 2026 <span>·</span> official sources only`;
  }

  function compactOpeningLayout() {
    const scopeCard = document.querySelector('.scope-card');
    const scopeColumns = scopeCard?.querySelector('.scope-columns');
    if (scopeCard && scopeColumns && !scopeCard.querySelector('.scope-details')) {
      const details = document.createElement('details');
      details.className = 'scope-details';
      const summary = document.createElement('summary');
      summary.textContent = 'Scope and limitations';
      scopeColumns.insertAdjacentElement('beforebegin', details);
      details.append(summary, scopeColumns);
    }
    const main = document.querySelector('main.layout');
    const implementation = document.getElementById('implementationSection');
    if (main && implementation && main.nextElementSibling !== implementation) {
      main.insertAdjacentElement('afterend', implementation);
    }
  }

  function setupAgreementBrowser() {
    const section = document.getElementById('cooperationDataSection');
    if (!section || document.getElementById('agreementBrowser')) return;

    const details = document.createElement('details');
    details.id = 'agreementBrowser';
    details.className = 'agreement-browser';

    const summary = document.createElement('summary');
    summary.innerHTML = '<span>Browse all cooperation records</span><small>Search sources, participants, stages, and implementation evidence</small>';

    const shell = document.createElement('div');
    shell.className = 'agreement-browser-shell';
    section.insertAdjacentElement('beforebegin', details);
    details.append(summary, shell);
    shell.appendChild(section);

    section.classList.add('cooperation-data-visible');
    section.removeAttribute('aria-hidden');

    const intro = document.createElement('div');
    intro.className = 'agreement-browser-intro';
    intro.innerHTML = '<div><div class="scope-label">Evidence browser</div><h2>Official cooperation records</h2></div><p>Counts and rows follow the active year and cooperation filters. A low count may reflect the official-source inclusion rule rather than the absence of international activity.</p>';

    const toolbar = document.createElement('div');
    toolbar.className = 'agreement-browser-toolbar';
    const search = document.getElementById('cooperationSearch');
    const count = document.getElementById('cooperationCount');
    if (search) {
      search.tabIndex = 0;
      search.placeholder = 'Search agreements, participants, stages, or evidence';
      search.setAttribute('aria-label', 'Search cooperation records');
      toolbar.appendChild(search);
    }
    if (count) toolbar.appendChild(count);

    const table = section.querySelector('table');
    if (table) {
      table.classList.add('agreement-table');
      if (!table.querySelector('thead')) {
        const thead = document.createElement('thead');
        thead.innerHTML = '<tr><th>Date</th><th>Participants</th><th>Agreement</th><th>Type</th><th>Scope</th><th>Stages</th><th>Status and implementation</th><th>Source</th></tr>';
        table.insertAdjacentElement('afterbegin', thead);
      }
      const wrap = document.createElement('div');
      wrap.className = 'agreement-table-wrap';
      table.insertAdjacentElement('beforebegin', wrap);
      wrap.appendChild(table);
    }

    section.insertAdjacentElement('afterbegin', toolbar);
    section.insertAdjacentElement('afterbegin', intro);

    const syncVisibility = () => {
      details.hidden = section.hidden;
      if (!section.hidden) section.removeAttribute('aria-hidden');
    };
    new MutationObserver(syncVisibility).observe(section, { attributes: true, attributeFilter: ['hidden'] });
    syncVisibility();

    const body = document.getElementById('cooperationTableBody');
    if (body) {
      new MutationObserver(decorateAgreementRows).observe(body, { childList: true });
      decorateAgreementRows();
    }
  }

  function formatDate(value) {
    if (!value) return 'Date not specified';
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      .format(new Date(Date.UTC(year, month - 1, day)));
  }

  function timelineHtml(record) {
    const fundingStep = record.funding && record.funding !== 'Not specified'
      ? `<li><span class="timeline-dot"></span><div><strong>Funding evidence</strong><small>${escapeHtml(record.funding)}</small></div></li>`
      : '';
    return `<details class="record-timeline">
      <summary>Evidence timeline</summary>
      <ol>
        <li><span class="timeline-dot"></span><div><strong>${escapeHtml(formatDate(record.date))}</strong><small>Framework established or formally recorded</small></div></li>
        ${fundingStep}
        <li><span class="timeline-dot current"></span><div><strong>${escapeHtml(STATUS_LABELS[record.status] || record.status)}</strong><small>${escapeHtml(record.implementation)}</small></div></li>
      </ol>
    </details>`;
  }

  function decorateAgreementRows() {
    const body = document.getElementById('cooperationTableBody');
    if (!body) return;
    const records = visibleRecords({ includeSearch: true });
    [...body.rows].forEach((row, index) => {
      const record = records[index];
      if (!record) return;
      row.dataset.recordId = record.id;
      const multilateral = (record.participantIds?.length || 0) > 2;
      row.classList.toggle('multilateral-record', multilateral);
      const cells = row.cells;
      if (multilateral && cells[1] && !cells[1].querySelector('.multilateral-badge')) {
        cells[1].insertAdjacentHTML('beforeend', '<div><span class="multilateral-badge">Multilateral framework</span></div>');
      }
      if (cells[6] && !cells[6].querySelector('.record-timeline')) {
        cells[6].insertAdjacentHTML('beforeend', timelineHtml(record));
      }
    });
  }

  function project(country) {
    const x = MAP.left + ((country.lon + 180) / 360) * (MAP.right - MAP.left);
    const latitude = Math.max(MAP.minLat, Math.min(MAP.maxLat, country.lat));
    const y = MAP.top + ((MAP.maxLat - latitude) / (MAP.maxLat - MAP.minLat)) * (MAP.bottom - MAP.top);
    return [x, y];
  }

  function svg(name, attrs = {}) {
    const element = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') element.setAttribute(key, value);
    });
    return element;
  }

  function decorateMultilateralMap() {
    if (typeof COUNTRIES === 'undefined') return;
    const map = document.getElementById('map');
    const viewport = map?.querySelector('#mapViewport');
    if (!viewport || map.hidden) return;

    viewport.querySelector('.release-multilateral-overlay')?.remove();
    const records = visibleRecords();
    const paths = [...viewport.querySelectorAll('.coop-link')];
    let pathIndex = 0;

    records.forEach((record) => {
      const mappedParticipants = record.participantIds?.filter((id) => COUNTRIES.some((country) => country.id === id)) || [];
      const multilateral = mappedParticipants.length > 2;
      (record.mapPairs || []).forEach(() => {
        const path = paths[pathIndex++];
        if (!path) return;
        path.classList.toggle('multilateral-member-link', multilateral);
        if (multilateral) path.style.opacity = '0';
        else path.style.removeProperty('opacity');
      });
    });

    const overlay = svg('g', { class: 'release-multilateral-overlay' });
    const byId = new Map(COUNTRIES.map((country) => [country.id, country]));
    const selectedCountry = document.getElementById('countrySelect')?.value || '';
    let multilateralIndex = 0;

    records.filter((record) => (record.participantIds?.filter((id) => byId.has(id)).length || 0) > 2)
      .forEach((record) => {
        const members = [...new Set(record.participantIds)].map((id) => byId.get(id)).filter(Boolean);
        const points = members.map(project);
        if (points.length < 3) return;

        const offsetX = ((multilateralIndex % 3) - 1) * 22;
        const offsetY = ((Math.floor(multilateralIndex / 3) % 3) - 1) * 14;
        const cx = points.reduce((sum, point) => sum + point[0], 0) / points.length + offsetX;
        const cy = points.reduce((sum, point) => sum + point[1], 0) / points.length + offsetY;
        const color = TYPE_COLORS[record.type] || '#65758a';
        const selected = !selectedCountry || recordTouchesCountry(record, selectedCountry);
        const group = svg('g', { class: 'multilateral-framework', opacity: selected ? '.84' : '.08' });

        points.forEach(([x, y]) => {
          group.appendChild(svg('line', {
            x1: cx, y1: cy, x2: x, y2: y,
            stroke: color,
            'stroke-width': record.scope === 'semiconductor-specific' ? '2.2' : '1.7',
            'stroke-dasharray': STATUS_DASH[record.status] || '',
            class: 'multilateral-spoke'
          }));
        });

        const marker = svg('g', { class: 'multilateral-marker', tabindex: '0', role: 'img' });
        const title = svg('title');
        title.textContent = `${record.title}: ${record.participants.join(', ')}`;
        marker.appendChild(title);
        marker.appendChild(svg('circle', { cx, cy, r: '10', fill: '#fff', stroke: color, 'stroke-width': '2.5' }));
        const label = svg('text', {
          x: cx, y: cy + 3.5, 'text-anchor': 'middle',
          class: 'multilateral-marker-label', fill: color
        });
        label.textContent = 'M';
        marker.appendChild(label);
        group.appendChild(marker);
        overlay.appendChild(group);
        multilateralIndex += 1;
      });
    viewport.appendChild(overlay);
  }

  function decorateLegend() {
    const legend = document.getElementById('legend');
    const cooperationControls = document.getElementById('cooperationControls');
    if (!legend || cooperationControls?.hidden || legend.querySelector('.multilateral-legend-item')) return;
    const item = document.createElement('span');
    item.className = 'legend-item multilateral-legend-item';
    item.innerHTML = '<span class="multilateral-legend-symbol">M</span>Multilateral framework';
    const version = legend.querySelector('.map-version');
    if (version) version.insertAdjacentElement('beforebegin', item);
    else legend.appendChild(item);
  }

  function decorateCountryPanel() {
    const panel = document.getElementById('panel');
    if (!panel) return;
    const selected = document.getElementById('countrySelect')?.value || '';
    const cooperationMode = !document.getElementById('cooperationControls')?.hidden;
    const existing = panel.querySelector('.country-coverage-note');
    if (!selected || !cooperationMode) {
      existing?.remove();
      return;
    }
    const count = visibleRecords({ selectedCountry: true }).length;
    const text = `${count} documented cooperation record${count === 1 ? '' : 's'} under the active filters. Low counts may reflect the official-source inclusion rule rather than no international activity.`;
    if (existing) {
      if (existing.textContent !== text) existing.textContent = text;
      return;
    }
    const note = document.createElement('div');
    note.className = 'country-coverage-note';
    note.textContent = text;
    const heading = panel.querySelector('h2');
    if (heading) heading.insertAdjacentElement('afterend', note);
    else panel.prepend(note);
  }

  async function copyText(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Citation copied';
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      button.textContent = 'Citation copied';
    }
    window.setTimeout(() => { button.textContent = 'Copy citation'; }, 1800);
  }

  function replaceCitationControl() {
    const button = document.getElementById('copyCitation');
    if (!button || button.dataset.release431 === 'true') return;
    const replacement = button.cloneNode(true);
    replacement.dataset.release431 = 'true';
    button.replaceWith(replacement);
    replacement.addEventListener('click', () => copyText(
      'Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release 4.3.1. https://aergrm.github.io/chip-network/',
      replacement
    ));
  }

  function run() {
    scheduled = false;
    applyReleaseLabels();
    updateCoverageStrip();
    decorateAgreementRows();
    decorateMultilateralMap();
    decorateLegend();
    decorateCountryPanel();
    replaceCitationControl();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(run);
  }

  function bindUpdates() {
    ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
      document.getElementById(id)?.addEventListener('change', () => window.setTimeout(schedule, 0));
    });
    document.getElementById('cooperationSearch')?.addEventListener('input', () => window.setTimeout(schedule, 0));
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => window.setTimeout(schedule, 0));
    });

    const panel = document.getElementById('panel');
    if (panel) new MutationObserver(schedule).observe(panel, { childList: true });
    const map = document.getElementById('map');
    if (map) new MutationObserver(schedule).observe(map, { childList: true });
    const legend = document.getElementById('legend');
    if (legend) new MutationObserver(() => window.setTimeout(decorateLegend, 0)).observe(legend, { childList: true });

    window.addEventListener('chip:cooperationdatachange', schedule);
    document.addEventListener('chip:casechange', schedule);
    window.addEventListener('popstate', () => window.setTimeout(schedule, 0));
  }

  function init() {
    applyReleaseLabels();
    compactOpeningLayout();
    setupAgreementBrowser();
    updateCoverageStrip();
    replaceCitationControl();
    bindUpdates();
    schedule();
    [250, 750, 1500].forEach((delay) => window.setTimeout(schedule, delay));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();