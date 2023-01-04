import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

const CONTRACT_NAME = process.env.CONTRACT_NAME || "beta.keypom.testnet";
const NFT_CONTRACT_NAME =
  process.env.NFT_CONTRACT_NAME || "keypom-beta-nfts.testnet";

const useWallet = () => {
  const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME });
};

export default function App({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
