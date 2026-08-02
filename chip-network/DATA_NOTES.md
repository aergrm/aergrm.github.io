# Chip-network data notes

## Canonical cooperation data

`cooperation-data.js`, together with the release-specific additions in `cooperation-data-extensions.js`, is the data source used by the current interactive application.

The older `COOPERATION` array in `data.js` is **deprecated**. It is retained only for backward compatibility with earlier prototypes and must not be updated, cited, or used for current agreement counts. New cooperation records must follow the schema used by `COOPERATION_DATA`: date, participants, map pairs, type, scope, value-chain stages, status, implementation evidence, funding, official source URL, and verification date.

Release 4.3.1 expands the displayed cooperation data from 21 to 31 records, corrects the start of the Japan–U.S. JUCIP semiconductor record to May 4, 2022, and adds official records involving the Quad, Taiwan, South Korea, Singapore, the United Kingdom, Vietnam, Canada, and India.

The extension file is idempotent: it replaces the older 2024 JUCIP entry, adds only records whose identifiers are not already present, sorts the combined dataset, and then asks the interface to rerender.
