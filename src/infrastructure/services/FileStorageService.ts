export interface UploadedFileResult {
  filename: string;
  path: string;
}

export class FileStorageService {
  static store(file: Express.Multer.File): UploadedFileResult {
    return {
      filename: file.filename,
      path: file.path,
    };
  }
}