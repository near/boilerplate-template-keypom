import { WalletSelector } from '@near-wallet-selector/core';
import { CONTRACT_NAME, NFT_CONTRACT_NAME } from '../constants';
import { callMethod, viewMethod } from './contract';
import { Drop } from './types';

const FUNC_CALL_ATTACHED_DEPOSIT = '10000000000000000000000'; // 0.01 N

export const getDropInfo = async (walletSelector: WalletSelector, drop_id: string) => {
  const response = await viewMethod(walletSelector, {
    contractId: CONTRACT_NAME,
    method: 'get_drop_information',
    args: { drop_id },
  });
  console.log('DROP', response);
  return response as Drop;
};

export const getDrops = async (walletSelector: WalletSelector, accountId: string) => {
  const response = await viewMethod(walletSelector, {
    contractId: CONTRACT_NAME,
    method: 'get_drops_for_owner',
    args: { account_id: accountId },
  });
  console.log('DROPS', response);
  return response as Drop[];
};

export const deleteDrop = async (walletSelector: WalletSelector, accountId: string, dropId: string) => {
  await callMethod(walletSelector, accountId, {
    contractId: CONTRACT_NAME,
    method: 'delete_keys',
    args: { drop_id: dropId },
    // It can take 200+ GAS to delete up to 100 links
    gas: '300000000000000',
  });
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
  drop: CreateDrop,
  metadata: any,
) => {
  const {
    drop: { dropId, keys, initialDeposit },
  } = drop;
  return await callMethod(walletSelector, accountId, {
    contractId: CONTRACT_NAME,
    method: 'create_drop',
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
      metadata: JSON.stringify(metadata),
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
              account_id_field: 'receiver_id',
              drop_id_field: 'mint_id',
              receiver_id: NFT_CONTRACT_NAME,
              method_name: 'nft_mint',
              args: '',
              attached_deposit: FUNC_CALL_ATTACHED_DEPOSIT,
            },
          ],
        ],
      },
    },
  });
};

// Estimates the amount of deposit necessary to fund your keypom account and generate lazy minted NFTs.
function estimateDeposit({ linkCount, initialDeposit }: { linkCount: number; initialDeposit: string }) {
  const baseStorageCost = 21580000000000000000000n; // 0.02158 N
  const linkStorageCost = 6020000000000000000000n; // 0.00602 N
  const dropStorageCost = baseStorageCost + BigInt(linkCount) * linkStorageCost;
  const linksCost = BigInt(linkCount) * BigInt(initialDeposit);
  const functionCallDeposit = BigInt(linkCount) * BigInt(FUNC_CALL_ATTACHED_DEPOSIT);
  const accessKeyStorage = BigInt(linkCount) * 1000000000000000000000n; // 0.001 N
  const gasCost = BigInt(linkCount) * 18762600000000000000000n; // 0.0187626 N

  return (dropStorageCost + gasCost + linksCost + functionCallDeposit + accessKeyStorage).toString();
}
