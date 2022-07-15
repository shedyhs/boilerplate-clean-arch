import { ICreateUserDTO } from '../../application/usecases/dtos/create-user.dto';

export const userMockData: ICreateUserDTO = {
  email: 'user@fake.email',
  phone: '+55 (11) 99999-9999',
  password: 'Password1!',
};
