import { EvmBlock, EvmRpcPayload, EvmTransaction } from '@types';
import {
  EvmBlockNotFoundException,
  EvmRpcException,
  EvmTransactionNotFoundException,
} from '@exceptions';
import { Injectable, Logger } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IEvmRpcService } from '@/interfaces/services/evm-rpc.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EvmRpcService implements IEvmRpcService {
  private readonly logger = new Logger(EvmRpcService.name);
  private readonly rpcUrl: string;

  private static readonly JSON_RPC_VERSION = '2.0';
  private static readonly REQUEST_ID = 1;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const rpcUrl = this.configService.get<string>('EVM_RPC_URL');

    if (!rpcUrl) {
      throw new Error('EVM_RPC_URL не определен в конфигурации');
    }

    this.rpcUrl = rpcUrl;
  }

  async getBlockByNumber(height: number): Promise<EvmBlock> {
    this.logger.debug(`Запрос блока по высоте: ${height}`);

    const hexHeight = '0x' + height.toString(16);

    try {
      const result = await this.sendRpcRequest<EvmBlock>(
        'eth_getBlockByNumber',
        [hexHeight, false],
      );

      if (!result) {
        throw new EvmBlockNotFoundException(height);
      }
      return result;
    } catch (error) {
      this.logger.error(`Ошибка при получении блока ${height}:`, error);
      throw error;
    }
  }

  async getTransactionByHash(hash: string): Promise<EvmTransaction> {
    this.logger.debug(`Запрос транзакции по хешу: ${hash}`);

    try {
      const result = await this.sendRpcRequest<EvmTransaction>(
        'eth_getTransactionByHash',
        [hash],
      );

      if (!result) {
        throw new EvmTransactionNotFoundException(hash);
      }

      return result;
    } catch (error) {
      this.logger.error(`Ошибка при получении транзакции ${hash}:`, error);
      throw error;
    }
  }

  private async sendRpcRequest<T>(
    method: string,
    params: (string | number | boolean)[],
  ): Promise<T | null> {
    const payload: EvmRpcPayload = {
      jsonrpc: EvmRpcService.JSON_RPC_VERSION,
      method,
      params,
      id: EvmRpcService.REQUEST_ID,
    };

    let response;

    try {
      response = await firstValueFrom(
        this.httpService.post(this.rpcUrl, payload, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    } catch (error) {
      throw new EvmRpcException('Сетевая ошибка или ошибка запроса к RPC', {
        originalError: error,
      });
    }

    if (response.data.error) {
      throw new EvmRpcException(response.data.error.message, {
        rpcError: response.data.error,
      });
    }

    return response.data.result || null;
  }
}
