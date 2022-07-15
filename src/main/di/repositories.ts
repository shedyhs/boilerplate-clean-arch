import {
  usersRepositoriesContainer,
  UsersRepositoriesCradle,
} from '@/modules/users/infra/repositories/users-repositories.container';

export type RepositoriesCradle = UsersRepositoriesCradle;

export const repositoriesContainer = {
  ...usersRepositoriesContainer,
};
