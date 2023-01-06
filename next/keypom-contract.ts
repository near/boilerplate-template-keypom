import { WalletSelector } from "@near-wallet-selector/core";
import { CONTRACT_NAME } from "./constants";
import { callMethod, viewMethod } from "./contract";

export const getDrops = async (
  walletSelector: WalletSelector,
  accountId: string
) => {
  return await viewMethod(walletSelector, {
    contractId: CONTRACT_NAME,
    method: "get_drops_for_owner",
    args: { account_id: accountId },
  });
};

type CreateDrop = {
  drop: {
    keys: string[];
    initialDeposit: string;
  };
  nft: {
    media: string;
    id: string;
    copies: number;
  };
};

export const createDrop = async (
  walletSelector: WalletSelector,
  accountId: string,
  drop: CreateDrop
) => {
  const {
    drop: { keys, initialDeposit },
    nft: { media, id, copies },
  } = drop;
  return await callMethod(walletSelector, accountId, {
    contractId: CONTRACT_NAME,
    method: "create_drop",
    deposit: estimateDeposit({
      media,
      copies,
      linkCount: keys.length,
      initialDeposit,
    }),
    args: {
      public_keys: keys,
      // How much NEAR should a claimed account start with.
      deposit_per_use: "20000000000000000000000", // 0.02 NEAR
      metadata: JSON.stringify({ media, id, copies }),
      config: {
        uses_per_key: 1,
        usage: {
          refund_deposit: true,
        },
      },
      fc: {
        methods: [
          [
            {
              account_id_field: "receiver_id",
              drop_id_field: "mint_id",
              receiver_id: "keypom-beta-nfts.testnet",
              method_name: "nft_mint",
              args: "",
              // How much NEAR to attach to this function call.
              attached_deposit: initialDeposit, // '20000000000000000000000', // 0.02 NEAR
            },
          ],
        ],
      },
    },
  });
};

function estimateDeposit({
  media,
  copies,
  linkCount,
  initialDeposit,
}: {
  media: string;
  copies: number;
  linkCount: number;
  initialDeposit: string;
}) {
  let dropStorageCost;
  if (media.length <= 250 && copies < 100000) {
    dropStorageCost = 10000000000000000000000n; // 0.01 NEAR
  } else {
    // You can choose to add more estimated deposit values here for larger drops.
    throw Error("Failed to estimate deposit");
  }

  const linksCost = BigInt(linkCount) * BigInt(initialDeposit);

  return (dropStorageCost + linksCost).toString();
}
