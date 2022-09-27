import { UserSerialization } from './dtos/index';
import { JwtService } from '@nestjs/jwt';
import { compareHash, hash } from './../utils/bcrypt';
import {
  ForbiddenException,
  Injectable,
  HttpException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/index';
import { Repository } from 'typeorm';
import { UserSignup, UserSignin, Tokens } from './types';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signin(payload: UserSignin) {
    const { emailAddress, password } = payload;
    const user = await this.userRepository.findOneBy({ emailAddress });
    if (!user) throw new ForbiddenException('Access denied');
    const isMatchPassword = await compareHash(password, user.password);
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
    const userExist = await this.userRepository.findOneBy({
      emailAddress: payload.emailAddress,
    });
    if (userExist)
      throw new HttpException(
        'Email already with another user',
        HttpStatus.BAD_REQUEST,
      );

    const password = await hash(payload.password);
    const userInstance = this.userRepository.create({
      ...payload,
      password,
    });

    const user = await this.userRepository.save(userInstance);
    const emailHash = await hash(user.emailAddress);
    await this.mailService.sendUserConfirmation(user, emailHash);

    // const tokens: Tokens = await this.getTokens(user.id, user.emailAddress);
    // const { accessToken, refreshToken } = tokens;
    // await this.updateRefreshToken(user.id, refreshToken);

    return {
      message: 'An email sent to your account please verify',
    };
  }

  async logout(userId) {
    await this.userRepository.update({ id: userId }, { refreshToken: '' });
  }

  async refreshToken(userId, rfToken) {
    if (!userId) throw new ForbiddenException('Access denied');
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new ForbiddenException('Access denied');
    if (user.refreshToken !== rfToken)
      throw new UnauthorizedException('Refresh token invalid!');
    const { accessToken, refreshToken } = await this.getTokens(
      userId,
      user.emailAddress,
    );

    await this.updateRefreshToken(userId, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async confirm(email: string, token: string) {
    const user = await this.userRepository.findOneBy({ emailAddress: email });
    if (!user)
      throw new HttpException('Verify url invalid', HttpStatus.BAD_REQUEST);
    const isMatch = compareHash(email, token);
    if (!isMatch)
      throw new HttpException('Verify url invalid', HttpStatus.BAD_REQUEST);

    return 'verify success';
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
