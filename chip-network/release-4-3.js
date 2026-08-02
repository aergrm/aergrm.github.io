(() => {
  'use strict';

  const STATUS_BUCKETS = [
    { id: 'signed', label: 'Announced or signed', statuses: ['announced', 'signed'] },
    { id: 'funded', label: 'Funded or open call', statuses: ['funded', 'open_call'] },
    { id: 'implementation', label: 'Under implementation', statuses: ['implementation'] },
    { id: 'operational', label: 'Operational', statuses: ['operational'] }
  ];

  const COOPERATION_FILTER_OPTIONS = {
    coopStatus: [
      { value: 'announced', label: 'Announced' }
    ],
    coopStage: [
      { value: 'advanced_manufacturing', label: 'Advanced manufacturing' },
      { value: 'infrastructure', label: 'Infrastructure' },
      { value: 'semiconductors', label: 'Semiconductors' },
      { value: 'trusted_network', label: 'Trusted network' }
    ]
  };

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[character]));
  }

  function ensureCooperationFilterOptions() {
    Object.entries(COOPERATION_FILTER_OPTIONS).forEach(([selectId, options]) => {
      const select = document.getElementById(selectId);
      if (!select) return;
      options.forEach(({ value, label }) => {
        if ([...select.options].some((option) => option.value === value)) return;
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
      });
    });

    const params = new URLSearchParams(window.location.search);
    const requestedStatus = params.get('status');
    const requestedStage = params.get('stage');
    const statusSelect = document.getElementById('coopStatus');
    const stageSelect = document.getElementById('coopStage');

    if (statusSelect && requestedStatus && [...statusSelect.options].some((option) => option.value === requestedStatus)) {
      statusSelect.value = requestedStatus;
    }
    if (stageSelect && requestedStage && [...stageSelect.options].some((option) => option.value === requestedStage)) {
      stageSelect.value = requestedStage;
    }
  }

  function loadCooperationDataExtensions() {
    if (document.querySelector('script[data-chip-cooperation-extensions]')) return;

    window.addEventListener('chip:cooperationdatachange', () => {
      const yearSelect = document.getElementById('yearSelect');
      if (yearSelect) yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
      renderImplementationChart();
    }, { once: true });

    const script = document.createElement('script');
    script.src = 'cooperation-data-extensions.js?v=4.3.1';
    script.dataset.chipCooperationExtensions = 'true';
    script.async = false;
    document.body.appendChild(script);
  }

  function recordTouchesCountry(record, countryId) {
    return record.participantIds?.includes(countryId)
      || record.mapPairs?.some(([a, b]) => a === countryId || b === countryId);
  }

  function activeRecords() {
    if (typeof COOPERATION_DATA === 'undefined') return [];
    const countryId = document.getElementById('countrySelect')?.value || '';
    const year = Number(document.getElementById('yearSelect')?.value || 2026);
    const type = document.getElementById('coopType')?.value || 'all';
    const scope = document.getElementById('coopScope')?.value || 'all';
    const status = document.getElementById('coopStatus')?.value || 'all';
    const stage = document.getElementById('coopStage')?.value || 'all';

    return COOPERATION_DATA.filter((record) => {
      if (record.year > year) return false;
      if (countryId && !recordTouchesCountry(record, countryId)) return false;
      if (type !== 'all' && record.type !== type) return false;
      if (scope !== 'all' && record.scope !== scope) return false;
      if (status !== 'all' && record.status !== status) return false;
      if (stage !== 'all' && !record.stages.includes(stage)) return false;
      return true;
    });
  }

  function selectedCountryName() {
    const select = document.getElementById('countrySelect');
    if (!select?.value) return 'all displayed countries';
    return select.options[select.selectedIndex]?.text || 'the selected country';
  }

  function renderImplementationChart() {
    const chart = document.getElementById('implementationChart');
    const summary = document.getElementById('implementationSummary');
    const title = document.getElementById('implementationContext');
    if (!chart || !summary) return;

    const records = activeRecords();
    const counts = STATUS_BUCKETS.map((bucket) => ({
      ...bucket,
      count: records.filter((record) => bucket.statuses.includes(record.status)).length
    }));
    const maximum = Math.max(1, ...counts.map((bucket) => bucket.count));
    const beyondSignature = counts
      .filter((bucket) => ['funded', 'implementation', 'operational'].includes(bucket.id))
      .reduce((sum, bucket) => sum + bucket.count, 0);
    const operational = counts.find((bucket) => bucket.id === 'operational')?.count || 0;

    if (title) title.textContent = `${selectedCountryName()} · ${records.length} observed record${records.length === 1 ? '' : 's'}`;
    chart.innerHTML = counts.map((bucket) => {
      const width = (bucket.count / maximum) * 100;
      const share = records.length ? Math.round((bucket.count / records.length) * 100) : 0;
      return `<div class="implementation-row">
        <div class="implementation-label"><span>${escapeHtml(bucket.label)}</span><strong>${bucket.count}</strong></div>
        <div class="implementation-track" role="img" aria-label="${escapeHtml(bucket.label)}: ${bucket.count} records, ${share} percent of displayed records"><span class="${bucket.id}" style="width:${width}%"></span></div>
        <div class="implementation-share">${share}%</div>
      </div>`;
    }).join('');

    if (!records.length) {
      summary.textContent = 'No cooperation record matches the active country, year, and filters.';
      return;
    }
    summary.innerHTML = `<strong>${beyondSignature} of ${records.length}</strong> displayed records show funding, an open call, implementation, or recurring operation. <strong>${operational}</strong> are coded as operational. The categories describe documented evidence, not effectiveness or production output.`;
  }

  function syncImplementationVisibility() {
    const section = document.getElementById('implementationSection');
    const cooperationControls = document.getElementById('cooperationControls');
    if (section && cooperationControls) section.hidden = cooperationControls.hidden;
  }

  async function copyText(text, button, successLabel) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = successLabel;
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      button.textContent = successLabel;
    }
    window.setTimeout(() => { button.textContent = original; }, 1800);
  }

  function bindCopyTools() {
    ['copyView', 'copyViewBottom'].forEach((id) => {
      const button = document.getElementById(id);
      if (button) button.addEventListener('click', () => copyText(window.location.href, button, 'View copied'));
    });
    const citation = 'Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release 4.3. https://aergrm.github.io/chip-network/';
    const copyCitation = document.getElementById('copyCitation');
    if (copyCitation) copyCitation.addEventListener('click', () => copyText(citation, copyCitation, 'Citation copied'));
  }

  function bindSuggestedComparisons() {
    document.querySelectorAll('[data-comparison]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const [country, compare] = link.dataset.comparison.split(':');
        const params = new URLSearchParams(window.location.search);
        params.set('country', country);
        params.set('compare', compare);
        params.set('case', country);
        params.delete('layer');
        window.location.href = `${window.location.pathname}?${params.toString()}#comparisonSection`;
      });
    });
  }

  function bindImplementationUpdates() {
    ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
      document.getElementById(id)?.addEventListener('change', () => window.setTimeout(renderImplementationChart, 0));
    });
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => window.setTimeout(() => {
        syncImplementationVisibility();
        renderImplementationChart();
      }, 0));
    });
    const panel = document.getElementById('panel');
    if (panel) new MutationObserver(() => renderImplementationChart()).observe(panel, { childList: true });
    document.addEventListener('chip:casechange', () => renderImplementationChart());
    window.addEventListener('popstate', () => window.setTimeout(() => {
      ensureCooperationFilterOptions();
      syncImplementationVisibility();
      renderImplementationChart();
    }, 0));
  }

  function init() {
    ensureCooperationFilterOptions();
    loadCooperationDataExtensions();
    syncImplementationVisibility();
    renderImplementationChart();
    bindImplementationUpdates();
    bindCopyTools();
    bindSuggestedComparisons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();