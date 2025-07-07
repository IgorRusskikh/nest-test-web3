import { CosmosRpcModule } from '@/infrastructure/modules/cosmos-rpc/cosmos-rpc.module';
import { CustomConfigModule } from '@/infrastructure/modules/config/config.module';
import { EvmRpcModule } from '@/infrastructure/modules/evm-rpc/evm-rpc.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomConfigModule, EvmRpcModule, CosmosRpcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
