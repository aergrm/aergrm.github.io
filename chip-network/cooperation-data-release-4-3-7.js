(() => {
  'use strict';
  if (typeof COOPERATION_DATA === 'undefined') return;
  const RELEASE = '4.3.7';
  const duplicates = [
  {
    "drop": "can-deu-2026",
    "keep": "can-deu-semiconductor-jdoi-2026",
    "reason": "Same June 29, 2026 joint declaration and same official Canadian source"
  },
  {
    "drop": "aciti-2026",
    "keep": "aciti-aus-can-ind-2026",
    "reason": "Same July 10, 2026 trilateral MoU and same Australian government source"
  },
  {
    "drop": "usa-twn-trade-investment-semiconductors-2026",
    "keep": "usa-twn-investment-2026",
    "reason": "Same January 15, 2026 AIT–TECRO semiconductor investment MoU and same Commerce fact sheet"
  }
];
  // Remove a duplicate only if its canonical replacement is present.
  for (const {drop, keep} of duplicates) {
    if (!COOPERATION_DATA.some(record => record.id === keep)) continue;
    const i = COOPERATION_DATA.findIndex(record => record.id === drop);
    if (i >= 0) COOPERATION_DATA.splice(i, 1);
  }
  // ACITI created an implementation mechanism. Evidence of operation is not established.
  const aciti = COOPERATION_DATA.find(record => record.id === 'aciti-aus-can-ind-2026');
  if (aciti) {
    aciti.status = 'signed';
    aciti.implementation = 'The memorandum provides for a trilateral working group to implement cooperation on AI and other technologies, including semiconductors. Evidence of an actual working-group meeting is not yet identified.';
  }
  const malaysia = COOPERATION_DATA.find(record => record.id === 'ind-mys-structured-semiconductor-2025');
  if (malaysia) {
    malaysia.supplementalSources = [...new Set([...(malaysia.supplementalSources || []), 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2225059&lang=1&reg=3'])];
    malaysia.implementation = '2025 officials announced structured semiconductor engagement. A February 2026 leaders statement documented cooperation already underway between IIT-Madras Global and Malaysia Advanced Semiconductor Academy, and between IESA and MSIA. These institutional initiatives do not by themselves establish a separately signed bilateral government semiconductor agreement.';
  }
  const additions = [
  {
    "id": "usa-ury-critical-emerging-technologies-2024",
    "date": "2024-04-10",
    "title": "U.S.–Uruguay Memorandum of Understanding on Select Critical and Emerging Technologies",
    "participants": [
      "United States",
      "Uruguay"
    ],
    "participantIds": [
      "usa",
      "ury"
    ],
    "mapPairs": [],
    "type": "research",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "research",
      "supply_chain"
    ],
    "status": "signed",
    "implementation": "The memorandum establishes a bilateral working group intended to meet twice annually and develop cooperation on semiconductors and other critical technologies. No semiconductor-specific implemented project is documented in the cited source.",
    "funding": "Not specified",
    "detail": "Government-level MoU explicitly including semiconductor development and supply-chain opportunities. Uruguay has no country map anchor in the current visualization.",
    "url": "https://www.trade.gov/market-intelligence/uruguay-critical-and-emerging-technologies-agreement-usa",
    "year": 2024,
    "lastVerified": "2026-10-10",
    "actorLevel": "government",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "jpn-usa-jetro-nycreates-2024",
    "date": "2024-12-09",
    "title": "JETRO–NY CREATES Strategic Semiconductor Partnership MoU",
    "participants": [
      "Japan",
      "United States"
    ],
    "participantIds": [
      "jpn",
      "usa"
    ],
    "mapPairs": [
      [
        "jpn",
        "usa"
      ]
    ],
    "type": "ecosystem",
    "scope": "semiconductor-specific",
    "stages": [
      "research",
      "workforce",
      "investment"
    ],
    "status": "operational",
    "implementation": "The parties signed a semiconductor-sector MoU and subsequently co-hosted a SEMICON Japan seminar. JETRO also reports continuing business development activities under the partnership.",
    "funding": "Not specified",
    "detail": "Public trade agency and U.S. nonprofit research-organization partnership for cross-border semiconductor R&D and ecosystem connections.",
    "url": "https://www.jetro.go.jp/en/invest/newsroom/2024/d7c5281930b5ba12.html",
    "year": 2024,
    "lastVerified": "2026-10-10",
    "actorLevel": "public agency/institution",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "sgp-nld-edb-bom-2025",
    "date": "2025-05-20",
    "title": "Singapore EDB–Brabant Development Agency Deep Technology MoU",
    "participants": [
      "Singapore",
      "Netherlands"
    ],
    "participantIds": [
      "sgp",
      "nld"
    ],
    "mapPairs": [
      [
        "sgp",
        "nld"
      ]
    ],
    "type": "ecosystem",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "research",
      "workforce",
      "investment"
    ],
    "status": "signed",
    "implementation": "The public agencies agreed to support knowledge and policy exchange, talent initiatives and joint research opportunities. Semiconductors and photonics are explicit deep-tech cooperation fields.",
    "funding": "Not specified",
    "detail": "Public development-agency agreement with an explicit semiconductor cooperation component.",
    "url": "https://www.edb.gov.sg/en/about-edb/media-releases-publications/singapore-brabant-ink-mou-to-deepen-economic-ties.html",
    "year": 2025,
    "lastVerified": "2026-10-10",
    "actorLevel": "public agency/institution",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "jpn-twn-jetro-taitra-kyushu-2025",
    "date": "2025-09-05",
    "title": "JETRO–TAITRA–Kyushu Economic Federation Investment Cooperation MoC",
    "participants": [
      "Japan",
      "Taiwan"
    ],
    "participantIds": [
      "jpn",
      "twn"
    ],
    "mapPairs": [
      [
        "jpn",
        "twn"
      ]
    ],
    "type": "investment",
    "scope": "semiconductor-specific",
    "stages": [
      "investment",
      "supply_chain",
      "workforce"
    ],
    "status": "signed",
    "implementation": "The memorandum promotes Taiwanese semiconductor-related investment in Kyushu through investment missions, information sharing, matchmaking and establishment support.",
    "funding": "Not specified",
    "detail": "Three-party agency and industry-federation agreement supporting semiconductor supply-chain investment.",
    "url": "https://www.jetro.go.jp/en/invest/newsroom/2025/7456fcf4c9e23809.html",
    "year": 2025,
    "lastVerified": "2026-10-10",
    "actorLevel": "public agency/institution",
    "documentType": "memorandum of cooperation"
  },
  {
    "id": "usa-gbr-technology-prosperity-deal-2025",
    "date": "2025-09-18",
    "title": "U.S.–UK Technology Prosperity Deal MoU",
    "participants": [
      "United States",
      "United Kingdom"
    ],
    "participantIds": [
      "usa",
      "gbr"
    ],
    "mapPairs": [
      [
        "usa",
        "gbr"
      ]
    ],
    "type": "trusted_network",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "compute",
      "research",
      "infrastructure"
    ],
    "status": "signed",
    "implementation": "The government MoU commits to cooperation on AI infrastructure and hardware innovation and promotion of AI exports including chips, data centers and models. No chip-specific downstream project is confirmed in this document.",
    "funding": "Not specified",
    "detail": "Cross-government technology memorandum explicitly covering chips and AI hardware.",
    "url": "https://www.gov.uk/government/news/memorandum-of-understanding-between-the-government-of-the-united-states-of-america-and-the-government-of-the-united-kingdom-of-great-britain-and-north",
    "year": 2025,
    "lastVerified": "2026-10-10",
    "actorLevel": "government",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "usa-jpn-technology-prosperity-deal-2025",
    "date": "2025-10-28",
    "title": "U.S.–Japan Technology Prosperity Deal MoC",
    "participants": [
      "United States",
      "Japan"
    ],
    "participantIds": [
      "usa",
      "jpn"
    ],
    "mapPairs": [
      [
        "usa",
        "jpn"
      ]
    ],
    "type": "research",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "research",
      "compute",
      "trusted_network"
    ],
    "status": "signed",
    "implementation": "The memorandum commits to cooperation in high-performance computing, leading-edge semiconductor technologies, quantum computing and research across strategic science fields. It is distinct from earlier JUCIP semiconductor cooperation.",
    "funding": "Not specified",
    "detail": "Cross-government MoC specifically mentioning leading-edge semiconductor technologies.",
    "url": "https://www.whitehouse.gov/releases/2025/10/u-s-japan-technology-prosperity-deal/",
    "year": 2025,
    "lastVerified": "2026-10-10",
    "actorLevel": "government",
    "documentType": "memorandum of cooperation"
  },
  {
    "id": "jpn-usa-jetro-arizona-2026",
    "date": "2026-03-04",
    "title": "JETRO–Arizona State University–ACA–GPEC Semiconductor Collaboration MoU",
    "participants": [
      "Japan",
      "United States"
    ],
    "participantIds": [
      "jpn",
      "usa"
    ],
    "mapPairs": [
      [
        "jpn",
        "usa"
      ]
    ],
    "type": "ecosystem",
    "scope": "semiconductor-specific",
    "stages": [
      "research",
      "workforce",
      "fabrication"
    ],
    "status": "signed",
    "implementation": "JETRO and three Arizona partner organizations signed a four-party memorandum for R&D, skills and cross-border industrial collaboration in semiconductors and related sectors.",
    "funding": "Not specified",
    "detail": "Subnational and institutional semiconductor ecosystem MoU; distinct from U.S.–Japan government agreements.",
    "url": "https://www.jetro.go.jp/en/news/announcement/2026/c295acc70ea10821.html",
    "year": 2026,
    "lastVerified": "2026-10-10",
    "actorLevel": "public agency/institution",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "ind-ita-innovit-semiconductors-2026",
    "date": "2026-05-20",
    "title": "India–Italy Joint Declaration and INNOVIT India Semiconductor Cooperation",
    "participants": [
      "India",
      "Italy"
    ],
    "participantIds": [
      "ind",
      "eun"
    ],
    "mapPairs": [
      [
        "ind",
        "eun"
      ]
    ],
    "type": "ecosystem",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "research",
      "workforce",
      "investment"
    ],
    "status": "announced",
    "implementation": "A government joint declaration announced creation of INNOVIT India for startup, research and industry cooperation across named sectors including semiconductors. A separately signed semiconductor-specific MoU is not established by the declaration.",
    "funding": "Not specified",
    "detail": "Government joint declaration identifying semiconductors in a newly announced bilateral innovation hub.",
    "url": "https://www.pmindia.gov.in/en/news_updates/india-italy-joint-declaration/",
    "year": 2026,
    "lastVerified": "2026-10-10",
    "actorLevel": "government",
    "documentType": "joint declaration"
  },
  {
    "id": "fra-kor-ai-semiconductor-quantum-mou-2026",
    "date": "2026-09-08",
    "title": "France–South Korea MoU on AI, Semiconductors and Quantum Technologies",
    "participants": [
      "France",
      "South Korea"
    ],
    "participantIds": [
      "eun",
      "kor"
    ],
    "mapPairs": [
      [
        "eun",
        "kor"
      ]
    ],
    "type": "research",
    "scope": "broader-framework",
    "stages": [
      "semiconductors",
      "research",
      "investment",
      "compute"
    ],
    "status": "signed",
    "implementation": "The governments signed an MoU during the Korean president's visit to France. Official accounts identify AI, semiconductors and quantum technologies as cooperation fields and reference joint R&D and market-access cooperation.",
    "funding": "Not specified",
    "detail": "New signed government technology MoU, distinct from the April 2026 letter of intent.",
    "url": "https://en.president.go.kr/news/korea-net/wdymcXDE",
    "year": 2026,
    "lastVerified": "2026-10-10",
    "actorLevel": "government",
    "documentType": "memorandum of understanding"
  },
  {
    "id": "sgp-nld-ssia-bom-semiconductor-2026",
    "date": "2026-09-24",
    "title": "Singapore SSIA–Brabant Development Agency Semiconductor MoU",
    "participants": [
      "Singapore",
      "Netherlands"
    ],
    "participantIds": [
      "sgp",
      "nld"
    ],
    "mapPairs": [
      [
        "sgp",
        "nld"
      ]
    ],
    "type": "ecosystem",
    "scope": "semiconductor-specific",
    "stages": [
      "supply_chain",
      "workforce",
      "investment",
      "research"
    ],
    "status": "signed",
    "implementation": "The industry association and Dutch development agency signed an MoU to support supplier qualification, business matching, skills, investment missions and exchanges between semiconductor ecosystems. It is separate from the May 2025 EDB–BOM MoU.",
    "funding": "Not specified",
    "detail": "Industry association–public development agency semiconductor-specific MoU.",
    "url": "https://brabantbusinessregion.com/ssia-and-bom/",
    "year": 2026,
    "lastVerified": "2026-10-10",
    "actorLevel": "industry/public agency",
    "documentType": "memorandum of understanding"
  }
];
  const existingIds = new Set(COOPERATION_DATA.map(record => record.id));
  for (const record of additions) {
    if (existingIds.has(record.id)) continue;
    COOPERATION_DATA.push(record);
    existingIds.add(record.id);
  }
  COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {detail: {records:COOPERATION_DATA.length,release:RELEASE}}));
  // Rebind the citation control so copying also uses the updated release number.
  const oldCitationButton = document.getElementById('copyCitation');
  if (oldCitationButton) {
    const button = oldCitationButton.cloneNode(true);
    oldCitationButton.replaceWith(button);
    button.addEventListener('click', () => {
      const text = 'Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release '+RELEASE+'. https://aergrm.github.io/chip-network/';
      const success = () => {
        const previous = button.textContent;
        button.textContent = 'Citation copied';
        window.setTimeout(() => { button.textContent = previous; }, 1800);
      };
      const fallback = () => {
        const node = document.createElement('textarea');
        node.value = text;
        node.setAttribute('readonly', '');
        node.style.position = 'fixed';
        node.style.opacity = '0';
        document.body.appendChild(node);
        node.select();
        document.execCommand('copy');
        node.remove();
        success();
      };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(success).catch(fallback);
      else fallback();
    });
  }
  const enforce = () => {
    const kicker = document.querySelector('.kicker');
    if (kicker) kicker.textContent = kicker.textContent.replace(/Release 4\.3(?:\.\d+)*/g, 'Release '+RELEASE);
    const citation = document.querySelector('.citation-text');
    if (citation) citation.textContent = 'Ergurum, Ahmet. 2026. “Middle Powers in the Global Semiconductor Network.” Release '+RELEASE+'.';
    const strip = document.getElementById('coverageStrip');
    if (strip) strip.innerHTML = '<strong>'+COOPERATION_DATA.length+'</strong> documented cooperation records <span>·</span> 2021–October 2026 <span>·</span> official sources and institutional releases';
    const yearSelect = document.getElementById('yearSelect');
    if (yearSelect) yearSelect.dispatchEvent(new Event('change',{bubbles:true}));
  };
  enforce();
  [50,200,700,1800,4200].forEach(ms => window.setTimeout(enforce, ms));
})();
