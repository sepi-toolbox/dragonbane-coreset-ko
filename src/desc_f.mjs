import fs from "fs";
const D = {};
// 원문 오타 "Usae" → 의미상 "Use". 번역은 정상 문장으로.
D["Power Attack!"] = `<p>와이트가 <strong>강타!</strong>를 쓸 때는 이 버전의 무기를 사용하세요.</p>`;
D["Bite"] = `<p></p><p></p>`;
D["Worn diary"] = `<p>당신의 경험과 발견으로 가득 찬 닳은 일기장.</p>`;
D["A treasure map"] = `<p>당신이 "주운" 보물 지도.</p>`;
D["A fine pipe"] = `<p>검은 뿔로 만든 고급 담뱃대(아버지에게 받은 선물).</p>`;
D["Fang from a troll"] = `<p>당신의 누이를 죽인 트롤에게서 얻은 송곳니.</p>`;
fs.writeFileSync("desc_f.json", JSON.stringify(D, null, 1));
console.log("desc_f:", Object.keys(D).length, "항목");
