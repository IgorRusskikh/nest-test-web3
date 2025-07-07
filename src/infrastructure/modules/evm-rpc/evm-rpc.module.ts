import { EvmController } from '@/infrastructure/controllers/evm/evm.controller';
import { EvmRpcService } from '@services';
import { EvmUsecase } from '@/app/usecases/evm/evm.usecase';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [EvmRpcService, EvmUsecase],
  controllers: [EvmController],
})
export class EvmRpcModule {}
