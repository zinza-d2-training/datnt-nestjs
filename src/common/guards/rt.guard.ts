import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt_rt') {
  constructor() {
    super();
  }
}
