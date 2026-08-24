import fs from "fs";
const D = {};
const COOK = `@UUID[JournalEntry.NVNCLs3ZE3Xttqk0.JournalEntryPage.xVgoGJxj0cnTCD9B#food-in-the-wilderness]{요리해야}`;

/* 동물 */
D["Chicken"] = `<p>잡으면 식량 1회분이 나옵니다. 고기는 ${COOK} 합니다.</p>`;
D["Combat Trained Horse"] = `<p>기수 한 명과 무게 10단위, 또는 기수 두 명을 태울 수 있습니다.</p>`;
D["Cow"] = `<p>하루에 식량 D4회분(젖)이 나오고, 잡으면 식량 2D10회분이 나옵니다. 고기는 ${COOK} 합니다.</p>`;
D["Donkey"] = `<p>무게 10단위를 실을 수 있습니다. 탈 수는 없습니다.</p>`;
D["Guard Dog"] = `<p>주인을 지킵니다. 능력치는 @UUID[Actor.6zxQn1F3zEFADZAL]{개}를 참고하세요.</p>`;
D["Homing Pigeon in Cage"] = `<p>풀어 주면 어디에 있든 자기 비둘기집으로 날아갑니다</p>`;
D["Pig"] = `<p>잡으면 식량 2D6회분이 나옵니다. 고기는 ${COOK} 합니다.</p>`;
D["Riding Horse"] = `<p>기수 한 명과 무게 10단위, 또는 기수 두 명을 태울 수 있습니다</p>`;
D["Sheep"] = `<p>잡으면 식량 2D4회분이 나옵니다. 고기는 ${COOK} 합니다.</p>`;

/* 의복 */
D["Boots"] = `<p>일부 여정 사고를 막아 줍니다.</p>`;
D["Cloak"] = `<p>일부 여정 사고를 막아 줍니다.</p>`;
D["Fine Garments"] = `<p>GM이 합당하다고 볼 때 매력 기반 기술에 이점.</p>`;
D["Fur"] = `<p>추위를 견디는 야외 생활 굴림에 이점.</p>`;
D["Rags"] = `<p>GM이 합당하다고 볼 때 매력 기반 기술에 불리점.</p>`;
D["Simple Clothes"] = `<p>매력 기반 기술에 불리점을 받지 않으려면 필요합니다.</p>`;

/* 용기 */
D["Backpack"] = `<p>운반 능력이 2 늘어납니다. 한 사람이 한 번에 배낭 하나만 쓸 수 있습니다.</p>`;
D["Barrel"] = `<p>무게 15단위까지 담습니다. 피해 10점까지 견디며, 방어도 3.</p>`;
D["Basket"] = `<p>무게 10단위까지 담습니다.</p>`;
D["Bottle"] = `<p>액체 1단위가 들어갑니다.</p>`;
D["Bucket"] = `<p>액체 5단위까지 들어갑니다.</p>`;
D["Chest"] = `<p>무게 20단위까지 담습니다. 피해 25점까지 견디며, 방어도 5.</p>`;
D["Clay Jug"] = `<p>액체 1단위가 들어갑니다</p>`;
D["Saddle Bag"] = `<p>동물의 운반 능력이 2 늘어납니다. 동물 한 마리에 안장 가방은 두 개까지만 실을 수 있습니다.</p>`;

/* 사냥과 낚시 */
D["Bear Trap"] = `<p>사냥에 쓸 수 있습니다.</p>`;
D["Fishing Net"] = `<p>낚시할 때 식량 D6회분을 얻습니다.</p>`;
D["Fishing Rod"] = `<p>낚시할 때 식량 D4회분을 얻습니다.</p>`;
D["Snare"] = `<p>사냥에 쓸 수 있습니다. 한 번만 쓸 수 있습니다.</p>`;

/* 광원 */
D["Flint & Tinder"] = `<p>횃불, 양초, 랜턴에 불을 붙이거나 모닥불을 피우는 데 필요합니다.</p>`;
D["Lamp Oil"] = `<p>열 회분이 들어 있습니다. 한 회분으로 기름 등잔이나 랜턴이 최대 1시프트 동안 탑니다.</p>`;
D["Lantern"] = `<p>반경 10미터를 밝힙니다. 최대 1시프트 동안 타지만, 1스트레치가 지날 때마다 D8을 굴리세요. 1이 나오면 랜턴이 꺼지며, 기름을 채우고 다시 불을 붙여야 합니다(행동).</p>`;
D["Oil Lamp"] = `<p>반경 10미터를 밝힙니다. 최대 1시프트 동안 타지만, 1스트레치가 지날 때마다 D6을 굴리세요. 1이 나오면 등잔이 꺼지며, 기름을 채우고 다시 불을 붙여야 합니다(행동).</p>`;
D["Tallow Candle"] = `<p>반경 4미터를 밝힙니다. 최대 1시프트 동안 타지만, 1스트레치가 지날 때마다, 또는 지닌 사람이 공격하거나 공격받을 때마다 D4를 굴리세요. 1이 나오면 양초가 꺼집니다.</p>`;

/* 이동 수단 */
D["Canoe"] = `<p>두 사람과 무게 10단위를 실을 수 있습니다.</p>`;
D["Cart"] = `<p>말이나 당나귀 한 마리가 끕니다. 두 사람과 무게 50단위를 실을 수 있습니다.</p>`;
D["Rowing Boat"] = `<p>네 사람과 무게 50단위를 실을 수 있습니다</p>`;
D["Sailing Boat"] = `<p>여섯 사람과 무게 100단위를 실을 수 있습니다</p>`;
D["Wagon"] = `<p>말이나 당나귀 두 마리가 끕니다. 네 사람과 무게 100단위를 실을 수 있습니다.</p>`;

/* 의약품 */
D["Bandages (10)"] = `<p>목숨을 구하는 치료 굴림에 불리점을 받지 않으려면 필요합니다. 시도할 때마다 붕대를 하나 씁니다.</p>`;
D["Healing Potion (dose)"] = `<p>HP를 즉시 2D6점 회복합니다. 더 강한 물약은 HP를 더 회복시키지만 값이 비쌉니다.</p>`;
D["Herbal Concoction (dose)"] = `<p>질병에 저항하는 치료 굴림에 이점.</p>`;
D["Lethal Poison (dose)"] = `<p>@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.6WPxPxUjh4W80RNy#lethal-poison]{치명적인 독}을 참고하세요.</p>`;
D["Paralyzing Poison (dose)"] = `<p>@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.6WPxPxUjh4W80RNy#paralyzing-poison]{마비독}을 참고하세요.</p>`;
D["Sleeping Poison (dose)"] = `<p>@UUID[JournalEntry.SbbSMsuvWeo3HaID.JournalEntryPage.6WPxPxUjh4W80RNy#sleeping-poison]{수면독}을 참고하세요.</p>`;
D["Surgical Instruments"] = `<p>목숨을 구하는 치료 굴림에 이점.</p>`;

/* 기념품 */
D["A bracelet"] = `<p>집안 대대로 물려받은 팔찌.</p>`;
D["A copper coin"] = `<p>어머니나 아버지가 좇던 보물에서 나온 동전 한 닢.</p>`;
D["A couple of bone dice"] = `<p>뼈로 만든 소박한 주사위 몇 개.</p>`;
D["A fang"] = `<p>짐승에게서 전리품으로 얻은 송곳니</p>`;
D["A map"] = `<p>물려받은 손그림 지도.</p>`;
D["A horn"] = `<p>몬스터에게서 전리품으로 얻은 뿔.</p>`;
D["A letter"] = `<p>오랜 친구나 친척이 보낸 편지</p>`;
D["A locket"] = `<p>머리카락 한 줌이 든 로켓</p>`;
D["A wooden figurine"] = `<p>어릴 적에 받은 나무 조각상</p>`;
D["A ragged old hat"] = `<p>어머니나 아버지의 너덜너덜한 낡은 모자</p>`;

/* 악기 */
D["Bagpipe"] = `<p>악사 능력의 WP 비용을 1로 줄이고 범위를 50미터로 늘립니다.</p>`;
D["Drum"] = `<p>악사 능력의 범위를 20미터로 늘립니다.</p>`;
D["Flute"] = `<p>악사 능력의 WP 비용을 2로 줄입니다.</p>`;
D["Harp"] = `<p>악사 능력의 WP 비용을 1로 줄입니다.</p>`;
D["Horn"] = `<p>악사 능력의 범위를 100미터로 늘립니다.</p>`;
D["Lyre"] = `<p>악사 능력의 WP 비용을 1로 줄입니다.</p>`;

/* 서비스 */
D["Bath at an Inn"] = `<p>1스트레치 만에 원하는 상태 하나를 회복합니다. 하루에 한 번 목욕할 때만 이 효과가 있습니다.</p>`;
D["Bodyguard"] = `<p>능력치는 일반 @UUID[Actor.c6ngJuHkGiVMJ3AQ]{경비병}과 같습니다.</p>`;
D["Bowl of Stew"] = `<p>하루치 식량을 채웁니다.</p>`;
D["Clothes Repair"] = `<p>해진 옷의 효과를 없앱니다.</p>`;
D["Courier"] = `<p>받는 사람에게 전언을 전달합니다.</p>`;
D["Feast"] = `<p>하루치 식량을 채웁니다.</p>`;
D["Goblet of Wine"] = `<p>한 시프트 안에 두 잔을 마신 뒤로는 한 잔 더 마실 때마다 원하는 상태를 하나 받습니다.</p>`;
D["Haircut"] = `<p>1스트레치 만에 고른 상태 하나를 회복합니다. 일주일에 한 번만 할 수 있습니다.</p>`;
D["Healing"] = `<p>치료 굴림에 자동으로 성공합니다.</p>`;
D["Lodging at Inn, Dormitory"] = `<p>야외 생활 굴림 없이 시프트 휴식을 취할 수 있지만, 시프트마다 D4를 굴리세요. 1이 나오면 누군가의 코 고는 소리에 같은 방의 다른 사람이 모두 잠들지 못합니다.</p>`;
D["Lodging at Inn, Luxury Suite"] = `<p>야외 생활 굴림 없이 시프트 휴식을 취할 수 있습니다.</p>`;
D["Lodging at Inn, Separate Room"] = `<p>야외 생활 굴림 없이 시프트 휴식을 취할 수 있습니다.</p>`;
D["Meal at an Inn"] = `<p>하루치 식량을 채웁니다.</p>`;
D["Road Toll"] = `<p>통행을 허락받습니다.</p>`;
D["Stagecoach"] = `<p>정해진 목적지까지 태워다 줍니다.</p>`;
D["Tankard of Mead"] = `<p>한 시프트 안에 세 잔을 마신 뒤로는 한 잔 더 마실 때마다 원하는 상태를 하나 받습니다.</p>`;
D["Teacher"] = `<p>1시프트 동안 가르침을 받으면 @UUID[JournalEntry.17jatv6QqDKgsEU1.JournalEntryPage.8oP09yp6neygtjVn]{성장 굴림}을 한 번 더 할 수 있습니다.</p>`;

/* 학문과 마법 */
D["Amulet"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Book"] = `<p>특정 분야의 기술 굴림에 이점. 값은 분야에 따라 다릅니다.</p>`;
D["Brooch"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Chalk"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Grimoire"] = `<p>값은 내용에 따라 다르며 훨씬 비쌀 수도 있습니다.</p>`;
D["Hourglass"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Notebook"] = `<p>비어 있으며, 마법서로 쓸 수 있습니다.</p>`;
D["Orbuculum"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Paper (sheet)"] = `<p>주문을 적어 두는 데 쓸 수 있습니다.</p>`;
D["Parchment (sheet)"] = `<p>주문을 적어 두는 데 쓸 수 있습니다.</p>`;
D["Quill & Ink"] = `<p>주문을 적어 두는 데 쓸 수 있습니다.</p>`;
D["Reliquary"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;
D["Wand"] = `<p>주문의 매개체로 쓸 수 있습니다.</p>`;

/* 도구 */
D["Blacksmithing Tools"] = `<p>제작에 씁니다.</p>`;
D["Carpentry Tools"] = `<p>제작에 씁니다.</p>`;
D["Crowbar"] = `<p>문이나 벽에 2D6의 피해. 손상될 위험이 없으며 자동으로 명중합니다.</p>`;
D["Hammer"] = `<p>문이나 벽에 2D4의 피해. 손상될 위험이 없으며 자동으로 명중합니다.</p>`;
D["Needle & Thread"] = `<p>제작을 굴려 옷을 꿰맵니다.</p>`;
D["Pickaxe"] = `<p>문이나 벽에 2D8의 피해. 손상될 위험이 없으며 자동으로 명중합니다.</p>`;
D["Saw"] = `<p>1스트레치 만에 금속이나 나무를 잘라 냅니다.</p>`;
D["Shovel"] = `<p>땅을 파는 시간이 절반으로 줄어듭니다.</p>`;
D["Sledgehammer"] = `<p>문이나 벽에 2D10의 피해. 손상될 위험이 없으며 자동으로 명중합니다.</p>`;
D["Tanning Tools"] = `<p>제작에 씁니다.</p>`;

/* 교역품 */
D["Abacus"] = `<p>셈 문제를 푸는 지능 굴림에 이점.</p>`;
D["Blanket"] = `<p>추위의 영향을 피하는 굴림에 불리점을 받지 않으려면 필요합니다.</p>`;
D["Chess Set"] = `<p>지능 대항 굴림으로 승패를 가립니다.</p>`;
D["Dice"] = `<p>운으로 승패를 가립니다.</p>`;
D["Field Kitchen"] = `<p>요리하는 야외 생활 굴림에 이점.</p>`;
D["Field Ration"] = `<p>하루에 한 회분을 먹어야 하며, 그러지 않으면 굶주리게 됩니다.</p>`;
D["Grappling Hook"] = `<p>밧줄을 고정하는 데 쓸 수 있습니다. 곡예를 굴려 힘 수치만큼(미터) 던져 걸 수 있습니다(불리점을 받으면 힘 × 2).</p>`;
D["Lockpicks (Advanced)"] = `<p>자물쇠를 따는 손재주 굴림에 이점.</p>`;
D["Lockpicks (Simple)"] = `<p>자물쇠를 따는 손재주 굴림에 불리점을 받지 않으려면 필요합니다.</p>`;
D["Magnifying Glass"] = `<p>숨은 것 찾기 굴림에 이점.</p>`;
D["Map"] = `<p>여정에서 길을 이끄는 야외 생활 굴림에 불리점을 받지 않으려면 필요합니다.</p>`;
D["Marbles"] = `<p>행동으로, 10미터 안의 인간형 적에게 던질 수 있습니다. 그 적은 다음 차례에 움직이려면 회피를 굴려야 합니다(행동이 아닙니다).</p>`;
D["Padlock"] = `<p>문이나 궤짝을 잠급니다. 피해 20점까지 견디며, 방어도 5.</p>`;
D["Perfume (10 doses)"] = `<p>GM이 합당하다고 볼 때 매력 기반 기술 굴림에 이점.</p>`;
D["Playing Cards"] = `<p>허풍 대항 굴림으로 승패를 가립니다.</p>`;
D["Quiver of Arrows (Iron Head)"] = `<p>활이나 석궁을 쏘려면 필요합니다.</p>`;
D["Quiver of Arrows (Wooden Head)"] = `<p>활이나 석궁을 쏘려면 필요합니다. 갑옷의 효과가 두 배가 됩니다.</p>`;
D["Rope (Hemp, 10 meters)"] = `<p>기어오르는 곡예 굴림에 이점을 주지만, 밧줄을 어딘가에 고정해야 합니다.</p>`;
D["Rope (Silk, 10 meters)"] = `<p>기어오르는 곡예 굴림에 이점을 주지만, 밧줄을 어딘가에 고정해야 합니다.</p>`;
D["Saddle"] = `<p>말 위에서 싸울 때 불리점을 받지 않으려면 필요합니다.</p>`;
D["Sleeping Fur"] = `<p>야영을 준비하는 야외 생활 굴림에 불리점을 받지 않으려면 필요합니다.</p>`;
D["Spyglass"] = `<p>여정에서 길을 이끄는 야외 생활 굴림에 이점.</p>`;
D["Large Tent"] = `<p>여섯 사람까지 들어갑니다. 야영을 준비하는 야외 생활 굴림에 이점을 줍니다. 한 사람만 굴리되, 다른 사람이 도울 수 있습니다.</p>`;
D["Small Tent"] = `<p>두 사람까지 들어갑니다. 야영을 준비하는 야외 생활 굴림에 이점을 줍니다. 한 사람만 굴리되, 다른 사람이 도울 수 있습니다.</p>`;
D["Whistle"] = `<p>100미터 밖에서도 들립니다.</p>`;
D["Gemstone"] = `<p>[[/roll D6]]을 굴리세요</p><ol><li><p>유리 (동화 2 가치)</p></li><li><p>수정 (은화 10 가치)</p></li><li><p>에메랄드 (금화 10 가치)</p></li><li><p>사파이어 (금화 15 가치)</p></li><li><p>루비 (금화 25 가치)</p></li><li><p>다이아몬드 (금화 100 가치)</p></li></ol>`;

fs.writeFileSync("desc_e.json", JSON.stringify(D, null, 1));
console.log("desc_e:", Object.keys(D).length, "항목");
