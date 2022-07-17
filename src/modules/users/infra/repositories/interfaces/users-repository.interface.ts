import { User } from '@/modules/users/domain/entities/user/user';
import { IPaginatedRequest } from '@/shared/interfaces/paginated-request.interface';
import { IPaginatedResponse } from '@/shared/interfaces/paginated-response.interface';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
  findAll(input: IPaginatedRequest): Promise<IPaginatedResponse<User>>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
