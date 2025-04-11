const hre = require("hardhat");

async function main() {
  const [ownerDeployer, hacker] = await hre.ethers.getSigners();

  const Vault = await hre.ethers.getContractFactory("Vault");

  const passwordBytes32 = ethers.utils.formatBytes32String("the password !");

  const vault = await Vault.deploy(passwordBytes32);
  await vault.deployed();

  const provider = hre.ethers.provider;
  const passwordSlot = 1; // Slot où `password` est stocké
  const storedPassword = await provider.getStorageAt(vault.address, passwordSlot);
  console.log("Password (bytes32):", storedPassword);
  const decodedPassword = ethers.utils.parseBytes32String(storedPassword);
  console.log("Password (string):", decodedPassword);

  await vault.unlock(storedPassword)
  console.log(await vault.locked() == false)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
