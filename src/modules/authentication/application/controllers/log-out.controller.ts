import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { ILogOutUseCase } from '../usecases/interfaces/log-out-usecase.interface';

export class LogOutController extends BaseController {
  constructor(private readonly logOutUseCase: ILogOutUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id: userId } = request.user;
    const { refreshToken } = request.body;
    const response = await this.logOutUseCase.execute({ userId, refreshToken });
    return { data: response, statusCode: 204 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(
        request.body.refreshToken,
        'refreshToken',
        'body',
      ),
      new RequiredFieldValidator(request.user.id, 'id', 'user'),
    ];
  }
}
