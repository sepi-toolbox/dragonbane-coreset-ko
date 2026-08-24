import { ClassicLevel } from "classic-level";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name]=v; await db.close();
const advArg = process.argv[2], pat = new RegExp(process.argv[3]);
for (const t of ADV[advArg].tables || []) {
  if (!pat.test(t.name)) continue;
  console.log("\n### TABLE: " + t.name);
  if (String(t.description||"").trim()) console.log("  [desc] " + t.description);
  for (const x of t.results || []) {
    if (x.type === 1 || x.documentUuid) { console.log("  {" + x._id + "} [DOC] " + x.name); continue; }
    console.log("  {" + x._id + "} " + String(x.description ?? x.text ?? "").replace(/\n/g, " "));
  }
}
