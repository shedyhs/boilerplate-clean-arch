import { prismaMock } from '@/shared/infra/database/mocks/prisma-mock';
import { AuthTokenModel } from '../model/auth-token.model';
import { IAuthTokensRepository } from '../interfaces/auth-tokens-repository.interface';
import { PgAuthTokensRepository } from './auth-tokens.repository';
import { authenticationMockData } from '@/modules/authentication/domain/entities/mocks/authentication.mock';

describe('AuthTokensRepository', () => {
  let authToken: AuthTokenModel;
  let sut: IAuthTokensRepository;

  beforeEach(() => {
    authToken = {
      accessToken: authenticationMockData.accessToken,
      refreshToken: authenticationMockData.refreshToken,
      userId: authenticationMockData.user.id,
    };
    sut = new PgAuthTokensRepository();
  });

  it('Should create or update authToken', async () => {
    await sut.createOrUpdate(authToken);
    expect(prismaMock.authToken.upsert).toHaveBeenCalledWith({
      where: {
        userId: authToken.userId,
      },
      create: {
        userId: authToken.userId,
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      },
      update: {
        accessToken: authToken.accessToken,
        refreshToken: authToken.refreshToken,
      },
    });
  });

  it('Should find authToken by userId', async () => {
    prismaMock.authToken.findUnique.mockResolvedValue(authToken);
    const foundAuthToken = await sut.findByUserId(authToken.userId);
    expect(foundAuthToken).toEqual(authToken);
  });

  it('Should not find authToken by userId', async () => {
    prismaMock.authToken.findUnique.mockResolvedValue(null);
    const foundAuthToken = await sut.findByUserId(authToken.userId);
    expect(foundAuthToken).toBeUndefined();
  });

  it('Should find authToken by refreshToken', async () => {
    prismaMock.authToken.findUnique.mockResolvedValue(authToken);
    const foundAuthToken = await sut.findByRefreshToken(authToken.refreshToken);
    expect(foundAuthToken).toEqual(authToken);
  });

  it('Should not find authToken by refreshToken', async () => {
    prismaMock.authToken.findUnique.mockResolvedValue(null);
    const foundAuthToken = await sut.findByRefreshToken(authToken.refreshToken);
    expect(foundAuthToken).toBeUndefined();
  });

  it('Should delete authToken', async () => {
    await sut.delete(authToken.userId);
    expect(prismaMock.authToken.delete).toHaveBeenCalledWith({
      where: {
        userId: authToken.userId,
      },
    });
  });
});
