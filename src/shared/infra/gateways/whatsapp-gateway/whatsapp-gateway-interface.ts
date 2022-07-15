export interface IWhatsappGateway {
  sendMessage(phone: string, message: string, files?: string[]): Promise<void>;
}
