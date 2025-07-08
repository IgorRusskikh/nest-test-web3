export interface CosmosBlockResponse {
  block: {
    header: {
      height: string;
      time: string;
      proposer_address: string;
    };
    data: {
      txs: string[];
    };
  };
  block_id: {
    hash: string;
  };
}

export interface CosmosTxEventAttribute {
  key: string;
  value: string;
}

export interface CosmosTxEvent {
  type: string;
  attributes: CosmosTxEventAttribute[];
}

export interface CosmosTxLog {
  msg_index: number;
  log: string;
  events: CosmosTxEvent[];
}

export interface CosmosTxResult {
  height: string;
  tx_result: {
    code: number;
    data: string;
    log: string;
    info: string;
    gas_wanted: string;
    gas_used: string;
    events: CosmosTxEvent[];
    codespace: string;
  };
  tx: {
    body: {
      messages: any[];
      memo: string;
    };
    auth_info: {
      fee: {
        amount: { denom: string; amount: string }[];
        gas_limit: string;
        payer: string;
        granter: string;
      };
    };
  };
}

export interface AppCosmosBlock {
  height: number;
  time: string;
  hash: string;
  proposerAddress: string;
}

export interface AppCosmosTransaction {
  hash: string;
  height: number;
  time: string;
  gasUsed: string;
  gasWanted: string;
  fee: { denom: string; amount: string }[];
  sender: string;
}
