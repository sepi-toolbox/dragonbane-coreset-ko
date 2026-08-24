import { ClassicLevel } from "classic-level";
import fs from "fs";
const RES = {}, TD = {};
for (const f of process.argv.slice(2)) {
  const o = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const [t, r] of Object.entries(o.results || {})) Object.assign(RES[t] = RES[t] || {}, r);
  Object.assign(TD, o.descriptions || {});
}
const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v; await db.close();
const EN = {}, ENTD = {};
for (const r of Object.values(ADV)) for (const t of r.tables || []) {
  EN[t.name] = EN[t.name] || {};
  for (const x of t.results || []) EN[t.name][x._id] = String(x.description ?? x.text ?? "");
  ENTD[t.name] = String(t.description || "");
}
const TOK = s => [...String(s).matchAll(/@[A-Za-z]+\\[[^\\]]*\\]|\\[\\[[^\\]]*\\]\\]/g)].map(m => m[0]).sort().join("|");
const TAGS = s => { const o = {}; for (const m of String(s).matchAll(/<\/?([a-z][a-z0-9]*)[^>]*>/gi)) { const t = m[1].toLowerCase(); if (["br","img","hr"].includes(t)) continue; o[t] = (o[t]||0) + (m[0][1]==="/"?-1:1); } return o; };
let ok = 0, bad = 0, orphan = 0;
for (const [tname, rs] of Object.entries(RES)) {
  if (!EN[tname]) { console.log("✗ 표 없음:", tname); orphan++; continue; }
  for (const [rid, ko] of Object.entries(rs)) {
    const en = EN[tname][rid];
    const iss = [];
    if (en === undefined) iss.push("결과 _id 없음");
    else {
      if (TOK(en) !== TOK(ko)) iss.push("인리처 불일치\n      en: " + TOK(en) + "\n      ko: " + TOK(ko));
      const a = TAGS(en), b = TAGS(ko);
      for (const t of new Set([...Object.keys(a), ...Object.keys(b)])) if ((a[t]||0) !== (b[t]||0)) iss.push(`태그 <${t}> ${a[t]||0} -> ${b[t]||0}`);
    }
    const eng = String(ko).replace(/<[^>]*>/g,"").replace(/@\w+\[[^\]]*\]/g,"").replace(/\[\[\/[^\]]*\]\]/g,"").match(/[A-Za-z][A-Za-z'&. -]{5,}/g);
    if (eng) iss.push("영문 잔존: " + JSON.stringify(eng));
    if (iss.length) { bad++; console.log("✗ " + tname + " {" + rid + "}"); iss.forEach(i => console.log("    " + i)); } else ok++;
  }
}
for (const [tname, ko] of Object.entries(TD)) {
  if (TOK(ENTD[tname] || "") !== TOK(ko)) { bad++; console.log("✗ [표설명] " + tname + " 인리처 불일치"); } else ok++;
}
console.log(`\n표 결과 검증: OK ${ok} / 문제 ${bad}${orphan ? " / 고아표 " + orphan : ""}`);
