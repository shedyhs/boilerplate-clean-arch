import { AuthTokenModel } from '../model/auth-token.model';

export interface IAuthTokensRepository {
  createOrUpdate(authToken: AuthTokenModel): Promise<void>;
  findByUserId(userId: string): Promise<AuthTokenModel | undefined>;
  findByRefreshToken(refreshToken: string): Promise<AuthTokenModel | undefined>;
  delete(userId: string): Promise<void>;
}
