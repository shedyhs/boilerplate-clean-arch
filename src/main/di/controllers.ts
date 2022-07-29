import {
  authenticationsControllersContainer,
  AuthenticationsControllersCradle,
} from '@/modules/authentication/application/authentications-controllers.container';
import {
  usersControllersContainer,
  UsersControllersCradle,
} from '@/modules/users/application/users-controllers.container';

export type ControllersCradle = UsersControllersCradle &
  AuthenticationsControllersCradle;

export const controllersContainer = {
  ...usersControllersContainer,
  ...authenticationsControllersContainer,
};
