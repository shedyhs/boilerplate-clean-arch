import * as awilix from 'awilix';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { MockUsersRepository } from './mocks/mock-users.repository';

export type UsersRepositoriesCradle = {
  usersRepository: IUsersRepository;
};

export const usersRepositoriesContainer = {
  usersRepository: awilix.asClass(MockUsersRepository).singleton(),
};
