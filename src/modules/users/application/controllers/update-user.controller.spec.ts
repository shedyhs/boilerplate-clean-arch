import { userMockData } from '../../domain/mocks/user.mock';
import { IUpdateUserUseCase } from '../usecases/interfaces/update-user-usecase.interface';
import { StubUpdateUserUseCase } from '../usecases/stubs/update-user.usecase.stub';
import { UpdateUserController } from './update-user.controller';

describe('Update User Controller', () => {
  let sut: UpdateUserController;
  let useCase: IUpdateUserUseCase;

  beforeEach(() => {
    useCase = new StubUpdateUserUseCase();
    sut = new UpdateUserController(useCase);
  });

  it('Should call execute of useCase and return status 200', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
    const response = await sut.handle({
      params: {},
      query: {},
      body: userMockData,
      user: { id: 'fake-user-id' },
      headers: {},
      file: {},
      method: {},
      url: {},
    });
    expect(spyUseCase).toHaveBeenCalledWith({
      id: 'fake-user-id',
      ...userMockData,
    });
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('id');
  });

  it('Should not be able to perform UpdateUserController', async () => {
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
    expect(response.statusCode).toBe(400);
    expect(response.data).toHaveProperty('errors');
  });
});
