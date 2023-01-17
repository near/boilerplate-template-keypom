import { useRouter } from "next/router";
import { useState } from "react";
import { useWalletSelector } from "./WalletSelectorContext";
import * as nftSeriesContract from "../nft-series-contract";

type CreateNftSeriesFormProps = {
  dropId: string;
};
export default function CreateNftSeriesForm({
  dropId,
}: CreateNftSeriesFormProps) {
  const router = useRouter();
  const { selector, accountId } = useWalletSelector();
  const [media, setMedia] = useState<string>("");
  const [copies, setCopies] = useState<string>();

  async function createSeries(e: React.FormEvent) {
    e.preventDefault();

    if (!accountId) {
      return;
    }
    let nftMetadata: { media: string; copies?: number } = { media };
    if (copies) {
      nftMetadata.copies = parseInt(copies);
    }

    await nftSeriesContract.createSeries(selector, accountId, {
      mint_id: parseInt(dropId),
      nft: nftMetadata,
    });

    // Force page refresh for non-browser wallets.
    router.push(`/create/nft-series/2?id=${dropId}`);
  }

  return (
    <form onSubmit={createSeries}>
      <div className="">
        <label
          htmlFor="media-url"
          className="block text-lg font-bold text-gray-200"
        >
          Media URL{" "}
          <i className="text-md font-medium hover:opacity-100 opacity-40">
            - usually an IPFS link pointing to an image
          </i>
        </label>
        <input
          type="text"
          name="media-url"
          id="media-url"
          maxLength={250}
          placeholder="https://cloudflare-ipfs.com/ipfs/bafybeicxyjkc6feovbz63ssr46yzbq4i3pifauhr32dwenmzhis5fopwny"
          className="p-2 placeholder-gray-400 placeholder-opacity-40 mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring-indigo-300 text-lg"
          onChange={(e) => setMedia(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="copies"
          className="block text-lg font-bold text-gray-200"
        >
          Number of copies{" "}
          <i className="text-md font-medium hover:opacity-100 opacity-40">
            - limit the number of NFT copies your link drop will mint regardless
            of the number of links
          </i>
        </label>
        <input
          type="number"
          name="copies"
          id="copies"
          min="1"
          max="100"
          onChange={(e) => setCopies(e.target.value)}
          className="p-2 placeholder-gray-400 placeholder-opacity-40 mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring-indigo-300 text-lg"
        />
      </div>
      <button
        type="submit"
        className="mt-8 p-2 block w-48 bg-lime-200 text-gray-800 font-bold rounded hover:bg-lime-400 focus:border-indigo-300 focus:ring-indigo-300"
      >
        Create Series
      </button>
    </form>
  );
}
