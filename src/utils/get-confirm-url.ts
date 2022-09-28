export const getConfirmUrlUserSignup = (email: string, token: string) => {
  return `${process.env.FRONTEND_URL}/auth/confirm?email=${email}&token=${token}`;
};

export const getConfirmUrlUserResetPassword = (
  email: string,
  token: string,
) => {
  return `${process.env.FRONTEND_URL}/auth/confirm/reset-password?email=${email}&token=${token}`;
};
