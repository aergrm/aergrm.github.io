# Middle Powers in the Global Semiconductor Network

Static GitHub Pages research prototype mapping semiconductor value-chain roles, formal cooperation, and structural dependence.

## Files

- `index.html`: interactive application shell
- `styles.css`: responsive presentation
- `data.js`: transparent country, agreement, and corridor codings
- `app.js`: native-SVG map, filters, country profiles, and UN Comtrade live queries
- `methods.html`: methods, limitations, and data documentation

## Local preview

```bash
python -m http.server 8000
```

Open `http://localhost:8000/chip-network/` from the repository root.

## Data note

The map separates official cooperation records from qualitative structural corridors. Live HS 8542 totals are queried from the UN Comtrade preview API. A future release should create a reproducible offline BACI/Comtrade processing pipeline and commit versioned CSV/JSON outputs.
