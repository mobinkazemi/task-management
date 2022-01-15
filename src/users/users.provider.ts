import { User } from './users.entity';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
