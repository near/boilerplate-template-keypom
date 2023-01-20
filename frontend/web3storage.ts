import { Web3Storage } from 'web3.storage';
import { WEB3_STORAGE_AUTH_TOKEN } from './constants';

export const web3StorageClient = WEB3_STORAGE_AUTH_TOKEN
  ? new Web3Storage({
      token: WEB3_STORAGE_AUTH_TOKEN,
    })
  : null;
