import {
  usersControllersContainer,
  UsersControllersCradle,
} from '@/modules/users/application/users-controllers.container';

export type ControllersCradle = UsersControllersCradle;

export const controllersContainer = {
  ...usersControllersContainer,
};
