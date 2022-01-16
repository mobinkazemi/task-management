import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './users.entity';
import { UserPayloadInterface } from './users.payload-interface';
@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {
    super({
      secretOrKey: 'stupid-secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: UserPayloadInterface): Promise<User> {
    const user = await this.usersRepository.findByPk(payload.userId, {
      raw: true,
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
