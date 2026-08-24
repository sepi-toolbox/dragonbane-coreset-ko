import fs from "fs";
const rows = JSON.parse(fs.readFileSync("actor_fields.json","utf8"));
const field = process.argv[2];       // traits | desc
const from = +(process.argv[3]||0), to = +(process.argv[4]||999);
const m = new Map();
for (const r of rows) { const v = r[field]; if (!v) continue; if (!m.has(v)) m.set(v, []); m.get(v).push(r.name); }
let i = 0;
for (const [v, names] of m) {
  if (i >= from && i < to) console.log(`\n#### [${i}] ${names.join(" / ")}\n${v}`);
  i++;
}
console.error(`distinct ${field}: ${m.size}`);
