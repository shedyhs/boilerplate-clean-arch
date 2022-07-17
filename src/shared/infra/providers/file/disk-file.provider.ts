import fs from 'fs/promises';
import path from 'path';
import { ILoggerProvider } from '../logger/logger.provider.interface';
import { IFileProvider } from './file.provider.interface';

export class DiskFileProvider implements IFileProvider {
  constructor(private readonly loggerProvider: ILoggerProvider) {}

  async save(fileName: string): Promise<void> {
    this.loggerProvider.debug(`Saved file: ${fileName}`);
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
