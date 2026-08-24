import fs from "fs";
const T = {}; const TD = {};

TD["The Journey - 1. The journey is"] = `이 여정은`;
T["The Journey - 1. The journey is"] = {
"qb2jwGuBzmE3a498":`노래와 우정을 나눌 여유가 넉넉한 편안한 여정이며`,
"VyHpZ8x47vrXe8Ce":`뜻밖의 만남과 시련으로 가득한 파란만장한 여정이며`,
"zIYgc6eEn0ZxXMyE":`날씨를 종잡을 수 없고 길이 험한 고된 여정이며`,
"qcd7NKDMsidiPxSl":`고되고 비참한 여정이며` };

TD["The Journey - 2. and ends"] = `그리고 끝나는 곳은`;
T["The Journey - 2. and ends"] = {
"6MVfz5MC6CFuZSEl":`산그늘 아래.`, "gbkfQfxXms8TzLA4":`숲의 어둠 속.`,
"vbifqRFmByqYI1gs":`질척한 늪지.`, "0kDwxrIvXJtgq0B2":`검은 호숫가.`,
"zRhEqXMwyTpwjiVX":`언덕 기슭.`, "hkwXLQnJMI92ow4C":`강둑.` };

TD["The Journey - 3. There is an"] = `그곳에는`;
T["The Journey - 3. There is an"] = {
"RMkwQeQ2zAcHcZ2b":`오래된`, "5wXUPEPADYBdadpU":`버려진`, "NhYGYRdPcGlFTv3L":`잊힌`,
"gIEZ6UVfEYVxM7IE":`수풀에 뒤덮인`, "7h78XnO1HkrppefV":`무너져 가는`, "KUqtSZRcOanLkWPU":`숨겨진`,
"WT1JhoQElDUeXurh":`기묘한 모양의`, "zZcNbrHS2NApRioK":`파괴된` };

T["The Journey - 4. place"] = {
"GHRyv8sIY4tXlmvr":`탑 폐허가`, "B1wQWLaGRepTsFXc":`지하 묘지가`, "3Saeq88kHIw0CWXv":`무덤이`,
"LCn8enqrd4RWhXYe":`마을이`, "ACjsdG5y9pukZbkO":`동굴이`, "dbOxZ79au71b7OPC":`성 폐허가`,
"Iao9MyFAngOPGsRh":`농장이`, "q7T9WijYGmpxlnvs":`언덕이`, "kASffdopC4RWKyvJ":`연못이`,
"I6s8bVxhXqQA5BJQ":`협곡이` };

TD["The Journey - 5. surrounded by"] = `둘러싸인 것은`;
T["The Journey - 5. surrounded by"] = {
"KENYaXARFUaIEsJV":`늪.`, "Fa4L5mG3dLWIXngG":`짙은 안개.`, "Rcs9TozVw0NSJAsJ":`검고 뒤틀린 나무들.`,
"U2hja3sTaGT3d84T":`무거운 비구름.`, "dCgcR2knA5FE84YX":`살을 에는 강풍.`, "mkCzwvUNulcvA9Oj":`가시지 않는 악취.`,
"ny2UaD9ecAqeFaZI":`죽은 짐승의 잔해.`, "27zKpfnqDX9U2YiU":`불타 버린 황무지.`, "cT4yTxMc1swac5iy":`선돌.`,
"y4pnB0Lb3FUM4GRa":`기묘한 문양.`, "Xeswj0Z7SqtuhQVT":`폐허의 벌판.`, "AnQaqKlBHvGe3z6p":`일렁이는 갈대.` };

TD["The Journey - 6. The place is called"] = `그곳의 이름은`;
T["The Journey - 6. The place is called"] = {
"hxuzXudS5mLmEYrG":`바크의 피.`, "wC6bZFlRn1ZCOX76":`메마른 바위.`, "o2S0I4cBm9vBVCB2":`밤의 구덩이.`,
"LsKKfarozLEFCkga":`멜카의 선물.`, "exRRI91TIrQY7F6I":`구르게의 굴.`, "lpTKrNz7gznyGcRj":`스톤핸드의 망루.`,
"ZmdvpCEqMVo0iUiV":`비데르가르드.`, "llUbqWaowJJKSIji":`서리의 구체.`, "9vGOkhl89Y8we9om":`오크핸드.`,
"svN6BqjOQIO20BMI":`헤로드의 물.`, "NHAuC2bvSj0S4mbJ":`킬의 물가.`, "SZSYuWqPpRwMHHnG":`페리스의 최후.`,
"J7b06AaaNZCu1zIp":`사르의 다리.`, "Zgy4d8zR82G1HCw6":`비르크홀름.`, "PuKcd3W1DsjwB1W5":`시들녘.`,
"3sQkBuFU17syWa5B":`비버의 울음.`, "CbktXlsC14sKw2qQ":`구리 성문.`, "TCwMQfneapwbGN1h":`바라의 숲.`,
"nfXzgfVBaZH2BWaL":`잿빛 갈림터.`, "Yk5kVqISD5gGhRi1":`폭풍의 항구.` };

TD["Create NPC - 1. Attitude"] = `태도`;
T["Create NPC - 1. Attitude"] = { "G0YRdk1e0KW1A45b":`적대적`, "wnpvzUb8psBBGxKk":`회피적`, "GbV7mHPkqmXfKRzI":`무관심`, "M9wQ1bC2syZQ18pE":`우호적` };

TD["Create NPC - 5. Trait"] = `특징`;
T["Create NPC - 5. Trait"] = {
"jd3SL6o1KE9Mo0se":`말이 지나치게 많다`, "ppKrDs7328mdCZzh":`기묘한 옷차림`, "PDtlNKQtocUcU10f":`눈빛이 사납다`,
"sFh6iLL6N6QEsb7S":`몸에서 고약한 냄새가 난다`, "U2qIUjFwjRsFletb":`익살꾼`, "CrCtn2LHRbyYKCH9":`광신도`,
"c8FGghmPgEA1D4aN":`어딘가 어린애 같다`, "j7TfCKbEc0nK4ILq":`말수가 적고 까다롭다`, "X2WQb5ATgu3XI1WV":`데몬 숭배자`,
"103KBTLcYHUiLZml":`고집이 세다`, "x9ltcsL5ERAYE2jM":`몹시 예민하다`, "sYvHiSaowoC7egug":`지독한 낭만주의자` };

TD["Create NPC - 4. Motivation"] = `동기`;
T["Create NPC - 4. Motivation"] = {
"1G1wzr8dnJlSlVYV":`달콤하게 반짝이는 황금`, "H3Z7NQRfgaYkiohe":`세상에 대한 지식`, "kxxtGRBZaxi6ugAp":`깊고 영원한 사랑`,
"a96ypN1A0NCCaJMA":`평생을 건 맹세`, "Fw8amX6WdHLzaCPW":`갚아야 할 부당한 일`, "aKs3cFwWzHarMRMo":`기쁨과 노래로 가득한 삶`,
"f4QppTL1B2iIqbak":`결코 끊을 수 없는 핏줄`, "asxC3FNoTddvC1Pq":`어두운 과거로부터의 도피` };

TD["Create NPC - 6. Name"] = `이름 (고르기)`;
T["Create NPC - 6. Name"] = {
"lAFRY49paW4DhxXF":`아그나르, 요리드, 다레이오스`, "zD3T0dFXWux6W1hn":`라근파스트, 아스크, 에우안테`,
"3EhUgrF6YtYFRlcU":`아르눌프, 티라, 크산토스`, "P9IzYdzMhwv5KDW2":`아틀레, 리브, 아탈리아`,
"NNi2GnGHT8Hbg2RR":`구토름, 엠블라, 클레이토스`, "jvC5qinHNAWsV29R":`보트비드, 라그나, 아스타라`,
"7jAs2xXIIi4CwH0C":`칼레, 투리드, 프리아무스`, "7BpEBdNvTJncX824":`에길, 요룬, 갈리나`,
"LPvl4gRn4CYuABo3":`잉에문드, 보르길드, 타라스`, "UgWEtvhzyzVQ4xND":`구드문드, 길라, 제나이스`,
"fIkC44Fa2PPVsZL7":`그림, 토라, 헤시오도스`, "ivdg3GDUFa5d2OU8":`브란드, 에다, 리에네`,
"fDte46UWd5wjXexi":`폴크비드, 시그룬, 에우프락시아`, "IYiWlDD38J4JVLDZ":`게르문드, 다그룬, 타라스`,
"wbMETM3DtT6Y6Cyu":`알고트, 볼라, 리산드라`, "lxgQa9LWCMoDhKsy":`톨리르, 이르사, 칼리아스`,
"3JzYUstEqZ5nFz8n":`히오르발드, 에스트리드, 이시도라`, "taaGJAnkZAHZmUGR":`암비외른, 시그네, 아토스`,
"YkH7KAcvDrVINsWa":`그룬, 틸데, 라리사`, "7z6K40JaYNcQFfVg":`올그리드, 이둔, 니키아스` };

TD["Create NPC - 2. Kin"] = `종족`;
T["Create NPC - 2. Kin"] = { "7s2JUcstASm5LdHp":`인간`, "FDZX6Xd7y5Q751l0":`드워프`, "RqbCcffvh6KzpkKL":`엘프`, "rJv4m0eQ8Xr7lNdL":`하플링`, "0lSZtYyK9FsEHp5V":`울프킨`, "pAO9WyqEOmZNNWlN":`말라드` };

TD["Create NPC - 3. Profession"] = `직업`;
T["Create NPC - 3. Profession"] = { "jP4YXDyOOPdPfmoH":`음유시인`, "PYNoPYC5IKpM7HoC":`장인`, "iGITKx4Z7pDFe8kw":`사냥꾼`, "6Hj9DcnTfdsC482B":`전사`, "Dy4konJUi7RGF8kj":`학자`, "hVyvEHV7EDd42VuL":`마법사`, "9B9tp3pKGnxcH2Vb":`상인`, "65ckriK5aHYK353r":`기사`, "CYETT7HYaH0vAapb":`뱃사람`, "aJcTqyUBWubQ65WL":`도적` };

TD["The Quest - 1. One day"] = `어느 날`;
T["The Quest - 1. One day"] = { "TdxrzCwwEu5MteEf":`어스름한 선술집에서`, "oHCWJEvLm65RDL5u":`동틀 무렵 첫 햇살 아래에서`, "s9fysuJlaUmcS50T":`모닥불의 온기 곁에서`, "eyzt59Yiab6xtMUs":`북적이는 장터에서` };

TD["The Quest - 2. the characters come across"] = `캐릭터들이 마주친 것은`;
T["The Quest - 2. the characters come across"] = {
"UHf6NoEcwkQAZths":`전령이며, 보낸 이는`, "4V9Du3187vi89odl":`편지이며, 보낸 이는`, "s1pzX5JBcnyccNEW":`소문이며, 그 내용은`,
"VRYY1Xv7dnulX3vF":`뒷말이며, 그 대상은`, "HwflOKm1xRVW4tAQ":`만남이며, 그 상대는`, "2DTdP6ok6sGbvIRp":`징조이며, 그것이 가리키는 이는` };

T["The Quest - 3. from/about/with"] = {
"ZnhtMWFEZlwJ0DKm":`수수께끼 같은 시전자 카르바고`, "friCUelchFbAck4Z":`외눈의 전사 보데`,
"gCXNl480Nz2424Ok":`서글픈 하플링 음유시인 스몰라`, "3HN7hWZRsF9kfhkL":`호기심 많은 울프킨 뱃사람 말카르`,
"3SU65uRz0qmUafXv":`탐욕스럽지만 익살스러운 말라드 상인 루드불`, "0XAG6CD9Z2hnD1EO":`비밀 많은 엘프 사냥꾼 다바노르`,
"Weg1dw7yuQFx0bhD":`집착이 심한 드워프 여성 학자 베루나`, "nd8iyegSayvTdiHY":`오만한 기사, 골짜기의 로에나` };

TD["The Quest - 4. who wants to"] = `그가 원하는 것은`;
T["The Quest - 4. who wants to"] = {
"asxuzeZiXihsMBoh":`조사하는 것`, "hS6agJUdCu2OJ8dc":`복수하는 것`, "BnrL6bJDwmpkzZwV":`숨기는 것`,
"HzqOiYyr94R5Wesl":`파괴하는 것`, "wrVmOswOst3RcyUt":`돌려주는 것`, "e3xKMCPxZzPQj5zp":`차지하는 것`,
"GtbGCW6wVhttgXBR":`바꿔치기하는 것`, "RS1ODS82DQyBSBpt":`지키는 것`, "h1eHhgy2HXhcE3ta":`훔치는 것`, "GeOwetwPKjCsnKWs":`찾아내는 것` };

TD["The Quest - 5. a"] = `대상은`;
T["The Quest - 5. a"] = {
"XMORPAGIvCvbHSnt":`마법 유물`, "ziZk4KdutfTlRZZr":`집안의 가보`, "wRFjAswSIH5E088W":`검`,
"KEaxZuF98lisoUDf":`보물`, "Cms3iOtk2YJJWrkA":`장신구`, "VwhQOSuUThpby5R2":`반지`,
"h0Optm2Gf3HnxBT4":`돌`, "c4CHUvhxVFby5w59":`상자`, "hGjcHjmMYl0ZaNI0":`투구`,
"tpNlxV2un2YXRKm8":`책`, "ivTKlAcDl3tnOHVB":`마법서`, "Htd0jJH5QRjayqXx":`애완 짐승` };

TD["The Quest - 6. called"] = `그 이름은`;
T["The Quest - 6. called"] = {
"RBvfuKvkNuSSAE4X":`푸른 주라크.`, "AnrLVgHzZmFBVzwB":`칼만데르의 눈.`, "2YYMppJ0Ao4ZBazu":`실로드의 배신.`,
"cCMdROiiOM8aEaAG":`아르다나의 심장.`, "vDZs716DaBfzghnn":`길덴그립.`, "QjdFCFScZMNm5aJX":`밤눈.`,
"7yxnVTuX4aKoGCVd":`잿빛 형제.`, "23JiOYCwJyoIlDH3":`시라의 수수께끼.`, "vsd6xcBQswZXHbdE":`햘티의 왕관.`,
"XqPps1DtWzns9viD":`기만자.`, "OTpXWFefWdqtGU5p":`그린굴의 비밀.`, "H7pqf75r7XD0duFd":`바람을 길들이는 자.`,
"FY24DTFTapeUAszB":`헬록스의 숫돌.`, "zsLgawet1VbeDkqA":`슈톨첸크란츠.`, "P4rnIhZbwSMRP8aN":`겨울달.`,
"WmZNctnYc5QHA9CG":`성물의 재앙.`, "xBzk6ekdDTVgOFPm":`요멜쿠드.`, "0x5d7u20V8MKe616":`은빛 별.`,
"RtrvGqkIGfOXGxTs":`말코르의 분노.`, "ZCCV0EW2lvmjTSh5":`아이언사이드.` };

TD["The Adventure Site - 1. The way in is"] = `들어가는 길은`;
T["The Adventure Site - 1. The way in is"] = {
"2s8wbcMLvCHFF09c":`쉽다. 아무도 문을 잠그지 않았다.`, "FtF9cYwDIbaE73zn":`숨겨져 있어 찾기 어렵다.`,
"NAsclLqpqteWoTFU":`만만치 않다. 무언가가 여기 도사리고 있다.`, "q5AFmBeSkqvjLfLJ":`위험하다. 함정이 놓여 있다.` };

TD["The Adventure Site - 2. There is"] = `그곳에 있는 것은`;
T["The Adventure Site - 2. There is"] = {
"gprplA63WWyKB43Y":`물에 잠긴 방`, "c7aRHwVzECKBTCbY":`무너진 잔해로 막힌 길`, "eUiwfzc3L6r6cbyq":`어둠 속으로 굽이쳐 내려가는 계단`,
"foRj0bj9KQgvBzeL":`음침한 무덤`, "WR3TvnqOH7PlkJzo":`눈에 띄는 조각상`, "QN4ZxHt41CArCQoP":`기묘한 벽화` };

TD["The Adventure Site - 3. but also unexpected guests in the form of"] = `그리고 뜻밖의 손님으로는`;
T["The Adventure Site - 3. but also unexpected guests in the form of"] = {
"kbx7FSttMYLI6jTA":`고블린 [[/roll 2D8]]마리`, "4eucJGW6SfnOQohq":`모험가 [[/roll D6]]명`,
"d346UFk5cv1Bl3G7":`울프킨 [[/roll D6]]명`, "MgfIX5Z813CQclPP":`산적 [[/roll D8]]명`,
"xpphLoefSdKj97vO":`오크 [[/roll 2D6]]마리`, "Jtbqo5iJgMKHwhIL":`광신도 [[/roll D8]]명`,
"4bx6ylRBlwWNWXJR":`드워프 [[/roll D6]]명`, "Z51ENC9ziMDfn1l4":`엘프 [[/roll D4]]명` };

TD["The Adventure Site - 4. and"] = `그리고`;
T["The Adventure Site - 4. and"] = {
"B0h6cF1VtuLREdL4":`굶주린 거대 거미.`, "WN2XLjR4JkpexHN3":`호기심 많은 만티코어.`, "pLj1iXqIq0xVr3Zt":`성마른 거인.`,
"lHHoDVGuG6UWcUwB":`조롱하는 하피 [[/roll D6]]마리.`, "tbIRDaSgAeDLtLfN":`순찰하는 해골 [[/roll 2D6]]구.`,
"qoHUWpOSUj7atvxk":`알 수 없는 데몬.`, "ARG8mBUpvzdLljWO":`흡혈 박쥐 떼.`, "nAePQ6ikFOjbo19T":`잠들지 못한 유령.`,
"FJ4fJxLGNSBuSKLv":`성난 트롤.`, "mg97LUyaS25kxYBP":`거대한 미노타우로스.` };

TD["The Adventure Site - 5. There is a deadly challenge in the form of"] = `치명적인 시련으로는`;
T["The Adventure Site - 5. There is a deadly challenge in the form of"] = {
"0Ej42sOr7xXBCWtk":`함정문.`, "KZsR9y4HykT4WO5b":`강력한 독.`, "o0bZKKqH14J2ix8E":`무너지는 동굴.`,
"Qh7nskZ4G2cQKhow":`화살 함정.`, "cqqJsqYXHplsk5js":`까다로운 수수께끼.`, "LAKDyL9T3gtAJwRr":`반드시 풀어야 할 저주.`,
"jT9JkUGiSGgb4izB":`독가스 항아리.`, "zfXCPWziO3xF6QVH":`차오르는 물.`, "9uf5hduZsTtq0fUo":`거대한 바위.`,
"J1FP56JJUisFL5vM":`짓눌러 오는 벽.`, "HJjZloSwC9vsFcrv":`맹렬한 불길.`, "2stqsqBbCej5gCLD":`마법 거울.` };

TD["The Adventure Site - 6. Finally, the player characters must defeat"] = `마지막으로 플레이어 캐릭터들이 물리쳐야 할 것은`;
T["The Adventure Site - 6. Finally, the player characters must defeat"] = {
"mcLrLz1l1GClLdLb":`카잔 무르그 — 미쳐 버린 마법사.`, "gEzTEm7JdxWGEOK9":`파괴자 — 강대한 미노타우로스.`,
"1WMO2ociCQRlEKlH":`나딜라라 공주 — 끔찍한 망령.`, "0ptwu141f1dHmGTW":`붉은 주르구시 — 키 큰 오크 족장.`,
"aBQ3ur6L4Jh4MX5j":`밤발톱 — 사악한 엘프 전사.`, "xBIGE2nRwCbmOP8G":`프로슈 — 언데드 말라드 기사.`,
"Klo1YlWBAGHTrdPw":`빈지아 — 아주 오래된 유령.`, "9fIfZj7jlD6HmC4q":`부르고스 블러드투스 — 실성한 도적 왕.`,
"9zGFVuMhWn836917":`란야 블랙그립 — 교활한 고블린 두목.`, "cGIQ87rjOmpp5Nt2":`그린레그 — 악취 나는 트롤.`,
"z92ZFf5y0wPLaWu9":`라발 블루스태프 — 수수께끼의 마법사.`, "u7sqHh46alAd4Ruu":`크라그 브로드비어드 — 호전적인 드워프 전사.`,
"VR6UCOkS1fPBJ8tO":`벨소르 본브레이커 — 사악한 기사.`, "28DbOUPyrp2e4sch":`더럽히는 자 오르고그 — 성마른 거인.`,
"Wqwpoe95in6lARGa":`알레인 경 — 잔혹한 귀족.`, "7PW3cNbS7d9bZhGt":`골짜기의 휴고 — 배신한 기사.`,
"NfrxS2LO9yXzrJot":`핏빛 날개 — 살기 어린 그리핀.`, "DZemQQICcE7VPUNx":`가시 짐승 — 피에 굶주린 만티코어.`,
"gaERqCtcmwPbDERW":`학센플라우그르스텐 — 타락시키는 데몬.`, "FGMO47lUIbzgCz2H":`붉은 오를라우그르 — 탐욕스러운 드래곤.` };

fs.writeFileSync("tres_08.json", JSON.stringify({ results: T, descriptions: TD }, null, 1));
console.log("tres_08:", Object.keys(T).length, "표,", Object.values(T).reduce((s,o)=>s+Object.keys(o).length,0), "결과,", Object.keys(TD).length, "표설명");
