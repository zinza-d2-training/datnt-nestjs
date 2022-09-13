import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from '../utils/types';
import { Repository } from 'typeorm';
import { User } from '../../typeorm/User';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  fetchAllUser(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user: CreateUserParams) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async fetchUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  updateUserDb(id: number, user: UpdateUserParams) {
    const response = this.usersRepository.update({ id }, user);
    return response;
  }

  async removeUser(id) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);

    await this.usersRepository.delete(user);
    return { message: 'deleted user' };
  }
}
