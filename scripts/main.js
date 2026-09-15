/**
 * dragonbane-coreset-ko — Babele 번역 등록 + 이름 참조 필드 정합
 *
 * 드래곤베인 시스템은 기술·능력·유파·하위 표를 "이름 문자열"로 찾는다(대소문자 무시 이름 비교).
 * 번역으로 대상 문서 이름이 한국어가 되면, 그 이름을 참조하는 필드도 같은 한국어여야 한다.
 *   - 무기 system.skill.name ↔ 기술 아이템 이름        (actor.getSkill / findSkill)
 *   - 주문·조제법 system.school ↔ 마법 유파 기술 이름   (actor.findMagicSkill)
 *   - 직업 system.skills / 혈족·직업 system.abilities   (컴펜디움 번역 데이터로 처리)
 *   - 아이템 system.banes / boons ↔ 기술 이름·능력치 라벨
 *   - 굴림표 문서 결과 name ↔ 하위 표 이름              (findTable(result.name))
 * 컴펜디움은 Babele 변환기로, 이미 가져온 월드는 ready 훅(GM)으로 보정한다.
 */

/** 영문 기술명 → 현재 한국어 기술명 (동물 자연 무기 포함) */
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
    "Swords": "검",
    "Bite": "물기",
    "Horns": "뿔",
    "Kick": "걷어차기",
    "Tusks": "엄니"
};

/** 영문 유파 → 한국어 유파 기술명. General은 시스템 키(현지화 라벨로 표시·비교됨) */
const DOD_SCHOOL_KO = {
    "Animism": "정령주의",
    "Elementalism": "원소주의",
    "Mentalism": "멘탈리즘",
    "General": "DoD.spell.general"
};

/** 영문 능력명 → 현재 한국어 능력명 */
const DOD_ABILITY_KO = {
    "Assassin": "암살자",
    "Backstabbing": "배후 공격",
    "Battle Cry": "전투의 함성",
    "Berserker": "광전사",
    "Catlike": "고양이의 유연함",
    "Companion": "동물 동료",
    "Contortionist": "곡예사",
    "Defensive": "방어자",
    "Deflect Arrow": "화살 쳐내기",
    "Disguise": "변장",
    "Double Slash": "이중 베기",
    "Dragonslayer": "용살자",
    "Dual Wield": "쌍수 무기",
    "Eagle Eye": "독수리의 눈",
    "Fast Footwork": "빠른 발놀림",
    "Fast Healer": "빠른 회복",
    "Fearless": "두려움 없는 자",
    "Focused": "집중력",
    "Guardian": "수호자",
    "Insight": "통찰력",
    "Intuition": "직관",
    "Iron Fist": "철권",
    "Iron Grip": "강철 손아귀",
    "Lightning Fast": "전광석화",
    "Lone Wolf": "외로운 늑대",
    "Magic Talent": "마법 재능",
    "Massive Blow": "혼신의 일격",
    "Master Blacksmith": "명장 대장장이",
    "Master Carpenter": "명장 목수",
    "Master Chef": "명장 요리사",
    "Master Spellcaster": "명장 주문술사",
    "Master Tanner": "명장 무두장이",
    "Monster Hunter": "괴물 사냥꾼",
    "Musician": "음악가",
    "Pathfinder": "길잡이",
    "Quartermaster": "보급관",
    "Robust": "강건함",
    "Sea Legs": "바다 걸음",
    "Shield Block": "방패 막기",
    "Throwing Arm": "투척의 팔",
    "Treasure Hunter": "보물 사냥꾼",
    "Twin Shot": "연발 사격",
    "Veteran": "베테랑",
    "Weasel": "족제비",
    "Adaptive": "적응력",
    "Hard to Catch": "붙잡기 어려움",
    "Hunting Instincts": "사냥 본능",
    "Ill-Tempered": "성마름",
    "Inner Peace": "내면의 평화",
    "Unforgiving": "잊지 않는 자",
    "Webbed Feet": "물갈퀴 발"
};

/** v2.0.0 이전 번역어(이전 버전으로 가져온 월드 보정용) */
const DOD_OLD_KO = {
    skills: {
        "Awareness": "감지",
        "Bushcraft": "야외 생활",
        "Hunting & Fishing": "사냥과 낚시",
        "Myths & Legends": "신화와 전설",
        "Seamanship": "항해",
        "Sneaking": "은신",
        "Spot Hidden": "숨은 것 찾기",
        "Animism": "정령술",
        "Elementalism": "원소술",
        "Mentalism": "정신술",
        "Brawling": "맨손 싸움",
        "Slings": "투석구"
    },
    abilities: {
        "Battle Cry": "전투 함성",
        "Catlike": "고양이 같은 몸놀림",
        "Companion": "동료",
        "Contortionist": "유연한 몸",
        "Defensive": "방어 태세",
        "Dragonslayer": "용 사냥꾼",
        "Eagle Eye": "매의 눈",
        "Fearless": "두려움 없음",
        "Focused": "집중",
        "Insight": "통찰",
        "Intuition": "직감",
        "Iron Fist": "강철 주먹",
        "Lightning Fast": "번개같이 빠름",
        "Massive Blow": "강타",
        "Master Blacksmith": "대장장이 명인",
        "Master Carpenter": "목수 명인",
        "Master Chef": "요리 명인",
        "Master Spellcaster": "주문시전 명인",
        "Master Tanner": "무두질 명인",
        "Monster Hunter": "몬스터 사냥꾼",
        "Musician": "악사",
        "Sea Legs": "뱃사람의 다리",
        "Twin Shot": "쌍발 사격",
        "Veteran": "역전의 용사",
        "Hard to Catch": "잡기 어려움",
        "Unforgiving": "앙심"
    }
};

Hooks.once("babele.init", (babele) => {
    const dictConverter = (dict) => (value) => (typeof value === "string" && dict[value]) ? dict[value] : value;
    babele.registerConverters({
        dodSkillName: dictConverter(DOD_SKILL_KO),   // 무기 요구 기술
        dodSchoolName: dictConverter(DOD_SCHOOL_KO)  // 주문·조제법 유파
    });

    /**
     * Babele 기본 매핑은 dnd5e 스키마 전제라 Dragonbane 필드 경로를 바로잡는다.
     * 아이템 본문은 4.x 마이그레이션 이후 경로인 system.itemDescription이다.
     * registerMapping은 기본 매핑(name/items/effects 등)에 병합된다.
     */
    babele.registerMapping({
        Item: {
            description: "system.itemDescription",
            requirement: "system.requirement",
            prerequisite: "system.prerequisite",
            skills: "system.skills",
            banes: "system.banes",
            boons: "system.boons",
            abilities: "system.abilities",
            cost: "system.cost",
            skillName: { path: "system.skill.name", converter: "dodSkillName" },
            school: { path: "system.school", converter: "dodSchoolName" }
        },
        Actor: {
            description: "system.description",
            traits: "system.traits",
            appearance: "system.appearance",
            weakness: "system.weakness",
            notes: "system.notes"
        }
    });

    babele.register({
        module: "dragonbane-coreset-ko",
        lang: "ko",
        dir: "translations"
    });
});

/**
 * 이미 월드에 가져온 데이터 보정(GM, 변경이 필요한 경우에만).
 * 영문 이름 → [현재 번역어, 이전 번역어] 후보 중 실제로 존재하는 이름을 고른다.
 * 존재하는 후보가 없으면 건드리지 않는다.
 */
const DoDKoFix = {
    candidates(token, current, old) {
        return [current[token], old?.[token]].filter(Boolean);
    },
    /** @returns 바꿀 이름 또는 null */
    pick(token, current, old, has) {
        const t = String(token ?? "").trim();
        if (!t || has(t)) return null;
        return this.candidates(t, current, old).find(has) ?? null;
    },
    /** 쉼표 목록 필드 */
    pickList(value, current, old, has, keepToken = () => false) {
        if (typeof value !== "string" || !value.trim()) return null;
        let changed = false;
        const out = value.split(",").map(s => s.trim()).filter(Boolean).map(tok => {
            if (keepToken(tok)) return tok;
            const p = this.pick(tok, current, old, has);
            if (p) { changed = true; return p; }
            return tok;
        });
        return changed ? out.join(", ") : null;
    },
    namesOf(items, type) {
        return new Set([...items].filter(i => i.type === type).map(i => i.name.toLowerCase()));
    },
    /** 아이템 하나의 갱신 내용 */
    itemUpdate(item, ctx) {
        const s = item.system ?? {}, u = {};
        const hasSkill = n => ctx.skills.has(String(n).toLowerCase());
        const hasAbility = n => ctx.abilities.has(String(n).toLowerCase());
        const isAttr = tok => ctx.attrs.has(String(tok).toLowerCase());
        if (item.type === "weapon" && s.skill?.name) {
            const p = this.pick(s.skill.name, DOD_SKILL_KO, DOD_OLD_KO.skills, hasSkill);
            if (p) u["system.skill.name"] = p;
        }
        if (typeof s.school === "string" && s.school) {
            if (s.school === "General") u["system.school"] = "DoD.spell.general";
            else {
                const p = this.pick(s.school, DOD_SCHOOL_KO, DOD_OLD_KO.skills, hasSkill);
                if (p) u["system.school"] = p;
            }
        }
        if (item.type === "profession") {
            const sk = this.pickList(s.skills, DOD_SKILL_KO, DOD_OLD_KO.skills, hasSkill);
            if (sk) u["system.skills"] = sk;
        }
        if (item.type === "profession" || item.type === "kin") {
            const ab = this.pickList(s.abilities, DOD_ABILITY_KO, DOD_OLD_KO.abilities, hasAbility);
            if (ab) u["system.abilities"] = ab;
        }
        for (const f of ["banes", "boons"]) {
            const v = this.pickList(s[f], DOD_SKILL_KO, DOD_OLD_KO.skills, hasSkill, isAttr);
            if (v) u["system." + f] = v;
        }
        return Object.keys(u).length ? u : null;
    }
};

Hooks.once("ready", async () => {
    if (!game.user?.isGM || game.system?.id !== "dragonbane") return;
    const attrLabels = Object.entries(game.i18n.translations?.DoD?.attributes ?? {}).flatMap(([k, v]) => [k, v]);
    const attrs = new Set([...attrLabels, "str", "con", "agl", "int", "wil", "cha"].map(x => String(x).toLowerCase()));
    const worldSkills = DoDKoFix.namesOf(game.items ?? [], "skill");
    const worldAbilities = DoDKoFix.namesOf(game.items ?? [], "ability");
    let fixed = 0;
    try {
        for (const actor of game.actors ?? []) {
            const ctx = {
                skills: new Set([...DoDKoFix.namesOf(actor.items, "skill"), ...worldSkills]),
                abilities: new Set([...DoDKoFix.namesOf(actor.items, "ability"), ...worldAbilities]),
                attrs
            };
            const updates = [];
            for (const item of actor.items) {
                const u = DoDKoFix.itemUpdate(item, ctx);
                if (u) updates.push({ _id: item.id, ...u });
            }
            if (updates.length) { await actor.updateEmbeddedDocuments("Item", updates); fixed += updates.length; }
        }
        const worldCtx = { skills: worldSkills, abilities: worldAbilities, attrs };
        for (const item of game.items ?? []) {
            const u = DoDKoFix.itemUpdate(item, worldCtx);
            if (u) { await item.update(u); fixed++; }
        }
        // 굴림표 문서 결과 이름 ← 참조 문서의 현재 이름 (하위 표 설명·표시용)
        for (const table of game.tables ?? []) {
            const updates = [];
            for (const r of table.results ?? []) {
                if (!r.documentUuid) continue;
                const doc = fromUuidSync(r.documentUuid, { strict: false });
                if (doc?.name && doc.name !== r.name) updates.push({ _id: r.id, name: doc.name });
            }
            if (updates.length) { await table.updateEmbeddedDocuments("TableResult", updates); fixed += updates.length; }
        }
    } catch (err) {
        console.error("dragonbane-coreset-ko | 월드 이름 참조 보정 중 오류", err);
    }
    if (fixed) console.log(`dragonbane-coreset-ko | 이름 참조 필드 한국어 보정: ${fixed}건`);
});

globalThis.DoDKoFix = DoDKoFix;
