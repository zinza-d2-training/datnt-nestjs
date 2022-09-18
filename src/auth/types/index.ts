export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserLoginSuccess {
  email: string;
  username: string;
}

export interface UserSignup {
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

export interface UserSignin {
  emailAddress: string;
  password: string;
}

export interface DecodedDataJwt {
  sub: string;
  email: string;
}
