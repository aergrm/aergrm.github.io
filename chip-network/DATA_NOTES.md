# Chip-network data notes

## Canonical cooperation data

`cooperation-data.js`, together with the release-specific additions in `cooperation-data-extensions.js`, `cooperation-data-release-4-3-2.js`, `cooperation-data-release-4-3-3.js`, and `cooperation-data-release-4-3-4.js`, is the data source used by the current interactive application.

The older `COOPERATION` array in `data.js` is **deprecated**. It is retained only for backward compatibility with earlier prototypes and must not be updated, cited, or used for current agreement counts. New cooperation records must follow the schema used by `COOPERATION_DATA`: date, participants, map pairs, type, scope, value-chain stages, status, implementation evidence, funding, official source URL, and verification date.

Release 4.3.1 expanded the displayed cooperation data from 21 to 31 records, corrected the start of the Japan–U.S. JUCIP semiconductor record to May 4, 2022, and added official records involving the Quad, Taiwan, South Korea, Singapore, the United Kingdom, Vietnam, Canada, and India.

Release 4.3.2 expanded the displayed cooperation data from 31 to 39 records. It added official records for the U.S.–Singapore Partnership for Growth and Innovation, Japan–Canada industrial science and technology cooperation, Vietnam–Japan semiconductor research, the U.S.–UAE AI Acceleration Partnership, Malaysia–Netherlands semiconductor cooperation, Korea–UAE AI and semiconductor cooperation, the U.S.–Saudi Strategic AI Partnership, and India–Vietnam digital technology cooperation.

Release 4.3.3 expanded the displayed cooperation data from 39 to 47 records. It added the EU–Japan Memorandum of Cooperation on Semiconductors, the UK–Taiwan Enhanced Trade Partnership semiconductor track, India–France Horizon 2047 strategic-technology cooperation, the U.S.–India TRUST initiative, the France–UAE AI Framework Agreement, the Singapore–Vietnam Comprehensive Strategic Partnership, the announced India–Malaysia structured semiconductor cooperation process, and the industry-led India–Singapore semiconductor corridor.

Release 4.3.4 expands the displayed cooperation data from 47 to 55 records. It adds the Quad Semiconductor Supply Chains Contingency Network, the G7 Semiconductors Point of Contact Group, the Canada–Germany Joint Declaration of Intent on Semiconductor Cooperation, the Australia–Canada–India Technology and Innovation Partnership, the Canada–Taiwan joint semiconductor and AI research program, the UK–Taiwan Semiconductor Joint Skills Project, Japan–Singapore Strategic Partnership semiconductor cooperation, and the Taiwan–Japan NSTC–RIKEN semiconductor research program.

Release 4.3.4 also updates implementation evidence for EU–Japan semiconductor cooperation, EU–India semiconductor cooperation, and EU–Republic of Korea joint chip research. It adds the European Union to the Pax Silica record following the Commission's June 25, 2026 signature. Germany is represented by the EU anchor on the map because the current visualization does not contain a separate German node. The G7 record similarly uses the EU anchor to represent continental European members that do not have separate map nodes.

All extension files are idempotent: they add only records whose identifiers are not already present, sort the combined dataset, and ask the interface to rerender. Each public expansion is retained in a separate release layer so its provenance remains auditable.
