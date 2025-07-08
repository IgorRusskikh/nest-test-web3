import {
  CosmosBlockNotFoundException,
  CosmosRpcException,
  CosmosTransactionNotFoundException,
} from '@exceptions';
import {
  CosmosBlockResponse,
  CosmosTxResult,
  CosmosTxSearchResponse,
} from '@types';

import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ICosmosRpcService } from '@/interfaces/services/cosmos-rpc.interface';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CosmosRpcService implements ICosmosRpcService {
  private readonly rpcUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const rpcUrl = this.configService.get<string>('COSMOS_RPC_URL');

    if (!rpcUrl) {
      throw new Error('COSMOS_RPC_URL не определен в конфигурации');
    }

    this.rpcUrl = rpcUrl;
  }

  async getBlockByHeight(height: number): Promise<CosmosBlockResponse> {
    try {
      const result = await this.sendRequest<CosmosBlockResponse>(
        `/block?height=${height}`,
      );

      if (!result) {
        throw new CosmosBlockNotFoundException(height);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionByHash(hash: string): Promise<CosmosTxResult> {
    try {
      const formattedHash = hash.startsWith('0x') ? hash.substring(2) : hash;
      const result = await this.sendRequest<CosmosTxSearchResponse>(
        `/tx_search?query="tx.hash='${formattedHash}'"`,
      );

      if (!result || result.txs.length === 0) {
        throw new CosmosTransactionNotFoundException(hash);
      }

      const transaction = result.txs[0];

      if (!transaction) {
        throw new CosmosTransactionNotFoundException(hash);
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }

  private async sendRequest<T>(endpoint: string): Promise<T | null> {
    const url = `${this.rpcUrl}${endpoint}`;

    let response;

    try {
      response = await firstValueFrom(this.httpService.get(url));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null;
      }

      throw new CosmosRpcException('Сетевая ошибка или ошибка запроса к RPC', {
        originalError: error,
      });
    }

    if (response.data.error) {
      throw new CosmosRpcException(response.data.error.message, {
        rpcError: response.data.error,
      });
    }

    return response.data.result || response.data;
  }
}
