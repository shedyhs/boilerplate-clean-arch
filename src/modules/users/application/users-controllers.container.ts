import * as awilix from 'awilix';
import { CreateUserController } from './controllers/create-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { ShowUserController } from './controllers/show-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';

export type UsersControllersCradle = {
  createUserController: CreateUserController;
  showUserController: ShowUserController;
  updateUserController: UpdateUserController;
  deleteUserController: DeleteUserController;
};

export const usersControllersContainer = {
  createUserController: awilix.asClass(CreateUserController).singleton(),
  showUserController: awilix.asClass(ShowUserController).singleton(),
  updateUserController: awilix.asClass(UpdateUserController).singleton(),
  deleteUserController: awilix.asClass(DeleteUserController).singleton(),
};
