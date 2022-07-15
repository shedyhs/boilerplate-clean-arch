import bcrypt from 'bcryptjs';
import { DomainError } from '@/shared/domain/domain-error';
import { ValueObject } from '@/shared/domain/value-object';

export class Password extends ValueObject<string> {
  private salts = 13;
  private minPasswordLength = 8;

  constructor(password: string, hashed = false) {
    super(password);
    this.validate();
    if (!hashed) {
      this.setValue(this.hashPassword(password));
    }
  }
  validate() {
    if (this.value.length < this.minPasswordLength) {
      throw new DomainError('Password must have at least 8 characters');
    }
    const hasNumber = /\d/;
    if (!this.value.match(hasNumber)) {
      throw new DomainError('Password must have at least one number');
    }
    const hasSpecialCharacter = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!this.value.match(hasSpecialCharacter)) {
      throw new DomainError('Password must have at least one lowercase letter');
    }
    const hasLowercase = /[a-z]/;
    if (!this.value.match(hasLowercase)) {
      throw new DomainError('Password must have at least one lowercase letter');
    }
    const hasUppercase = /[A-Z]/;
    if (!this.value.match(hasUppercase)) {
      throw new DomainError('Password must have at least one uppercase letter');
    }
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.salts);
  }

  compare(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
