import { BaseController } from '@/shared/application/base-controller';
import { RequiredFieldValidator } from '@/shared/application/validations/required-field-validator';
import { IValidator } from '@/shared/application/validations/validator-interface';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IDeleteUserUseCase } from '../usecases/interfaces/delete-user-usecase.interface';

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;

    await this.deleteUserUseCase.execute({ id });

    return { data: undefined, statusCode: 204 };
  }

  buildValidators(request: HttpRequest): IValidator[] {
    return [new RequiredFieldValidator(request.user.id, 'id', 'user')];
  }
}
