import prismaClient from '@/shared/infra/database/prisma-client';
import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { User } from '@/modules/users/domain/entities/user/user';
import { IShowAllUsersDTO } from '@/modules/users/application/usecases/dtos/show-all-users-dto';
import { IPhone } from '@/modules/users/domain/entities/user/value-objects/phone';

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
    ddi,
    ddd,
    createdAfter,
    createdBefore,
    updatedAfter,
    updatedBefore,
  }: IShowAllUsersDTO): Promise<User[]> {
    const foundUsers = await prismaClient.user.findMany({
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      where: {
        createdAt: {
          gte: createdAfter,
          lte: createdBefore,
        },
        updatedAt: {
          gte: updatedAfter,
          lte: updatedBefore,
        },
        ddi: {
          equals: ddi,
        },
        ddd: {
          equals: ddd,
        },
      },
    });

    return foundUsers.map((foundUser) => UserMapper.toApplication(foundUser));
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = await prismaClient.user.findUnique({ where: { email } });
    if (!foundUser) {
      return undefined;
    }
    return UserMapper.toApplication(foundUser);
  }

  async findByPhone(phone: IPhone): Promise<User | undefined> {
    const foundUser = await prismaClient.user.findFirst({
      where: { ddi: phone.ddi, ddd: phone.ddd, number: phone.number },
    });
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
