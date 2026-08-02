(() => {
  'use strict';

  let refreshTimer = null;

  function refreshApplication() {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      const yearSelect = document.getElementById('yearSelect');
      if (!yearSelect) return;
      yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }, 40);
  }

  window.addEventListener('chip:cooperationdatachange', refreshApplication);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.setTimeout(refreshApplication, 2400);
    }, { once: true });
  } else {
    window.setTimeout(refreshApplication, 2400);
  }
})();
