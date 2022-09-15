import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../user/services/user.service';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private userServices: UsersService,
    private authServices: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const user = await this.authServices.login(req.user);
    return user;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() user: CreateUserDto) {
    return this.userServices.createUser(user);
  }
}
