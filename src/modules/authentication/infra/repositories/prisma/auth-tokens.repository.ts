import prismaClient from '@/shared/infra/database/prisma-client';
import { IAuthTokensRepository } from '../interfaces/auth-tokens-repository.interface';
import { AuthTokenModel } from '../model/auth-token.model';

export class PgAuthTokensRepository implements IAuthTokensRepository {
  async createOrUpdate(authToken: AuthTokenModel): Promise<void> {
    await prismaClient.authToken.upsert({
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
  }
  async findByUserId(userId: string): Promise<AuthTokenModel | undefined> {
    const foundAuthToken = await prismaClient.authToken.findUnique({
      where: { userId },
    });

    if (!foundAuthToken) {
      return undefined;
    }

    return foundAuthToken;
  }
  async findByRefreshToken(
    refreshToken: string,
  ): Promise<AuthTokenModel | undefined> {
    const foundAuthToken = await prismaClient.authToken.findUnique({
      where: { refreshToken },
    });

    if (!foundAuthToken) {
      return undefined;
    }

    return foundAuthToken;
  }
  async delete(userId: string): Promise<void> {
    await prismaClient.authToken.delete({ where: { userId } });
  }
}
