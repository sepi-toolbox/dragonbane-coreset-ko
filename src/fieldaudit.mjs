import { ClassicLevel } from "classic-level";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name] = v; await db.close();
// 사람이 읽는 문장이 담길 수 있는 모든 문자열 경로를 수집
const SKIP = /(^|\.)(_id|_key|_stats|img|src|texture|icon|folder|sort|ownership|flags|type|uuid|sourceId|permission|color|font|scale|width|height|x|y|z|rotation|alpha|tint|elevation|hidden|locked|randomImg|thumb|path|padding|grid|initial|weight|system\.(hitPoints|willPoints|damageBonus|movement|encumbrance|currency|age|ferocity|armorRating|skillValue|attributes|hp|wp|value|max|agl|con|str|int|wil|cha))/;
const hits = {};
const walk = (o, p, type) => {
  if (o === null || typeof o !== "object") return;
  for (const [k, v] of Object.entries(o)) {
    const np = p ? p + "." + k : k;
    if (Array.isArray(v)) { v.forEach(x => walk(x, np, type)); continue; }
    if (v && typeof v === "object") { walk(v, np, type); continue; }
    if (typeof v !== "string" || !v.trim()) continue;
    if (SKIP.test(np)) continue;
    // 영문 문장으로 보이는가 (영단어 3개 이상 또는 4자 이상 단어 2개)
    const words = v.replace(/<[^>]*>/g,"").match(/\b[A-Za-z][a-z]{2,}\b/g) || [];
    if (words.length < 3) continue;
    const key = type + " :: " + np.replace(/\.\d+\./g, ".*.");
    (hits[key] ??= { n: 0, sample: v.replace(/<[^>]*>/g,"").slice(0,70) }).n++;
  }
};
for (const [an, r] of Object.entries(ADV)) {
  walk({ name: r.name, description: r.description, caption: r.caption }, "", "Adventure");
  for (const it of r.items||[])   walk(it, "", "Item");
  for (const a of r.actors||[]) { walk({...a, items: undefined}, "", "Actor"); for (const it of a.items||[]) walk(it, "", "Actor>Item"); }
  for (const j of r.journal||[]) { walk({name:j.name}, "", "JournalEntry"); for (const pg of j.pages||[]) walk(pg, "", "JournalEntryPage"); }
  for (const t of r.tables||[]) { walk({name:t.name, description:t.description}, "", "RollTable"); for (const x of t.results||[]) walk(x, "", "TableResult"); }
  for (const s of r.scenes||[])  walk({name:s.name}, "", "Scene");
  for (const m of r.macros||[])  walk({name:m.name}, "", "Macro");
  for (const c of r.cards||[]) { walk({name:c.name, description:c.description}, "", "Cards"); for (const cc of c.cards||[]) walk({name:cc.name, description:cc.description, suit:cc.suit}, "", "Card"); }
}
console.log("영문 문장이 담긴 필드 경로 (문서종류 :: 경로 / 건수)\n");
for (const [k, v] of Object.entries(hits).sort((a,b)=>b[1].n-a[1].n))
  console.log(String(v.n).padStart(5), k, "\n        «" + v.sample + "»");
