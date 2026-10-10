# Semiconductor cooperation audit — proposed release 4.3.7

Prepared 2026-10-10. This review is isolated on a branch and is **not yet merged into the public website**.

## Counting rule

One documented signed instrument or distinguishable formally announced cooperation framework is one record. Subsequent ministerial meetings, announcements, implementations, or mirrored press releases are evidence for that same instrument. Government agreements and public-agency or industry-association agreements are retained but marked using `actorLevel` for stratified research analysis. A document that refers to a sector only as a prospective investment opportunity is not automatically a semiconductor agreement.

## Record reconciliation

- Previous website release 4.3.6 — 74 coded records.
- Remove three confirmed duplicate observations — can-deu-2026 -> can-deu-semiconductor-jdoi-2026; aciti-2026 -> aciti-aus-can-ind-2026; usa-twn-trade-investment-semiconductors-2026 -> usa-twn-investment-2026.
- Add ten newly corroborated instruments — usa-ury-critical-emerging-technologies-2024; jpn-usa-jetro-nycreates-2024; sgp-nld-edb-bom-2025; jpn-twn-jetro-taitra-kyushu-2025; usa-gbr-technology-prosperity-deal-2025; usa-jpn-technology-prosperity-deal-2025; jpn-usa-jetro-arizona-2026; ind-ita-innovit-semiconductors-2026; fra-kor-ai-semiconductor-quantum-mou-2026; sgp-nld-ssia-bom-semiconductor-2026.
- Proposed total — **81 distinct records**, including five government-level declarations/MoUs and five agency/institutional agreements among the additions.
- The 2025 India–Malaysia entry receives supplementary February 2026 evidence. It is not reclassified as a signed state-to-state semiconductor MoU.
- The July 2026 ACITI agreement remains **signed** pending evidence that the working group has actually met.

## Known limitations

The 81 includes broader-framework records and agency-level agreements; it is not a count of 81 separate downloadable full-text treaty documents. Formal publication of the original instrument is not established in every case; some evidence comes from official press releases. Uruguay lacks an anchor in the current map, so that entry is present in records and the table without inventing a geographic connection. France and Italy use the existing European Union anchor in the website, which is a visualization simplification, not a coding of their agreements as EU agreements.

The `semiconductor-cooperation.csv` file on the existing main branch only contains the original 21 rows. The new `semiconductor-cooperation-master-4-3-7.csv` consolidates all incremental JavaScript releases; continue maintaining the latter as the preferred canonical input after review.

## Deferred or excluded

- Australia–India PACTS (2026) — official framework does not specify semiconductors.
- U.S.–Korea Technology Prosperity Deal (2025) — no direct semiconductor provision.
- U.S.–Sweden Technology Prosperity Deal (2026) — semiconductor supply chains appear as a beneficiary of proposed advanced-materials work, not a direct semiconductor field.
- JETRO–MIDA–MATRADE cooperation (2025) — general trade and investment, without semiconductor-specific commitments in the documented MoCs.
- India–Taiwan university agreements (September 2026) — may enter a separate university-level layer after verifying exact parties and agreement dates.

See `cooperation-document-evidence-2026-10-10.csv` for official source URLs, decisions, and the reason for every included or deferred new candidate.
