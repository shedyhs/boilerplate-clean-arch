import validator from 'validator';
import { ValueObject } from '@/shared/domain/value-object';
import { DomainError } from '@/shared/domain/domain-error';

export interface IPhone {
  ddi: string;
  ddd: string;
  number: string;
}

export class Phone extends ValueObject<IPhone> {
  constructor(value: IPhone) {
    super(value);
    this.validate();
  }

  validate(): void {
    if (
      !validator.isMobilePhone(
        `+${this.value.ddi} (${this.value.ddd}) ${this.value.number}`,
      )
    ) {
      throw new DomainError('Phone is invalid');
    }
  }
}
