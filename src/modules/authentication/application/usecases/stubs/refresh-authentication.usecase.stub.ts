import { authenticationMockData } from '@/modules/authentication/domain/entities/mocks/authentication.mock';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';
import { IRefreshAuthenticationDTO } from '../dtos/refresh-authentication.dto';
import { IRefreshAuthenticationUseCase } from '../interfaces/refresh-authentication-usecase.dto';

export class StubRefreshAuthenticationUseCase
  implements IRefreshAuthenticationUseCase
{
  async execute(
    _input: IRefreshAuthenticationDTO,
  ): Promise<IOutputAuthenticationDTO> {
    return authenticationMockData;
  }
}
