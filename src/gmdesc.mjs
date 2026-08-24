import { ClassicLevel } from "classic-level";
const open = async d => { const db=new ClassicLevel(d,{valueEncoding:"json"}); const o=[]; for await (const [k,v] of db.iterator()) o.push([k,v]); await db.close(); return o; };
let n=0, eng=0;
for (const src of ["./worlditems","./worldactors"]) for (const [k,v] of await open(src)) {
  if (!/^!items!|^!actors\.items!/.test(k)) continue;
  const g = String(v.system?.gmDescription||"").trim();
  if (!g) continue;
  n++;
  const t = g.replace(/<[^>]*>/g,"");
  if (!/[가-힣]/.test(t) && /[A-Za-z]{4}/.test(t)) { eng++; if (eng<=5) console.log("영문 gmDescription:", v.name, "«"+t.slice(0,80)+"»"); }
}
console.log("\ngmDescription 값 있는 아이템:", n, "| 그중 영문:", eng);
