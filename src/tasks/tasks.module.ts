import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service.sequelize';
import { tasksProviders } from './tasks.provider.sequelize';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
})
export class TasksModule {}
