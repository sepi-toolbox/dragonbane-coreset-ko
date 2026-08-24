import fs from "fs";
const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const n1 = rd("names_rules.json"), n2 = rd("names_rules2.json"), n3 = rd("names_rules3.json"),
      nx = rd("names_extra.json"), na = rd("names_adv.json");

// @Display*[...]{라벨} / @UUID[...]{라벨} 안의 라벨을 한국어로 치환하기 위한 통합 사전
export const LBL = Object.assign({},
  n1.skills, n1.abilities, n1.kins, n1.professions, n1.injuries, n1.actors, n1.folders,
  n2.spells, n2.weapons, n2.armors, n2.items,
  n3.tables, n3.scenes, n3.macros, n3.cards,
  nx.extraItems, na.items, na.actors, na.tables, na.scenes, na.folders);

// HTML 엔티티가 섞인 라벨 보정
LBL["Hunting &amp; Fishing"] = "사냥과 낚시";
LBL["Myths &amp; Legends"] = "신화와 전설";
LBL["Armor &amp; Helmets"] = "갑옷과 투구";
LBL["Studies &amp; Magic"] = "학문과 마법";
LBL["Quill &amp; Ink"] = "깃펜과 잉크";
LBL["Flint &amp; Tinder"] = "부싯돌과 부싯깃";

export const unknown = new Set();

// 인리처 라벨만 사전으로 치환. 사전에 없으면 원문 유지 + unknown 기록
export function relabel(s, extra = {}) {
  const D = Object.assign({}, LBL, extra);
  return String(s).replace(/(@[A-Za-z]+\[[^\]]*\])\{([^}]*)\}/g, (m, tag, lab) => {
    if (D[lab] === undefined) { unknown.add(lab); return m; }
    return tag + "{" + D[lab] + "}";
  });
}

export function reportUnknown() {
  if (unknown.size) { console.error("미매핑 라벨(" + unknown.size + "):", [...unknown].join(" | ")); return true; }
  return false;
}
