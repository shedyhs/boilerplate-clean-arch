export interface IFileProvider {
  save(fileName: string): Promise<void>;
  delete(fileName: string): Promise<void>;
  update(oldFileName: string, newFileName: string): Promise<void>;
}
