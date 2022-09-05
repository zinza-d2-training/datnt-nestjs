import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../typeorm/User';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  fetchAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }
  createUser() {
    return 'created user';
  }
  fetchUserById() {
    return 'user 1';
  }
  updateUser() {
    return 'updated user';
  }
  deleteUser() {
    return 'deleted user';
  }
}
