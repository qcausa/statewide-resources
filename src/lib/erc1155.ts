// lib/erc1155.ts

import { createPublicClient, http } from "viem";

import { mainnet } from "viem/chains";

// Create a public client (adjust the chain & transport as needed)
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(), // You can also provide a custom RPC URL, e.g., http('https://rpc.ankr.com/eth')
});

// Minimal ABI fragment for an ERC-1155 token – only the balanceOf function
export const ERC1155_ABI = [
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// Function to check if a wallet has at least one of the target ERC-1155 token
export async function hasERC1155Token(
  account: `0x${string}`,
  contractAddress: `0x${string}`,
  tokenId: number | bigint,
): Promise<boolean> {
  try {
    const balance = (await publicClient.readContract({
      address: contractAddress,
      abi: ERC1155_ABI,
      functionName: "balanceOf",
      args: [account, tokenId],
    })) as bigint;
    // Return true if balance is greater than zero
    return balance > 0n;
  } catch (error) {
    console.error("Error reading token balance:", error);
    return false;
  }
}
