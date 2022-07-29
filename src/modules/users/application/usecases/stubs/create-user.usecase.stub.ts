import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { UserMapper } from '../../mappers/user.mapper';
import { ICreateUserDTO } from '../dtos/create-user.dto';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { ICreateUserUseCase } from '../interfaces/create-user-usecase.interface';

export class StubCreateUserUseCase implements ICreateUserUseCase {
  async execute(_input: ICreateUserDTO): Promise<IOutputUserDTO> {
    const user = UserMapper.toDomain(userMockData);
    return UserMapper.toOutputDTO(user);
  }
}
