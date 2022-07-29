import { authenticationMockData } from '@/modules/authentication/domain/entities/mocks/authentication.mock';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';
import { ILogInDTO } from '../dtos/log-in.dto';
import { ILogInUseCase } from '../interfaces/log-in-usecase.interface';

export class StubLogInUseCase implements ILogInUseCase {
  async execute(_input: ILogInDTO): Promise<IOutputAuthenticationDTO> {
    return authenticationMockData;
  }
}
