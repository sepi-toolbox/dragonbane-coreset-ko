import { ClassicLevel } from "classic-level";
import fs from "fs";
const KO = {};
for (const f of fs.readdirSync(".").filter(f=>/^jn_\d+\.json$/.test(f))) {
  const o = JSON.parse(fs.readFileSync(f,"utf8"));
  for (const [j,p] of Object.entries(o)) Object.assign(KO[j]=KO[j]||{}, p);
}
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name]=v; await db.close();
const len = s => String(s||"").replace(/<[^>]*>/g,"").length;
let done=0, todo=0, doneC=0, todoC=0;
const gaps = {};
for (const [an,r] of Object.entries(ADV)) for (const j of r.journal||[]) for (const p of j.pages||[]) {
  const c = String(p.text?.content||"");
  if (!c.trim()) continue;
  if (KO[j.name]?.[p.name]) { done++; doneC+=len(c); continue; }
  todo++; todoC+=len(c);
  (gaps[an] = gaps[an] || {})[j.name] = (gaps[an][j.name]||0) + len(c);
}
console.log("번역 완료 페이지:", done, "(" + doneC + "자) | 남은:", todo, "(" + todoC + "자)");
for (const [an,js] of Object.entries(gaps)) { console.log("\n### " + an);
  for (const [jn,c] of Object.entries(js).sort((a,b)=>b[1]-a[1])) console.log("  " + String(c).padStart(6) + "자  " + jn); }
