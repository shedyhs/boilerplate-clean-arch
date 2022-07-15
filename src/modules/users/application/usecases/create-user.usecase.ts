import { ApplicationErrors } from '@/shared/application/application-error';
import { IUsersRepository } from '../../infra/repositories/interfaces/users-repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { ICreateUserDTO } from './dtos/create-user.dto';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { ICreateUserUseCase } from './interfaces/create-user-usecase.interface';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: ICreateUserDTO): Promise<IOutputUserDTO> {
    const user = UserMapper.toDomain(input);
    const emailAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );
    if (emailAlreadyExists) {
      throw new ApplicationErrors.ConflictError('Email already in use.');
    }
    const phoneAlreadyExists = await this.usersRepository.findByPhone(
      user.phone,
    );
    if (phoneAlreadyExists) {
      throw new ApplicationErrors.ConflictError('Phone already in use');
    }
    await this.usersRepository.create(user);
    return UserMapper.toOutputDTO(user);
  }
}
