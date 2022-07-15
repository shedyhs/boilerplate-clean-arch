/* eslint-disable no-console */
import { ISmsGateway } from './sms-gateway-interface';

export class LocalSmsGateway implements ISmsGateway {
  async sendSms(phone: string, message: string): Promise<void> {
    console.log(`\n📱 Sending sms to ${phone} with message ${message}\n`);
  }
}
