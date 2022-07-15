export interface IIdGeneratorGateway {
  generateUUID(): Promise<string>;
}
