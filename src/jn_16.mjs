import { ClassicLevel } from "classic-level";
import fs from "fs";
import { relabel, reportUnknown } from "./relabel.mjs";

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const page = (jn, pn) => {
  for (const r of Object.values(ADV)) for (const j of r.journal || []) if (j.name === jn)
    for (const p of j.pages || []) if (p.name === pn) return String(p.text?.content || "");
  throw new Error("페이지 없음: " + jn + " / " + pn);
};

const J = { "8. Adventures": {} };
const P = J["8. Adventures"];

P["The Gamemaster's Role"] = `<p>GM인 당신은 탁자에서 중요한 몫을 맡습니다. 플레이어 캐릭터들이 무엇을 보는지, 누구를 만나는지, 어떤 시련을 마주하는지 묘사합니다. 영화감독처럼 장면을 짜고, 좋은 이야기를 만드는 데 큰 책임을 집니다. GM을 맡는 일은 만만치 않으면서도 보람 있습니다. 모임 구성원들이 돌아가며 GM을 맡아도 좋습니다. 아래는 GM으로서 게임 경험을 한층 더 즐겁게 만드는 간단한 요령입니다. </p><h2>플레이어를 끌어들이세요</h2><p>GM은 모든 플레이어가 함께한다고 느끼도록 신경 써야 합니다. 한 플레이어 캐릭터가 주목을 많이 받았다면 다른 이들에게도 무대를 내주세요. 흐름의 완급에도 마음을 쓰세요. 격렬한 사건 사이에 잔잔한 장면을 끼워 넣는 것이 좋을 때가 많습니다. 다만 게임이 늘어지고 플레이어들이 지루해한다 싶으면, 플레이어들이 반응할 수밖에 없는 흥미로운 일을 일으키세요. </p><h2>주사위는 공개로 굴리세요</h2><p>GM은 NPC와 몬스터의 주사위 굴림을 도맡을 때가 많습니다. 이야기를 통제하려고 몰래 굴리고 싶을 수 있지만, 언제나 공개로 굴리기를 권합니다. 공개 굴림의 장점은 모든 플레이어를 끌어들이고 탁자의 긴장을 높인다는 것입니다. 결국 이 게임은 함께 하는 것이니까요. </p><h2>플레이어와 함께 플레이하세요</h2><p>모든 적과 위험을 조종하다 보면 GM은 자신이 플레이어들과 겨루고 있다고 여기기 쉽습니다. 그러나 여러분 모두가 함께 즐기려고 플레이하고 있음을 기억하는 것이 중요합니다. 플레이어들이 영리한 계획을 세워 멋지게 해냈다면 스스로를 뿌듯해하게 두고, 함께 이야기와 오래 남을 기억을 만들고 있다는 데 만족하세요. </p><h2>세계를 살아나게 하세요</h2><p>GM은 플레이어 캐릭터들이 무엇을 경험하는지 묘사합니다. 세부와 소리, 냄새를 그려 내어 진짜 세계의 그림을 보여 주려고 해 보세요. 밤에 야영지 둘레에서 부엉이가 우는 소리, 늪에서 개구리가 우는 소리, 바람에 나뭇잎이 바스락대는 소리를 들려주세요. 장면이나 장소를 살아나게 하는 데는 세부 한둘이면 충분할 때가 많습니다. </p>`;

P["Non-Player Characters"] = relabel(page("8. Adventures", "Non-Player Characters")
  .replace(`<p>You control everything in the world around the player characters, from dragons to demons, but your most important tool for creating drama is often your non-player characters. Stats for typical types of NPCs can be found on the next pages and many NPCs are described in the Adventures book.</p>`,
`<p>당신은 드래곤부터 데몬까지 플레이어 캐릭터를 둘러싼 세계의 모든 것을 조종하지만, 극적인 상황을 만드는 가장 중요한 도구는 대개 논플레이어 캐릭터입니다. 흔한 NPC 유형의 능력치는 다음 쪽에서 볼 수 있으며, 많은 NPC가 어드벤처 책에 실려 있습니다.</p>`)
  .replace(`<p><strong>Random NPCs</strong>: You can use the random tables below to create unique NPCs. Grab a die of each type from the box and roll them together.</p>`,
`<p><strong>무작위 NPC</strong>: 아래 무작위표로 고유한 NPC를 만들 수 있습니다. 상자에서 종류별 주사위를 하나씩 꺼내 한꺼번에 굴리세요.</p>`)
  .replace(`<h2>MANAGING NPCS</h2><p>Mechanically, NPCs function like player characters. They move, perform actions, sustain damage, and use WP in the same way. But in practice, you should disregard all rules mechanics for NPCs if they do not directly affect a player character. Don’t roll dice for actions performed by NPCs unless they are attacking or healing a player character. You can roll for NPCs in other situations if it enhances the drama, but usually there is no need for it. Remember, an NPC rolls against the @UUID[JournalEntry.V4R4dCuKSK2mi8RF.JournalEntryPage.aFCOwfQDRUcs13vh]{default skill level of 5} if no other level is listed.</p>`,
`<h2>NPC 운용</h2><p>규칙상 NPC는 플레이어 캐릭터와 똑같이 작동합니다. 같은 방식으로 움직이고, 행동하고, 피해를 받고, WP를 씁니다. 그러나 실제로는 플레이어 캐릭터에게 직접 영향을 주지 않는 한 NPC의 규칙 절차는 모두 무시하는 편이 좋습니다. NPC가 플레이어 캐릭터를 공격하거나 치료하는 경우가 아니라면 그 행동에 주사위를 굴리지 마세요. 극적인 효과를 높인다면 다른 상황에서도 굴릴 수 있지만, 대개는 그럴 필요가 없습니다. NPC는 다른 수치가 적혀 있지 않으면 @UUID[JournalEntry.V4R4dCuKSK2mi8RF.JournalEntryPage.aFCOwfQDRUcs13vh]{기본 기술 수치 5}로 굴린다는 점을 기억하세요.</p>`)
  .replace(`<h2>MINIONS &amp; BOSSES</h2><p>NPCs can be divided into two categories: minions and bosses.</p>`,
`<h2>졸개와 보스</h2><p>NPC는 졸개와 보스 두 가지로 나눌 수 있습니다.</p>`)
  .replace(`<p><strong>Minions</strong> are groups of less significant NPCs with identical stats. They are rarely described by name or personality. A minion who reaches zero HP is dead unless you want it to survive – perhaps to tell the player characters something important with its dying words. Minions almost never use WP and often act on the same turn in combat.</p>`,
`<p><strong>졸개</strong>는 같은 능력치를 지닌, 비중이 낮은 NPC 무리입니다. 이름이나 성격이 따로 서술되는 일은 드뭅니다. HP가 0이 된 졸개는 죽습니다. 다만 당신이 살려 두고 싶다면, 어쩌면 마지막 숨으로 플레이어 캐릭터들에게 중요한 이야기를 남기게 할 수도 있습니다. 졸개는 WP를 거의 쓰지 않으며 전투에서 같은 차례에 행동하는 경우가 많습니다.</p>`)
  .replace(`<p><strong>Bosses</strong> are different. They are often described with names and backgrounds, and usually play an important part in the adventure. A boss draws their own initiative card in combat. Bosses have WP and use innate and heroic abili­ties just like player characters. Particularly powerful bosses often have multiple heroic abilities – not least Robust and Focused several times over, which can give them far more HP and WP than the player characters.</p>`,
`<p><strong>보스</strong>는 다릅니다. 대개 이름과 내력이 함께 서술되며 어드벤처에서 중요한 몫을 맡습니다. 보스는 전투에서 자기 우선권 카드를 뽑습니다. 보스는 WP를 지니며 플레이어 캐릭터처럼 타고난 능력과 영웅 능력을 씁니다. 특히 강력한 보스는 영웅 능력을 여럿 지니는 경우가 많은데, 무엇보다 강건함과 집중을 여러 번 지녀 플레이어 캐릭터보다 훨씬 많은 HP와 WP를 갖기도 합니다.</p>`)
  .replace(`<p>If possible, try not to have your bosses die too early in the game. A boss who lives to fight another day is more fun than a dead one. Also make sure that the player characters cannot get to the boss too easily – put some minions in their way that need to be dealt with first. A boss encounter should be challenging!</p>`,
`<p>가능하다면 보스가 게임 초반에 너무 일찍 죽지 않게 하세요. 훗날을 기약하며 살아남은 보스가 죽은 보스보다 재미있습니다. 또 플레이어 캐릭터들이 보스에게 너무 쉽게 닿지 못하게 하세요. 먼저 처리해야 할 졸개들을 길목에 두면 됩니다. 보스 조우는 만만치 않아야 합니다!</p>`)
  .replace(`<h3>Attributes for NPCs</h3><p>In adventures for Dragonbane, attribute scores for NPCs are not listed as they are very rarely used. If you at some point would need to roll against an exact attribute score for an NPC, use the guidelines below:</p><p><strong>STR &amp; AGL</strong>: Use the damage bonus. At +D6, roll against an attribute score of 17. At +D4, roll against 14. At no bonus, roll against 10.</p><p><strong>CON</strong>: Roll against maximum HP, reduced by 2 for each level of the Robust heroic ability.</p><p><strong>WIL</strong>: Roll against maximum WP if this is listed, reduced by 2 for each level of the Focused heroic ability. If WP is not listed, roll against 10.</p><p><strong>INT &amp; CHA</strong>: Roll against 10.</p>`,
`<h3>NPC의 능력치</h3><p>드래곤베인 어드벤처에서는 NPC의 능력치 수치를 싣지 않습니다. 쓸 일이 매우 드물기 때문입니다. 언젠가 NPC의 정확한 능력치로 굴려야 한다면 아래 기준을 쓰세요.</p><p><strong>힘과 민첩</strong>: 피해 보너스를 쓰세요. +D6이면 능력치 17로, +D4면 14로, 보너스가 없으면 10으로 굴립니다.</p><p><strong>건강</strong>: 최대 HP로 굴리되, 영웅 능력 강건함 단계마다 2씩 줄입니다.</p><p><strong>의지</strong>: 최대 WP가 적혀 있으면 그 값으로 굴리되, 영웅 능력 집중 단계마다 2씩 줄입니다. WP가 적혀 있지 않으면 10으로 굴립니다.</p><p><strong>지능과 매력</strong>: 10으로 굴립니다.</p>`)
  .replace(`<h2>Typical NPCs</h2>`, `<h2>일반 NPC</h2>`)
  .replace(`{Attitude}`, `{태도}`).replace(`{Kin}`, `{종족}`).replace(`{Motivation}`, `{동기}`)
  .replace(`{Profession}`, `{직업}`).replace(`{Trait}`, `{특징}`).replace(`{Name}`, `{이름}`));

P["Campaigns"] = `<p><em>드래곤베인</em>은 어드벤처가 전부입니다. 그러나 낱개 어드벤처를 즐기는 것은 시작에 지나지 않습니다. 같은 플레이어 캐릭터들로 여러 어드벤처를 이어 즐기면, 여러분의 모임은 더 흥미롭고 오래 기억에 남는 큰 이야기를 경험하게 됩니다. 이를 캠페인 플레이라고 합니다. </p><p>어드벤처 책의 <em>용 황제의 비밀</em>이 캠페인의 한 예이지만, 캠페인의 모습은 아주 다양할 수 있습니다. GM으로서 오랜 시간에 걸쳐 캠페인을 계획하고 즐기는 것은 무척 재미있지만, 대개는 단순하게 시작하는 편이 좋습니다. 캠페인을 시작하는 데 거창한 계획은 필요 없습니다. 그저 플레이어 캐릭터들을 모험에 내보내고, 진행하면서 어드벤처들을 이을 방법을 찾아 가면 됩니다. </p><h2>게임 세계</h2><p><em>드래곤베인</em>의 세계는 안개 낀 숲과 깊은 협곡, 가파른 절벽, 잊힌 동굴로 가득합니다. 모험과 위험의 세계이자, 태고의 짐승과 숨겨진 보물, 그림자 속에서 움직이는 어둠의 교단이 있는 세계입니다. </p><p>어드벤처 책에서 설명하는 안개 골짜기는 여러분의 어드벤처를 시작하기에 좋은 곳입니다. <em>드래곤베인</em>의 세계는 게임 속에서 발견하고 경험하도록 만들어졌습니다. 북쪽 산맥 너머에 무엇이 있는지 누가 알겠습니까? 어쩌면 플레이어 캐릭터들이 다음에 가 보기 딱 좋은 기묘한 거미 왕국을 떠올렸을지도 모릅니다. 그렇다면 그 착상을 밀고 나가세요. 알맞다고 생각되는 무엇이든 좋습니다. </p><p>앞으로 나올 모듈에서 게임 세계를 조금씩 넓혀 가되, 여러분이 자기만의 어드벤처를 만들 자유를 누리도록 할 것입니다. </p><p></p><blockquote class="info"><h3>죽은 플레이어 캐릭터</h3><p>드래곤베인의 무대는 위험한 세계이며 플레이어 캐릭터가 때때로 죽습니다. 플레이어 캐릭터와 헤어지는 일은 서글프지만, 그것도 게임의 일부이며 새로운 가능성을 열어 줍니다. </p><p>플레이어 캐릭터가 죽으면 그 플레이어가 새 캐릭터를 만들어 가능한 한 빨리 어드벤처에 합류하게 하세요. 새 플레이어 캐릭터에게는 지금까지 플레이한 세션 수만큼의 추가 성장 굴림과, 다른 플레이어 캐릭터와 같은 수의 영웅 능력을 주세요. 구체적인 사항은 GM이 정합니다. </p></blockquote><img src="modules/dragonbane-coreset/assets/actors/bestiary/rese.webp" />`;

if (reportUnknown()) process.exit(1);
fs.writeFileSync("jn_16.json", JSON.stringify(J, null, 1));
let n = 0; for (const p of Object.values(J)) n += Object.keys(p).length;
console.log("jn_16:", Object.keys(J).length, "저널,", n, "페이지");
