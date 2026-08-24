import { ClassicLevel } from "classic-level";
import fs from "fs";
import { relabel, reportUnknown } from "./relabel.mjs";

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const pages = jn => {
  for (const r of Object.values(ADV)) for (const j of r.journal || []) if (j.name === jn) return j.pages || [];
  throw new Error("저널 없음: " + jn);
};

const U = (id, ko) => `@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.${id}]{${ko}}`;
const J = { "7. Bestiary": {} };

J["7. Bestiary"]["Introduction"] = `<div><p>이 게임에는 드래곤과 데몬뿐 아니라 온갖 치명적인 짐승이 등장합니다. 몬스터란 부자연스러운 기원을 지닌 생물, 모두에게 공포를 안기고 자연의 질서를 거스르는 끔찍한 짐승입니다. 이 장에서는 플레이어 캐릭터들이 여정에서 마주칠 수 있는 여러 몬스터와 인간형 생물을 소개합니다. 장 끝에는 흔한 동물 몇 가지도 실려 있습니다.</p><p>몬스터는 GM이 조종하며 전투에서 플레이어 캐릭터나 NPC와 대체로 같은 방식으로 행동합니다. 다만 몇 가지 중요한 차이가 있으며, 아래에서 설명합니다.</p></div><h2>흉포도</h2><p>어떤 몬스터는 너무나 강력해 같은 라운드에 여러 번 행동할 수 있습니다. 이는 흉포도 수치로 나타냅니다. 각 라운드가 시작될 때 GM은 흉포도 1점마다 우선권 카드를 한 장씩 뽑습니다. 몬스터는 카드마다 차례를 하나씩 가지며, 각 차례에 행동 하나와 이동 하나를 합니다.</p><p><strong>대기</strong>: 플레이어 캐릭터가 몬스터와 우선권 카드를 맞바꾸면(${U("tam5tRVd2vHO5YhM#waiting", "선택 규칙")}), 그 플레이어 캐릭터는 몬스터의 카드 가운데 아무거나 하나를 고를 수 있습니다. 몬스터 자신은 결코 대기하지 않습니다.</p><h2>크기</h2><p>몬스터의 크기는 제각각입니다. 게임에서는 다음 분류로 나누며, 이는 몬스터가 ${U("KrSXg7HKmfo7xRcI#movement", "가로막을")} 수 있는 넓이와 지나갈 수 있는 통로의 좁기에 영향을 줍니다.</p><p><strong>소형</strong>: 소형 몬스터는 키가 1미터가 되지 않으며 어떤 넓이도 가로막지 못합니다. 아주 좁은 통로도 쉽게 지나갑니다.</p><p><strong>보통</strong>: 보통 크기의 몬스터는 대략 사람만 합니다. 2×2미터(전투 지도의 한 칸)를 가로막을 수 있고 폭 0.5미터의 통로를 지나갑니다.</p><p><strong>대형</strong>: 대형 몬스터는 4×4미터를 가로막을 수 있고 폭 1미터의 통로를 지나갑니다.</p><p><strong>거대형</strong>: 거대형 몬스터는 8×8미터를 가로막을 수 있고 폭 2미터의 통로를 지나갑니다.</p><p><strong>무리</strong>: 무리는 보통에서 거대형까지 크기가 다양하지만 자기가 있는 자리를 결코 가로막지 않으며, 아주 좁은 통로도 지나갑니다.</p><h2>이동</h2><p>몬스터도 플레이어 캐릭터처럼 이동력 수치를 지니며, 공격 전이나 후에 움직이거나 공격 전후로 이동을 나눠 쓸 수 있습니다. 몬스터의 경우 이 수치는 라운드가 아니라 차례당 이동을 뜻한다는 점에 유의하세요.</p><p>어떤 몬스터는 땅과 물속, 공중에서 이동력이 다릅니다. 날아오르거나 내려앉는 것은 무료 행동입니다.</p><h2>몬스터 공격</h2><p>몬스터는 공격할 때 언제나 <em>몬스터 공격</em>을 씁니다. 몬스터마다 고유한 몬스터 공격 목록이 있으며 표로 정리되어 있습니다. 몬스터가 공격할 차례가 되면 GM이 이 표에서 공격을 굴리거나 고릅니다. 몬스터는 결코 명중 굴림을 하지 않습니다. <em>몬스터 공격은 자동으로 명중합니다.</em></p><p>몬스터 공격을 하는 것은 행동으로 칩니다. 따로 명시하지 않는 한 몬스터 공격의 사거리는 근접 공격과 같은 2미터입니다(격자 지도를 쓴다면 인접한 칸).</p><p><strong>회피와 막기</strong>: 원칙적으로 몬스터 공격은 ${U("KAxnhLbO8N7kcvMl#dodging", "회피")}할 수는 있지만 막을 수는 없습니다. 범위 효과가 있는 공격도 마찬가지이지만 공포 공격은 예외입니다. 이 규칙의 예외는 각 몬스터 공격 설명에 적혀 있습니다.</p><p><strong>상태</strong>: 몬스터 공격은 플레이어 캐릭터에게 ${U("mgCdV8jpP8hZyxOD", "상태")}를 줄 수 있습니다. 캐릭터가 이미 지닌 상태를 다시 받게 되면, 플레이어는 대신 다른 상태를 골라야 합니다.</p><p><strong>같은 공격 반복</strong>: 몬스터는 같은 공격을 연달아 두 번 하지 않습니다. GM이 같은 몬스터 공격을 두 번 잇달아 굴렸다면, 두 번째 굴림은 표의 다음 공격으로 바뀝니다. 6이 나왔다면 1이 됩니다.</p><blockquote class="info"><h3>더 위험한 몬스터</h3><p>이 장의 몬스터들은 전형적인 개체입니다. 이보다 훨씬 위험한 무시무시한 짐승들의 전설도 있습니다. GM은 플레이어 캐릭터들의 역량에 맞춰 몬스터를 더, 또는 덜 위험하게 만들 수 있습니다. 가장 간단한 방법은 흉포도를 올리거나 내리는 것이지만, HP를 조정해도 됩니다.</p></blockquote><p></p><div><h2>기술</h2><p>몬스터도 기술을 지닐 수 있지만, 주로 전투 밖이나 대항 굴림에 쓰며 공격에는 쓰지 않습니다. 몬스터는 오직 몬스터 공격으로만 공격합니다.</p><h2>몬스터와 싸우기</h2><p><strong>회피와 막기</strong>: 모든 몬스터는 회피할 수 있고, 무기를 든 몬스터는 막을 수도 있습니다. 회피나 막기를 할 때마다 그 라운드의 몬스터 행동 하나를 씁니다(원하는 우선권 카드를 하나 뒤집으세요). 몬스터의 모든 회피와 막기는 기본 기술 수치 15로 굴립니다.</p><p><strong>천연 갑옷</strong>: 많은 몬스터가 어떤 형태로든 천연 갑옷을 지닙니다. 이는 보통 ${U("CJjqkHzpow39ViUi#armor", "갑옷")}과 똑같이 작동합니다.</p><p><strong>약점</strong>: 관통 공격은 인간형 상대에게 그러하듯 몬스터의 천연 갑옷에서도 틈이나 약점을 찾아낼 수 있습니다(${U("KAxnhLbO8N7kcvMl#special-attacks", "선택 규칙")}).</p><p><strong>넘어뜨리기</strong>: 플레이어 캐릭터는 몬스터를 넘어뜨리려 할 수 있으며(${U("KAxnhLbO8N7kcvMl#special-attacks", "선택 규칙")}), 모든 몬스터의 기본 회피 기술 수치 15로 굴립니다. 몬스터의 다리가 넷 이상이면 공격자는 굴림에 불리점을 받습니다.</p><p><strong>무장 해제와 붙잡기</strong>: 몬스터는 플레이어 캐릭터에게 무장 해제되거나 붙잡히지 않습니다(${U("KAxnhLbO8N7kcvMl#special-attacks", "선택 규칙")}).</p><p><strong>어둠</strong>: 따로 명시하지 않는 한 몬스터는 어둠 속에서도 볼 수 있으며 ${U("6WPxPxUjh4W80RNy#darkness", "어둠")}의 효과를 받지 않습니다.</p><h2>저항과 면역</h2></div><p>어떤 몬스터는 특정 피해 유형에 <em>저항</em>합니다. 그 유형의 피해가 모두 절반이 된다는 뜻입니다(올림). 어떤 몬스터는 특정 피해 유형에 <em>면역</em>이기도 하며, 그런 공격으로는 피해를 전혀 받지 않습니다.</p><h2>공포와 설득</h2><p>몬스터는 너무나 무시무시해 스스로 겁먹는 일이 없지만, 그중 다수는 플레이어 캐릭터에게 능히 공포를 심어 줍니다. 또한 따로 명시하지 않는 한 몬스터는 설득 기술에 면역입니다.</p>`;

// 나머지 Bestiary 페이지는 링크 나열 → 라벨만 치환
for (const p of pages("7. Bestiary")) {
  if (p.name === "Introduction") continue;
  const c = String(p.text?.content || "");
  if (!c.trim()) continue;
  J["7. Bestiary"][p.name] = relabel(c);
}

if (reportUnknown()) process.exit(1);
fs.writeFileSync("jn_04.json", JSON.stringify(J, null, 1));
let n = 0; for (const p of Object.values(J)) n += Object.keys(p).length;
console.log("jn_04:", Object.keys(J).length, "저널,", n, "페이지");
