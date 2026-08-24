import fs from "fs";
const rows = JSON.parse(fs.readFileSync("actor_fields.json","utf8"));
const files = process.argv.slice(2);
const KO = {}; for (const f of files) Object.assign(KO, JSON.parse(fs.readFileSync(f,"utf8")));
const TOK = s => [...String(s).matchAll(/@[A-Za-z]+\[[^\]]*\]|\[\[[^\]]*\]\]/g)].map(m=>m[0]).sort().join("|");
const TAGS = s => { const o={}; for (const m of String(s).matchAll(/<\/?([a-z][a-z0-9]*)[^>]*>/gi)) { const t=m[1].toLowerCase(); if(["br","img","hr"].includes(t))continue; o[t]=(o[t]||0)+(m[0][1]==="/"?-1:1);} return o; };
let ok=0, bad=0;
for (const [en, ko] of Object.entries(KO)) {
  const p = [];
  if (TOK(en) !== TOK(ko)) p.push("인리처 불일치\n  EN: "+TOK(en)+"\n  KO: "+TOK(ko));
  const te=TAGS(en), tk=TAGS(ko);
  for (const t of new Set([...Object.keys(te),...Object.keys(tk)])) if ((te[t]||0)!==(tk[t]||0)) p.push(`<${t}> 짝 ${te[t]||0} vs ${tk[t]||0}`);
  const eng = ko.replace(/<[^>]*>/g,"").replace(/\[\[[^\]]*\]\]/g,"").replace(/@[A-Za-z]+\[[^\]]*\](\{[^}]*\})?/g,"").match(/\b[A-Za-z]{4,}\b/g);
  if (eng) p.push("영문 잔존: "+JSON.stringify([...new Set(eng)]));
  if (p.length) { bad++; console.log("\n[문제]", en.replace(/<[^>]*>/g,"").slice(0,50)); p.forEach(x=>console.log("  -",x)); } else ok++;
}
console.log(`\n액터 필드 검증: OK ${ok} / 문제 ${bad} (총 ${Object.keys(KO).length})`);
