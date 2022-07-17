export interface IEmailProvider {
  sendEmailVerificationCode(input: {
    email: string;
    verificationCode: string;
  }): Promise<void>;
  sendRecoverUserPassword(input: {
    email: string;
    recoverHash: string;
  }): Promise<void>;
  sendGenericEmail(input: {
    to: string;
    from: string;
    subject: string;
    html: string;
  }): Promise<void>;
}
