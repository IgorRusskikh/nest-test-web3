import { CustomConfigModule } from '../config/config.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CustomConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
