import { UserSerialization } from './dtos/index';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashPassword } from './../utils/bcrypt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/index';
import { Repository } from 'typeorm';
import { UserSignup, UserSignin, Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signin(payload: UserSignin) {
    const { emailAddress, password } = payload;
    const user = await this.userRepository.findOneBy({ emailAddress });
    if (!user) throw new ForbiddenException('Access denied');
    const isMatchPassword = comparePassword(password, user.password);
    if (!isMatchPassword) throw new ForbiddenException('Access denied');

    const tokens: Tokens = await this.getTokens(user.id, user.emailAddress);
    const { accessToken, refreshToken } = tokens;
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      user: new UserSerialization(user),
      accessToken,
      refreshToken,
    };
  }

  async signup(payload: UserSignup) {
    const password = await hashPassword(payload.password);
    const userInstance = this.userRepository.create({
      ...payload,
      password,
    });
    const user = await this.userRepository.save(userInstance);
    const tokens: Tokens = await this.getTokens(user.id, user.emailAddress);
    const { accessToken, refreshToken } = tokens;
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      user: new UserSerialization(user),
      accessToken,
      refreshToken,
    };
  }

  logout(userId) {
    this.userRepository.update({ id: userId }, { refreshToken: '' });
  }

  async getTokens(userId, email): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 15, secret: 'at_secret' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 60 * 24 * 7, secret: 'rt_secret' },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }

  async updateRefreshToken(userId, newRt) {
    return await this.userRepository.update(
      { id: userId },
      { refreshToken: newRt },
    );
  }
}
