import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { UserMapper } from '../../mappers/user.mapper';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IUpdateUserDTO } from '../dtos/update-user.dto';
import { IUpdateUserUseCase } from '../interfaces/update-user-usecase.interface';

export class StubUpdateUserUseCase implements IUpdateUserUseCase {
  async execute(_input: IUpdateUserDTO): Promise<IOutputUserDTO> {
    const user = UserMapper.toDomain(userMockData);
    return UserMapper.toOutputDTO(user);
  }
}
