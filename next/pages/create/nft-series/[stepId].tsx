import { useRouter } from "next/router";
import CreateNftSeriesForm from "../../../components/CreateNftSeriesForm";
import GenerateLinksForm from "../../../components/GenerateLinksForm";
import SaveDropForm from "../../../components/SaveDropForm";

export default function CreateDrop() {
  const router = useRouter();
  const stepId = router.query.stepId as string;
  const dropId = router.query.id as string;

  if (!dropId) {
    return "Please provide a drop ID";
  }

  // Loading
  if (!stepId) {
    return null;
  }

  return (
    <div>
      <div>
        <h1 className="p-16 mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-pink-300">
          Create a Drop
        </h1>
      </div>
      {stepId === "1" && (
        <div className="p-4">
          <h2 className="mt-8 mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200">Create NFT Series</span>
          </h2>
          <CreateNftSeriesForm dropId={dropId} />
        </div>
      )}
      {stepId === "2" && (
        <div className="p-4">
          <h2 className="mt-8 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200 line-through decoration-fuchsia-300">
              Create NFT Series
            </span>
          </h2>
          <h2 className="mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">2</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200">Generate Links</span>
          </h2>
          <GenerateLinksForm dropId={dropId} />
        </div>
      )}
      {stepId === "3" && (
        <div className="p-4">
          <h2 className="mt-8 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200 line-through decoration-fuchsia-300">
              Create NFT Series
            </span>
          </h2>
          <h2 className="text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">2</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200 line-through decoration-fuchsia-300">
              Generate Links
            </span>
          </h2>
          <h2 className="mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">3</span>
            <span className="text-yellow-200">.</span>{" "}
            <span className="text-gray-200">Create Drop</span>
          </h2>
          <SaveDropForm dropId={dropId} />
        </div>
      )}
    </div>
  );
}
