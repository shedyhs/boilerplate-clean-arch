import { S3 } from 'aws-sdk';
import fs from 'fs/promises';
import path from 'path';
import mime from 'mime/lite';
import { IFileGateway } from '@/shared/infra/gateways/file-gateway/file-gateway-interface';
import { DomainError } from '@/shared/domain/domain-error';

export class S3FileGateway implements IFileGateway {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'us-east-1',
    });
  }

  async save(fileName: string): Promise<void> {
    const filePath = path.resolve(`./uploads/${fileName}`);
    const fileContent = await fs.readFile(filePath);
    const contentType = mime.getType(fileName);
    if (!contentType) {
      throw new DomainError('Invalid file format');
    }
    await this.client
      .putObject({
        Bucket: 'helppet-general-files/user-avatars',
        Key: fileName,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();
    await fs.unlink(filePath);
  }

  async delete(fileName: string): Promise<void> {
    if (fileName !== 'default_image.png') {
      await this.client
        .deleteObject({
          Bucket: 'helppet-general-files/user-avatars',
          Key: fileName,
        })
        .promise();
    }
  }

  async update(oldFileName: string, newFileName: string): Promise<void> {
    await this.delete(oldFileName);
    await this.save(newFileName);
  }
}
