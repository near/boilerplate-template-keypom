import { useEffect, useState } from "react";
import { ViewDrops } from "../components/ViewDrops";
import { useWalletSelector } from "../components/WalletSelectorContext";
import * as keypom from "../keypom-contract";

export default function CreateDrop() {
  const { selector, accountId } = useWalletSelector();

  return <div>todo</div>;
}
