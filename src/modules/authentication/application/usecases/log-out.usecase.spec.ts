import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { User } from '@/modules/users/domain/entities/user/user';
import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mocks/mock-users.repository';
import { ApplicationErrors } from '@/shared/application/application-error';
import { authenticationMockData } from '../../domain/entities/mocks/authentication.mock';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/mock-auth-tokens.repository';
import { ILogOutUseCase } from './interfaces/log-out-usecase.interface';
import { LogOutUseCase } from './log-out.usecase';

describe('LogOutUseCase', () => {
  let sut: ILogOutUseCase;
  let usersRepository: MockUsersRepository;
  let authTokensRepository: MockAuthTokensRepository;
  let user: User;

  beforeEach(async () => {
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new LogOutUseCase(authTokensRepository);

    await authTokensRepository.createOrUpdate({
      userId: authenticationMockData.user.id,
      accessToken: authenticationMockData.accessToken,
      refreshToken: authenticationMockData.refreshToken,
    });

    user = UserMapper.toDomain(userMockData);
    await usersRepository.create(user);
  });

  it('Should be able to log out', async () => {
    const session = await sut.execute({
      userId: authenticationMockData.user.id,
      refreshToken: authenticationMockData.refreshToken,
    });
    expect(session).toBeUndefined();
  });

  it('Should not be able to log out with invalid refresh token', async () => {
    await expect(
      sut.execute({
        userId: authenticationMockData.user.id,
        refreshToken: 'invalid-refresh-token',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid userId', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-user-id',
        refreshToken: authenticationMockData.refreshToken,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
