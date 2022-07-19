import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';
import { IUsersRepository } from '../../infra/repositories/interfaces/users-repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { IShowAllUsersDTO } from './dtos/show-all-users-dto';
import { IShowAllUsersUseCase } from './interfaces/show-all-users-usecase.interface';

export class ShowAllUsersUseCase implements IShowAllUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(
    input: IShowAllUsersDTO,
  ): Promise<IPaginatedResponse<IOutputUserDTO>> {
    const foundUsers = await this.usersRepository.findAll({
      createdAfter: input.createdAfter,
      createdBefore: input.createdBefore,
      updatedAfter: input.updatedAfter,
      updatedBefore: input.updatedBefore,
      ddd: input.ddd,
      ddi: input.ddi,
      limit: input.limit,
      page: input.page,
    });

    return {
      limit: input.limit ? Number(input.limit) : 10,
      page: input.page ? Number(input.page) : 1,
      total: foundUsers.length,
      results: foundUsers.map((user) => UserMapper.toOutputDTO(user)),
    };
  }
}
