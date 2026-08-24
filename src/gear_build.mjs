import { ClassicLevel } from "classic-level";
import fs from "fs";

const L = {
"Amulet":"부적","Backpack":"배낭","Bandages (10)":"붕대 (10개)","Battleaxe":"전투도끼",
"Blacksmithing Tools":"대장장이 도구","Book (any subject)":"책 (아무 분야)","Broadsword":"브로드소드",
"Carpentry Tools":"목공 도구","Cart":"수레","Chainmail":"사슬 갑옷","Combat Trained Horse":"전투 훈련된 말",
"Crossbow, Light":"석궁, 경량","Dagger":"대거","Donkey":"당나귀","Field Kitchen":"야전 취사도구",
"Field Ration":"야전 식량","Fishing Rod":"낚싯대","Flail":"플레일","Flint &amp; Tinder":"부싯돌과 부싯깃",
"Flute":"피리","Grappling Hook":"갈고리","Great Helm":"대형 투구","Grimoire":"마법서","Handaxe":"손도끼",
"Horn":"뿔피리","Knife":"나이프","Lamp Oil":"등잔 기름","Lance":"랜스","Lantern":"랜턴","Leather":"가죽 갑옷",
"Lockpicks, Simple":"자물쇠 따개, 보급","Long Spear":"긴 창","Longbow":"긴 활","Lyre":"리라","Marbles":"구슬",
"Morningstar":"모닝스타","Notebook":"공책","Oil Lamp":"기름 등잔","Open Helmet":"개방형 투구","Orbuculum":"수정구",
"Plate Armor":"판금 갑옷","Poison, Sleeping (1 dose)":"독, 수면 (1회분)","Quill &amp; Ink":"깃펜과 잉크",
"Quiver of Arrows, Iron Head":"화살통, 쇠촉","Rope, Hemp (10 meters)":"밧줄, 삼 (10미터)","Scimitar":"시미터",
"Shield, Small":"방패, 작은","Short Bow":"짧은 활","Short Spear":"짧은 창","Short Sword":"숏소드",
"Sleeping Fur":"침낭용 모피","Sling":"투석구","Snare":"올가미","Spyglass":"망원경","Staff":"지팡이",
"Studded Leather":"징 박은 가죽 갑옷","Tanning Tools":"무두질 도구","Tent, Large":"큰 천막","Torch":"횃불",
"Trident":"삼지창","Wand":"지팡이(완드)","Warhammer, Light":"워해머, 경량"
};

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k,v] of db.iterator()) ADV[v.name]=v; await db.close();
const T = {}; const unknown = new Set();
for (const t of ADV["Dragonbane - Rules"].tables) {
  if (!/^Gear - /.test(t.name)) continue;
  const out = {};
  for (const x of t.results||[]) {
    let s = String(x.description ?? x.text ?? "");
    s = s.replace(/(@UUID\[[^\]]*\])\{([^}]*)\}/g, (m, uuid, lab) => {
      if (!L[lab]) { unknown.add(lab); return m; }
      return uuid + "{" + L[lab] + "}";
    });
    s = s.replace(/ or /g, " 또는 ").replace(/ silver/g, " 은화");
    out[x._id] = s;
  }
  T[t.name] = out;
}
if (unknown.size) { console.error("미매핑 라벨:", [...unknown].join(" | ")); process.exit(1); }
fs.writeFileSync("tres_07.json", JSON.stringify({ results: T, descriptions: {} }, null, 1));
console.log("tres_07:", Object.keys(T).length, "표,", Object.values(T).reduce((s,o)=>s+Object.keys(o).length,0), "결과");
