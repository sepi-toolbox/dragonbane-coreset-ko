# Dragonbane - Core Set 한국어 번역 (dragonbane-coreset-ko)

Foundry VTT의 유료 공식 모듈 **Dragonbane - Core Set**(`dragonbane-coreset`)을 한국어로 치환하는 Babele 번역 모듈입니다.

> ⚠️ 이 모듈에는 원본 콘텐츠가 들어 있지 않습니다. **원본 Core Set 모듈을 별도로 구매·설치**해야 동작합니다.
> 번역문은 원문 없이는 의미를 이루지 않는 치환 데이터이며, 개인 이용을 전제로 합니다.

## 진행 상황

원본은 어드벤처 컴펜디움 3개로 구성됩니다.

| 어드벤처 | 내용 | 이름 | 아이템 설명 | 저널 본문 | 표 결과 |
|---|---|---|---|---|---|
| Dragonbane - Rules | 규칙서 전체 | ✅ | ✅ | ⬜ | ⬜ |
| Dragonbane - Adventures | 11편 캠페인 「용 황제의 비밀」 | ✅ | ✅ | ⬜ | ⬜ |
| Dragonbane - Solo Adventure | 「딥폴 균열에 홀로」 | ✅ | ✅ | ⬜ | ⬜ |

### 완료 — 이름 레이어 3개 어드벤처 전량 (100%)

| 항목 | Rules | Adventures | Solo |
|---|---|---|---|
| 폴더 | 49 | 19 | 1 |
| 액터 | 63 | 82 | 3 |
| 아이템 | 376 | 13 | 2 |
| 굴림표 | 105 | 38 | 25 |
| 저널 / 페이지 | 13 / 119 | 18 / 174 | 1 / 9 |
| 장면 · 매크로 · 카드덱 | 4 · 15 · 5 | 19 · 0 · 1 | 0 |

컴펜디움 목록, 폴더 트리, 캐릭터·몬스터 시트, 장면 이름이 모두 한국어로 표시됩니다.

### 완료 — 아이템 설명 전량 (100%)

설명이 있는 아이템 **327개 전량**(액터 내장 아이템 포함)을 번역했습니다.
주문 66, 영웅/종족 능력 51, 기술 33, 장비·서비스 126, 종족 6, 직업 12, 부상 14, 어드벤처 마법 물품 10 등.

`@UUID` 링크·`[[/roll]]`·`[[/damage]]` 인리처, HTML 태그·속성·비밀 구획(`<section class="secret">`)을
원문과 1:1로 대조 검증했습니다(`src/validate_desc.mjs`).

### 남은 작업

- **저널 규칙·어드벤처 본문** — 303페이지, 약 47만 자
- **굴림표 결과** — 1,208건, 약 11만 자

## 요구 사항

- 게임 시스템 **Dragonbane / Drakar och Demoner**
- 원본 모듈 **Dragonbane - Core Set** (유료)
- 모듈 **Babele**
- 함께 쓰면 좋은 모듈: [dragonbane-ko](https://github.com/sepi-toolbox/dragonbane-ko) — 시스템 UI 한국어 번역

## 용어

시스템 번역 모듈 `dragonbane-ko`의 [용어집](https://github.com/sepi-toolbox/dragonbane-ko/blob/main/docs/용어집.md)을 그대로 따릅니다.
Core Set 고유 용어(종족·직업·무기·지명·인명 표기 원칙)는 [docs/용어집-coreset.md](docs/용어집-coreset.md)에 정리합니다.

## 구현 메모

- 이름이 겹치는 아이템(`Healing` = 기술/서비스, `Dagger` = 일반 무기/독 바른 대거)은
  Babele의 `_id` 매칭 전략이 `name`보다 먼저 평가되는 점을 이용해 `_id` 키로 분리했습니다.
- `src/`에 이름 사전·설명 원본·빌드 스크립트·검증기가 들어 있습니다. 번역을 이어서 하려면
  사전에 항목을 추가하고 `node build_cs3.mjs`로 재빌드하면 됩니다(커버리지 리포트 포함).

## 라이선스 · 권리 고지

- 번역 데이터 및 스크립트: MIT
- *Dragonbane* / *Drakar och Demoner*는 Fria Ligan AB의 등록 상표입니다. ©2023 Fria Ligan AB
- 이 모듈은 Fria Ligan AB와 무관한 비공식 팬 번역입니다. 원본 콘텐츠를 포함·재배포하지 않습니다.
