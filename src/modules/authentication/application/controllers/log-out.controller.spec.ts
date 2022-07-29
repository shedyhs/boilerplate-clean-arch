import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { ILogOutUseCase } from '../usecases/interfaces/log-out-usecase.interface';
import { StubLogOutUseCase } from '../usecases/stubs/log-out.usecase.stub';
import { LogOutController } from './log-out.controller';

describe('Log Out  Controller', () => {
  let sut: LogOutController;
  let useCase: ILogOutUseCase;

  beforeEach(() => {
    useCase = new StubLogOutUseCase();
    sut = new LogOutController(useCase);
  });

  it('Should call execute of useCase and return status 204', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: { refreshToken: 'valid-refresh-token' },
      user: { id: 'uuid-of-user' },
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalled();
    expect(response.statusCode).toBe(HttpStatusCode.NoContent);
    expect(response.data).toBeUndefined();
  });

  it('Should not be able to perform LogOutController', async () => {
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
