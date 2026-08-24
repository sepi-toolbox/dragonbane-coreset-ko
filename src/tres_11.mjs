import fs from "fs";
const T = {}; const TD = {};

T["Area Table"] = {
"8wwy1kfv9HH603Vm":`버려진 초소`, "dWG58Yq3DOSGU1zi":`오래된 무덤`, "ot39jtsCwZLRIX23":`파 놓은 굴`,
"nUnDtw5fuL4Yv7KX":`숨 막히게 좁은 통로`, "GJu6A6kKuae6V4mf":`갈피를 잡을 수 없는 미로`, "Psmhscpt8mAHdb8Q":`비좁은 방`,
"NA9oEV79nMO2Togn":`파 내려간 광산`, "IefDRHH1ry1eeHjL":`드넓은 홀`, "USHFcBAMY6r4nqfu":`잊힌 서고`,
"s7Qj9phi60JYd1pN":`멈춰 선 작업장`, "jZpL2aKqL0vamMGz":`사람이 있는 초소`, "YkJmkgvzOkmmgfjA":`높다란 다리`,
"Cf3zBUZl45dY1dQa":`좁은 계단`, "40M3CXuFzKdlWEIs":`천연 동굴`, "0xjbwjzPQV25OTEP":`아득한 수직굴`,
"fDpkalEulTuOqlZl":`위태로운 사다리길`, "nKZkQPDi6tT2w4gk":`지하 강`, "oXd56bZoaJRFA6bB":`구불구불한 통로`,
"n3WV4yz9i0QXzcxo":`사악한 신전`, "hkS5pNeRJcdmFjXo":`입 벌린 협곡` };

T["Location Details - Oddity"] = {
"5aHkoNOeEp0avIUh":`비전 문양`, "NHOwTCEUh6YL0jV9":`갈피를 잡을 수 없는 수수께끼`, "ed51cAItCeiaxJeh":`알 수 없는 기계 장치`,
"pIfekxcSVf7suwA6":`난해한 건축`, "OpEKx6KYrXTUHLmI":`살덩이 같은 지형`, "NULH9mC07ud3JCmO":`무성하게 자란 나무`,
"ePNMbLosixRIxtwW":`유령의 환영`, "cKrOo8dyUh8y4uGk":`거대한 시체`, "SAwcW9oDwsiLquc5":`공중에 떠 있는 구체`,
"9p1szsbgkC7P322f":`웅웅대는 오벨리스크`, "810iGmOuxIn7ekdF":`마법 거울`, "A7b2V25QqX4eJIjv":`신비한 빛`,
"HfBazRhfayI8WcuL":`뒤집힌 중력`, "avLWff9tSfxhFMZu":`의식이 있는 문`, "uYIZBTh1d9P0jKHc":`모습을 바꾸는 건축물`,
"tHj96OGpPptz4guH":`노래하는 해골`, "YPYghgHmgkjHwLJU":`소용돌이치는 관문`, "prR9Pgp9VRytVGXV":`말하는 조각상`,
"uq4mxsQtfRfe2Fmz":`부자연스러운 어둠`, "8AQjgVxT9cMuMnlA":`섬뜩한 웃음소리` };

T["Location Details - Danger"] = {
"2i99u5ZEA21SUPpb":`산성 웅덩이`, "ZWiTRvCAVTngkzyb":`매복한 적`, "gaUSqxTwDESFq7sk":`다가오는 적`,
"cHrUYFXbZoLzUQec":`비전의 술책`, "EakaaIDpGQD2dPmS":`끊긴 길`, "ApQyRJ2khniP2RWp":`무너져 내리는 지형`,
"4JJ6jZdQq6zyIPze":`무시무시한 제단`, "5h86WGBlPe7jcvcF":`불길에 휩싸인 주변`, "XSS6fKtVamMkn8Vv":`물에 잠긴 공간`,
"1YgckuRHv2nPD7kK":`흐르는 마그마`, "K0mJJXCAPRWTiNEj":`숨겨진 함정`, "Xr3OFMvTlnHAP5jM":`얼어붙은 바닥`,
"ORYWdIdg2vFXgQR7":`임박한 붕괴`, "85ciV8y5IlGnh835":`위기에 빠진 모험가`, "nTNHyC3BlvnkUQwd":`짐승이 사는 소굴`,
"22Euy15zWAysgASM":`불길한 전투 북소리`, "5Fiv0Kvushc2SURD":`펄펄 끓는 수증기`, "xQTOOUk2MQOPhD6i":`휘갈겨 쓴 경고`,
"pRUqshxfipPUWd4d":`봉인된 출입구`, "lMhPQTyePKMuQCxp":`유독한 연기` };

T["Location Details - Contents"] = {
"83fLVkvIH1ux2wlx":`버려진 보급품`, "y0OgA9clFsmYjEaH":`핏자국`, "1ypSWrhvTMwe7jM4":`부서진 출입구`,
"z00TIFtMGqpPp4Ic":`갈라진 지형`, "ODd4XqFaEpNuwC8H":`허물어진 사당`, "bLdldSBFCvKCMgv2":`깊은 우물`,
"BJUOrtRogFC6lYAj":`먼지 쌓인 고서`, "JjFtLtlBdqK0ypad":`타오르는 화로`, "e91czdLWtTQ0avvF":`역겨운 둥지`,
"uL5thf6MQ9JnaGtL":`갓 죽은 시체`, "p1vdaPJYMuplDkro":`임시로 세운 바리케이드`, "buF9bL32YaFHZ3iW":`곰팡이 슨 태피스트리`,
"BsjyAHxTGQlPWW6o":`미라가 된 시체`, "tsY7jbateYkrWQ7d":`화려한 석관`, "u1uoai9Abx5WLwYk":`외딴 야영지`,
"DIDrGZmsVs65Rekd":`흩어진 뼈`, "Y24SHo6yrH5CWgn8":`봉인된 앞방`, "cbDhDvOYnBUvBeVH":`쓰러진 기둥`,
"5yIMtQbf7cUqn7fe":`우뚝 솟은 조각상`, "Iv8daa36hCvQyJPQ":`떠도는 모험가` };

T["Location Details - Environment"] = {
"Qt2cuSaa2TGMX7vB":`부글대는 웅덩이`, "P6TDwoYyuaPq5Gdd":`살을 에는 추위`, "AyRH88qx0VKqz9un":`들러붙는 거미줄`,
"8HGUWnkUynYjwCMM":`시야를 가리는 안개`, "h9OtpPDu9LkvOtxG":`부식된 표면`, "32Bs9tv4MkJX1O3z":`뻗어 오르는 덩굴`,
"VRbG7GyMXVg5dgVE":`뚝뚝 떨어지는 물`, "IX5esnNePT7bHD0w":`먼지투성이 공기`, "FteUnjwS4bf5ny5x":`무성한 균류`,
"4kkczATkTSP5skp1":`유리 같은 표면`, "R0I0nZjbRSuKMaFY":`빛나는 수정`, "0oZorFvdNUJldWPo":`발광하는 포자`,
"62BCvfl7UCN8FV5z":`기계가 돌아가는 소리`, "Ad1Jp4gt4OAHMdHe":`숨 막히는 열기`, "YqOMHLFV0KElIjgS":`거칠게 긁힌 자국`,
"DGbPH4yqm149rK2L":`썩어 가는 악취`, "yTQcMTTKssYwcmei":`바스락대는 소리`, "deViZgwStLnbTaoM":`미끈거리는 표면`,
"J8trzpYTvrgUn00f":`연기로 가득한 공기`, "1VT7LUM2ZqwRtrAb":`고인 웅덩이` };

T["Scavenge"] = {
"76InCmJ2lQa1tGvn":`특별한 것 없음.`,
"nEgnYJKOAoDBmhsk":`<b>보물 카드 한 장.</b>`,
"5RK1XTjPM2sMvCGQ":`<b>보물 카드 한 장</b>, 그리고 다시 굴립니다.` };

T["Scavenge - Supplies"] = {
"OJOCI6SnifJo4Mly":`<b>보급품:</b> 붕대.`, "iBksueVfHFZtY66N":`<b>보급품:</b> 야전 식량.`,
"um6uSyXIzMvcRv2P":`<b>보급품:</b> 고급 의복.`, "jGGG8qYCs6sN4nal":`<b>보급품:</b> 자물쇠 따개.`,
"0jrgDNdZfZnEWbb2":`<b>보급품:</b> 화살통.`, "TNYBHeKt4Kkfwdt1":`<b>보급품:</b> 횃불.` };

T["Scavenge - Interesting Item"] = {
"Vx5YjSLbHE1OA6Gl":`<b>흥미로운 물품:</b> 열쇠.`, "33lk9sBlKHHorJot":`<b>흥미로운 물품:</b> 지도.`,
"toSSGpAlOifR8VQm":`<b>흥미로운 물품:</b> 기묘한 장치.`, "pwW8lC1a0ZfSH5om":`<b>흥미로운 물품:</b>적힌 전언.` };

T["Scavenge - Unexpected Danger"] = {
"gZe8vl2seX0KWcrs":`<b>뜻밖의 위험:</b> 생물.`, "l1vxb3JlGjPd8FkI":`<b>뜻밖의 위험:</b> 저주받은 물건.`,
"AQMMDQZjsywY5i3x":`<b>뜻밖의 위험:</b> 유독한 포자.`, "y4IZIfknIeuPlalm":`<b>뜻밖의 위험:</b> 함정.` };

T["NPC Attack Table - Ranged"] = {
"jQg5cG9sFj0ZRaFw":`<b>한 발!</b> NPC가 원거리 공격을 합니다.`,
"f6iRbBJoavVXRw5j":`<b>대기!</b> NPC가 행동을 써서 더 나은 자리로 옮기거나 발사 준비를 합니다. 다음 차례에 자동으로 명중하는 공격을 합니다(회피하거나 막는 데 성공하지 않는 한).`,
"I1s5zQzm6A3vFU4j":`<b>연사!</b> NPC가 이번 차례에 두 번 공격합니다. 두 공격 모두 불리점을 받습니다.`,
"ccH5NniqWaktn4gq":`<b>치명적인 한 발!</b> NPC가 불리점을 받고 공격하며, 명중하면 [[/damage 2D6]]을 추가로 입힙니다.` };

T["NPC Attack Table - Magic"] = {
"jQg5cG9sFj0ZRaFw":`NPC가 대상 하나에게 [[/damage 2D6]]을 입히는 공격 주문을 시전합니다.`,
"f6iRbBJoavVXRw5j":`<b>마법 폭발!</b> NPC가 10미터 안의 모든 대상에게 [[/damage 3D6]]을 입히는 공격 주문을 시전합니다.`,
"I1s5zQzm6A3vFU4j":`<b>비전 방패!</b> NPC가 들어오는 피해를 [[/roll 2D6]]만큼 줄이는 방패를 자동으로 불러냅니다. 방패를 유지하려면 그 뒤 라운드마다 무료 행동으로 기술을 굴립니다. 이 행동을 더 쓰면 이미 있는 방패의 방어력에 [[/roll D6]]이 더해집니다.`,
"ccH5NniqWaktn4gq":`NPC가 정체를 알 수 없는 주문을 시전합니다. 영감표에서 행동과 사물을 굴려 그 주문의 효과를 해석하세요.` };

T["NPC Attack Table - Melee"] = {
"jQg5cG9sFj0ZRaFw":`<b>일격!</b> NPC가 근접 공격을 합니다.`,
"f6iRbBJoavVXRw5j":`<b>방어 태세!</b> 당신이 이번 라운드에 아직 행동하지 않았다면, NPC가 당신과 우선권 카드를 맞바꾸고 이점을 받아 막거나 회피합니다. 당신이 공격하지 않거나 이미 공격했다면, NPC는 행동을 써서 불리점을 받고 공격합니다.`,
"I1s5zQzm6A3vFU4j":`<b>난폭한 공격!</b> NPC가 이점을 받고 공격합니다. 명중하면 [[/damage D6]]을 추가로 입히고 당신은 쓰러집니다. 그 NPC의 다음 차례 전에 당신이 공격한다면 당신도 이점을 받고 공격합니다.`,
"ccH5NniqWaktn4gq":`<b>위협적인 격노!</b> NPC가 포효하거나 날뛰기 시작합니다. 의지를 굴려 공포에 저항하세요.` };

T["NPC Attack Table - Sneaky"] = {
"jQg5cG9sFj0ZRaFw":`<b>교활한 일격!</b> NPC가 지금 든 무기로 공격합니다.`,
"f6iRbBJoavVXRw5j":`<b>자리 이동!</b> NPC가 행동을 써서 접근 방식이나 무기를 근접에서 원거리로, 또는 그 반대로 바꿉니다. 다음 차례에 이점을 받고 공격합니다.`,
"I1s5zQzm6A3vFU4j":`<b>교묘한 속임수!</b> NPC가 눈속임으로 공격을 준비합니다. 당신은 무료 행동으로 지능을 굴려야 합니다. 성공하면 이점을 받고 그 공격을 회피하거나 막을 수 있습니다. 지능 굴림에 실패하면 NPC가 자동으로 명중하며(회피하거나 막을 수 없습니다) [[/damage D6]]을 추가로 입힙니다.`,
"ccH5NniqWaktn4gq":`<b>기습 공격!</b> NPC가 행동을 써서 몸을 숨깁니다. 당신은 무료 행동으로 감지를 굴릴 수 있습니다. 실패하면 NPC가 다음 차례에 자동으로 명중하며(회피하거나 막을 수 없습니다) [[/damage 2D6]]을 추가로 입힙니다.` };

fs.writeFileSync("tres_11.json", JSON.stringify({ results: T, descriptions: TD }, null, 1));
console.log("tres_11:", Object.keys(T).length, "표,", Object.values(T).reduce((s,o)=>s+Object.keys(o).length,0), "결과");
