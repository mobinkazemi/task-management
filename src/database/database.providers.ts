import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Task } from '../tasks/tasks.entity.sequelize';
import { ConfigService, ConfigModule } from '@nestjs/config';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      });
      sequelize.addModels([Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
