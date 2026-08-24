/**
 * dragonbane-coreset-ko — Babele 번역 디렉터리 등록
 *
 * Dragonbane - Core Set 모듈의 어드벤처 컴펜디움을 한국어로 치환한다.
 * 원본 모듈(dragonbane-coreset)과 Babele이 함께 활성화되어 있어야 동작한다.
 */
Hooks.once("babele.init", (babele) => {
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
            cost: "system.cost"                  // 가격 표기
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
