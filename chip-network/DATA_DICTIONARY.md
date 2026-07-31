# Data Dictionary: Middle Powers in the Global Semiconductor Network

Version: 4.0  
Release date: 2026-07-31

## Files

- `semiconductor-cooperation.csv`: official cooperation records through July 2026.
- `cooperation-data.js`: JavaScript representation of the cooperation dataset.
- `trade-country-indicators.csv`: country-level 2024 BACI indicators.
- `trade-bilateral-links.csv`: directed 2024 bilateral trade links among mapped entities.
- `trade-data.js`: JavaScript representation of the processed trade dataset.
- `country-sources.js`: country classifications and official profile sources.
- `evidence.js`: published firm-network findings used in the research section.

## Semiconductor cooperation fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable record identifier. |
| `date` | ISO date | Date signed, announced, or formally adopted. |
| `year` | integer | Calendar year derived from `date`. |
| `title` | string | Official or concise agreement title. |
| `participants` | semicolon-separated string | Named participants. |
| `participant_ids` | semicolon-separated string | Website entity identifiers. |
| `map_pairs` | semicolon-separated string | Bilateral pairs drawn on the map. A multilateral record may have more than one pair. |
| `type` | categorical | `resilience`, `research`, `ecosystem`, `investment`, or `trusted_network`. |
| `scope` | categorical | `semiconductor-specific` or `broader-framework`. |
| `stages` | semicolon-separated categorical | Value-chain stages or functions addressed by the record. |
| `status` | categorical | `signed`, `funded`, `implementation`, `operational`, or `announced`. |
| `implementation` | string | Evidence used to code status. |
| `funding` | string | Officially stated funding or “Not specified.” |
| `detail` | string | Concise description of the cooperation. |
| `source_url` | URL | Official source. |
| `last_verified` | ISO date | Date the source and coding were last checked. |

### Cooperation types

- `resilience`: supply-chain security, transparency, crisis response, or resilience.
- `research`: research, development, technology exchange, or standards.
- `ecosystem`: industry links, talent, workforce, skills, or ecosystem building.
- `investment`: fabrication, packaging, facilities, infrastructure, or investment cooperation.
- `trusted_network`: trusted-technology, security, or aligned-network coordination.

### Cooperation scope

- `semiconductor-specific`: semiconductors are the central object of the agreement.
- `broader-framework`: semiconductors are an explicit component of a wider technology, industrial, or supply-chain framework.

### Cooperation status

- `signed`: an agreement or statement was formally signed, without stronger implementation evidence in the coded source.
- `funded`: specific funding or a funded program is documented.
- `implementation`: working groups, calls, projects, or other implementation activity is documented.
- `operational`: a continuing institution, recurring council, or active program is documented.
- `announced`: publicly announced but not yet signed or operational.

## Country trade indicator fields

| Field | Description |
|---|---|
| `imports_usd`, `exports_usd`, `balance_usd` | Current U.S.-dollar values in the four-product basket. |
| `export_import_ratio` | Exports divided by imports. |
| `import_hhi`, `export_hhi` | Herfindahl–Hirschman concentration across partners. |
| `effective_import_partners`, `effective_export_partners` | Reciprocal of HHI. |
| `import_top1_share`, `import_top3_share` | Share supplied by the largest one or three import partners. |
| `export_top1_share`, `export_top3_share` | Share purchased by the largest one or three export partners. |
| `import_partner_count`, `export_partner_count` | Number of observed partners. |
| `import_share_*` | Import share originating in the named anchor or regional aggregate. |

## Bilateral trade fields

| Field | Description |
|---|---|
| `year` | 2024. |
| `source` | Exporter entity identifier. |
| `target` | Importer entity identifier. |
| `value_usd` | Total value across the four product groups. |
| `dominant_group` | Largest product group in the bilateral link. |
| `integrated_circuits` | HS 8542 value. |
| `semiconductor_devices` | HS 8541 excluding 854142 and 854143. |
| `manufacturing_equipment` | HS 8486 value. |
| `wafers_materials` | HS 381800 value. |

## Country classifications

- `focal_middle_power`: a focal case with an identifiable semiconductor role, strategy, or cooperation portfolio.
- `major_hub`: a systemically important semiconductor hub treated separately from the focal middle-power category.
- `external_anchor`: a major external market, policy, or production anchor used to interpret dependence and cooperation.

These are analytical categories used by the project, not official classifications.
