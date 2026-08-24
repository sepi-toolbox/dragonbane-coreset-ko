// 팩(원본 소스) vs 월드(마이그레이션 후) 의 system 필드명 차이를 전수 비교
import { ClassicLevel } from "classic-level";

const open = async dir => {
  const db = new ClassicLevel(dir, { valueEncoding: "json" });
  const out = [];
  for await (const [k, v] of db.iterator()) out.push([k, v]);
  await db.close();
  return out;
};

// 팩: 어드벤처 안에 중첩
const packDocs = { Item: new Map(), Actor: new Map(), ActorItem: new Map() };
for (const [, r] of await open("./cspack")) {
  for (const it of r.items || []) packDocs.Item.set(it._id, it);
  for (const a of r.actors || []) {
    packDocs.Actor.set(a._id, a);
    for (const it of a.items || []) packDocs.ActorItem.set(it._id, it);
  }
}

const worldItems = new Map(), worldActors = new Map(), worldActorItems = new Map();
for (const [k, v] of await open("./worlditems")) if (k.startsWith("!items!")) worldItems.set(v._id, v);
for (const [k, v] of await open("./worldactors")) {
  if (k.startsWith("!actors!")) worldActors.set(v._id, v);
  else if (k.startsWith("!actors.items!")) worldActorItems.set(v._id, v);
}

const cmp = (label, pack, world) => {
  const added = {}, removed = {};
  let paired = 0;
  for (const [id, w] of world) {
    const p = pack.get(id); if (!p) continue;
    paired++;
    const pk = new Set(Object.keys(p.system || {})), wk = new Set(Object.keys(w.system || {}));
    for (const k of wk) if (!pk.has(k)) added[k] = (added[k] || 0) + 1;
    for (const k of pk) if (!wk.has(k)) removed[k] = (removed[k] || 0) + 1;
  }
  console.log(`\n### ${label} (id 대응 ${paired}건)`);
  const fmt = o => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}(${n})`).join(", ") || "없음";
  console.log("  마이그레이션 후 새로 생긴 필드 :", fmt(added));
  console.log("  마이그레이션 후 사라진 필드   :", fmt(removed));
};

cmp("최상위 Item", packDocs.Item, worldItems);
cmp("Actor", packDocs.Actor, worldActors);
cmp("Actor 내장 Item", packDocs.ActorItem, worldActorItems);

// 내가 매핑한 필드가 월드(=번역 시점) 데이터에 실제로 존재하는지 확인
const MAPPED_ITEM = ["description","itemDescription","requirement","prerequisite","skills","banes","boons","abilities","cost"];
const MAPPED_ACTOR = ["description","traits","appearance","weakness","notes"];
const presence = (label, docs, fields) => {
  const n = {};
  for (const [, v] of docs) for (const f of fields) if (String(v.system?.[f] ?? "").trim()) n[f] = (n[f] || 0) + 1;
  console.log(`\n### ${label} — 월드 데이터에서 값이 있는 필드`);
  for (const f of fields) console.log(`  ${f.padEnd(18)} ${n[f] || 0}`);
};
presence("Item(최상위+내장)", new Map([...worldItems, ...worldActorItems]), MAPPED_ITEM);
presence("Actor", worldActors, MAPPED_ACTOR);
