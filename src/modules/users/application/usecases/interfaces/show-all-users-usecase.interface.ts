import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IShowAllUsersDTO } from '../dtos/show-all-users-dto';

export interface IShowAllUsersUseCase {
  execute(input: IShowAllUsersDTO): Promise<IPaginatedResponse<IOutputUserDTO>>;
}
