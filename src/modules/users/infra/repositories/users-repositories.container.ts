import * as awilix from 'awilix';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { PgUsersRepository } from './prisma/users.repository';

export type UsersRepositoriesCradle = {
  usersRepository: IUsersRepository;
};

export const usersRepositoriesContainer = {
  usersRepository: awilix.asClass(PgUsersRepository).singleton(),
};
