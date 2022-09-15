import { CreateUserParams } from './../../user/utils/types';
import { Injectable } from '@nestjs/common';
import { comparePassword } from '../../utils/bcrypt';
import { UsersService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwtServices: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('run validate user function');
    const user = await this.userServices.getUserByName(username);
    if (!user) return null;
    const isMatch = await comparePassword(pass, user?.password);
    if (!isMatch) return null;
    const { password, ...result } = user;
    return result;
  }

  async login(user) {
    const accessToken = await this.jwtServices.sign(user, { secret: 'jfdkj' });
    return { user, accessToken };
  }
}
