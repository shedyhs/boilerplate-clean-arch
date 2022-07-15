import validator from 'validator';
import { ValueObject } from '@/shared/domain/value-object';
import { DomainError } from '@/shared/domain/domain-error';

export class Phone extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  validate(): void {
    if (!validator.isMobilePhone(this.value)) {
      throw new DomainError('Phone is invalid');
    }
  }
}
