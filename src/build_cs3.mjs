import { ClassicLevel } from "classic-level";
import fs from "fs";

const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const n1 = rd("names_rules.json"), n2 = rd("names_rules2.json"), n3 = rd("names_rules3.json"),
      n4 = rd("names_rules4.json"), nx = rd("names_extra.json"),
      na = rd("names_adv.json"), naj = rd("names_adv_journals.json");

// 이름 사전: Rules + Adventures/Solo 통합 (액터 내장 아이템은 어드벤처를 넘나든다)
const ITEM = Object.assign({}, n1.skills, n1.abilities, n1.kins, n1.professions, n1.injuries,
                           n2.spells, n2.weapons, n2.armors, n2.items, nx.extraItems, na.items);
const ACTOR = Object.assign({}, n1.actors, na.actors);
const FOLDER = Object.assign({}, n1.folders, na.folders);
const TABLE = Object.assign({}, n3.tables, na.tables);
const SCENE = Object.assign({}, n3.scenes, na.scenes);
const MACRO = Object.assign({}, n3.macros);
const CARD = Object.assign({}, n3.cards, na.cards);
const JOURNAL = { "Dragonbane - Rules": n4.journals, ...naj };

// 굴림표 결과/설명
const TRES = {}, TDESC = {};
for (const f of fs.readdirSync(".").filter(f => /^tres_\d+\.json$/.test(f))) {
  const o = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const [t, r] of Object.entries(o.results || {})) Object.assign(TRES[t] = TRES[t] || {}, r);
  Object.assign(TDESC, o.descriptions || {});
}

const DESC = {};
for (const f of ["desc_a.json","desc_b.json","desc_c.json","desc_d.json","desc_e.json","desc_f.json","desc_g.json","desc_h.json"])
  Object.assign(DESC, rd(f));

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {};
for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();

const ADVNAME = Object.assign({ "Dragonbane - Rules": "드래곤베인 - 규칙" }, na.advNames);
const entries = {};
const report = [];
const missAll = { folders: new Set(), actors: new Set(), items: new Set(), tables: new Set(), scenes: new Set(), macros: new Set(), cards: new Set(), journals: new Set(), pages: new Set(), embItems: new Set(), desc: new Set() };

for (const advName of Object.keys(ADV)) {
  const r = ADV[advName];
  const nameCount = {};
  for (const it of r.items || []) nameCount[it.name] = (nameCount[it.name] || 0) + 1;

  const folders = {};
  for (const f of r.folders || []) FOLDER[f.name] ? folders[f.name] = FOLDER[f.name] : missAll.folders.add(f.name);

  const actors = {};
  for (const a of r.actors || []) {
    const t = ACTOR[a.name]; if (!t) { missAll.actors.add(a.name); continue; }
    const e = { name: t }, its = {};
    for (const it of a.items || []) {
      const kt = ITEM[it.name]; if (!kt) { missAll.embItems.add(it.name); continue; }
      const ent = { name: kt };
      const d = DESC[it._id] ?? DESC[it.name];
      if (d) ent.description = d;
      else if (String(it.system?.description || "").trim()) missAll.desc.add(it.name);
      its[it.name] = ent;
    }
    if (Object.keys(its).length) e.items = its;
    actors[a.name] = e;
  }

  const items = {};
  for (const it of r.items || []) {
    const t = ITEM[it.name]; if (!t) { missAll.items.add(it.name + "[" + it.type + "]"); continue; }
    const ent = { name: t };
    const d = DESC[it._id] ?? DESC[it.name];
    if (d) ent.description = d;
    else if (String(it.system?.description || "").trim()) missAll.desc.add(it.name);
    items[nameCount[it.name] > 1 ? it._id : it.name] = ent;
  }

  const simple = (list, dict, bucket) => { const o = {}; for (const x of list || []) dict[x.name] ? o[x.name] = { name: dict[x.name] } : missAll[bucket].add(x.name); return o; };
  const tables = {};
  for (const t of r.tables || []) {
    if (!TABLE[t.name]) { missAll.tables.add(t.name); continue; }
    const e = { name: TABLE[t.name] };
    if (TDESC[t.name]) e.description = TDESC[t.name];
    const rs = {};
    for (const x of t.results || []) {
      if (x.type === 1 || x.documentUuid) continue;   // 참조 문서 결과는 참조 팩 번역이 자동 해석
      const ko = TRES[t.name]?.[x._id];
      if (ko) rs[x._id] = { description: ko };
    }
    if (Object.keys(rs).length) e.results = rs;
    tables[t.name] = e;
  }
  const scenes = simple(r.scenes, SCENE, "scenes"),
        macros = simple(r.macros, MACRO, "macros"), cards = simple(r.cards, CARD, "cards");

  const journals = {}; const JD = JOURNAL[advName] || {};
  for (const j of r.journal || []) {
    const jt = JD[j.name]; if (!jt) { missAll.journals.add(advName + " / " + j.name); continue; }
    const pages = {};
    for (const p of j.pages || []) jt.pages[p.name] ? pages[p.name] = { name: jt.pages[p.name] } : missAll.pages.add(j.name + " / " + p.name);
    journals[j.name] = { name: jt.name, pages };
  }

  entries[advName] = { name: ADVNAME[advName], folders, journals, scenes, macros, tables, items, actors, cards };
  const c = o => Object.keys(o).length;
  report.push([advName, c(folders) + "/" + new Set((r.folders||[]).map(x=>x.name)).size,
    c(actors) + "/" + (r.actors||[]).length, c(items) + "/" + (r.items||[]).length,
    c(tables) + "/" + (r.tables||[]).length, c(journals) + "/" + (r.journal||[]).length,
    c(scenes) + "/" + (r.scenes||[]).length, c(macros) + "/" + (r.macros||[]).length, c(cards) + "/" + (r.cards||[]).length]);
}

fs.writeFileSync("cs_translation.json", JSON.stringify({ label: "드래곤베인 - 코어 세트", entries }, null, 4) + "\n");
console.log("생성:", (fs.statSync("cs_translation.json").size / 1024).toFixed(0), "KB\n");
console.log("어드벤처".padEnd(30), "폴더", "액터", "아이템", "표", "저널", "장면", "매크로", "카드");
report.forEach(r => console.log(r[0].padEnd(30), r.slice(1).join("  ")));
let pOK = 0, pT = 0;
for (const [an, r] of Object.entries(ADV)) for (const j of r.journal || []) { pT += j.pages.length; pOK += Object.keys(entries[an].journals[j.name]?.pages || {}).length; }
console.log("\n저널 페이지명:", pOK, "/", pT);
let rOK = 0, rT = 0;
for (const [an, r] of Object.entries(ADV)) for (const t of r.tables || []) for (const x of t.results || []) {
  if (x.type === 1 || x.documentUuid) continue;
  rT++; if (entries[an].tables[t.name]?.results?.[x._id]) rOK++;
}
console.log("굴림표 결과:", rOK, "/", rT);
console.log("\n미번역:");
for (const [k, v] of Object.entries(missAll)) if (v.size) console.log("  " + k + " (" + v.size + "):", [...v].join(" | "));
