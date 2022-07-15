/* eslint-disable no-console */
import { IWhatsappGateway } from './whatsapp-gateway-interface';

export class LocalWhatsappGateway implements IWhatsappGateway {
  public async sendMessage(
    phone: string,
    message: string,
    files?: string[],
  ): Promise<void> {
    console.log(`🟢 Sending to ${phone} the message ${message}.`);
    console.log(`Files: ${files}`);
  }
}
