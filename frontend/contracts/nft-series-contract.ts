import { WalletSelector } from '@near-wallet-selector/core';
import { NFT_CONTRACT_NAME } from '../constants';
import { callMethod, viewMethod } from './contract';

// In order to create a series on this contract, you will need to be an approved creator.
export const createSeries = async (
  walletSelector: WalletSelector,
  accountId: string,
  {
    mint_id,
    nft: metadata,
  }: {
    mint_id: number;
    nft: { media: string; copies?: number };
  },
) => {
  return await callMethod(walletSelector, accountId, {
    contractId: NFT_CONTRACT_NAME,
    method: 'create_series',
    args: {
      mint_id,
      metadata,
    },
    deposit: '20000000000000000000000',
  });
};

export const getSeries = async (walletSelector: WalletSelector, args: { mint_id: number; series_id?: number }) => {
  const response = await viewMethod(walletSelector, {
    contractId: NFT_CONTRACT_NAME,
    method: 'get_series_info',
    args,
  });
  console.log('NFTSERIES', response);
  return response;
};
