import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { IDeleteUserUseCase } from '../usecases/interfaces/delete-user-usecase.interface';
import { StubDeleteUserUseCase } from '../usecases/stubs/delete-user.usecase.stub';
import { DeleteUserController } from './delete-user.controller';

describe('Delete User Controller', () => {
  let sut: DeleteUserController;
  let useCase: IDeleteUserUseCase;

  beforeEach(() => {
    useCase = new StubDeleteUserUseCase();
    sut = new DeleteUserController(useCase);
  });

  it('Should call execute of useCase and return status 204', async () => {
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
    expect(response.statusCode).toBe(HttpStatusCode.NoContent);
    expect(response.data).toBeUndefined();
  });

  it('Should not be able to perform DeleteUserController', async () => {
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
