export interface CreateUserParams {
  username: string;
  password: string;
  emailAddress: string;
  confirmPassword: string;
}

export interface UpdateUserParams {
  username?: string;
}
