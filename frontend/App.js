import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, contract, wallet }) {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    (async () => {
      if (!wallet || !wallet.accountId) return;
      const drops = await contract.getDrops({ accountId: wallet.accountId });
      setDrops(drops || []);
    })();
  }, [contract, isSignedIn, wallet]);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    (async () => {
      if (!wallet || !wallet.accountId) return;
      const drops = await contract.getDrops({ accountId: `${wallet.accountId}` });
      setDrops(drops || []);
    })();
  }, [contract, isSignedIn, wallet]);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()} />;
  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
      <main>
        <ViewDrops drops={drops} />
        <EducationalText />
      </main>
    </>
  );
}

const ViewDrops = ({ drops }) => {
  return (
    <div>
      <h2>Your NFT Drops</h2>
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {drops.map((drop) => {
          return (
            <div style={{ border: '1px solid', borderRadius: '10px', padding: '1rem', gap: '1rem' }}>
              <div>
                <img style={{ height: '10rem' }} alt="NFT media for link drop" src={JSON.parse(drop.metadata).media} />
              </div>
              ID: {drop.drop_id}
              <div style={{ marginTop: '1rem', display: 'flex', flexFlow: 'row', gap: '1rem' }}>
                <button>Download Links</button>
                <button onClick={() => alert('Are you sure?')}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
