import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserSignin, UserSignup } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  signin(@Body(new ValidationPipe()) payload: UserSignin) {
    return this.authService.signin(payload);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body(new ValidationPipe()) payload: UserSignup) {
    return this.authService.signup(payload);
  }

  @UseGuards(AuthGuard('jwt_at'))
  @Post('logout')
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['userId']);
  }
}
