import { ClassicLevel } from "classic-level";
const db = new ClassicLevel("./worlditems", { valueEncoding: "json" });
let n = 0; const hits = [];
for await (const [k, v] of db.iterator()) {
  n++;
  if (/이중 베기|Double Slash/.test(v.name)) hits.push(v);
}
await db.close();
console.log("월드 items 문서 수:", n);
for (const h of hits) {
  console.log("\n찾음:", JSON.stringify(h.name), "| type:", h.type);
  const d = String(h.system?.description || "").replace(/<[^>]*>/g,"");
  console.log("  description:", /[가-힣]/.test(d) ? "한국어" : "영문", "«" + d.slice(0,70) + "»");
  console.log("  requirement:", JSON.stringify(h.system?.requirement));
}
