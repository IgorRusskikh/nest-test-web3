import { EvmBlockResponse, EvmTransactionResponse } from '@types';
import { Injectable, Logger } from '@nestjs/common';
import { mapBlock, mapTransaction } from '@mappers';

import { EvmRpcService } from '@services';
import { IEvmUsecase } from '@interfaces';

@Injectable()
export class EvmUsecase implements IEvmUsecase {
  private readonly logger = new Logger(EvmUsecase.name);

  constructor(private readonly evmRpcService: EvmRpcService) {}

  async getBlock(height: number): Promise<EvmBlockResponse> {
    this.logger.debug(`Поиск блока EVM по высоте: ${height}`);
    const rawBlock = await this.evmRpcService.getBlockByNumber(height);

    return mapBlock(rawBlock);
  }

  async getTransaction(hash: string): Promise<EvmTransactionResponse> {
    this.logger.debug(`Поиск транзакции EVM по хешу: ${hash}`);
    const rawTx = await this.evmRpcService.getTransactionByHash(hash);

    return mapTransaction(rawTx);
  }
}
