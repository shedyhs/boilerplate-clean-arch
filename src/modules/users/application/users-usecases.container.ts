import * as awilix from 'awilix';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { ICreateUserUseCase } from './usecases/interfaces/create-user-usecase.interface';
import { IDeleteUserUseCase } from './usecases/interfaces/delete-user-usecase.interface';
import { IShowAllUsersUseCase } from './usecases/interfaces/show-all-users-usecase.interface';
import { IShowUserUseCase } from './usecases/interfaces/show-user-usecase.interface';
import { IUpdateUserUseCase } from './usecases/interfaces/update-user-usecase.interface';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { ShowAllUsersUseCase } from './usecases/show-all-users.usecase';
import { ShowUserUseCase } from './usecases/show-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';

export type UsersUseCasesCradle = {
  createUserUseCase: ICreateUserUseCase;
  showUserUseCase: IShowUserUseCase;
  showAllUsersUseCase: IShowAllUsersUseCase;
  updateUserUseCase: IUpdateUserUseCase;
  deleteUserUseCase: IDeleteUserUseCase;
};

export const usersUseCasesContainer = {
  createUserUseCase: awilix.asClass(CreateUserUseCase).singleton(),
  showUserUseCase: awilix.asClass(ShowUserUseCase).singleton(),
  showAllUsersUseCase: awilix.asClass(ShowAllUsersUseCase).singleton(),
  updateUserUseCase: awilix.asClass(UpdateUserUseCase).singleton(),
  deleteUserUseCase: awilix.asClass(DeleteUserUseCase).singleton(),
};
