import { ICreateUserDTO } from '../../application/usecases/dtos/create-user.dto';

export const userMockData: ICreateUserDTO = {
  email: 'user@fake.email',
  phone: {
    ddi: '55',
    ddd: '65',
    number: '984359506',
  },
  password: 'Password1!',
};
