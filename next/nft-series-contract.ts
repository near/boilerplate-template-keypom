import { WalletSelector } from "@near-wallet-selector/core";
import { NFT_CONTRACT_NAME } from "./constants";
import { callMethod } from "./contract";

// In order to create a series on this contract, you will need to be an approved creator.
export const createSeries = async (
  walletSelector: WalletSelector,
  accountId: string,
  {
    mint_id,
    nft: { media, copies },
  }: { mint_id: number; nft: { media: string; copies: number } }
) => {
  return await callMethod(walletSelector, accountId, {
    contractId: NFT_CONTRACT_NAME,
    method: "create_series",
    args: {
      mint_id,
      metadata: { media, copies },
    },
    deposit: "20000000000000000000000",
  });
};
