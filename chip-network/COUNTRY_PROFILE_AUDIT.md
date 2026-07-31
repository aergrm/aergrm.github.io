# Country-profile source audit

Release 4.1, 31 July 2026

## What was checked

- Every mapped entity has at least one identified public source in `country-sources.js`.
- Country classifications are explicitly marked as project categories rather than official or numerical rankings.
- The interface presents capabilities and dependencies as qualitative summaries, not as scores.
- The literature review was used to test whether the profile structure is conceptually appropriate: design, manufacturing, assembly/testing/packaging, materials, equipment, research, capital, and infrastructure are distinct functions and should not be collapsed into one capability scale.

## What was not established

This release does **not** claim that every sentence in every country profile has been independently reproduced from a single source. The current sources are generally national strategies, public agencies, or sector descriptions, but some profile bullets synthesize more than one source and may be broader than the exact wording of any one document.

The following remain for a definitive claim-level audit:

1. Assign a source identifier to each individual capability and dependency bullet.
2. Record the publication date and last-access date of each source.
3. Distinguish observed operating capacity from announced projects, strategic plans, and policy targets.
4. Separate firm capability from state capability and from capacity physically located in the country.
5. Add an uncertainty field: `directly documented`, `supported synthesis`, or `provisional`.
6. Replace sources that are promotional or undated when a more specific official or primary source is available.

## Interpretation rule

A country’s trade scale, government ambition, cooperation portfolio, or presence of a major firm is not by itself evidence of full value-chain capability. Capability claims should identify the stage, actor, and evidence. Dependency claims should distinguish direct trade dependence from indirect upstream, technological, licensing, ownership, and market dependence.

## Release status

The profiles are suitable for descriptive exploration with visible source links. They are not yet a claim-level coded dataset and should not be used as an outcome variable or country ranking.
