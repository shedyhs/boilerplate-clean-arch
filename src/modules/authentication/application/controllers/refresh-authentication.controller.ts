import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IRefreshAuthenticationUseCase } from '../usecases/interfaces/refresh-authentication-usecase.dto';

export class RefreshAuthenticationController extends BaseController {
  constructor(
    private readonly refreshAuthenticationUseCase: IRefreshAuthenticationUseCase,
  ) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { accessToken, refreshToken } = request.body;
    const response = await this.refreshAuthenticationUseCase.execute({
      accessToken,
      refreshToken,
    });
    return { data: response, statusCode: 200 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(
        request.body.accessToken,
        'accessToken',
        'body',
      ),
      new RequiredFieldValidator(
        request.body.refreshToken,
        'refreshToken',
        'body',
      ),
    ];
  }
}
