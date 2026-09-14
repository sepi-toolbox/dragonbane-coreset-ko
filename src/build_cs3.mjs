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
const CARDIMG = fs.existsSync("cards_img.json") ? rd("cards_img.json") : {};

// 저널 페이지 본문
const JTEXT = {};
for (const f of fs.readdirSync(".").filter(f => /^jn_\d+\.json$/.test(f))) {
  const o = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const [j, p] of Object.entries(o)) Object.assign(JTEXT[j] = JTEXT[j] || {}, p);
}

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

// 액터 본문: system.description / system.traits (원문 문자열 → 한국어)
const ADESC = {}, ATRAITS = {};
for (const f of ["adesc_a.json","adesc_b.json","adesc_c.json","adesc_d.json"]) Object.assign(ADESC, rd(f));
Object.assign(ATRAITS, rd("atr_traits.json"));

// 구조화 필드(비용/요구조건/기술목록/외모/약점/메모/어드벤처 설명)
const GAP = {};
for (const f of ["gap_auto.json","gap_hand.json"]) for (const [k, m] of Object.entries(rd(f))) Object.assign(GAP[k] ??= {}, m);
const GF_ITEM  = ["requirement","prerequisite","skills","banes","boons","abilities","cost"];
const GF_ACTOR = ["appearance","weakness","notes"];
const gap = (o, fields, e) => { for (const f of fields) { const v = String(o.system?.[f] ?? "").trim(); const t = GAP[f]?.[v]; if (v && t !== undefined && t !== v) e[f] = t; } };

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {};
for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();

const ADVNAME = Object.assign({ "Dragonbane - Rules": "드래곤베인 - 규칙" }, na.advNames);
const entries = {};
const report = [];
const missAll = { folders: new Set(), actors: new Set(), items: new Set(), tables: new Set(), scenes: new Set(), macros: new Set(), cards: new Set(), actorDesc: new Set(), actorTraits: new Set(), journals: new Set(), pages: new Set(), embItems: new Set(), desc: new Set() };

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
    const ad = String(a.system?.description || "").trim();
    if (ad) { ADESC[ad] ? e.description = ADESC[ad] : missAll.actorDesc.add(a.name); }
    gap(a, GF_ACTOR, e);
    const at = String(a.system?.traits || "").trim();
    if (at) { ATRAITS[at] ? e.traits = ATRAITS[at] : missAll.actorTraits.add(a.name); }
    for (const it of a.items || []) {
      const kt = ITEM[it.name]; if (!kt) { missAll.embItems.add(it.name); continue; }
      const ent = { name: kt };
      gap(it, GF_ITEM, ent);
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
    gap(it, GF_ITEM, ent);
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
  // 카드 앞면 이미지: cards_img.json { "<원본 앞면 파일명>": "<한국어 이미지 경로>" } — 카드 _id 키로 faces[].img 교체
  for (const d of r.cards || []) {
    if (!cards[d.name]) continue;
    const cs = {};
    for (const c of d.cards || []) {
      // "@<카드 _id>" 키가 있으면 우선(원본 데이터가 다른 카드 이미지를 가리키는 경우 교정용)
      const faces = (c.faces || []).map(fc => { const ko = CARDIMG["@" + c._id] ?? CARDIMG[String(fc.img || "").split("/").pop()]; return ko ? { img: ko } : {}; });
      if (faces.some(fc => fc.img)) cs[c._id] = { faces };
    }
    if (Object.keys(cs).length) cards[d.name].cards = cs;
  }

  const journals = {}; const JD = JOURNAL[advName] || {};
  for (const j of r.journal || []) {
    const jt = JD[j.name]; if (!jt) { missAll.journals.add(advName + " / " + j.name); continue; }
    const pages = {};
    const pgCount = {};
    for (const p of j.pages || []) pgCount[p.name] = (pgCount[p.name] || 0) + 1;
    for (const p of j.pages || []) {
      if (!jt.pages[p.name]) { missAll.pages.add(j.name + " / " + p.name); continue; }
      const e = { name: jt.pages[p.name] };
      const t = JTEXT[j.name]?.[p._id] ?? JTEXT[j.name]?.[p.name];   // 중복 페이지명은 _id 우선
      if (t) e.text = t;
      pages[pgCount[p.name] > 1 ? p._id : p.name] = e;               // 중복이면 _id 키로 분리
    }
    journals[j.name] = { name: jt.name, pages };
  }

  // 팩 원문은 `<img ...>`, 사전 키는 런타임 직렬화 `<img ... />` — 자기닫힘 표기를 정규화해 비교
  const selfClose = s => String(s || "").trim().replace(/\s*\/>/g, ">");
  const advDesc = Object.entries(GAP.advDescription || {}).find(([k]) => selfClose(k) === selfClose(r.description))?.[1];
  entries[advName] = { name: ADVNAME[advName], ...(advDesc ? { description: advDesc } : {}), folders, journals, scenes, macros, tables, items, actors, cards };
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
let tOK = 0, tT = 0;
for (const [an, r] of Object.entries(ADV)) for (const j of r.journal || []) for (const p of j.pages || []) {
  if (!String(p.text?.content || "").trim()) continue;
  tT++; const pg = entries[an].journals[j.name]?.pages; if (pg?.[p._id]?.text || pg?.[p.name]?.text) tOK++;
}
console.log("저널 본문:", tOK, "/", tT);
let adOK=0, adT=0, atOK=0, atT=0;
for (const [an, r] of Object.entries(ADV)) for (const a of r.actors || []) {
  if (String(a.system?.description||"").trim()) { adT++; if (entries[an].actors[a.name]?.description) adOK++; }
  if (String(a.system?.traits||"").trim()) { atT++; if (entries[an].actors[a.name]?.traits) atOK++; }
}
console.log("액터 설명:", adOK, "/", adT);
console.log("액터 특징:", atOK, "/", atT);
{ const F = { requirement:0, prerequisite:0, skills:0, banes:0, boons:0, abilities:0, cost:0, appearance:0, weakness:0, notes:0 };
  const T = { ...F };
  const chk = (o, e, fields) => { for (const f of fields) { const v = String(o.system?.[f]??"").trim(); if (!v) continue; const t = GAP[f]?.[v]; if (t === v) continue; T[f]++; if (e?.[f] !== undefined) F[f]++; } };
  for (const [an, r] of Object.entries(ADV)) {
    for (const it of r.items||[]) chk(it, entries[an].items[it.name] ?? entries[an].items[it._id], GF_ITEM);
    for (const a of r.actors||[]) { chk(a, entries[an].actors[a.name], GF_ACTOR);
      for (const it of a.items||[]) chk(it, entries[an].actors[a.name]?.items?.[it.name], GF_ITEM); } }
  console.log("구조화 필드:", Object.entries(T).filter(([,n])=>n).map(([f,n])=>`${f} ${F[f]}/${n}`).join("  "));
  const advT = Object.values(ADV).filter(r=>String(r.description||"").trim()).length;
  const advO = Object.entries(ADV).filter(([an,r])=>entries[an].description).length;
  console.log("어드벤처 설명:", advO, "/", advT); }
console.log("\n미번역:");
for (const [k, v] of Object.entries(missAll)) if (v.size) console.log("  " + k + " (" + v.size + "):", [...v].join(" | "));
