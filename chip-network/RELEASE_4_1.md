# Release 4.1 validation package

**Release date:** 31 July 2026  
**Data cutoff:** 31 July 2026  
**Frozen predecessor:** branch `archive-chip-network-v4-0` preserves the exact Release 4.0 code state.

Release 4.1 adds a record-level cooperation audit, corrected event coding, deterministic data generation, automated structural validation, an archive-ready citation package, literature-based measurement rules, a country-profile audit statement, and a descriptive research memo.

## Corrections from Release 4.0

- The India–Netherlands partnership is dated to December 2025 and renamed `ind-nld-2025`; the source supports month-level rather than day-level precision.
- The Israel–Chips Joint Undertaking item is coded as an `open_call`, not a funded award.
- The Canada–Germany signing date is corrected to 29 June 2026.
- Several records move from `signed` to `implementation` or `operational` where a separate official follow-on source documents activity.
- Event-date basis, date precision, implementation source, and an audit note are added to every cooperation record.

## Measurement revisions from the literature review

- Trade is treated as a physical-flow baseline, not a direct measure of technological capability.
- Materials, equipment, final chips, design, and services should be analyzed separately where data permit.
- Dependence can be indirect, multilateral, two-sided, and stage-specific.
- Cooperation may create a channel for FDI, research, licensing, training, or technology transfer, but transfer and upgrading are not automatic.
- Weighted centrality, HHI, effective partners, brokerage, HITS, communities, and cross-layer exposure are retained as distinct measures rather than collapsed into one score.

## Archive-ready files

- `semiconductor-cooperation.csv`
- `cooperation-source-audit.csv`
- `trade-country-indicators.csv`
- `trade-bilateral-links.csv`
- `DATA_DICTIONARY.md`
- `COUNTRY_PROFILE_AUDIT.md`
- `DESCRIPTIVE_MEMO.md`
- `LITERATURE_MEASUREMENT_NOTES.md`
- `TESTING_CHECKLIST.md`
- `CITATION.cff`
- `release-manifest.json`
- `build_cooperation_data.py`
- `validate_data.py`

A DOI has not been assigned. Deposit to OSF or Zenodo remains an external publishing step. Cross-browser and first-time-user testing remain manual tasks listed in `TESTING_CHECKLIST.md`.
