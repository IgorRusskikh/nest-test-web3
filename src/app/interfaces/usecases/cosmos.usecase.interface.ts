import { AppCosmosBlock, AppCosmosTransaction } from '@types';

/**
 * Интерфейс для бизнес-логики, связанной с Cosmos.
 * Определяет контракт для получения отформатированных данных о блоках и транзакциях.
 */
export interface ICosmosUsecase {
  /**
   * Получает информацию о блоке Cosmos по его высоте, форматирует
   * и возвращает в виде плоского объекта.
   *
   * @param height Номер блока.
   * @returns Promise с отформатированными данными о блоке.
   */
  getBlock(height: number): Promise<AppCosmosBlock>;

  /**
   * Получает информацию о транзакции Cosmos по её хешу, обогащает её
   * данными из блока (время) и парсит события для поиска отправителя.
   *
   * @param hash Хеш транзакции.
   * @returns Promise с отформатированными и обогащенными данными о транзакции.
   */
  getTransaction(hash: string): Promise<AppCosmosTransaction>;
}
