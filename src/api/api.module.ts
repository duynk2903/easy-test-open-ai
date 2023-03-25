import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { businessModule } from '../business-layer/business.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ChatController } from './controller/chat.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60000000s' },
    }),
  ],
  controllers: [AuthController, ChatController],
  providers: [...businessModule()],
})
export class ApiModule {}
