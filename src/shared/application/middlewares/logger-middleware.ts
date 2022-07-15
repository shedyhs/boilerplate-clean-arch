import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { ILoggerGateway } from '../../infra/gateways/logger-gateway/logger-gateway-interface';
import { IMiddleware } from './middleware-interface';

export class LoggerMiddleware implements IMiddleware {
  constructor(private readonly loggerGateway: ILoggerGateway) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loggerGateway.info(`${httpRequest.method} ${httpRequest.url}
      Body: ${JSON.stringify(httpRequest.body)}
      Query: ${JSON.stringify(httpRequest.query)}
      Params: ${JSON.stringify(httpRequest.params)}
      User: ${JSON.stringify(httpRequest.user)}
      File: ${JSON.stringify(httpRequest.file)}
      Header: ${JSON.stringify(httpRequest.headers)}`);
    return { data: null, statusCode: 200 };
  }
}
