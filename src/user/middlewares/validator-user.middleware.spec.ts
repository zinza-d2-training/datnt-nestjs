import { ValidatorUserMiddleware } from './validator-user.middleware';

describe('ValidatorUserMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidatorUserMiddleware()).toBeDefined();
  });
});
