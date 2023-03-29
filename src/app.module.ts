import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import envConfig from './shared/config/env.config'
import { ApiModule } from './api/api.module'
const ENV = process.env.NODE_ENV

/**
 * App module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [envConfig],
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
