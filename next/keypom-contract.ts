import { WalletSelector } from "@near-wallet-selector/core";
import { CONTRACT_NAME, NFT_CONTRACT_NAME } from "./constants";
import { callMethod, viewMethod } from "./contract";

const FUNC_CALL_ATTACHED_DEPOSIT = "1000000000000000000000";

export const getDropInfo = async (
  walletSelector: WalletSelector,
  drop_id: string
) => {
  const response = await viewMethod(walletSelector, {
    contractId: CONTRACT_NAME,
    method: "get_drop_information",
    args: { drop_id },
  });
  console.log("DROP", response);
  return response;
};

export const getDrops = async (
  walletSelector: WalletSelector,
  accountId: string
) => {
  const response = await viewMethod(walletSelector, {
    contractId: CONTRACT_NAME,
    method: "get_drops_for_owner",
    args: { account_id: accountId },
  });
  console.log("DROPS", response);
  return response;
};

type CreateDrop = {
  drop: {
    dropId?: string;
    keys: string[];
    initialDeposit: string;
  };
};

export const createDrop = async (
  walletSelector: WalletSelector,
  accountId: string,
  drop: CreateDrop
) => {
  const {
    drop: { dropId, keys, initialDeposit },
  } = drop;
  return await callMethod(walletSelector, accountId, {
    contractId: CONTRACT_NAME,
    method: "create_drop",
    deposit: estimateDeposit({
      linkCount: keys.length,
      initialDeposit,
    }),
    args: {
      drop_id: dropId,
      public_keys: keys,
      // How much NEAR should a claimed account start with.
      deposit_per_use: initialDeposit,
      // Add whatever metadata you'd like for your drop.
      // metadata: JSON.stringify({ pagodaTemplate: true }),
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
              receiver_id: NFT_CONTRACT_NAME,
              method_name: "nft_mint",
              args: "",
              attached_deposit: FUNC_CALL_ATTACHED_DEPOSIT,
            },
          ],
        ],
      },
    },
  });
};

// Estimates the amount of deposit necessary to fund your keypom account and generate lazy minted NFTs.
function estimateDeposit({
  linkCount,
  initialDeposit,
}: {
  linkCount: number;
  initialDeposit: string;
}) {
  const dropStorageCost = BigInt(linkCount) * 9000000000000000000000n;
  const linksCost = BigInt(linkCount) * BigInt(initialDeposit);
  const functionCallDeposit =
    BigInt(linkCount) * BigInt(FUNC_CALL_ATTACHED_DEPOSIT);
  const accessKeyStorage = BigInt(linkCount) * 1000000000000000000000n;
  const gasCost = BigInt(linkCount) * 18762600000000000000000n;

  return (
    dropStorageCost +
    gasCost +
    linksCost +
    functionCallDeposit +
    accessKeyStorage
  ).toString();
}
