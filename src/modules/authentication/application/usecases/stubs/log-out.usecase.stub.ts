import { ILogOutDTO } from '../dtos/log-out.dto';
import { ILogOutUseCase } from '../interfaces/log-out-usecase.interface';

export class StubLogOutUseCase implements ILogOutUseCase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async execute(_input: ILogOutDTO): Promise<void> {}
}
