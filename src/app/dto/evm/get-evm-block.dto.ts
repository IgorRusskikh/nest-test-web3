import { IsInt, Min } from 'class-validator';

import { Type } from 'class-transformer';

export class GetEvmBlockDto {
  @Type(() => Number)
  @IsInt({ message: 'Высота блока должна быть целым числом' })
  @Min(0, { message: 'Высота блока не может быть отрицательной' })
  height!: number;
}
