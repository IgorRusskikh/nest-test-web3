export interface IDomainException {
  readonly code: string;
  readonly statusCode: number;
  readonly message: string;
  readonly context?: Record<string, any> | undefined;
}
