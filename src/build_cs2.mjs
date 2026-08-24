import { ClassicLevel } from "classic-level";
import fs from "fs";

const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const n1 = rd("names_rules.json"), n2 = rd("names_rules2.json"),
      n3 = rd("names_rules3.json"), n4 = rd("names_rules4.json"), nx = rd("names_extra.json");
const ITEM = Object.assign({}, n1.skills, n1.abilities, n1.kins, n1.professions, n1.injuries,
                           n2.spells, n2.weapons, n2.armors, n2.items, nx.extraItems);
const DESC = {};
for (const f of ["desc_a.json", "desc_b.json", "desc_c.json", "desc_d.json", "desc_e.json", "desc_f.json"])
  Object.assign(DESC, rd(f));

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {};
for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const r = ADV["Dragonbane - Rules"];

// 이름 중복 아이템은 _id 키로 분리해야 오역이 섞이지 않는다
const nameCount = {};
for (const it of r.items) nameCount[it.name] = (nameCount[it.name] || 0) + 1;

const miss = { items: [], desc: [], embItems: new Set() };

const folders = {};
for (const f of r.folders) if (n1.folders[f.name]) folders[f.name] = n1.folders[f.name];

const actors = {};
for (const a of r.actors) {
  const t = n1.actors[a.name]; if (!t) continue;
  const e = { name: t }, items = {};
  for (const it of a.items || []) {
    const kt = ITEM[it.name];
    if (!kt) { miss.embItems.add(it.name); continue; }
    const ent = { name: kt };
    const d = DESC[it._id] ?? DESC[it.name];
    if (d) ent.description = d;
    items[it.name] = ent;
  }
  if (Object.keys(items).length) e.items = items;
  actors[a.name] = e;
}

const items = {};
for (const it of r.items) {
  const t = ITEM[it.name];
  if (!t) { miss.items.push(it.name + " [" + it.type + "]"); continue; }
  const key = nameCount[it.name] > 1 ? it._id : it.name;
  const ent = { name: t };
  const d = DESC[it._id] ?? DESC[it.name];   // _id 우선, 없으면 이름 (중복명은 _id 엔트리가 이미 분리돼 있음)
  if (d) ent.description = d;
  else if (String(it.system?.description || "").trim()) miss.desc.push(it.name + " [" + it.type + "]");
  items[key] = ent;
}

const simple = (list, dict) => { const o = {}; for (const x of list) if (dict[x.name]) o[x.name] = { name: dict[x.name] }; return o; };
const tables = simple(r.tables, n3.tables), scenes = simple(r.scenes, n3.scenes),
      macros = simple(r.macros, n3.macros), cards = simple(r.cards, n3.cards);

const journals = {};
for (const j of r.journal) {
  const jt = n4.journals[j.name]; if (!jt) continue;
  const pages = {};
  for (const p of j.pages || []) if (jt.pages[p.name]) pages[p.name] = { name: jt.pages[p.name] };
  journals[j.name] = { name: jt.name, pages };
}

const out = {
  label: "드래곤베인 - 코어 세트",
  entries: {
    "Dragonbane - Rules": { name: "드래곤베인 - 규칙", folders, journals, scenes, macros, tables, items, actors, cards }
  }
};
fs.writeFileSync("cs_translation.json", JSON.stringify(out, null, 4) + "\n");

const withDesc = r.items.filter(it => String(it.system?.description || "").trim()).length;
const gotDesc = Object.values(items).filter(e => e.description).length;
console.log("생성:", (fs.statSync("cs_translation.json").size / 1024).toFixed(0), "KB");
console.log("아이템 이름 :", Object.keys(items).length, "/", r.items.length);
console.log("아이템 설명 :", gotDesc, "/", withDesc, "(설명이 있는 아이템 기준)");
let ed = 0, edT = 0;
for (const a of r.actors) for (const it of a.items || []) { if (String(it.system?.description || "").trim()) edT++; if (actors[a.name]?.items?.[it.name]?.description) ed++; }
console.log("내장 설명   :", ed, "/", edT);
if (miss.items.length) console.log("이름 미번역:", miss.items.join(" | "));
if (miss.desc.length) console.log("설명 미번역:", miss.desc.join(" | "));
if (miss.embItems.size) console.log("내장 미번역:", [...miss.embItems].join(" | "));
