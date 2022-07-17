/* eslint-disable @typescript-eslint/no-explicit-any */
export type DecodeOutput = {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
};

export interface IJwtProvider {
  generate(payload: { payload: any; options: any }): Promise<string>;
  decode(token: string): Promise<DecodeOutput>;
  verify(token: string): Promise<DecodeOutput>;
}
