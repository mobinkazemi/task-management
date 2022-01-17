import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config.schema';
@Module({
  imports: [
    TasksModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      isGlobal: true,
      validationSchema,
    }),
  ],
})
export class AppModule {}
