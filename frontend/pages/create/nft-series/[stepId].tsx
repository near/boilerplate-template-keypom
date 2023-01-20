import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreateNftSeriesForm from '../../../components/CreateNftSeriesForm';
import GenerateLinksForm from '../../../components/GenerateLinksForm';
import SaveDropForm from '../../../components/SaveDropForm';
import { useWalletSelector } from '../../../components/WalletSelectorContext';
import { getKeysForDrop } from '../../../keyStore';
import * as nftSeriesContract from '../../../contracts/nft-series-contract';
import * as keypomContract from '../../../contracts/keypom-contract';

// Checks if stepper is on the correct step and routes to correct step if necessary.
function useStepRouter() {
  const { accountId, selector } = useWalletSelector();
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const stepId = router.query.stepId as string;
  const dropId = router.query.id as string;

  useEffect(() => {
    if (!accountId || !dropId || !stepId) return;

    (async () => {
      let step1Complete;
      try {
        await nftSeriesContract.getSeries(selector, {
          mint_id: parseInt(dropId),
        });
        step1Complete = true;
      } catch {
        step1Complete = false;
      }

      if (!step1Complete) {
        if (stepId === '1') {
          setIsComplete(true);
        } else {
          router.push(`/create/nft-series/1?id=${dropId}`);
        }
        return;
      }

      const step2Complete = getKeysForDrop(dropId).length > 0;
      if (!step2Complete) {
        if (stepId === '2') {
          setIsComplete(true);
        } else {
          router.push(`/create/nft-series/2?id=${dropId}`);
        }
        return;
      }

      let step3Complete;
      try {
        await keypomContract.getDropInfo(selector, dropId);
        step3Complete = true;
      } catch {
        step3Complete = false;
      }

      if (!step3Complete) {
        if (stepId === '3') {
          setIsComplete(true);
        } else {
          router.push(`/create/nft-series/3?id=${dropId}`);
        }
        return;
      }

      router.push('/');
      return;
    })();
  }, [accountId, stepId, dropId, selector, router]);

  return { isComplete };
}

export default function CreateDrop() {
  const { isComplete: isStepRouterComplete } = useStepRouter();
  const router = useRouter();
  const stepId = router.query.stepId as string;
  const dropId = router.query.id as string;

  if (!dropId) {
    return 'Please provide a drop ID';
  }

  // Loading
  if (!stepId) {
    return null;
  }

  if (!isStepRouterComplete) {
    return null;
  }

  return (
    <div>
      <div>
        <h1 className="p-16 mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-pink-300">
          Create a Drop
        </h1>
      </div>
      {stepId === '1' && (
        <div className="p-4">
          <h2 className="mt-8 mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span> <span className="text-gray-200">Create NFT Series</span>
          </h2>
          <CreateNftSeriesForm dropId={dropId} />
        </div>
      )}
      {stepId === '2' && (
        <div className="p-4">
          <h2 className="mt-8 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span>{' '}
            <span className="text-gray-200 line-through decoration-fuchsia-300">Create NFT Series</span>
          </h2>
          <h2 className="mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">2</span>
            <span className="text-yellow-200">.</span> <span className="text-gray-200">Generate Links</span>
          </h2>
          <GenerateLinksForm dropId={dropId} />
        </div>
      )}
      {stepId === '3' && (
        <div className="p-4">
          <h2 className="mt-8 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">1</span>
            <span className="text-yellow-200">.</span>{' '}
            <span className="text-gray-200 line-through decoration-fuchsia-300">Create NFT Series</span>
          </h2>
          <h2 className="text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">2</span>
            <span className="text-yellow-200">.</span>{' '}
            <span className="text-gray-200 line-through decoration-fuchsia-300">Generate Links</span>
          </h2>
          <h2 className="mb-16 text-left font-extrabold text-transparent text-6xl">
            <span className="text-lime-200">3</span>
            <span className="text-yellow-200">.</span> <span className="text-gray-200">Create Drop</span>
          </h2>
          <SaveDropForm dropId={dropId} />
        </div>
      )}
    </div>
  );
}
