# Dragonbane - Core Set 한국어 번역 (dragonbane-coreset-ko)

Foundry VTT의 유료 공식 모듈 **Dragonbane - Core Set**(`dragonbane-coreset`)을 한국어로 치환하는 Babele 번역 모듈입니다.

> ⚠️ 이 모듈에는 원본 콘텐츠가 들어 있지 않습니다. **원본 Core Set 모듈을 별도로 구매·설치**해야 동작합니다.
> 번역문은 원문 없이는 의미를 이루지 않는 치환 데이터이며, 개인 이용을 전제로 합니다.

## 번역 기준

모든 문장과 용어는 **번역자의 한국어판 규칙서·어드벤처·솔로 모험·캐릭터 시트**를 정본으로 삼아 옮겼습니다.
Foundry 데이터의 HTML 구조·링크·굴림 명령은 영문 원본과 1:1로 유지하고, 게임 수치·주사위는 영문 2쇄 데이터를 따릅니다.
영문에만 있는 Foundry 안내문은 정본 문체와 용어로 번역했습니다.

## 번역 범위

원본은 어드벤처 컴펜디움 3개로 구성되며, 아래 항목이 모두 한국어로 표시됩니다.

| 항목 | 규칙 | 모험 | 솔로 모험 |
|---|---|---|---|
| 폴더 · 액터 · 아이템 · 굴림표 이름 | 49 · 63 · 376 · 105 | 19 · 82 · 13 · 38 | 1 · 3 · 2 · 25 |
| 저널 / 페이지 | 13 / 119 | 18 / 174 | 1 / 9 |
| 장면 · 매크로 · 카드덱 이름 | 4 · 15 · 5 | 19 · 0 · 1 | 0 |

- **저널 본문** 277페이지 — 규칙서 전 장, 캠페인 「드래곤 황제의 비밀」 11편, 「딥폴 브리치에 홀로」
- **아이템 설명** 327종 — 주문, 영웅·혈족·직업 능력, 기술, 장비·서비스, 혈족, 직업, 부상, 기념품, 어드벤처 물품
- **굴림표 결과** 1,107건 — 사고, 몬스터 공격, 여정·임무·모험지 생성표, 캐릭터 생성표, 무작위 조우, 솔로 운명표·탐험표 등
- **액터 설명·특징**과 구조화 필드(가격, 요구·선행 조건, 은총·파멸 대상, 기술 목록, 사전 제작 캐릭터 외형·약점·메모)

「약탈 기사의 성」, 제작진, 명령어 페이지는 정본에 없어 기존 번역에 정본 용어만 적용했습니다.
카드덱(우선권·즉석 무기·보물·어드벤처 카드) 앞면은 이미지이므로 이름만 번역되어 있습니다.

## 요구 사항

- 게임 시스템 **Dragonbane / Drakar och Demoner**
- 원본 모듈 **Dragonbane - Core Set** (유료)
- 모듈 **Babele**
- 함께 쓰면 좋은 모듈: [dragonbane-ko](https://github.com/sepi-toolbox/dragonbane-ko) — 시스템 UI 한국어 번역(같은 정본 용어)

## 용어

기본 게임 용어는 `dragonbane-ko`의 [용어집](https://github.com/sepi-toolbox/dragonbane-ko/blob/main/docs/용어집.md)을,
Core Set 고유 표기(혈족·직업·장비 명명 규칙·몬스터·지명)는 [docs/용어집-coreset.md](docs/용어집-coreset.md)를 따릅니다.

## 구현 메모

- 이름이 겹치는 아이템(`Healing` = 기술/서비스, `Bite` = 독사/일반 동물 등)은
  Babele의 `_id` 매칭 전략이 `name`보다 먼저 평가되는 점을 이용해 `_id` 키로 분리했습니다.
- 저널 내부 앵커 링크는 번역된 제목으로 Foundry가 만드는 슬러그에 맞춰 다시 계산했습니다(제목 위치로 바로 이동).
- `src/`에 이름 사전·본문 사전·빌드 스크립트·검증기가 들어 있습니다.
  - 빌드: `node build_cs3.mjs` (원본 팩 복사본 `src/cspack`, `classic-level` 필요)
  - 검증: `validate_j.mjs jn_*.json`, `validate_desc.mjs desc_*.json`, `validate_tbl.mjs tres_*.json`,
    `validate_atr.mjs adesc_*.json atr_traits.json`, `verify_all.mjs`(Babele 실제 코드로 영문 잔존 검사)

## 라이선스 · 권리 고지

- 번역 데이터 및 스크립트: MIT
- *Dragonbane* / *Drakar och Demoner*는 Fria Ligan AB의 등록 상표입니다. ©2023 Fria Ligan AB
- 이 모듈은 Fria Ligan AB와 무관한 비공식 팬 번역입니다. 원본 콘텐츠를 포함·재배포하지 않습니다.
