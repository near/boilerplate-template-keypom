import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWalletSelector } from './WalletSelectorContext';
import { getKeysForDrop } from '../keyStore';
import * as keypomContract from '../contracts/keypom-contract';
import * as nftSeriesContract from '../contracts/nft-series-contract';
import { KeyPairEd25519 } from 'near-api-js/lib/utils';

type SaveDropFormProps = {
  dropId: string;
};
export default function SaveDropForm({ dropId }: SaveDropFormProps) {
  const router = useRouter();
  const { selector, accountId } = useWalletSelector();
  const [initDeposit, setInitDeposit] = useState<string>();

  async function createDrop(e: React.FormEvent) {
    e.preventDefault();

    if (!accountId || !initDeposit) {
      return;
    }

    const secretKeys = getKeysForDrop(dropId);
    const keys = secretKeys.map((s) => new KeyPairEd25519(s));

    const {
      metadata: { media, copies },
    } = await nftSeriesContract.getSeries(selector, {
      mint_id: parseInt(dropId),
    });
    const metadata = {
      media,
      copies,
    };

    await keypomContract.createDrop(
      selector,
      accountId,
      {
        drop: {
          dropId,
          keys: keys.map(({ publicKey }) => publicKey.toString()),
          initialDeposit: initDeposit,
        },
      },
      metadata,
    );

    // Go back to view all drops
    router.push('/');
  }

  return (
    <form onSubmit={createDrop}>
      <div>
        <fieldset>
          <legend className="contents text-lg font-bold text-gray-200">Initial Account Deposit</legend>
          <p className="font-medium hover:opacity-100 opacity-40">
            <i>This is the NEAR amount you will give to the link&#39;s claimer.</i>
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="minimal-tx"
                name="initial-deposit"
                type="radio"
                value="8000000000000000000000"
                className="h-4 w-4 border-gray-200"
                required
                onChange={(e) => setInitDeposit(e.target.value)}
              />
              <label htmlFor="minimal-tx" className="ml-3 block text-lg font-bold text-gray-200">
                <span className="font-mono">0.008 Ⓝ</span>{' '}
                <i className="font-medium hover:opacity-100 opacity-40">- enough to claim the NFT</i>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="couple-tx"
                name="initial-deposit"
                type="radio"
                value="15000000000000000000000"
                className="h-4 w-4 border-gray-200"
                required
                onChange={(e) => setInitDeposit(e.target.value)}
              />
              <label htmlFor="couple-tx" className="ml-3 block text-lg font-bold text-gray-200">
                <span className="font-mono">0.015 Ⓝ</span>{' '}
                <i className="font-medium hover:opacity-100 opacity-40">
                  - after claiming, enough to cover a couple transactions
                </i>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="several-tx"
                name="initial-deposit"
                type="radio"
                value="20000000000000000000000"
                className="h-4 w-4 border-gray-200"
                required
                onChange={(e) => setInitDeposit(e.target.value)}
              />
              <label htmlFor="several-tx" className="ml-3 block text-lg font-bold text-gray-200">
                <span className="font-mono">0.020 Ⓝ</span>{' '}
                <i className="font-medium hover:opacity-100 opacity-40">- enough for several transactions</i>
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <button
        type="submit"
        className="mt-8 p-2 block w-48 bg-lime-200 text-gray-800 font-bold rounded hover:bg-lime-400 focus:border-indigo-300 focus:ring-indigo-300"
      >
        Create Drop
      </button>
    </form>
  );
}
