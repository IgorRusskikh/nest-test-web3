import { DomainException } from '../domain.exception';

export class EvmRpcException extends DomainException {
  readonly code = 'EVM_RPC_ERROR';
  readonly statusCode = 502;

  constructor(message: string, context?: Record<string, any>) {
    super(`EVM RPC Error: ${message}`, context);
  }
}

export class EvmBlockNotFoundException extends DomainException {
  readonly code = 'EVM_BLOCK_NOT_FOUND';
  readonly statusCode = 404;

  constructor(height: number, context?: Record<string, any>) {
    super(`Блок с высотой ${height} не найден`, { height, ...context });
  }
}

export class EvmTransactionNotFoundException extends DomainException {
  readonly code = 'EVM_TRANSACTION_NOT_FOUND';
  readonly statusCode = 404;

  constructor(hash: string, context?: Record<string, any>) {
    super(`Транзакция с хешем ${hash} не найдена`, { hash, ...context });
  }
}
