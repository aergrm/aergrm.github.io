(() => {
  'use strict';

  if (typeof COOPERATION_DATA === 'undefined') return;

  const RELEASE = '4.3.3';
  const additions = [
    {
      id: 'eun-jpn-semiconductor-moc-2023',
      date: '2023-07-03',
      year: 2023,
      title: 'EU–Japan Memorandum of Cooperation on Semiconductors',
      participants: ['European Union', 'Japan'],
      participantIds: ['eun', 'jpn'],
      mapPairs: [['eun', 'jpn']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['research', 'supply_chain', 'workforce', 'design'],
      status: 'operational',
      implementation: 'The memorandum created cooperation on semiconductor research and development, an early-warning mechanism for critical supply-chain disruptions, and advanced industry skills. Subsequent Digital Partnership Councils continued chip cooperation through 2026.',
      funding: 'Not specified',
      detail: 'A semiconductor-specific instrument nested within the EU–Japan Digital Partnership.',
      url: 'https://digital-strategy.ec.europa.eu/en/news/japan-eu-digital-council-meeting-outcomes',
      lastVerified: '2026-08-02'
    },
    {
      id: 'gbr-twn-enhanced-trade-2023',
      date: '2023-11-08',
      year: 2023,
      title: 'UK–Taiwan Enhanced Trade Partnership semiconductor cooperation',
      participants: ['United Kingdom', 'Taiwan'],
      participantIds: ['gbr', 'twn'],
      mapPairs: [['gbr', 'twn']],
      type: 'ecosystem',
      scope: 'broader-framework',
      stages: ['semiconductors', 'supply_chain', 'investment', 'research'],
      status: 'operational',
      implementation: 'The Enhanced Trade Partnership was formalized during the annual UK–Taiwan trade talks, where semiconductors were identified as a critical sector for continuing collaboration, trade, and investment.',
      funding: 'Not specified',
      detail: 'A formal trade framework with an explicit semiconductor cooperation component.',
      url: 'https://www.gov.uk/government/news/uk-hosts-talks-with-taiwan-to-boost-trade-ties',
      lastVerified: '2026-08-02'
    },
    {
      id: 'ind-fra-horizon-2047-2023',
      date: '2023-07-14',
      year: 2023,
      title: 'India–France Horizon 2047 strategic technology cooperation',
      participants: ['India', 'France'],
      participantIds: ['ind', 'eun'],
      mapPairs: [['ind', 'eun']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['semiconductors', 'research', 'design', 'investment'],
      status: 'implementation',
      implementation: 'The Horizon 2047 roadmap identified semiconductors among the future-oriented sectors for deeper bilateral cooperation, alongside artificial intelligence, digital technology, and other strategic technologies. The roadmap remains subject to recurring leaders’ review.',
      funding: 'Not specified',
      detail: 'A long-term strategic roadmap that explicitly identifies semiconductor cooperation as a bilateral priority.',
      url: 'https://www.pmindia.gov.in/en/news_updates/pms-meeting-with-the-president-of-the-republic-of-france-2/',
      lastVerified: '2026-08-02'
    },
    {
      id: 'usa-ind-trust-2025',
      date: '2025-02-13',
      year: 2025,
      title: 'U.S.–India TRUST critical and emerging technology initiative',
      participants: ['United States', 'India'],
      participantIds: ['usa', 'ind'],
      mapPairs: [['usa', 'ind']],
      type: 'trusted_network',
      scope: 'broader-framework',
      stages: ['semiconductors', 'supply_chain', 'materials', 'research', 'trusted_network'],
      status: 'implementation',
      implementation: 'The leaders launched TRUST to promote government, academic, and private-sector collaboration in critical technologies, including semiconductors, and committed to trusted and resilient semiconductor, critical-mineral, and advanced-material supply chains.',
      funding: 'Not specified',
      detail: 'A trusted-technology initiative covering semiconductor collaboration, investment, vendor security, and resilient supply chains.',
      url: 'https://www.whitehouse.gov/briefings-statements/2025/02/united-states-india-joint-leaders-statement/',
      lastVerified: '2026-08-02'
    },
    {
      id: 'fra-are-ai-framework-2025',
      date: '2025-02-06',
      year: 2025,
      title: 'France–UAE Framework Agreement on Artificial Intelligence',
      participants: ['France', 'United Arab Emirates'],
      participantIds: ['eun', 'are'],
      mapPairs: [['eun', 'are']],
      type: 'investment',
      scope: 'broader-framework',
      stages: ['compute', 'semiconductors', 'infrastructure', 'investment'],
      status: 'signed',
      implementation: 'The framework provides for a one-gigawatt AI campus in France and broader collaboration across the AI value chain, explicitly including acquisition of advanced chips, data centers, talent, sovereign cloud, and cross-border investment.',
      funding: 'Investment volume was not specified in the framework announcement; a first investment tranche was scheduled for a later announcement.',
      detail: 'A bilateral AI infrastructure and investment framework with an explicit advanced-chip component.',
      url: 'https://www.elysee.fr/emmanuel-macron/2025/02/06/diner-de-travail-avec-son-altesse-cheikh-mohamed-bin-zayed-al-nahyan-president-des-emirats-arabes-unis',
      lastVerified: '2026-08-02'
    },
    {
      id: 'sgp-vnm-csp-2025',
      date: '2025-03-12',
      year: 2025,
      title: 'Singapore–Vietnam Comprehensive Strategic Partnership',
      participants: ['Singapore', 'Vietnam'],
      participantIds: ['sgp', 'vnm'],
      mapPairs: [['sgp', 'vnm']],
      type: 'ecosystem',
      scope: 'broader-framework',
      stages: ['workforce', 'research', 'design', 'semiconductors'],
      status: 'implementation',
      implementation: 'The partnership committed the two countries to education, professional exchange, and talent development in integrated-circuit design and semiconductor technology. A subsequent plan of action and 2026 bilateral initiatives continued implementation.',
      funding: 'Not specified',
      detail: 'A broad strategic partnership with an explicit semiconductor-design and skills component.',
      url: 'https://www.mfa.gov.sg/newsroom/press-statements-transcripts-and-photos/20250312-joint-statement-vn-sg-csp-12-mar-2025/',
      lastVerified: '2026-08-02'
    },
    {
      id: 'ind-mys-structured-semiconductor-2025',
      date: '2025-03-23',
      year: 2025,
      title: 'India–Malaysia structured semiconductor cooperation initiative',
      participants: ['India', 'Malaysia'],
      participantIds: ['ind', 'mys'],
      mapPairs: [['ind', 'mys']],
      type: 'ecosystem',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'investment', 'workforce', 'research'],
      status: 'announced',
      implementation: 'Officials agreed to develop structured semiconductor engagement at government-to-government, business-to-business, and industry-association levels. The official source stated that a formal semiconductor partnership arrangement remained prospective.',
      funding: 'Not specified',
      detail: 'An announced bilateral cooperation process intended to connect Malaysia’s established supply chain with India’s expanding semiconductor ecosystem.',
      url: 'https://www.investmalaysia.gov.my/resources/latest-announcements/malaysia-strengthens-economic-collaboration-with-india-from-trade-and-investment-mission-to-india/',
      lastVerified: '2026-08-02'
    },
    {
      id: 'ind-sgp-industry-corridor-2026',
      date: '2026-04-16',
      year: 2026,
      title: 'India–Singapore industry-led semiconductor corridor',
      participants: ['India', 'Singapore'],
      participantIds: ['ind', 'sgp'],
      mapPairs: [['ind', 'sgp']],
      type: 'ecosystem',
      scope: 'semiconductor-specific',
      stages: ['supply_chain', 'research', 'design', 'investment'],
      status: 'signed',
      implementation: 'The Singapore Semiconductor Industry Association and India Cellular and Electronics Association signed a memorandum to build a trusted semiconductor corridor, advance technology co-development, support two-way business collaboration, and conduct a joint ecosystem study.',
      funding: 'Not specified',
      detail: 'A government-documented industry association agreement designed to operationalize the broader India–Singapore semiconductor partnership.',
      url: 'https://www.edb.gov.sg/en/about-edb/media-releases-publications/singapore-drives-semiconductor-growth-talent-and-innovation.html',
      lastVerified: '2026-08-02'
    }
  ];

  function addRecords() {
    const existingIds = new Set(COOPERATION_DATA.map((record) => record.id));
    additions.forEach((record) => {
      if (!existingIds.has(record.id)) {
        COOPERATION_DATA.push(record);
        existingIds.add(record.id);
      }
    });
    COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
    window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {
      detail: { records: COOPERATION_DATA.length, release: RELEASE }
    }));
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

  function detachLegacyReleaseTargets() {
    const kicker = document.querySelector('.kicker');
    if (kicker && kicker.dataset.release433 !== 'true') {
      const clone = kicker.cloneNode(true);
      clone.dataset.release433 = 'true';
      kicker.replaceWith(clone);
    }

    const share = document.querySelector('.share-section');
    if (share && share.dataset.release433 !== 'true') {
      const clone = share.cloneNode(true);
      clone.dataset.release433 = 'true';
      share.replaceWith(clone);
    }
  }

  function bindShareControls() {
    document.querySelectorAll('[data-comparison]').forEach((link) => {
      if (link.dataset.release433 === 'true') return;
      link.dataset.release433 = 'true';
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

    const button = document.getElementById('copyCitation');
    if (button && button.dataset.release433 !== 'true') {
      button.dataset.release433 = 'true';
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

  function scheduleEnforcement() {
    [50, 160, 520, 1120, 2250].forEach((delay) => window.setTimeout(enforceRelease, delay));
  }

  function bindReleaseEnforcement() {
    ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
      document.getElementById(id)?.addEventListener('change', () => window.setTimeout(enforceRelease, 60));
    });
    document.querySelectorAll('.evidence-card[data-mode]').forEach((button) => {
      button.addEventListener('click', () => window.setTimeout(enforceRelease, 60));
    });
    window.addEventListener('chip:cooperationdatachange', () => window.setTimeout(enforceRelease, 60));
    window.addEventListener('popstate', () => window.setTimeout(enforceRelease, 60));
  }

  addRecords();
  detachLegacyReleaseTargets();
  bindShareControls();
  bindReleaseEnforcement();
  enforceRelease();
  scheduleEnforcement();
})();
