import { IsHexadecimal, IsString, Length } from 'class-validator';

export class GetEvmTransactionDto {
  @IsString()
  @IsHexadecimal({ message: 'Хеш транзакции должен быть в формате hex' })
  @Length(66, 66, { message: 'Длина хеша транзакции должна быть 66 символов' })
  hash!: string;
}
