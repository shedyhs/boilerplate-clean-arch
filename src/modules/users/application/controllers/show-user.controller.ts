import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { IShowUserUseCase } from '../usecases/interfaces/show-user-usecase.interface';

export class ShowUserController extends BaseController {
  constructor(private readonly showUserUseCase: IShowUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;

    const response = await this.showUserUseCase.execute({ id });

    return { data: response, statusCode: HttpStatusCode.Ok };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [new RequiredFieldValidator(request.user.id, 'id', 'user')];
  }
}
