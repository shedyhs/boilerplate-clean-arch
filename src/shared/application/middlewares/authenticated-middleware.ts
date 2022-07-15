import { IJwtGateway } from '@/shared/infra/gateways/jwt-gateway/jwt-gateway.interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { ILoggerGateway } from '../../infra/gateways/logger-gateway/logger-gateway-interface';
import { IMiddleware } from './middleware-interface';

export class AuthenticatedMiddleware implements IMiddleware {
  constructor(
    private readonly jwtGateway: IJwtGateway,
    private readonly loggerGateway: ILoggerGateway,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { authorization } = httpRequest.headers;
    if (!authorization) {
      return { data: 'JWToken not found', statusCode: 401 };
    }
    const [, token] = authorization.split(' ');
    try {
      const { sub, emailIsVerified } = await this.jwtGateway.verify(token);
      if (!sub) {
        return { data: 'JWToken is invalid', statusCode: 401 };
      }
      return {
        data: { user: { id: sub, emailIsVerified } },
        statusCode: 200,
      };
    } catch (error) {
      this.loggerGateway.error(String(error));
      return { data: 'JWToken is invalid', statusCode: 401 };
    }
  }
}
