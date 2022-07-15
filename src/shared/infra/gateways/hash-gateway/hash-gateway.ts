import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { IHashGateway } from '@/shared/infra/gateways/hash-gateway/hash-gateway-interface';

export class HashGateway implements IHashGateway {
  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
  async generateHash(size: number): Promise<string> {
    return crypto.randomBytes(size).toString('hex');
  }

  async generateApiToken(): Promise<string> {
    return crypto.randomUUID().toString().replaceAll('-', '');
  }
}
