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
      <div className="bg-gray-100">
        <main className="mx-auto max-w-7xl">
          <div className="py-4 px-4 sm:px-6 lg:px-8">
            <WalletButtons />
          </div>
          {children}
        </main>
      </div>
    </WalletSelectorContextProvider>
  );
};

export default Layout;
