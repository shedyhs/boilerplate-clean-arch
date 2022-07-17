/* eslint-disable no-console */
import { ISmsProvider } from './sms.provider.interface';

export class MockSmsProvider implements ISmsProvider {
  async sendSms(phone: string, message: string): Promise<void> {
    console.log(`\n📱 Sending sms to ${phone} with message ${message}\n`);
  }
}
