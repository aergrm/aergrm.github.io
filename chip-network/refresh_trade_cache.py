#!/usr/bin/env python3
import datetime
import json
import pathlib
import time
import urllib.parse
import urllib.request

OUT = pathlib.Path(__file__).with_name("trade-cache.js")
API = "https://comtradeapi.un.org/public/v1/preview/C/A/HS"
REPORTERS = {"nld":528,"jpn":392,"kor":410,"twn":490,"sgp":702,"mys":458,"ind":699,"vnm":704,"isr":376,"tur":792,"are":784,"sau":682,"gbr":826,"aus":36,"can":124,"usa":842,"chn":156}

def total(reporter, flow, year=2024):
    query = urllib.parse.urlencode({"period":year,"reporterCode":reporter,"cmdCode":"8542","flowCode":flow,"partnerCode":"0","partner2Code":"0","customsCode":"C00","motCode":"0","maxRecords":"500"})
    request = urllib.request.Request(API + "?" + query, headers={"User-Agent":"aergrm-chip-network"})
    with urllib.request.urlopen(request, timeout=45) as response:
        rows = json.load(response).get("data", [])
    return sum(float(row.get("primaryValue") or row.get("tradeValue") or row.get("TradeValue") or 0) for row in rows)

def main():
    data = {}
    for key, reporter in REPORTERS.items():
        try:
            data[key] = {"2024":{"exports":total(reporter,"X"),"imports":total(reporter,"M")}}
        except Exception as error:
            print("warning", key, error)
        time.sleep(0.4)
    cache = {"updated":datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00","Z"),"source":"UN Comtrade public API","commodity":"HS 8542 integrated circuits","data":data}
    OUT.write_text("// Generated cache.\nconst TRADE_CACHE = " + json.dumps(cache, separators=(",",":"), sort_keys=True) + ";\n", encoding="utf-8")

if __name__ == "__main__":
    main()
