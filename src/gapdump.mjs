import { ClassicLevel } from "classic-level";
import fs from "fs";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name] = v; await db.close();
const F = ["requirement","prerequisite","skills","banes","boons","abilities","cost","appearance","weakness","notes"];
const out = {};
const add = (f, v, who) => { if (!v || !String(v).trim()) return; const s=String(v);
  ((out[f] ??= {})[s] ??= []).push(who); };
for (const [an, r] of Object.entries(ADV)) {
  for (const it of r.items||[]) for (const f of F) add(f, it.system?.[f], `Item:${it.name}`);
  for (const a of r.actors||[]) { for (const f of F) add(f, a.system?.[f], `Actor:${a.name}`);
    for (const it of a.items||[]) for (const f of F) add(f, it.system?.[f], `${a.name}>${it.name}`); }
  add("advDescription", r.description, `Adv:${r.name}`);
}
for (const [f, m] of Object.entries(out)) {
  const en = Object.entries(m).filter(([v]) => (v.replace(/<[^>]*>/g,"").match(/\b[A-Za-z][a-z]{2,}\b/g)||[]).length >= 1);
  console.log(`\n##### ${f} — distinct ${Object.keys(m).length} (영문포함 ${en.length}), 총 ${Object.values(m).reduce((s,x)=>s+x.length,0)}건`);
}
fs.writeFileSync("gapfields.json", JSON.stringify(out, null, 1));
