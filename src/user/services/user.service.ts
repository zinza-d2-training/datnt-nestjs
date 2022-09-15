import { hashPassword, comparePassword } from './../../utils/bcrypt';
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

  getUsers() {
    return this.usersRepository.find();
  }

  async createUser(user: CreateUserParams) {
    const password = await hashPassword(user.password);
    const newUser = this.usersRepository.create({
      ...user,
      password,
    });
    return this.usersRepository.save(newUser);
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  updateUser(id: number, user: UpdateUserParams) {
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

  getUserByName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
