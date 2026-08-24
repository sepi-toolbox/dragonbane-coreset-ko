import fs from "fs";
const SK = JSON.parse(fs.readFileSync("names_rules.json","utf8")).skills;
const files = fs.readdirSync(".").filter(f => /^(jn_\d+|desc_[a-h]|tres_\d+|adesc_[a-d]|atr_traits)\.json$/.test(f));
const body = files.map(f => fs.readFileSync(f,"utf8")).join("\n");
// 정본(사전) 표기 vs 흔한 대안 표기
const ALT = {
  "Healing": ["치유"], "Swimming": ["헤엄"], "Performance": ["연기"], "Brawling": ["맨손 격투","격투"],
  "Slings": ["투석기"], "Bartering": ["거래","흥정하기"], "Awareness": ["지각","인지"],
  "Spot Hidden": ["숨은것 찾기","은닉 발견"], "Sleight of Hand": ["손기술","눈속임"],
  "Bushcraft": ["야외생활","생존"], "Beast Lore": ["야수학","야수 학"], "Myths & Legends": ["신화와전설"],
  "Elementalism": ["정령술","원소 마법"], "Animism": ["애니미즘"], "Mentalism": ["멘탈리즘","정신 마법"],
  "Riding": ["기승","말타기"], "Seamanship": ["뱃일","선원술"], "Evade": ["피하기","회피하기"],
  "Acrobatics": ["곡예술","아크로바틱"], "Crafting": ["공작","만들기"], "Persuasion": ["설득하기"],
  "Languages": ["언어학"], "Sneaking": ["잠행","몰래"], "Knives": ["나이프","칼"], "Staves": ["장대","막대"],
};
const count = (s) => (body.match(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "g")) || []).length;
let bad = 0;
console.log("기술명 정본 표기 vs 대안 표기 사용 현황\n");
for (const [en, ko] of Object.entries(SK)) {
  const c = count(ko);
  const alts = (ALT[en]||[]).map(a => [a, count(a)]).filter(([,n]) => n > 0);
  if (!alts.length) continue;
  bad++;
  console.log(`  ${en}`);
  console.log(`     정본 「${ko}」: ${c}회`);
  alts.forEach(([a,n]) => console.log(`     대안 「${a}」: ${n}회  ← 검토 필요`));
}
console.log(bad ? `\n표기 흔들림 후보 ${bad}건` : "\n흔들림 없음 ✅");
