import { IOutputUserDTO } from '@/modules/users/application/usecases/dtos/output-user.dto';

export interface IOutputAuthenticationDTO {
  accessToken: string;
  refreshToken: string;
  user: IOutputUserDTO;
}
