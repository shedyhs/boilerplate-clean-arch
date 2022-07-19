import { DomainError } from '@/shared/domain/domain-error';
import { Phone } from './phone';

describe('User.phone', () => {
  it('Should be able to create a valid phone', async () => {
    const phone = new Phone({ ddi: '55', ddd: '11', number: '988888888' });
    expect(phone).toBeInstanceOf(Phone);
    expect(phone).toHaveProperty('value', {
      ddi: '55',
      ddd: '11',
      number: '988888888',
    });
    const rawPhone = new Phone({ ddi: '55', ddd: '11', number: '988888888' });
    expect(rawPhone).toBeInstanceOf(Phone);
    expect(rawPhone).toHaveProperty('value', {
      ddi: '55',
      ddd: '11',
      number: '988888888',
    });
  });

  it('Should not be able to create a invalid phone', async () => {
    expect(
      () => new Phone({ ddi: '55', ddd: '11', number: '98888888899999999' }),
    ).toThrow(DomainError);
    expect(
      () => new Phone({ ddi: 'invalid', ddd: 'phone', number: 'number' }),
    ).toThrow(DomainError);
    expect(
      () => new Phone({ ddi: '9999', ddd: '9999', number: '9999999999999' }),
    ).toThrow(DomainError);
  });
});
