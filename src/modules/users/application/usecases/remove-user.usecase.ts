import { DomainError } from '@/shared/domain/domain-error';
import { IUsersRepository } from '../../infra/repositories/interfaces/users-repository.interface';
import { IDeleteUserDTO } from './dtos/delete-user.dto';
import { IDeleteUserUseCase } from './interfaces/delete-user-usecase.interface';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: IDeleteUserDTO): Promise<void> {
    const foundUser = await this.usersRepository.findById(input.id);
    if (!foundUser) {
      throw new DomainError('User not found');
    }
    await this.usersRepository.delete(foundUser.id);
  }
}
