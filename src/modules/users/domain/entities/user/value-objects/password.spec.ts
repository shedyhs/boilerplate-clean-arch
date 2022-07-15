import { DomainError } from '@/shared/domain/domain-error';
import { Password } from './password';

describe('User.password', () => {
  it('Should be able to create a password with a valid value', async () => {
    const password = new Password('Valid-password2');
    expect(password).toBeInstanceOf(Password);
    expect(password).toHaveProperty('value');
  });

  it('Should not be able to create a password with less than 8 characters', async () => {
    const tooShortPassword = 'a'.repeat(7);
    expect(() => new Password(tooShortPassword)).toThrow(DomainError);
  });

  it('Should not be able to create a password with invalid values', async () => {
    const invalidPasswords = [
      'a'.repeat(7), // less than 8 characters
      'a'.repeat(8), // without number
      `${'a'.repeat(8)}1`, // without a special character
      `${'A'.repeat(6)}1!`, // without a lowercase letter
      `${'a'.repeat(6)}1!`, // without an uppercase letter
    ];
    invalidPasswords.forEach((invalidPassword) => {
      expect(() => new Password(invalidPassword)).toThrow(DomainError);
    });
  });

  it('Should be able to compare and hash a password', async () => {
    const password = new Password('Valid-password2');
    expect(password).toBeInstanceOf(Password);
    expect(password.compare('Valid-password2')).toBeTruthy();
    expect(password.compare('Invalid-password2')).toBeFalsy();
  });
});
