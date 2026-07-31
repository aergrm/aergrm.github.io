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

  function hideUnpublishedMaterials(root = document) {
    const dataSection = root.querySelector?.('#cooperationDataSection');
    if (dataSection) dataSection.remove();

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
    hideUnpublishedMaterials();
  }).observe(document.body, { childList: true, subtree: true });
})();
