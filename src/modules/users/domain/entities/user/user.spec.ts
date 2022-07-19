import { UserMapper } from '@/modules/users/application/mappers/user.mapper';
import { DomainError } from '@/shared/domain/domain-error';
import { userMockData } from '../../mocks/user.mock';
import { User } from './user';
import { Password } from './value-objects/password';

describe('User', () => {
  let user: User;
  beforeEach(() => {
    user = UserMapper.toDomain(userMockData);
  });
  it('Should be able to create a user', async () => {
    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email', userMockData.email);
    expect(user).toHaveProperty('phone', userMockData.phone);
    expect(user).toHaveProperty('password');
    expect(user.password.compare(userMockData.password)).toBeTruthy();
  });

  it('Should be able to change password', async () => {
    user.password = new Password('Password1!');
    expect(user.password.compare('Password1!')).toBeTruthy();
  });

  it('Should be able to update email with User.updateEmail()', async () => {
    user.updateEmail(userMockData.password, 'new@email.com');
    expect(user.email).toBe('new@email.com');
  });

  it('Should not be able to update email with invalid password', () => {
    expect(() =>
      user.updateEmail('invalid-password', 'new@email.com'),
    ).toThrowError(
      new DomainError('Cannot change email with invalid password'),
    );
  });

  it('Should be able to update phone with updatePhone()', () => {
    user.updatePhone(userMockData.password, {
      ddi: '55',
      ddd: '11',
      number: '988888888',
    });
    expect(user.phone).toStrictEqual({
      ddi: '55',
      ddd: '11',
      number: '988888888',
    });
  });

  it('Should not be able to update phone with invalid password', () => {
    expect(() =>
      user.updatePhone('invalid-password', {
        ddi: '55',
        ddd: '11',
        number: '988888888',
      }),
    ).toThrow(DomainError);
  });

  it('Should be able to update password with User.updatePassword()', async () => {
    user.updatePassword(
      userMockData.password,
      'NewPassword!23',
      'NewPassword!23',
    );
    expect(user.password?.compare('NewPassword!23')).toBeTruthy();
  });

  it('Should not be able to update password with confirmationPassword not match on User.updatePassword()', async () => {
    expect(() =>
      user.updatePassword(
        userMockData.password,
        'somePassword',
        'anotherPassword',
      ),
    ).toThrowError(
      new DomainError('Password and Confirmation Password does not match'),
    );
  });

  it('Should be able to change password', async () => {
    user.updatePassword(
      userMockData.password,
      'NewPassword!23',
      'NewPassword!23',
    );
    expect(user.password?.compare('NewPassword!23')).toBeTruthy();
  });

  it('Should not be able to create a user with a empty required field', async () => {
    expect(() =>
      UserMapper.toDomain({
        ...userMockData,
        email: '',
      }),
    ).toThrowError(DomainError);
  });
});
