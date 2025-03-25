import { registerAs } from '@nestjs/config';

export default registerAs('file', () => ({
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: process.env.ALLOWED_MIME_TYPES
    ? process.env.ALLOWED_MIME_TYPES.split(',')
    : ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
}));
