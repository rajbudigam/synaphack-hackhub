import { ethers } from "ethers";

const RPC_URL = process.env.BASE_SEPOLIA_RPC_URL!;   // e.g. Alchemy/Infura RPC
const PK = process.env.POAP_MINTER_PRIVATE_KEY!;     // a hot wallet key (server-only, Vercel env)
const CONTRACT = process.env.POAP_CONTRACT_ADDRESS!; // deployed address

const ABI = [
  "function mintTo(address to, string tokenURI) external returns (uint256)",
];

export function getPOAP() {
  const provider = new ethers.JsonRpcProvider(RPC_URL, 84532); // Base Sepolia CHAIN ID 84532
  const signer = new ethers.Wallet(PK, provider);
  const contract = new ethers.Contract(CONTRACT, ABI, signer);
  return { contract, signer, provider };
}
