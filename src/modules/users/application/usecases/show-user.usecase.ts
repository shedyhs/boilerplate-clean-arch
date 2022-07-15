import { ApplicationErrors } from '@/shared/application/application-error';
import { IUsersRepository } from '../../infra/repositories/interfaces/users-repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { IShowUserDTO } from './dtos/show-user.dto';
import { IShowUserUseCase } from './interfaces/show-user-usecase.interface';

export class ShowUserUseCase implements IShowUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: IShowUserDTO): Promise<IOutputUserDTO> {
    const foundUser = await this.usersRepository.findById(input.id);

    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('User not found.');
    }

    return UserMapper.toOutputDTO(foundUser);
  }
}
