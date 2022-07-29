import { IDeleteUserDTO } from '../dtos/delete-user.dto';
import { IDeleteUserUseCase } from '../interfaces/delete-user-usecase.interface';

export class StubDeleteUserUseCase implements IDeleteUserUseCase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async execute(_input: IDeleteUserDTO): Promise<void> {}
}
