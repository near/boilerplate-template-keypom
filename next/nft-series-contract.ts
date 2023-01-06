import { WalletSelector } from "@near-wallet-selector/core";
import { NFT_CONTRACT_NAME } from "./constants";
import { callMethod } from "./contract";

// In order to create a series on this contract, you will need to be an approved creator.
export const createSeries = async (
  walletSelector: WalletSelector,
  accountId: string,
  {
    mint_id,
    nft: { media, id, copies },
  }: { mint_id: string; nft: { media: string; id: string; copies: number } }
) => {
  await callMethod(walletSelector, accountId, {
    contractId: NFT_CONTRACT_NAME,
    method: "create_series",
    args: {
      mint_id,
      metadata: JSON.stringify({ media, id, copies }),
    },
  });
};
