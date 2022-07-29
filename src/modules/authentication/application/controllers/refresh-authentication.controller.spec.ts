import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { IRefreshAuthenticationUseCase } from '../usecases/interfaces/refresh-authentication-usecase.dto';
import { StubRefreshAuthenticationUseCase } from '../usecases/stubs/refresh-authentication.usecase.stub';
import { RefreshAuthenticationController } from './refresh-authentication.controller';

describe('Refresh Authentication Controller', () => {
  let sut: RefreshAuthenticationController;
  let useCase: IRefreshAuthenticationUseCase;

  beforeEach(() => {
    useCase = new StubRefreshAuthenticationUseCase();
    sut = new RefreshAuthenticationController(useCase);
  });

  it('Should call execute of useCase and return status 200', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: {
        accessToken: 'valid-access-token',
        refreshToken: 'valid-refresh-token',
      },
      user: {},
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalled();
    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty('accessToken');
    expect(response.data).toHaveProperty('refreshToken');
    expect(response.data).toHaveProperty('user');
    expect(response.data.user).not.toHaveProperty('password');
  });

  it('Should not be able to perform RefreshAuthenticationController', async () => {
    const response = await sut.handle({
      params: {},
      query: {},
      body: {},
      user: {},
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(response.data).toHaveProperty('errors');
  });
});
