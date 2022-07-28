import { User as UserEntity } from '@/modules/users/domain/entities/user/user';
import { prismaMock } from '@/shared/infra/database/mocks/prisma-mock';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { PgUsersRepository } from './users.repository';
import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { UserModel } from '../models/user.model';

describe('UsersRepository', () => {
  let userEntity: UserEntity;
  let userRepository: UserModel;
  let sut: IUsersRepository;

  beforeEach(() => {
    sut = new PgUsersRepository();
    userEntity = UserMapper.toDomain(userMockData);
    userRepository = UserMapper.toRepository(userEntity);
  });

  it('Should create user', async () => {
    await sut.create(userEntity);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: userRepository,
    });
  });

  it('Should find user with findById', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userRepository);
    const foundUser = await sut.findById(userEntity.id);
    expect(foundUser).toEqual(userEntity);
  });

  it('Should not find user with findById', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const foundUser = await sut.findById(userEntity.id);
    expect(foundUser).toBeUndefined();
  });

  it('Should be able to find user with findByEmail', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userRepository);
    const foundUser = await sut.findByEmail(userEntity.email);
    expect(foundUser).toEqual(userEntity);
  });

  it('Should not be able to find user with findByEmail', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const foundUser = await sut.findByEmail(userEntity.email);
    expect(foundUser).toBeUndefined();
  });

  it('Should be able to find user with findByPhone', async () => {
    prismaMock.user.findFirst.mockResolvedValue(userRepository);
    const foundUser = await sut.findByPhone(userEntity.phone);
    expect(foundUser).toEqual(userEntity);
  });

  it('Should not be able to find user with findByPhone', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);
    const foundUser = await sut.findByPhone(userEntity.phone);
    expect(foundUser).toBeUndefined();
  });

  it('Should be able to find all users with findAll', async () => {
    prismaMock.user.findMany.mockResolvedValue([userRepository]);
    const foundUsers = await sut.findAll({});
    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect(foundUsers).toEqual([userEntity]);
    expect(foundUsers).toHaveLength(1);
  });

  it('Should be able to return empty array same if not have users created with findAll', async () => {
    prismaMock.user.findMany.mockResolvedValue([]);
    const foundUsers = await sut.findAll({});
    expect(prismaMock.user.findMany).toHaveBeenCalled();
    expect(foundUsers).toEqual([]);
    expect(foundUsers).toHaveLength(0);
  });

  it('Should be able to update user with update', async () => {
    await sut.update(userEntity);
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: userEntity.id },
      data: userRepository,
    });
  });

  it('Should be able to delete user with delete', async () => {
    await sut.delete(userEntity.id);
    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: userEntity.id },
    });
  });
});
