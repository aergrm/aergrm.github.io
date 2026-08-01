(() => {
  'use strict';

  const CASE_IDS = new Set(['ind', 'mys', 'can']);

  function cleanSourceDates(root = document) {
    root.querySelectorAll?.('.entity-source span').forEach((label) => {
      if (!/^Source dated\s+/i.test(label.textContent)) return;
      const match = label.textContent.match(/verified\s+(.+)$/i);
      if (match) label.textContent = `Verified ${match[1]}`;
    });
  }

  function syncCaseTab() {
    const selected = document.getElementById('countrySelect')?.value;
    if (!CASE_IDS.has(selected)) return;
    const tab = document.querySelector(`.case-tab[data-case-id="${selected}"]`);
    if (tab && !tab.classList.contains('active')) tab.click();
  }

  function apply() {
    cleanSourceDates();
    syncCaseTab();
  }

  function init() {
    apply();
    document.getElementById('countrySelect')?.addEventListener('change', () => setTimeout(apply, 0));
    window.addEventListener('popstate', () => setTimeout(apply, 0));

    const panel = document.getElementById('panel');
    if (panel) new MutationObserver(() => setTimeout(apply, 0)).observe(panel, { childList: true });

    const profiles = document.getElementById('caseProfileContent');
    if (profiles) new MutationObserver(() => cleanSourceDates(profiles)).observe(profiles, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
