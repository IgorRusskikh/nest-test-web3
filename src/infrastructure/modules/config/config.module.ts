import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  exports: [ConfigModule, ConfigService],
})
export class CustomConfigModule {}
