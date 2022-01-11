import { Task } from './tasks.entity.sequelize';

export const tasksProviders = [
  {
    provide: 'TASKS_REPOSITORY',
    useValue: Task,
  },
];
