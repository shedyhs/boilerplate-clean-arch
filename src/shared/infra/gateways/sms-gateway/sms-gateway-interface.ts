export interface ISmsGateway {
  sendSms(phone: string, message: string): Promise<void>;
}
