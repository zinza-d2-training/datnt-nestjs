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
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UsersService } from '../services/users.service';
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/get-all')
  getAll(): Promise<User[]> {
    return this.userService.fetchAllUser();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.updateUserDb(id, updateUser);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.removeUser(id);
  }
}
