import { CosmosController } from '@/infrastructure/controllers/cosmos/cosmos.controller';
import { CosmosRpcService } from '../../services/cosmos-rpc/cosmos-rpc.service';
import { CosmosUsecase } from '@/app/usecases/cosmos/cosmos.usecase';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [CosmosRpcService, CosmosUsecase],
  controllers: [CosmosController],
})
export class CosmosRpcModule {}
