import * as fs from 'fs';
import { ApplicationErrors } from '@/shared/application/application-error';
import { DomainError } from '@/shared/domain/domain-error';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IValidator } from './validations/validator-interface';
import { ServerErrors } from './server-error';

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
          return { data: { error: err.message }, statusCode: 400 };
        case ApplicationErrors.UnauthorizedError:
          return { data: { error: err.message }, statusCode: 401 };
        case ApplicationErrors.PaymentRequired:
          return { data: { error: err.message }, statusCode: 402 };
        case ApplicationErrors.ForbiddenError:
          return { data: { error: err.message }, statusCode: 403 };
        case ApplicationErrors.NotFoundError:
          return { data: { error: err.message }, statusCode: 404 };
        case ApplicationErrors.MethodNotAllowed:
          return { data: { error: err.message }, statusCode: 405 };
        case ApplicationErrors.NotAcceptable:
          return { data: { error: err.message }, statusCode: 406 };
        case ApplicationErrors.ProxyAuthenticationRequired:
          return { data: { error: err.message }, statusCode: 407 };
        case ApplicationErrors.RequestTimeout:
          return { data: { error: err.message }, statusCode: 408 };
        case ApplicationErrors.ConflictError:
          return { data: { error: err.message }, statusCode: 409 };
        case ApplicationErrors.Gone:
          return { data: { error: err.message }, statusCode: 410 };
        case ApplicationErrors.LengthRequired:
          return { data: { error: err.message }, statusCode: 411 };
        case ApplicationErrors.PreconditionFailed:
          return { data: { error: err.message }, statusCode: 412 };
        case ApplicationErrors.PayloadTooLarge:
          return { data: { error: err.message }, statusCode: 413 };
        case ApplicationErrors.RequestURITooLarge:
          return { data: { error: err.message }, statusCode: 414 };
        case ApplicationErrors.UnsupportedMediaType:
          return { data: { error: err.message }, statusCode: 415 };
        case ApplicationErrors.RequestRangeNotSatisfiable:
          return { data: { error: err.message }, statusCode: 416 };
        case ApplicationErrors.ExpectationFailed:
          return { data: { error: err.message }, statusCode: 417 };
        case ApplicationErrors.ImATeapot:
          return { data: { error: err.message }, statusCode: 418 };
        case ApplicationErrors.MisdirectedRequest:
          return { data: { error: err.message }, statusCode: 421 };
        case ApplicationErrors.UnprocessableEntity:
          return { data: { error: err.message }, statusCode: 422 };
        case ApplicationErrors.Locked:
          return { data: { error: err.message }, statusCode: 423 };
        case ApplicationErrors.FailedDependency:
          return { data: { error: err.message }, statusCode: 424 };
        case ApplicationErrors.UpgradeRequired:
          return { data: { error: err.message }, statusCode: 426 };
        case ApplicationErrors.PreconditionRequired:
          return { data: { error: err.message }, statusCode: 428 };
        case ApplicationErrors.TooManyRequests:
          return { data: { error: err.message }, statusCode: 429 };
        case ApplicationErrors.RequestHeaderFieldsTooLarge:
          return { data: { error: err.message }, statusCode: 431 };
        case ApplicationErrors.ConnectionClosedWithoutResponse:
          return { data: { error: err.message }, statusCode: 444 };
        case ApplicationErrors.UnavailableForLegalReasons:
          return { data: { error: err.message }, statusCode: 451 };
        case ApplicationErrors.ClientClosedRequest:
          return { data: { error: err.message }, statusCode: 499 };

        case ServerErrors.NotImplemented:
          return { data: { error: 'Internal Server Error' }, statusCode: 501 };
        case ServerErrors.BadProvider:
          return { data: { error: 'Internal Server Error' }, statusCode: 502 };
        case ServerErrors.ServiceUnavailable:
          return { data: { error: 'Internal Server Error' }, statusCode: 503 };
        case ServerErrors.ProviderTimeout:
          return { data: { error: 'Internal Server Error' }, statusCode: 504 };
        case ServerErrors.HTTPVersionNotSupported:
          return { data: { error: 'Internal Server Error' }, statusCode: 505 };
        case ServerErrors.VariantAlsoNegotiates:
          return { data: { error: 'Internal Server Error' }, statusCode: 506 };
        case ServerErrors.InsufficientStorage:
          return { data: { error: 'Internal Server Error' }, statusCode: 507 };
        case ServerErrors.LoopDetected:
          return { data: { error: 'Internal Server Error' }, statusCode: 508 };
        case ServerErrors.NotExtended:
          return { data: { error: 'Internal Server Error' }, statusCode: 510 };
        case ServerErrors.NetworkAuthenticationRequired:
          return { data: { error: 'Internal Server Error' }, statusCode: 511 };
        case ServerErrors.NetworkConnectionTimeoutError:
          return { data: { error: 'Internal Server Error' }, statusCode: 599 };
        default:
          // eslint-disable-next-line no-console
          console.error(err);
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
