/* eslint-disable no-console */

import { IWhatsappProvider } from './whatsapp.provider.interface';

export class MockWhatsappProvider implements IWhatsappProvider {
  public async sendMessage(
    phone: string,
    message: string,
    files?: string[],
  ): Promise<void> {
    console.log(`🟢 Sending to ${phone} the message ${message}.`);
    console.log(`Files: ${files}`);
  }
}
