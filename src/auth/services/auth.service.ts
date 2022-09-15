import { Injectable } from '@nestjs/common';
import { comparePassword } from '../../utils/bcrypt';
import { UsersService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userServices: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userServices.getUserByName(username);
    if (!user) return null;
    const isMatch = await comparePassword(pass, user?.password);
    if (!isMatch) return null;
    const { password, ...result } = user;
    return result;
  }
}
