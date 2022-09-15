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
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UsersService } from '../services/user.service';
@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get('/get-all')
  getAll() {
    return this.userServices.getUsers();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userServices.getUserById(id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() user: CreateUserDto) {
    return this.userServices.createUser(user);
  }

  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userServices.updateUser(id, updateUser);
  }

  @Delete('/delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userServices.removeUser(id);
  }
}
