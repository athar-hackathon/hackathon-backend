import { FileStorageService } from '@/src/infrastructure/services/FileStorageService';
import { UploadedFileResult } from '@/src/infrastructure/services/FileStorageService';

export const uploadImage = async (file: Express.Multer.File): Promise<UploadedFileResult> => {
  if (!file) {
    throw new Error('No file provided');
  }

  return FileStorageService.store(file);
};