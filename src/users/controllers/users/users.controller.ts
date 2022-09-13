import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/typeorm';
import { UsersService } from '../../services/users/users.service';
import { CreateUserDto, UpdateUserDto } from './../../dtos';
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/get-all')
  getAllUser(): Promise<User[]> {
    return this.userService.fetchAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUserDb(id, updateUser);
  }

  @Delete('/delete/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
