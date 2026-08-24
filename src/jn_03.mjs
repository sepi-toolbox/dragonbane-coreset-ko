import { ClassicLevel } from "classic-level";
import fs from "fs";

// 링크 나열 페이지는 사전으로 라벨만 치환
const rd = f => JSON.parse(fs.readFileSync(f, "utf8"));
const n1 = rd("names_rules.json"), n2 = rd("names_rules2.json"), nx = rd("names_extra.json"), na = rd("names_adv.json");
const LBL = Object.assign({}, n1.skills, n1.abilities, n1.kins, n1.professions, n1.injuries,
                          n2.spells, n2.weapons, n2.armors, n2.items, nx.extraItems, na.items);
LBL["Hunting &amp; Fishing"] = "사냥과 낚시";
LBL["Myths &amp; Legends"] = "신화와 전설";

const db = new ClassicLevel("./cspack", { valueEncoding: "json" });
const ADV = {}; for await (const [k, v] of db.iterator()) ADV[v.name] = v;
await db.close();
const page = (jn, pn) => {
  for (const r of Object.values(ADV)) for (const j of r.journal || []) if (j.name === jn)
    for (const p of j.pages || []) if (p.name === pn) return String(p.text?.content || "");
  throw new Error("페이지 없음: " + jn + " / " + pn);
};
const unknown = new Set();
const relabel = s => s.replace(/(@Display(?:Skill|Ability)\[[^\]]*\])\{([^}]*)\}/g, (m, tag, lab) => {
  if (!LBL[lab]) { unknown.add(lab); return m; }
  return tag + "{" + LBL[lab] + "}";
});

const J = {};
const MAGIC = `@UUID[JournalEntry.BHzSGEPaCGVadFsb]{5. 마법}`;

J["3. Skills"] = {
"Introduction": `<p>롤플레잉 게임은 대화입니다. 게임마스터가 장면을 묘사하고, 당신은 캐릭터가 어떻게 행동하는지 말하고, GM은 NPC들이 어떻게 반응하는지 묘사하고, 당신이 대답하고, 그렇게 오갑니다. 그렇게 이야기가 전해지고 나아갑니다. 그러나 머지않아 결정적인 상황, 돌이킬 수 없는 지점, 대화만으로는 풀 수 없는 갈등이 찾아옵니다. 그때가 주사위를 꺼내 기술을 쓸 때입니다. </p><p>이 장에서는 보통 사람이 해낼 수 없는 비범한 행동을 가능하게 하는 영웅 능력도 다룹니다. </p>`,

"Roll the Dice": `<p>마법 학파 같은 보조 기술을 빼면 이 게임에는 모두 서른 개의 기본 기술이 있으며, 모두 이 장 뒤쪽에서 설명합니다. 각 기술은 능력치 하나와 이어져 있고, 그 능력치가 플레이어 캐릭터를 만들 때 그 기술의 기본 확률을 결정합니다.</p><p>기술을 쓸 때는 먼저 당신의 플레이어 캐릭터가 무엇을 이루려 하는지 설명합니다. 그런 다음 D20을 굴립니다. 자기 기술 수치와 같거나 그보다 낮은 결과가 나오면 그 행동은 성공합니다. 전투에서는 기술 굴림에 구체적인 효과가 따르는 경우가 많습니다. 전투 밖에서는 GM이나 지금 플레이하는 어드벤처가 그 굴림의 효과를 정합니다.</p><h2>드래곤 굴림</h2><p>D20에서 1이 나오면 특별히 잘 해낸 것입니다. 이를 드래곤 굴림이라고 합니다. 전투에서 드래곤 굴림에는 구체적인 효과가 따릅니다. 이를테면 공격의 피해가 늘어납니다. 전투 밖에서는 GM이 효과를 정합니다. 몇 가지 예를 들면 이렇습니다.</p><ul><li><p>주위 모두를 감탄시킵니다.</p></li><li><p>의도한 것보다 더 큰 성과를 거둡니다.</p></li><li><p>평소보다 빠르게 해냅니다.</p></li></ul><h2>실패</h2><p>기술 수치보다 높게 나오면 그 행동은 실패합니다. 어떤 이유로든 목표를 이루지 못한 것이니, 무슨 일이 벌어졌는지 GM과 함께 자유롭게 묘사하세요. GM은 실패에 추가 결과를 붙여 이야기를 흥미롭게 밀고 나갈 수도 있습니다.</p><p>멈춰 서지 않기! 실패가 이야기를 완전히 멈춰 세워서는 안 됩니다. 실패했더라도 앞으로 나아갈 길은 반드시 있어야 합니다. 시간이나 위험, 금화를 대가로 치를지언정 길은 있어야 합니다. 그 상황에서 실패가 어떤 결과를 낳을지는 GM이 최종적으로 정합니다.</p><h2>데몬 굴림</h2><p>D20에서 20이 나오면 데몬 굴림이라고 하며, 기술 수치나 다른 사정에 관계없이 그 굴림은 실패합니다. 데몬 굴림은 @UUID[.eIQgHhYPUczg7kbZ#pushing-your-roll]{밀어붙일} 수도 없습니다. 데몬 굴림은 전투(@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.KAxnhLbO8N7kcvMl#critical-hit]{치명타}와 @UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.KAxnhLbO8N7kcvMl#demon-roll-in-melee]{근접 전투의 데몬 굴림} 참조)와 주문 시전(@UUID[JournalEntry.BHzSGEPaCGVadFsb.JournalEntryPage.C0stUmhj95JFgL4f#magical-mishap]{마법 사고} 참조)에서 추가 효과를 낼 수 있습니다. 전투 밖에서 GM은 데몬 굴림에 이런 효과를 붙일 수 있습니다.</p><ul><li><p>자신이나 남, 또는 물건을 손상시킵니다.</p></li><li><p>주위 모두 앞에서 웃음거리가 됩니다.</p></li><li><p>큰 소리를 냅니다.</p></li></ul><p></p><blockquote class="info"><h3>능력치 굴림</h3><p>상황에 들어맞는 기술이 없어 보이면 GM은 대신 기본 능력치로 굴리게 할 수 있습니다. 이를테면 무거운 것을 들어 올릴 때의 힘 굴림처럼 말입니다. 다만 하려는 행동을 다루는 기술이 있다면 반드시 그 기술로 굴려야 합니다. 애매한 경우에는 GM이 무엇이 알맞은지 정합니다.</p></blockquote><p></p><blockquote class="info"><h3>기회는 한 번뿐</h3><p>원칙적으로 어떤 행동이든 성공할 기회는 한 번뿐입니다. 한 번 주사위를 굴렸다면 같은 목표를 이루려고 다시 굴릴 수는 없습니다. 다른 방법을 시도하거나, 사정이 크게 달라질 때까지 기다리거나, 다른 플레이어 캐릭터가 시도하게 해야 합니다. 이 규칙은 전투에는 적용되지 않습니다.</p></blockquote>`,

"Boons & Banes": `<p>보통 GM은 행동이 얼마나 어려운지 따로 판정하지 않습니다. 만만치 않은 상황에서만 주사위를 굴리며, 그것으로 끝입니다. 그러나 때로는 GM이 외부 요인이 행동을 돕거나 방해한다는 점을 강조하고 싶을 수 있습니다. 그럴 때 굴림에 이점이나 불리점을 받습니다.</p><p>두 경우 모두 D20을 두 개 굴리되 결과는 하나만 셉니다. 이점이 있으면 낮은 결과만 적용합니다. 불리점이 있으면 높은 결과만 적용합니다.</p><p>넘어진 상대를 공격할 때나 먼 거리에서 쏠 때처럼 규칙이 이점이나 불리점을 준다고 명시하는 경우도 있습니다.</p><p><strong>이점/불리점 여러 개</strong>: 굴림에 이점이나 불리점을 여러 개 받으면 그 개수만큼 D20을 더 굴려 가장 낮은/높은 결과만 셉니다. 다만 기술 수치가 아주 높지 않은 한, 불리점이 여러 개 붙은 굴림은 성공 확률이 매우 낮다는 점을 기억하세요.</p><p><strong>이점과 불리점</strong>: 한 굴림에 이점과 불리점을 함께 받을 때도 있습니다. 이점 하나가 불리점 하나를 상쇄하며, 그 반대도 마찬가지입니다. 이점 하나와 불리점 하나가 있으면 평범하게 굴립니다(D20 하나). 이점 둘과 불리점 하나가 있으면 이점 하나로 칩니다.</p><blockquote class="optional"><h3>남의 도움</h3><p>다른 플레이어 캐릭터나 NPC 한 명이 당신의 주사위 굴림을 도울 수 있습니다. 이는 주사위를 굴리기 전에 선언해야 합니다. 또한 이야기 안에서 말이 되어야 합니다. 돕는 사람은 그 자리에 있어야 하고 그 행동을 거들 수 있어야 합니다. 최종 판단은 GM이 내립니다.</p><p>누군가 굴림을 도와주면 이점을 얻습니다(위 참조). 전투에서 돕는 것은 행동으로 칩니다. 남을 도우면 그 라운드의 자기 행동을 잃습니다. NPC끼리도 플레이어 캐릭터와 똑같이 서로 도울 수 있습니</p></blockquote><p></p><blockquote class="optional"><h3>굴림 밀어붙이기</h3><div><p><em>기술이나 능력치 굴림에 실패하면 그 굴림을 밀어붙이기로 선택할 수 있습니다. 다시 한번 시도한다는 뜻입니다. 새 결과가 무엇이든 그것이 적용됩니다. 이점이나 불리점이 있다면 모든 주사위를 다시 굴려야 합니다. 데몬 굴림(D20에서 나온 20)은 결코 밀어붙일 수 없습니다.</em></p><p></p><p><em>굴림을 밀어붙이면 다시 굴린 직후 상태를 하나 받습니다. 그러면 특정 능력치에 기반한 모든 기술 굴림과 그 능력치 자체의 굴림에 불리점을 받습니다. 각 능력치는 특정 상태와 이어져 있습니다. 따라서 상태는 모두 여섯 가지입니다.</em></p></div><div class="flexrow"><div><p><em><strong>탈진 </strong>– STR<br /><strong>병약</strong> – CON<br /><strong>아찔</strong> – AGL</em></p></div><div><p><em><strong>분노 </strong>– INT<br /><strong>공포</strong> – WIL<br /><strong>낙담</strong> – CHA</em></p></div></div><p><em>굴림을 밀어붙여 어떤 상태를 받을지는 당신이 정하되, 두 가지 중요한 제약이 있습니다.</em></p><ul><li><em>이미 지니고 있는 상태는 고를 수 없습니다.</em></li><li><em>그 상태가 지금 하려는 행동에서 어떻게 비롯되는지 설명할 수 있어야 합니다. GM은 명백히 말이 안 되는 설명을 물리칠 권한이 있습니다.</em></li></ul><p><em>여섯 상태를 모두 지니게 되면 더는 굴림을 밀어붙일 수 없습니다. 상태는 효과 말고도 롤플레잉의 영감이 되어 줍니다. 상태는 캐릭터 시트에 표시하세요.</em></p><p><em><strong>상태 회복</strong>: 휴식으로 상태를 회복할 수 있습니다. 휴식과 회복에 관한 자세한 내용은 @UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.dGAIYjM05UoFAwmd]{치유와 휴식}을 참고하세요.</em></p><p><em><strong>NPC와 몬스터</strong>: 굴림을 밀어붙일 수 있는 것은 플레이어 캐릭터뿐이며, NPC나 몬스터는 할 수 없습니다.</em></p></blockquote>`,

"Opposed Rolls": `<p>행동에 성공하려면 대항 굴림으로 적을 이겨야 할 때가 있습니다. 당신과 상대가 모두 주사위를 굴린다는 뜻입니다. 대항 굴림은 게임에서 아껴 쓰며, 누군가 적극적으로 당신을 가로막을 때만 씁니다. 전투에서는 능동적으로 행동하는 쪽에게만 행동으로 칩니다.</p><ul><li><p>당신의 굴림이 실패하면 상대의 굴림과 상관없이 당신의 행동도 실패합니다.</p></li><li><p>당신은 성공하고 상대가 실패하면 당신의 행동은 성공합니다.</p></li><li><p>둘 다 성공했다면, 당신의 결과가 상대의 결과와 같거나 그보다 낮을 때 당신의 행동이 성공합니다. 상대의 결과가 당신보다 낮으면 당신은 실패합니다.</p></li></ul><p><strong>밀어붙인 굴림</strong>: 대항 굴림도 밀어붙일 수 있지만(선택 규칙, 앞 쪽 참조) 당신이 능동적으로 행동하는 쪽일 때만 가능합니다. 상대가 굴린 뒤에도 밀어붙일 수 있습니다.</p><p><strong>공개 대항 굴림</strong>: GM은 능동적인 쪽이 따로 없는 상황에서도 대항 굴림을 쓸 수 있습니다. 이를테면 팔씨름의 승패를 가리려고 힘 대 힘으로 굴리는 경우입니다. 이를 <em>공개 대항 굴림</em>이라고 합니다. 공개 대항 굴림은 양쪽 다 실패하거나, 양쪽 다 성공하고 같은 결과가 나오면 다시 굴립니다. 양쪽 모두 굴림을 밀어붙일 수 있습니다.</p>`,

"The Core Skills": relabel(page("3. Skills", "The Core Skills")
  .replace(`<p>This section describes all core skills in the game. The schools of magic are secondary skills and covered in @UUID[JournalEntry.BHzSGEPaCGVadFsb]{5. Magic}.</p>`,
           `<p>이 절에서는 게임의 모든 기본 기술을 설명합니다. 마법 학파는 보조 기술이며 ${MAGIC}에서 다룹니다.</p>`)
  .replace(`<h3>NPCs and Skills</h3><p>Non-player characters use skills in the same way as player characters. The GM rolls dice for them, but only for actions that affect a player character directly – for example, if the NPC is attacking a player character or attempting to save them. When an NPC performs an action that does not directly affect a player character, the GM can simply decide what happens.</p><p>NPC stat blocks don’t list all skills – when rolling for an NPC against an unlisted skill, the GM uses a default skill level of 5.</p>`,
           `<h3>NPC와 기술</h3><p>논플레이어 캐릭터도 플레이어 캐릭터와 똑같이 기술을 씁니다. GM이 그들을 위해 주사위를 굴리지만, 플레이어 캐릭터에게 직접 영향을 주는 행동에 한합니다. 이를테면 NPC가 플레이어 캐릭터를 공격하거나 구하려 할 때 말입니다. NPC가 플레이어 캐릭터에게 직접 영향을 주지 않는 행동을 할 때는 GM이 그냥 결과를 정하면 됩니다.</p><p>NPC 능력치 상자에는 모든 기술이 적혀 있지 않습니다. 적혀 있지 않은 기술로 NPC를 굴릴 때 GM은 기본 기술 수치 5를 씁니다.</p>`)
  .replace(`<h3>Schools of Magic</h3><p>There are different schools of magic, and each school is a separate secondary skill. For more information on magic, see @UUID[JournalEntry.BHzSGEPaCGVadFsb]{5. Magic}.</p>`,
           `<h3>마법 학파</h3><p>마법 학파는 여러 가지가 있으며, 각 학파는 저마다 별개의 보조 기술입니다. 마법에 관한 자세한 내용은 ${MAGIC}를 참고하세요.</p>`)
  .replace(`<h3>Skills</h3>`, `<h3>기술</h3>`)
  .replace(`<h3>Weapon Skills</h3><p>There are several skills for wielding different types of weapons. You can read more about weapons and combat in the next chapter.</p>`,
           `<h3>무기 기술</h3><p>여러 종류의 무기를 다루는 기술이 여럿 있습니다. 무기와 전투에 관한 자세한 내용은 다음 장에서 볼 수 있습니다.</p>`)),

"Heroic Abilities": relabel(page("3. Skills", "Heroic Abilities")
  .replace(`<p>Described below are a number of heroic abilities. All player characters except mages get one heroic ability each at the start of the game, and you can earn new ones as described in @UUID[JournalEntry.17jatv6QqDKgsEU1.JournalEntryPage.8oP09yp6neygtjVn]{Experience}. Note that some heroic abilities require a minimum skill level to be learned.</p>`,
           `<p>아래에서는 여러 영웅 능력을 설명합니다. 마법사를 뺀 모든 플레이어 캐릭터는 게임을 시작할 때 영웅 능력을 하나씩 얻으며, @UUID[JournalEntry.17jatv6QqDKgsEU1.JournalEntryPage.8oP09yp6neygtjVn]{경험}에서 설명하는 대로 새 능력을 얻을 수 있습니다. 일부 영웅 능력은 배우려면 최소 기술 수치가 필요하다는 점에 유의하세요.</p>`)
  .replace(`<p>Some cost Willpower Points to activate, others do not. Unless stated otherwise, it is possible to combine multiple abilities in the same action, e.g. Assassin and Dragon­slayer, but you must pay the WP cost for each ability you wish to use.</p>`,
           `<p>발동에 의지력이 드는 것도 있고 그렇지 않은 것도 있습니다. 따로 명시하지 않는 한 한 행동에 여러 능력을 함께 쓸 수 있습니다. 이를테면 암살자와 용 사냥꾼처럼 말입니다. 다만 쓰려는 능력마다 WP 비용을 치러야 합니다.</p>`)
  .replace(`<p>Some heroic abilities require optional rules. If you are playing without these optional rules, those heroic abilities should not be used.</p>`,
           `<p>일부 영웅 능력은 선택 규칙을 필요로 합니다. 그 선택 규칙 없이 플레이한다면 해당 영웅 능력은 쓰지 않아야 합니다.</p>`))
};

if (unknown.size) { console.error("미매핑 라벨:", [...unknown].join(" | ")); process.exit(1); }
fs.writeFileSync("jn_03.json", JSON.stringify(J, null, 1));
let n = 0; for (const p of Object.values(J)) n += Object.keys(p).length;
console.log("jn_03:", Object.keys(J).length, "저널,", n, "페이지");
