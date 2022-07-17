export interface IIdGeneratorProvider {
  generateUUID(): Promise<string>;
}
