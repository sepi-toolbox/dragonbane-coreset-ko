import { ClassicLevel } from "classic-level";
import fs from "fs";
import { relabel, reportUnknown } from "./relabel.mjs";

// @Gear/@GearTableStart 라벨은 표기가 도치형("Warhammer, Light")이라 별도 보정
const EXTRA = {
  "Armor &amp; Helmets": "갑옷과 투구", "Melee Weapons": "근접 무기", "Ranged Weapons": "원거리 무기",
  "Clothes": "의복", "Musical Instruments": "악기", "Trade Goods": "교역품", "Studies &amp; Magic": "학문과 마법",
  "Light Sources": "광원", "Tools": "도구", "Containers": "용기", "Medicine": "의약품", "Services": "서비스",
  "Hunting &amp; Fishing": "사냥과 낚시", "Means of Travel": "이동 수단", "Animals": "동물",
  "Blunt Object, Light": "둔기, 가벼운", "Blunt Object, Heavy": "둔기, 무거운",
  "Warhammer, Light": "워해머, 경량", "Warhammer, Heavy": "워해머, 중량",
  "Wooden Club, Small": "나무 곤봉, 작은", "Wooden Club, Large": "나무 곤봉, 큰",
  "Shield, Small": "방패, 작은", "Shield, Large": "방패, 큰",
  "Crossbow, Light": "석궁, 경량", "Crossbow, Heavy": "석궁, 중량", "Crossbow, Hand": "석궁, 손",
  "Lockpicks, Advanced": "자물쇠 따개, 고급", "Lockpicks, Simple": "자물쇠 따개, 보급",
  "Quiver of Arrows, Iron Head": "화살통, 쇠촉", "Quiver of Arrows, Wooden Head": "화살통, 나무촉",
  "Rope, Hemp (10 meters)": "밧줄, 삼 (10미터)", "Rope, Silk (10 meters)": "밧줄, 비단 (10미터)",
  "Tent, Large": "천막, 큰", "Tent, Small": "천막, 작은",
  "Poison, Lethal (dose)": "독, 치명적인 (1회분)", "Poison, Paralyzing (dose)": "독, 마비 (1회분)",
  "Poison, Sleeping (dose)": "독, 수면 (1회분)",
  "Lodging at Inn, Dormitory": "여관 숙박, 공동 침실", "Lodging at Inn, Separate Room": "여관 숙박, 독방",
  "Lodging at Inn, Luxury Suite": "여관 숙박, 특실",
  "Griomoire": "마법서", "Needle &amp; Thread": "바늘과 실", "Book": "책", "Perfume (10 doses)": "향수 (10회분)",
  "Bandages (10)": "붕대 (10개)", "Healing Potion (dose)": "치유 물약 (1회분)",
  "Herbal Concoction (dose)": "약초 조합액 (1회분)"
};

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const pages = jn => {
  for (const r of Object.values(ADV)) for (const j of r.journal || []) if (j.name === jn) return j.pages || [];
  throw new Error("저널 없음: " + jn);
};

const S = (id, ko) => `@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.${id}]{${ko}}`;
const J = { "6. Gear": {} };

J["6. Gear"]["Introduction"] = `<p>이 장에서는 드래곤베인 세계에서 구할 수 있는 온갖 물품과 서비스, 그리고 그 통상 가격을 다룹니다. 표에는 물품의 @UUID[JournalEntry.17jatv6QqDKgsEU1.JournalEntryPage.2WJ8cGMOW9TeUYhe]{무게}와 기계적 효과도 함께 실려 있습니다.</p><h2>수급</h2><p>어떤 물품과 서비스는 구하기 어려워, 플레이어 캐릭터들이 찾는 것을 아무 작은 마을에서나 얻으리라 기대할 수는 없습니다. 각 물품에는 다음 등급으로 매겨진 수급 등급이 있습니다.</p><ul><li><p><strong>흔함</strong>: 어느 마을이나 장터에서든 구할 수 있습니다.</p></li><li><p><strong>드묾</strong>: 보통 그것을 만드는 장인에게서만 살 수 있으며, 따라서 모든 마을에 있으리라는 보장은 없습니다.</p></li><li><p><strong>희귀</strong>: 대개 장인에게 특별히 주문해야 합니다.</p></li><li><p><strong>유일</strong>: 보물 더미에서 찾거나, 그 귀한 물건을 발견한 사람에게서만 얻을 수 있습니다.</p></li></ul><h2>무기와 갑옷</h2><p>모험가라면 언제나 무기를 손 닿는 곳에 두고 싶어 합니다. 위험이 어디 도사리고 있을지 알 수 없으니까요. @UUID[.unZDN4qPEzHSgRdr]{근접 무기}와 @UUID[.2DMSjttCdZhkXage]{원거리 무기} 표에 흔한 무기 종류가 실려 있습니다. 표에 나오는 값은 아래에서 설명합니다.</p><p><strong>파지</strong>는 그 무기를 다루는 데 한 손이 필요한지 두 손이 필요한지 나타냅니다. 자세한 내용은 ${S("KAxnhLbO8N7kcvMl", "근접 전투")}에서 볼 수 있습니다.</p><p><strong>힘</strong>은 그 무기를 제대로 쓰는 데 필요한 힘 수치를 나타냅니다. 자세한 내용은 ${S("KAxnhLbO8N7kcvMl", "근접 전투")}에서 볼 수 있습니다.</p><p><strong>피해</strong>는 명중했을 때 그 무기가 입히는 피해량을 나타냅니다. 피해는 피해 보너스로 늘어나고 갑옷으로 줄어듭니다.</p><p><strong>내구도</strong>는 무기를 손상시키지 않고 막아낼 수 있는 피해량을 결정합니다. 막기에 관한 자세한 내용은 ${S("KAxnhLbO8N7kcvMl#parrying", "막기")}에서 볼 수 있습니다.</p><p><strong>사거리</strong>는 그 무기를 효과적으로 쓸 수 있는 최대 거리(미터)를 나타냅니다. 자세한 내용은 ${S("mvLh4QYkCfAap0HN", "원거리 전투")}에서 볼 수 있습니다.</p><p><strong>가격</strong>은 그 무기의 통상 가격을 나타냅니다. 실제 가격은 지역의 수요와 공급에 따라 달라질 수 있습니다.</p><p><strong>특성</strong>은 그 무기가 지닌 특성을 나타냅니다.</p><ul><li><p><strong>은밀</strong>: ${S("KrSXg7HKmfo7xRcI#sneak-attack", "기습 공격")}을 할 때 이점과 늘어난 피해를 줍니다.</p></li><li><p><strong>긴 무기</strong>: 이 근접 무기로 하는 공격은 최대 4미터(두 칸) 떨어진 적을 맞힐 수 있습니다.</p></li><li><p><strong>넘어뜨리기</strong>: 상대를 ${S("KAxnhLbO8N7kcvMl#special-attacks", "넘어뜨리려")} 할 때 이점을 줍니다.</p></li><li><p><strong>관통</strong>: 관통 피해를 입히며, 이는 ${S("CJjqkHzpow39ViUi#damage-types-and-armor", "갑옷의 효과")}에 영향을 줄 수 있습니다.</p></li><li><p><strong>참격</strong>: 참격 피해를 입힙니다. 무기가 참격과 관통을 모두 지녔다면, 공격을 굴리기 전에 베기와 찌르기 중 무엇을 할지 골라야 합니다.</p></li><li><p><strong>타격</strong>: 타격 피해를 입히며, 이는 ${S("CJjqkHzpow39ViUi#damage-types-and-armor", "갑옷의 효과")}에 영향을 줍니다.</p></li></ul><p></p><blockquote class="info"><h3>Foundry VTT</h3><p>Foundry VTT에는 다음 무기 특성이 추가로 있습니다.</p><p><strong>비무장</strong>: 이 무기는 @UUID[JournalEntry.17jatv6QqDKgsEU1.JournalEntryPage.2WJ8cGMOW9TeUYhe]{손에 든 무기} 자리를 차지하지 않습니다.</p><p><strong>방패</strong>; 힘 기반 근접 기술 중 가장 높은 것을 <span style="font-family:QTFrizQuad">사용합니다.</span></p><p><strong>마법 부여</strong>: 이 무기는 무기 마법 부여 주문의 영향을 받습니다.</p></blockquote><p></p><p><strong>방어도</strong>는 그 갑옷이 공격에서 깎아 내는 피해량을 나타냅니다. 갑옷은 한 번에 한 벌만 입을 수 있지만, 투구와는 함께 쓸 수 있습니다.</p>`;

for (const p of pages("6. Gear")) {
  if (p.name === "Introduction") continue;
  const c = String(p.text?.content || "");
  if (!c.trim()) continue;
  J["6. Gear"][p.name] = relabel(c, EXTRA)
    .replace(`<strong>Mastercrafted</strong>: Cost x10, Reduces STR requirement by 3, increases Durability by 3.`,
             `<strong>명품</strong>: 가격 10배, 힘 요구치 3 감소, 내구도 3 증가.`);
}

if (reportUnknown()) process.exit(1);
fs.writeFileSync("jn_05.json", JSON.stringify(J, null, 1));
let n = 0; for (const p of Object.values(J)) n += Object.keys(p).length;
console.log("jn_05:", Object.keys(J).length, "저널,", n, "페이지");
