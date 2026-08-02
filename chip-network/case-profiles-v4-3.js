(() => {
  'use strict';

  const CASE_IDS = ['ind', 'mys', 'can'];
  const CASE_NAMES = { ind: 'India', mys: 'Malaysia', can: 'Canada' };
  const GROUP_META = {
    integrated_circuits: { label: 'Integrated circuits', className: 'group-ic' },
    semiconductor_devices: { label: 'Semiconductor devices', className: 'group-devices' },
    manufacturing_equipment: { label: 'Manufacturing equipment', className: 'group-equipment' },
    wafers_materials: { label: 'Wafers and materials', className: 'group-materials' }
  };
  const CAPABILITY_LEVELS = {
    established: 'Established domestic capability',
    partial: 'Partial or specialized capability',
    external: 'Predominantly external dependence'
  };
  const CAPABILITY_STAGE_MAP = {
    ind: [
      { stage: 'Design and IP', level: 'established', target: true, note: 'Large design and engineering base; continued dependence on external EDA tools and advanced IP.' },
      { stage: 'Materials', level: 'external', target: true, note: 'New projects continue to rely heavily on imported wafers, chemicals, gases, and substrates.' },
      { stage: 'Equipment', level: 'external', target: true, note: 'Fabrication and packaging expansion requires imported production and testing equipment.' },
      { stage: 'Fabrication', level: 'partial', target: true, note: 'Several projects are under implementation, but commercial scale and process access remain incomplete.' },
      { stage: 'Packaging and testing', level: 'partial', target: true, note: 'Capacity is expanding through domestic projects, joint ventures, and foreign-owned facilities.' },
      { stage: 'Research and skills', level: 'established', target: true, note: 'A large technical workforce supports design and manufacturing ambitions, while specialized production skills are still being developed.' },
      { stage: 'Markets', level: 'established', target: true, note: 'A large domestic electronics market creates demand, but many advanced components remain imported.' }
    ],
    mys: [
      { stage: 'Design and IP', level: 'partial', target: true, note: 'Design activities are growing but remain smaller than the country’s manufacturing and back-end role.' },
      { stage: 'Materials', level: 'partial', target: true, note: 'Selected material and supplier capabilities exist, while key inputs remain externally sourced.' },
      { stage: 'Equipment', level: 'external', target: true, note: 'Production depends on equipment and process technologies controlled by foreign suppliers.' },
      { stage: 'Fabrication', level: 'partial', target: true, note: 'Malaysia hosts operating fabs in selected technologies but not a complete leading-edge production base.' },
      { stage: 'Packaging and testing', level: 'established', target: true, note: 'Long-standing domestic and multinational OSAT capacity is a central national asset.' },
      { stage: 'Research and skills', level: 'partial', target: true, note: 'Public facilities and industrial clusters support training, prototyping, and upgrading.' },
      { stage: 'Markets', level: 'external', target: true, note: 'Production is closely tied to foreign customers and global electronics demand.' }
    ],
    can: [
      { stage: 'Design and IP', level: 'partial', target: true, note: 'Canada has specialized photonics, sensor, and interconnect design capabilities rather than broad commercial scale.' },
      { stage: 'Materials', level: 'partial', target: true, note: 'Compound-semiconductor and photonics niches exist, while most production inputs remain imported.' },
      { stage: 'Equipment', level: 'external', target: true, note: 'Advanced manufacturing equipment and many process tools are supplied from foreign ecosystems.' },
      { stage: 'Fabrication', level: 'partial', target: true, note: 'Specialized sensor, MEMS, photonics, and compound-semiconductor facilities operate without high-volume leading-edge logic scale.' },
      { stage: 'Packaging and testing', level: 'partial', target: true, note: 'Advanced packaging and commercialization infrastructure is concentrated in specialized Quebec facilities.' },
      { stage: 'Research and skills', level: 'established', target: true, note: 'National research-access networks connect universities, laboratories, design tools, prototyping, and multi-project wafers.' },
      { stage: 'Markets', level: 'external', target: true, note: 'Commercial scale-up depends heavily on United States and wider allied customers and production networks.' }
    ]
  };

  let activeCase = 'ind';
  const entityFilters = { stage: 'all', ownership: 'all', status: 'all' };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function money(value) {
    return Number.isFinite(value)
      ? new Intl.NumberFormat('en-US', {
          style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2
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
    const name = row?.name || 'Unknown';
    if (name === 'USA') return 'United States';
    if (name === 'Rep. of Korea') return 'South Korea';
    if (name === 'Other Asia, nes') return 'Taiwan proxy';
    if (name === 'Viet Nam') return 'Vietnam';
    return name;
  }

  function tradeValues(countryId) {
    return typeof TRADE_DATA !== 'undefined' ? TRADE_DATA?.countries?.[countryId] : null;
  }

  function selectedCaseFromPage() {
    const selected = document.getElementById('countrySelect')?.value;
    return CASE_IDS.includes(selected) ? selected : null;
  }

  function syncCaseParam(countryId) {
    const params = new URLSearchParams(window.location.search);
    params.set('case', countryId);
    const query = params.toString();
    history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  }

  function compositionHtml(groups = {}) {
    const total = Object.values(groups).reduce((sum, value) => sum + Number(value || 0), 0);
    return Object.entries(GROUP_META).map(([key, meta]) => {
      const value = Number(groups[key] || 0);
      const share = total > 0 ? value / total : 0;
      return `<div class="case-product-row">
        <div class="case-product-label"><span>${escapeHtml(meta.label)}</span><strong>${money(value)} · ${percent(share)}</strong></div>
        <div class="case-product-track"><span class="${meta.className}" style="width:${Math.min(100, share * 100)}%"></span></div>
      </div>`;
    }).join('');
  }

  function partnerListHtml(rows = []) {
    if (!rows.length) return '<div class="case-empty">No partner ranking available.</div>';
    return `<ol class="case-partner-list">${rows.slice(0, 5).map((row, index) => `<li>
      <span class="case-rank">${index + 1}</span>
      <span>${escapeHtml(normalizePartnerName(row))}</span>
      <strong>${percent(row.share)}</strong>
      <small>${money(row.value)}</small>
    </li>`).join('')}</ol>`;
  }

  function bulletList(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function ownershipCategory(entity) {
    const text = `${entity.entityType} ${entity.headquarters}`.toLowerCase();
    if (/public|not-for-profit|research|university|centre|center|institution/.test(text)) return 'public';
    if (/joint venture|joint-venture|with foreign|india \/ taiwan/.test(text)) return 'joint';
    if (/foreign-owned/.test(text)) return 'foreign';
    return 'domestic';
  }

  function statusCategory(entity) {
    const text = entity.status.toLowerCase();
    if (text.includes('pilot')) return 'pilot';
    if (text.includes('under implementation') || text.includes('planned') || text.includes('announced')) return 'implementation';
    return 'operational';
  }

  function stageCategory(entity) {
    const text = entity.stages.join(' ').toLowerCase();
    if (/packaging|testing|assembly/.test(text)) return 'packaging';
    if (/fabrication|foundry|mems|sensors/.test(text)) return 'fabrication';
    if (/design|photonics|interconnect/.test(text)) return 'design';
    if (/research|workforce|commercialization/.test(text)) return 'research';
    return 'other';
  }

  function filteredEntities(profile) {
    return profile.entities.filter((entity) => {
      if (entityFilters.stage !== 'all' && stageCategory(entity) !== entityFilters.stage) return false;
      if (entityFilters.ownership !== 'all' && ownershipCategory(entity) !== entityFilters.ownership) return false;
      if (entityFilters.status !== 'all' && statusCategory(entity) !== entityFilters.status) return false;
      return true;
    });
  }

  function entityCard(entity) {
    return `<article class="entity-card">
      <div class="entity-head">
        <div>
          <h4>${escapeHtml(entity.name)}</h4>
          <div class="entity-type">${escapeHtml(entity.entityType)}</div>
        </div>
        <span class="entity-status">${escapeHtml(entity.status)}</span>
      </div>
      <div class="entity-stage-row">${entity.stages.map((stage) => `<span>${escapeHtml(stage)}</span>`).join('')}</div>
      <p>${escapeHtml(entity.role)}</p>
      <dl>
        <div><dt>Headquarters</dt><dd>${escapeHtml(entity.headquarters)}</dd></div>
        <div><dt>Facility or activity</dt><dd>${escapeHtml(entity.location)}</dd></div>
      </dl>
      <div class="entity-source"><a href="${escapeHtml(entity.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(entity.sourceLabel)}</a><span>Verified ${formatDate(entity.lastVerified)}</span></div>
    </article>`;
  }

  function capabilityStripHtml(countryId) {
    const stages = CAPABILITY_STAGE_MAP[countryId] || [];
    return `<section class="capability-strip-block" aria-labelledby="capabilityStripTitle">
      <div class="case-block-heading">
        <div><span class="case-eyebrow">Capability-gap view</span><h3 id="capabilityStripTitle">Where domestic capabilities end and external access begins</h3></div>
        <div class="capability-legend" aria-label="Capability legend">
          ${Object.entries(CAPABILITY_LEVELS).map(([key, label]) => `<span><i class="level-dot ${key}"></i>${escapeHtml(label)}</span>`).join('')}
          <span><i class="target-marker">◆</i>Targeted by cooperation</span>
        </div>
      </div>
      <div class="capability-strip">${stages.map((item) => `<article class="capability-stage ${item.level}">
        <div class="capability-stage-head"><strong>${escapeHtml(item.stage)}</strong>${item.target ? '<span title="Targeted by cooperation" aria-label="Targeted by cooperation">◆</span>' : ''}</div>
        <div class="capability-level">${escapeHtml(CAPABILITY_LEVELS[item.level])}</div>
        <p>${escapeHtml(item.note)}</p>
      </article>`).join('')}</div>
      <p class="interpretive-note">These categories are qualitative summaries of the visible profile evidence. They are not scores of national power, self-sufficiency, or technological sophistication.</p>
    </section>`;
  }

  function entityFiltersHtml(profile, shownCount) {
    return `<div class="entity-filter-bar" aria-label="Filter representative entities">
      <div class="entity-filter-group"><span>Stage</span>${[
        ['all', 'All'], ['design', 'Design'], ['fabrication', 'Fabrication'], ['packaging', 'Packaging/testing'], ['research', 'Research']
      ].map(([value, label]) => `<button type="button" class="entity-filter${entityFilters.stage === value ? ' active' : ''}" data-filter-key="stage" data-filter-value="${value}">${label}</button>`).join('')}</div>
      <div class="entity-filter-group"><span>Ownership</span>${[
        ['all', 'All'], ['domestic', 'Domestic'], ['foreign', 'Foreign-owned'], ['joint', 'Joint venture'], ['public', 'Public/research']
      ].map(([value, label]) => `<button type="button" class="entity-filter${entityFilters.ownership === value ? ' active' : ''}" data-filter-key="ownership" data-filter-value="${value}">${label}</button>`).join('')}</div>
      <div class="entity-filter-group"><span>Status</span>${[
        ['all', 'All'], ['operational', 'Operational'], ['pilot', 'Pilot'], ['implementation', 'Under implementation']
      ].map(([value, label]) => `<button type="button" class="entity-filter${entityFilters.status === value ? ' active' : ''}" data-filter-key="status" data-filter-value="${value}">${label}</button>`).join('')}</div>
      <div class="entity-filter-count">Showing ${shownCount} of ${profile.entities.length} representative entities</div>
    </div>`;
  }

  function comparisonMatrixHtml() {
    const rows = CASE_IDS.map((countryId) => {
      const profile = CAPABILITY_PROFILES[countryId];
      const values = tradeValues(countryId);
      return `<tr>
        <th>${escapeHtml(profile.country)}</th>
        <td>${escapeHtml(profile.possesses[0])}</td>
        <td>${values ? `${money(values.imports)} imports; ${money(values.exports)} exports; HHI ${values.import_hhi.toFixed(3)}` : '—'}</td>
        <td>${escapeHtml(profile.cooperationResponse[0])}</td>
        <td>${escapeHtml(profile.pathway)}</td>
      </tr>`;
    }).join('');
    return `<div class="case-comparison-block">
      <div class="case-block-heading">
        <div><span class="case-eyebrow">Capability–trade–cooperation matrix</span><h3>How inherited positions shape cooperation</h3></div>
        <p>These profiles illustrate contrasting starting positions. They do not rank national semiconductor power or constitute a complete firm census.</p>
      </div>
      <div class="table-wrap"><table class="case-comparison-table">
        <thead><tr><th>Case</th><th>Representative domestic asset</th><th>2024 trade position</th><th>Cooperation response</th><th>Managed-dependence pathway</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
  }

  function bindEntityFilters() {
    document.querySelectorAll('.entity-filter').forEach((button) => {
      button.addEventListener('click', () => {
        entityFilters[button.dataset.filterKey] = button.dataset.filterValue;
        renderCase(activeCase, { syncUrl: false });
      });
    });
  }

  function renderCase(countryId, { syncUrl = true } = {}) {
    const profile = CAPABILITY_PROFILES[countryId];
    const values = tradeValues(countryId);
    const content = document.getElementById('caseProfileContent');
    if (!profile || !content) return;
    activeCase = countryId;
    const entities = filteredEntities(profile);

    const metrics = values ? `
      <div class="case-metric-grid">
        <div><span>2024 imports</span><strong>${money(values.imports)}</strong><small>four-product basket</small></div>
        <div><span>2024 exports</span><strong>${money(values.exports)}</strong><small>four-product basket</small></div>
        <div><span>Trade balance</span><strong>${money(values.balance)}</strong><small>exports minus imports</small></div>
        <div><span>Import HHI</span><strong>${values.import_hhi.toFixed(3)}</strong><small>${values.effective_import_partners.toFixed(1)} effective suppliers</small></div>
        <div><span>Largest supplier</span><strong>${percent(values.import_top1_share)}</strong><small>share of imports</small></div>
        <div><span>Top three suppliers</span><strong>${percent(values.import_top3_share)}</strong><small>share of imports</small></div>
      </div>` : '<div class="case-empty">No BACI trade indicators are available for this case.</div>';

    const tradeDetails = values ? `
      <div class="case-trade-grid">
        <section><h3>Import composition</h3>${compositionHtml(values.import_groups)}</section>
        <section><h3>Export composition</h3>${compositionHtml(values.export_groups)}</section>
        <section><h3>Largest import sources</h3>${partnerListHtml(values.top_import_sources)}</section>
        <section><h3>Largest export destinations</h3>${partnerListHtml(values.top_export_destinations)}</section>
      </div>` : '';

    content.innerHTML = `
      <article class="case-overview">
        <div class="case-title-row">
          <div><span class="case-eyebrow">Selected middle-power case</span><h2>${escapeHtml(profile.country)}</h2></div>
          <span class="pathway-badge">${escapeHtml(profile.pathway)}</span>
        </div>
        <p class="case-summary">${escapeHtml(profile.summary)}</p>
        ${metrics}
      </article>

      ${capabilityStripHtml(countryId)}

      <div class="case-logic-grid">
        <section><span class="case-eyebrow">What the country possesses</span>${bulletList(profile.possesses)}</section>
        <section><span class="case-eyebrow">What it still depends on</span>${bulletList(profile.dependsOn)}</section>
        <section><span class="case-eyebrow">What cooperation is intended to provide</span>${bulletList(profile.cooperationResponse)}</section>
      </div>

      ${tradeDetails}

      <div class="entity-section">
        <div class="case-block-heading">
          <div><span class="case-eyebrow">Capabilities and firms</span><h3>Representative firms and institutions operating in ${escapeHtml(profile.country)}</h3></div>
          <p>Headquarters, facility location, ownership, and status are kept separate. The list is curated and non-exhaustive.</p>
        </div>
        ${entityFiltersHtml(profile, entities.length)}
        ${entities.length ? `<div class="entity-grid">${entities.map(entityCard).join('')}</div>` : '<div class="case-empty">No representative entity matches all active filters.</div>'}
      </div>

      ${comparisonMatrixHtml()}

      <div class="case-method-note"><strong>Scope:</strong> ${escapeHtml(CAPABILITY_PROFILE_META.note)} Trade values use CEPII BACI 2024 and do not measure ownership, licensing, services, domestic absorption, or technological sophistication within product codes. No firm-level dataset is offered for download.</div>`;

    content.setAttribute('aria-labelledby', `case-tab-${countryId}`);
    content.tabIndex = 0;
    document.querySelectorAll('.case-tab').forEach((button) => {
      const active = button.dataset.caseId === countryId;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      button.tabIndex = active ? 0 : -1;
    });
    bindEntityFilters();
    if (syncUrl) syncCaseParam(countryId);
    document.dispatchEvent(new CustomEvent('chip:casechange', { detail: { countryId } }));
  }

  function bindCaseTabs() {
    const tabs = [...document.querySelectorAll('.case-tab')];
    tabs.forEach((button, index) => {
      button.addEventListener('click', () => renderCase(button.dataset.caseId));
      button.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        tabs[nextIndex].focus();
        renderCase(tabs[nextIndex].dataset.caseId);
      });
    });
  }

  function injectPanelSummary() {
    const panel = document.getElementById('panel');
    if (!panel) return;
    const selected = selectedCaseFromPage();
    const existing = panel.querySelector('.case-panel-summary');
    if (!selected) {
      existing?.remove();
      return;
    }
    if (existing?.dataset.countryId === selected) return;
    existing?.remove();

    const profile = CAPABILITY_PROFILES[selected];
    if (!profile) return;
    const summary = document.createElement('section');
    summary.className = 'case-panel-summary';
    summary.dataset.countryId = selected;
    summary.innerHTML = `
      <span class="case-eyebrow">Capabilities and firms</span>
      <h3>${profile.entities.length} representative entities</h3>
      <p>${escapeHtml(profile.pathway)}</p>
      <div class="case-mini-entities">${profile.entities.slice(0, 4).map((entity) => `<span>${escapeHtml(entity.name)}</span>`).join('')}</div>
      <a href="#caseProfilesSection">Open the full capability and trade profile</a>`;
    summary.querySelector('a')?.addEventListener('click', () => renderCase(selected));
    const note = panel.querySelector('.data-note');
    if (note) panel.insertBefore(summary, note);
    else panel.appendChild(summary);
  }

  function syncWithCountrySelection() {
    const selected = selectedCaseFromPage();
    if (selected && selected !== activeCase) renderCase(selected);
    injectPanelSummary();
  }

  function initialCase() {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('case');
    if (CASE_IDS.includes(requested)) return requested;
    return selectedCaseFromPage() || 'ind';
  }

  function init() {
    if (typeof CAPABILITY_PROFILES === 'undefined') return;
    bindCaseTabs();
    renderCase(initialCase(), { syncUrl: false });
    injectPanelSummary();
    document.getElementById('countrySelect')?.addEventListener('change', () => setTimeout(syncWithCountrySelection, 0));
    window.addEventListener('popstate', () => setTimeout(() => renderCase(initialCase(), { syncUrl: false }), 0));

    const panel = document.getElementById('panel');
    if (panel) new MutationObserver(() => injectPanelSummary()).observe(panel, { childList: true, subtree: false });
  }

  window.CHIP_CASE_PROFILES = {
    getActiveCase: () => activeCase,
    setActiveCase: (countryId) => CASE_IDS.includes(countryId) && renderCase(countryId),
    capabilityStageMap: CAPABILITY_STAGE_MAP
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();