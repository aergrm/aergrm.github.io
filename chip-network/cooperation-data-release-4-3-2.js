(() => {
  'use strict';

  const RELEASE = '4.3.2';
  const additions = [
    {
      id: 'usa-sgp-pgi-2021',
      date: '2021-10-07',
      year: 2021,
      title: 'U.S.–Singapore Partnership for Growth and Innovation',
      participants: ['United States', 'Singapore'],
      participantIds: ['usa', 'sgp'],
      mapPairs: [['usa', 'sgp']],
      type: 'resilience',
      scope: 'broader-framework',
      stages: ['supply_chain', 'advanced_manufacturing', 'semiconductors', 'investment'],
      status: 'operational',
      implementation: 'The partnership established an advanced-manufacturing and supply-chain-resilience pillar, identified semiconductor resilience as a concrete bilateral priority, and proceeded through recurring annual dialogues and work programs.',
      funding: 'Not specified',
      detail: 'A bilateral economic platform with explicit cooperation on semiconductor supply-chain resilience, advanced manufacturing, standards, and investment.',
      url: 'https://www.commerce.gov/news/press-releases/2022/10/joint-statement-us-department-commerce-and-singapore-ministry-trade-and',
      lastVerified: '2026-08-02'
    },
    {
      id: 'jpn-can-industrial-science-2023',
      date: '2023-09-21',
      year: 2023,
      title: 'Japan–Canada Memorandum of Cooperation on Industrial Science and Technology',
      participants: ['Japan', 'Canada'],
      participantIds: ['jpn', 'can'],
      mapPairs: [['jpn', 'can']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'semiconductors', 'advanced_manufacturing', 'workforce'],
      status: 'operational',
      implementation: 'The two governments held the first Industrial Research and Development Policy Dialogue in February 2026 under the memorandum and continued policy exchanges in its priority technology fields.',
      funding: 'Not specified',
      detail: 'An industrial science and technology framework that explicitly includes semiconductors among six priority areas for bilateral collaboration.',
      url: 'https://www.meti.go.jp/english/press/2026/0227_001.html',
      lastVerified: '2026-08-02'
    },
    {
      id: 'vnm-jpn-semiconductor-research-2025',
      date: '2025-04-28',
      year: 2025,
      title: 'Vietnam–Japan semiconductor research cooperation',
      participants: ['Vietnam', 'Japan'],
      participantIds: ['vnm', 'jpn'],
      mapPairs: [['vnm', 'jpn']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['research', 'design', 'materials', 'fabrication', 'workforce'],
      status: 'operational',
      implementation: 'Five joint semiconductor research projects were launched in 2026, covering three-dimensional integrated circuits, advanced transistor materials, sensors, secure RISC-V systems-on-chip, and wide-bandgap power electronics. The partners also targeted additional co-funded projects.',
      funding: 'Implemented under Japan’s NEXUS program for ASEAN, reported with an estimated program budget of USD 100 million for 2024–2029; the full amount is not dedicated solely to these projects.',
      detail: 'Government-backed cooperation connecting Vietnamese and Japanese research institutions in semiconductor materials, design, devices, and manufacturing technologies.',
      url: 'https://english.mst.gov.vn/ministry-of-science-and-technology-of-viet-nam-launches-five-viet-nam-japan-semiconductor-research-projects-197260503002539217.htm',
      lastVerified: '2026-08-02'
    },
    {
      id: 'usa-are-ai-acceleration-2025',
      date: '2025-05-16',
      year: 2025,
      title: 'U.S.–UAE AI Acceleration Partnership',
      participants: ['United States', 'United Arab Emirates'],
      participantIds: ['usa', 'are'],
      mapPairs: [['usa', 'are']],
      type: 'trusted_network',
      scope: 'broader-framework',
      stages: ['compute', 'semiconductors', 'infrastructure', 'investment', 'trusted_network'],
      status: 'implementation',
      implementation: 'The framework established a joint implementation and monitoring group and a pathway for protected advanced-technology cooperation, including a one-gigawatt data center within a planned five-gigawatt AI technology cluster.',
      funding: 'No public funding figure specified; the framework describes a planned 5 GW UAE–U.S. AI technology cluster and associated cross-border investment.',
      detail: 'A trusted-technology framework linking access to advanced AI semiconductors and infrastructure with security commitments, monitoring, and Emirati investment.',
      url: 'https://www.mofa.gov.ae/en/MediaHub/News/2025/5/16/16-5-2025-UAE-US',
      lastVerified: '2026-08-02'
    },
    {
      id: 'mys-nld-semiconductor-moc-2025',
      date: '2025-09-06',
      year: 2025,
      title: 'Malaysia–Netherlands Memorandum of Cooperation on Semiconductor Industry',
      participants: ['Malaysia', 'Netherlands'],
      participantIds: ['mys', 'nld'],
      mapPairs: [['mys', 'nld']],
      type: 'resilience',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'packaging', 'equipment', 'research', 'workforce'],
      status: 'signed',
      implementation: 'The memorandum created an Annual Bilateral Semiconductor Dialogue to review initiatives and coordinate policy exchange, talent development, research and development, and technology sharing.',
      funding: 'Not specified',
      detail: 'A semiconductor-specific framework combining Malaysia’s packaging and testing base with Dutch equipment, manufacturing, and innovation capabilities.',
      url: 'https://www.investmalaysia.gov.my/resources/latest-announcements/malaysia-netherlands-memorandum-of-cooperation-to-strengthen-semiconductor-supply-chain-resiliency/',
      lastVerified: '2026-08-02'
    },
    {
      id: 'kor-are-ai-semiconductors-2025',
      date: '2025-11-18',
      year: 2025,
      title: 'Korea–UAE cooperation framework on AI and semiconductors',
      participants: ['South Korea', 'United Arab Emirates'],
      participantIds: ['kor', 'are'],
      mapPairs: [['kor', 'are']],
      type: 'investment',
      scope: 'broader-framework',
      stages: ['compute', 'semiconductors', 'investment', 'research', 'infrastructure'],
      status: 'signed',
      implementation: 'The joint declaration committed the two governments to explore concrete projects involving joint investment, development, exports, AI data centers, technology exchange, and stable supply chains for core materials.',
      funding: 'Not specified',
      detail: 'A future-oriented strategic framework that explicitly connects AI infrastructure and semiconductor cooperation with joint investment and technology development.',
      url: 'https://www.mofa.gov.ae/en/MediaHub/News/2025/11/18/18-11-2025-uae-korea',
      lastVerified: '2026-08-02'
    },
    {
      id: 'usa-sau-strategic-ai-2025',
      date: '2025-11-19',
      year: 2025,
      title: 'U.S.–Saudi Strategic Artificial Intelligence Partnership',
      participants: ['United States', 'Saudi Arabia'],
      participantIds: ['usa', 'sau'],
      mapPairs: [['usa', 'sau']],
      type: 'trusted_network',
      scope: 'broader-framework',
      stages: ['compute', 'semiconductors', 'infrastructure', 'investment', 'workforce'],
      status: 'signed',
      implementation: 'The partnership covers the supply of advanced semiconductors, development of AI applications and infrastructure, national capability building, and high-value bilateral investment.',
      funding: 'Not specified',
      detail: 'A government-to-government AI framework in which access to advanced semiconductors supports Saudi compute infrastructure, capability development, and investment cooperation.',
      url: 'https://www.spa.gov.sa/en/N2448510',
      lastVerified: '2026-08-02'
    },
    {
      id: 'ind-vnm-digital-technology-2026',
      date: '2026-05-06',
      year: 2026,
      title: 'India–Vietnam Memorandum of Understanding on Digital Technology Cooperation',
      participants: ['India', 'Vietnam'],
      participantIds: ['ind', 'vnm'],
      mapPairs: [['ind', 'vnm']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['semiconductors', 'research', 'workforce', 'infrastructure'],
      status: 'signed',
      implementation: 'The memorandum identifies semiconductor technology, artificial intelligence, digital infrastructure, and innovation ecosystems as areas for bilateral cooperation. No completed semiconductor project was documented at the verification date.',
      funding: 'Not specified',
      detail: 'A broader digital-technology agreement with an explicit semiconductor component and provisions for technology and innovation cooperation.',
      url: 'https://english.mst.gov.vn/vietnam-and-india-promote-strategic-cooperation-in-digital-technology-and-rare-earths-197260506214430028.htm',
      lastVerified: '2026-08-02'
    }
  ];

  function addRecords() {
    if (typeof COOPERATION_DATA === 'undefined') {
      window.setTimeout(addRecords, 25);
      return;
    }
    const existingIds = new Set(COOPERATION_DATA.map((record) => record.id));
    additions.forEach((record) => {
      if (!existingIds.has(record.id)) {
        COOPERATION_DATA.push(record);
        existingIds.add(record.id);
      }
    });
    COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) yearSelect.dispatchEvent(new Event('change', { bubbles: true }));
    window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {
      detail: { records: COOPERATION_DATA.length, release: RELEASE }
    }));
    enforceRelease();
  }

  async function copyCitation(text, button) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
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
    }
    button.textContent = 'Citation copied';
    window.setTimeout(() => { button.textContent = original; }, 1800);
  }

  function enforceRelease() {
    const kicker = document.querySelector('.kicker');
    if (kicker) kicker.textContent = kicker.textContent.replace(/Release 4\.3(?:\.\d+)*/g, `Release ${RELEASE}`);

    const citationText = document.querySelector('.citation-text');
    if (citationText) citationText.textContent = `Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release ${RELEASE}.`;

    const button = document.getElementById('copyCitation');
    if (button && button.dataset.release432 !== 'true') {
      const replacement = button.cloneNode(true);
      replacement.dataset.release431 = 'true';
      replacement.dataset.release432 = 'true';
      button.replaceWith(replacement);
      replacement.addEventListener('click', () => copyCitation(
        `Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release ${RELEASE}. https://aergrm.github.io/chip-network/`,
        replacement
      ));
    }
  }

  function bindReleaseEnforcement() {
    const targets = [
      document.querySelector('.kicker'),
      document.querySelector('.citation-text'),
      document.querySelector('.share-section')
    ].filter(Boolean);
    targets.forEach((target) => new MutationObserver(() => window.setTimeout(enforceRelease, 0))
      .observe(target, { childList: true, subtree: true, characterData: true }));

    ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
      document.getElementById(id)?.addEventListener('change', () => window.setTimeout(enforceRelease, 25));
    });
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => window.setTimeout(enforceRelease, 25));
    });
    window.addEventListener('chip:cooperationdatachange', () => window.setTimeout(enforceRelease, 25));
    [0, 100, 400, 1000, 2000].forEach((delay) => window.setTimeout(enforceRelease, delay));
  }

  addRecords();
  bindReleaseEnforcement();
})();
