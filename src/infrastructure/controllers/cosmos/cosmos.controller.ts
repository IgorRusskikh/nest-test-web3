import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CosmosUsecase } from '@/app/usecases/cosmos/cosmos.usecase';
import { GetCosmosBlockDto } from '@/app/dto/cosmos/get-cosmos-block.dto';
import { GetCosmosTransactionDto } from '@/app/dto/cosmos/get-cosmos-transaction.dto';

@Controller('cosmos')
@UsePipes(new ValidationPipe({ transform: true }))
export class CosmosController {
  constructor(private readonly cosmosUsecase: CosmosUsecase) {}

  @Get('block/:height')
  getBlock(@Param() params: GetCosmosBlockDto) {
    return this.cosmosUsecase.getBlock(params.height);
  }

  @Get('transactions/:hash')
  getTransaction(@Param() params: GetCosmosTransactionDto) {
    return this.cosmosUsecase.getTransaction(params.hash);
  }
}
