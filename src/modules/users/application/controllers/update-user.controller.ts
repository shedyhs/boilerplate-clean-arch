import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IUpdateUserUseCase } from '../usecases/interfaces/update-user-usecase.interface';

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;
    const { email, phone, password, newPassword, confirmationPassword } =
      request.body;

    const response = await this.updateUserUseCase.execute({
      id,
      email,
      phone,
      password,
      newPassword,
      confirmationPassword,
    });

    return { data: response, statusCode: 200 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [
      new RequiredFieldValidator(request.user.id, 'id', 'user'),
      new RequiredFieldValidator(request.body.password, 'password', 'body'),
    ];
  }
}
