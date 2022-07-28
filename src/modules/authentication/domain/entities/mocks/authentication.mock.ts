import { IOutputAuthenticationDTO } from '@/modules/authentication/application/usecases/dtos/authentication-output.dto';
import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { userMockData } from '@/modules/users/domain/mocks/user.mock';

const fakeUser = UserMapper.toDomain(userMockData);

export const authenticationMockData: IOutputAuthenticationDTO = {
  accessToken: 'fake-access-token',
  refreshToken: 'fake-refresh-token',
  user: UserMapper.toOutputDTO(fakeUser),
};
