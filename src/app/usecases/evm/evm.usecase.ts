import { EvmBlockResponse, EvmTransactionResponse } from '@types';
import { Injectable, Logger } from '@nestjs/common';

import { EvmRpcService } from '@services';
import { IEvmUsecase } from '@interfaces';

@Injectable()
export class EvmUsecase implements IEvmUsecase {
  private readonly logger = new Logger(EvmUsecase.name);

  constructor(private readonly evmRpcService: EvmRpcService) {}

  async getBlock(height: number): Promise<EvmBlockResponse> {
    this.logger.debug(`Поиск блока EVM по высоте: ${height}`);
    const rawBlock = await this.evmRpcService.getBlockByNumber(height);

    return {
      height: parseInt(rawBlock.number, 16),
      hash: rawBlock.hash,
      parentHash: rawBlock.parentHash,
      gasLimit: rawBlock.gasLimit,
      gasUsed: rawBlock.gasUsed,
      size: rawBlock.size,
    };
  }

  async getTransaction(hash: string): Promise<EvmTransactionResponse> {
    this.logger.debug(`Поиск транзакции EVM по хешу: ${hash}`);
    const rawTx = await this.evmRpcService.getTransactionByHash(hash);

    const response: EvmTransactionResponse = {
      hash: rawTx.hash,
      to: rawTx.to,
      from: rawTx.from,
      value: rawTx.value,
      input: rawTx.input,
      maxFeePerGas: rawTx.maxFeePerGas ?? null,
      maxPriorityFeePerGas: rawTx.maxPriorityFeePerGas ?? null,
      gasPrice: rawTx.gasPrice ?? null,
    };

    return response;
  }
}
