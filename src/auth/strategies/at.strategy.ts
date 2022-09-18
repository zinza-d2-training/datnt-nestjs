import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { DecodedDataJwt } from '../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt_at') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'at_secret',
    });
  }

  async validate(payload: DecodedDataJwt) {
    return { userId: payload.sub, email: payload.email };
  }
}
