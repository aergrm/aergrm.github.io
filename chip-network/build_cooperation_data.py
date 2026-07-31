#!/usr/bin/env python3
from __future__ import annotations
import csv, json, pathlib
ROOT=pathlib.Path(__file__).resolve().parent

def split(value: str) -> list[str]:
    return [item.strip() for item in (value or '').split(';') if item.strip()]

def build() -> list[dict]:
    rows=list(csv.DictReader((ROOT/'semiconductor-cooperation.csv').open(encoding='utf-8')))
    output=[]
    for row in rows:
        pairs=[]
        for pair in split(row['map_pairs']):
            source,target=pair.split('-',1)
            pairs.append([source,target])
        output.append({
            'id':row['id'],'date':row['date'],'year':int(row['year']),'title':row['title'],
            'participants':split(row['participants']),'participantIds':split(row['participant_ids']),
            'mapPairs':pairs,'type':row['type'],'scope':row['scope'],'stages':split(row['stages']),
            'status':row['status'],'implementation':row['implementation'],'funding':row['funding'],
            'detail':row['detail'],'url':row['source_url'],'lastVerified':row['last_verified'],
        })
    return output

def main() -> None:
    text='const COOPERATION_DATA='+json.dumps(build(),ensure_ascii=False,separators=(',',':'))+';\n'
    (ROOT/'cooperation-data.js').write_text(text,encoding='utf-8')

if __name__=='__main__': main()
