import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { User } from '@/modules/users/domain/entities/user/user';
import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mocks/mock-users.repository';
import { ApplicationErrors } from '@/shared/application/application-error';
import { IdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { JwtProvider } from '@/shared/infra/providers/jwt/jwt.provider';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/mock-auth-tokens.repository';
import { ILogInUseCase } from './interfaces/log-in-usecase.interface';
import { LogInUseCase } from './log-in.usecase';

describe('LogInUseCase', () => {
  let sut: ILogInUseCase;
  let usersRepository: MockUsersRepository;
  let authTokensRepository: MockAuthTokensRepository;
  let jwtProvider: IJwtProvider;
  let idGeneratorProvider: IIdGeneratorProvider;
  let user: User;

  beforeEach(async () => {
    idGeneratorProvider = new IdGeneratorProvider();
    jwtProvider = new JwtProvider();
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new LogInUseCase(
      usersRepository,
      authTokensRepository,
      jwtProvider,
      idGeneratorProvider,
    );

    user = UserMapper.toDomain(userMockData);
    await usersRepository.create(user);
  });

  it('Should be able to log in', async () => {
    const session = await sut.execute({
      email: user.email,
      password: userMockData.password,
    });
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
    expect(session).toHaveProperty('user');
    expect(session.user).not.toHaveProperty('password');
  });

  it('Should not be able to log in with invalid password', async () => {
    await expect(
      sut.execute({
        email: user.email,
        password: 'invalid-password',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'invalid@email.com',
        password: userMockData.password,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
