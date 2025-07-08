import { EvmBlock, EvmTransaction } from '@types';
import { EvmBlockResponse, EvmTransactionResponse } from '@types';

export const mapBlock = (rawBlock: EvmBlock): EvmBlockResponse => {
  return {
    height: parseInt(rawBlock.number, 16),
    hash: rawBlock.hash,
    parentHash: rawBlock.parentHash,
    gasLimit: rawBlock.gasLimit,
    gasUsed: rawBlock.gasUsed,
    size: rawBlock.size,
  };
};

export const mapTransaction = (
  rawTx: EvmTransaction,
): EvmTransactionResponse => {
  return {
    hash: rawTx.hash,
    to: rawTx.to,
    from: rawTx.from,
    value: rawTx.value,
    input: rawTx.input,
    maxFeePerGas: rawTx.maxFeePerGas ?? null,
    maxPriorityFeePerGas: rawTx.maxPriorityFeePerGas ?? null,
    gasPrice: rawTx.gasPrice ?? null,
  };
};
