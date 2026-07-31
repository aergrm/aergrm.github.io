const FIRM_EVIDENCE_META = {
  year: 2025,
  publicationYear: 2026,
  updated: 'May 2026',
  sourceTitle: 'Reconstructing temporal multi-relational firm networks at scale using large language models: The case of the semiconductor industry',
  sourceUrl: 'https://arxiv.org/abs/2605.15842',
  note: 'Published findings from a web-reconstructed network. The underlying derived data and code are available from the authors on request, not as an open downloadable dataset.'
};

const FIRM_COUNTRY_EVIDENCE = {
  usa: {
    trend: 'mixed', score: 100,
    brokerage: 'Highest among the reported regions, but gradually declining.',
    reach: 'Closeness rises markedly after 2021, partly driven by NVIDIA.',
    finding: 'The United States remains the leading brokerage location while becoming more tightly connected to the wider firm network.',
    firms: ['NVIDIA', 'Intel', 'IBM', 'AMD']
  },
  eun: {
    trend: 'rising', score: 76,
    brokerage: 'Average betweenness rises steadily after 2019.',
    reach: 'Closeness recovers after the 2020–2021 trough.',
    finding: 'EU-based firms gain brokerage importance even as several selected firms orient more strongly toward U.S. partners.',
    firms: ['Infineon']
  },
  chn: {
    trend: 'realigning', score: 67,
    brokerage: 'Average betweenness rises after 2020.',
    reach: 'Closeness recovers from its 2020–2021 low.',
    finding: 'Chinese firms become more central domestically and regionally while newly observed U.S.–China firm links contract sharply in 2024–2025.',
    firms: []
  },
  twn: {
    trend: 'rising', score: 64,
    brokerage: 'Average betweenness recovers after 2020.',
    reach: 'Closeness increases through 2025.',
    finding: 'Taiwan’s importance is reinforced by TSMC, whose betweenness rises continuously from 2020 with the AI-compute boom.',
    firms: ['TSMC']
  },
  kor: {
    trend: 'mixed', score: 48,
    brokerage: 'Average betweenness partially recovers after 2020.',
    reach: 'Average closeness declines in the published regional series.',
    finding: 'South Korea remains an important firm-network location, but its two centrality dimensions move in different directions.',
    firms: ['Samsung']
  },
  jpn: {
    trend: 'recovering', score: 45,
    brokerage: 'Average betweenness stabilizes and modestly recovers after 2021.',
    reach: 'Closeness recovers through 2025.',
    finding: 'Japan remains a distinct regional pole; Renesas and some U.S. firms show stronger Japan-oriented relationships in the latest period.',
    firms: ['Renesas']
  },
  gbr: {
    trend: 'aligned', score: 31,
    brokerage: 'A separate country average is not reported.',
    reach: 'A separate country average is not reported.',
    finding: 'ARM is consistently more integrated with the U.S. network than with the EU, although its firm-level betweenness declines.',
    firms: ['ARM']
  },
  nld: {
    trend: 'specialized', score: 35,
    brokerage: 'A separate Netherlands average is not reported.',
    reach: 'ASML’s firm-level closeness rises across the period.',
    finding: 'The Netherlands remains represented by a highly specialized equipment chokepoint rather than a broad country-level firm network.',
    firms: ['ASML']
  }
};

const FIRM_RELATIONS = [
  { source: 'usa', target: 'chn', type: 'contraction', label: 'New U.S.–China firm links decrease sharply in 2024–2025.' },
  { source: 'usa', target: 'twn', type: 'ai', label: 'NVIDIA–TSMC intermediation becomes more central with AI demand.' },
  { source: 'gbr', target: 'usa', type: 'orientation', label: 'ARM remains more U.S.-integrated than EU-integrated.' },
  { source: 'eun', target: 'usa', type: 'orientation', label: 'Selected firms shift toward U.S. relative to EU links.' },
  { source: 'jpn', target: 'usa', type: 'mixed', label: 'Renesas, Intel, and IBM show stronger Japan orientation in the latest period.' }
];

const FIRM_HUBS = [
  { firm: 'NVIDIA', country: 'usa', stage: 'AI accelerators and design', trend: 'Rising sharply', evidence: 'Betweenness rises from 2022 and closeness also increases.' },
  { firm: 'TSMC', country: 'twn', stage: 'Leading-edge fabrication', trend: 'Rising', evidence: 'Betweenness rises continuously from 2020.' },
  { firm: 'ASML', country: 'nld', stage: 'Lithography equipment', trend: 'More reachable', evidence: 'Closeness rises, consistent with equipment-system integration.' },
  { firm: 'ARM', country: 'gbr', stage: 'Processor architecture and IP', trend: 'U.S.-aligned', evidence: 'More integrated with the U.S. network than with the EU.' },
  { firm: 'Infineon', country: 'eun', stage: 'Power and automotive semiconductors', trend: 'EU-oriented', evidence: 'Maintains a strong EU orientation through 2024.' },
  { firm: 'Renesas', country: 'jpn', stage: 'Automotive and embedded chips', trend: 'Japan-oriented', evidence: 'Shifts toward Japan in the regional-orientation comparison.' }
];
