export interface EvmBlock {
  number: string;
  hash: string;
  parentHash: string;
  gasLimit: string;
  gasUsed: string;
  size: string;
  timestamp: string;
  transactions: string[];
  [key: string]: any;
}

export interface EvmTransaction {
  hash: string;
  to: string | null;
  from: string;
  value: string;
  input: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gasPrice?: string;
  [key: string]: any;
}

export interface EvmBlockResponse {
  height: number;
  hash: string;
  parentHash: string;
  gasLimit: string;
  gasUsed: string;
  size: string;
}

export interface EvmTransactionResponse {
  hash: string;
  to: string | null;
  from: string;
  value: string;
  input: string;
  maxFeePerGas?: string | null;
  maxPriorityFeePerGas?: string | null;
  gasPrice?: string | null;
}

export type EvmRpcPayload = {
  jsonrpc: string;
  method: string;
  params: (string | number | boolean)[];
  id: number;
};
