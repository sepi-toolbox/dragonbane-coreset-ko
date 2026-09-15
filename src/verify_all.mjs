// Babele 실제 소스 + 실제 module.json 매핑으로 전 문서를 번역해 영문 잔존을 전수 검사
const gp = (o, p) => p.split(".").reduce((a, k) => (a == null ? undefined : a[k]), o);
const sp = (o, p, v) => { const ks = p.split("."); let a = o; for (const k of ks.slice(0, -1)) a = (a[k] ??= {}); a[ks.at(-1)] = v; return true; };
const dc = o => (o === null || typeof o !== "object") ? o : JSON.parse(JSON.stringify(o));
function mergeObject(base, other = {}, { inplace = true } = {}) {
  const t = inplace ? base : dc(base);
  for (const [k, v] of Object.entries(other || {})) {
    if (v && typeof v === "object" && !Array.isArray(v) && t[k] && typeof t[k] === "object" && !Array.isArray(t[k]))
      t[k] = mergeObject(t[k], v, { inplace: false });
    else t[k] = dc(v);
  }
  return t;
}
class Coll extends Map { get contents() { return [...this.values()]; } find(f) { return this.contents.find(f); } filter(f) { return this.contents.filter(f); } }
globalThis.foundry = { utils: { getProperty: gp, setProperty: sp, mergeObject, deepClone: dc, duplicate: dc, isEmpty: o => !o || Object.keys(o).length === 0, expandObject: o => o, flattenObject: o => o, Collection: Coll } };
globalThis.getProperty = gp; globalThis.setProperty = sp; globalThis.mergeObject = mergeObject; globalThis.duplicate = dc;
globalThis.game = { i18n: { localize: s => s }, modules: new Map(), settings: { get: () => null } };
globalThis.Hooks = { on() {}, once() {}, callAll() {} };
globalThis.ui = { notifications: { warn() {}, error() {}, info() {} } };
globalThis.CONFIG = {};

import fs from "fs";
import { ClassicLevel } from "classic-level";
const B = process.env.HOME + "/Library/Application Support/FoundryVTT/Data/modules/babele/script/";
const { DocumentMappings } = await import(B + "mapping/document-mappings.js");
const { ConverterRegistry } = await import(B + "converter/converter-registry.js");
const { IdentityExtractorRegistry } = await import(B + "identity/identity-extractor-registry.js");
const { Converters } = await import(B + "converter/converters.js");
const cr = new ConverterRegistry(); cr.registerAll(Converters.legacyRegistrations());
const ir = new IdentityExtractorRegistry();

// 배포된 main.js에서 registerMapping 인자를 그대로 추출해 사용
const MAIN = fs.readFileSync(process.env.HOME + "/Library/Mobile Documents/com~apple~CloudDocs/AIwork/01_TTRPG-Translation/dragonbane-coreset-ko/scripts/main.js", "utf8");
let CAPTURED = null, CAPTURED_CONVERTERS = {};
// babele.init 콜백만 실행(ready 등 다른 훅은 무시)
new Function("Hooks", MAIN)({ once: (h, fn) => { if (h === "babele.init") fn({ registerMapping: m => { CAPTURED = m; }, registerConverters: c => Object.assign(CAPTURED_CONVERTERS, c), register: () => {} }); } });
if (!CAPTURED) throw new Error("main.js에서 registerMapping을 잡지 못함");
console.log("main.js 매핑 적용:", JSON.stringify(CAPTURED));
// 실제 Babele과 같게: 내장 document/structured + main.js가 등록한 함수형 변환기
{
  const { DocumentConverter } = await import(B + "converter/document-converter.js");
  const { StructuredDataConverter } = await import(B + "converter/structured-data-converter.js");
  const { FunctionalConverter } = await import(B + "converter/functional-converter.js");
  cr.registerAll({ document: new DocumentConverter(), structured: new StructuredDataConverter() });
  for (const [k, fn] of Object.entries(CAPTURED_CONVERTERS)) cr.register(k, new FunctionalConverter(fn));
  console.log("main.js 변환기 등록:", Object.keys(CAPTURED_CONVERTERS).join(", ") || "(없음)");
}

const dm = new DocumentMappings(undefined, { registeredMappings: [CAPTURED], loadedMappings: [], identityExtractors: ir, converterRegistry: cr });

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v; await db.close();
const T = JSON.parse(fs.readFileSync("cs_translation.json", "utf8"));

// dragonbane 4.x DoDItemBaseData.migrateData 재현: description -> itemDescription (+ description 삭제)
const migrateItem = it => { const o = dc(it);
  if (o.system && o.system.itemDescription === undefined && o.system.description !== undefined) {
    o.system.itemDescription = o.system.description; o.system.gmDescription ??= ""; delete o.system.description; }
  return o; };

const CLEAN = s => String(s ?? "")
  .replace(/<[^>]*>/g, " ")
  .replace(/\[\[[^\]]*\]\]/g, " ")
  .replace(/@[A-Za-z]+\[[^\]]*\](\{[^}]*\})?/g, " ");
// 브랜드·고유표기 허용어
const OK = /^(Foundry|VTT|Dragonbane|Fria|Ligan|Patrik|info|frialigan|com|http|https|www|freeleaguepublishing|patrikp|mailto|Drakar|och|Demoner|SATHMOG|Rotar|Ebil|Dough|Not|Ert|Ruo|Gomtas|Rewop|guano|draconis|Sathmog|NPC|HP|WP|RPG|CTRL|STR|CON|AGL|INT|WIL|CHA|Gear|GearTableStart|GearTableEnd|treasure|roll|damage|Core|Set|Rules|Adventures|amp|Tomas|Roger|Andreas|Undhagen|renstam|fvelsson)$/i;
const engWords = s => [...new Set((CLEAN(s).match(/\b[A-Za-z][A-Za-z'’]{2,}\b/g) || []).filter(w => !OK.test(w)))];

const FIELDS_ITEM  = ["system.itemDescription","system.requirement","system.prerequisite","system.skills","system.banes","system.boons","system.abilities","system.cost"];
const FIELDS_ACTOR = ["system.description","system.traits","system.appearance","system.weakness","system.notes"];
const bad = [];
const stat = {};
const bump = (k, ok) => { const s = stat[k] ??= { ok: 0, bad: 0 }; ok ? s.ok++ : s.bad++; };

const run = (type, src, tr, fields, label) => {
  if (!tr) return;
  const out = dm.mappingFor(type, null).map(dc(src), tr, {});
  const merged = mergeObject(dc(src), out, { inplace: false });
  if (engWords(merged.name).length) { bump(type + ".name", false); bad.push([label, "name", merged.name]); } else bump(type + ".name", true);
  for (const f of fields) {
    const v = gp(merged, f); if (!v || !String(v).trim()) continue;
    const w = engWords(v);
    if (w.length) { bump(type + "." + f, false); bad.push([label, f, w.slice(0, 6).join(",") + "  «" + CLEAN(v).trim().slice(0, 60) + "»"]); }
    else bump(type + "." + f, true);
  }
};

for (const [an, r] of Object.entries(ADV)) {
  const E = T.entries[an];
  run("Adventure", { name: r.name, description: r.description, caption: r.caption }, E, ["description", "caption"], `Adv:${an}`);
  for (const it of r.items || []) run("Item", migrateItem(it), E.items[it.name] ?? E.items[it._id], FIELDS_ITEM, `${an}/Item:${it.name}`);
  for (const a of r.actors || []) {
    const ta = E.actors[a.name];
    run("Actor", { ...a, items: [] }, ta, FIELDS_ACTOR, `${an}/Actor:${a.name}`);
    for (const it of a.items || []) run("Item", migrateItem(it), ta?.items?.[it.name], FIELDS_ITEM, `${an}/${a.name}>${it.name}`);
  }
  for (const j of r.journal || []) {
    run("JournalEntry", { name: j.name }, E.journals[j.name], [], `${an}/J:${j.name}`);
    const tj = E.journals[j.name];
    // 제작진(Credits) 본문은 인명이 영문 그대로인 게 정상 — 본문 영문 검사에서 제외(이름만 검사)
    const bodyFields = j.name === "Credits" ? [] : ["text.content"];
    for (const p of j.pages || []) run("JournalEntryPage", p, tj?.pages?.[p._id] ?? tj?.pages?.[p.name], bodyFields, `${an}/J:${j.name}>${p.name}`);
  }
  for (const t of r.tables || []) {
    const tt = E.tables[t.name];
    run("RollTable", { name: t.name, description: t.description }, tt, ["description"], `${an}/T:${t.name}`);
    for (const x of t.results || []) {
      if (x.type === 1 || x.documentUuid) continue;
      const src = { ...x, description: x.description ?? x.text };   // v14 마이그레이션 반영
      run("TableResult", src, tt?.results?.[x._id], ["description"], `${an}/T:${t.name}#${x._id}`);
    }
  }
  for (const s of r.scenes || []) run("Scene", { name: s.name }, E.scenes[s.name], [], `${an}/S:${s.name}`);
  for (const m of r.macros || []) run("Macro", { name: m.name }, E.macros[m.name], [], `${an}/M:${m.name}`);
  for (const c of r.cards || []) {
    const tc = E.cards[c.name];
    run("Cards", { name: c.name, description: c.description }, tc, ["description"], `${an}/C:${c.name}`);
    for (const cc of c.cards || []) run("Card", cc, tc?.cards?.[cc.name], ["description"], `${an}/C:${c.name}>${cc.name}`);
  }
}

console.log("\n필드별 번역 적용 결과 (Babele 실제 코드로 시뮬레이션)");
for (const [k, v] of Object.entries(stat).sort())
  console.log(`  ${k.padEnd(34)} 한국어 ${String(v.ok).padStart(5)}   영문잔존 ${String(v.bad).padStart(4)}${v.bad ? "  <-- 확인" : ""}`);
if (bad.length) {
  const freq = {};
  for (const [l, f, d] of bad) for (const w of d.split("  ")[0].split(",")) (freq[w] ??= { n: 0, ex: `${l} ${f}` }).n++;
  console.log(`\n플래그된 영문 토큰 빈도 (총 ${bad.length}건)`);
  for (const [w, v] of Object.entries(freq).sort((a,b)=>b[1].n-a[1].n))
    console.log(`  ${String(v.n).padStart(4)}  ${w.padEnd(22)} 예: ${v.ex}`);
} else console.log("\n영문 잔존 0건");
