import fs from "fs";
const SK = JSON.parse(fs.readFileSync("names_rules.json","utf8")).skills;
const files = fs.readdirSync(".").filter(f => /^(jn_\d+|desc_[a-h]|tres_\d+|adesc_[a-d]|atr_traits)\.json$/.test(f));
const body = files.map(f => fs.readFileSync(f,"utf8")).join("\n");
// 기술 굴림 문맥만: "X 굴림", "X을/를 굴리", "X에 성공/실패", "X 기술"
const ctx = w => {
  const e = w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const pats = [`${e} 굴림`, `${e}을 굴리`, `${e}를 굴리`, `${e}에 성공`, `${e}에 실패`, `${e} 기술`, `${e}으로 `, `${e}로 `];
  return pats.reduce((n,p) => n + (body.match(new RegExp(p,"g"))||[]).length, 0);
};
const ALT = { Healing:["치유"], Swimming:["헤엄"], Performance:["연기"], Brawling:["맨손 격투"],
  Awareness:["인지"], Bartering:["거래"], Bushcraft:["생존"], Crafting:["공작","만들기"],
  "Sleight of Hand":["눈속임"], Sneaking:["몰래"], Knives:["나이프"], Staves:["장대","막대"],
  Elementalism:["정령술"], Animism:["애니미즘"], Mentalism:["멘탈리즘"], Slings:["투석기"] };
let issues = [];
for (const [en, ko] of Object.entries(SK)) {
  const c = ctx(ko);
  for (const a of ALT[en]||[]) { const n = ctx(a); if (n > 0) issues.push([en, ko, c, a, n]); }
}
console.log("기술 굴림 문맥에서의 표기 (정본 vs 대안)\n");
if (!issues.length) console.log("  흔들림 없음 ✅");
for (const [en, ko, c, a, n] of issues)
  console.log(`  ${en.padEnd(18)} 정본「${ko}」${String(c).padStart(3)}회   대안「${a}」${String(n).padStart(3)}회  ❗`);
