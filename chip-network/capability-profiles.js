// Curated public-facing case profiles for Release 4.2.
// This is not a complete firm census and is intentionally limited to representative entities.
const CAPABILITY_PROFILE_META = {
  version: '4.2',
  cutoff: '2026-08-01',
  note: 'Representative firms and institutions for India, Malaysia, and Canada. Entries distinguish headquarters, facility location, ownership, value-chain role, and operational status.'
};

const CAPABILITY_PROFILES = {
  ind: {
    country: 'India',
    pathway: 'Diversifying capability access under concentrated import dependence',
    summary: 'India combines a large design and engineering base with a rapidly expanding portfolio of fabrication and assembly projects. Most new manufacturing capacity still depends on foreign technology partners, imported equipment, and external intellectual property.',
    possesses: [
      'Large semiconductor-design and engineering workforce',
      'Growing assembly, testing, marking, and packaging capacity',
      'Major domestic market and public subsidy capacity',
      'Emerging wafer-fabrication projects in several states'
    ],
    dependsOn: [
      'Imported integrated circuits, manufacturing equipment, and materials',
      'Foreign process technology and implementation partners',
      'External design software, intellectual property, and advanced-node know-how',
      'Successful completion and commercial ramp-up of newly approved facilities'
    ],
    cooperationResponse: [
      'Use partnerships with the United States, Japan, the European Union, Singapore, and the Netherlands to access complementary capabilities',
      'Link domestic incentives to technology-transfer, workforce, and supplier-development channels',
      'Diversify across fabrication, packaging, equipment, materials, and research rather than relying on one provider'
    ],
    entities: [
      {
        name: 'Micron Technology India',
        entityType: 'Foreign-owned operating facility',
        headquarters: 'United States',
        location: 'Sanand, Gujarat',
        stages: ['Packaging and testing'],
        status: 'Operational',
        role: 'Assembly and test facility converting imported DRAM and NAND wafers into finished memory and storage products.',
        sourceLabel: 'Micron: opening of the Sanand assembly and test facility',
        sourceUrl: 'https://investors.micron.com/news-releases/news-release-details/micron-celebrates-opening-indias-first-semiconductor-assembly',
        sourceDate: '2026-02-28',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Tata Electronics / Tata Semiconductor Manufacturing',
        entityType: 'Indian-headquartered project with foreign technology partner',
        headquarters: 'India',
        location: 'Dholera, Gujarat',
        stages: ['Fabrication'],
        status: 'Under implementation',
        role: 'Planned semiconductor fab developed with Powerchip Semiconductor Manufacturing Corporation technology partnership.',
        sourceLabel: 'Government of India: approved semiconductor projects',
        sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2223049&lang=1&reg=3',
        sourceDate: '2026-02-04',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Tata Semiconductor Assembly and Test',
        entityType: 'Indian-headquartered project',
        headquarters: 'India',
        location: 'Morigaon, Assam',
        stages: ['Packaging and testing'],
        status: 'Under implementation',
        role: 'Large assembly and test project intended to use indigenous packaging technologies.',
        sourceLabel: 'Government of India: approved semiconductor projects',
        sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2223049&lang=1&reg=3',
        sourceDate: '2026-02-04',
        lastVerified: '2026-08-01'
      },
      {
        name: 'CG Semi',
        entityType: 'Indian joint venture with foreign technology partners',
        headquarters: 'India',
        location: 'Sanand, Gujarat',
        stages: ['Packaging and testing'],
        status: 'Pilot operational; expansion under implementation',
        role: 'OSAT project developed with Renesas and Stars Microelectronics; an end-to-end pilot line has been launched.',
        sourceLabel: 'Government of India: semiconductor project status',
        sourceUrl: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155130&id=155130&lang=2&reg=3',
        sourceDate: '2025-09-01',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Kaynes Semicon',
        entityType: 'Indian-headquartered project with foreign technology providers',
        headquarters: 'India',
        location: 'Sanand, Gujarat',
        stages: ['Packaging and testing'],
        status: 'Pilot operational; expansion under implementation',
        role: 'OSAT facility focused on wire-bond interconnect and substrate-based packages.',
        sourceLabel: 'Government of India: semiconductor project status',
        sourceUrl: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155130&id=155130&lang=2&reg=3',
        sourceDate: '2025-09-01',
        lastVerified: '2026-08-01'
      },
      {
        name: 'HCL–Foxconn joint venture',
        entityType: 'India–Taiwan joint-venture project',
        headquarters: 'India / Taiwan',
        location: 'Jewar, Uttar Pradesh',
        stages: ['Fabrication', 'Packaging and testing'],
        status: 'Under implementation',
        role: 'Approved semiconductor project intended to manufacture display-driver chips and related products.',
        sourceLabel: 'Government of India: approved semiconductor projects',
        sourceUrl: 'https://www.pib.gov.in/FactsheetDetails.aspx?Id=149242&lang=1&reg=1',
        sourceDate: '2025-08-01',
        lastVerified: '2026-08-01'
      }
    ]
  },

  mys: {
    country: 'Malaysia',
    pathway: 'Protecting and upgrading an embedded manufacturing role',
    summary: 'Malaysia possesses a mature manufacturing, packaging, and testing ecosystem with both multinational and domestic firms. Its position is commercially important but remains dependent on foreign-owned technology, upstream equipment and intellectual property, and access to external customers.',
    possesses: [
      'Long-established assembly, packaging, and testing clusters',
      'Operational wafer-fabrication capacity in selected technologies',
      'Domestic OSAT firms and a broad multinational manufacturing base',
      'Public research, prototyping, and workforce-development infrastructure'
    ],
    dependsOn: [
      'Foreign ownership and strategic decisions by multinational firms',
      'Imported equipment, design tools, intellectual property, and leading-edge process technology',
      'External demand from global chip designers and electronics producers',
      'Continued upgrading from conventional back-end functions into advanced packaging, design, and materials'
    ],
    cooperationResponse: [
      'Use supply-chain and trusted-partner frameworks to preserve market access and crisis coordination',
      'Develop local vendors around major multinational facilities',
      'Move toward advanced packaging, silicon carbide, design services, and higher-value testing functions'
    ],
    entities: [
      {
        name: 'Intel Malaysia',
        entityType: 'Foreign-owned operating network',
        headquarters: 'United States',
        location: 'Penang and Kulim',
        stages: ['Design', 'Packaging and testing', 'Research'],
        status: 'Operational',
        role: 'High-technology manufacturing, design and development, shared services, and semiconductor-related research activities.',
        sourceLabel: 'MIDA: Intel Microelectronics in Malaysia',
        sourceUrl: 'https://www.mida.gov.my/success-stories/intel-microelectronics/',
        sourceDate: '2026-07-25',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Infineon Technologies Malaysia',
        entityType: 'Foreign-owned operating network',
        headquarters: 'Germany',
        location: 'Kulim, Kedah and Melaka',
        stages: ['Fabrication', 'Packaging and testing', 'Research'],
        status: 'Operational',
        role: 'Integrated front-end and back-end manufacturing, including an operating 200 mm silicon-carbide power-semiconductor fab in Kulim.',
        sourceLabel: 'MIDA: Infineon operations and vendor-development programme',
        sourceUrl: 'https://www.mida.gov.my/media-release/139-malaysian-companies-to-benefit-from-mida-and-infineons-vendor-development-programme-creating-a-more-resilient-semiconductor-ecosystem-in-malaysia/',
        sourceDate: '2025-01-15',
        lastVerified: '2026-08-01'
      },
      {
        name: 'ASE Malaysia',
        entityType: 'Foreign-owned operating facility',
        headquarters: 'Taiwan',
        location: 'Bayan Lepas, Penang',
        stages: ['Packaging and testing'],
        status: 'Operational',
        role: 'High-volume semiconductor packaging, testing, module assembly, and advanced-packaging services.',
        sourceLabel: 'ASE: Malaysia manufacturing facilities',
        sourceUrl: 'https://ase.aseglobal.com/about-ase/manufacturing-facilities/ase-malaysia/',
        sourceDate: '2026-07-25',
        lastVerified: '2026-08-01'
      },
      {
        name: 'SilTerra Malaysia',
        entityType: 'Malaysia-based operating foundry',
        headquarters: 'Malaysia',
        location: 'Kulim, Kedah',
        stages: ['Fabrication', 'Design support'],
        status: 'Operational',
        role: '200 mm semiconductor foundry offering CMOS logic, high-voltage, mixed-signal, RF, and MEMS fabrication and design support.',
        sourceLabel: 'MATRADE: SilTerra company profile',
        sourceUrl: 'https://www.matrade.gov.my/en/source-from-malaysia/directories/malaysian-brands/silterra',
        sourceDate: '2026-07-25',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Inari Amertron',
        entityType: 'Malaysian-headquartered operating company',
        headquarters: 'Malaysia',
        location: 'Penang and other Malaysian sites',
        stages: ['Packaging and testing'],
        status: 'Operational',
        role: 'Outsourced semiconductor assembly and test services for RF, optoelectronics, sensors, and custom integrated circuits.',
        sourceLabel: 'Inari Amertron: company profile',
        sourceUrl: 'https://www.inari-amertron.com/about-us/',
        sourceDate: '2026-07-01',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Unisem',
        entityType: 'Malaysian-headquartered operating company',
        headquarters: 'Malaysia',
        location: 'Ipoh, Perak',
        stages: ['Packaging and testing'],
        status: 'Operational',
        role: 'Turnkey semiconductor assembly, wafer probing and bumping, packaging, final test, and failure-analysis services.',
        sourceLabel: 'Unisem: company and operations profile',
        sourceUrl: 'https://www.unisemgroup.com/company-info/',
        sourceDate: '2026-07-25',
        lastVerified: '2026-08-01'
      },
      {
        name: 'MIMOS Semiconductor Technology Centre',
        entityType: 'Public research and shared-facility institution',
        headquarters: 'Malaysia',
        location: 'Kuala Lumpur',
        stages: ['Research', 'Fabrication', 'Design support', 'Workforce'],
        status: 'Operational',
        role: 'Shared 200 mm fabrication, prototyping, testing, design support, failure analysis, and semiconductor training infrastructure.',
        sourceLabel: 'MIMOS: Semiconductor Technology Centre',
        sourceUrl: 'https://www.mimos.my/services/semiconductor-technology-centre/',
        sourceDate: '2026-07-10',
        lastVerified: '2026-08-01'
      }
    ]
  },

  can: {
    country: 'Canada',
    pathway: 'Building specialized research, photonics, sensor, and packaging niches',
    summary: 'Canada has specialized assets in advanced packaging, image sensors, photonics, compound semiconductors, research access, and commercialization infrastructure. It lacks comparable high-volume leading-edge logic and memory fabrication and relies heavily on the United States and other foreign ecosystems for scale, equipment, and markets.',
    possesses: [
      'Advanced packaging and testing capacity in Quebec',
      'Specialized image-sensor, MEMS, photonics, and compound-semiconductor facilities',
      'National research, design-tool, prototyping, and multi-project-wafer access networks',
      'Homegrown firms in silicon photonics and advanced interconnect technologies'
    ],
    dependsOn: [
      'Foreign high-volume logic and memory fabrication',
      'Imported manufacturing equipment, design software, and process technology',
      'United States market access and North American production networks',
      'Commercial scale-up and customer adoption beyond research prototypes'
    ],
    cooperationResponse: [
      'Deepen North American integration while building specialized domestic nodes',
      'Use allied research partnerships to connect laboratories to fabrication, packaging, and customers',
      'Concentrate public support on photonics, compound semiconductors, sensors, advanced packaging, and commercialization'
    ],
    entities: [
      {
        name: 'IBM Canada Bromont',
        entityType: 'Foreign-owned operating facility',
        headquarters: 'United States',
        location: 'Bromont, Quebec',
        stages: ['Packaging and testing', 'Research'],
        status: 'Operational; expansion under implementation',
        role: 'One of North America’s largest chip assembly and testing facilities, with expanding advanced-packaging and commercialization capabilities.',
        sourceLabel: 'Government of Canada: IBM Canada and C2MI investment',
        sourceUrl: 'https://www.canada.ca/en/innovation-science-economic-development/news/2025/11/canada-invests-in-the-semiconductor-sector-in-partnership-with-ibm-canada-and-c2mi.html',
        sourceDate: '2025-11-28',
        lastVerified: '2026-08-01'
      },
      {
        name: 'MiQro Innovation Collaborative Centre (C2MI)',
        entityType: 'Canadian research and commercialization centre',
        headquarters: 'Canada',
        location: 'Bromont, Quebec',
        stages: ['Research', 'Packaging and testing', 'MEMS', 'Commercialization'],
        status: 'Operational; expansion under implementation',
        role: 'Open collaborative infrastructure for MEMS, advanced packaging, quantum devices, analytical services, and commercialization.',
        sourceLabel: 'Government of Canada: IBM Canada and C2MI investment',
        sourceUrl: 'https://www.canada.ca/en/innovation-science-economic-development/news/2025/11/canada-invests-in-the-semiconductor-sector-in-partnership-with-ibm-canada-and-c2mi.html',
        sourceDate: '2025-11-28',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Teledyne DALSA Semiconductor',
        entityType: 'Foreign-owned operating fabs',
        headquarters: 'United States',
        location: 'Bromont, Quebec and Edmonton, Alberta',
        stages: ['Fabrication', 'Sensors', 'MEMS'],
        status: 'Operational; equipment upgrade under implementation',
        role: 'Specialized wafer fabrication for image sensors, CCD technology, MEMS, and other products, with access for Canadian SMEs and research centres.',
        sourceLabel: 'Government of Canada: Teledyne semiconductor investment',
        sourceUrl: 'https://www.canada.ca/en/innovation-science-economic-development/news/2025/03/canada-to-invest-in-teledyne-to-further-advance-canadas-semiconductor-industry.html',
        sourceDate: '2025-03-21',
        lastVerified: '2026-08-01'
      },
      {
        name: 'CMC Microsystems / FABrIC',
        entityType: 'Canadian not-for-profit research-access network',
        headquarters: 'Canada',
        location: 'National network',
        stages: ['Design', 'Research', 'Prototyping', 'Packaging access'],
        status: 'Operational',
        role: 'Provides design tools, fabrication and multi-project-wafer access, testing, packaging, training, and commercialization support.',
        sourceLabel: 'Government of Canada: FABrIC investment',
        sourceUrl: 'https://www.canada.ca/en/innovation-science-economic-development/news/2024/07/government-of-canada-supporting-manufacturing-and-commercialization-of-semiconductors.html',
        sourceDate: '2024-07-04',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Canadian Photonics Fabrication Centre',
        entityType: 'Public operating fabrication facility; commercial spin-off in preparation',
        headquarters: 'Canada',
        location: 'Ottawa, Ontario',
        stages: ['Compound-semiconductor fabrication', 'Photonics', 'Testing'],
        status: 'Operational; spin-off process announced',
        role: 'End-to-end compound-semiconductor facility producing and testing photonic wafers and integrated photonic devices.',
        sourceLabel: 'National Research Council Canada: photonics fabrication initiative',
        sourceUrl: 'https://www.canada.ca/en/national-research-council/news/2026/05/advancing-canadas-capacity-in-photonic-semiconductors-and-ai-innovation.html',
        sourceDate: '2026-05-04',
        lastVerified: '2026-08-01'
      },
      {
        name: 'Ranovus',
        entityType: 'Canadian-headquartered operating company',
        headquarters: 'Canada',
        location: 'Ottawa, Ontario',
        stages: ['Design', 'Silicon photonics', 'Advanced interconnects'],
        status: 'Operational; scale-up under implementation',
        role: 'Develops silicon-photonics interconnect technology for artificial-intelligence and data-centre systems.',
        sourceLabel: 'Government of Canada: Ranovus semiconductor investment',
        sourceUrl: 'https://www.canada.ca/en/innovation-science-economic-development/news/2023/03/government-of-canada-invests-in-ranovus-to-further-advance-canadas-semiconductor-industry.html',
        sourceDate: '2023-03-27',
        lastVerified: '2026-08-01'
      }
    ]
  }
};
