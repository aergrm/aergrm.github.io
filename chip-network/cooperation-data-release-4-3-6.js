(() => {
  'use strict';

  if (typeof COOPERATION_DATA === 'undefined') return;

  const RELEASE = '4.3.6';
  const VERIFIED = '2026-08-17';

  const additions = [
    {
      id: 'usa-twn-aced-fab-2022',
      date: '2022-09-29',
      year: 2022,
      title: 'NSF–NSTC Advanced Chip Engineering Design and Fabrication (ACED Fab)',
      participants: ['United States', 'Taiwan'],
      participantIds: ['usa', 'twn'],
      mapPairs: [['usa', 'twn']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['design', 'fabrication', 'research', 'workforce'],
      status: 'operational',
      implementation: 'The U.S. National Science Foundation and Taiwan’s National Science and Technology Council launched ACED Fab under an AIT–TECRO memorandum and implementing arrangement on advanced semiconductor chip design and fabrication. In June 2023, the partnership announced six jointly supported projects using advanced processes available in Taiwan’s semiconductor foundries.',
      funding: 'US$6 million total for six joint projects announced in 2023, including US$3 million from NSF for U.S. researchers.',
      detail: 'A jointly funded semiconductor research program connecting U.S. chip-design research with advanced fabrication access in Taiwan.',
      url: 'https://www.nsf.gov/news/nsf-announces-6-million-investment-semiconductor-fabrication',
      lastVerified: VERIFIED
    },
    {
      id: 'aus-jpn-semiconductor-supply-chain-2022',
      date: '2022-10-22',
      year: 2022,
      title: 'Australia–Japan semiconductor supply-chain cooperation',
      participants: ['Australia', 'Japan'],
      participantIds: ['aus', 'jpn'],
      mapPairs: [['aus', 'jpn']],
      type: 'resilience',
      scope: 'broader-framework',
      stages: ['supply_chain', 'trusted_network'],
      status: 'signed',
      implementation: 'The Australia–Japan Leaders’ Meeting Joint Statement committed the two governments to explore further opportunities to build stronger and more resilient supply chains, explicitly including semiconductors, within their wider economic-security cooperation.',
      funding: 'Not specified',
      detail: 'A bilateral economic-security commitment that identifies semiconductor supply-chain resilience as an explicit cooperation area.',
      url: 'https://www.pm.gov.au/media/australia-japan-leaders-meeting-joint-statement',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-deu-sta-2023',
      date: '2023-03-21',
      year: 2023,
      title: 'Taiwan–Germany Scientific and Technological Cooperation Arrangement',
      participants: ['Taiwan', 'Germany'],
      participantIds: ['twn', 'eun'],
      mapPairs: [['twn', 'eun']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'design', 'workforce'],
      status: 'operational',
      implementation: 'Taiwan and Germany signed their first Scientific and Technological Cooperation Arrangement with semiconductors, hydrogen, batteries, and AI as designated cooperation fields. Follow-on activity included a bilateral semiconductor seminar in Dresden and co-funding for six Taiwan–Germany chip-design research teams.',
      funding: 'The official sources confirm joint funding for six chip-design research teams but do not state an aggregate amount.',
      detail: 'A bilateral science and technology arrangement with an implemented semiconductor research track. Germany is represented through the EU anchor on the map.',
      url: 'https://www.nstc.gov.tw/folksonomy/detail/6bc0f076-9685-4e92-857c-8b95a91edc42?l=en',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-fra-stc-2023',
      date: '2023-11-23',
      year: 2023,
      title: 'Taiwan–France Science and Technology Cooperation Convention',
      participants: ['Taiwan', 'France'],
      participantIds: ['twn', 'eun'],
      mapPairs: [['twn', 'eun']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'design'],
      status: 'operational',
      implementation: 'Taiwan and France signed a Science and Technology Cooperation Convention identifying semiconductors and quantum as one of six priority fields. The framework moved into implementation with the first Taiwan–France Science Research Meeting in April 2024, including semiconductor cooperation among the designated fields.',
      funding: 'Not specified',
      detail: 'A bilateral science and technology framework with semiconductors as a formal priority area. France is represented through the EU anchor on the map.',
      url: 'https://www.nstc.gov.tw/folksonomy/detail/d82a8144-43dc-412b-9d71-4aa310c72fd6?l=en',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-can-stia-2024',
      date: '2024-04-15',
      year: 2024,
      title: 'Taiwan–Canada Science, Technology and Innovation Arrangement',
      participants: ['Taiwan', 'Canada'],
      participantIds: ['twn', 'can'],
      mapPairs: [['twn', 'can']],
      type: 'research',
      scope: 'broader-framework',
      stages: ['research', 'workforce', 'design'],
      status: 'operational',
      implementation: 'Taiwan and Canada signed a Science, Technology and Innovation Arrangement to support priority research, emerging technologies, and talent development. Under the arrangement, the first Joint Science and Technology Committee met in March 2025 and discussed semiconductor, AI, cybersecurity, and talent cooperation.',
      funding: 'Not specified in the parent arrangement.',
      detail: 'The government-level framework that supports later Taiwan–Canada semiconductor and AI research cooperation.',
      url: 'https://www.nstc.gov.tw/folksonomy/detail/6dd7292a-7f78-4271-a1ad-847d86443433?l=ch',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-aus-sta-2024',
      date: '2024-05-13',
      year: 2024,
      title: 'Taiwan–Australia Science and Technology Arrangement',
      participants: ['Taiwan', 'Australia'],
      participantIds: ['twn', 'aus'],
      mapPairs: [['twn', 'aus']],
      type: 'resilience',
      scope: 'broader-framework',
      stages: ['research', 'supply_chain', 'workforce'],
      status: 'signed',
      implementation: 'Taiwan and Australia upgraded their earlier research memorandum to a Science and Technology Arrangement. The agreement identifies ICT manufacturing, semiconductor technology and critical-technology supply-chain resilience as one of four principal cooperation areas.',
      funding: 'Not specified',
      detail: 'A bilateral science and technology framework that explicitly links semiconductor cooperation with critical-technology supply-chain resilience.',
      url: 'https://www.nstc.gov.tw/folksonomy/detail/f8e10b20-243f-4311-965f-95de51a6717d?l=ch',
      lastVerified: VERIFIED
    },
    {
      id: 'twn-isr-semiconductor-research-2025',
      date: '2025-05-22',
      year: 2025,
      title: 'Taiwan–Israel semiconductor design and next-generation materials research program',
      participants: ['Taiwan', 'Israel'],
      participantIds: ['twn', 'isr'],
      mapPairs: [['twn', 'isr']],
      type: 'research',
      scope: 'semiconductor-specific',
      stages: ['research', 'design', 'materials'],
      status: 'implementation',
      implementation: 'Taiwan’s National Science and Technology Council issued a bilateral Taiwan–Israel add-on research call focused on semiconductor design and next-generation materials. The public call set a project period from January 2026 through December 2027; the source confirms the bilateral program but does not identify awardees.',
      funding: 'Not specified in the public call page.',
      detail: 'A bilateral research program narrowly focused on semiconductor design and next-generation materials.',
      url: 'https://www.nstc.gov.tw/israel/en/detail/11bc22e8-aab2-473d-b4b8-429bb6ed14e9',
      lastVerified: VERIFIED
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
  }

  function resetCitationButton() {
    const button = document.getElementById('copyCitation');
    if (!button || button.dataset.release436 === 'true') return button;
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
    if (!button || button.dataset.release436 === 'true') return;
    button.dataset.release436 = 'true';
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

  addRecords();
  COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

  window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {
    detail: { records: COOPERATION_DATA.length, release: RELEASE }
  }));

  bindShareControls();
  enforceRelease();
  refreshApplication();

  ['countrySelect', 'yearSelect', 'coopType', 'coopScope', 'coopStatus', 'coopStage'].forEach((id) => {
    document.getElementById(id)?.addEventListener('change', () => window.setTimeout(enforceRelease, 150));
  });
  window.addEventListener('chip:cooperationdatachange', () => window.setTimeout(enforceRelease, 150));
  window.addEventListener('popstate', () => window.setTimeout(enforceRelease, 150));

  [100, 300, 800, 1700, 3400, 6000, 8200].forEach((delay) => window.setTimeout(enforceRelease, delay));
})();
