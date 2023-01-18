// This type is not meant to be exhaustive. Please review the Keypom contract code in order to view the full type definition: https://github.com/keypom/keypom
export type Drop = {
  drop_id: string;
  owner_id: string;
  deposit_per_use: string;
  fc: {
    methods: {
      receiver_id: string;
      method_name: string;
      args: string;
      attached_deposit: string;
      account_id_field: string;
      drop_id_field: string;
      key_id_field: string;
    }[];
  }[];
  metadata: string;
  registered_uses: number;
  required_gas: string;
  next_key_id: number;
};
