(() => {
  'use strict';

  if (typeof COOPERATION_DATA === 'undefined') return;

  const RELEASE = '4.3.5';
  const VERIFIED = '2026-08-17';

  const additions = [
    {
      id: 'ind-deu-semiconductor-ecosystem-2026',
      date: '2026-01-12',
      year: 2026,
      title: 'India–Germany Semiconductor Ecosystem Partnership',
      participants: ['India', 'Germany'],
      participantIds: ['ind', 'eun'],
      mapPairs: [['ind', 'eun']],
      type: 'ecosystem',
      scope: 'semiconductor-specific',
      stages: ['research', 'supply_chain', 'investment'],
      status: 'signed',
      implementation: 'India and Germany signed a Joint Declaration of Intent on a Semiconductor Ecosystem Partnership. The leaders described the mechanism as an institutional dialogue across the semiconductor value chain intended to deepen research and industrial collaboration between the two ecosystems.',
      funding: 'Not specified',
      detail: 'A semiconductor-specific bilateral framework. Germany is represented through the EU anchor on the map.',
      url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2213739&lang=1&reg=3',
      lastVerified: VERIFIED
    },
    {
      id: 'usa-twn-trade-investment-semiconductors-2026',
      date: '2026-01-15',
      year: 2026,
      title: 'U.S.–Taiwan Agreement on Trade and Investment semiconductor partnership',
      participants: ['United States', 'Taiwan'],
      participantIds: ['usa', 'twn'],
      mapPairs: [['usa', 'twn']],
      type: 'investment',
      scope: 'broader-framework',
      stages: ['fabrication', 'investment', 'supply_chain', 'trusted_network'],
      status: 'signed',
      implementation: 'The agreement establishes a strategic economic partnership centered on semiconductor supply chains. Taiwanese semiconductor and technology enterprises committed at least US$250 billion in new U.S. investment, while Taiwan committed at least US$250 billion in credit guarantees to support additional investment across the semiconductor ecosystem.',
      funding: 'At least US$250 billion in announced direct investment commitments plus at least US$250 billion in credit guarantees; these are commitments, not public spending already disbursed.',
      detail: 'A trade and investment agreement with a large semiconductor manufacturing, supply-chain, and industrial-cluster component.',
      url: 'https://www.commerce.gov/news/fact-sheets/2026/01/fact-sheet-restoring-american-semiconductor-manufacturing-leadership',
      lastVerified: VERIFIED
    },
    {
      id: 'gbr-nld-innovation-partnership-2025',
      date: '2025-11-11',
      year: 2025,
      title: 'UK–Netherlands Innovation Partnership semiconductor cooperation',
      participants: ['United Kingdom', 'Netherlands'],
      participantIds: ['gbr', 'nld'],
      mapPairs: [['gbr', 'nld']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'design', 'equipment', 'workforce'],
      status: 'signed',
      implementation: 'The Innovation Partnership identifies semiconductors, artificial intelligence, and quantum as initial cooperation areas and establishes work plans and a governance structure for continuing bilateral science, innovation, and technology cooperation.',
      funding: 'Not specified',
      detail: 'A bilateral innovation framework in which semiconductor cooperation is an explicit priority alongside AI and quantum technologies.',
      url: 'https://www.gov.uk/government/publications/uk-netherlands-innovation-partnership/uk-netherlands-innovation-partnership',
      lastVerified: VERIFIED
    },
    {
      id: 'jpn-ita-supply-chain-resilience-2026',
      date: '2026-06-15',
      year: 2026,
      title: 'Japan–Italy Memorandum of Cooperation on Supply Chain Resilience',
      participants: ['Japan', 'Italy'],
      participantIds: ['jpn', 'eun'],
      mapPairs: [['jpn', 'eun']],
      type: 'resilience',
      scope: 'broader-framework',
      stages: ['supply_chain', 'semiconductors', 'materials', 'trusted_network'],
      status: 'signed',
      implementation: 'Japan and Italy signed a memorandum to promote and deepen supply-chain resilience cooperation among like-minded partners in areas including semiconductors, critical minerals, and advanced technologies.',
      funding: 'Not specified',
      detail: 'A broader economic-security supply-chain agreement with semiconductors as an explicit cooperation field. Italy is represented through the EU anchor on the map.',
      url: 'https://www.meti.go.jp/english/press/2026/0616_003.html',
      lastVerified: VERIFIED
    },
    {
      id: 'aus-vnm-strategic-technologies-centre-2025',
      date: '2025-06-11',
      year: 2025,
      title: 'Australia–Vietnam Strategic Technologies Centre',
      participants: ['Australia', 'Vietnam'],
      participantIds: ['aus', 'vnm'],
      mapPairs: [['aus', 'vnm']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'workforce', 'semiconductors'],
      status: 'operational',
      implementation: 'The Australian and Vietnamese governments established the Strategic Technologies Centre through Vietnam’s Posts and Telecommunications Institute of Technology and the University of Technology Sydney. The centre was launched in Hanoi to support research, policy, and industry collaboration in semiconductors, AI, 5G/6G, and cybersecurity.',
      funding: 'Australia’s Department of Foreign Affairs and Trade provided AUD 2.1 million in initial funding to establish the centre.',
      detail: 'A government-backed operating research centre covering several strategic technologies, with semiconductors explicitly included.',
      url: 'https://vietnam.embassy.gov.au/hnoi/MR250611.html',
      lastVerified: VERIFIED
    },
    {
      id: 'eun-vnm-comprehensive-strategic-partnership-2026',
      date: '2026-01-29',
      year: 2026,
      title: 'EU–Vietnam Comprehensive Strategic Partnership semiconductor cooperation',
      participants: ['European Union', 'Vietnam'],
      participantIds: ['eun', 'vnm'],
      mapPairs: [['eun', 'vnm']],
      type: 'resilience',
      scope: 'broader-framework',
      stages: ['supply_chain', 'semiconductors', 'infrastructure', 'investment'],
      status: 'signed',
      implementation: 'The EU and Vietnam upgraded their relationship to a Comprehensive Strategic Partnership and explicitly identified semiconductors, resilient and diversified supply chains, secure digital connectivity, and semiconductor supply chains as areas for deeper cooperation.',
      funding: 'Not specified',
      detail: 'A broad strategic partnership with explicit semiconductor supply-chain and digital-connectivity cooperation.',
      url: 'https://www.eeas.europa.eu/euvn-csp-joint-statement_en?s=184',
      lastVerified: VERIFIED
    },
    {
      id: 'eun-semicon-coalition-2025',
      date: '2025-03-12',
      year: 2025,
      title: 'European Semicon Coalition',
      participants: ['European Union member states'],
      participantIds: ['nld', 'eun'],
      mapPairs: [['nld', 'eun']],
      type: 'ecosystem',
      scope: 'semiconductor-specific',
      stages: ['fabrication', 'research', 'workforce', 'investment', 'supply_chain'],
      status: 'operational',
      implementation: 'Nine EU governments launched the Semicon Coalition in March 2025 to coordinate semiconductor production capacity, research, commercialization, and workforce development. By September 2025, all 27 EU member states had signed the coalition declaration, which also prioritizes investment, sustainability, and international partnerships.',
      funding: 'No coalition-specific funding amount was announced. The launch statement noted EUR 43 billion available for the European semiconductor industry through the EU Chips Act.',
      detail: 'A semiconductor-specific member-state coordination mechanism. The Netherlands is shown as the initiating mapped hub and the EU node represents the wider coalition.',
      url: 'https://www.government.nl/latest/news/2025/09/29/all-eu-countries-join-semicon-coalition-to-secure-technological-leadership',
      lastVerified: VERIFIED
    },
    {
      id: 'can-gbr-science-innovation-mou-2024',
      date: '2024-01-31',
      year: 2024,
      title: 'Canada–UK Scientific Research and Innovation Memorandum of Understanding',
      participants: ['Canada', 'United Kingdom'],
      participantIds: ['can', 'gbr'],
      mapPairs: [['can', 'gbr']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'semiconductors', 'workforce'],
      status: 'operational',
      implementation: 'Canada and the United Kingdom renewed their science, technology, and innovation memorandum with semiconductors named as a priority technology area. The framework subsequently supported a bilateral semiconductor collaborative industrial R&D competition.',
      funding: 'No semiconductor-specific amount was specified in the 2024 memorandum.',
      detail: 'A ten-year bilateral science and innovation framework that explicitly includes semiconductors and later produced semiconductor-specific collaborative R&D activity.',
      url: 'https://www.canada.ca/en/innovation-science-economic-development/news/2024/01/dual-memorandums-of-understanding-cement-canadauk-science-and-innovation-ties.html',
      lastVerified: VERIFIED
    },
    {
      id: 'jpn-ind-digital-partnership-2-2025',
      date: '2025-08-25',
      year: 2025,
      title: 'Japan–India Digital Partnership 2.0',
      participants: ['Japan', 'India'],
      participantIds: ['jpn', 'ind'],
      mapPairs: [['jpn', 'ind']],
      type: 'ecosystem',
      scope: 'broader-framework',
      stages: ['research', 'investment', 'supply_chain', 'workforce', 'semiconductors'],
      status: 'signed',
      implementation: 'The updated Digital Partnership makes semiconductors a designated cooperation domain. It calls for deeper links between semiconductor R&D institutions, promotion of bilateral semiconductor investment, and stronger semiconductor supply-chain resilience.',
      funding: 'Not specified',
      detail: 'A broader digital partnership with a defined semiconductor ecosystem pillar alongside AI, digital public infrastructure, firms, startups, and talent.',
      url: 'https://www.meti.go.jp/english/press/2025/0829_004.html',
      lastVerified: VERIFIED
    },
    {
      id: 'gbr-kor-digital-partnership-2023',
      date: '2023-11-22',
      year: 2023,
      title: 'UK–Republic of Korea Digital Partnership semiconductor cooperation',
      participants: ['United Kingdom', 'South Korea'],
      participantIds: ['gbr', 'kor'],
      mapPairs: [['gbr', 'kor']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'design', 'materials', 'packaging', 'supply_chain'],
      status: 'operational',
      implementation: 'The Digital Partnership created a ministerial forum and a semiconductor cooperation pillar covering R&D in chip design, compound and advanced materials, and advanced packaging. By 2025 the forum was recurring and the two sides had held a Semiconductor Stakeholder Forum in Seoul.',
      funding: 'Not specified',
      detail: 'A digital-policy framework separate from the semiconductor-specific UK–Korea framework signed the same day, with its own DSIT–MSIT governance mechanism.',
      url: 'https://www.gov.uk/government/publications/uk-republic-of-korea-digital-partnership-2025/uk-republic-of-korea-digital-partnership-forum-joint-statement',
      lastVerified: VERIFIED
    },
    {
      id: 'ind-usa-ai-opportunity-partnership-2026',
      date: '2026-02-20',
      year: 2026,
      title: 'India–U.S. AI Opportunity Partnership',
      participants: ['India', 'United States'],
      participantIds: ['ind', 'usa'],
      mapPairs: [['ind', 'usa']],
      type: 'trusted_network',
      scope: 'broader-framework',
      stages: ['compute', 'semiconductors', 'infrastructure', 'research', 'trusted_network'],
      status: 'signed',
      implementation: 'India and the United States signed the AI Opportunity Partnership as a bilateral addendum to the Pax Silica Declaration. The partnership focuses on the physical AI stack, joint R&D, next-generation data-center investment, access to compute and advanced processors, and trusted technology supply chains.',
      funding: 'Not specified',
      detail: 'A bilateral AI and trusted-technology framework linked directly to Pax Silica, whose supply-chain scope includes silicon, semiconductors, advanced computing, and critical inputs.',
      url: 'https://www.fsi.mea.gov.in/whats-new.htm',
      lastVerified: VERIFIED
    },
    {
      id: 'ind-isr-critical-emerging-technologies-2026',
      date: '2026-02-26',
      year: 2026,
      title: 'India–Israel Critical and Emerging Technologies initiative',
      participants: ['India', 'Israel'],
      participantIds: ['ind', 'isr'],
      mapPairs: [['ind', 'isr']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['semiconductors', 'research', 'design', 'trusted_network'],
      status: 'implementation',
      implementation: 'India and Israel elevated their strategic partnership and launched a National Security Adviser-led initiative on Critical and Emerging Technologies. Their joint statement explicitly commits the two countries to integrate complementary capabilities in semiconductors alongside AI, cybersecurity, quantum, biotechnology, defence technology, and space.',
      funding: 'Not specified',
      detail: 'A broad critical-technology initiative with semiconductors explicitly identified as a field for deeper bilateral integration and institutional cooperation.',
      url: 'https://www.pmindia.gov.in/en/news_updates/india-israel-joint-statement/?comment=disable',
      lastVerified: VERIFIED
    }
  ];

  const updates = {
    'pax-silica-2025': {
      participants: ['Australia', 'Israel', 'Japan', 'South Korea', 'Singapore', 'United Kingdom', 'United States', 'European Union', 'United Arab Emirates', 'India', 'Netherlands'],
      participantIds: ['aus', 'isr', 'jpn', 'kor', 'sgp', 'gbr', 'usa', 'eun', 'are', 'ind', 'nld'],
      mapPairs: [['usa', 'aus'], ['usa', 'isr'], ['usa', 'jpn'], ['usa', 'kor'], ['usa', 'sgp'], ['usa', 'gbr'], ['usa', 'eun'], ['usa', 'are'], ['usa', 'ind'], ['usa', 'nld']],
      implementation: 'The declaration established trusted-technology cooperation across semiconductors, compute, advanced manufacturing, critical inputs, infrastructure, and investment security. Membership expanded during 2026, including the United Arab Emirates in January, India in February, the European Union in June, and the Netherlands by July.',
      url: 'https://www.government.nl/latest/news/2026/06/24/the-netherlands-joins-pax-silica-alliance-and-boosts-cooperation-on-ai-and-chips',
      lastVerified: VERIFIED
    },
    'gbr-jpn-2023': {
      status: 'operational',
      implementation: 'The 2023 semiconductor partnership produced policy exchanges, research activity, skills cooperation, and industry engagement. In June 2026 the wider UK–Japan Frontier Technology Partnership committed the countries to interlock their AI-semiconductor strengths, while the UK Semiconductor Centre and Rapidus launched a formal pathway connecting UK semiconductor firms with advanced Japanese manufacturing.',
      url: 'https://www.gov.uk/government/news/tens-of-thousands-of-new-jobs-and-more-than-18-billion-boost-to-british-economy-as-prime-minister-meets-japanese-leader',
      lastVerified: VERIFIED
    }
  };

  function applyUpdates() {
    Object.entries(updates).forEach(([id, patch]) => {
      const record = COOPERATION_DATA.find((item) => item.id === id);
      if (record) Object.assign(record, patch);
    });
  }

  function addRecords() {
    const existingIds = new Set(COOPERATION_DATA.map((record) => record.id));
    additions.forEach((record) => {
      if (!existingIds.has(record.id)) {
        COOPERATION_DATA.push(record);
        existingIds.add(record.id);
      }
    });
  }

  function resetCitationButton() {
    const button = document.getElementById('copyCitation');
    if (!button || button.dataset.release435 === 'true') return button;
    const clone = button.cloneNode(true);
    button.replaceWith(clone);
    return clone;
  }

  function copyText(text, button) {
    const original = button.textContent;
    const finish = () => {
      button.textContent = 'Citation copied';
      window.setTimeout(() => { button.textContent = original; }, 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(() => fallbackCopy(text, finish));
    } else fallbackCopy(text, finish);
  }

  function fallbackCopy(text, finish) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    finish();
  }

  function bindShareControls() {
    const button = resetCitationButton();
    if (!button || button.dataset.release435 === 'true') return;
    button.dataset.release435 = 'true';
    button.addEventListener('click', () => copyText(
      `Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release ${RELEASE}. https://aergrm.github.io/chip-network/`,
      button
    ));
  }

  function enforceRelease() {
    const kicker = document.querySelector('.kicker');
    if (kicker) kicker.textContent = kicker.textContent.replace(/Release 4\.3(?:\.\d+)*/g, `Release ${RELEASE}`);
    const citation = document.querySelector('.citation-text');
    if (citation) citation.textContent = `Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release ${RELEASE}.`;
    const strip = document.getElementById('coverageStrip');
    if (strip) strip.innerHTML = `<strong>${COOPERATION_DATA.length}</strong> documented cooperation records <span>·</span> 2021–July 2026 <span>·</span> official sources only`;
    bindShareControls();
  }

  function refreshApplication() {
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
  }

  applyUpdates();
  addRecords();
  COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {
    detail: { records: COOPERATION_DATA.length, release: RELEASE }
  }));

  bindShareControls();
  enforceRelease();
  refreshApplication();

  ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', () => window.setTimeout(enforceRelease, 130));
  });
  window.addEventListener('chip:cooperationdatachange', () => window.setTimeout(enforceRelease, 130));
  window.addEventListener('popstate', () => window.setTimeout(enforceRelease, 130));

  [90, 260, 700, 1500, 3000, 5200].forEach((delay) => window.setTimeout(enforceRelease, delay));
})();
