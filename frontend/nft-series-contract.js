/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class NftSeriesNEAR {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async createSeries({ mint_id, nft: { media, id, copies } }) {
    await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_series',
      args: {
        mint_id,
        metadata: JSON.stringify({ media, id, copies }),
      },
    });
  }
}
