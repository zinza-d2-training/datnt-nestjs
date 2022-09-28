import { RefreshTokenGuard } from './../common/guards/rt.guard';
import { AccessTokenGuard } from 'src/common/guards/at.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  UserForgotPassword,
  UserResetPassword,
  UserSignin,
  UserSignup,
} from './dtos';
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

  @Get('confirm')
  confirm(@Query('email') email: string, @Query('token') token: string) {
    return this.authService.confirm(email, token);
  }

  @Get('confirm/reset-password')
  confirmResetPassword(
    @Query('email') email: string,
    @Query('token') token: string,
  ) {
    return this.authService.confirmResetPassword(email, token);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body(new ValidationPipe()) { emailAddress }: UserForgotPassword,
  ) {
    return this.authService.forgotPassword(emailAddress);
  }

  @Post('reset-password')
  resetPassword(@Body(new ValidationPipe()) payload: UserResetPassword) {
    return this.authService.resetPassword(payload);
  }
}
