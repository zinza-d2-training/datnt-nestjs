import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export const hash = async (value: string) => {
  return await bcrypt.hash(value, saltOrRounds);
};

export const compareHash = async (value, hash) => {
  return await bcrypt.compare(value, hash);
};
