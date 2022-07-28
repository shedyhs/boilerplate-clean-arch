import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/application/application-error';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { IOutputAuthenticationDTO } from './dtos/authentication-output.dto';
import { IRefreshAuthenticationDTO } from './dtos/refresh-authentication.dto';
import { IRefreshAuthenticationUseCase } from './interfaces/refresh-authentication-usecase.dto';

export class RefreshAuthenticationUseCase
  implements IRefreshAuthenticationUseCase
{
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly idGeneratorProvider: IIdGeneratorProvider,
    private readonly authTokensRepository: IAuthTokensRepository,
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(
    input: IRefreshAuthenticationDTO,
  ): Promise<IOutputAuthenticationDTO> {
    const { sub: userId } = await this.jwtProvider.decode(input.accessToken);
    if (!userId) {
      throw new ApplicationErrors.UnauthorizedError('Invalid access token');
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ApplicationErrors.UnauthorizedError(
        'Invalid user of access token',
      );
    }

    const authToken = await this.authTokensRepository.findByRefreshToken(
      input.refreshToken,
    );
    if (!authToken) {
      throw new ApplicationErrors.UnauthorizedError('Invalid refresh token');
    }

    const accessToken = await this.jwtProvider.generate({
      payload: {
        email: user.email,
        phone: user.phone,
      },
      options: {
        subject: user.id,
      },
    });
    const refreshToken = await this.idGeneratorProvider.generateUUID();
    await this.authTokensRepository.createOrUpdate({
      userId,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toOutputDTO(user),
    };
  }
}
