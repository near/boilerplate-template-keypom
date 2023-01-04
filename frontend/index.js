// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// NEAR
import { KeypomNEAR } from './keypom-contract';
import { NftSeriesNEAR } from './nft-series-contract';
import { Wallet } from '../next/components/near-wallet';

const CONTRACT_NAME = process.env.CONTRACT_NAME || 'beta.keypom.testnet';
const NFT_CONTRACT_NAME = process.env.NFT_CONTRACT_NAME || 'keypom-beta-nfts.testnet';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const contract = new KeypomNEAR({ contractId: CONTRACT_NAME, walletToUse: wallet });
const nftContract = new NftSeriesNEAR({ contractId: NFT_CONTRACT_NAME, walletToUse: wallet });

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp();

  ReactDOM.render(
    <App isSignedIn={isSignedIn} contract={contract} nftContract={nftContract} wallet={wallet} />,
    document.getElementById('root'),
  );
};
