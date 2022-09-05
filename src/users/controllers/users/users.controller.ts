import { Controller, Get, Patch, Delete, Post } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/get-all')
  getAllUser() {
    return this.userService.fetchAllUser();
  }

  @Post()
  createUser() {
    return this.userService.createUser();
  }

  @Patch()
  updateUser() {
    return this.userService.updateUser();
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }
}
