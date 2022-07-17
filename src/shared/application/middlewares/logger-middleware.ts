import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IMiddleware } from './middleware-interface';
import { ILoggerProvider } from '@/shared/infra/providers/logger/logger.provider.interface';

export class LoggerMiddleware implements IMiddleware {
  constructor(private readonly loggerProvider: ILoggerProvider) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loggerProvider.info(`${httpRequest.method} ${httpRequest.url}
      Body: ${JSON.stringify(httpRequest.body)}
      Query: ${JSON.stringify(httpRequest.query)}
      Params: ${JSON.stringify(httpRequest.params)}
      User: ${JSON.stringify(httpRequest.user)}
      File: ${JSON.stringify(httpRequest.file)}
      Header: ${JSON.stringify(httpRequest.headers)}`);
    return { data: null, statusCode: 200 };
  }
}
