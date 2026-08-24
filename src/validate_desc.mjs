import { ClassicLevel } from "classic-level";
import fs from "fs";
const files = process.argv.slice(2);
const KO = {};
for (const f of files) Object.assign(KO, JSON.parse(fs.readFileSync(f, "utf8")));
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const EN = {};
for await (const [k, v] of db.iterator()) {
  for (const it of v.items || []) { EN[it.name] = String(it.system?.description || ""); EN[it._id] = EN[it.name]; }
  for (const a of v.actors || []) for (const it of a.items || []) { if (EN[it.name] === undefined) EN[it.name] = String(it.system?.description || ""); EN[it._id] = String(it.system?.description || ""); }
}
await db.close();

const TOK = s => [...String(s).matchAll(/@UUID\[[^\]]*\]|\[\[\/[^\]]*\]\]|@Lookup\[[^\]]*\]/g)].map(m => m[0]).sort();
const TAGS = s => { const o = {}; for (const m of String(s).matchAll(/<\/?([a-z][a-z0-9]*)[^>]*>/gi)) { const t = m[1].toLowerCase(); if (t === "br" || t === "img" || t === "hr") continue; o[t] = (o[t] || 0) + (m[0][1] === "/" ? -1 : 1); } return o; };
const ATTRS = s => [...String(s).matchAll(/(class|id|style|src|href)="[^"]*"/g)].map(m => m[0]).sort();

let bad = 0, ok = 0;
for (const [name, ko] of Object.entries(KO)) {
  const en = EN[name];
  const issues = [];
  if (en === undefined) { issues.push("원본에 없는 아이템명"); }
  else {
    const a = TOK(en).join("|"), b = TOK(ko).join("|");
    if (a !== b) issues.push("엔리처 불일치\n      en: " + a + "\n      ko: " + b);
    const ta = TAGS(en), tb = TAGS(ko);
    for (const t of new Set([...Object.keys(ta), ...Object.keys(tb)])) if ((ta[t] || 0) !== (tb[t] || 0)) issues.push(`태그 <${t}> 개수 ${ta[t] || 0} -> ${tb[t] || 0}`);
    const aa = ATTRS(en).join("|"), ab = ATTRS(ko).join("|");
    if (aa !== ab) issues.push("속성 불일치\n      en: " + aa + "\n      ko: " + ab);
  }
  const bal = TAGS(ko); for (const [t, n] of Object.entries(bal)) if (n !== 0) issues.push(`닫히지 않은 <${t}> (${n})`);
  const eng = String(ko).replace(/<[^>]*>/g, "").replace(/@UUID\[[^\]]*\]/g, "").replace(/\[\[\/[^\]]*\]\]/g, "").match(/[A-Za-z][A-Za-z'&. -]{5,}/g);
  if (eng) issues.push("영문 잔존: " + JSON.stringify(eng));
  if (issues.length) { bad++; console.log("✗ " + name); issues.forEach(i => console.log("    " + i)); } else ok++;
}
console.log(`\n검증: OK ${ok} / 문제 ${bad} (총 ${Object.keys(KO).length})`);
