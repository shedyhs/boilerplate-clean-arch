import jwt from 'jsonwebtoken';
import {
  DecodeOutput,
  IJwtProvider,
} from '@/shared/infra/providers/jwt/jwt.provider.interface';

export class JwtProvider implements IJwtProvider {
  async generate({
    payload,
    options,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any;
  }): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET ?? 'pet-backend', {
      ...options,
      expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
      issuer: process.env.JWT_ISSUER ?? 'pet-backend',
    });
  }

  async decode(token: string): Promise<DecodeOutput> {
    const decodedJwt = jwt.decode(token) as jwt.JwtPayload;
    return decodedJwt;
  }

  async verify(token: string): Promise<DecodeOutput> {
    const verifiedJwt = jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'pet-backend',
    ) as jwt.JwtPayload;
    return verifiedJwt;
  }
}
