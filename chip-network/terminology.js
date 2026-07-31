(() => {
  'use strict';

  const replacements = new Map([
    ['Focal middle power', 'Selected middle power'],
    ['Focal middle powers', 'Selected middle powers'],
    ['focal middle power', 'selected middle power'],
    ['focal middle powers', 'selected middle powers']
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

  replaceText();
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) replaceText(node.parentNode || document.body);
        else if (node.nodeType === Node.ELEMENT_NODE) replaceText(node);
      });
    });
  }).observe(document.body, { childList: true, subtree: true });
})();
