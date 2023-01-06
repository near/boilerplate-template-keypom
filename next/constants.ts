export const CONTRACT_NAME =
  process.env.NEXT_PUBLIC_CONTRACT_NAME || "beta.keypom.testnet";
export const NFT_CONTRACT_NAME =
  process.env.NEXT_PUBLIC_NFT_CONTRACT_NAME || "keypom-beta-nfts.testnet";
export const NETWORK =
  process.env.NEXT_PUBLIC_NEAR_NETWORK === "mainnet" ? "mainnet" : "testnet";
