import { WalletSelector } from '@near-wallet-selector/core';
import { providers } from 'near-api-js';
import { CodeResult } from 'near-api-js/lib/providers/provider';

type ViewProps = {
  contractId: string;
  method: string;
  args: any;
};

// Make a read-only call to retrieve information from the network
export const viewMethod = async (walletSelector: WalletSelector, { contractId, method, args = {} }: ViewProps) => {
  const { network } = walletSelector.options;
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

  let res = await provider.query<CodeResult>({
    request_type: 'call_function',
    account_id: contractId,
    method_name: method,
    args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
    finality: 'optimistic',
  });
  return JSON.parse(Buffer.from(res.result).toString());
};

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

type CallProps = {
  contractId: string;
  method: string;
  args?: any;
  gas?: string;
  deposit?: string;
  callbackUrl?: string;
};

// Call a method that changes the contract's state
export const callMethod = async (
  walletSelector: WalletSelector,
  accountId: string,
  { contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT, callbackUrl }: CallProps,
) => {
  const wallet = await walletSelector.wallet();
  // Sign a transaction with the "FunctionCall" action
  return await wallet.signAndSendTransaction({
    callbackUrl,
    signerId: accountId,
    receiverId: contractId,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: method,
          args,
          gas,
          deposit,
        },
      },
    ],
  });
};
