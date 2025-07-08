import { AppCosmosBlock, AppCosmosTransaction } from '@types';
import { Injectable, Logger } from '@nestjs/common';
import { mapCosmosBlock, mapCosmosTransaction } from '@mappers';

import { CosmosRpcService } from '@/infrastructure/services/cosmos-rpc/cosmos-rpc.service';
import { ICosmosUsecase } from '@/interfaces/usecases/cosmos.usecase.interface';

@Injectable()
export class CosmosUsecase implements ICosmosUsecase {
  private readonly logger = new Logger(CosmosUsecase.name);

  constructor(private readonly cosmosRpcService: CosmosRpcService) {}

  async getBlock(height: number): Promise<AppCosmosBlock> {
    this.logger.debug(`Поиск блока Cosmos по высоте: ${height}`);
    const rawBlock = await this.cosmosRpcService.getBlockByHeight(height);

    return mapCosmosBlock(rawBlock);
  }

  async getTransaction(hash: string): Promise<AppCosmosTransaction> {
    this.logger.debug(`Поиск транзакции Cosmos по хешу: ${hash}`);
    const rawTx = await this.cosmosRpcService.getTransactionByHash(hash);

    const height = parseInt(rawTx.height, 10);

    const blockData = await this.getBlock(height);

    return mapCosmosTransaction(rawTx, blockData, hash);
  }
}
