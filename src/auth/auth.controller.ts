import { RefreshTokenGuard } from './../common/guards/rt.guard';
import { AccessTokenGuard } from './../common/guards/at.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserSignin, UserSignup } from './dtos';
import { GetUserBy } from '../common/decorator/get-user.decorator';

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

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@GetUserBy('userId') userId: string, @Res() res: Response) {
    await this.authService.logout(userId);
    res
      .status(HttpStatus.OK)
      .json({ message: 'logout success!', status: HttpStatus.OK });
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  refreshToken(
    @GetUserBy('userId') userId: string,
    @GetUserBy('rfToken') rfToken: string,
  ) {
    return this.authService.refreshToken(userId, rfToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile() {
    console.log('profile user');
  }
}
