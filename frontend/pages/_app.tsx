import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';
import { WalletSelectorContextProvider } from '../components/WalletSelectorContext';
import { NETWORK, CONTRACT_NAME } from '../constants';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Keypom Boilerplate Template</title>
        <meta name="description" content="Generate NFT link drops with Keypom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletSelectorContextProvider network={NETWORK} createAccessKeyFor={CONTRACT_NAME}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletSelectorContextProvider>
    </>
  );
}
