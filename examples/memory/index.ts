import { CoreMMR } from "@merkle-mountain-range/core";
import { MMRInMemoryStore } from "@merkle-mountain-range/memory";
import { StarkPedersenHasher } from "@merkle-mountain-range/hashes";

async function main() {
  const mmr = new CoreMMR(new MMRInMemoryStore(), new StarkPedersenHasher());

  await mmr.append("1");
  //assert root = 1096725095163354219926720901079039062801431726264604829411571423717521670390

  await mmr.append("2");
  // assert root = 2934711332003820134178390936707122077693345005998397955188424773991149469919

  await mmr.append("4");
  // assert root = 2338665261873584148214998711191965128560804356449112149843174774656766585452

  await mmr.append("5");
  // assert root = 2708224031319671063484437464908004710720131812492877208401188522714139536142

  await mmr.append("8");
  // assert root = 1196919025900163919491389236642161603901623420784499802787384135183895412791

  const peaks = await mmr.bagThePeaks();
  console.log("Root hash:", peaks);

  // assert proof = [
  // 1180550645873507273865212362837104046225859416703538577277065670066180087996,
  // 3586066148941244556821251804839242251579954649417526841390116695870742356609
  // ]
  const proof1 = await mmr.getProof(1);
  await mmr.verifyProof(1, "1", proof1);

  // assert proof = [
  // 1321142004022994845681377299801403567378503530250467610343381590909832171180,
  // 3586066148941244556821251804839242251579954649417526841390116695870742356609
  // ]
  const proof2 = await mmr.getProof(2);
  await mmr.verifyProof(2, "2", proof2);

  // assert proof = [
  // 3125779721945763288433380755626503099347902113189413000518025153445630158401,
  // 2372217121403976151604071022404115607927308803624051358707607656374683351595
  // ]
  const proof3 = await mmr.getProof(4);
  await mmr.verifyProof(4, "4", proof3);

  // assert proof = [
  // 1484044891644535909221789528912343377988032083750620401102632587429863384003,
  // 2372217121403976151604071022404115607927308803624051358707607656374683351595
  // ]
  const proof4 = await mmr.getProof(5);
  console.log("Proof 5:", proof4, "is valid", await mmr.verifyProof(5, "5", proof4));

  // assert proof = []
  const proof5 = await mmr.getProof(8);
  console.log("Proof 8:", proof5, "is valid", await mmr.verifyProof(8, "8", proof5));
}

main();
