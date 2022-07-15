import fs from 'fs/promises';
import path from 'path';
import { ILoggerGateway } from '@/shared/infra/gateways/logger-gateway/logger-gateway-interface';
import { IFileGateway } from '@/shared/infra/gateways/file-gateway/file-gateway-interface';

export class DiskFileGateway implements IFileGateway {
  constructor(private readonly loggerGateway: ILoggerGateway) {}

  async save(fileName: string): Promise<void> {
    this.loggerGateway.debug(`Saved file: ${fileName}`);
  }

  async delete(fileName: string): Promise<void> {
    const filePath = path.resolve('./uploads', fileName);
    try {
      await fs.stat(filePath);
    } catch {
      return;
    }
    await fs.unlink(filePath);
  }

  async update(oldFileName: string, newFileName: string): Promise<void> {
    await this.delete(oldFileName);
    await this.save(newFileName);
  }
}
