import { EvmBlockResponse, EvmTransactionResponse } from '@types';

/**
 * Интерфейс для бизнес-логики, связанной с EVM.
 * Определяет контракт для получения отформатированных данных о блоках и транзакциях.
 */
export interface IEvmUsecase {
  /**
   * Получает информацию о блоке EVM по его высоте и форматирует её
   * в соответствии со спецификацией API.
   *
   * @param height Номер блока.
   * @returns Promise с отформатированными данными о блоке.
   * @throws {EvmBlockNotFoundException} Если блок не найден.
   * @throws {EvmRpcException} Если произошла ошибка при запросе к RPC.
   */
  getBlock(height: number): Promise<EvmBlockResponse>;

  /**
   * Получает информацию о транзакции EVM по её хешу и форматирует её
   * в соответствии со спецификацией API.
   *
   * @param hash Хеш транзакции.
   * @returns Promise с отформатированными данными о транзакции.
   * @throws {EvmTransactionNotFoundException} Если транзакция не найдена.
   * @throws {EvmRpcException} Если произошла ошибка при запросе к RPC.
   */
  getTransaction(hash: string): Promise<EvmTransactionResponse>;
}
