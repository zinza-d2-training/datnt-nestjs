import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsMatch } from '../../common/decorator/match.decorator';

export class UserSignup {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsMatch('password')
  confirmPassword: string;
}

export class UserSignin {
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UserSerialization {
  id: number;
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;

  constructor(partial: Partial<UserSerialization>) {
    Object.assign(this, partial);
  }
}