# Cuenta Anura de Colombia en iNaturalist: especies por familia y por género. Uso: python scripts/inat-anura.py
import json, urllib.request
from collections import Counter
get = lambda u: json.load(urllib.request.urlopen(u))
B = 'https://api.inaturalist.org/v1/'
sp, page = [], 1
while True:
    d = get(f'{B}observations/species_counts?taxon_id=20979&place_id=7196&per_page=500&rank=species&page={page}')
    sp += [r['taxon'] for r in d['results']]
    if len(sp) >= d['total_results'] or not d['results']: break
    page += 1
ids = sorted({i for t in sp for i in t['ancestor_ids'][t['ancestor_ids'].index(20979) + 1:]})
rank = {}
for k in range(0, len(ids), 30):
    for t in get(f"{B}taxa/{','.join(map(str, ids[k:k + 30]))}")['results']: rank[t['id']] = (t['rank'], t['name'])
fam, gen = Counter(), Counter()
for t in sp:
    for i in t['ancestor_ids']:
        r = rank.get(i)
        if r and r[0] == 'family': fam[r[1]] += 1
        if r and r[0] == 'genus': gen[r[1]] += 1
out = {'especies': len(sp), 'generos': len(gen), 'familias': len(fam), 'familiasEsp': fam.most_common(), 'generosEsp': gen.most_common(8)}
json.dump(out, open('src/inat-anura.json', 'w', encoding='utf-8'), ensure_ascii=False)
print(out)
