import {
  usersUseCasesContainer,
  UsersUseCasesCradle,
} from '@/modules/users/application/users-usecases.container';

export type UseCasesCradle = UsersUseCasesCradle;

export const useCasesContainer = {
  ...usersUseCasesContainer,
};
