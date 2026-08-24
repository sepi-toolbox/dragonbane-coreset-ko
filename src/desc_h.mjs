import fs from "fs";
const D = {};
D["Books"] = `<p>특정 분야의 기술 굴림에 이점. 값은 분야에 따라 다릅니다.</p>`;
D["Fiendbreaker"] = `<p>데몬에게 [[/damage D6]] 추가.</p>`;
// "Dagger"는 일반 무기명과 겹치므로 _id로 분리 (레아나라 / 안나벨라의 독 바른 대거)
D["MNxR1jVfMK6cjKVz"] = `<p>효력 14의 치명적인 독.</p>`;
fs.writeFileSync("desc_h.json", JSON.stringify(D, null, 1));
console.log("desc_h:", Object.keys(D).length, "항목");
