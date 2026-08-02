(() => {
  'use strict';

  if (typeof COOPERATION_DATA === 'undefined') return;

  const revisedJucip = {
  "id": "usa-jpn-jucip-2022",
  "date": "2022-05-04",
  "year": 2022,
  "title": "Japan–U.S. Commercial and Industrial Partnership semiconductor cooperation",
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
  "type": "resilience",
  "scope": "broader-framework",
  "stages": [
    "supply_chain",
    "research",
    "fabrication",
    "trusted_network"
  ],
  "status": "operational",
  "implementation": "The partners adopted basic principles for semiconductor cooperation in 2022 and continued the work through recurring JUCIP ministerials, a next-generation semiconductor task force, research coordination, and supply-chain consultations.",
  "funding": "Not specified",
  "detail": "An operating bilateral framework for semiconductor supply-chain resilience, next-generation research, policy coordination, and technology protection.",
  "url": "https://www.commerce.gov/news/press-releases/2022/05/readout-secretary-raimondos-meeting-minister-economy-trade-and-industry",
  "lastVerified": "2026-08-02"
};
  const additions = [
  {
    "id": "quad-semiconductor-2021",
    "date": "2021-09-24",
    "year": 2021,
    "title": "Quad Semiconductor Supply Chain Initiative",
    "participants": [
      "Australia",
      "India",
      "Japan",
      "United States"
    ],
    "participantIds": [
      "aus",
      "ind",
      "jpn",
      "usa"
    ],
    "mapPairs": [
      [
        "aus",
        "ind"
      ],
      [
        "aus",
        "jpn"
      ],
      [
        "aus",
        "usa"
      ],
      [
        "ind",
        "jpn"
      ],
      [
        "ind",
        "usa"
      ],
      [
        "jpn",
        "usa"
      ]
    ],
    "type": "resilience",
    "scope": "semiconductor-specific",
    "stages": [
      "supply_chain"
    ],
    "status": "implementation",
    "implementation": "The partners launched joint capacity mapping and vulnerability identification, and later official statements continued to identify the initiative as an active element of Quad semiconductor cooperation.",
    "funding": "Not specified",
    "detail": "A four-country initiative to map semiconductor capacity, identify vulnerabilities, and strengthen supply-chain security.",
    "url": "https://www.pmindia.gov.in/en/news_updates/fact-sheet-quad-leaders-summit/",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "usa-twn-ttic-2021",
    "date": "2021-12-06",
    "year": 2021,
    "title": "U.S.–Taiwan Technology Trade and Investment Collaboration",
    "participants": [
      "United States",
      "Taiwan"
    ],
    "participantIds": [
      "usa",
      "twn"
    ],
    "mapPairs": [
      [
        "usa",
        "twn"
      ]
    ],
    "type": "resilience",
    "scope": "broader-framework",
    "stages": [
      "supply_chain",
      "investment",
      "semiconductors"
    ],
    "status": "implementation",
    "implementation": "The framework was followed by an April 2022 government-industry forum on U.S.–Taiwan cooperation for global semiconductor supply-chain resilience.",
    "funding": "Not specified",
    "detail": "A technology, trade, and investment framework covering semiconductors and other critical supply chains.",
    "url": "https://www.commerce.gov/news/press-releases/2021/12/secretary-commerce-gina-m-raimondo-holds-introductory-call-taiwan",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "usa-kor-sccd-2022",
    "date": "2022-05-21",
    "year": 2022,
    "title": "U.S.–Korea Supply Chain and Commercial Dialogue",
    "participants": [
      "United States",
      "South Korea"
    ],
    "participantIds": [
      "usa",
      "kor"
    ],
    "mapPairs": [
      [
        "usa",
        "kor"
      ]
    ],
    "type": "resilience",
    "scope": "broader-framework",
    "stages": [
      "supply_chain",
      "research",
      "packaging",
      "materials",
      "investment",
      "workforce"
    ],
    "status": "operational",
    "implementation": "Recurring ministerial meetings, working groups, and a semiconductor forum have advanced cooperation on investment incentives, R&D, advanced packaging, materials, workforce development, export controls, and supply-chain risks.",
    "funding": "Not specified",
    "detail": "An operating bilateral dialogue with a dedicated semiconductor cooperation agenda and recurring public-private activity.",
    "url": "https://www.commerce.gov/news/press-releases/2023/04/united-states-korea-supply-chain-and-commercial-dialogue-ministerial",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "eun-sgp-2023",
    "date": "2023-02-01",
    "year": 2023,
    "title": "EU–Singapore Digital Partnership",
    "participants": [
      "European Union",
      "Singapore"
    ],
    "participantIds": [
      "eun",
      "sgp"
    ],
    "mapPairs": [
      [
        "eun",
        "sgp"
      ]
    ],
    "type": "research",
    "scope": "broader-framework",
    "stages": [
      "research",
      "design",
      "supply_chain",
      "investment"
    ],
    "status": "operational",
    "implementation": "The partnership has held recurring Digital Partnership Council meetings and has pursued collaborative semiconductor research and cross-border investment cooperation.",
    "funding": "Not specified",
    "detail": "A broad digital partnership that identifies semiconductors as a priority area for policy, research, and investment cooperation.",
    "url": "https://digital-strategy.ec.europa.eu/en/library/eu-singapore-digital-partnership",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "gbr-usa-atlantic-2023",
    "date": "2023-06-08",
    "year": 2023,
    "title": "U.S.–UK Atlantic Declaration semiconductor cooperation",
    "participants": [
      "United Kingdom",
      "United States"
    ],
    "participantIds": [
      "gbr",
      "usa"
    ],
    "mapPairs": [
      [
        "gbr",
        "usa"
      ]
    ],
    "type": "trusted_network",
    "scope": "broader-framework",
    "stages": [
      "research",
      "materials",
      "supply_chain",
      "workforce",
      "investment",
      "trusted_network"
    ],
    "status": "implementation",
    "implementation": "The two governments established recurring implementation meetings and began work under the declaration’s technology, investment, economic-security, and resilient-supply-chain pillars.",
    "funding": "Not specified",
    "detail": "A broad economic-security framework with explicit cooperation on advanced semiconductor research, compound semiconductors, talent, investment, and supply-chain resilience.",
    "url": "https://www.gov.uk/government/publications/the-atlantic-declaration/the-atlantic-declaration",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "usa-vnm-2023",
    "date": "2023-09-10",
    "year": 2023,
    "title": "U.S.–Vietnam Semiconductor Ecosystem Cooperation",
    "participants": [
      "United States",
      "Vietnam"
    ],
    "participantIds": [
      "usa",
      "vnm"
    ],
    "mapPairs": [
      [
        "usa",
        "vnm"
      ]
    ],
    "type": "ecosystem",
    "scope": "semiconductor-specific",
    "stages": [
      "workforce",
      "research",
      "supply_chain"
    ],
    "status": "funded",
    "implementation": "The bilateral memorandum allocated CHIPS Act International Technology Security and Innovation Fund resources to semiconductor workforce development in Vietnam.",
    "funding": "USD 2 million from the International Technology Security and Innovation Fund for semiconductor workforce development, alongside separate U.S. STEM education and training support.",
    "detail": "A semiconductor ecosystem memorandum centered on workforce development and wider bilateral ecosystem cooperation.",
    "url": "https://2021-2025.state.gov/bureau-of-east-asian-and-pacific-affairs/releases/2025/01/u-s-relations-with-vietnam",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "eun-can-2023",
    "date": "2023-11-24",
    "year": 2023,
    "title": "EU–Canada Digital Partnership",
    "participants": [
      "European Union",
      "Canada"
    ],
    "participantIds": [
      "eun",
      "can"
    ],
    "mapPairs": [
      [
        "eun",
        "can"
      ]
    ],
    "type": "research",
    "scope": "broader-framework",
    "stages": [
      "research",
      "design",
      "supply_chain",
      "investment"
    ],
    "status": "operational",
    "implementation": "The partnership moved into implementation through official-level digital dialogues and held its first Digital Partnership Council in December 2025, with semiconductors retained as a priority.",
    "funding": "Not specified",
    "detail": "A broad digital partnership covering semiconductor supply chains, research, innovation, and technology-sector investment.",
    "url": "https://digital-strategy.ec.europa.eu/en/news/eu-and-canada-launch-digital-partnership-strengthen-strategic-cooperation",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "jpn-kor-usa-2024",
    "date": "2024-06-26",
    "year": 2024,
    "title": "Japan–Republic of Korea–United States Commerce and Industry Ministerial",
    "participants": [
      "Japan",
      "South Korea",
      "United States"
    ],
    "participantIds": [
      "jpn",
      "kor",
      "usa"
    ],
    "mapPairs": [
      [
        "jpn",
        "kor"
      ],
      [
        "jpn",
        "usa"
      ],
      [
        "kor",
        "usa"
      ]
    ],
    "type": "resilience",
    "scope": "broader-framework",
    "stages": [
      "supply_chain",
      "semiconductors",
      "research",
      "trusted_network"
    ],
    "status": "implementation",
    "implementation": "The inaugural ministerial established a trilateral mechanism and committed the three governments to accelerate cooperation on resilient semiconductor supply chains, advanced-technology export controls, research, and economic security.",
    "funding": "Not specified",
    "detail": "A trilateral commerce and industry mechanism with an explicit semiconductor supply-chain and technology-security agenda.",
    "url": "https://www.commerce.gov/news/press-releases/2024/06/joint-statement-japan-republic-korea-united-states-commerce-and",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "gbr-ind-tsi-2024",
    "date": "2024-07-24",
    "year": 2024,
    "title": "UK–India Technology Security Initiative semiconductor partnership",
    "participants": [
      "United Kingdom",
      "India"
    ],
    "participantIds": [
      "gbr",
      "ind"
    ],
    "mapPairs": [
      [
        "gbr",
        "ind"
      ]
    ],
    "type": "ecosystem",
    "scope": "broader-framework",
    "stages": [
      "design",
      "packaging",
      "research",
      "workforce",
      "materials",
      "supply_chain",
      "fabrication"
    ],
    "status": "implementation",
    "implementation": "The initiative established government coordination and recurring review mechanisms for a broad semiconductor partnership involving research, chip design and IP, compound semiconductors, advanced packaging, workforce, trade missions, manufacturing links, and supply-chain resilience.",
    "funding": "Not specified for the semiconductor pillar",
    "detail": "A broader technology-security initiative with a detailed semiconductor cooperation pillar spanning research, firms, skills, trade, and manufacturing supply chains.",
    "url": "https://www.gov.uk/government/publications/uk-india-technology-security-initiative-factsheet/uk-india-technology-security-initiative-factsheet",
    "lastVerified": "2026-08-02"
  },
  {
    "id": "usa-twn-investment-2026",
    "date": "2026-01-15",
    "year": 2026,
    "title": "U.S.–Taiwan Agreement on Semiconductor Trade and Investment",
    "participants": [
      "United States",
      "Taiwan"
    ],
    "participantIds": [
      "usa",
      "twn"
    ],
    "mapPairs": [
      [
        "usa",
        "twn"
      ]
    ],
    "type": "investment",
    "scope": "semiconductor-specific",
    "stages": [
      "investment",
      "fabrication",
      "supply_chain",
      "equipment"
    ],
    "status": "signed",
    "implementation": "AIT and TECRO signed an agreement linking semiconductor investment commitments, industrial clusters, supply-chain expansion, and U.S. treatment of Taiwan under semiconductor-related trade measures.",
    "funding": "At least USD 250 billion in new direct investment commitments by Taiwanese semiconductor and technology enterprises, with at least USD 250 billion in credit guarantees described by the official fact sheet.",
    "detail": "A large bilateral trade-and-investment arrangement focused on expanding semiconductor production and supply-chain capacity in the United States.",
    "url": "https://www.commerce.gov/news/fact-sheets/2026/01/fact-sheet-restoring-american-semiconductor-manufacturing-leadership",
    "lastVerified": "2026-08-02"
  }
];

  const oldJucipIndex = COOPERATION_DATA.findIndex((record) => record.id === 'usa-jpn-jucip-2024');
  const revisedJucipIndex = COOPERATION_DATA.findIndex((record) => record.id === revisedJucip.id);

  if (oldJucipIndex >= 0) COOPERATION_DATA.splice(oldJucipIndex, 1, revisedJucip);
  else if (revisedJucipIndex < 0) COOPERATION_DATA.push(revisedJucip);

  const existingIds = new Set(COOPERATION_DATA.map((record) => record.id));
  additions.forEach((record) => {
    if (!existingIds.has(record.id)) {
      COOPERATION_DATA.push(record);
      existingIds.add(record.id);
    }
  });

  COOPERATION_DATA.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  window.dispatchEvent(new CustomEvent('chip:cooperationdatachange', {
    detail: { records: COOPERATION_DATA.length }
  }));
})();
