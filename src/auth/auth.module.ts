import { JwtService, JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './../utils/local.strategy';
import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      // secretOrPrivateKey: 'fjaskdj',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
