import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_URL = process.env.ALCHEMY_BASE_SEPOLIA_URL!; // e.g. https://base-sepolia.g.alchemy.com/v2/KEY
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY!;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    baseSepolia: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
export default config;
