import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { userMockData } from '../../domain/mocks/user.mock';
import { ICreateUserUseCase } from '../usecases/interfaces/create-user-usecase.interface';
import { StubCreateUserUseCase } from '../usecases/stubs/create-user.usecase.stub';
import { CreateUserController } from './create-user.controller';

describe('Create User Controller', () => {
  let sut: CreateUserController;
  let useCase: ICreateUserUseCase;

  beforeEach(() => {
    useCase = new StubCreateUserUseCase();
    sut = new CreateUserController(useCase);
  });

  it('Should call execute of useCase and return status 201', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: userMockData,
      user: {},
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalledWith(userMockData);
    expect(response.statusCode).toBe(HttpStatusCode.Created);
    expect(response.data).toHaveProperty('id');
  });

  it('Should not be able to perform CreateUserController', async () => {
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
