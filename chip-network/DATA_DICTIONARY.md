# Data Dictionary: Middle Powers in the Global Semiconductor Network

Version: 4.1  
Release date: 2026-07-31  
Data cutoff: 2026-07-31

## Files

- `semiconductor-cooperation.csv`: audited official cooperation records through July 2026.
- `cooperation-data.js`: website representation generated from the cooperation CSV.
- `cooperation-source-audit.csv`: record-level audit decisions and corrections.
- `trade-country-indicators.csv`: country-level 2024 BACI indicators.
- `trade-bilateral-links.csv`: directed 2024 bilateral trade links among mapped entities.
- `trade-data.js`: website representation of the processed trade dataset.
- `country-sources.js`: country classifications and official profile sources.
- `evidence.js`: published firm-network findings used in the research section.
- `COUNTRY_PROFILE_AUDIT.md`: scope and remaining limits of the country-profile review.
- `LITERATURE_MEASUREMENT_NOTES.md`: measurement rules drawn from the 2024–2026 literature review.
- `DESCRIPTIVE_MEMO.md`: descriptive research memo based on the release.
- `validate_data.py`: structural and consistency checks.
- `build_cooperation_data.py`: deterministic CSV-to-JavaScript build.
- `release-manifest.json`: checksums for archive-package files.
- `CITATION.cff`: suggested citation metadata. No DOI is assigned.

## Semiconductor cooperation fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable record identifier. |
| `date` | ISO date | Date signed, adopted, announced, or opened, according to `event_basis`. |
| `year` | integer | Calendar year derived from `date`. |
| `title` | string | Official or concise title. |
| `participants` | semicolon-separated string | Named participants. |
| `participant_ids` | semicolon-separated string | Website entity identifiers. |
| `map_pairs` | semicolon-separated string | Bilateral pairs drawn on the map. Multilateral records may use several pairs for visualization. |
| `type` | categorical | `resilience`, `research`, `ecosystem`, `investment`, or `trusted_network`. |
| `scope` | categorical | `semiconductor-specific` or `broader-framework`. |
| `stages` | semicolon-separated categorical | Value-chain stages or functions explicitly addressed by the record. |
| `status` | categorical | `announced`, `signed`, `open_call`, `funded`, `implementation`, `operational`, `suspended`, or `superseded`. |
| `implementation` | string | Evidence used to code status. |
| `funding` | string | Officially stated funding or `Not specified`. |
| `detail` | string | Concise description of the cooperation. |
| `source_url` | URL | Official source for the underlying event. |
| `last_verified` | ISO date | Date of the record-level audit. |
| `date_precision` | categorical | `day`, `month`, or `year`; records the precision supported by the source. |
| `event_basis` | categorical string | What the date represents, such as signing, adoption, entry into force, or call opening. |
| `implementation_url` | URL or blank | Later official source supporting a status stronger than `signed`, when available. |
| `audit_note` | string | Correction, qualification, or reason for retaining the coding. |

### Cooperation types

- `resilience`: supply-chain security, transparency, crisis response, or resilience.
- `research`: R&D, technology exchange, standards, or joint research calls.
- `ecosystem`: industry links, talent, workforce, skills, or ecosystem building.
- `investment`: facilities, fabrication, packaging, infrastructure, or investment cooperation.
- `trusted_network`: trusted-technology, security, export-control, or aligned-network coordination.

### Cooperation scope

- `semiconductor-specific`: semiconductors are the central object of the record.
- `broader-framework`: semiconductors are an explicit component of a wider technology, industrial, or supply-chain framework.

### Cooperation status

- `announced`: publicly announced but not yet signed or implemented.
- `signed`: formally concluded, without stronger implementation evidence in the audited sources.
- `open_call`: applications are open; this is not an award or completed transfer of funds.
- `funded`: a specific award or funded program is documented.
- `implementation`: a working group, assessment, project, call, delegation, or comparable follow-on activity is documented.
- `operational`: a recurring institution, council, conference, or continuing program is documented.
- `suspended`: official evidence indicates activity has been paused.
- `superseded`: a later framework replaces the record.

The status codes describe documented institutional activity. They do not measure the quantity or quality of technology transferred, productive capacity created, or policy effectiveness.

## Country trade indicator fields

| Field | Description |
|---|---|
| `imports_usd`, `exports_usd`, `balance_usd` | Current U.S.-dollar values in the four-product basket. |
| `export_import_ratio` | Exports divided by imports. |
| `import_hhi`, `export_hhi` | Partner concentration measured as the sum of squared partner shares. |
| `effective_import_partners`, `effective_export_partners` | Reciprocal of HHI. |
| `import_top1_share`, `import_top3_share` | Share supplied by the largest one or three import partners. |
| `export_top1_share`, `export_top3_share` | Share purchased by the largest one or three export partners. |
| `import_partner_count`, `export_partner_count` | Number of observed partners. |
| `import_share_*` | Direct import share originating in the named anchor or regional aggregate. |

## Bilateral trade fields

| Field | Description |
|---|---|
| `year` | 2024. |
| `source` | Exporter entity identifier. |
| `target` | Importer entity identifier. |
| `value_usd` | Total value across the four product groups. |
| `dominant_group` | Largest product group in the bilateral link. |
| `integrated_circuits` | HS 8542 value. |
| `semiconductor_devices` | HS 8541 excluding photovoltaic cells and modules coded under 854142 and 854143. |
| `manufacturing_equipment` | HS 8486 value. |
| `wafers_materials` | HS 381800 value. |

## Country classifications

- `focal_middle_power`: focal case with an identifiable semiconductor role, policy agenda, or cooperation portfolio.
- `major_hub`: systemically important semiconductor hub treated separately from the focal cases.
- `external_anchor`: major market, policy, or production anchor used to interpret dependence and cooperation.

These are project categories, not official classifications or quantitative rankings.

## Measurement limits

Customs trade records physical cross-border flows. It does not directly measure design services, licensing, ownership, domestic absorption, production capacity, technological sophistication within an HS code, or indirect upstream dependence. Cooperation records document institutional arrangements, not realized capability transfer or causal effects. Country profile bullets are source-linked qualitative summaries and remain subject to the limitations recorded in `COUNTRY_PROFILE_AUDIT.md`.
