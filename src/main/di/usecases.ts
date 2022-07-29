import {
  authenticationsUseCasesContainer,
  AuthenticationsUseCasesCradle,
} from '@/modules/authentication/application/authentications-usecases.container';
import {
  usersUseCasesContainer,
  UsersUseCasesCradle,
} from '@/modules/users/application/users-usecases.container';

export type UseCasesCradle = UsersUseCasesCradle &
  AuthenticationsUseCasesCradle;

export const useCasesContainer = {
  ...usersUseCasesContainer,
  ...authenticationsUseCasesContainer,
};
