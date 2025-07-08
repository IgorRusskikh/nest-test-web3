import { CosmosBlockResponse, CosmosTxResult } from '@types';

/**
 * Интерфейс для взаимодействия с Cosmos REST/RPC нодой.
 * Предоставляет низкоуровневые методы для получения данных из блокчейна Cosmos.
 */
export interface ICosmosRpcService {
  /**
   * Получает информацию о блоке по его номеру (высоте) через Tendermint RPC.
   * Выполняет запрос к эндпоинту /block?height=...
   *
   * @param height - Номер блока (высота).
   * @returns Promise с данными блока в сыром формате от RPC.
   * @throws Error если блок не найден или произошла ошибка.
   */
  getBlockByHeight(height: number): Promise<CosmosBlockResponse>;

  /**
   * Получает информацию о транзакции по её хешу.
   * Выполняет запрос к эндпоинту /tx?hash=0x...
   *
   * @param hash - Хеш транзакции в формате "0x...".
   * @returns Promise с данными транзакции в сыром формате от RPC.
   * @throws Error если транзакция не найдена или произошла ошибка.
   */
  getTransactionByHash(hash: string): Promise<CosmosTxResult>;
}
