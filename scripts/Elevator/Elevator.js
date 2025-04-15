const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  const Elevator = await hre.ethers.getContractFactory("Elevator");
  const elevator = await Elevator.deploy();
  await elevator.deployed();

  const Attack = await hre.ethers.getContractFactory("AttackElevator");
  const attack = await Attack.deploy();
  await attack.deployed();

  await attack.attack(elevator.address);
  console.log(await elevator.top() == true);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
