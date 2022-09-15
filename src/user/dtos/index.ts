import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  username: string;
}
