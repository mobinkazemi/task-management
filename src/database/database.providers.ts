import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Task } from '../tasks/tasks.entity.sequelize';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '2122',
        database: 'task-management',
      });
      sequelize.addModels([Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
