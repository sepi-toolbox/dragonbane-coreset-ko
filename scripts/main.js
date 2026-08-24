/**
 * dragonbane-coreset-ko — Babele 번역 디렉터리 등록
 *
 * Dragonbane - Core Set 모듈의 어드벤처 컴펜디움을 한국어로 치환한다.
 * 원본 모듈(dragonbane-coreset)과 Babele이 함께 활성화되어 있어야 동작한다.
 */
Hooks.once("babele.init", (babele) => {
    babele.register({
        module: "dragonbane-coreset-ko",
        lang: "ko",
        dir: "translations"
    });
});
