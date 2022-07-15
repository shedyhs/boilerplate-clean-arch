import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IMiddleware } from './middleware-interface';

export class StringToBooleanMiddleware implements IMiddleware {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const contentType = httpRequest.headers['content-type'];
    const isMultipartFormData = contentType?.includes('multipart/form-data');
    if (isMultipartFormData) {
      Object.entries(httpRequest.body).forEach(([key, value]) => {
        if (value === 'true' || value === 'false') {
          httpRequest.body[key] = value === 'true';
        }
      });
      return { data: httpRequest, statusCode: 200 };
    }
    return {
      data: 'String to boolean middleware only works with multipart/form-data',
      statusCode: 400,
    };
  }
}
