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
import { CreateUserDto } from '../../user/dtos';

@Controller('auth')
export class AuthController {
  constructor(private userServices: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() user: CreateUserDto) {
    return this.userServices.createUser(user);
  }
}
