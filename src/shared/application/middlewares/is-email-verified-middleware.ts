import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IMiddleware } from './middleware-interface';

export class IsEmailVerifiedMiddleware implements IMiddleware {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { emailIsVerified } = request.user;
    if (!emailIsVerified) {
      return { data: 'Email is not verified', statusCode: 403 };
    }
    return { data: undefined, statusCode: 200 };
  }
}
