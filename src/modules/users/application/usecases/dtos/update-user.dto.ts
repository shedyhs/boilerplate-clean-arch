export interface IUpdateUserDTO {
  id: string;
  email?: string;
  phone?: string;
  password: string;
  newPassword?: string;
  confirmationPassword?: string;
}
