import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthStrategy } from './users.auth-strategy';

@Module({
  providers: [UsersService, ...userProviders, UserAuthStrategy],
  controllers: [UsersController],
  imports: [
    DatabaseModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'stupid-secret',
      signOptions: { expiresIn: 3600 * 4 },
    }),
  ],
  exports: [UserAuthStrategy, PassportModule],
})
export class UsersModule {}
