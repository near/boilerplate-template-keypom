import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWalletSelector } from './WalletSelectorContext';
import * as nftSeriesContract from '../contracts/nft-series-contract';
import { WEB3_STORAGE_AUTH_TOKEN } from '../constants';
import { web3StorageClient } from '../web3storage';

type CreateNftSeriesFormProps = {
  dropId: string;
};
export default function CreateNftSeriesForm({ dropId }: CreateNftSeriesFormProps) {
  const router = useRouter();
  const { selector, accountId } = useWalletSelector();
  const [media, setMedia] = useState<string>('');
  const [uploadingFile, setUploadingFile] = useState(false);
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

  async function uploadFile(event: any) {
    setMedia('');
    setUploadingFile(true);

    const targetFile = event.target.files[0];
    const cid = await web3StorageClient?.put([targetFile], {
      wrapWithDirectory: false,
    });

    setMedia(`https://${cid}.ipfs.w3s.link`);
    setUploadingFile(false);
  }

  async function fileDrop(e: any) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    await uploadFile({ target: { files } });
  }

  return (
    <form onSubmit={createSeries}>
      <p className="block text-lg font-bold text-gray-200">
        Choose media <i className="font-medium hover:opacity-100 opacity-40">- typically a URL to an image</i>
      </p>
      <div className={uploadingFile ? 'animate-pulse' : ''}>
        {WEB3_STORAGE_AUTH_TOKEN && (
          <div
            onDrop={fileDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
          >
            <label className="flex justify-center w-full h-32 p-2 border-4 border-gray-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-opacity-100 border-opacity-40 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {!uploadingFile && (
                  <span className="font-bold text-gray-200">
                    Drop or <span className="text-gray-200 underline hover:opacity-100 opacity-40">browse</span> for a
                    file to upload to IPFS or enter a URL
                  </span>
                )}
                {uploadingFile && <span className="font-bold text-gray-200">Uploading...</span>}
              </span>
              <input type="file" name="media-upload" className="hidden" onChange={uploadFile}></input>
            </label>
          </div>
        )}
        <div>
          <input
            type="text"
            name="media-url"
            id="media-url"
            maxLength={250}
            placeholder="https://cloudflare-ipfs.com/ipfs/bafybeicxyjkc6feovbz63ssr46yzbq4i3pifauhr32dwenmzhis5fopwny"
            className="p-2 placeholder-gray-400 placeholder-opacity-40 mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring-indigo-300 text-lg"
            onChange={(e) => setMedia(e.target.value)}
            value={media}
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="copies" className="block text-lg font-bold text-gray-200">
          Number of copies{' '}
          <i className="font-medium hover:opacity-100 opacity-40">
            - limit the number of NFT copies your link drop will mint regardless of the number of links
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
