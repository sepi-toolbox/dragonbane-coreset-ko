import { ClassicLevel } from "classic-level";
import fs from "fs";

const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const n1 = rd("names_rules.json"), n2 = rd("names_rules2.json"),
      n3 = rd("names_rules3.json"), n4 = rd("names_rules4.json"),
      nx = rd("names_extra.json");

// 아이템 이름 통합 사전 (최상위 + 액터 내장 공통)
const ITEM = Object.assign({}, n1.skills, n1.abilities, n1.kins, n1.professions, n1.injuries,
                           n2.spells, n2.weapons, n2.armors, n2.items, nx.extraItems);

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {};
for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const r = ADV["Dragonbane - Rules"];

const miss = { folders: [], actors: [], items: [], embItems: new Set(), tables: [], scenes: [], macros: [], cards: [], journals: [], pages: [] };
const pick = (dict, key, bucket) => { const t = dict[key]; if (!t) miss[bucket].push?.(key); return t; };

// folders: {EN: KO} — 번역된 것만
const folders = {};
for (const f of r.folders) {
  const t = n1.folders[f.name];
  if (t) folders[f.name] = t; else if (!miss.folders.includes(f.name)) miss.folders.push(f.name);
}

// actors: 이름 + 내장 아이템 이름
const actors = {};
for (const a of r.actors) {
  const t = n1.actors[a.name];
  if (!t) { miss.actors.push(a.name); continue; }
  const e = { name: t };
  const items = {};
  for (const it of a.items || []) {
    const kt = ITEM[it.name];
    if (kt) items[it.name] = { name: kt }; else miss.embItems.add(it.name);
  }
  if (Object.keys(items).length) e.items = items;
  actors[a.name] = e;
}

// items (최상위)
const items = {};
for (const it of r.items) {
  const t = ITEM[it.name];
  if (t) items[it.name] = { name: t }; else miss.items.push(it.name + " [" + it.type + "]");
}

const simple = (list, dict, bucket) => {
  const out = {};
  for (const x of list) { const t = dict[x.name]; if (t) out[x.name] = { name: t }; else miss[bucket].push(x.name); }
  return out;
};
const tables = simple(r.tables, n3.tables, "tables");
const scenes = simple(r.scenes, n3.scenes, "scenes");
const macros = simple(r.macros, n3.macros, "macros");
const cards  = simple(r.cards,  n3.cards,  "cards");

// journals + pages
const journals = {};
for (const j of r.journal) {
  const jt = n4.journals[j.name];
  if (!jt) { miss.journals.push(j.name); continue; }
  const pages = {};
  for (const p of j.pages || []) {
    const pt = jt.pages[p.name];
    if (pt) pages[p.name] = { name: pt }; else miss.pages.push(j.name + " / " + p.name);
  }
  journals[j.name] = { name: jt.name, pages };
}

const out = {
  label: "드래곤베인 - 코어 세트",
  entries: {
    "Dragonbane - Rules": {
      name: "드래곤베인 - 규칙",
      folders, journals, scenes, macros, tables, items, actors, cards
    }
  }
};
fs.writeFileSync("cs_translation.json", JSON.stringify(out, null, 4) + "\n");

// ── 커버리지 리포트 ───────────────────────────────────────────
const cnt = o => Object.keys(o).length;
console.log("생성:", fs.statSync("cs_translation.json").size, "bytes");
console.log("커버리지 (번역 / 원본)");
console.log("  folders :", cnt(folders), "/", new Set(r.folders.map(x => x.name)).size);
console.log("  actors  :", cnt(actors), "/", r.actors.length);
console.log("  items   :", cnt(items), "/", r.items.length);
console.log("  tables  :", cnt(tables), "/", r.tables.length);
console.log("  scenes  :", cnt(scenes), "/", r.scenes.length);
console.log("  macros  :", cnt(macros), "/", r.macros.length);
console.log("  cards   :", cnt(cards), "/", r.cards.length);
console.log("  journals:", cnt(journals), "/", r.journal.length);
let pg = 0, pgT = 0; for (const j of r.journal) { pgT += j.pages.length; pg += Object.keys(journals[j.name]?.pages || {}).length; }
console.log("  pages   :", pg, "/", pgT);
let ea = 0, eaT = 0; for (const a of r.actors) { eaT += (a.items || []).length; ea += Object.keys(actors[a.name]?.items || {}).length; }
console.log("  내장item:", ea, "/", eaT);
console.log("\n미번역:");
for (const [k, v] of Object.entries(miss)) {
  const arr = v instanceof Set ? [...v] : v;
  if (arr.length) console.log("  " + k + " (" + arr.length + "):", arr.join(" | "));
}
