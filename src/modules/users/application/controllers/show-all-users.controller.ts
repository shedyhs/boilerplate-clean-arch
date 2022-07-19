import { BaseController } from '@/shared/application/base-controller';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { IShowAllUsersUseCase } from '../usecases/interfaces/show-all-users-usecase.interface';

export class ShowAllUsersController extends BaseController {
  constructor(private readonly showAllUsersUseCase: IShowAllUsersUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const {
      page,
      limit,
      ddi,
      ddd,
      createdAfter,
      createdBefore,
      updatedAfter,
      updatedBefore,
    } = request.query;

    const response = await this.showAllUsersUseCase.execute({
      page,
      limit,
      ddi,
      ddd,
      createdAfter,
      createdBefore,
      updatedAfter,
      updatedBefore,
    });

    return { data: response, statusCode: 200 };
  }
}
