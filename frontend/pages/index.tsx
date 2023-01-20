import { useEffect, useState } from 'react';
import ViewDrops from '../components/ViewDrops';
import { useWalletSelector } from '../components/WalletSelectorContext';
import * as keypom from '../contracts/keypom-contract';
import { Drop } from '../contracts/types';

export default function Home() {
  const { selector, accountId } = useWalletSelector();
  const [drops, setDrops] = useState<Drop[]>();

  useEffect(() => {
    if (!accountId) {
      return;
    }
    (async () => {
      const drops = await keypom.getDrops(selector, accountId);
      setDrops(drops || []);
    })();
  }, [selector, accountId]);

  return <div>{drops && <ViewDrops drops={drops} />}</div>;
}
