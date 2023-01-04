import Head from "next/head";
import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Keypom Boilerplate Template</title>
        <meta
          name="description"
          content="Generate NFT link drops with Keypom"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
