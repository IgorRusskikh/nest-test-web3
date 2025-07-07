import { EvmBlock, EvmTransaction } from '@/types/evm.types';

/**
 * Интерфейс для взаимодействия с EVM JSON-RPC нодой
 * Предоставляет низкоуровневые методы для получения данных из блокчейна
 */
export interface IEvmRpcService {
  /**
   * Получает информацию о блоке по его номеру
   * Выполняет JSON-RPC запрос eth_getBlockByNumber
   *
   * @param height - Номер блока (высота)
   * @returns Promise с данными блока в сыром формате от RPC
   * @throws Error если блок не найден или произошла ошибка RPC
   *
   * @example
   * const block = await evmRpcService.getBlockByNumber(12345);
   * console.log(block.hash); // "0x..."
   */
  getBlockByNumber(height: number): Promise<EvmBlock>;

  /**
   * Получает информацию о транзакции по её хешу
   * Выполняет JSON-RPC запрос eth_getTransactionByHash
   *
   * @param hash - Хеш транзакции в формате "0x..."
   * @returns Promise с данными транзакции в сыром формате от RPC
   * @throws Error если транзакция не найдена или произошла ошибка RPC
   *
   * @example
   * const tx = await evmRpcService.getTransactionByHash("0x123...");
   * console.log(tx.from); // "0x..."
   */
  getTransactionByHash(hash: string): Promise<EvmTransaction>;
}
