import * as awilix from 'awilix';
import { EmailProvider } from '@/shared/infra/providers/email/email.provider';
import { IEmailProvider } from '@/shared/infra/providers/email/email.provider.interface';
import { MockEmailProvider } from '@/shared/infra/providers/email/mock-email.provider';
import { DiskFileProvider } from '@/shared/infra/providers/file/disk-file.provider';
import { IFileProvider } from '@/shared/infra/providers/file/file.provider.interface';
import { S3FileProvider } from '@/shared/infra/providers/file/s3-file.provider';
import { HashProvider } from '@/shared/infra/providers/hash/hash.provider';
import { IHashProvider } from '@/shared/infra/providers/hash/hash.provider.interface';
import { IdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { JwtProvider } from '@/shared/infra/providers/jwt/jwt.provider';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { LoggerProvider } from '@/shared/infra/providers/logger/logger.provider';
import { ILoggerProvider } from '@/shared/infra/providers/logger/logger.provider.interface';

export type ThirdPartiesCradle = {
  idGeneratorProvider: IIdGeneratorProvider;
  jwtProvider: IJwtProvider;
  hashProvider: IHashProvider;
  fileProvider: IFileProvider;
  loggerProvider: ILoggerProvider;
  emailProvider: IEmailProvider;
};

export const thirdPartiesContainer = {
  idGeneratorProvider: awilix.asClass(IdGeneratorProvider).singleton(),
  jwtProvider: awilix.asClass(JwtProvider).singleton(),
  hashProvider: awilix.asClass(HashProvider).singleton(),
  ...(process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'homolog'
    ? {
        emailProvider: awilix.asClass(EmailProvider).singleton(),
      }
    : {
        emailProvider: awilix.asClass(MockEmailProvider).singleton(),
      }),
  loggerProvider: awilix.asClass(LoggerProvider).singleton(),
  ...(process.env.NODE_ENV === 'production'
    ? {
        fileProvider: awilix.asClass(S3FileProvider).singleton(),
      }
    : {
        fileProvider: awilix.asClass(DiskFileProvider).singleton(),
      }),
};
