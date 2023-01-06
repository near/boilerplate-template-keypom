import { useEffect } from "react";
import { useWalletSelector } from "../components/WalletSelectorContext";
import * as keypom from "../keypom-contract";
import { KeyPairEd25519 } from "near-api-js/lib/utils";
import * as nftSeriesContract from "../nft-series-contract";
import { CONTRACT_NAME, NETWORK } from "../constants";
import { useRouter } from "next/router";

const generateKeys = (num: number) => {
  const keys = [];
  for (let i = 0; i < num; i++) {
    keys.push(KeyPairEd25519.fromRandom());
  }
  return keys;
};

const generateCsv = (fileName: string, data: string) => {
  const file = new File([data], fileName);
  const link = document.createElement("a");
  link.setAttribute("visibility", "hidden");
  // link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadLinks = async (dropId: string, keys: KeyPairEd25519[]) => {
  // TODO this is hardcoded to use a specific wallet, this could be dynamic.
  const walletUrl = `https://wallet.${
    NETWORK === "testnet" ? `testnet.` : ``
  }near.org`;
  const links = keys.map(
    ({ secretKey }) => `${walletUrl}/linkdrop/${CONTRACT_NAME}/${secretKey}`
  );
  generateCsv(`nft_drop_id_${dropId}_links.csv`, links.join("\r\n"));
};

export default function CreateDrop() {
  const { selector, accountId } = useWalletSelector();
  const router = useRouter();

  const inactiveDropId = window.localStorage.getItem("inactiveDropId");
  const dropId = router.query.id as string;

  // TODO this should come from the user.
  const nftMetadata = {
    media:
      "https://images.squarespace-cdn.com/content/v1/61a6f2befb96aa035ef5a15b/713a0b4f-8076-4bc6-906d-f64488756df6/10875.png?format=1000w",
    id: "some-nfts",
    copies: 10,
  };

  useEffect(() => {
    if (!accountId || inactiveDropId) return;

    (async () => {
      const keys = generateKeys(10);

      // Save in case we need to jump out to a wallet and then come back.
      // Also stores every drop's keys for the user to download later if needed.
      window.localStorage.setItem(
        `drop#${dropId}`,
        JSON.stringify(keys.map(({ secretKey }) => secretKey.toString()))
      );
      window.localStorage.setItem("inactiveDropId", dropId);

      await nftSeriesContract.createSeries(selector, accountId, {
        mint_id: parseInt(dropId),
        nft: nftMetadata,
      });
    })();
  }, []);

  useEffect(() => {
    if (!accountId || !inactiveDropId) return;

    // At this point the drop's NFT series has been created but the keys/links are not activated until saved in Keypom.
    // Here we will save them in Keypom.
    const dropId = inactiveDropId;
    const secretKeys: string[] = JSON.parse(
      window.localStorage.getItem(`drop#${inactiveDropId}`) || "[]"
    );

    const keys = secretKeys.map((s) => new KeyPairEd25519(s));

    (async () => {
      await downloadLinks(dropId, keys);

      if (
        !confirm(
          "Please confirm you got the links downloaded. You may not be able to after confirming. This can result in a loss of funds."
        )
      ) {
        return;
      }

      // TODO this isn't very robust, we should only clear the inactiveDropId once we know createDrop succeeded.
      window.localStorage.removeItem("inactiveDropId");

      await keypom.createDrop(selector, accountId, {
        drop: {
          dropId,
          keys: keys.map(({ publicKey }) => publicKey.toString()),
          initialDeposit: "20000000000000000000000",
        },
        nft: nftMetadata,
      });
    })();
  }, []);

  return <div>KEYPOM</div>;
}
