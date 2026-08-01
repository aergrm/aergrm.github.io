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

  let activeCase = 'ind';

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
      <div class="entity-source"><a href="${escapeHtml(entity.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(entity.sourceLabel)}</a><span>Source dated ${formatDate(entity.sourceDate)} · verified ${formatDate(entity.lastVerified)}</span></div>
    </article>`;
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

  function renderCase(countryId) {
    const profile = CAPABILITY_PROFILES[countryId];
    const values = tradeValues(countryId);
    const content = document.getElementById('caseProfileContent');
    if (!profile || !content) return;

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
        <div class="entity-grid">${profile.entities.map(entityCard).join('')}</div>
      </div>

      ${comparisonMatrixHtml()}

      <div class="case-method-note"><strong>Scope:</strong> ${escapeHtml(CAPABILITY_PROFILE_META.note)} Trade values use CEPII BACI 2024 and do not measure ownership, licensing, services, domestic absorption, or technological sophistication within product codes. No firm-level dataset is offered for download.</div>`;

    document.querySelectorAll('.case-tab').forEach((button) => {
      button.classList.toggle('active', button.dataset.caseId === countryId);
      button.setAttribute('aria-selected', button.dataset.caseId === countryId ? 'true' : 'false');
    });
  }

  function ensureCaseSection() {
    if (document.getElementById('caseProfilesSection')) return;
    const section = document.createElement('section');
    section.id = 'caseProfilesSection';
    section.className = 'case-profile-section';
    section.setAttribute('aria-labelledby', 'caseProfilesTitle');
    section.innerHTML = `
      <div class="case-section-head">
        <div>
          <span class="case-eyebrow">Release 4.2 · August 2026</span>
          <h2 id="caseProfilesTitle">Capabilities, firms, and trade in three selected cases</h2>
          <p>Explore how domestic assets, external dependencies, and international cooperation fit together in India, Malaysia, and Canada.</p>
        </div>
        <div class="case-tabs" role="tablist" aria-label="Select a country profile">
          ${CASE_IDS.map((countryId) => `<button class="case-tab${countryId === activeCase ? ' active' : ''}" type="button" role="tab" data-case-id="${countryId}" aria-selected="${countryId === activeCase}">${CASE_NAMES[countryId]}</button>`).join('')}
        </div>
      </div>
      <div id="caseProfileContent"></div>`;

    const dataSection = document.getElementById('cooperationDataSection');
    if (dataSection?.parentNode) dataSection.parentNode.insertBefore(section, dataSection);
    else document.querySelector('footer')?.before(section);

    section.querySelectorAll('.case-tab').forEach((button) => {
      button.addEventListener('click', () => {
        activeCase = button.dataset.caseId;
        renderCase(activeCase);
      });
    });
    renderCase(activeCase);
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
    const note = panel.querySelector('.data-note');
    if (note) panel.insertBefore(summary, note);
    else panel.appendChild(summary);
  }

  function syncWithCountrySelection() {
    const selected = selectedCaseFromPage();
    if (selected && selected !== activeCase) {
      activeCase = selected;
      renderCase(activeCase);
    }
    injectPanelSummary();
  }

  function updateReleaseLabels() {
    const kicker = document.querySelector('.kicker');
    if (kicker) kicker.textContent = 'Interactive research resource · Release 4.2 · August 2026';
    const showText = document.querySelector('.scope-columns div:first-child span');
    if (showText) showText.textContent = 'Official cooperation records, bilateral customs trade, country profiles, published firm-network findings, and curated firm and institution profiles for India, Malaysia, and Canada.';
    const notShowText = document.querySelector('.scope-columns div:nth-child(2) span');
    if (notShowText) notShowText.textContent = 'A complete firm census, private supplier relationships, technological sophistication, production capacity beyond documented evidence, or implementation not supported by sources.';
  }

  function init() {
    if (typeof CAPABILITY_PROFILES === 'undefined') return;
    updateReleaseLabels();
    ensureCaseSection();
    injectPanelSummary();
    document.getElementById('countrySelect')?.addEventListener('change', () => setTimeout(syncWithCountrySelection, 0));
    window.addEventListener('popstate', () => setTimeout(syncWithCountrySelection, 0));

    const panel = document.getElementById('panel');
    if (panel) {
      new MutationObserver(() => injectPanelSummary()).observe(panel, { childList: true, subtree: false });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
