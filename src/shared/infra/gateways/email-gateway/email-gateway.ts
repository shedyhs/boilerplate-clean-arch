import nodemailer from 'nodemailer';
import { IEmailGateway } from '@/shared/infra/gateways/email-gateway/email-gateway-interface';

export class EmailGateway implements IEmailGateway {
  private client;

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp-relay.sendinblue.com',
      port: Number(process.env.SMTP_PORT ?? 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmailVerificationCode(input: {
    email: string;
    verificationCode: string;
  }): Promise<void> {
    await this.client.sendMail({
      to: {
        name: input.email,
        address: input.email,
      },
      from: {
        name: 'Equipe Help Pet',
        address: 'no-reply@helppet.com',
      },
      subject: 'Verificação de e-mail - Help Pet',
      html: `<p>Você está recebendo este e-mail porque recebemos um pedido de verificação de e-mail para sua conta.</p>
      <p>Se você não solicitou a verificação de e-mail, por favor ignore este e-mail.</p>
      <p>Para verificar sua conta, clique no link abaixo:</p>
      <p><a href="${process.env.APP_URL}/verify-email?verificationCode=${input.verificationCode}">${process.env.APP_URL}/verify-email?verificationCode=${input.verificationCode}</a></p>
      <p>Atenciosamente,</p>
      <p>Equipe Help Pet</p>`,
    });
  }

  async sendRecoverUserPassword(input: {
    email: string;
    recoverHash: string;
  }): Promise<void> {
    await this.client.sendMail({
      to: {
        name: input.email,
        address: input.email,
      },
      from: {
        name: 'Equipe Help Pet',
        address: 'no-reply@helppet.com',
      },
      subject: 'Recuperação de senha - Help Pet',
      html: `<p>Você está recebendo este e-mail porque recebemos um pedido de recuperação de senha para sua conta.</p>
      <p>Para redefinir sua senha, clique no link abaixo:</p>
      <p>
        <a href="${process.env.APP_URL}/reset-password?recoverHash=${input.recoverHash}">
          Redefinir senha
        </a>
      </p>
      <p>Se você não solicitou uma recuperação de senha, ignore este e-mail.</p>
      <p>Att, Equipe Help Pet</p>`,
    });
  }

  async sendGenericEmail(input: {
    to: string;
    from: string;
    subject: string;
    html: string;
  }): Promise<void> {
    await this.client.sendMail({
      to: {
        name: input.to,
        address: input.to,
      },
      from: {
        name: input.from,
        address: input.from,
      },
      subject: input.subject,
      html: input.html,
    });
  }
}
