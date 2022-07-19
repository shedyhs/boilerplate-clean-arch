import { IPhone } from '@/modules/users/domain/entities/user/value-objects/phone';

export interface IUpdateUserDTO {
  id: string;
  email?: string;
  phone?: IPhone;
  password: string;
  newPassword?: string;
  confirmationPassword?: string;
}
