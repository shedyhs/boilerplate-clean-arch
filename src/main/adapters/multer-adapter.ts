import multer from 'multer';
import crypto from 'crypto';
import { container } from '../di/container';

const loggerProvider = container.resolve('loggerProvider');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    loggerProvider.info(`upload file filter. File: ${JSON.stringify(file)}`);
    const allowedFormats = [
      'image/jpeg',
      'image/pjpeg',
      'image/jpg',
      'image/png',
    ];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export { upload };
