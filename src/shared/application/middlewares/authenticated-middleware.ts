import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { ILoggerProvider } from '@/shared/infra/providers/logger/logger.provider.interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IMiddleware } from './middleware-interface';

export class AuthenticatedMiddleware implements IMiddleware {
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly loggerProvider: ILoggerProvider,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers;
    if (!authorization) {
      return { data: 'JWToken not found', statusCode: 401 };
    }
    const [, token] = authorization.split(' ');
    try {
      const { sub, emailIsVerified } = await this.jwtProvider.verify(token);
      if (!sub) {
        return { data: 'JWToken is invalid', statusCode: 401 };
      }
      return {
        data: { user: { id: sub, emailIsVerified } },
        statusCode: 200,
      };
    } catch (error) {
      this.loggerProvider.error(String(error));
      return { data: 'JWToken is invalid', statusCode: 401 };
    }
  }
}
