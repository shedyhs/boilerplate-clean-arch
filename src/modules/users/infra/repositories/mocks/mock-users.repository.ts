import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { IShowAllUsersDTO } from '@/modules/users/application/usecases/dtos/show-all-users-dto';
import { User } from '@/modules/users/domain/entities/user/user';
import { IPhone } from '@/modules/users/domain/entities/user/value-objects/phone';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { UserModel } from '../models/user.model';

export class MockUsersRepository implements IUsersRepository {
  users: UserModel[] = [];

  async create(user: User): Promise<void> {
    const userModel = UserMapper.toRepository(user);
    this.users.push(userModel);
  }

  async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email);
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findByPhone(phone: IPhone): Promise<User | undefined> {
    const foundUser = this.users.find(
      (user) =>
        user.ddi === phone.ddi &&
        user.ddd === phone.ddd &&
        user.number === phone.number,
    );
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findAll({
    limit = 10,
    page = 1,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
    ddd,
    ddi,
  }: IShowAllUsersDTO): Promise<User[]> {
    const matchUsers = this.users.filter((user) => {
      if (createdAfter && user.createdAt.getTime() < createdAfter.getTime()) {
        return false;
      }
      if (createdBefore && user.createdAt.getTime() > createdBefore.getTime()) {
        return false;
      }
      if (updatedAfter && user.updatedAt.getTime() < updatedAfter.getTime()) {
        return false;
      }
      if (updatedBefore && user.updatedAt.getTime() > updatedBefore.getTime()) {
        return false;
      }
      if (ddd && user.ddd !== ddd) {
        return false;
      }
      if (ddi && user.ddi !== ddi) {
        return false;
      }
      return true;
    });

    const usersOnPage = matchUsers.slice((page - 1) * limit, page * limit);
    return usersOnPage.map((user) => UserMapper.toApplication(user));
  }

  async update(user: User): Promise<void> {
    const foundUser = this.users.find(
      (userToUpdate) => userToUpdate.id === user.id,
    ) as UserModel;
    const index = this.users.indexOf(foundUser);
    this.users[index] = UserMapper.toRepository(user);
  }

  async delete(id: string): Promise<void> {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      return;
    }
    const index = this.users.indexOf(foundUser);
    this.users.splice(index, 1);
  }
}
