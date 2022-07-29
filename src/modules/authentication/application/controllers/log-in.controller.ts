import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { ILogInUseCase } from '../usecases/interfaces/log-in-usecase.interface';

export class LogInController extends BaseController {
  constructor(private readonly logInUseCase: ILogInUseCase) {
    super();
  }
  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;
    const response = await this.logInUseCase.execute({ email, password });
    return { data: response, statusCode: 201 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(request.body.email, 'email', 'body'),
      new RequiredFieldValidator(request.body.password, 'password', 'body'),
    ];
  }
}
