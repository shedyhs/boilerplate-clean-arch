import * as awilix from 'awilix';
import { ILogInUseCase } from './usecases/interfaces/log-in-usecase.interface';
import { ILogOutUseCase } from './usecases/interfaces/log-out-usecase.interface';
import { IRefreshAuthenticationUseCase } from './usecases/interfaces/refresh-authentication-usecase.dto';
import { LogInUseCase } from './usecases/log-in.usecase';
import { LogOutUseCase } from './usecases/log-out.usecase';
import { RefreshAuthenticationUseCase } from './usecases/refresh-authentication.usecase';

export type AuthenticationsUseCasesCradle = {
  logInUseCase: ILogInUseCase;
  refreshAuthenticationUseCase: IRefreshAuthenticationUseCase;
  logOutUseCase: ILogOutUseCase;
};

export const authenticationsUseCasesContainer = {
  logInUseCase: awilix.asClass(LogInUseCase).singleton(),
  refreshAuthenticationUseCase: awilix
    .asClass(RefreshAuthenticationUseCase)
    .singleton(),
  logOutUseCase: awilix.asClass(LogOutUseCase).singleton(),
};
