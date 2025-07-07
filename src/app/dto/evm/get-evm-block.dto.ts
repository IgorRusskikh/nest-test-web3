import { IsInt, Matches, Min } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetEvmBlockDto {
  @Matches(/^[0-9]+$/, {
    message: 'Высота блока должна содержать только цифры',
  })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt({ message: 'Высота блока должна быть целым числом' })
  @Min(0, { message: 'Высота блока не может быть отрицательной' })
  height!: number;
}
