import React from 'react';

export function SignInPrompt({ onClick }) {
  return (
    <main>
      <h1>Welcome to NEAR!</h1>
      <p>
        Your contract stores files in IPFS and file pointers on the NEAR blockchain. To upload files, you need to sign
        in using the NEAR Wallet. It is very simple, just use the button below.
      </p>
      <p>
        Do not worry, this app runs in the test network ("testnet"). It works just like the main network ("mainnet"),
        but using NEAR Tokens that are only for testing!
      </p>
      <br />
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({ accountId, onClick }) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}

export function EducationalText() {
  return (
    <>
      <p>
        Look at that! A simple app that creates NFT link drops! These drops are stored on the Keypom contract and the
        NFTs are stored on the specified NFT contract. Only those with the appropriate links can claim the NFTs.
        Distribute the links however you'd like. Users won't need to own a Near wallet to claim the NFT!
      </p>
      <hr />
      <p>
        To keep learning, check out{' '}
        <a target="_blank" rel="noreferrer" href="https://docs.near.org">
          the NEAR docs
        </a>{' '}
        or look through some{' '}
        <a target="_blank" rel="noreferrer" href="https://examples.near.org">
          example apps
        </a>
        .
      </p>
    </>
  );
}
