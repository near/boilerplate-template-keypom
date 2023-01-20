import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWalletSelector } from './WalletSelectorContext';
import { downloadLinks, generateKeys } from '../links';
import { setKeysForDrop } from '../keyStore';

type GenerateLinksFormProps = {
  dropId: string;
};
export default function GenerateLinksForm({ dropId }: GenerateLinksFormProps) {
  const router = useRouter();
  const { accountId } = useWalletSelector();
  const [numLinks, setNumLinks] = useState<string>();

  async function createLinks(e: React.FormEvent) {
    e.preventDefault();

    if (!accountId || !numLinks) {
      return;
    }

    const keys = generateKeys(parseInt(numLinks));
    const secretKeys = keys.map(({ secretKey }) => secretKey);

    setKeysForDrop(dropId, secretKeys);
    downloadLinks(dropId, secretKeys);

    router.push(`/create/nft-series/3?id=${dropId}`);
  }

  return (
    <form onSubmit={createLinks}>
      <div>
        <label htmlFor="num-links" className="block text-lg font-bold text-gray-200">
          Number of Links <i className="font-medium hover:opacity-100 opacity-40">- the number of links in this drop</i>
        </label>
        <input
          type="number"
          name="num-links"
          id="num-links"
          min={1}
          max={100}
          placeholder="100"
          className="p-2 placeholder-gray-400 placeholder-opacity-40 mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring-indigo-300 text-lg"
          onChange={(e) => setNumLinks(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-48 mt-8 bg-lime-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center hover:bg-lime-400 focus:border-indigo-300 focus:ring-indigo-300"
      >
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download Links</span>
      </button>
    </form>
  );
}
