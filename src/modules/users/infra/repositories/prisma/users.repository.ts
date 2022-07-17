import prismaClient from '@/shared/infra/database/prisma-client';
import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { User } from '@/modules/users/domain/entities/user/user';
import { IPaginatedRequest } from '@/shared/interfaces/paginated-request.interface';
import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';
import { IUsersRepository } from '../interfaces/users-repository.interface';

export class PgUsersRepository implements IUsersRepository {
  async create(user: User): Promise<void> {
    await prismaClient.user.create({
      data: UserMapper.toRepository(user),
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const foundUser = await prismaClient.user.findUnique({ where: { id } });
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findAll({
    page = 1,
    limit = 10,
  }: IPaginatedRequest): Promise<IPaginatedResponse<User>> {
    const foundUsers = await prismaClient.user.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });
    const total = await prismaClient.user.count();
    return {
      limit,
      page,
      total,
      results: foundUsers.map((foundUser) =>
        UserMapper.toApplication(foundUser),
      ),
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = await prismaClient.user.findUnique({ where: { email } });
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const foundUser = await prismaClient.user.findUnique({ where: { phone } });
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async update(user: User): Promise<void> {
    await prismaClient.user.update({
      where: { id: user.id },
      data: UserMapper.toRepository(user),
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: { id },
    });
  }
}
