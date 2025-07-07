import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EvmUsecase } from '@/app/usecases/evm/evm.usecase';
import { GetEvmBlockDto } from '@/app/dto/evm/get-evm-block.dto';
import { GetEvmTransactionDto } from '@/app/dto/evm/get-evm-transaction.dto';

@Controller('evm')
@UsePipes(new ValidationPipe({ transform: true }))
export class EvmController {
  constructor(private readonly evmUsecase: EvmUsecase) {}

  @Get('block/:height')
  getBlock(@Param() params: GetEvmBlockDto) {
    return this.evmUsecase.getBlock(params.height);
  }

  @Get('transactions/:hash')
  getTransaction(@Param() params: GetEvmTransactionDto) {
    return this.evmUsecase.getTransaction(params.hash);
  }
}
