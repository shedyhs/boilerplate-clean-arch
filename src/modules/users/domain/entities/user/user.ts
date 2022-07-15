import { DomainError } from '@/shared/domain/domain-error';
import { Entity } from '@/shared/domain/entity';
import { Email } from './value-objects/email';
import { Password } from './value-objects/password';
import { Phone } from './value-objects/phone';

type UserProps = {
  id?: string;
  email: string;
  phone: string;
  password: Password;
};

export class User extends Entity {
  private _email: Email;
  private _phone: Phone;
  private _password: Password;

  constructor(props: UserProps) {
    super(props.id);
    this._email = new Email(props.email);
    this._phone = new Phone(props.phone);
    this._password = props.password;
  }

  updateEmail(oldPassword: string, newEmail: string): void {
    if (this._password && !this._password.compare(oldPassword)) {
      throw new DomainError('Cannot change email with invalid password');
    }
    this._email = new Email(newEmail);
  }

  updatePhone(password: string, newPhone: string): void {
    if (!this._password || !this._password.compare(password)) {
      throw new DomainError('Cannot change phone with invalid password');
    }
    this._phone = new Phone(newPhone);
  }

  updatePassword(
    oldPassword: string,
    password: string,
    confirmationPassword: string,
  ): void {
    if (this._password && !this._password.compare(oldPassword)) {
      throw new DomainError('Old password is not valid');
    }
    if (password !== confirmationPassword) {
      throw new DomainError(
        'Password and Confirmation Password does not match',
      );
    }
    this._password = new Password(password);
  }

  get email(): string {
    return this._email.value;
  }

  get phone(): string {
    return this._phone.value;
  }

  get password(): Password {
    return this._password;
  }

  set password(value: Password) {
    this._password = value;
  }
}
