import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './users.entity';
import { UserPayloadInterface } from './users.payload-interface';
@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
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
