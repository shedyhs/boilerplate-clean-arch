import { IShowAllUsersDTO } from '@/modules/users/application/usecases/dtos/show-all-users-dto';
import { User } from '@/modules/users/domain/entities/user/user';
import { IPhone } from '@/modules/users/domain/entities/user/value-objects/phone';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByPhone(phone: IPhone): Promise<User | undefined>;
  findAll(input: IShowAllUsersDTO): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
