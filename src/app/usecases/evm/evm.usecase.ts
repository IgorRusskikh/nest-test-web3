import { EvmBlockResponse, EvmTransactionResponse } from '@types';
import { mapBlock, mapTransaction } from '@mappers';

import { EvmRpcService } from '@services';
import { IEvmUsecase } from '@interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvmUsecase implements IEvmUsecase {
  constructor(private readonly evmRpcService: EvmRpcService) {}

  async getBlock(height: number): Promise<EvmBlockResponse> {
    const rawBlock = await this.evmRpcService.getBlockByNumber(height);

    return mapBlock(rawBlock);
  }

  async getTransaction(hash: string): Promise<EvmTransactionResponse> {
    const rawTx = await this.evmRpcService.getTransactionByHash(hash);

    return mapTransaction(rawTx);
  }
}
