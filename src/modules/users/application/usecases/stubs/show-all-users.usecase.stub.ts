import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';
import { UserMapper } from '../../mappers/user.mapper';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IShowAllUsersDTO } from '../dtos/show-all-users-dto';
import { IShowAllUsersUseCase } from '../interfaces/show-all-users-usecase.interface';

export class StubShowAllUsersUseCase implements IShowAllUsersUseCase {
  async execute(
    _input: IShowAllUsersDTO,
  ): Promise<IPaginatedResponse<IOutputUserDTO>> {
    const user = UserMapper.toDomain(userMockData);

    return {
      page: 1,
      limit: 10,
      total: 1,
      results: [UserMapper.toOutputDTO(user)],
    };
  }
}
