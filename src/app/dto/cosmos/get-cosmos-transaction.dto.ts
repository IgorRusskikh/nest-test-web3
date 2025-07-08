import { IsHexadecimal, IsString, IsUppercase, Length } from 'class-validator';

export class GetCosmosTransactionDto {
  @IsString()
  @IsUppercase({ message: 'Хеш транзакции должен быть в верхнем регистре' })
  @IsHexadecimal({ message: 'Хеш транзакции должен быть в формате hex' })
  @Length(64, 64, { message: 'Длина хеша транзакции должна быть 64 символа' })
  hash!: string;
}
