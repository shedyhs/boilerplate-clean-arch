import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { User } from '@/modules/users/domain/entities/user/user';
import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mocks/mock-users.repository';
import { ApplicationErrors } from '@/shared/application/application-error';
import { IdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { JwtProvider } from '@/shared/infra/providers/jwt/jwt.provider';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { authenticationMockData } from '../../domain/entities/mocks/authentication.mock';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/mock-auth-tokens.repository';
import { IRefreshAuthenticationUseCase } from './interfaces/refresh-authentication-usecase.dto';
import { RefreshAuthenticationUseCase } from './refresh-authentication.usecase';

describe('RefreshAuthenticationUseCase', () => {
  let sut: IRefreshAuthenticationUseCase;
  let idGeneratorProvider: IIdGeneratorProvider;
  let usersRepository: IUsersRepository;
  let authTokensRepository: MockAuthTokensRepository;
  let jwtProvider: IJwtProvider;
  let user: User;
  let accessToken: string;
  let refreshToken: string;

  beforeEach(async () => {
    idGeneratorProvider = new IdGeneratorProvider();
    jwtProvider = new JwtProvider();
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new RefreshAuthenticationUseCase(
      jwtProvider,
      idGeneratorProvider,
      authTokensRepository,
      usersRepository,
    );
    await authTokensRepository.createOrUpdate({
      userId: authenticationMockData.user.id,
      accessToken: authenticationMockData.accessToken,
      refreshToken: authenticationMockData.refreshToken,
    });
    user = UserMapper.toDomain(userMockData);
    await usersRepository.create(user);
    accessToken = await jwtProvider.generate({
      payload: { email: user.email, phone: user.phone },
      options: { subject: user.id },
    });
    refreshToken = await idGeneratorProvider.generateUUID();
    await authTokensRepository.createOrUpdate({
      accessToken,
      refreshToken,
      userId: user.id,
    });
  });

  it('Should be able to refresh authentication', async () => {
    const session = await sut.execute({
      accessToken,
      refreshToken: authenticationMockData.refreshToken,
    });
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
    expect(session).toHaveProperty('user');
  });

  it('Should not be able to refresh token with invalid accessToken', async () => {
    const invalidAccessToken = await jwtProvider.generate({
      payload: { email: user.email, phone: user.phone },
      options: { subject: 'invalid-user-id' },
    });
    await expect(
      sut.execute({
        accessToken: invalidAccessToken,
        refreshToken: authenticationMockData.refreshToken,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid refreshToken', async () => {
    await expect(
      sut.execute({
        accessToken,
        refreshToken: 'invalid-refresh-token',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
