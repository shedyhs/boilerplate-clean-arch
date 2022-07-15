import * as awilix from 'awilix';
import { IFileGateway } from '@/shared/infra/gateways/file-gateway/file-gateway-interface';
import { IHashGateway } from '@/shared/infra/gateways/hash-gateway/hash-gateway-interface';
import { IIdGeneratorGateway } from '@/shared/infra/gateways/id-generator-gateway/id-generator-gateway-interface';
import { IJwtGateway } from '@/shared/infra/gateways/jwt-gateway/jwt-gateway.interface';
import { HashGateway } from '@/shared/infra/gateways/hash-gateway/hash-gateway';
import { IdGeneratorGateway } from '@/shared/infra/gateways/id-generator-gateway/id-generator-gateway';
import { JwtGateway } from '@/shared/infra/gateways/jwt-gateway/jwt-gateway';
import { S3FileGateway } from '@/shared/infra/gateways/file-gateway/s3-file-gateway';
import { ILoggerGateway } from '@/shared/infra/gateways/logger-gateway/logger-gateway-interface';
import { LoggerGateway } from '@/shared/infra/gateways/logger-gateway/logger-gateway';
import { DiskFileGateway } from '@/shared/infra/gateways/file-gateway/disk-file-gateway';
import { IEmailGateway } from '@/shared/infra/gateways/email-gateway/email-gateway-interface';
import { EmailGateway } from '@/shared/infra/gateways/email-gateway/email-gateway';
import { LocalEmailGateway } from '@/shared/infra/gateways/email-gateway/local-email-gateway';

export type ThirdPartiesCradle = {
  idGeneratorGateway: IIdGeneratorGateway;
  jwtGateway: IJwtGateway;
  hashGateway: IHashGateway;
  fileGateway: IFileGateway;
  loggerGateway: ILoggerGateway;
  emailGateway: IEmailGateway;
};

export const thirdPartiesContainer = {
  idGeneratorGateway: awilix.asClass(IdGeneratorGateway).singleton(),
  jwtGateway: awilix.asClass(JwtGateway).singleton(),
  hashGateway: awilix.asClass(HashGateway).singleton(),
  ...(process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'homolog'
    ? {
        emailGateway: awilix.asClass(EmailGateway).singleton(),
      }
    : {
        emailGateway: awilix.asClass(LocalEmailGateway).singleton(),
      }),
  loggerGateway: awilix.asClass(LoggerGateway).singleton(),
  ...(process.env.NODE_ENV === 'production'
    ? {
        fileGateway: awilix.asClass(S3FileGateway).singleton(),
      }
    : {
        fileGateway: awilix.asClass(DiskFileGateway).singleton(),
      }),
};
