import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { UserMapper } from '../../mappers/user.mapper';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IShowUserDTO } from '../dtos/show-user.dto';
import { IShowUserUseCase } from '../interfaces/show-user-usecase.interface';

export class StubShowUserUseCase implements IShowUserUseCase {
  async execute(_input: IShowUserDTO): Promise<IOutputUserDTO> {
    const user = UserMapper.toDomain(userMockData);
    return UserMapper.toOutputDTO(user);
  }
}
