import * as fs from 'fs';
import { ApplicationErrors } from '@/shared/application/application-error';
import { DomainError } from '@/shared/domain/domain-error';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IValidator } from './validations/validator-interface';
import { ILoggerGateway } from '../infra/gateways/logger-gateway/logger-gateway-interface';
import { container } from '@/main/di/container';

export abstract class BaseController {
  private loggerGateway: ILoggerGateway;

  constructor() {
    this.loggerGateway = container.resolve('loggerGateway');
  }

  abstract perform(request: HttpRequest): Promise<HttpResponse>;

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(request);
      if (error) {
        return error;
      }
      if (request.file && fs.existsSync(request.file.path)) {
        fs.unlinkSync(request.file.path);
      }
      const response = await this.perform(request);
      return response;
    } catch (error) {
      const err = error as Error;
      switch (err.constructor) {
        case DomainError:
          return { data: { error: err.message }, statusCode: 400 };
        case ApplicationErrors.UnauthorizedError:
          return { data: { error: err.message }, statusCode: 401 };
        case ApplicationErrors.ForbiddenError:
          return { data: { error: err.message }, statusCode: 403 };
        case ApplicationErrors.NotFoundError:
          return { data: { error: err.message }, statusCode: 404 };
        case ApplicationErrors.ConflictError:
          return { data: { error: err.message }, statusCode: 409 };
        default:
          this.loggerGateway.error(err.message);
          return { data: { error: 'Internal Server Error' }, statusCode: 500 };
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildValidators(request: HttpRequest): IValidator[] {
    return [];
  }

  private validate(request: HttpRequest): HttpResponse | undefined {
    const validators = this.buildValidators(request);
    const errors: string[] = [];
    validators.forEach((validator) => {
      const error = validator.validate();
      if (error) {
        errors.push(error.message);
      }
    });
    if (errors.length > 0) {
      return { data: { errors }, statusCode: 400 };
    }
    return undefined;
  }
}
