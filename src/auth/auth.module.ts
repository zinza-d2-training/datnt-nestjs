import { LocalStrategy } from './../utils/local.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
