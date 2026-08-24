import fs from "fs";
const G = JSON.parse(fs.readFileSync("gapfields.json","utf8"));
const K = f => Object.keys(G[f]);
const O = { appearance:{}, weakness:{}, notes:{}, advDescription:{} };

const A = K("appearance");
O.appearance[A[0]] = `<p>키가 크고 깡마름. 길고 흰 수염과 덥수룩한 눈썹. 캐묻는 듯한 눈.</p>`;
O.appearance[A[1]] = `<p>흉터가 많고 깡마름. 벗에게는 충직한 눈길을, 적에게는 위협하는 눈길을 보냄. 옷을 잘 챙기고 향기로운 향수를 자주 씀.</p>`;
O.appearance[A[2]] = `<p>순진한 얼굴에, 빈틈없이 늘 살피는 눈. 발걸음이 가볍고 소리가 없음. 어떤 상황에서든 기회를 봄.</p>`;
O.appearance[A[3]] = `<p>힘세고 다부지고 고집스러움. 뒤뚱거리는 걸음걸이. 자극받으면 금세 화를 내며, 특히 누가 가문이나 명예를 욕할 때 그러함. 좀처럼 웃지 않음.</p>`;
O.appearance[A[4]] = `<p>매끄럽고 자신 있는 걸음걸이. 모두를 의심스레 살피는 맑은 눈. 생각과 행동이 재빠르고 열의가 있음.</p>`;

const W = K("weakness");
O.weakness[W[0]] = `<p>겁이 많음. 당신은 늘 일행의 맨 뒤에 있습니다.</p>`;
O.weakness[W[1]] = `<p>먹보. 당신은 맛있는 것을 먹을 기회라면 놓치지 않습니다.</p>`;
O.weakness[W[2]] = `<p>무모함. 당신은 뒷일을 생각하지 않고 늘 큰 위험을 감수합니다.</p>`;
O.weakness[W[3]] = `<p>객기. 당신은 늘 위험 속으로 앞장서 들어갑니다.</p>`;
O.weakness[W[4]] = `<p>편협함. 오크와 고블린 같은 밤의 종족은 악하며 맞서 싸워야 합니다.</p>`;

const N = K("notes");
O.notes[N[0]] = `<p>당신은 어릴 적부터 불에 홀려 있었습니다. 집안 농장의 곳간을 실수로 태워 버린 뒤, 주술사였던 어머니가 당신을 마법사 학교로 데려갔습니다. 학교에서 마법의 비밀을 배웠지만, 더 깊은 지식에 대한 갈증이 당신을 가만있지 못하게 했습니다. 이제 여러 해에 걸친 긴 여행 끝에, 당신은 안개 골짜기 원정에 나서는 모험가 일행에 합류했습니다.</p>`;
O.notes[N[1]] = `<p>당신은 일과 즐거움, 그리고 삶의 좋은 것들을 찾아 북쪽 황야에서 왔습니다. 동족의 부족 다툼에 지친 당신은 더 큰 무언가를 꿈꾸며 남쪽으로 떠났습니다. 그곳에서 용병과 검투사, 대상 호위, 파수병으로 일했고, 그러다 모험가 일행과 뭉쳤습니다. 이제 당신은 데몬과 몬스터, 강력한 적수에 대한 소문에 끌려 안개 골짜기로 향하고 있습니다.</p>`;
O.notes[N[2]] = `<p>서쪽 도시에서 자란 당신은 늘 엉뚱한 생각을 떠올리고 친구들에게 골목에서 점점 더 큰 위험을 감수하라고 부추겼습니다. 당신은 능숙한 소매치기가 되었고 나중에는 호화로운 저택을 털기 시작했습니다. 붙잡혀 감옥에 던져졌지만 얼마 지나지 않아 달아났습니다. 이제 당신은 도시를 멀리하며, 모험가 일행과 함께 늘 새로운 시련과 경험을 찾아다닙니다. 지금은 그 둘이 넉넉하다는 안개 골짜기로 향하는 길입니다.</p>`;
O.notes[N[3]] = `<p>당신은 동쪽으로 여러 날 가야 하는 곳에 자리 잡은 하프베이 남작의 막내아들입니다. 작위가 형(당신보다 못한 사람이지만)에게 넘어갈 것을 알고, 당신은 스스로를 들여다본 뒤 자기 길을 열기로 마음먹었습니다. 당신은 자기 이름과 명예를 매우 자랑스러워하며, 약한 이를 돕고 악한 자를 벌하는 임무를 받아들입니다. 이제 당신은 안개 골짜기의 보물 소문에 끌려 모험가 일행에 합류했습니다.</p>`;
O.notes[N[4]] = `<p>당신은 남쪽의 열대림에서 자라며 늘 모험을 찾았지만, 절제와 성찰을 바라는 집안의 기대에 눌려 있기도 했습니다. 트롤이 마을을 습격해 동족을 여럿 죽인 뒤, 당신은 자기만의 새 앞날을 찾기로 마음먹었습니다. 아직 운명을 찾는 중이지만, 당신은 떠도는 것 자체가 자기 목표라는 결론에 이르렀습니다. 동료 모험가들과 함께 당신은 안개 골짜기가 무엇을 품고 있는지 보러 그곳으로 왔습니다.</p>`;

const AD = K("advDescription");
const boiler = body => `<img style="display:block;margin:auto;border:0px solid transparent" src="systems/dragonbane/art/ui/logo-en.webp" /><p>${body}</p><p>기존에 있던 같은 내용은 덮어써집니다!</p><p>기존 내용의 소유권 설정을 유지하려면 게임 설정 &gt; 설정 구성으로 가서 해당 체크박스를 켜세요.</p><p></p><hr /><p style="font-size:smaller">이 출판물의 어떤 부분도 발행인의 사전 서면 허락 없이 복사, 녹음, 그 밖의 전자적·기계적 방법을 포함한 어떠한 형태나 수단으로도 복제·배포·전송할 수 없습니다.</p><p>Dragonbane은 Fria Ligan AB의 등록 상표입니다.</p><p>©2023 Fria Ligan AB</p><hr /><p>발행: <a href="http://freeleaguepublishing.com/">Fria Ligan AB</a></p><p>Foundry VTT 판: <a href="http://patrikp.com/">Patrik Påfvelsson (PatrikP)</a></p><p><a href="mailto:info@frialigan.se">info@frialigan.se</a></p>`;
O.advDescription[AD[0]] = boiler("어드벤처 책의 모든 내용을 당신의 월드로 가져옵니다.");
O.advDescription[AD[1]] = boiler("규칙서의 모든 내용을 당신의 월드로 가져옵니다.");
O.advDescription[AD[2]] = boiler("솔로 어드벤처 책을 당신의 월드로 가져옵니다.");

for (const [f, m] of Object.entries(O)) {
  const need = K(f).length;
  if (Object.keys(m).length !== need) { console.error(`${f}: ${Object.keys(m).length}/${need} 미완성`); process.exit(1); }
}
fs.writeFileSync("gap_hand.json", JSON.stringify(O, null, 1));
console.log("gap_hand:", Object.entries(O).map(([f,m])=>`${f} ${Object.keys(m).length}`).join(" / "));
