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
     * Dragonbane 시스템은 둘 다 평문 필드(system.description)를 쓰고,
     * NPC/몬스터의 "특징"은 system.traits에 들어 있다.
     * 이 경로를 바로잡지 않으면 번역 데이터가 있어도 적용되지 않는다.
     * (registerMapping은 기본 매핑에 병합되므로 name/items/effects 등은 그대로 유지된다.)
     */
    babele.registerMapping({
        Item: {
            description: "system.description"
        },
        Actor: {
            description: "system.description",
            traits: "system.traits"
        }
    });

    babele.register({
        module: "dragonbane-coreset-ko",
        lang: "ko",
        dir: "translations"
    });
});
