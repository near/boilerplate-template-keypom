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
        {drops.map((drop) => (
          <DropCard
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
  return (
    <div className="mb-8 p-4 max-w-sm rounded overflow-hidden bg-gray-200 grayscale hover:grayscale-0">
      <img className="w-full aspect-square" src={media} alt="NFT Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">#{dropId}</div>
        {/* <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p> */}
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
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
    </div>
  );
};
