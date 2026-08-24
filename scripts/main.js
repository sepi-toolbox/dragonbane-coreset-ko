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
     * Dragonbane 시스템은 둘 다 평문 필드(system.description)를 쓰며,
     * 그 밖의 표시 문자열도 system 아래 평문 필드로 흩어져 있다.
     * 경로가 없으면 Babele는 그 필드를 조용히 건너뛰므로(field-mapping.js의
     * translate() early-return), 매핑을 바로잡지 않으면 번역 데이터가 있어도
     * 화면에는 원문이 그대로 나온다.
     *
     * registerMapping은 기본 매핑에 병합되므로 name/items/effects/tokenName 등
     * 기존 정의는 그대로 유지된다.
     */
    babele.registerMapping({
        Item: {
            description: "system.description",   // 아이템·능력·주문 본문
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
