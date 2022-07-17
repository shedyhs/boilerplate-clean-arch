import crypto from 'crypto';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';

export class IdGeneratorProvider implements IIdGeneratorProvider {
  async generateUUID(): Promise<string> {
    return crypto.randomUUID();
  }
}
