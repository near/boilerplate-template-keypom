import * as React from 'react';

const EducationalText = () => {
  return (
    <div className="mx-auto mb-8 p-8 max-w-sm rounded overflow-hidden bg-gray-200 grayscale hover:grayscale-0 text-gray-600">
      <p className="text-gray-700 text-lg font-bold">What is this?</p>
      <p className="pt-4">
        This is an NFT Link Drop app! This app allows you to create an NFT series and hand out links to friends who can
        claim an NFT in the series.
      </p>
      <p className="pt-4">
        The NFTs are lazy-minted and can be claimed by anyone with access to one of the downloaded links. In this app,
        the link allows anyone to claim some NEAR and an NFT. When creating a drop, you will define how much NEAR to
        attach to each link in order to allow users without NEAR accounts to claim an NFT from your series.
      </p>
      <p className="pt-4">
        When you create a drop, you must deposit enough funds for all links to be claimed. You can delete a drop at
        anytime and get a refund for anything that wasn&#39;t claimed.
      </p>
      <p className="pt-4 font-medium">These definitions might be helpful:</p>
      <ul className="space-y-4 pl-2">
        <li>
          <b>Lazy-minted</b> means that the NFTs aren&#39;t created until someone claims a link
        </li>
        <li>
          A <b>link drop</b> is a URL with a secret key that allows anyone to claim the contents of the link
        </li>
      </ul>
      <ol className="pt-4 space-y-4">
        <li>
          Look in <code className="text-sm font-bold text-gray-900">frontend/contracts/keypom-contract.ts</code> -
          you&apos;ll see <code className="text-sm font-bold text-gray-900">getDrops</code> and{' '}
          <code className="text-sm font-bold text-gray-900">createDrop</code> being called on{' '}
          <code className="text-sm font-bold text-gray-900">the Keypom contract</code>. What&apos;s this?
        </li>
        <li>
          Ultimately, this <code className="text-sm font-bold text-gray-900">contract</code> code is defined in the
          prebuilt contract{' '}
          <code className="text-sm font-bold text-gray-900">./contracts/nft-series/nft-series.wasm</code> – but you can
          view the source code for the NFT series contract{' '}
          <a
            className="text-sky-500 hover:text-sky-600"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/keypom/nft-tutorial-series"
          >
            here
          </a>
          .
        </li>
        <li>
          When you run <code className="text-sm font-bold text-gray-900">npm run deploy</code>, the prebuilt contract in{' '}
          <code className="text-sm font-bold text-gray-900">./contracts/nft-series/nft-series.wasm</code> gets deployed
          to the NEAR testnet. You can see how this happens by looking in{' '}
          <code className="text-sm font-bold text-gray-900">package.json</code>.
        </li>
      </ol>
      <hr />
      <p>
        To keep learning, check out{' '}
        <a className="text-sky-500 hover:text-sky-600" target="_blank" rel="noreferrer" href="https://docs.near.org">
          the NEAR docs
        </a>
        {', '}
        <a
          className="text-sky-500 hover:text-sky-600"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/keypom/keypom"
        >
          the Keypom contract
        </a>
        {', '}
        <a
          className="text-sky-500 hover:text-sky-600"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/keypom/keypom-app"
        >
          the Keypom UI
        </a>{' '}
        or look through some{' '}
        <a
          className="text-sky-500 hover:text-sky-600"
          target="_blank"
          rel="noreferrer"
          href="https://examples.near.org"
        >
          example apps
        </a>
        .
      </p>
    </div>
  );
};

export default EducationalText;
