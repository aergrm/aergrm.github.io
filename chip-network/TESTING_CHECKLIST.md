# Release 4.1 testing checklist

## Automated checks included

- [x] Cooperation CSV has the required columns.
- [x] Record IDs are unique.
- [x] Dates and verification dates are valid and do not exceed the release cutoff.
- [x] Year matches the event date.
- [x] Types, scopes, statuses, and stages use the codebook categories.
- [x] Map pairs have valid identifiers and are contained in the participant list.
- [x] Official source URLs are syntactically valid HTTPS URLs.
- [x] Operational records contain implementation evidence.
- [x] Open-call records are not represented as awards.
- [x] CSV and generated JavaScript IDs and ordering match.
- [x] JavaScript syntax checks run in GitHub Actions.
- [x] The generated cooperation JavaScript must be reproducible from the CSV.

## Manual tests still required

- [ ] Chrome desktop: all layers, filters, country selection, comparison, downloads, URL state, zoom, and pan.
- [ ] Safari desktop: same workflow.
- [ ] Firefox desktop: same workflow.
- [ ] Mobile Safari and mobile Chrome: layout, table scrolling, tooltips, and map controls.
- [ ] Keyboard-only navigation and visible focus states.
- [ ] Screen-reader labels and reading order.
- [ ] Every official source link opened manually from the deployed page.
- [ ] Two or three first-time users complete defined tasks without assistance.

Automated URL reachability is not treated as substantive source validation because government sites frequently block bots, redirect, or change page infrastructure. The official source and its content must be checked manually when a record is revised.
