import { KeyPairEd25519 } from "near-api-js/lib/utils";
import { useRouter } from "next/router";
import { NETWORK, CONTRACT_NAME } from "../constants";
import { getKeysForDrop } from "../keyStore";
import { downloadLinks } from "../links";

type Drop = any;
type Props = {
  drops: Drop[];
};

export const ViewDrops: React.FC<Props> = ({ drops }) => {
  return (
    <div>
      <div>
        <h1 className="mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-pink-400 to-sky-600">
          Your NFT Drops
        </h1>
      </div>
      <div className="mx-auto columns-1 md:columns-2 lg:columns-3">
        <NewDropCard />
        {drops.map((drop) => (
          <DropCard
            key={drop.drop_id}
            dropId={drop.drop_id}
            media={JSON.parse(drop.metadata).media}
          />
        ))}
      </div>
    </div>
  );
};

type DropCardProps = {
  dropId: string;
  media: string;
};

const DropCard: React.FC<DropCardProps> = ({ dropId, media }) => {
  const keys = getKeysForDrop(dropId);
  return (
    <div className="mb-8 p-4 max-w-sm rounded overflow-hidden bg-gray-200 grayscale hover:grayscale-0">
      <img className="w-full aspect-square" src={media} alt="NFT Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-500">#{dropId}</div>
      </div>
      {keys.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          <button
            onClick={() => downloadLinks(dropId, keys)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download Links</span>
          </button>
        </div>
      )}
    </div>
  );
};

const NewDropCard: React.FC = () => {
  const router = useRouter();
  return (
    <div className="mb-8 p-4 max-w-sm rounded overflow-hidden bg-gradient-to-r from-fuchsia-200 to-rose-200">
      <div className="px-6 py-4">
        <p className="text-gray-700 text-lg font-bold">
          Create a link drop of lazy-minted NFTs!
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => router.push(`/create?id=${Date.now().toString()}`)}
          className="bg-emerald-200 hover:bg-emerald-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span>New Drop</span>
        </button>
      </div>
    </div>
  );
};
