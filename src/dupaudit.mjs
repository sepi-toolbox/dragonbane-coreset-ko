import { ClassicLevel } from "classic-level";
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name] = v; await db.close();
const F = ["description","requirement","prerequisite","skills","banes","boons","abilities","cost"];
const strip = s => String(s ?? "").replace(/<[^>]*>/g, "").slice(0, 50);
let dup = 0, conflict = 0;
console.log("액터 내장 아이템 이름 중복 (같은 이름 + 내용 다름 = 덮어쓰기 손실)\n");
for (const [an, r] of Object.entries(ADV)) for (const a of r.actors || []) {
  const by = {};
  for (const it of a.items || []) (by[it.name] ??= []).push(it);
  for (const [n, list] of Object.entries(by)) {
    if (list.length < 2) continue;
    dup++;
    const sig = list.map(it => F.map(f => String(it.system?.[f] ?? "")).join(""));
    if (new Set(sig).size > 1) {
      conflict++;
      const diff = F.filter(f => new Set(list.map(x => String(x.system?.[f] ?? ""))).size > 1);
      console.log(`  [충돌] ${an} / ${a.name} / "${n}" x${list.length}`);
      list.forEach((it, i) => {
        console.log(`      (${i}) type=${it.type} ` + diff.map(f => `${f}=<<${strip(it.system?.[f])}>>`).join("  "));
      });
    }
  }
}
console.log(`\n중복 이름 ${dup}건 / 내용 충돌 ${conflict}건`);
let tdup = 0;
for (const [an, r] of Object.entries(ADV)) {
  const by = {};
  for (const it of r.items || []) (by[it.name] ??= []).push(it);
  for (const [n, l] of Object.entries(by)) if (l.length > 1) { tdup++; console.log(`  (최상위) ${an} "${n}" x${l.length} -> _id 키로 분기됨`); }
}
console.log(`최상위 중복 ${tdup}건`);
