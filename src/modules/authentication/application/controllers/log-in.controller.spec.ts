import { userMockData } from '@/modules/users/domain/mocks/user.mock';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { ILogInUseCase } from '../usecases/interfaces/log-in-usecase.interface';
import { StubLogInUseCase } from '../usecases/stubs/log-in.usecase.stub';
import { LogInController } from './log-in.controller';

describe('Log In  Controller', () => {
  let sut: LogInController;
  let useCase: ILogInUseCase;

  beforeEach(() => {
    useCase = new StubLogInUseCase();
    sut = new LogInController(useCase);
  });

  it('Should call execute of useCase and return status 201', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: {
        email: userMockData.email,
        password: userMockData.password,
      },
      user: {},
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalled();
    expect(response.statusCode).toBe(HttpStatusCode.Created);
    expect(response.data).toHaveProperty('accessToken');
  });

  it('Should not be able to perform LogInController', async () => {
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
