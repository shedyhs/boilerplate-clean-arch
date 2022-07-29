import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { IShowUserUseCase } from '../usecases/interfaces/show-user-usecase.interface';
import { StubShowUserUseCase } from '../usecases/stubs/show-user.usecase.stub';
import { ShowUserController } from './show-user.controller';

describe('Show User Controller', () => {
  let sut: ShowUserController;
  let useCase: IShowUserUseCase;

  beforeEach(() => {
    useCase = new StubShowUserUseCase();
    sut = new ShowUserController(useCase);
  });

  it('Should call execute of useCase and return status 200', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: {},
      user: { id: 'fake-user-id' },
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalled();
    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(response.data).toHaveProperty('id');
  });

  it('Should not be able to perform ShowUserController', async () => {
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
