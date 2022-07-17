import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { User } from '@/modules/users/domain/entities/user/user';
import { IPaginatedRequest } from '@/shared/interfaces/paginated-request.interface';
import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';
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

  async findByPhone(phone: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.phone === phone);
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findAll({
    limit = 10,
    page = 1,
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    const usersOnPage = this.users.slice((page - 1) * limit, page * limit);
    return {
      limit: Number(limit),
      page: Number(page),
      total: this.users.length,
      results: usersOnPage.map((user) => UserMapper.toApplication(user)),
    };
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
