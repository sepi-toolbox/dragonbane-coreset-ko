import { ClassicLevel } from "classic-level";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name]=v; await db.close();
const [adv, jpat, ppat] = process.argv.slice(2);
const JP = new RegExp(jpat), PP = ppat ? new RegExp(ppat) : /./;
for (const j of ADV[adv].journal || []) {
  if (!JP.test(j.name)) continue;
  for (const p of j.pages || []) {
    if (!PP.test(p.name)) continue;
    const c = String(p.text?.content || "");
    if (!c.trim()) continue;
    console.log("\n#### [" + j.name + "] >> " + p.name);
    console.log(c);
  }
}
