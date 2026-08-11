(() => {
  'use strict';

  if (typeof COOPERATION_DATA === 'undefined') return;

  const RELEASE = '4.3.4';
  const VERIFIED = '2026-08-11';

  const additions = [
    {
      id: 'quad-semiconductor-contingency-2024',
      date: '2024-09-21',
      year: 2024,
      title: 'Quad Semiconductor Supply Chains Contingency Network',
      participants: ['Australia', 'India', 'Japan', 'United States'],
      participantIds: ['aus', 'ind', 'jpn', 'usa'],
      mapPairs: [['aus', 'ind'], ['aus', 'jpn'], ['aus', 'usa'], ['ind', 'jpn'], ['ind', 'usa'], ['jpn', 'usa']],
      type: 'resilience',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'trusted_network'],
      status: 'signed',
      implementation: 'Quad leaders welcomed a Memorandum of Cooperation establishing a Semiconductor Supply Chains Contingency Network to improve preparedness and continuity when semiconductor supply chains are disrupted.',
      funding: 'Not specified',
      detail: 'A four-country contingency framework focused on semiconductor supply-chain preparedness and resilience.',
      url: 'https://www.pm.gov.au/media/joint-statement-leaders-australia-india-japan-and-united-states',
      lastVerified: VERIFIED
    },
    {
      id: 'g7-semiconductor-poc-2024',
      date: '2024-03-15',
      year: 2024,
      title: 'G7 Semiconductors Point of Contact Group',
      participants: ['Canada', 'France', 'Germany', 'Italy', 'Japan', 'United Kingdom', 'United States', 'European Union'],
      participantIds: ['can', 'eun', 'jpn', 'gbr', 'usa'],
      mapPairs: [['usa', 'can'], ['usa', 'eun'], ['usa', 'jpn'], ['usa', 'gbr']],
      type: 'resilience',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'research', 'trusted_network', 'investment'],
      status: 'operational',
      implementation: 'The G7 established a semiconductor point-of-contact group for information exchange, research priorities, sustainable manufacturing, non-market practices, and crisis coordination. Subsequent ministerial declarations continued the group and expanded work on trustworthy supply chains, investment frameworks, and cross-border research coordination.',
      funding: 'Not specified',
      detail: 'A continuing G7 semiconductor coordination mechanism. France, Germany, and Italy are represented through the EU anchor on the map.',
      url: 'https://www.gov.uk/government/publications/g7-ministerial-declaration-deployment-of-ai-and-innovation/g7-ministerial-declaration',
      lastVerified: VERIFIED
    },
    {
      id: 'can-deu-semiconductor-jdoi-2026',
      date: '2026-06-29',
      year: 2026,
      title: 'Canada–Germany Joint Declaration of Intent on Semiconductor Cooperation',
      participants: ['Canada', 'Germany'],
      participantIds: ['can', 'eun'],
      mapPairs: [['can', 'eun']],
      type: 'resilience',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'research', 'investment', 'workforce'],
      status: 'signed',
      implementation: 'The declaration establishes policy dialogue and deeper cooperation on semiconductor investment, industrial development, technology, research, supply-chain resilience, and opportunities for start-ups, scale-ups, and smaller firms.',
      funding: 'Not specified',
      detail: 'A bilateral semiconductor framework. Germany is represented through the EU anchor on the map.',
      url: 'https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/canada-and-germany-strengthen-industrial-partnership-to-build-resilient-semiconductor-supply-chains.html',
      lastVerified: VERIFIED
    },
    {
      id: 'aciti-aus-can-ind-2026',
      date: '2026-07-10',
      year: 2026,
      title: 'Australia–Canada–India Technology and Innovation Partnership',
      participants: ['Australia', 'Canada', 'India'],
      participantIds: ['aus', 'can', 'ind'],
      mapPairs: [['aus', 'can'], ['aus', 'ind'], ['can', 'ind']],
      type: 'trusted_network',
      scope: 'broader-framework',
      stages: ['semiconductors', 'research', 'workforce', 'infrastructure', 'trusted_network'],
      status: 'implementation',
      implementation: 'The memorandum establishes a joint working group to implement cooperation in AI and emerging technologies. Semiconductors are explicitly included alongside data centers, cloud infrastructure, high-performance computing, cybersecurity, and other digital technologies.',
      funding: 'Not specified',
      detail: 'A trilateral technology partnership with semiconductors as an explicit cooperation field and a joint working group responsible for implementation.',
      url: 'https://www.industry.gov.au/publications/overview-memorandum-understanding-support-australia-canada-india-technology-and-innovation-aciti-partnership',
      lastVerified: VERIFIED
    },
    {
      id: 'can-twn-nserc-nstc-2026',
      date: '2026-01-29',
      year: 2026,
      title: 'Canada–Taiwan joint semiconductor and AI research program',
      participants: ['Canada', 'Taiwan'],
      participantIds: ['can', 'twn'],
      mapPairs: [['can', 'twn']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['research', 'design', 'packaging', 'materials'],
      status: 'implementation',
      implementation: 'NSERC and Taiwan’s NSTC launched a joint research program covering AI-enabled semiconductor design, manufacturing and packaging, compound semiconductors for AI, and MEMS sensors. The full-proposal stage closed on July 30, 2026, with joint funding decisions pending.',
      funding: 'NSERC and NSTC each committed up to C$1 million, with up to C$225,000 per three-year project and approximately four awards planned.',
      detail: 'A jointly funded agency-level research program connecting Canadian AI strengths with Taiwan’s semiconductor expertise.',
      url: 'https://nserc-crsng.canada.ca/en/funding-opportunity/nserc-national-science-and-technology-council-taiwan-nstc-call-proposals-on',
      lastVerified: VERIFIED
    },
    {
      id: 'gbr-twn-semiconductor-skills-2025',
      date: '2025-09-11',
      year: 2025,
      title: 'UK–Taiwan Semiconductor Joint Skills Project',
      participants: ['United Kingdom', 'Taiwan'],
      participantIds: ['gbr', 'twn'],
      mapPairs: [['gbr', 'twn']],
      type: 'ecosystem',
      scope: 'semiconductor-specific',
      stages: ['workforce', 'research', 'packaging', 'design'],
      status: 'operational',
      implementation: 'The two sides signed a government-supported memorandum to establish semiconductor talent cooperation. The first program was completed in March 2026, bringing UK semiconductor students and researchers into Taiwan’s university and industry ecosystem.',
      funding: 'Program support included funding from the UK Department for Science, Innovation and Technology; a total public amount was not specified in the cited source.',
      detail: 'A bilateral semiconductor skills mechanism that moved from memorandum to an implemented exchange program within six months.',
      url: 'https://www.gov.uk/government/news/612186.zh-tw',
      lastVerified: VERIFIED
    },
    {
      id: 'jpn-sgp-strategic-semiconductor-2026',
      date: '2026-03-18',
      year: 2026,
      title: 'Japan–Singapore Strategic Partnership semiconductor cooperation',
      participants: ['Japan', 'Singapore'],
      participantIds: ['jpn', 'sgp'],
      mapPairs: [['jpn', 'sgp']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['semiconductors', 'research', 'supply_chain'],
      status: 'implementation',
      implementation: 'The Strategic Partnership directs officials to deepen semiconductor cooperation, particularly joint research and development on next-generation semiconductor technologies, and places this work within wider economic-security and supply-chain cooperation.',
      funding: 'Not specified',
      detail: 'A broad strategic partnership with an explicit next-generation semiconductor R&D component and formal implementation oversight.',
      url: 'https://www.pmo.gov.sg/newsroom/joint-statement-on-the-establishment-of-a-strategic-partnership-between-japan-and-singapore/',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-jpn-riken-semiconductor-2026',
      date: '2026-01-15',
      year: 2026,
      title: 'Taiwan–Japan NSTC–RIKEN semiconductor research program',
      participants: ['Taiwan', 'Japan'],
      participantIds: ['twn', 'jpn'],
      mapPairs: [['twn', 'jpn']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['research', 'materials', 'design'],
      status: 'operational',
      implementation: 'Taiwan’s NSTC and Japan’s RIKEN approved bilateral research projects for 2026–2028 under their standing cooperation arrangement. Next-generation compound semiconductors are one of the designated joint research fields, and funded projects began on April 1, 2026.',
      funding: 'Public award notice confirms funded projects but does not state the aggregate semiconductor allocation.',
      detail: 'An operating bilateral research program under the NSTC–RIKEN framework with next-generation compound semiconductors as a designated field.',
      url: 'https://www.nstc.gov.tw/sci/en/detail/5a9a6fda-1c42-4d7e-a7df-afc62009ad00',
      lastVerified: VERIFIED
    }
  ];

  const updates = {
    'eun-jpn-semiconductor-moc-2023': {
      status: 'operational',
      implementation: 'The memorandum created cooperation on semiconductor R&D, supply-chain early warning, and skills. At the May 2026 Digital Partnership Council, the EU and Japan confirmed implementation of the semiconductor memorandum and continued use of the Early Warning Mechanism to anticipate and mitigate geopolitical or natural supply disruptions.',
      url: 'https://www.meti.go.jp/english/press/2026/0507_001.html',
      lastVerified: VERIFIED
    },
    'eun-ind-2023': {
      status: 'implementation',
      implementation: 'The EU–India Trade and Technology Council continued work under the semiconductor memorandum. At its July 2026 meeting, both sides agreed to step up cooperation on semiconductors alongside high-performance computing, quantum technologies, AI, and 6G.',
      url: 'https://digital-strategy.ec.europa.eu/en/news/eu-and-india-strengthen-strategic-partnership-third-trade-and-technology-council',
      lastVerified: VERIFIED
    },
    'eun-kor-2022': {
      status: 'operational',
      implementation: 'The digital partnership produced four jointly funded semiconductor projects on heterogeneous integration and neuromorphic computing, with continuing cooperation through the EU–Republic of Korea Digital Partnership.',
      funding: 'Approximately EUR 12 million total public investment, split equally between the EU and the National Research Foundation of Korea.',
      url: 'https://digital-strategy.ec.europa.eu/en/news/eu-republic-korea-digital-partnership-joint-eurepublic-korea-chips-projects-announced',
      lastVerified: VERIFIED
    },
    'pax-silica-2025': {
      participants: ['Australia', 'Israel', 'Japan', 'South Korea', 'Singapore', 'United Kingdom', 'United States', 'European Union'],
      participantIds: ['aus', 'isr', 'jpn', 'kor', 'sgp', 'gbr', 'usa', 'eun'],
      mapPairs: [['usa', 'aus'], ['usa', 'isr'], ['usa', 'jpn'], ['usa', 'kor'], ['usa', 'sgp'], ['usa', 'gbr'], ['usa', 'eun']],
      implementation: 'The declaration established trusted-technology cooperation across semiconductors, compute, advanced manufacturing, critical inputs, infrastructure, and investment security. The European Commission signed the declaration on behalf of the EU on June 25, 2026, expanding the original group of signatories.',
      url: 'https://digital-strategy.ec.europa.eu/en/news/commission-signs-pax-silica-declaration',
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
    const button = document.getElementById('copyCitation');
    if (button && button.dataset.release434 !== 'true') {
      button.dataset.release434 = 'true';
      button.addEventListener('click', () => copyText(
        `Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release ${RELEASE}. https://aergrm.github.io/chip-network/`,
        button
      ));
    }
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
    document.getElementById(id)?.addEventListener('change', () => window.setTimeout(enforceRelease, 90));
  });
  window.addEventListener('chip:cooperationdatachange', () => window.setTimeout(enforceRelease, 90));
  window.addEventListener('popstate', () => window.setTimeout(enforceRelease, 90));

  [60, 180, 520, 1200, 2600].forEach((delay) => window.setTimeout(enforceRelease, delay));
})();
