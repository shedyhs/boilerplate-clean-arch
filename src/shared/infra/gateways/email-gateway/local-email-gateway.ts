/* eslint-disable no-console */
import { IEmailGateway } from '@/shared/infra/gateways/email-gateway/email-gateway-interface';

export class LocalEmailGateway implements IEmailGateway {
  async sendEmailVerificationCode(input: {
    email: string;
    verificationCode: string;
  }): Promise<void> {
    console.log(
      `\n📧 Sending email ${input.email} with verification code ${input.verificationCode}\n`,
    );
  }

  async sendRecoverUserPassword(input: {
    email: string;
    recoverHash: string;
  }): Promise<void> {
    console.log(
      `\n📧 Sending email ${input.email} with recover hash ${input.recoverHash}\n`,
    );
  }

  async sendGenericEmail(input: {
    to: string;
    from: string;
    subject: string;
    html: string;
  }): Promise<void> {
    console.log(
      `\n📧 Sending email to ${input.to} from ${input.from} with subject ${input.subject}\n`,
    );
  }
}
