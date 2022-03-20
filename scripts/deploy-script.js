const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  const fallback = await Fallback.deploy();

  await fallback.deployed();

  console.log("fallback deployed to:", fallback.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
