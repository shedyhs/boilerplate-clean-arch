import * as awilix from 'awilix';
import { IAuthTokensRepository } from './interfaces/auth-tokens-repository.interface';
import { PgAuthTokensRepository } from './prisma/auth-tokens.repository';

export type AuthTokensRepositoriesCradle = {
  authTokensRepository: IAuthTokensRepository;
};

export const authTokensRepositoriesContainer = {
  authTokensRepository: awilix.asClass(PgAuthTokensRepository).singleton(),
};
