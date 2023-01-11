import React from "react";
import { NETWORK, CONTRACT_NAME } from "../constants";
import { WalletButtons } from "./WalletButtons";
import { WalletSelectorContextProvider } from "./WalletSelectorContext";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <WalletSelectorContextProvider
      network={NETWORK}
      createAccessKeyFor={CONTRACT_NAME}
    >
      <main className="mx-auto max-w-7xl min-h-screen">
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <WalletButtons />
        </div>
        {children}
        <footer>
          <div className="min-w-full mt-8 text-center font-bold text-xs opacity-25">
            Drops are created on the{" "}
            <a
              className="underline"
              href={`https://explorer${
                NETWORK === "testnet" ? ".testnet" : ""
              }.near.org/accounts/${CONTRACT_NAME}`}
            >
              {CONTRACT_NAME}
            </a>{" "}
            contract
          </div>
        </footer>
      </main>
    </WalletSelectorContextProvider>
  );
};

export default Layout;
