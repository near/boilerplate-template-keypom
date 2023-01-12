import { useEffect, useState } from "react";
import ViewDrops from "../components/ViewDrops";
import { useWalletSelector } from "../components/WalletSelectorContext";
import * as keypom from "../keypom-contract";

export default function Home() {
  const { selector, accountId } = useWalletSelector();
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    if (!accountId) {
      return;
    }
    (async () => {
      const drops = await keypom.getDrops(selector, accountId);
      setDrops(drops || []);
    })();
  }, [selector, accountId]);

  return (
    <div>
      <ViewDrops drops={drops} />
    </div>
  );
}
