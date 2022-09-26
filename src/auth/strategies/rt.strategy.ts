import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DecodedDataJwt } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt_rt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rt_secret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: DecodedDataJwt) {
    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();
    return {
      rfToken: refreshToken,
      userId: payload.sub,
      email: payload.email,
    };
  }
}
