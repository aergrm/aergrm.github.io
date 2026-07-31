#!/usr/bin/env python3
"""Build a fixed 2024 semiconductor trade release from CEPII BACI HS22 v202601.

Outputs:
- trade-data.js for the static website
- trade-country-indicators.csv
- trade-bilateral-links.csv

BACI values are reported in thousands of current USD and converted to USD here.
"""
from __future__ import annotations

import csv
import io
import json
import math
import pathlib
import urllib.request
import zipfile
from collections import defaultdict
from typing import Iterable

ROOT = pathlib.Path(__file__).resolve().parent
YEAR = 2024
VERSION = "202601"
ARCHIVE_URL = f"https://www.cepii.fr/DATA_DOWNLOAD/baci/data/BACI_HS22_V{VERSION}.zip"
ARCHIVE_PATH = ROOT / f"BACI_HS22_V{VERSION}.zip"
OUT_JS = ROOT / "trade-data.js"
OUT_COUNTRIES = ROOT / "trade-country-indicators.csv"
OUT_LINKS = ROOT / "trade-bilateral-links.csv"

PRODUCT_GROUPS = {
    "integrated_circuits": {
        "label": "Integrated circuits",
        "codes": ("8542",),
        "description": "HS 8542",
    },
    "semiconductor_devices": {
        "label": "Non-photovoltaic semiconductor devices",
        "codes": ("8541",),
        "excluded_prefixes": ("854142", "854143"),
        "description": "HS 8541 excluding photovoltaic cells and modules (854142 and 854143)",
    },
    "manufacturing_equipment": {
        "label": "Manufacturing equipment",
        "codes": ("8486",),
        "description": "HS 8486",
    },
    "wafers_materials": {
        "label": "Electronic-grade wafers/materials",
        "codes": ("381800",),
        "description": "HS 381800",
    },
}

# BACI uses UN/ISO numeric codes, with 490 serving as the Taiwan proxy.
ENTITIES = {
    "nld": {"name": "Netherlands", "codes": {528}},
    "jpn": {"name": "Japan", "codes": {392}},
    "kor": {"name": "South Korea", "codes": {410}},
    "twn": {"name": "Taiwan (Asia, nes proxy)", "codes": {490}},
    "sgp": {"name": "Singapore", "codes": {702}},
    "mys": {"name": "Malaysia", "codes": {458}},
    "ind": {"name": "India", "codes": {699}},
    "vnm": {"name": "Vietnam", "codes": {704}},
    "isr": {"name": "Israel", "codes": {376}},
    "tur": {"name": "Türkiye", "codes": {792}},
    "are": {"name": "United Arab Emirates", "codes": {784}},
    "sau": {"name": "Saudi Arabia", "codes": {682}},
    "gbr": {"name": "United Kingdom", "codes": {826}},
    "aus": {"name": "Australia", "codes": {36}},
    "can": {"name": "Canada", "codes": {124}},
    "usa": {"name": "United States", "codes": {842}},
    "chn": {"name": "China", "codes": {156}},
}

# EU-27 ISO3 list. Numeric BACI codes are resolved from the archive metadata.
EU27_ISO3 = {
    "AUT", "BEL", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN",
    "FRA", "DEU", "GRC", "HUN", "IRL", "ITA", "LVA", "LTU", "LUX",
    "MLT", "NLD", "POL", "PRT", "ROU", "SVK", "SVN", "ESP", "SWE",
}

ANCHOR_IDS = ("usa", "chn", "twn", "kor", "jpn", "eun")
EU_CODES: set[int] = set()


def download_archive() -> pathlib.Path:
    if ARCHIVE_PATH.exists() and ARCHIVE_PATH.stat().st_size > 1_000_000:
        return ARCHIVE_PATH
    request = urllib.request.Request(
        ARCHIVE_URL,
        headers={"User-Agent": "aergrm-semiconductor-network/1.1"},
    )
    with urllib.request.urlopen(request, timeout=180) as response, ARCHIVE_PATH.open("wb") as out:
        while chunk := response.read(1024 * 1024):
            out.write(chunk)
    return ARCHIVE_PATH


def find_member(names: Iterable[str], needle: str) -> str:
    matches = [name for name in names if needle in pathlib.PurePosixPath(name).name]
    if not matches:
        raise FileNotFoundError(f"Could not find {needle!r} in BACI archive")
    return sorted(matches)[0]


def identify_metadata_columns(fieldnames: list[str]) -> tuple[str, str | None, str]:
    normalized = {name.lower().strip(): name for name in fieldnames}
    code = next((original for key, original in normalized.items() if key in {"country_code", "code"}), None)
    iso3 = next((original for key, original in normalized.items() if "iso3" in key or key == "iso_3"), None)
    name = next((original for key, original in normalized.items() if key in {"country_name", "name"}), None)
    if not code or not name:
        raise ValueError(f"Unexpected BACI country metadata columns: {fieldnames}")
    return code, iso3, name


def load_country_metadata(archive: zipfile.ZipFile) -> tuple[dict[int, str], set[int]]:
    member = find_member(archive.namelist(), f"country_codes_V{VERSION}.csv")
    with archive.open(member) as raw:
        text = io.TextIOWrapper(raw, encoding="utf-8-sig", newline="")
        reader = csv.DictReader(text)
        if not reader.fieldnames:
            raise ValueError("BACI country metadata has no header")
        code_col, iso_col, name_col = identify_metadata_columns(reader.fieldnames)
        names: dict[int, str] = {}
        eu_codes: set[int] = set()
        for row in reader:
            try:
                code = int(row[code_col])
            except (TypeError, ValueError):
                continue
            names[code] = (row.get(name_col) or str(code)).strip()
            iso = (row.get(iso_col) or "").strip().upper() if iso_col else ""
            if iso in EU27_ISO3:
                eu_codes.add(code)
    if len(eu_codes) < 20:
        raise ValueError(f"EU metadata resolution found only {len(eu_codes)} members")
    return names, eu_codes


def group_for(code: str) -> str | None:
    code = code.zfill(6)
    for group, meta in PRODUCT_GROUPS.items():
        if any(code.startswith(prefix) for prefix in meta["codes"]):
            excluded = meta.get("excluded_prefixes", ())
            if any(code.startswith(prefix) for prefix in excluded):
                continue
            return group
    return None


def hhi(values: dict[int, float]) -> float | None:
    total = sum(values.values())
    if total <= 0:
        return None
    return sum((value / total) ** 2 for value in values.values())


def top_share(values: dict[int, float], n: int) -> float | None:
    total = sum(values.values())
    if total <= 0:
        return None
    return sum(sorted(values.values(), reverse=True)[:n]) / total


def effective_partners(value: float | None) -> float | None:
    return (1 / value) if value and value > 0 else None


def make_partner_rows(values: dict[int, float], names: dict[int, str], code_to_id: dict[int, str], limit: int = 5) -> list[dict]:
    total = sum(values.values())
    if total <= 0:
        return []
    rows = []
    for code, value in sorted(values.items(), key=lambda item: item[1], reverse=True)[:limit]:
        rows.append({
            "code": code,
            "id": code_to_id.get(code),
            "name": names.get(code, f"Code {code}"),
            "value": round(value, 2),
            "share": round(value / total, 6),
        })
    return rows


def aggregate_entity(
    entity_id: str,
    entity_codes: set[int],
    flows: dict[tuple[int, int], dict[str, float]],
    names: dict[int, str],
    code_to_id: dict[int, str],
    exclude_internal: bool = True,
) -> dict:
    imports_by_partner: dict[int, float] = defaultdict(float)
    exports_by_partner: dict[int, float] = defaultdict(float)
    imports_by_group: dict[str, float] = defaultdict(float)
    exports_by_group: dict[str, float] = defaultdict(float)

    for (exporter, importer), groups in flows.items():
        value = sum(groups.values())
        if importer in entity_codes and (not exclude_internal or exporter not in entity_codes):
            imports_by_partner[exporter] += value
            for group, amount in groups.items():
                imports_by_group[group] += amount
        if exporter in entity_codes and (not exclude_internal or importer not in entity_codes):
            exports_by_partner[importer] += value
            for group, amount in groups.items():
                exports_by_group[group] += amount

    imports = sum(imports_by_partner.values())
    exports = sum(exports_by_partner.values())
    import_hhi = hhi(imports_by_partner)
    export_hhi = hhi(exports_by_partner)

    def anchor_share(anchor_id: str, direction: str) -> float:
        values = imports_by_partner if direction == "import" else exports_by_partner
        total = imports if direction == "import" else exports
        if total <= 0:
            return 0.0
        if anchor_id == "eun":
            if entity_id == "eun":
                return 0.0
            # For EU members, exposure means trade with the rest of the EU, not self-trade.
            partner_codes = EU_CODES - entity_codes
        else:
            partner_codes = ENTITIES[anchor_id]["codes"]
        return sum(values.get(code, 0.0) for code in partner_codes) / total

    result = {
        "imports": round(imports, 2),
        "exports": round(exports, 2),
        "balance": round(exports - imports, 2),
        "export_import_ratio": round(exports / imports, 6) if imports > 0 else None,
        "import_hhi": round(import_hhi, 6) if import_hhi is not None else None,
        "export_hhi": round(export_hhi, 6) if export_hhi is not None else None,
        "effective_import_partners": round(effective_partners(import_hhi), 2) if effective_partners(import_hhi) is not None else None,
        "effective_export_partners": round(effective_partners(export_hhi), 2) if effective_partners(export_hhi) is not None else None,
        "import_top1_share": round(top_share(imports_by_partner, 1), 6) if top_share(imports_by_partner, 1) is not None else None,
        "import_top3_share": round(top_share(imports_by_partner, 3), 6) if top_share(imports_by_partner, 3) is not None else None,
        "export_top1_share": round(top_share(exports_by_partner, 1), 6) if top_share(exports_by_partner, 1) is not None else None,
        "export_top3_share": round(top_share(exports_by_partner, 3), 6) if top_share(exports_by_partner, 3) is not None else None,
        "import_partner_count": len(imports_by_partner),
        "export_partner_count": len(exports_by_partner),
        "import_groups": {group: round(imports_by_group.get(group, 0.0), 2) for group in PRODUCT_GROUPS},
        "export_groups": {group: round(exports_by_group.get(group, 0.0), 2) for group in PRODUCT_GROUPS},
        "top_import_sources": make_partner_rows(imports_by_partner, names, code_to_id),
        "top_export_destinations": make_partner_rows(exports_by_partner, names, code_to_id),
        "anchor_import_shares": {anchor: round(anchor_share(anchor, "import"), 6) for anchor in ANCHOR_IDS},
        "anchor_export_shares": {anchor: round(anchor_share(anchor, "export"), 6) for anchor in ANCHOR_IDS},
    }
    return result


def build() -> dict:
    archive_path = download_archive()
    with zipfile.ZipFile(archive_path) as archive:
        names, eu_codes = load_country_metadata(archive)
        global EU_CODES
        EU_CODES = eu_codes

        trade_member = find_member(archive.namelist(), f"BACI_HS22_Y{YEAR}_V{VERSION}.csv")
        flows: dict[tuple[int, int], dict[str, float]] = defaultdict(lambda: defaultdict(float))
        with archive.open(trade_member) as raw:
            text = io.TextIOWrapper(raw, encoding="utf-8-sig", newline="")
            reader = csv.DictReader(text)
            for row in reader:
                group = group_for(str(row.get("k", "")))
                if not group:
                    continue
                try:
                    exporter = int(row["i"])
                    importer = int(row["j"])
                    value = float(row["v"]) * 1000.0
                except (KeyError, TypeError, ValueError):
                    continue
                if value <= 0 or exporter == importer:
                    continue
                flows[(exporter, importer)][group] += value

    entities = {key: {**value, "codes": set(value["codes"])} for key, value in ENTITIES.items()}
    # The Netherlands is mapped separately; exclude it from the regional node to avoid duplicate links.
    entities["eun"] = {"name": "European Union (EU-27, excluding Netherlands)", "codes": set(EU_CODES) - ENTITIES["nld"]["codes"]}
    code_to_id: dict[int, str] = {}
    for entity_id, entity in entities.items():
        if entity_id == "eun":
            continue
        for code in entity["codes"]:
            code_to_id[code] = entity_id

    countries = {
        entity_id: aggregate_entity(entity_id, entity["codes"], flows, names, code_to_id)
        for entity_id, entity in entities.items()
    }

    # Directed bilateral links among mapped nodes. EU links represent EU-27 aggregate,
    # excluding the separately mapped Netherlands where necessary to avoid double-counting.
    links: list[dict] = []
    map_ids = list(entities)
    for source_id in map_ids:
        source_codes = entities[source_id]["codes"]
        for target_id in map_ids:
            if source_id == target_id:
                continue
            target_codes = entities[target_id]["codes"]
            source_effective = set(source_codes)
            target_effective = set(target_codes)
            if source_id == "eun" and target_id in entities:
                source_effective -= target_effective
            if target_id == "eun" and source_id in entities:
                target_effective -= source_effective
            groups = {group: 0.0 for group in PRODUCT_GROUPS}
            for exporter in source_effective:
                for importer in target_effective:
                    pair = flows.get((exporter, importer))
                    if not pair:
                        continue
                    for group, value in pair.items():
                        groups[group] += value
            total = sum(groups.values())
            if total <= 0:
                continue
            dominant = max(groups, key=groups.get)
            links.append({
                "source": source_id,
                "target": target_id,
                "value": round(total, 2),
                "dominant_group": dominant,
                "groups": {key: round(value, 2) for key, value in groups.items()},
            })

    links.sort(key=lambda row: row["value"], reverse=True)
    metadata = {
        "release": "1.1",
        "year": YEAR,
        "version": VERSION,
        "source": "CEPII BACI HS22",
        "source_url": "https://www.cepii.fr/DATA_DOWNLOAD/baci/doc/baci_webpage.html",
        "archive_url": ARCHIVE_URL,
        "units": "current USD",
        "taiwan_proxy": "BACI/UN code 490, Asia not elsewhere specified",
        "product_groups": PRODUCT_GROUPS,
        "notes": [
            "BACI reconciles exporter and importer reports from UN Comtrade.",
            "The latest BACI year may be revised in subsequent releases.",
            "Trade measures capture customs flows, not design IP, licensing, ownership, or services.",
            "The EU map node excludes the separately mapped Netherlands; EU exposure shares use all EU-27 members.",
        ],
    }
    return {"metadata": metadata, "countries": countries, "links": links}


def write_outputs(dataset: dict) -> None:
    OUT_JS.write_text(
        "// Generated by build_trade_data.py from CEPII BACI.\nconst TRADE_DATA = "
        + json.dumps(dataset, separators=(",", ":"), sort_keys=True)
        + ";\n",
        encoding="utf-8",
    )

    country_fields = [
        "id", "name", "year", "imports_usd", "exports_usd", "balance_usd",
        "export_import_ratio", "import_hhi", "export_hhi",
        "effective_import_partners", "effective_export_partners",
        "import_top1_share", "import_top3_share", "export_top1_share", "export_top3_share",
        "import_partner_count", "export_partner_count",
        "import_share_usa", "import_share_china", "import_share_taiwan_proxy",
        "import_share_south_korea", "import_share_japan", "import_share_eu27",
    ]
    names = {**{key: value["name"] for key, value in ENTITIES.items()}, "eun": "European Union (EU-27, excluding Netherlands)"}
    with OUT_COUNTRIES.open("w", encoding="utf-8", newline="") as out:
        writer = csv.DictWriter(out, fieldnames=country_fields)
        writer.writeheader()
        for entity_id, values in dataset["countries"].items():
            shares = values["anchor_import_shares"]
            writer.writerow({
                "id": entity_id,
                "name": names[entity_id],
                "year": YEAR,
                "imports_usd": values["imports"],
                "exports_usd": values["exports"],
                "balance_usd": values["balance"],
                "export_import_ratio": values["export_import_ratio"],
                "import_hhi": values["import_hhi"],
                "export_hhi": values["export_hhi"],
                "effective_import_partners": values["effective_import_partners"],
                "effective_export_partners": values["effective_export_partners"],
                "import_top1_share": values["import_top1_share"],
                "import_top3_share": values["import_top3_share"],
                "export_top1_share": values["export_top1_share"],
                "export_top3_share": values["export_top3_share"],
                "import_partner_count": values["import_partner_count"],
                "export_partner_count": values["export_partner_count"],
                "import_share_usa": shares["usa"],
                "import_share_china": shares["chn"],
                "import_share_taiwan_proxy": shares["twn"],
                "import_share_south_korea": shares["kor"],
                "import_share_japan": shares["jpn"],
                "import_share_eu27": shares["eun"],
            })

    with OUT_LINKS.open("w", encoding="utf-8", newline="") as out:
        fields = ["year", "source", "target", "value_usd", "dominant_group", *PRODUCT_GROUPS]
        writer = csv.DictWriter(out, fieldnames=fields)
        writer.writeheader()
        for link in dataset["links"]:
            writer.writerow({
                "year": YEAR,
                "source": link["source"],
                "target": link["target"],
                "value_usd": link["value"],
                "dominant_group": link["dominant_group"],
                **link["groups"],
            })


if __name__ == "__main__":
    write_outputs(build())
