import { IShowAllUsersUseCase } from '../usecases/interfaces/show-all-users-usecase.interface';
import { StubShowAllUsersUseCase } from '../usecases/stubs/show-all-users.usecase.stub';
import { ShowAllUsersController } from './show-all-users.controller';

describe('Show All User Controller', () => {
  let sut: ShowAllUsersController;
  let useCase: IShowAllUsersUseCase;

  beforeEach(() => {
    useCase = new StubShowAllUsersUseCase();
    sut = new ShowAllUsersController(useCase);
  });

  it('Should call execute of useCase and return status 200', async () => {
    const spyUseCase = jest.spyOn(useCase, 'execute');
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
    expect(spyUseCase).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('page');
    expect(response.data).toHaveProperty('limit');
    expect(response.data).toHaveProperty('total');
    expect(response.data).toHaveProperty('results');
    expect(response.data.results).toHaveLength(1);
  });
});
