import { ILogInDTO } from '../dtos/log-in.dto';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';

export interface ILogInUseCase {
  execute(input: ILogInDTO): Promise<IOutputAuthenticationDTO>;
}
