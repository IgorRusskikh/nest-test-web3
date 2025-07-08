import { AppCosmosBlock, AppCosmosTransaction, CosmosTxEvent } from '@types';
import { Injectable, Logger } from '@nestjs/common';

import { CosmosRpcService } from '@/infrastructure/services/cosmos-rpc/cosmos-rpc.service';
import { ICosmosUsecase } from '@/interfaces/usecases/cosmos.usecase.interface';

@Injectable()
export class CosmosUsecase implements ICosmosUsecase {
  private readonly logger = new Logger(CosmosUsecase.name);

  constructor(private readonly cosmosRpcService: CosmosRpcService) {}

  async getBlock(height: number): Promise<AppCosmosBlock> {
    this.logger.debug(`Поиск блока Cosmos по высоте: ${height}`);
    const rawBlock = await this.cosmosRpcService.getBlockByHeight(height);

    return {
      height: parseInt(rawBlock.block.header.height, 10),
      time: rawBlock.block.header.time,
      hash: rawBlock.block_id.hash,
      proposerAddress: rawBlock.block.header.proposer_address,
    };
  }

  async getTransaction(hash: string): Promise<AppCosmosTransaction> {
    this.logger.debug(`Поиск транзакции Cosmos по хешу: ${hash}`);
    const rawTx = await this.cosmosRpcService.getTransactionByHash(hash);

    const height = parseInt(rawTx.height, 10);

    const blockData = await this.getBlock(height);
    const sender = this.findSenderInEvents(rawTx.tx_result.events);

    return {
      hash: hash,
      height: height,
      time: blockData.time,
      gasUsed: rawTx.tx_result.gas_used,
      gasWanted: rawTx.tx_result.gas_wanted,
      fee: rawTx.tx.auth_info.fee.amount,
      sender: sender,
    };
  }

  private findSenderInEvents(events: CosmosTxEvent[]): string {
    for (const event of events) {
      if (event.type === 'message') {
        for (const attr of event.attributes) {
          if (Buffer.from(attr.key, 'base64').toString('utf-8') === 'sender') {
            return Buffer.from(attr.value, 'base64').toString('utf-8');
          }
        }
      }
    }

    return 'Отправитель не найден';
  }
}
