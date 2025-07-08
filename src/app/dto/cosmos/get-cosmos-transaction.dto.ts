import { IsHexadecimal, IsString } from 'class-validator';

export class GetCosmosTransactionDto {
  @IsString()
  @IsHexadecimal({ message: 'Хеш транзакции должен быть в формате hex' })
  hash!: string;
}
