import { ClassicLevel } from "classic-level";
import fs from "fs";
const RES = {}, TD = {};
for (const f of fs.readdirSync(".").filter(f=>/^tres_\d+\.json$/.test(f))) {
  const o = JSON.parse(fs.readFileSync(f,"utf8"));
  for (const [t,r] of Object.entries(o.results||{})) Object.assign(RES[t]=RES[t]||{}, r);
  Object.assign(TD, o.descriptions||{});
}
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name]=v; await db.close();
let done=0, todo=0;
const gaps = {};
for (const [an,r] of Object.entries(ADV)) for (const t of r.tables||[]) {
  for (const x of t.results||[]) {
    if (x.type === 1 || x.documentUuid) continue;
    if (RES[t.name]?.[x._id]) { done++; continue; }
    todo++; (gaps[an] = gaps[an] || new Set()).add(t.name);
  }
  if (String(t.description||"").trim() && !TD[t.name]) (gaps[an] = gaps[an] || new Set()).add("[desc] " + t.name);
}
console.log("번역 완료 text 결과:", done, "| 남은:", todo);
for (const [an,s] of Object.entries(gaps)) console.log("\n### " + an + "\n  " + [...s].join("\n  "));
