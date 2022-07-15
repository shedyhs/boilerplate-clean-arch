import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';

export interface IMiddleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
