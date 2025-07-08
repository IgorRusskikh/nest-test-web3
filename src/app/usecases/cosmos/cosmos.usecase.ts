import { AppCosmosBlock, AppCosmosTransaction } from '@types';
import { mapCosmosBlock, mapCosmosTransaction } from '@mappers';

import { CosmosRpcService } from '@/infrastructure/services/cosmos-rpc/cosmos-rpc.service';
import { ICosmosUsecase } from '@/interfaces/usecases/cosmos.usecase.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CosmosUsecase implements ICosmosUsecase {
  constructor(private readonly cosmosRpcService: CosmosRpcService) {}

  async getBlock(height: number): Promise<AppCosmosBlock> {
    const rawBlock = await this.cosmosRpcService.getBlockByHeight(height);

    return mapCosmosBlock(rawBlock);
  }

  async getTransaction(hash: string): Promise<AppCosmosTransaction> {
    const rawTx = await this.cosmosRpcService.getTransactionByHash(hash);

    const height = parseInt(rawTx.height, 10);

    const blockData = await this.getBlock(height);

    return mapCosmosTransaction(rawTx, blockData, hash);
  }
}
