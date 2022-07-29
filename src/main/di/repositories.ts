import {
  authTokensRepositoriesContainer,
  AuthTokensRepositoriesCradle,
} from '@/modules/authentication/infra/repositories/auth-tokens-repositories.container';
import {
  usersRepositoriesContainer,
  UsersRepositoriesCradle,
} from '@/modules/users/infra/repositories/users-repositories.container';

export type RepositoriesCradle = UsersRepositoriesCradle &
  AuthTokensRepositoriesCradle;

export const repositoriesContainer = {
  ...usersRepositoriesContainer,
  ...authTokensRepositoriesContainer,
};
