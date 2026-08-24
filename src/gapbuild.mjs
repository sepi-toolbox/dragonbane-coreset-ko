import fs from "fs";
const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const r1 = rd("names_rules.json"), r2 = rd("names_rules2.json");
const G = rd("gapfields.json");

// ── 토큰 사전 ────────────────────────────────────────────────
const SKILL = { ...r1.skills };
SKILL["Swim"] = SKILL["Swimming"];            // 데이터 표기 흔들림
const ABIL = { ...r1.abilities };
const SPELL = { ...r2.spells };
const KIN = { ...r1.kins };
const ATTR = { STR:"힘", CON:"건강", AGL:"민첩", INT:"지능", WIL:"의지", CHA:"매력" };
const SCHOOL = { Animism:"애니미즘", Elementalism:"정령술", Mentalism:"멘탈리즘", Generalism:"일반 마법",
  "Any School of Magic":"마법 학파 아무거나" };
const unknown = new Set();

const tok = t => {
  const s = t.trim(); if (!s || s === "-" || s === "–") return s;
  const up = s.toUpperCase();
  // 주문명은 데이터에서 대문자
  for (const [en, ko] of Object.entries(SPELL)) if (en.toUpperCase() === up) return ko;
  if (SKILL[s]) return SKILL[s];
  if (ABIL[s]) return ABIL[s];
  if (SCHOOL[s]) return SCHOOL[s];
  if (KIN[s]) return KIN[s];
  if (ATTR[up]) return ATTR[up];
  unknown.add(s); return s;
};
// "A, B, or C" / "A or B" 형태 유지하며 토큰만 치환
const list = v => v.split(/,\s*/).map(part => {
  const m = part.match(/^(or\s+)?(.+?)$/i);
  const orPre = /^or\s+/i.test(part);
  let body = part.replace(/^or\s+/i, "");
  const orMid = body.match(/^(.+?)\s+or\s+(.+)$/i);
  if (orMid) return (orPre ? "또는 " : "") + tok(orMid[1]) + " 또는 " + tok(orMid[2]);
  return (orPre ? "또는 " : "") + tok(body);
}).join(", ");

// ── cost ────────────────────────────────────────────────────
const CUR = { gold:"금화", guld:"금화", silver:"은화", copper:"동화" };
const cost = v => {
  const s = v.trim();
  if (s === "-" || s === "–") return s;
  if (s === "Varies") return "가변";
  let m;
  if ((m = s.match(/^(\d+) (gold|guld|silver|copper)$/i)))              return `${CUR[m[2].toLowerCase()]} ${m[1]}닢`;
  if ((m = s.match(/^(\d+) (gold|silver|copper) x potency$/i)))         return `${CUR[m[2].toLowerCase()]} ${m[1]}닢 × 강도`;
  if ((m = s.match(/^(\d+) (gold|silver|copper) \/ day$/i)))            return `하루 ${CUR[m[2].toLowerCase()]} ${m[1]}닢`;
  if ((m = s.match(/^(\d+) (gold|silver|copper) \/ shift or more$/i)))  return `1시프트당 ${CUR[m[2].toLowerCase()]} ${m[1]}닢 이상`;
  if ((m = s.match(/^(\d+) (gold|silver|copper) per kilometer$/i)))     return `1킬로미터당 ${CUR[m[2].toLowerCase()]} ${m[1]}닢`;
  if ((m = s.match(/^(\d+D\d+)(?: x (\d+))? (gold|silver|copper)$/i)))
    return m[2] ? `${CUR[m[3].toLowerCase()]} ${m[1]}×${m[2]}닢` : `${CUR[m[3].toLowerCase()]} ${m[1]}닢`;
  unknown.add("cost:" + s); return s;
};

// ── requirement ─────────────────────────────────────────────
const ING = {
  "branches or roots nearby":"주변의 가지나 뿌리", "stone":"돌", "something to draw with":"그릴 수 있는 것",
  "corpse":"시체", "stone or soil":"돌이나 흙", "open fire":"타오르는 불", "pebbles":"조약돌",
  "water source":"물이 있는 곳", "water":"물", "holy symbol":"성표",
};
const req = v => {
  let s = v.trim();
  if (s === "-" || s === "–") return s;
  if (s === "Ord, Gest") s = "Word, gesture";                       // 스웨덴어 잔존
  let m;
  if ((m = s.match(/^(Word|Gesture)$/i)))                     return m[1].toLowerCase() === "word" ? "말" : "손짓";
  if (/^Word, gesture$/i.test(s))                             return "말, 손짓";
  if ((m = s.match(/^Gesture, ingredient \((.+)\)$/i)))       return `손짓, 재료(${ING[m[1]] ?? m[1]})`;
  if ((m = s.match(/^Word, gesture, ingredient \((.+)\)$/i))) return `말, 손짓, 재료(${ING[m[1]] ?? m[1]})`;
  if ((m = s.match(/^Word, gesture, focus \((.+)\)$/i)))      return `말, 손짓, 매개물(${ING[m[1]] ?? m[1]})`;
  if (/^Any melee weapon skill 12$/i.test(s))                 return "근접 무기 기술 아무거나 12";
  if (/^Any weapon skill 12$/i.test(s))                       return "무기 기술 아무거나 12";
  if (/^Any STR-based melee weapon skill 12$/i.test(s))       return "힘 기반 근접 무기 기술 아무거나 12";
  if (/^Any magic school 12$/i.test(s))                       return "마법 학파 아무거나 12";
  if ((m = s.match(/^(.+?) 12$/)))                            return list(m[1]) + " 12";
  if (KIN[s])                                                 return KIN[s];
  unknown.add("req:" + s); return s;
};

// ── 필드별 처리 ──────────────────────────────────────────────
const out = {};
const put = (f, fn) => { out[f] = {}; for (const k of Object.keys(G[f] || {})) out[f][k] = fn(k); };
put("cost", cost);
put("requirement", req);
for (const f of ["skills","banes","boons","abilities","prerequisite"]) put(f, list);

fs.writeFileSync("gap_auto.json", JSON.stringify(out, null, 1));
console.log("자동 생성:");
for (const [f, m] of Object.entries(out)) console.log("  " + f.padEnd(14), Object.keys(m).length + "종");
if (unknown.size) { console.log("\n⚠ 미매핑 토큰:"); [...unknown].sort().forEach(x => console.log("   " + x)); }
else console.log("\n미매핑 토큰 0 ✅");
