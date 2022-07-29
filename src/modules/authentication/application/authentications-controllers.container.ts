import * as awilix from 'awilix';
import { LogInController } from './controllers/log-in.controller';
import { LogOutController } from './controllers/log-out.controller';
import { RefreshAuthenticationController } from './controllers/refresh-authentication.controller';

export type AuthenticationsControllersCradle = {
  logInController: LogInController;
  refreshAuthenticationController: RefreshAuthenticationController;
  logOutController: LogOutController;
};

export const authenticationsControllersContainer = {
  logInController: awilix.asClass(LogInController).singleton(),
  refreshAuthenticationController: awilix
    .asClass(RefreshAuthenticationController)
    .singleton(),
  logOutController: awilix.asClass(LogOutController).singleton(),
};
