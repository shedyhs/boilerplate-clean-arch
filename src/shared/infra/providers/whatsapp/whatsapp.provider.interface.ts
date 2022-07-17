export interface IWhatsappProvider {
  sendMessage(phone: string, message: string, files?: string[]): Promise<void>;
}
