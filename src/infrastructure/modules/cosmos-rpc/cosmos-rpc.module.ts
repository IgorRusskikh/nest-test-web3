import { CosmosController } from '@controllers';
import { CosmosRpcService } from '@services';
import { CosmosUsecase } from '@usecases';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [CosmosRpcService, CosmosUsecase],
  controllers: [CosmosController],
})
export class CosmosRpcModule {}
