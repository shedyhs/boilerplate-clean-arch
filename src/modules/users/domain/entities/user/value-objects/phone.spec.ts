import { DomainError } from '@/shared/domain/domain-error';
import { Phone } from './phone';

describe('User.phone', () => {
  it('Should be able to create a valid phone', async () => {
    const phone = new Phone('+55 (11) 99999-9999');
    expect(phone).toBeInstanceOf(Phone);
    expect(phone).toHaveProperty('value', '+55 (11) 99999-9999');
    const rawPhone = new Phone('5511999999999');
    expect(rawPhone).toBeInstanceOf(Phone);
    expect(rawPhone).toHaveProperty('value', '5511999999999');
  });

  it('Should not be able to create a invalid phone', async () => {
    expect(() => new Phone('+55 (11) 99999-99999')).toThrow(DomainError);
    expect(() => new Phone('invalid-phone-number')).toThrow(DomainError);
    expect(() => new Phone('99999999999999')).toThrow(DomainError);
  });
});
