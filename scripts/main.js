/**
 * 무기의 요구 기술(system.skill.name)은 기술 아이템의 "이름 문자열"로 저장된다(예: "Axes").
 * 시스템은 actor.getSkill/findSkill에서 이 문자열과 캐릭터 기술 아이템 이름을 소문자로 비교하므로,
 * 기술 이름만 한국어(도끼)로 번역되고 무기 쪽이 영어로 남으면 기술 수치를 못 가져온다.
 * → 영문 기술명 → 한국어 기술명 사전으로 무기 필드도 함께 번역하고, 이미 월드에 들어온
 *   캐릭터 무기는 ready 시 한 번 보정한다.
 */
const DOD_SKILL_KO = {
        "Acrobatics": "곡예",
        "Awareness": "경계",
        "Bartering": "흥정",
        "Beast Lore": "야수 지식",
        "Bluffing": "허풍",
        "Bushcraft": "부시크래프트",
        "Crafting": "제작",
        "Evade": "회피",
        "Healing": "치료",
        "Hunting & Fishing": "사냥 & 낚시",
        "Languages": "언어",
        "Myths & Legends": "신화 & 전설",
        "Performance": "공연",
        "Persuasion": "설득",
        "Riding": "승마",
        "Seamanship": "항해술",
        "Sleight of Hand": "손재주",
        "Sneaking": "은밀",
        "Spot Hidden": "관찰력",
        "Swimming": "수영",
        "Animism": "정령주의",
        "Elementalism": "원소주의",
        "Mentalism": "멘탈리즘",
        "Axes": "도끼",
        "Bows": "활",
        "Brawling": "격투",
        "Crossbows": "석궁",
        "Hammers": "망치",
        "Knives": "단검",
        "Slings": "슬링",
        "Spears": "창",
        "Staves": "지팡이",
        "Swords": "검"
    };

/**
 * dragonbane-coreset-ko — Babele 번역 디렉터리 등록
 *
 * Dragonbane - Core Set 모듈의 어드벤처 컴펜디움을 한국어로 치환한다.
 * 원본 모듈(dragonbane-coreset)과 Babele이 함께 활성화되어 있어야 동작한다.
 */
Hooks.once("babele.init", (babele) => {
    // 무기 요구 기술명: 사전에 있으면 한국어로, 없으면(동물 공격 Bite 등) 그대로
    babele.registerConverters({
        dodSkillName: (value) => (typeof value === "string" && DOD_SKILL_KO[value]) ? DOD_SKILL_KO[value] : value
    });

    /**
     * Babele 기본 매핑은 dnd5e 계열 스키마를 전제한다.
     *   Item.description  → system.description.value
     *   Actor.description → system.details.biography.value
     * Dragonbane은 표시 문자열을 system 아래 평문 필드로 둔다.
     * 경로가 없으면 Babele는 그 필드를 조용히 건너뛰므로(field-mapping.js의
     * translate() early-return), 매핑을 바로잡지 않으면 번역 데이터가 있어도
     * 화면에는 원문이 그대로 나온다.
     *
     * ⚠ 아이템 본문은 `system.description`이 아니라 `system.itemDescription`이다.
     * dragonbane 4.x의 DoDItemBaseData.migrateData가 옛 description을
     * itemDescription + gmDescription으로 쪼갠 뒤 description을 삭제한다
     * (modules/data/items/item-base.js). Babele는 CONFIG.DatabaseBackend._getDocuments를
     * 래핑해 document.toObject()를 번역하므로 = 마이그레이션 "이후" 경로가 기준이다.
     * 팩 파일에는 아직 옛 이름(description)이 들어 있어 원본만 보면 속는다.
     * 액터 쪽 필드(description/traits/appearance/weakness/notes)는 개명되지 않았다.
     *
     * registerMapping은 기본 매핑에 병합되므로 name/items/effects/tokenName 등
     * 기존 정의는 그대로 유지된다.
     */
    babele.registerMapping({
        Item: {
            description: "system.itemDescription", // 아이템·능력·주문 본문 (4.x 개명 필드)
            requirement: "system.requirement",   // 주문 요구조건 / 능력 요구 기술
            prerequisite: "system.prerequisite", // 선행 주문·학파
            skills: "system.skills",             // 직업 기술 목록
            banes: "system.banes",               // 불리점 기술
            boons: "system.boons",               // 이점 기술
            abilities: "system.abilities",       // 종족 능력 목록
            cost: "system.cost",                 // 가격 표기
            skillName: { path: "system.skill.name", converter: "dodSkillName" } // 무기 요구 기술(이름 문자열)
        },
        Actor: {
            description: "system.description",   // NPC·몬스터 설명
            traits: "system.traits",             // NPC·몬스터 "특징"
            appearance: "system.appearance",     // 기성 캐릭터 외모
            weakness: "system.weakness",         // 기성 캐릭터 약점
            notes: "system.notes"                // 기성 캐릭터 배경 메모
        }
    });

    babele.register({
        module: "dragonbane-coreset-ko",
        lang: "ko",
        dir: "translations"
    });
});

/**
 * 이미 월드에 가져온 캐릭터·NPC의 무기 보정(GM만, 필요한 경우에만 갱신).
 * 캐릭터에 영문 기술이 없고 한국어 기술이 있을 때만 무기의 기술명을 한국어로 바꾼다.
 */
Hooks.once("ready", async () => {
    if (!game.user?.isGM || game.system?.id !== "dragonbane") return;
    const findSkill = (actor, name) => actor.items.find(i => i.type === "skill" && i.name.toLowerCase() === String(name).toLowerCase());
    let fixed = 0;
    for (const actor of game.actors ?? []) {
        const updates = [];
        for (const item of actor.items) {
            if (item.type !== "weapon") continue;
            const en = item.system?.skill?.name, ko = DOD_SKILL_KO[en];
            if (!ko || findSkill(actor, en) || !findSkill(actor, ko)) continue;
            updates.push({ _id: item.id, "system.skill.name": ko });
        }
        if (updates.length) { await actor.updateEmbeddedDocuments("Item", updates); fixed += updates.length; }
    }
    for (const item of game.items ?? []) {
        const ko = item.type === "weapon" ? DOD_SKILL_KO[item.system?.skill?.name] : null;
        if (ko) { await item.update({ "system.skill.name": ko }); fixed++; }
    }
    if (fixed) console.log(`dragonbane-coreset-ko | 무기 요구 기술명 한국어 보정: ${fixed}건`);
});
