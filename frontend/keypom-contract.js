/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class KeypomNEAR {
  constructor({ contractId, nftContractId, walletToUse }) {
    this.contractId = contractId;
    this.nftContractId = nftContractId;
    this.wallet = walletToUse;
  }

  async getDrops({ accountId }) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_drops_for_owner',
      args: { account_id: accountId },
    });
  }

  // TODO Attach a deposit to this call in order to store the data. Maybe ask the user for a deposit?
  // Calculate a deposit by taking deposit_per_user * copies + storage deposit needed and function calls
  // Storage cost of the drop is 0.01, I've seen 0.00805, just overestimating just in case
  // TODO cap the media length to 250 chars, this will give us a predictable drop storage cost of a max of .00965 so 0.01 will be enough for most cases
  // TODO cap the number of copies to 10000 for predictive storage costs
  //    Cap the input of the media hash so that storage cost is predictable and we know the upper bounds
  //    We could do the same for the number of links if that causes more storage cost of the actual drop
  // You will need about 0.02 NEAR for each access key
  async createDrop({ drop: { keys, initialDeposit }, nft: { media, id, copies } }) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_drop',
      deposit: estimateDeposit({ media, copies, linkCount: keys.length, initialDeposit }),
      args: {
        public_keys: keys,
        // How much NEAR should a claimed account start with.
        deposit_per_use: '20000000000000000000000', // 0.02 NEAR
        metadata: JSON.stringify({ media, id, copies }),
        config: {
          uses_per_key: 1,
          usage: {
            refund_deposit: true,
          },
        },
        fc: {
          methods: [
            [
              {
                account_id_field: 'receiver_id',
                drop_id_field: 'mint_id',
                receiver_id: 'keypom-beta-nfts.testnet',
                method_name: 'nft_mint',
                args: '',
                // How much NEAR to attach to this function call.
                attached_deposit: initialDeposit, // '20000000000000000000000', // 0.02 NEAR
              },
            ],
          ],
        },
      },
    });
  }
}

function estimateDeposit({ media, copies, linkCount, initialDeposit }) {
  let dropStorageCost;
  if (media.length <= 250 && copies < 100000) {
    dropStorageCost = 10000000000000000000000n; // 0.01 NEAR
  } else {
    // You can choose to add more estimated deposit values here for larger drops.
    throw Error('Failed to estimate deposit');
  }

  const linksCost = BigInt(linkCount) * BigInt(initialDeposit);

  return (dropStorageCost + linksCost).toString();
}
