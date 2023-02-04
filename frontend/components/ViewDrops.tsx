/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { deleteDrop } from '../contracts/keypom-contract';
import { getKeysForDrop } from '../keyStore';
import { downloadLinks } from '../links';
import { Drop } from '../contracts/types';
import EducationalText from './EducationalText';
import ExplainText from './ExplainText';
import { useWalletSelector } from './WalletSelectorContext';

type Props = {
  drops: Drop[];
};

export default function ViewDrops({ drops }: Props) {
  return (
    <div>
      {drops.length === 0 && (
        <>
          <div>
            <h1 className="mx-4 mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-pink-400 to-sky-600">
              Create Your First Drop
            </h1>
          </div>
          <div className="p-16 mx-auto columns-1 lg:columns-2 xl:columns-3">
            <NewDropCard />
            <EducationalText />
            <ExplainText />
          </div>
        </>
      )}
      {drops.length > 0 && (
        <>
          <div>
            <h1 className="mx-4 mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-pink-400 to-sky-600">
              Your NFT Drops
            </h1>
          </div>
          <div className="p-16 mx-auto columns-1 lg:columns-2 xl:columns-3">
            <NewDropCard />
            <EducationalText />
            <ExplainText />
            {drops.map((drop) => (
              <DropCard key={drop.drop_id} drop={drop} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type DropCardProps = {
  drop: Drop;
};

function DropCard({ drop }: DropCardProps) {
  const { selector, accountId } = useWalletSelector();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPixelArt, setIsPixelArt] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isImageError, setImageError] = useState(false);
  const dropId = drop.drop_id;
  const keys = getKeysForDrop(dropId);
  const dropMetadata = JSON.parse(drop.metadata);
  const media = dropMetadata?.media || '';
  const copies = dropMetadata?.copies;
  const totalKeys = drop.next_key_id;
  const totalUsedKeys = totalKeys - drop.registered_uses;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoading(false);
      setIsPixelArt(img.naturalHeight < 256 && img.naturalWidth < 256);
    };
    img.onerror = (err) => {
      setImageLoading(false);
      setImageError(true);
      return console.log('Failed to get image data', err);
    };
    img.src = media;
  }, [media]);

  async function deleteKeys() {
    setIsDeleting(true);
    try {
      await deleteDrop(selector, accountId!, dropId);
      // TODO implement better state management instead of refreshing.
      router.reload();
    } catch {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mx-auto mb-8 max-w-sm rounded overflow-hidden bg-gray-200 grayscale hover:grayscale-0">
      <div
        className="image-wrapper p-4 w-full aspect-square flex items-center justify-center relative"
        title={isImageError ? 'Error on loading image' : ''}
      >
        {imageLoading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {isImageError ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        ) : null}
        <img
          className="p-4 w-full aspect-square"
          style={isPixelArt ? { imageRendering: 'pixelated' } : {}}
          src={media}
          alt="NFT Image"
        />
      </div>
      <div className="p-4">
        <div className="px-4 py-4">
          <div className="font-bold text-xl mb-2 text-gray-500">#{dropId}</div>
          <div className="text-lg font-bold text-gray-500">
            {totalUsedKeys} out of {totalKeys} links are claimed
          </div>
          {copies && totalUsedKeys >= copies && (
            <div className="text-lg font-bold text-gray-500">All NFTs are claimed</div>
          )}
          {copies && totalUsedKeys < copies && (
            <div className="text-lg font-bold text-gray-500">
              {totalUsedKeys} out of {copies} NFTs are claimed
            </div>
          )}
        </div>

        <div className="my-4 px-6 pt-4 pb-2">
          {keys.length > 0 && (
            <button
              onClick={() => downloadLinks(dropId, keys)}
              className="absolute left-6 bottom-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Download Links</span>
            </button>
          )}
          <button
            disabled={isDeleting}
            onClick={deleteKeys}
            className={`${
              isDeleting ? 'bg-red-400' : 'bg-gray-300 hover:bg-red-400'
            } absolute right-6 bottom-6 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            {!isDeleting && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="fill-current w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span>Delete</span>
              </>
            )}
            {isDeleting && (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Deleting</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function NewDropCard() {
  const router = useRouter();
  return (
    <div className="mx-auto mb-8 p-4 max-w-sm rounded overflow-hidden bg-gradient-to-r from-fuchsia-200 to-rose-200">
      <div className="px-6 py-4">
        <p className="text-gray-700 text-lg font-bold">Create a link drop of lazy-minted NFTs!</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => router.push(`/create/nft-series/1?id=${Date.now().toString()}`)}
          className="bg-emerald-200 hover:bg-emerald-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:border-indigo-300 focus:ring-indigo-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <span>New Drop</span>
        </button>
      </div>
    </div>
  );
}
