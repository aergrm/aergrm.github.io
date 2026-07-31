#!/usr/bin/env python3
from __future__ import annotations
import csv, json, pathlib, re, sys
from datetime import date
from urllib.parse import urlparse

ROOT=pathlib.Path(__file__).resolve().parent
CSV=ROOT/'semiconductor-cooperation.csv'
JS=ROOT/'cooperation-data.js'
ALLOWED_TYPES={'resilience','research','ecosystem','investment','trusted_network'}
ALLOWED_SCOPES={'semiconductor-specific','broader-framework'}
ALLOWED_STATUS={'announced','signed','funded','implementation','operational','open_call','suspended','superseded'}
ALLOWED_STAGES={'advanced_manufacturing','compute','design','equipment','fabrication','infrastructure','investment','materials','packaging','research','semiconductors','supply_chain','trusted_network','workforce'}
CUTOFF=date(2026,7,31)

def split(v): return [x.strip() for x in (v or '').split(';') if x.strip()]
def fail(errors,msg): errors.append(msg)

def main():
    errors=[]; warnings=[]
    rows=list(csv.DictReader(CSV.open(encoding='utf-8')))
    if not rows: fail(errors,'cooperation CSV has no rows')
    required={'id','date','year','title','participants','participant_ids','map_pairs','type','scope','stages','status','implementation','funding','detail','source_url','last_verified','date_precision','event_basis','implementation_url','audit_note'}
    if rows and set(rows[0])!=required:
        missing=required-set(rows[0]); extra=set(rows[0])-required
        if missing: fail(errors,f'missing CSV columns: {sorted(missing)}')
        if extra: fail(errors,f'unexpected CSV columns: {sorted(extra)}')
    ids=set()
    country_ids={'nld','jpn','kor','twn','sgp','mys','ind','vnm','isr','tur','are','sau','gbr','aus','can','usa','chn','eun'}
    for n,r in enumerate(rows,2):
        rid=r['id']
        if rid in ids: fail(errors,f'row {n}: duplicate id {rid}')
        ids.add(rid)
        try: d=date.fromisoformat(r['date'])
        except ValueError: fail(errors,f'row {n}: invalid date {r["date"]}'); continue
        if d>CUTOFF: fail(errors,f'row {n}: date after cutoff: {d}')
        if int(r['year'])!=d.year: fail(errors,f'row {n}: year/date mismatch')
        try: verified=date.fromisoformat(r['last_verified'])
        except ValueError: fail(errors,f'row {n}: invalid last_verified'); verified=None
        if verified and verified>CUTOFF: fail(errors,f'row {n}: verification date after cutoff')
        if r['type'] not in ALLOWED_TYPES: fail(errors,f'row {n}: invalid type {r["type"]}')
        if r['scope'] not in ALLOWED_SCOPES: fail(errors,f'row {n}: invalid scope {r["scope"]}')
        if r['status'] not in ALLOWED_STATUS: fail(errors,f'row {n}: invalid status {r["status"]}')
        bad=set(split(r['stages']))-ALLOWED_STAGES
        if bad: fail(errors,f'row {n}: invalid stages {sorted(bad)}')
        pids=split(r['participant_ids'])
        if len(pids)<2: fail(errors,f'row {n}: fewer than two participant ids')
        unknown=set(pids)-country_ids
        if unknown: warnings.append(f'row {n}: participant ids not in country source map: {sorted(unknown)}')
        for pair in split(r['map_pairs']):
            if not re.fullmatch(r'[a-z]{3}-[a-z]{3}',pair): fail(errors,f'row {n}: invalid map pair {pair}')
            else:
                a,b=pair.split('-')
                if a not in pids or b not in pids: fail(errors,f'row {n}: map pair {pair} not contained in participants')
        u=urlparse(r['source_url'])
        if u.scheme!='https' or not u.netloc: fail(errors,f'row {n}: invalid official source URL')
        if r['implementation_url']:
            iu=urlparse(r['implementation_url'])
            if iu.scheme!='https' or not iu.netloc: fail(errors,f'row {n}: invalid implementation URL')
        if r['date_precision'] not in {'day','month','year'}: fail(errors,f'row {n}: invalid date precision')
        if not r['event_basis'].strip(): fail(errors,f'row {n}: missing event basis')
        if r['status']=='operational' and len(r['implementation'].strip())<35:
            fail(errors,f'row {n}: operational status lacks implementation evidence')
        if r['status']=='open_call' and 'call' not in (r['implementation']+' '+r['detail']).lower():
            fail(errors,f'row {n}: open_call status not described as a call')
    js=JS.read_text(encoding='utf-8').strip()
    prefix='const COOPERATION_DATA='; suffix=';'
    if not (js.startswith(prefix) and js.endswith(suffix)): fail(errors,'cooperation-data.js wrapper invalid')
    else:
        data=json.loads(js[len(prefix):-1])
        if len(data)!=len(rows): fail(errors,f'CSV/JS row-count mismatch: {len(rows)} vs {len(data)}')
        if [r['id'] for r in rows]!=[r['id'] for r in data]: fail(errors,'CSV/JS IDs or order differ')
    print(f'Validated {len(rows)} cooperation records.')
    for w in warnings: print('WARNING:',w)
    if errors:
        for e in errors: print('ERROR:',e,file=sys.stderr)
        return 1
    return 0
if __name__=='__main__': raise SystemExit(main())
