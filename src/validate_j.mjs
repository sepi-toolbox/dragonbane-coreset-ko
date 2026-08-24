import { ClassicLevel } from "classic-level";
import fs from "fs";
const KO = {};
for (const f of process.argv.slice(2)) {
  const o = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const [j, pages] of Object.entries(o)) Object.assign(KO[j] = KO[j] || {}, pages);
}
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v; await db.close();
const EN = {};
for (const r of Object.values(ADV)) for (const j of r.journal || []) {
  EN[j.name] = EN[j.name] || {};
  for (const p of j.pages || []) EN[j.name][p.name] = String(p.text?.content || "");
}
const TOK = s => [...String(s).matchAll(/@[A-Za-z]+\\[[^\\]]*\\]|\\[\\[[^\\]]*\\]\\]/g)].map(m => m[0]).sort().join("|");
const TAGS = s => { const o = {}; for (const m of String(s).matchAll(/<\/?([a-z][a-z0-9]*)[^>]*>/gi)) { const t = m[1].toLowerCase(); if (["br","img","hr"].includes(t)) continue; o[t] = (o[t]||0) + (m[0][1]==="/"?-1:1); } return o; };
const ATTRS = s => [...String(s).matchAll(/(class|id|src|href|style|data-[a-z-]+)="[^"]*"/g)].map(m => m[0]).sort().join("|");
let ok=0, bad=0;
for (const [jn, pages] of Object.entries(KO)) for (const [pn, ko] of Object.entries(pages)) {
  const en = EN[jn]?.[pn]; const iss=[];
  if (en === undefined) iss.push("원본에 없는 페이지");
  else {
    if (TOK(en) !== TOK(ko)) iss.push("인리처 불일치\n      en: " + TOK(en) + "\n      ko: " + TOK(ko));
    const a=TAGS(en), b=TAGS(ko);
    for (const t of new Set([...Object.keys(a), ...Object.keys(b)])) if ((a[t]||0)!==(b[t]||0)) iss.push(`태그 <${t}> ${a[t]||0} -> ${b[t]||0}`);
    if (ATTRS(en) !== ATTRS(ko)) iss.push("속성 불일치\n      en: " + ATTRS(en) + "\n      ko: " + ATTRS(ko));
  }
  for (const [t,n] of Object.entries(TAGS(ko))) if (n!==0) iss.push(`닫히지 않은 <${t}> (${n})`);
  if (iss.length) { bad++; console.log("✗ [" + jn + "] " + pn); iss.forEach(i=>console.log("    "+i)); } else ok++;
}
console.log(`\n저널 페이지 검증: OK ${ok} / 문제 ${bad}`);
