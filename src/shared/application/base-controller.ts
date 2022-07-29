import * as fs from 'fs';
import { ApplicationErrors } from '@/shared/application/application-error';
import { DomainError } from '@/shared/domain/domain-error';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IValidator } from './validations/validator-interface';
import { ServerErrors } from './server-error';
import { HttpStatusCode } from '../interfaces/http-status-codes';

export abstract class BaseController {
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
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.BadRequest,
          };
        case ApplicationErrors.UnauthorizedError:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.Unauthorized,
          };
        case ApplicationErrors.PaymentRequired:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.PaymentRequired,
          };
        case ApplicationErrors.ForbiddenError:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.Forbidden,
          };
        case ApplicationErrors.NotFoundError:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.NotFound,
          };
        case ApplicationErrors.MethodNotAllowed:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.MethodNotAllowed,
          };
        case ApplicationErrors.NotAcceptable:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.NotAcceptable,
          };
        case ApplicationErrors.ProxyAuthenticationRequired:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.ProxyAuthenticationRequired,
          };
        case ApplicationErrors.RequestTimeout:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.RequestTimeout,
          };
        case ApplicationErrors.ConflictError:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.Conflict,
          };
        case ApplicationErrors.Gone:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.Gone,
          };
        case ApplicationErrors.LengthRequired:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.LengthRequired,
          };
        case ApplicationErrors.PreconditionFailed:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.PreconditionFailed,
          };
        case ApplicationErrors.PayloadTooLarge:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.PayloadTooLarge,
          };
        case ApplicationErrors.RequestURITooLarge:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.RequestURITooLarge,
          };
        case ApplicationErrors.UnsupportedMediaType:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.UnsupportedMediaType,
          };
        case ApplicationErrors.RequestRangeNotSatisfiable:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.RequestRangeNotSatisfiable,
          };
        case ApplicationErrors.ExpectationFailed:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.ExpectationFailed,
          };
        case ApplicationErrors.ImATeapot:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.ImATeapot,
          };
        case ApplicationErrors.MisdirectedRequest:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.MisdirectedRequest,
          };
        case ApplicationErrors.UnprocessableEntity:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.UnprocessableEntity,
          };
        case ApplicationErrors.Locked:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.Locked,
          };
        case ApplicationErrors.FailedDependency:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.FailedDependency,
          };
        case ApplicationErrors.UpgradeRequired:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.UpgradeRequired,
          };
        case ApplicationErrors.PreconditionRequired:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.PreconditionRequired,
          };
        case ApplicationErrors.TooManyRequests:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.TooManyRequests,
          };
        case ApplicationErrors.RequestHeaderFieldsTooLarge:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.RequestHeaderFieldsTooLarge,
          };
        case ApplicationErrors.UnavailableForLegalReasons:
          return {
            data: { error: err.message },
            statusCode: HttpStatusCode.UnavailableForLegalReasons,
          };

        case ServerErrors.NotImplemented:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.InternalServerError,
          };
        case ServerErrors.BadProvider:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.BadProvider,
          };
        case ServerErrors.ServiceUnavailable:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.ServiceUnavailable,
          };
        case ServerErrors.ProviderTimeout:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.ProviderTimeout,
          };
        case ServerErrors.HTTPVersionNotSupported:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.HttpVersionNotSupported,
          };
        case ServerErrors.VariantAlsoNegotiates:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.VariantAlsoNegotiates,
          };
        case ServerErrors.InsufficientStorage:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.InsufficientStorage,
          };
        case ServerErrors.LoopDetected:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.LoopDetected,
          };
        case ServerErrors.NotExtended:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.NotExtended,
          };
        case ServerErrors.NetworkAuthenticationRequired:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.NetworkAuthenticationRequired,
          };
        case ServerErrors.NetworkConnectionTimeoutError:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.NetworkConnectionTimeoutError,
          };
        default:
          // eslint-disable-next-line no-console
          console.error(err);
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode.InternalServerError,
          };
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
