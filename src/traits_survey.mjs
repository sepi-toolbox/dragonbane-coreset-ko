import { ClassicLevel } from "classic-level";
import fs from "fs";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const rows = [];
for await (const [k,v] of db.iterator()) {
  for (const a of v.actors || []) {
    const t = String(a.system?.traits || "").trim();
    const d = String(a.system?.description || "").trim();
    rows.push({ adv: v.name, name: a.name, id: a._id, type: a.type, traits: t, desc: d });
  }
}
await db.close();
const wt = rows.filter(r=>r.traits);
console.log("액터 총", rows.length, "| traits 있음", wt.length, "| description 있음", rows.filter(r=>r.desc).length);
const uniqT = new Map(); for (const r of wt) { const key = r.traits; if(!uniqT.has(key)) uniqT.set(key, []); uniqT.get(key).push(r.name); }
console.log("distinct traits 문자열:", uniqT.size, "| 총 글자수(distinct):", [...uniqT.keys()].reduce((s,x)=>s+x.replace(/<[^>]*>/g,"").length,0));
const uniqD = new Map(); for (const r of rows.filter(r=>r.desc)) { if(!uniqD.has(r.desc)) uniqD.set(r.desc, []); uniqD.get(r.desc).push(r.name); }
console.log("distinct description 문자열:", uniqD.size, "| 총 글자수(distinct):", [...uniqD.keys()].reduce((s,x)=>s+x.replace(/<[^>]*>/g,"").length,0));
fs.writeFileSync("actor_fields.json", JSON.stringify(rows, null, 1));
// 현재 번역본에 액터 description/traits가 들어있는지
const cur = JSON.parse(fs.readFileSync("cs_translation.json","utf8"));
let hasD=0, hasT=0, tot=0;
for (const e of Object.values(cur.entries||{})) for (const a of Object.values(e.actors||{})) { tot++; if(a.description) hasD++; if(a.traits) hasT++; }
console.log("현재 번역본 actors 엔트리:", tot, "| description 키 있음", hasD, "| traits 키 있음", hasT);
