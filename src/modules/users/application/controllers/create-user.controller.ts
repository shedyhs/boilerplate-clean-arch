import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { ICreateUserUseCase } from '../usecases/interfaces/create-user-usecase.interface';

export class CreateUserController extends BaseController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id, email, phone, password } = request.body;

    const response = await this.createUserUseCase.execute({
      id,
      email,
      phone,
      password,
    });

    return { data: response, statusCode: HttpStatusCode.Created };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(request.body.email, 'email', 'body'),
      new RequiredFieldValidator(request.body.phone, 'phone', 'body'),
      new RequiredFieldValidator(request.body.password, 'password', 'body'),
    ];
  }
}
