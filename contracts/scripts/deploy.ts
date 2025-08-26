import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const C = await ethers.getContractFactory("HackHubPOAP");
  const c = await C.deploy(deployer.address);
  await c.waitForDeployment();
  console.log("HackHubPOAP deployed at", await c.getAddress());
}
main().catch((e) => { console.error(e); process.exit(1); });
