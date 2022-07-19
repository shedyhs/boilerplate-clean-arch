export interface ICreateUserDTO {
  id?: string;
  email: string;
  phone: {
    ddi: string;
    ddd: string;
    number: string;
  };
  password: string;
}
