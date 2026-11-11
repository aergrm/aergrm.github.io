# Data Dictionary: Middle Powers in the Global Semiconductor Network

Current cooperation master: Release 4.3.7  
Master dataset release: 2026-10-10  
Cooperation event cutoff: 2026-10 (through September 24 in the present records)  
Earlier trade baseline and profile components retain their separate dates.

## Files

- `semiconductor-cooperation-master-4-3-7.csv`: current 81-record cooperation master dataset, spanning 2021–October 2026 as the release coverage window. Latest recorded event: September 24, 2026.
- `semiconductor-cooperation.csv`: historical 21-record input from release 4.1, not the current master.
- `cooperation-data.js` and `cooperation-data-extensions.js`: historical base and extensions. `cooperation-data-release-4-3-2.js` through `cooperation-data-release-4-3-7.js` extend and correct these records for the live site.
- `cooperation-document-evidence-2026-10-10.csv`: official-source review for newly included and excluded candidate records.
- `COOPERATION_AUDIT_2026_10_10.md`: counting rules and removal of duplicate observations.
- `cooperation-source-audit.csv`: record-level source notes and corrections.
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

## Semiconductor cooperation fields (Release 4.3.7 master)

Each row represents one formally documented cooperation arrangement. A later meeting or implementation announcement is not counted as a new arrangement. The 81 rows include 35 semiconductor-specific agreements and 46 broader frameworks with explicit semiconductor provisions.

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique record identifier. |
| `date` | ISO date | Reported date of the underlying agreement, framework, or formal announcement, as supported by the cited source. |
| `year` | integer | Calendar year derived from `date`. |
| `title` | string | Agreement or arrangement title. |
| `participants` | semicolon-separated string | Named participating countries or institutions. |
| `participant_ids` | semicolon-separated string | Internal three-letter country or website identifiers. |
| `map_pairs` | semicolon-separated string | Map links for visualization, when a country map anchor exists. They do not add records. |
| `type` | categorical | `resilience`, `research`, `ecosystem`, `investment`, or `trusted_network`. |
| `scope` | categorical | `semiconductor-specific` or `broader-framework`. |
| `stages` | semicolon-separated string | Explicit cooperation functions, such as research, fabrication, supply chains, or workforce. |
| `status` | categorical | Officially documented implementation stage (see definitions below). |
| `actor_level` | string or blank | Government, agency, or industry category for new entries. Blank on older records does **not** imply government level. |
| `document_type` | string or blank | Type of instrument for new entries, when recorded. Blank on older records does not establish document type. |
| `implementation` | string | Officially supported activity or follow-on evidence. |
| `funding` | string | Officially documented amounts or `Not specified`. |
| `detail` | string | Concise record description. |
| `source_url` | URL | Principal government or institutional source supporting the record. |
| `supplemental_source_urls` | semicolon-separated URLs | Additional evidence where separately available. |
| `last_verified` | ISO date | Last source verification date recorded for this entry; these dates vary by entry. |
| `source_release` | string | Incremental source file in which the record first appeared. |

**Historical schema.** The original 4.1 CSV contains additional fields such as `date_precision`, `event_basis`, `implementation_url`, and `audit_note`. Those fields are not part of the 20-column consolidated 4.3.7 master and must not be inferred for records where they were never coded.

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
- `signed`: formally concluded, without stronger implementation evidence in the reviewed sources.
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

- **Selected middle powers:** countries chosen as the project’s principal middle-power cases because they have an identifiable semiconductor role, policy agenda, or cooperation portfolio.
- **Major semiconductor hubs:** systemically important hubs treated separately from the selected middle-power cases.
- **External anchors:** major markets, policy actors, or production centers used to interpret dependence and cooperation.

These are project categories, not official classifications or quantitative rankings. “Selected” describes the study sample; it is not presented as a separate theoretical type of middle power.

## Measurement limits

Customs trade records physical cross-border flows. It does not directly measure design services, licensing, ownership, domestic absorption, production capacity, technological sophistication within an HS code, or indirect upstream dependence. Cooperation records document institutional arrangements, not realized capability transfer or causal effects. Country profile bullets are source-linked qualitative summaries and remain subject to the limitations recorded in `COUNTRY_PROFILE_AUDIT.md`.
