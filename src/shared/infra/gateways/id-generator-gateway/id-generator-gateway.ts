import crypto from 'crypto';
import { IIdGeneratorGateway } from '@/shared/infra/gateways/id-generator-gateway/id-generator-gateway-interface';

export class IdGeneratorGateway implements IIdGeneratorGateway {
  async generateUUID(): Promise<string> {
    return crypto.randomUUID();
  }
}
