import { ApplicationErrors } from '@/shared/application/application-error';
import { IUsersRepository } from '../../infra/repositories/interfaces/users-repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { IUpdateUserDTO } from './dtos/update-user.dto';
import { IUpdateUserUseCase } from './interfaces/update-user-usecase.interface';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: IUpdateUserDTO): Promise<IOutputUserDTO> {
    const foundUser = await this.usersRepository.findById(input.id);
    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('User not found');
    }
    if (input.email) {
      const emailAlreadyInUse = await this.usersRepository.findByEmail(
        input.email,
      );
      if (emailAlreadyInUse && emailAlreadyInUse.id !== foundUser.id) {
        throw new ApplicationErrors.ConflictError('Email already in use');
      }
      foundUser.updateEmail(input.password, input.email);
    }
    if (input.phone) {
      const phoneAlreadyInUse = await this.usersRepository.findByPhone(
        input.phone,
      );
      if (phoneAlreadyInUse && phoneAlreadyInUse.id !== foundUser.id) {
        throw new ApplicationErrors.ConflictError('Phone already in use');
      }
      foundUser.updatePhone(input.password, input.phone);
    }
    if (input.newPassword && input.confirmationPassword) {
      foundUser.updatePassword(
        input.password,
        input.newPassword,
        input.confirmationPassword,
      );
    }
    await this.usersRepository.update(foundUser);
    return UserMapper.toOutputDTO(foundUser);
  }
}
