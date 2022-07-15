import validator from 'validator';

import { ValueObject } from '@/shared/domain/value-object';
import { DomainError } from '@/shared/domain/domain-error';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  validate(): void {
    if (!validator.isEmail(this.value)) {
      throw new DomainError('Email is invalid');
    }
  }
}
