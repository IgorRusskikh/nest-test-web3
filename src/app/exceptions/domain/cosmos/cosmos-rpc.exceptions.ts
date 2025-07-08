import { DomainException } from '../domain.exception';

export class CosmosRpcException extends DomainException {
  readonly code = 'COSMOS_RPC_ERROR';
  readonly statusCode = 502;

  constructor(message: string, context?: Record<string, any>) {
    super(`Cosmos RPC Error: ${message}`, context);
  }
}

export class CosmosBlockNotFoundException extends DomainException {
  readonly code = 'COSMOS_BLOCK_NOT_FOUND';
  readonly statusCode = 404;

  constructor(height: number, context?: Record<string, any>) {
    super(`Блок Cosmos с высотой ${height} не найден`, { height, ...context });
  }
}

export class CosmosTransactionNotFoundException extends DomainException {
  readonly code = 'COSMOS_TRANSACTION_NOT_FOUND';
  readonly statusCode = 404;

  constructor(hash: string, context?: Record<string, any>) {
    super(`Транзакция Cosmos с хешем ${hash} не найдена`, { hash, ...context });
  }
}
