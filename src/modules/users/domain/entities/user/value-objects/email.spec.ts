import { DomainError } from '@/shared/domain/domain-error';
import { Email } from './email';

describe('User.email', () => {
  it('Should be able to create a email with a valid value', async () => {
    const email = new Email('valid@email.com');
    expect(email).toBeInstanceOf(Email);
    expect(email).toHaveProperty('value', 'valid@email.com');
  });

  it('Should not be able to create a email with a invalid value', async () => {
    expect(() => new Email('invalidEmail.com')).toThrow(DomainError);
  });

  it('Should not be able to create email without value', async () => {
    expect(() => new Email('')).toThrow(DomainError);
  });
});
