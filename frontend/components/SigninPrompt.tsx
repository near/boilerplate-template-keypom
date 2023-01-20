import * as React from 'react';

const SignInPrompt = () => {
  return (
    <div>
      <h1 className="p-16 mt-8 mb-16 text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-pink-300">
        Welcome to NEAR!
      </h1>
      <div className="w-1/4 mx-auto mb-32">
        <p className="font-bold text-2xl">
          This template shows you how to get started creating NFT link drops with Keypom. Connect your wallet to get
          started creating drops.
        </p>
        <p className="font-medium text-xl pt-8">
          Do not worry, this app runs in the test network (&quot;testnet&quot;). It works just like the main network
          (&quot;mainnet&quot;), but using NEAR Tokens that are only for testing!
        </p>
      </div>
    </div>
  );
};

export default SignInPrompt;
