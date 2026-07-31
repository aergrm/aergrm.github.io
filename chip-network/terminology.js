(() => {
  'use strict';

  const replacements = new Map([
    ['Focal middle power', 'Selected middle power'],
    ['Focal middle powers', 'Selected middle powers'],
    ['focal middle power', 'selected middle power'],
    ['focal middle powers', 'selected middle powers']
  ]);

  const privateLocalFiles = new Set([
    'DESCRIPTIVE_MEMO.md',
    'semiconductor-cooperation.csv',
    'trade-country-indicators.csv',
    'trade-bilateral-links.csv',
    'DATA_DICTIONARY.md',
    'cooperation-source-audit.csv',
    'RELEASE_4_1.md',
    'CITATION.cff',
    'README_RELEASE_4_1.md',
    'release-manifest.json',
    'build_trade_data.py',
    'build_cooperation_data.py',
    'validate_data.py'
  ]);

  function replaceText(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      let value = node.nodeValue;
      replacements.forEach((replacement, phrase) => {
        value = value.split(phrase).join(replacement);
      });
      if (value !== node.nodeValue) node.nodeValue = value;
    });
  }

  function prepareRecordTable(root = document) {
    const section = root.querySelector?.('#cooperationDataSection');
    if (!section || section.dataset.prepared === 'true') return;

    const input = section.querySelector('#cooperationSearch');
    const count = section.querySelector('#cooperationCount');
    const table = section.querySelector('table');
    const tbody = section.querySelector('#cooperationTableBody');
    if (!input || !count || !table || !tbody) return;

    section.dataset.prepared = 'true';
    section.className = 'data-section';
    section.removeAttribute('aria-hidden');

    const head = document.createElement('div');
    head.className = 'section-head';
    head.innerHTML = `
      <div>
        <div class="scope-label">Underlying records</div>
        <h2 id="cooperationTableTitle">Semiconductor cooperation records</h2>
        <p>Search the records represented on the map. “Broader framework” means that semiconductors are one explicit component of a wider technology or supply-chain agreement.</p>
      </div>`;

    const toolbar = document.createElement('div');
    toolbar.className = 'table-toolbar';
    const label = document.createElement('label');
    label.setAttribute('for', 'cooperationSearch');
    label.textContent = 'Search records';
    input.removeAttribute('tabindex');
    input.placeholder = 'Country, agreement, type, stage, or status';
    toolbar.append(label, input, count);

    table.className = 'data-table';
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Date</th>
        <th>Participants</th>
        <th>Agreement</th>
        <th>Type</th>
        <th>Scope</th>
        <th>Stage</th>
        <th>Status</th>
        <th>Source</th>
      </tr>`;
    table.insertBefore(thead, tbody);

    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.replaceWith(wrap);
    wrap.appendChild(table);

    section.prepend(toolbar);
    section.prepend(head);
  }

  function hideUnpublishedMaterials(root = document) {
    root.querySelectorAll?.('a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      const fileName = href.split('/').pop()?.split('?')[0] || '';
      if (privateLocalFiles.has(fileName) || /(^|\.)github\.com$/i.test(link.hostname)) {
        link.remove();
      }
    });

    root.querySelectorAll?.('.download-button').forEach((button) => button.remove());
  }

  function apply(root = document.body) {
    replaceText(root);
    prepareRecordTable(root.ownerDocument || document);
    hideUnpublishedMaterials(root.ownerDocument || document);
  }

  apply();
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) replaceText(node.parentNode || document.body);
        else if (node.nodeType === Node.ELEMENT_NODE) replaceText(node);
      });
    });
    prepareRecordTable();
    hideUnpublishedMaterials();
  }).observe(document.body, { childList: true, subtree: true });
})();
