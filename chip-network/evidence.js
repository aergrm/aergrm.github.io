const FIRM_EVIDENCE_META = {
  year: 2025,
  publicationYear: 2026,
  updated: 'May 2026',
  sourceTitle: 'Reconstructing temporal multi-relational firm networks at scale using large language models: The case of the semiconductor industry',
  sourceUrl: 'https://arxiv.org/abs/2605.15842',
  note: 'The site summarizes findings reported in the paper. It does not reproduce the authors’ non-public firm-level edge list.'
};

const FIRM_COUNTRY_EVIDENCE = {
  usa: {
    brokerage: 'The United States has the highest average regional betweenness in the reported series, although the measure declines gradually.',
    reach: 'Average closeness rises after 2021, partly associated with NVIDIA’s increasing centrality.',
    finding: 'U.S.-based firms remain central to the reported network. Newly observed links between U.S. and Chinese firms decline in 2024–2025.',
    firms: ['NVIDIA', 'Intel', 'IBM', 'AMD']
  },
  eun: {
    brokerage: 'Average EU betweenness increases after 2019.',
    reach: 'Average closeness recovers after the 2020–2021 decline.',
    finding: 'EU-based firms gain brokerage importance in the regional results, while several selected firms shift toward U.S. partners.',
    firms: ['Infineon']
  },
  chn: {
    brokerage: 'Average Chinese betweenness increases after 2020.',
    reach: 'Average closeness recovers from its 2020–2021 low.',
    finding: 'Chinese firms become more central in the regional series while newly observed U.S.–China links decline in 2024–2025.',
    firms: []
  },
  twn: {
    brokerage: 'Average Taiwan betweenness recovers after 2020.',
    reach: 'Average closeness increases through 2025.',
    finding: 'TSMC’s betweenness increases from 2020 in the firm-level results.',
    firms: ['TSMC']
  },
  kor: {
    brokerage: 'Average South Korean betweenness partially recovers after 2020.',
    reach: 'Average closeness declines in the reported regional series.',
    finding: 'South Korea remains included among the major regional semiconductor networks, but the two centrality measures move in different directions.',
    firms: ['Samsung']
  },
  jpn: {
    brokerage: 'Average Japanese betweenness stabilizes and modestly recovers after 2021.',
    reach: 'Average closeness recovers through 2025.',
    finding: 'Japan remains a distinct regional network. Renesas and several selected U.S. firms show stronger Japan-oriented relationships in the latest period.',
    firms: ['Renesas']
  },
  gbr: {
    brokerage: 'The paper does not report a separate United Kingdom country average.',
    reach: 'The paper does not report a separate United Kingdom country average.',
    finding: 'ARM is more integrated with the U.S. network than with the EU in the reported firm-level comparison.',
    firms: ['ARM']
  },
  nld: {
    brokerage: 'The paper does not report a separate Netherlands country average.',
    reach: 'ASML’s firm-level closeness increases across the reported period.',
    finding: 'ASML appears in the paper’s selected firm-level centrality series.',
    firms: ['ASML']
  }
};

const FIRM_HUBS = [
  { firm: 'NVIDIA', country: 'United States', stage: 'AI accelerators and design', finding: 'Betweenness increases after 2022 and closeness also rises.' },
  { firm: 'TSMC', country: 'Taiwan', stage: 'Leading-edge fabrication', finding: 'Betweenness increases from 2020.' },
  { firm: 'ASML', country: 'Netherlands', stage: 'Lithography equipment', finding: 'Closeness increases across the reported period.' },
  { firm: 'ARM', country: 'United Kingdom', stage: 'Processor architecture and IP', finding: 'More integrated with the U.S. network than with the EU.' },
  { firm: 'Infineon', country: 'European Union', stage: 'Power and automotive semiconductors', finding: 'Maintains a strong EU orientation through 2024.' },
  { firm: 'Renesas', country: 'Japan', stage: 'Automotive and embedded chips', finding: 'Shows stronger Japan orientation in the reported comparison.' }
];
