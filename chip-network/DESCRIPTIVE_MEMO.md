# Semiconductor Cooperation, Trade Dependence, and Middle-Power Positioning

## Descriptive research memo for Release 4.1

**Data cutoff:** 31 July 2026  
**Cooperation records:** 21  
**Trade baseline:** CEPII BACI 2024

## Question

How do selected middle powers use cross-border semiconductor cooperation when their capabilities and dependencies are distributed across different stages of a fragmented value chain?

## Main descriptive finding

The cooperation data do not show a general movement toward full national semiconductor autonomy. They show a denser pattern of selective, stage-specific cooperation. Most agreements connect a selected middle power to an established semiconductor hub or external anchor for research, workforce development, supply-chain coordination, investment, equipment, or packaging. This pattern is more consistent with attempts to obtain access to missing capabilities than with replication of the full value chain.

This interpretation follows from the structure of the industry. Hillrichs and Wölfl divide semiconductor production into design, manufacturing, and assembly, testing, and packaging, while emphasizing that each stage depends on its own materials, equipment, services, and highly specialized inputs. Their trade analysis identifies different country leaders across final chips, equipment, and materials rather than one country controlling every stage. Goldberg et al. likewise emphasize that foreign direct investment, research collaboration, licensing, and other cross-border technology transfers have been central to the development of follower industries. Cooperation should therefore be treated as a potential channel of capability access, not as evidence that capability has already been transferred.

## Data structure

Release 4.1 includes 21 official cooperation records dated from 2021 to 2026. The records are coded by scope, type, value-chain stage, and implementation status.

### Scope

- Semiconductor-specific: 14
- Broader frameworks with an explicit semiconductor component: 7

### Cooperation type

- Ecosystem: 7
- Investment: 1
- Research: 7
- Resilience: 5
- Trusted Network: 1

### Implementation status

- Implementation: 7
- Open Call: 1
- Operational: 7
- Signed: 6

## Interpretation

### 1. Cooperation is concentrated around access to complementary capabilities

The records cluster around supply-chain resilience, research, ecosystem development, investment, and trusted-network coordination. This is substantively important because semiconductor capability is not a single national stock. Equipment, design software, fabrication know-how, materials, packaging, talent, and market access are controlled by different firms and jurisdictions. A country may therefore gain leverage in one stage while remaining dependent in another.

The EconPol report shows why an aggregate trade balance is insufficient. Korea, Taiwan, and China are major final-chip exporters, while the United States, Japan, Germany, and the Netherlands are especially important in equipment and selected upstream inputs. It also emphasizes that dependence is multilateral and often two-sided: a major chip importer may also control an upstream input, equipment category, market, or source of demand. Release 4.1 therefore keeps import concentration, product composition, and bilateral trade flows separate from qualitative capability claims.

### 2. Agreements should not be coded as capability outcomes

An agreement can create a forum, authorize collaboration, establish a working group, or announce an investment channel without producing a functioning fab, transferred process technology, or trained workforce. The Release 4.1 review therefore distinguishes signed, implementation, operational, and open-call statuses. It also corrects the Israel–Chips Joint Undertaking record: an open funded call is not an awarded project.

Goldberg et al. provide the strongest reason for this caution. They find that cross-border learning and technology transfer are important, but neither automatic nor inevitable. Firms can share knowledge through FDI, licensing, and collaboration, or they can restrict access to frontier technology. The website should thus describe cooperation instruments and documented implementation rather than infer technological upgrading from the existence of an agreement.

### 3. Trade centrality and cooperation centrality answer different questions

The 2026 chip-trade study by Fu and Ding finds a core–subcore–periphery structure, rising clustering, and changing communities. It uses weighted in-strength and out-strength, Louvain community detection, and QAP regression. Its findings suggest that political relations, investment, and technological distance are associated with changing trade links. But the authors also state that trade-only data cannot represent the fine-grained value chain or establish causal pathways.

For this project, trade centrality describes the scale and concentration of recorded physical flows. Cooperation centrality describes how often states appear in official arrangements. Neither measure by itself establishes productive capability, resilience, or political influence. Release 4.1 therefore treats them as separate descriptive layers.

### 4. Middle powers can act as bridges without escaping dependence

Fu and Ding describe Singapore and Israel as bridging hubs and show the growing role of Malaysia and Southeast Asia in the reorganization of chip trade. Gao, Ren, and Guercini theorize third-party actors as bridges across rival-country networks and distinguish dispersed from concentrated brokerage. These arguments are useful for identifying a research question, but the current website does not contain the firm-level or longitudinal data required to estimate geopolitical brokerage directly.

The defensible descriptive claim is narrower: some selected middle powers combine specialized capabilities, logistics, capital, research, or packaging functions with cooperation ties to multiple hubs. Whether this constitutes durable brokerage, selective alignment, or managed dependence requires additional longitudinal evidence.

## Measures for a future quantitative extension

A later quantitative version could calculate measures separately by product layer and year:

1. Weighted in-strength and out-strength.
2. Import and export HHI.
3. Effective number of partners.
4. Betweenness centrality.
5. HITS hub and authority scores.
6. Louvain community membership and modularity.
7. Dependence on the largest supplier and top three suppliers.
8. Robustness under targeted removal of high-centrality nodes.
9. Cross-layer exposure between materials, equipment, and final chips.

The risk-propagation paper demonstrates why cross-layer analysis matters: shocks may move through direct trade, regional clustering, and intermediary nodes, then propagate from upstream materials into downstream products. It also shows that uniform shock and tolerance assumptions can conceal country heterogeneity. Any simulation based on this website should therefore vary substitution capacity, partner diversity, and tolerance across countries rather than impose a common threshold.

## Limits

This release remains descriptive. The cooperation data are not a complete census of every intergovernmental, firm-level, university, or research relationship. Official announcements may overstate implementation. The trade data do not capture design services, licensing, ownership, domestic absorption, or the technological sophistication of products within the same HS code. The cooperation and trade layers also cover different periods, so the current release cannot estimate the effect of recent agreements on trade.

## Research extensions

A publishable extension would create a country-year dataset of semiconductor cooperation and test whether inherited trade dependence predicts the type of cooperation subsequently chosen. The temporal order would be explicit: lagged trade concentration and value-chain position would predict later agreements in research, investment, supply-chain resilience, or trusted-network coordination. A second extension would code the principal providing technology, finance, or market access and compare diversification across partners with deeper integration into one dominant ecosystem.

## Sources used for the measurement revision

- Bown, Chad P., and Dan Wang. 2024. “Semiconductors and Modern Industrial Policy.” *Journal of Economic Perspectives* 38(4): 81–110.
- Fu, Lei, and Xiangyi Ding. 2026. “Restructuring of the Global Chip Trade Network: Characteristic Evolution and Driving Factors.” *Systems* 14:149.
- Gao, Hongzhi, Monica Ren, and Simone Guercini. 2026. “Rethinking Liability of Origin and Network Strategy in Geopolitical Decoupling.” *Journal of International Management*.
- Goldberg, Pinelopi Koujianou, Réka Juhász, Nathan Lane, Giulia Lo Forte, and Jeff Thurk. 2026. “Industrial Policy in the Global Semiconductor Sector.” CESifo Working Paper 12495.
- Hillrichs, Dorothee, and Anita Wölfl. 2025. “Complexities and Dependencies in the Global Semiconductor Value Chain.” EconPol Policy Report 54.
- Ruck, Jan. 2026. “A Geoeconomic Fix? European Industrial Policy on Semiconductors Amidst Global Competition.” *Journal of Common Market Studies* 64(2):742–761.
- Zhu, Xianduo, Licheng Qiu, and Yongli Zhang. 2026. “Risk Propagation in Multi-Layer Supply Chain Networks of International Semiconductor Trade.” *International Review of Economics and Finance* 109:105381.
