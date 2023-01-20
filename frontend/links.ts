import { KeyPairEd25519 } from 'near-api-js/lib/utils';
import { CONTRACT_NAME, WALLET_URL } from './constants';

export const generateKeys = (num: number) => {
  const keys = [];
  for (let i = 0; i < num; i++) {
    keys.push(KeyPairEd25519.fromRandom());
  }
  return keys;
};

const generateCsv = (fileName: string, data: string) => {
  const file = new File([data], fileName);
  const link = document.createElement('a');
  link.setAttribute('visibility', 'hidden');
  // link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Download links for secret links.
export const downloadLinks = async (dropId: string, keys: string[]) => {
  // TODO this is hardcoded to use a specific wallet, this could be dynamic.
  const links = keys.map((key) => `${WALLET_URL}/linkdrop/${CONTRACT_NAME}/${key}`);
  generateCsv(`nft_drop_id_${dropId}_links.csv`, links.join('\r\n'));
};
