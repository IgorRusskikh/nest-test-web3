import { IDomainException } from '@/types/exceptions/domain';

export abstract class DomainException
  extends Error
  implements IDomainException
{
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(
    message: string,
    public readonly context?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
