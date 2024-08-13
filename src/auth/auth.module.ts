import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtInterceptor } from './jwt.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ebryx125',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtInterceptor,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
